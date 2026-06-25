'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, Users, X } from 'lucide-react';
import FarmerCard from '@/components/FarmerCard';
import { useApp } from '@/context/AppContext';

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

export default function FarmersPage() {
  const { farmers } = useApp();
  const [query, setQuery] = useState('');
  const [selectedState, setSelectedState] = useState('All');

  const states = useMemo(
    () => ['All', ...Array.from(new Set(farmers.map((f) => f.state))).sort()],
    [farmers]
  );

  const filtered = useMemo(() => {
    let result = [...farmers];
    if (query.trim()) {
      const q = query.toLowerCase();
      result = result.filter(
        (f) =>
          f.name.toLowerCase().includes(q) ||
          f.village.toLowerCase().includes(q) ||
          f.state.toLowerCase().includes(q) ||
          f.bio.toLowerCase().includes(q)
      );
    }
    if (selectedState !== 'All') {
      result = result.filter((f) => f.state === selectedState);
    }
    return result;
  }, [farmers, query, selectedState]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-green-900 to-green-700 text-white py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-3xl sm:text-4xl font-extrabold">Our Farmer Innovators</h1>
            <p className="mt-2 text-green-200 text-lg">
              Meet {farmers.length} inspiring farmers transforming agriculture across India
            </p>
          </motion.div>

          {/* Search */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="mt-6 flex flex-col sm:flex-row gap-3 max-w-2xl"
          >
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              <input
                type="text"
                placeholder="Search by name, village, or state…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full pl-11 pr-10 py-3 rounded-xl text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 bg-white shadow-sm"
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="py-3 px-4 rounded-xl text-sm text-gray-700 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
            >
              {states.map((s) => (
                <option key={s} value={s}>
                  {s === 'All' ? 'All States' : s}
                </option>
              ))}
            </select>
          </motion.div>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <Users className="w-14 h-14 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">No farmers found</h3>
            <p className="text-gray-400 text-sm">Try a different name or state.</p>
            <button
              onClick={() => { setQuery(''); setSelectedState('All'); }}
              className="mt-4 px-5 py-2.5 bg-green-700 text-white text-sm rounded-xl hover:bg-green-600 transition-colors"
            >
              Clear Search
            </button>
          </div>
        ) : (
          <>
            <p className="text-sm text-gray-500 mb-6">
              Showing <span className="font-semibold text-gray-700">{filtered.length}</span> farmer
              {filtered.length !== 1 ? 's' : ''}
            </p>
            <motion.div
              variants={stagger}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {filtered.map((farmer, i) => (
                <FarmerCard key={farmer.id} farmer={farmer} index={i} />
              ))}
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
}
