'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Calendar, Heart, Lightbulb, ArrowLeft, ChevronRight, MessageSquare } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import InnovationCard from '@/components/InnovationCard';
import FarmerChat from '@/components/FarmerChat';
import { formatDate } from '@/utils/helpers';

interface PageProps {
  params: { id: string };
}

export default function FarmerProfilePage({ params }: PageProps) {
  const { id } = params;
  const { getFarmerById, getFarmerInnovations, isLoaded } = useApp();
  const [chatOpen, setChatOpen] = useState(false);

  if (!isLoaded) return (
    <div className="min-h-screen bg-gray-50 animate-pulse">
      <div className="h-64 bg-green-800/20" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">
        <div className="h-8 bg-gray-200 rounded-xl w-1/3" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {[0, 1, 2].map(i => <div key={i} className="h-72 bg-gray-200 rounded-2xl" />)}
        </div>
      </div>
    </div>
  );

  const farmer = getFarmerById(id);
  if (!farmer) return notFound();

  const farmerInnovations = getFarmerInnovations(farmer.id);
  const totalLikes = farmerInnovations.reduce((sum, i) => sum + i.likes, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back nav */}
      <div className="bg-white border-b border-gray-100 sticky top-16 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-2 text-sm text-gray-500">
          <Link
            href="/farmers"
            className="flex items-center gap-1 hover:text-green-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Farmers
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-gray-800 font-medium">{farmer.name}</span>
        </div>
      </div>

      {/* Profile hero */}
      <div className="bg-gradient-to-br from-green-900 to-green-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col sm:flex-row items-center sm:items-start gap-6"
          >
            {/* Avatar */}
            <div className="w-28 h-28 rounded-2xl overflow-hidden border-4 border-white/30 shadow-xl flex-shrink-0">
              <Image
                src={farmer.image}
                alt={farmer.name}
                width={112}
                height={112}
                className="object-cover w-full h-full"
                unoptimized
              />
            </div>

            {/* Info */}
            <div className="text-center sm:text-left">
              <h1 className="text-3xl font-extrabold">{farmer.name}</h1>
              <div className="flex items-center justify-center sm:justify-start gap-1.5 mt-1 text-green-200">
                <MapPin className="w-4 h-4" />
                <span>
                  {farmer.village}, {farmer.state}
                </span>
              </div>
              <p className="mt-3 text-green-100 max-w-xl leading-relaxed">{farmer.bio}</p>
              <div className="flex items-center justify-center sm:justify-start gap-1.5 mt-3 text-green-300 text-sm">
                <Calendar className="w-4 h-4" />
                <span>Joined {formatDate(farmer.joinedDate)}</span>
              </div>
            </div>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-lg"
          >
            {[
              { label: 'Innovations', value: farmerInnovations.length, icon: Lightbulb, color: 'bg-green-600/40' },
              { label: 'Total Likes', value: totalLikes, icon: Heart, color: 'bg-red-500/30' },
              { label: 'State', value: farmer.state, icon: MapPin, color: 'bg-blue-500/30', isText: true },
            ].map((stat, i) => (
              <div
                key={i}
                className={`${stat.color} rounded-2xl px-4 py-3 flex items-center gap-3`}
              >
                <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
                  <stat.icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-xl font-extrabold text-white leading-none">
                    {stat.isText ? stat.value : stat.value}
                  </p>
                  <p className="text-green-200 text-xs mt-0.5">{stat.label}</p>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Chat button */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="mt-5"
          >
            <button
              onClick={() => setChatOpen(true)}
              className="flex items-center gap-2 px-5 py-2.5 bg-white/20 hover:bg-white/30 text-white rounded-xl text-sm font-semibold border border-white/30 transition-all"
            >
              <MessageSquare className="w-4 h-4" />
              Chat with {farmer.name.split(' ')[0]}
            </button>
          </motion.div>
        </div>
      </div>

      {/* Innovations */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {farmer.name.split(' ')[0]}&apos;s Innovations
            <span className="ml-2 text-base font-normal text-gray-400">
              ({farmerInnovations.length})
            </span>
          </h2>

          {farmerInnovations.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl shadow-sm">
              <Lightbulb className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">No innovations posted yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
              {farmerInnovations.map((innovation, i) => (
                <InnovationCard key={innovation.id} innovation={innovation} index={i} />
              ))}
            </div>
          )}
        </motion.div>
      </div>

      <AnimatePresence>
        {chatOpen && (
          <FarmerChat
            farmer={farmer}
            innovations={farmerInnovations}
            onClose={() => setChatOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
