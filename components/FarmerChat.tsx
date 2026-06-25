'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { X, Send, MapPin } from 'lucide-react';
import { Farmer, Innovation } from '@/context/AppContext';

interface Message {
  id: string;
  role: 'user' | 'farmer';
  text: string;
  time: string;
}

interface FarmerChatProps {
  farmer: Farmer;
  innovations: Innovation[];
  onClose: () => void;
}

function getTime() {
  return new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
}

function generateReply(msg: string, farmer: Farmer, innovations: Innovation[]): string {
  const lower = msg.toLowerCase();
  const cats = innovations.filter((i, idx, arr) => arr.findIndex(x => x.category === i.category) === idx).map((i) => i.category).join(' and ');

  if (/\b(hello|hi|namaste|hey|good morning|good evening)\b/.test(lower)) {
    return `Namaste! Great to hear from you. I specialize in ${cats || 'rural farming innovations'}. What would you like to know?`;
  }

  if (/\b(cost|price|rupee|money|expensive|cheap|afford|budget|how much)\b/.test(lower)) {
    if (innovations.length > 0) {
      const avg = Math.round(innovations.reduce((s, i) => s + i.estimatedCost, 0) / innovations.length);
      const min = Math.min(...innovations.map((i) => i.estimatedCost));
      return `My innovations are built to be affordable! The cheapest starts at just ₹${min.toLocaleString('en-IN')} and the average is around ₹${avg.toLocaleString('en-IN')}. I always use locally available materials so any farmer can replicate them.`;
    }
    return `I always keep costs very low — everything uses locally available materials, usually well under ₹5000.`;
  }

  if (/\b(material|ingredient|need|require|what.*use)\b/.test(lower)) {
    if (innovations.length > 0) {
      const inn = innovations[0];
      const mats = (inn.materials ?? []).slice(0, 3);
      if (mats.length > 0) {
        return `For my "${inn.title}", key materials include: ${mats.join(', ')}. All available at local hardware stores. Want details for a specific innovation?`;
      }
    }
    return `I use locally available materials — bamboo, PVC pipes, wire mesh, plastic sheets, GI sheets. Nothing that requires a trip to a big city.`;
  }

  if (/\b(how|step|method|technique|process|guide|build|make|create|replicate)\b/.test(lower)) {
    if (innovations.length > 0) {
      const inn = innovations[Math.floor(Math.random() * innovations.length)];
      const steps = inn.replicationSteps ?? [];
      return `For my "${inn.title}", there are ${steps.length || 'several'} main steps. ${inn.description.slice(0, 130)}... You can see the full guide on the innovation detail page!`;
    }
    return `My methods are simple — start small, test first, then scale up. I document everything so others can replicate it easily.`;
  }

  if (/\b(where|location|village|state|district|from|live)\b/.test(lower)) {
    return `I am from ${farmer.village} in ${farmer.state}. The farming challenges here — water scarcity and seasonal unpredictability — are exactly what pushed me to develop low-cost practical innovations.`;
  }

  if (/\b(water|irrigation|rain|drought|bore|pump)\b/.test(lower)) {
    const waterInn = innovations.find((i) => ['Water Management', 'Irrigation'].includes(i.category));
    if (waterInn) {
      return `Water management is critical in our region! My "${waterInn.title}" addresses this directly. ${waterInn.description.slice(0, 130)}. It has helped me significantly reduce water costs.`;
    }
    return `Water is the most critical resource. I recommend collecting rainwater during monsoon and using drip irrigation to reduce waste by up to 60%. Start with simple low-cost setups first.`;
  }

  if (/\b(soil|fertilizer|compost|organic|crop|yield|pest|disease)\b/.test(lower)) {
    const soilInn = innovations.find((i) => ['Soil Health', 'Crop Protection'].includes(i.category));
    if (soilInn) {
      return `For soil and crop health, my "${soilInn.title}" works very well. ${soilInn.description.slice(0, 120)}. Natural methods are better for the land and cheaper long-term!`;
    }
    return `Healthy soil is everything. I use organic compost, avoid chemical overuse, and rotate crops. It takes a season or two but yields improve significantly.`;
  }

  if (/\b(time|long|day|week|month|hour|duration)\b/.test(lower)) {
    const first = innovations[0];
    return `Most of my innovations can be built in 1 to 3 days with basic tools. ${first ? `The "${first.title}" for example takes about 2 days to build but then runs for years with minimal maintenance.` : 'Once set up, they run for years.'}`;
  }

  if (/\b(help|advice|suggest|recommend|tip|problem|issue|challeng)\b/.test(lower)) {
    return `Happy to help! Tell me your specific problem — water scarcity, high input costs, post-harvest losses, or soil health — and I will share what has worked for me in ${farmer.state}.`;
  }

  if (/\b(benefit|advantage|profit|income|earn|result|outcome)\b/.test(lower)) {
    return `${farmer.bio.slice(0, 150).replace(/\.$/, '')}. My innovations have helped neighbouring farmers reduce input costs by 40–60% and improve yields at the same time.`;
  }

  const fallbacks = [
    `Good question! In ${farmer.state}, the most important thing is to start with the problem you face most often and find the simplest local solution. What specific challenge are you facing?`,
    `I have learned that the best solutions come from observing nature and using what is locally available. Ask me about water, soil, tools, storage, or energy — happy to share!`,
    `Farming teaches patience! I have been experimenting for years and each season brings new lessons. What specific topic can I help you with?`,
  ];
  return fallbacks[Math.floor(Math.random() * fallbacks.length)];
}

