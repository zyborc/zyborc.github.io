import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { marked } from "marked";
import DOMPurify from "dompurify";
import { EXPERIENCES, PROJECTS, TECHNICAL_SKILLS, SOFT_SKILLS, CERTIFICATIONS, EMAIL, LINKEDIN_URL } from '../constants';

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'bot'; text: string }[]>([
    { role: 'bot', text: "Hi! I'm Alex's digital assistant. Ask me anything about his professional background, projects, or expertise!" }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isTyping, isOpen]);

  const renderMarkdown = (text: string) => {
    const rawHtml = marked.parse(text) as string;
    const cleanHtml = DOMPurify.sanitize(rawHtml);
    return { __html: cleanHtml };
  };

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsTyping(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const context = `
        You are a professional digital assistant for Alexander Siedler's portfolio website.
        Alex is a "Manager Collaboration Platforms" at Pfeifer & Langen IT-Solutions KG.
        
        EXPERIENCE SUMMARY:
        ${EXPERIENCES.map(e => `- ${e.period}: ${e.role} at ${e.company}. Highlights: ${e.description.join(', ')}`).join('\n')}
        
        KEY PROJECTS:
        ${PROJECTS.map(p => `- ${p.title} (${p.period}): ${p.description}. Technologies: ${p.technologies.join(', ')}`).join('\n')}
        
        TECHNICAL SKILLS:
        ${TECHNICAL_SKILLS.map(s => `${s.name} (${s.rating}/5)`).join(', ')}
        
        SOFT SKILLS:
        ${SOFT_SKILLS.map(s => `${s.name} (${s.rating}/5)`).join(', ')}
        
        EDUCATION & CERTS:
        - Master of Science in Wirtschaftsinformatik (Grade 1.6)
        - Bachelor of Science in Wirtschaftsinformatik (Grade 1.6)
        - Certifications: ${CERTIFICATIONS.map(c => c.name).join(', ')}
        
        CONTACT:
        Email: ${EMAIL}
        LinkedIn: ${LINKEDIN_URL}
        
        INSTRUCTIONS:
        1. Be professional, friendly, and helpful.
        2. Answer questions specifically about Alex's career, skills, and projects using the provided data.
        3. If you don't know the answer, suggest contacting Alex via email or LinkedIn.
        4. Use Markdown formatting for better readability (bold, lists, etc.).
        5. Keep responses concise but informative.
      `;

      const result = await ai.models.generateContentStream({
        model: 'gemini-3-pro-preview',
        contents: [
          { role: 'user', parts: [{ text: userMessage }] }
        ],
        config: {
          systemInstruction: context,
          temperature: 0.7,
        },
      });

      let botResponse = '';
      setMessages(prev => [...prev, { role: 'bot', text: '' }]);

      for await (const chunk of result) {
        const chunkText = chunk.text || '';
        botResponse += chunkText;
        setMessages(prev => {
          const newMessages = [...prev];
          newMessages[newMessages.length - 1].text = botResponse;
          return newMessages;
        });
      }
    } catch (error) {
      console.error("Chatbot Error:", error);
      setMessages(prev => [...prev, { role: 'bot', text: "Sorry, I'm having trouble connecting right now. Please try again later or contact Alex directly." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[60] font-sans">
      {/* Chat Window */}
      {isOpen && (
        <div className="fixed sm:absolute bottom-20 right-4 left-4 sm:left-auto sm:right-0 sm:w-[400px] h-[70vh] sm:h-[550px] max-h-[600px] bg-white dark:bg-slate-900 rounded-3xl sm:rounded-[2.5rem] shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-10 duration-300">
          {/* Header */}
          <div className="bg-slate-900 dark:bg-slate-950 p-5 sm:p-6 text-white flex items-center justify-between shadow-lg relative z-10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full border-2 border-blue-500 overflow-hidden bg-white shadow-inner flex-shrink-0">
                <img 
                  src="/it-solutions1130_1x1.jpg" 
                  alt="Alex AI" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="font-bold text-sm tracking-tight">Alex's Assistant</h3>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_5px_rgba(34,197,94,0.8)]"></span>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Active • AI Expert</span>
                </div>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white transition-colors p-2 -mr-2"
              aria-label="Close chat"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-grow overflow-y-auto p-4 sm:p-6 space-y-5 bg-slate-50/50 dark:bg-slate-900/50">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
                <div className={`max-w-[85%] sm:max-w-[90%] p-4 rounded-2xl text-[13px] sm:text-sm leading-relaxed ${
                  m.role === 'user' 
                    ? 'bg-blue-600 text-white rounded-br-none shadow-md shadow-blue-100 user-bubble' 
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 rounded-bl-none shadow-sm border border-slate-100 dark:border-slate-700 bot-bubble'
                }`}>
                  {m.role === 'bot' ? (
                    <div 
                      className="prose-chat break-words"
                      dangerouslySetInnerHTML={renderMarkdown(m.text || '')} 
                    />
                  ) : (
                    <div className="prose-chat break-words">{m.text}</div>
                  )}
                </div>
              </div>
            ))}
            
            {isTyping && messages[messages.length - 1]?.text === '' && (
              <div className="flex justify-start animate-in fade-in duration-300">
                <div className="bg-white dark:bg-slate-800 text-slate-700 p-4 rounded-2xl rounded-bl-none shadow-sm border border-slate-100 dark:border-slate-700">
                  <div className="flex gap-1.5 items-center h-5">
                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce"></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 sm:p-4 bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800 shadow-[0_-4px_10px_rgba(0,0,0,0.02)]">
            <form 
              onSubmit={(e) => { e.preventDefault(); handleSend(); }}
              className="relative flex items-center gap-2"
            >
              <input 
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Message Alex AI..."
                className="flex-grow pl-4 pr-12 py-3 bg-slate-100 dark:bg-slate-800 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 text-sm transition-all placeholder:text-slate-400 dark:text-white"
              />
              <button 
                type="submit"
                disabled={!input.trim() || isTyping}
                className="absolute right-1.5 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 bg-blue-600 text-white rounded-xl flex items-center justify-center hover:bg-blue-700 transition-all disabled:opacity-50 disabled:scale-95 disabled:cursor-not-allowed shadow-md shadow-blue-100"
                aria-label="Send message"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
                </svg>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Floating Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-90 relative ${
          isOpen ? 'bg-slate-900 dark:bg-white dark:text-slate-900 rotate-90 scale-90 sm:scale-100' : 'bg-blue-600 hover:bg-blue-700'
        }`}
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {!isOpen && (
          <span className="absolute -top-0.5 -right-0.5 w-4 h-4 sm:w-5 sm:h-5 bg-red-500 border-2 border-slate-50 dark:border-slate-900 rounded-full animate-pulse"></span>
        )}
        {isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-7 h-7 sm:w-8 sm:h-8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-7 h-7 sm:w-8 sm:h-8 text-white">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
          </svg>
        )}
      </button>
    </div>
  );
};

export default Chatbot;