import { useState, useRef, useEffect } from "react";
import { chatbotKnowledge } from "../data/portfolioData";

const SUGGESTED = [
  "What are Nandhitha's skills?",
  "Tell me about her projects",
  "What internships has she done?",
  "What certifications does she have?",
  "How can I contact her?",
];

function BotFace({ size = 48, mood = "happy" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="24" cy="24" r="22" fill="url(#botGrad)" />
      <rect x="1" y="17" width="5" height="10" rx="2.5" fill="#f9a8d4" />
      <rect x="42" y="17" width="5" height="10" rx="2.5" fill="#f9a8d4" />
      <line x1="24" y1="2" x2="24" y2="8" stroke="#f472b6" strokeWidth="2" strokeLinecap="round"/>
      <circle cx="24" cy="7" r="2.5" fill="#f472b6" />
      <circle cx="17" cy="21" r="4" fill="white" />
      <circle cx="31" cy="21" r="4" fill="white" />
      <circle cx="18" cy="22" r="2" fill="#be185d" />
      <circle cx="32" cy="22" r="2" fill="#be185d" />
      <circle cx="19" cy="21" r="0.8" fill="white" />
      <circle cx="33" cy="21" r="0.8" fill="white" />
      {mood === "happy" ? (
        <path d="M17 30 Q24 36 31 30" stroke="white" strokeWidth="2" strokeLinecap="round" fill="none"/>
      ) : (
        <path d="M17 31 Q24 28 31 31" stroke="white" strokeWidth="2" strokeLinecap="round" fill="none"/>
      )}
      <circle cx="13" cy="29" r="4" fill="#fda4af" opacity="0.5" />
      <circle cx="35" cy="29" r="4" fill="#fda4af" opacity="0.5" />
      <defs>
        <radialGradient id="botGrad" cx="40%" cy="35%">
          <stop offset="0%" stopColor="#f9a8d4" />
          <stop offset="100%" stopColor="#ec4899" />
        </radialGradient>
      </defs>
    </svg>
  );
}

