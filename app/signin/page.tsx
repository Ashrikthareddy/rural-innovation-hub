'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { User, MapPin, ArrowRight, Sprout, Users, Lightbulb, Heart } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { generateUserId } from '@/utils/helpers';
import toast from 'react-hot-toast';

export default function SignInPage() {
  const router = useRouter();
  const { setUser, user } = useApp();
  const [name, setName] = useState('');
  const [village, setVillage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !village.trim()) {
      toast.error('Please enter your name and village');
      return;
    }

    setLoading(true);
    await new Promise((r) => setTimeout(r, 400));

    setUser({
      id: generateUserId(name, village),
      name: name.trim(),
      village: village.trim(),
    });

    toast.success(`Welcome to the community, ${name.trim()}!`);
    setLoading(false);
    router.push('/');
  };

  if (user) {
    router.replace('/');
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-950 via-green-900 to-green-800 flex items-center justify-center px-4 py-16">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-green-700/20"
        />
        <motion.div
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 8, repeat: Infinity, delay: 2 }}
          className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full bg-green-600/15"
        />
      </div>

      <div className="relative max-w-md w-full">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="w-16 h-16 bg-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Sprout className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-extrabold text-white">Rural Innovation Hub</h1>
          <p className="text-green-300 text-sm mt-1">Join thousands of farming innovators</p>
        </motion.div>

        {/* Form card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-2xl overflow-hidden"
        >
          {/* Card header */}
          <div className="bg-gradient-to-br from-green-700 to-green-600 px-6 py-5 text-white">
            <h2 className="text-lg font-bold">Join the Community</h2>
            <p className="text-green-100 text-sm mt-0.5">
              Enter your name and village to get started — no password needed!
            </p>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Your Full Name *
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g., Arjun Singh"
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
                  autoFocus
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Your Village / Town *
              </label>
              <div className="relative">
                <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                <input
                  type="text"
                  required
                  value={village}
                  onChange={(e) => setVillage(e.target.value)}
                  placeholder="e.g., Raichur, Karnataka"
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
                />
              </div>
            </div>

            <div className="bg-green-50 rounded-xl p-3 text-xs text-green-800 border border-green-200">
              <strong>Simple sign-in:</strong> We only ask for your name and village to personalise
              your experience. No password or email required.
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3.5 bg-green-700 text-white rounded-xl font-bold text-sm hover:bg-green-600 disabled:opacity-60 disabled:cursor-not-allowed transition-colors shadow-md"
            >
              {loading ? (
                'Joining…'
              ) : (
                <>
                  Join Community
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </motion.div>

        {/* Trust indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-6 grid grid-cols-3 gap-3 text-center"
        >
          {[
            { icon: Users, label: '500+ Farmers' },
            { icon: Lightbulb, label: '200+ Ideas' },
            { icon: Heart, label: 'Free Forever' },
          ].map((item, i) => (
            <div key={i} className="bg-white/10 backdrop-blur-sm rounded-xl py-3 px-2">
              <item.icon className="w-5 h-5 text-green-300 mx-auto mb-1" />
              <p className="text-green-200 text-xs font-medium">{item.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
