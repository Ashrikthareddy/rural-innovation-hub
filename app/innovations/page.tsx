'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, SlidersHorizontal, Grid3X3, List, X } from 'lucide-react';
import InnovationCard from '@/components/InnovationCard';
import { useApp } from '@/context/AppContext';
import { CATEGORIES } from '@/utils/helpers';

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

export default function InnovationsPage() {
  const { innovations } = useApp();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedState, setSelectedState] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'recent' | 'likes' | 'cost'>('recent');

  const states = useMemo(
    () => ['All', ...Array.from(new Set(innovations.map((i) => i.state))).sort()],
    [innovations]
  );

  const filtered = useMemo(() => {
    let result = [...innovations];

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (i) =>
          i.title.toLowerCase().includes(q) ||
          i.farmerName.toLowerCase().includes(q) ||
          i.description.toLowerCase().includes(q) ||
          i.village.toLowerCase().includes(q)
      );
    }

    if (selectedCategory !== 'All') {
      result = result.filter((i) => i.category === selectedCategory);
    }

    if (selectedState !== 'All') {
      result = result.filter((i) => i.state === selectedState);
    }

    if (sortBy === 'likes') {
      result = result.sort((a, b) => b.likes - a.likes);
    } else if (sortBy === 'cost') {
      result = result.sort((a, b) => a.estimatedCost - b.estimatedCost);
    } else {
      result = result.sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    }

    return result;
  }, [innovations, search, selectedCategory, selectedState, sortBy]);

  const clearFilters = () => {
    setSearch('');
    setSelectedCategory('All');
    setSelectedState('All');
    setSortBy('recent');
  };

  const hasFilters =
    search.trim() || selectedCategory !== 'All' || selectedState !== 'All' || sortBy !== 'recent';

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page header */}
      <div className="bg-gradient-to-br from-green-900 to-green-700 text-white py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl sm:text-4xl font-extrabold">Innovation Feed</h1>
            <p className="mt-2 text-green-200 text-lg">
              Browse {innovations.length} farmer innovations from across India
            </p>
          </motion.div>

          {/* Search bar */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mt-6 relative max-w-xl"
          >
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Search innovations, farmers, locations…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-xl text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 bg-white shadow-sm"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </motion.div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border-b border-gray-200 sticky top-16 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-gray-400" />
              <span className="text-sm font-medium text-gray-600">Filters:</span>
            </div>

            {/* Categories */}
            <div className="flex flex-wrap gap-2">
              {['All', ...CATEGORIES].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                    selectedCategory === cat
                      ? 'bg-green-700 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* State filter */}
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="ml-auto text-xs border border-gray-200 rounded-lg px-3 py-1.5 text-gray-600 focus:outline-none focus:ring-2 focus:ring-green-400"
            >
              {states.map((s) => (
                <option key={s} value={s}>
                  {s === 'All' ? 'All States' : s}
                </option>
              ))}
            </select>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'recent' | 'likes' | 'cost')}
              className="text-xs border border-gray-200 rounded-lg px-3 py-1.5 text-gray-600 focus:outline-none focus:ring-2 focus:ring-green-400"
            >
              <option value="recent">Most Recent</option>
              <option value="likes">Most Liked</option>
              <option value="cost">Lowest Cost</option>
            </select>

            {hasFilters && (
              <button
                onClick={clearFilters}
                className="flex items-center gap-1 text-xs text-red-500 hover:text-red-700 transition-colors"
              >
                <X className="w-3.5 h-3.5" />
                Clear
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <Search className="w-14 h-14 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">No innovations found</h3>
            <p className="text-gray-400 text-sm">Try adjusting your search or filters.</p>
            <button
              onClick={clearFilters}
              className="mt-4 px-5 py-2.5 bg-green-700 text-white text-sm rounded-xl hover:bg-green-600 transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          <>
            <p className="text-sm text-gray-500 mb-6">
              Showing <span className="font-semibold text-gray-700">{filtered.length}</span>{' '}
              innovation{filtered.length !== 1 ? 's' : ''}
            </p>
            <motion.div
              variants={stagger}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7"
            >
              {filtered.map((innovation, i) => (
                <InnovationCard key={innovation.id} innovation={innovation} index={i} />
              ))}
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
}