async function askGemini(messages) {
  const lastMessage = messages[messages.length - 1].content;
  const prompt = `${chatbotKnowledge}\n\nUser question: ${lastMessage}\n\nAnswer concisely in under 100 words.`;

  const response = await fetch("/.netlify/functions/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt }),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    console.error("Gemini error:", err);
    throw new Error(`API error: ${response.status}`);
  }
  const data = await response.json();
  return data.text || "Sorry, I couldn't respond right now!";
}

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hi there! 👋 I'm Tony, Nandhitha's AI assistant. Ask me about her skills, projects, or experience!" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSugg, setShowSugg] = useState(true);
  const [botMood, setBotMood] = useState("happy");
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (open) {
      setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: "smooth" }), 50);
      inputRef.current?.focus();
    }
  }, [open, messages]);

  const sendMessage = async (text) => {
    const userText = text || input.trim();
    if (!userText || loading) return;

    setInput("");
    setShowSugg(false);
    setBotMood("thinking");

    const newMessages = [...messages, { role: "user", content: userText }];
    setMessages(newMessages);
    setLoading(true);

    try {
      const apiMessages = newMessages
        .filter((m, i) => !(i === 0 && m.role === "assistant"))
        .map(m => ({ role: m.role, content: m.content }));
      const reply = await askGemini(apiMessages);
      setMessages(prev => [...prev, { role: "assistant", content: reply }]);
      setBotMood("happy");
    } catch (err) {
      console.error("Chat error:", err);
      setMessages(prev => [...prev, { role: "assistant", content: "Hmm, I had trouble connecting. Try again or email Nandhitha directly!" }]);
      setBotMood("sad");
      setTimeout(() => setBotMood("happy"), 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 transition-all duration-300 hover:scale-110 active:scale-95"
        aria-label="Toggle chatbot"
      >
        <div className={`relative ${!open ? "bot-pulse" : ""}`}>
          <BotFace size={56} mood="happy" />
          {!open && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white animate-pulse" />
          )}
          {open && (
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-pink-600 rounded-full border-2 border-white flex items-center justify-center">
              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </div>
          )}
        </div>
      </button>

      <div className={`fixed bottom-24 right-6 z-50 w-80 sm:w-96 rounded-2xl shadow-2xl shadow-pink-200 dark:shadow-none border border-pink-200 dark:border-gray-800 bg-white dark:bg-gray-900 flex flex-col overflow-hidden transition-all duration-300 ${
        open ? "opacity-100 translate-y-0 pointer-events-auto scale-100" : "opacity-0 translate-y-6 pointer-events-none scale-95"
      }`} style={{ maxHeight: "530px" }}>

        {/* Header */}
        <div className="px-4 py-3 bg-gradient-to-r from-pink-500 to-rose-500 flex items-center gap-3">
          <div className="flex-shrink-0">
            <BotFace size={36} mood={loading ? "thinking" : "happy"} />
          </div>
          <div className="flex-1">
            <p className="text-sm font-black text-white">Tony <span className="font-normal text-pink-100">· Nandhitha's AI Assistant</span></p>
            <p className="text-xs text-pink-100">{loading ? "Thinking..." : "Powered by Gemini · Online"}</p>
          </div>
          <div className="w-2 h-2 rounded-full bg-green-300 animate-pulse" />
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3" style={{ minHeight: "300px" }}>
          {messages.map((msg, i) => (
            <div key={i} className={`flex gap-2 ${msg.role === "user" ? "justify-end" : "justify-start items-end"}`}>
              {msg.role === "assistant" && (
                <div className="flex-shrink-0 mb-0.5">
                  <BotFace size={24} mood="happy" />
                </div>
              )}
              <div className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                msg.role === "user"
                  ? "bg-gradient-to-br from-pink-500 to-rose-500 text-white rounded-br-sm"
                  : "bg-pink-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-bl-sm border border-pink-100 dark:border-gray-700"
              }`}>
                {msg.content}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex gap-2 items-end">
              <BotFace size={24} mood="happy" />
              <div className="bg-pink-50 dark:bg-gray-800 rounded-2xl rounded-bl-sm px-4 py-3 border border-pink-100 dark:border-gray-700">
                <div className="flex gap-1">
                  {[0, 1, 2].map(i => (
                    <span key={i} className="w-1.5 h-1.5 rounded-full bg-pink-400 animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
                  ))}
                </div>
              </div>
            </div>
          )}

          {showSugg && (
            <div className="pt-2">
              <p className="text-xs text-gray-400 mb-2 font-medium">💡 Try asking:</p>
              <div className="flex flex-wrap gap-1.5">
                {SUGGESTED.map(q => (
                  <button key={q} onClick={() => sendMessage(q)}
                    className="text-xs px-2.5 py-1 rounded-full border border-pink-200 dark:border-pink-900 text-pink-600 dark:text-pink-400 hover:bg-pink-50 dark:hover:bg-pink-950 transition-colors font-medium">
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="p-3 border-t border-pink-100 dark:border-gray-800">
          <div className="flex gap-2 items-end">
            <textarea
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
              placeholder="Ask me anything..."
              rows={1}
              className="flex-1 resize-none px-3.5 py-2.5 rounded-xl text-sm border border-pink-200 dark:border-gray-700 bg-pink-50/50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
              style={{ maxHeight: "80px" }}
            />
            <button onClick={() => sendMessage()} disabled={!input.trim() || loading}
              className="flex-shrink-0 w-9 h-9 rounded-xl bg-gradient-to-br from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 disabled:opacity-40 disabled:cursor-not-allowed text-white flex items-center justify-center transition-all hover:scale-105 active:scale-100">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
              </svg>
            </button>
          </div>
          <p className="text-[10px] text-gray-400 mt-1.5 text-center">AI-generated from portfolio data</p>
        </div>
      </div>
    </>
  );
}