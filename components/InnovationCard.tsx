'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Heart, MessageCircle, MapPin, IndianRupee, Eye, ShoppingCart } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { CATEGORY_COLORS } from '@/utils/helpers';
import { Innovation } from '@/context/AppContext';
import toast from 'react-hot-toast';

interface InnovationCardProps {
  innovation: Innovation;
  index?: number;
}

export default function InnovationCard({ innovation, index = 0 }: InnovationCardProps) {
  const { toggleLike, getLikeCount, isLiked, getInnovationComments, user, addToCart, removeFromCart, isInCart } = useApp();
  const likeCount = getLikeCount(innovation.id);
  const liked = isLiked(innovation.id);
  const inCart = isInCart(innovation.id);
  const commentCount = getInnovationComments(innovation.id).length;
  const categoryStyle = CATEGORY_COLORS[innovation.category] || CATEGORY_COLORS['Other'];

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleLike(innovation.id);
    if (!liked) toast.success('Added to your liked innovations!');
  };

  const handleCart = (e: React.MouseEvent) => {
    e.preventDefault();
    if (inCart) {
      removeFromCart(innovation.id);
      toast.success('Removed from cart');
    } else {
      addToCart(innovation.id);
      toast.success('Added to cart!');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.07 }}
      whileHover={{ y: -4 }}
      className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 group flex flex-col"
    >
      {/* Image */}
      <Link href={`/innovations/${innovation.id}`} className="block overflow-hidden relative h-52">
        <Image
          src={innovation.image}
          alt={innovation.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          unoptimized
        />
        {/* Category badge */}
        <span
          className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-semibold ${categoryStyle}`}
        >
          {innovation.category}
        </span>
      </Link>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <Link href={`/innovations/${innovation.id}`}>
          <h3 className="font-bold text-gray-900 text-lg leading-tight mb-2 hover:text-green-700 transition-colors line-clamp-2">
            {innovation.title}
          </h3>
        </Link>

        <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 flex-1">
          {innovation.description}
        </p>

        {/* Meta info */}
        <div className="mt-3 space-y-1.5">
          <Link
            href={`/farmers/${innovation.farmerId}`}
            className="text-sm font-medium text-green-700 hover:text-green-600 hover:underline transition-colors"
          >
            {innovation.farmerName}
          </Link>
          <div className="flex items-center gap-1 text-gray-400 text-xs">
            <MapPin className="w-3 h-3" />
            <span>
              {innovation.village}, {innovation.state}
            </span>
          </div>
          <div className="flex items-center gap-1 text-green-700 text-sm font-semibold">
            <IndianRupee className="w-3.5 h-3.5" />
            <span>{innovation.estimatedCost.toLocaleString('en-IN')}</span>
            <span className="text-gray-400 font-normal text-xs ml-0.5">estimated cost</span>
          </div>
          {innovation.license && (
            <div className="mt-1">
              <span className={`inline-block text-xs font-semibold px-2 py-0.5 rounded-full ${
                innovation.license === 'Open Source' ? 'bg-green-100 text-green-700' :
                innovation.license === 'Community Use' ? 'bg-blue-100 text-blue-700' :
                innovation.license === 'CC BY-NC' ? 'bg-purple-100 text-purple-700' :
                innovation.license === 'All Rights Reserved' ? 'bg-orange-100 text-orange-700' :
                'bg-gray-100 text-gray-600'
              }`}>📜 {innovation.license}</span>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={handleLike}
              className={`flex items-center gap-1.5 text-sm font-medium transition-all duration-200 ${
                liked ? 'text-red-500' : 'text-gray-400 hover:text-red-400'
              }`}
            >
              <Heart
                className={`w-4 h-4 transition-all duration-200 ${
                  liked ? 'fill-red-500 scale-110' : ''
                }`}
              />
              <span>{likeCount}</span>
            </button>

            <Link
              href={`/innovations/${innovation.id}#comments`}
              className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-green-600 transition-colors font-medium"
            >
              <MessageCircle className="w-4 h-4" />
              <span>{commentCount}</span>
            </Link>
          </div>

          <Link
            href={`/innovations/${innovation.id}`}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-green-700 text-white rounded-lg text-xs font-semibold hover:bg-green-600 transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
            View Details
          </Link>

          <button
            onClick={handleCart}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border-2 transition-all ${
              inCart
                ? 'border-green-600 bg-green-50 text-green-700'
                : 'border-gray-200 text-gray-500 hover:border-green-400 hover:text-green-600'
            }`}
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            {inCart ? 'Saved' : 'Save'}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
