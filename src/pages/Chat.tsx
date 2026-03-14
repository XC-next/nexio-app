import React, { useState } from 'react';
import { Phone, Video, Info, Send, Plus, Smile, Mic, Paperclip } from 'lucide-react';
import { motion } from 'motion/react';

const Chat = () => {
  const [message, setMessage] = useState('');
  
  const messages = [
    { id: 1, sender: 'Alice M.', text: 'Hey! Did you get the report?', time: '10:30 AM', direction: 'received' },
    { id: 2, sender: 'Alice M.', type: 'file', fileName: 'Project_Brief.pdf', time: '10:30 AM', direction: 'received' },
    { id: 3, sender: 'Me', text: 'Almost! Just finishing up. Sending now...', time: '10:31 AM', direction: 'sent' },
    { id: 4, sender: 'Alice M.', type: 'audio', duration: '0:15', time: '10:32 AM', direction: 'received' },
  ];

  return (
    <div className="h-screen flex flex-col bg-[#050510] relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-blue-900/10 blur-[150px] pointer-events-none" />

      {/* Header */}
      <header className="glass-dark p-4 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-12 h-12 rounded-full border-2 border-blue-500 p-0.5">
              <img src="https://picsum.photos/seed/alice/100/100" className="w-full h-full rounded-full" alt="Alice" />
            </div>
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-[#050510]" />
          </div>
          <div>
            <h3 className="font-bold">Alice M.</h3>
            <span className="text-xs text-green-400">Online</span>
          </div>
        </div>
        <div className="flex items-center gap-4 text-white/60">
          <button className="hover:text-white transition-colors"><Video size={20} /></button>
          <button className="hover:text-white transition-colors"><Phone size={20} /></button>
          <button className="hover:text-white transition-colors"><Info size={20} /></button>
        </div>
      </header>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 no-scrollbar">
        <div className="text-center">
          <span className="text-[10px] uppercase tracking-widest text-white/30">Chat Thread</span>
        </div>

        {messages.map((msg) => (
          <motion.div 
            key={msg.id}
            initial={{ opacity: 0, x: msg.direction === 'sent' ? 20 : -20 }}
            animate={{ opacity: 1, x: 0 }}
            className={`flex flex-col ${msg.direction === 'sent' ? 'items-end' : 'items-start'}`}
          >
            <div className={`max-w-[80%] p-4 rounded-3xl relative ${
              msg.direction === 'sent' 
                ? 'bg-purple-600/20 border border-purple-500/30 text-white rounded-tr-none' 
                : 'bg-blue-600/20 border border-blue-500/30 text-white rounded-tl-none'
            }`}>
              {msg.text && <p className="text-sm leading-relaxed">{msg.text}</p>}
              
              {msg.type === 'file' && (
                <div className="flex items-center gap-3 bg-white/5 p-3 rounded-2xl border border-white/10">
                  <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                    <Paperclip size={20} className="text-blue-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium truncate">{msg.fileName}</p>
                    <span className="text-[10px] text-white/40">2.4 MB</span>
                  </div>
                </div>
              )}

              {msg.type === 'audio' && (
                <div className="flex items-center gap-3 bg-white/5 p-3 rounded-2xl border border-white/10 min-w-[150px]">
                  <button className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center text-blue-400">
                    <Mic size={20} />
                  </button>
                  <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
                    <div className="w-1/3 h-full bg-blue-400" />
                  </div>
                  <span className="text-[10px] text-white/40">{msg.duration}</span>
                </div>
              )}

              <span className="text-[10px] text-white/30 mt-2 block">{msg.time}</span>
            </div>
          </motion.div>
        ))}
        
        <div className="flex items-center gap-2 text-white/30 text-xs italic">
          <span className="flex gap-1">
            <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1.5 }}>•</motion.span>
            <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.2 }}>•</motion.span>
            <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.4 }}>•</motion.span>
          </span>
          typing...
        </div>
      </div>

      {/* Input Area */}
      <footer className="p-4 glass-dark">
        <div className="max-w-4xl mx-auto flex items-center gap-3">
          <button className="p-3 rounded-full bg-white/5 text-white/60 hover:text-white transition-colors">
            <Mic size={20} />
          </button>
          <button className="p-3 rounded-full bg-white/5 text-white/60 hover:text-white transition-colors">
            <Plus size={20} />
          </button>
          <div className="flex-1 relative">
            <input 
              type="text" 
              placeholder="Type a message..." 
              className="w-full glass-input bg-white/5 border-white/5 pr-12"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white">
              <Smile size={20} />
            </button>
          </div>
          <button className="p-3 rounded-full bg-blue-600 text-white shadow-lg shadow-blue-500/20 active:scale-90 transition-all">
            <Send size={20} />
          </button>
        </div>
      </footer>
    </div>
  );
};

export default Chat;