export default function FarmerChat({ farmer, innovations, onClose }: FarmerChatProps) {
  const storageKey = `rih_chat_${farmer.id}`;

  const [messages, setMessages] = useState<Message[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) return JSON.parse(saved);
    } catch {}
    const innText =
      innovations.length > 0
        ? ` I have worked on ${innovations.length} innovation${innovations.length > 1 ? 's' : ''}, including "${innovations[0].title}".`
        : '';
    return [
      {
        id: 'welcome',
        role: 'farmer' as const,
        text: `Namaste! I am ${farmer.name} from ${farmer.village}, ${farmer.state}.${innText} Ask me anything about my farming methods!`,
        time: getTime(),
      },
    ];
  });

  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(messages));
    } catch {}
  }, [messages, storageKey]);

  const send = () => {
    const text = input.trim();
    if (!text) return;
    const userMsg: Message = { id: Date.now().toString(), role: 'user', text, time: getTime() };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setTyping(true);
    setTimeout(() => {
      const reply = generateReply(text, farmer, innovations);
      setMessages((prev) => [
        ...prev,
        { id: (Date.now() + 1).toString(), role: 'farmer', text: reply, time: getTime() },
      ]);
      setTyping(false);
    }, 900 + Math.random() * 600);
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 40, scale: 0.95 }}
      transition={{ type: 'spring', damping: 25, stiffness: 300 }}
      className="fixed bottom-4 right-4 z-[60] w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-gray-100 flex flex-col overflow-hidden"
      style={{ height: '520px' }}
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-green-800 to-green-700 px-4 py-3 flex items-center gap-3 flex-shrink-0">
        <div className="w-10 h-10 rounded-xl overflow-hidden border-2 border-white/30 flex-shrink-0">
          <Image
            src={farmer.image}
            alt={farmer.name}
            width={40}
            height={40}
            className="object-cover w-full h-full"
            unoptimized
          />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-white font-bold text-sm leading-none">{farmer.name}</p>
          <div className="flex items-center gap-1 text-green-200 text-xs mt-0.5">
            <MapPin className="w-3 h-3 flex-shrink-0" />
            <span className="truncate">
              {farmer.village}, {farmer.state}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <span className="flex items-center gap-1.5 text-[10px] text-green-200">
            <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
            Online
          </span>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-white/20 text-white/80 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50 min-h-0">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} gap-2`}
          >
            {msg.role === 'farmer' && (
              <div className="w-7 h-7 rounded-full overflow-hidden flex-shrink-0 mt-1">
                <Image
                  src={farmer.image}
                  alt=""
                  width={28}
                  height={28}
                  className="object-cover w-full h-full"
                  unoptimized
                />
              </div>
            )}
            <div
              className={`max-w-[78%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                msg.role === 'user'
                  ? 'bg-green-700 text-white rounded-br-sm'
                  : 'bg-white text-gray-800 shadow-sm border border-gray-100 rounded-bl-sm'
              }`}
            >
              <p>{msg.text}</p>
              <p
                className={`text-[10px] mt-1 text-right ${
                  msg.role === 'user' ? 'text-green-200' : 'text-gray-400'
                }`}
              >
                {msg.time}
              </p>
            </div>
          </div>
        ))}
        {typing && (
          <div className="flex gap-2 items-center">
            <div className="w-7 h-7 rounded-full overflow-hidden flex-shrink-0">
              <Image
                src={farmer.image}
                alt=""
                width={28}
                height={28}
                className="object-cover w-full h-full"
                unoptimized
              />
            </div>
            <div className="bg-white rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm border border-gray-100">
              <div className="flex gap-1 items-center">
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: `${i * 0.15}s` }}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="p-3 border-t border-gray-100 bg-white flex-shrink-0">
        <div className="flex gap-2 items-end">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKey}
            placeholder={`Ask ${farmer.name.split(' ')[0]} anything...`}
            rows={1}
            className="flex-1 resize-none border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
            style={{ maxHeight: '80px', overflowY: 'auto' }}
          />
          <button
            onClick={send}
            disabled={!input.trim() || typing}
            className="p-2.5 bg-green-700 text-white rounded-xl hover:bg-green-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex-shrink-0"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
        <p className="text-[10px] text-center text-gray-400 mt-1.5">
          Simulated responses based on {farmer.name.split(' ')[0]}&apos;s profile
        </p>
      </div>
    </motion.div>
  );
}
