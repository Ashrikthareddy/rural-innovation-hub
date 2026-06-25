'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { MapPin, Lightbulb, Heart, ChevronRight } from 'lucide-react';
import { Farmer } from '@/context/AppContext';
import { useApp } from '@/context/AppContext';
import { formatDate } from '@/utils/helpers';

interface FarmerCardProps {
  farmer: Farmer;
  index?: number;
}

export default function FarmerCard({ farmer, index = 0 }: FarmerCardProps) {
  const { getFarmerInnovations } = useApp();
  const innovations = getFarmerInnovations(farmer.id);
  const totalLikes = innovations.reduce((sum, i) => sum + i.likes, 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.07 }}
      whileHover={{ y: -4 }}
      className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
    >
      {/* Header background */}
      <div className="h-20 bg-gradient-to-br from-green-700 to-green-500" />

      {/* Profile image */}
      <div className="px-6 pb-6 -mt-10">
        <div className="w-20 h-20 rounded-2xl overflow-hidden border-4 border-white shadow-md mb-4">
          <Image
            src={farmer.image}
            alt={farmer.name}
            width={80}
            height={80}
            className="object-cover"
            unoptimized
          />
        </div>

        <h3 className="font-bold text-gray-900 text-lg">{farmer.name}</h3>
        <div className="flex items-center gap-1 text-gray-500 text-sm mt-0.5">
          <MapPin className="w-3.5 h-3.5" />
          <span>
            {farmer.village}, {farmer.state}
          </span>
        </div>

        <p className="text-gray-500 text-sm mt-3 leading-relaxed line-clamp-2">{farmer.bio}</p>

        {/* Stats */}
        <div className="flex items-center gap-4 mt-4 py-3 border-t border-b border-gray-100">
          <div className="flex items-center gap-1.5 text-sm">
            <div className="w-7 h-7 rounded-lg bg-green-100 flex items-center justify-center">
              <Lightbulb className="w-4 h-4 text-green-700" />
            </div>
            <div>
              <p className="font-bold text-gray-900 leading-none">{innovations.length}</p>
              <p className="text-xs text-gray-400">Innovations</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-sm">
            <div className="w-7 h-7 rounded-lg bg-red-50 flex items-center justify-center">
              <Heart className="w-4 h-4 text-red-400" />
            </div>
            <div>
              <p className="font-bold text-gray-900 leading-none">{totalLikes}</p>
              <p className="text-xs text-gray-400">Total Likes</p>
            </div>
          </div>
          <div className="ml-auto text-xs text-gray-400">
            Joined {formatDate(farmer.joinedDate)}
          </div>
        </div>

        <Link
          href={`/farmers/${farmer.id}`}
          className="mt-4 flex items-center justify-center gap-1.5 w-full px-4 py-2.5 bg-green-700 text-white rounded-xl text-sm font-semibold hover:bg-green-600 transition-colors"
        >
          View Profile
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
    </motion.div>
  );
}
