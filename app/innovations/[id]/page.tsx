'use client';

import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  Heart,
  MapPin,
  IndianRupee,
  User,
  Calendar,
  Package,
  ListChecks,
  ChevronRight,
  Share2,
  ShoppingCart,
  MessageSquare,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import CommentSection from '@/components/CommentSection';
import FarmerChat from '@/components/FarmerChat';
import { CATEGORY_COLORS, formatDate, formatCurrency } from '@/utils/helpers';
import InnovationCard from '@/components/InnovationCard';
import toast from 'react-hot-toast';
import { useState } from 'react';

interface PageProps {
  params: { id: string };
}

export default function InnovationDetailPage({ params }: PageProps) {
  const { id } = params;
  const { getInnovationById, getFarmerById, getFarmerInnovations, toggleLike, getLikeCount, isLiked, user, innovations, isLoaded, addToCart, removeFromCart, isInCart } =
    useApp();
  const [activeImage, setActiveImage] = useState(0);
  const [chatOpen, setChatOpen] = useState(false);

  if (!isLoaded) return (
    <div className="min-h-screen bg-gray-50 animate-pulse">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="h-96 bg-gray-200 rounded-2xl" />
            <div className="h-32 bg-gray-200 rounded-2xl" />
            <div className="h-48 bg-gray-200 rounded-2xl" />
          </div>
          <div className="space-y-6">
            <div className="h-56 bg-gray-200 rounded-2xl" />
            <div className="h-48 bg-gray-200 rounded-2xl" />
          </div>
        </div>
      </div>
    </div>
  );

  const innovation = getInnovationById(id);
  if (!innovation) return notFound();

  const farmer = getFarmerById(innovation.farmerId);
  const likeCount = getLikeCount(innovation.id);
  const liked = isLiked(innovation.id);
  const inCart = isInCart(innovation.id);
  const categoryStyle = CATEGORY_COLORS[innovation.category] || CATEGORY_COLORS['Other'];
  const farmerOtherInnovations = farmer
    ? getFarmerInnovations(farmer.id).filter((i) => i.id !== innovation.id).slice(0, 2)
    : [];
  const relatedInnovations = innovations
    .filter((i) => i.id !== innovation.id && i.category === innovation.category)
    .slice(0, 3);

  const handleLike = () => {
    toggleLike(innovation.id);
    if (!liked) toast.success('Added to your liked innovations!');
  };

  const handleCart = () => {
    if (inCart) {
      removeFromCart(innovation.id);
      toast.success('Removed from cart');
    } else {
      addToCart(innovation.id);
      toast.success('Added to cart!');
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: innovation.title, url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard!');
    }
  };

  const allImages = innovation.images?.length ? innovation.images : [innovation.image];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back nav */}
      <div className="bg-white border-b border-gray-100 sticky top-16 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-2 text-sm text-gray-500">
          <Link href="/innovations" className="flex items-center gap-1 hover:text-green-700 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Innovations
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-gray-800 font-medium line-clamp-1">{innovation.title}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image gallery */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl overflow-hidden shadow-sm"
            >
              {/* Main image */}
              <div className="relative h-72 sm:h-96 w-full">
                <Image
                  src={allImages[activeImage]}
                  alt={innovation.title}
                  fill
                  className="object-cover"
                  unoptimized
                />
                <span className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold ${categoryStyle}`}>
                  {innovation.category}
                </span>
              </div>

              {/* Thumbnails */}
              {allImages.length > 1 && (
                <div className="flex gap-3 p-4 overflow-x-auto">
                  {allImages.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImage(i)}
                      className={`flex-shrink-0 w-20 h-16 relative rounded-xl overflow-hidden border-2 transition-all ${
                        activeImage === i ? 'border-green-600 shadow-md' : 'border-transparent'
                      }`}
                    >
                      <Image src={img} alt="" fill className="object-cover" unoptimized />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Title & actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-sm"
            >
              <div className="flex items-start justify-between gap-4">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 leading-tight">
                  {innovation.title}
                </h1>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    onClick={handleLike}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl border-2 text-sm font-semibold transition-all ${
                      liked
                        ? 'border-red-300 bg-red-50 text-red-500'
                        : 'border-gray-200 text-gray-500 hover:border-red-200 hover:text-red-400'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${liked ? 'fill-red-500' : ''}`} />
                    {likeCount}
                  </button>
                  <button
                    onClick={handleCart}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl border-2 text-sm font-semibold transition-all ${
                      inCart
                        ? 'border-green-500 bg-green-50 text-green-700'
                        : 'border-gray-200 text-gray-500 hover:border-green-300 hover:text-green-600'
                    }`}
                  >
                    <ShoppingCart className="w-4 h-4" />
                    {inCart ? 'Saved' : 'Save'}
                  </button>
                  <button
                    onClick={handleShare}
                    className="p-2 rounded-xl border-2 border-gray-200 text-gray-500 hover:border-green-200 hover:text-green-600 transition-all"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-4 text-sm text-gray-500">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-green-600" />
                  <span>
                    {innovation.village}, {innovation.state}
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-green-600" />
                  <span>{formatDate(innovation.createdAt)}</span>
                </div>
                <div className="flex items-center gap-1.5 font-semibold text-green-700">
                  <IndianRupee className="w-4 h-4" />
                  <span>{formatCurrency(innovation.estimatedCost)}</span>
                </div>
                {innovation.license && (
                  <span className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full ${
                    innovation.license === 'Open Source' ? 'bg-green-100 text-green-700' :
                    innovation.license === 'Community Use' ? 'bg-blue-100 text-blue-700' :
                    innovation.license === 'CC BY-NC' ? 'bg-purple-100 text-purple-700' :
                    innovation.license === 'All Rights Reserved' ? 'bg-orange-100 text-orange-700' :
                    'bg-gray-100 text-gray-600'
                  }`}>📜 {innovation.license}</span>
                )}
              </div>

              <p className="mt-5 text-gray-700 leading-relaxed">{innovation.description}</p>
            </motion.div>

            {/* Materials */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="bg-white rounded-2xl p-6 shadow-sm"
            >
              <div className="flex items-center gap-2 mb-5">
                <Package className="w-5 h-5 text-green-700" />
                <h2 className="text-lg font-bold text-gray-900">Materials Required</h2>
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                {(innovation.materials ?? []).map((mat, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 bg-green-50 rounded-xl">
                    <span className="w-6 h-6 rounded-full bg-green-700 text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <span className="text-sm text-gray-700">{mat}</span>
                  </div>
                ))}
              </div>

              {/* Cost breakdown section */}
              <div className="mt-5 p-4 bg-amber-50 rounded-xl border border-amber-200">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-amber-800">Total Estimated Cost</span>
                  <span className="text-xl font-extrabold text-amber-700">
                    {formatCurrency(innovation.estimatedCost)}
                  </span>
                </div>
                <p className="text-xs text-amber-600 mt-1">
                  Materials available at local hardware and agriculture supply stores.
                </p>
              </div>
            </motion.div>

            {/* Replication Steps */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl p-6 shadow-sm"
            >
              <div className="flex items-center gap-2 mb-5">
                <ListChecks className="w-5 h-5 text-green-700" />
                <h2 className="text-lg font-bold text-gray-900">How to Replicate</h2>
              </div>
              <div className="space-y-4">
                {(innovation.replicationSteps ?? []).map((step, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-700 text-white text-sm font-bold flex items-center justify-center">
                      {i + 1}
                    </div>
                    <div className="flex-1 pt-1">
                      <p className="text-gray-700 text-sm leading-relaxed">{step}</p>
                      {i < (innovation.replicationSteps ?? []).length - 1 && (
                        <div className="ml-[-24px] border-l-2 border-dashed border-green-200 h-4 mt-2 ml-4" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Comments */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="bg-white rounded-2xl p-6 shadow-sm"
            >
              <CommentSection innovationId={innovation.id} />
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Farmer card */}
            {farmer && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-2xl p-6 shadow-sm"
              >
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
                  Innovation by
                </h3>
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0">
                    <Image
                      src={farmer.image}
                      alt={farmer.name}
                      width={56}
                      height={56}
                      className="object-cover w-full h-full"
                      unoptimized
                    />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">{farmer.name}</p>
                    <div className="flex items-center gap-1 text-gray-400 text-xs">
                      <MapPin className="w-3 h-3" />
                      {farmer.village}, {farmer.state}
                    </div>
                  </div>
                </div>
                <p className="mt-3 text-sm text-gray-600 leading-relaxed line-clamp-3">
                  {farmer.bio}
                </p>
                <Link
                  href={`/farmers/${farmer.id}`}
                  className="mt-4 flex items-center justify-center gap-2 w-full py-2.5 bg-green-700 text-white rounded-xl text-sm font-semibold hover:bg-green-600 transition-colors"
                >
                  <User className="w-4 h-4" />
                  View Full Profile
                </Link>
                <button
                  onClick={() => setChatOpen(true)}
                  className="mt-2 flex items-center justify-center gap-2 w-full py-2.5 border-2 border-green-700 text-green-700 rounded-xl text-sm font-semibold hover:bg-green-50 transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                  Chat with {farmer.name.split(' ')[0]}
                </button>
              </motion.div>
            )}

            {/* Related innovations */}
            {relatedInnovations.length > 0 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-2xl p-6 shadow-sm"
              >
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
                  Related Innovations
                </h3>
                <div className="space-y-4">
                  {relatedInnovations.map((rel) => (
                    <Link
                      key={rel.id}
                      href={`/innovations/${rel.id}`}
                      className="flex gap-3 group hover:bg-gray-50 rounded-xl p-2 -m-2 transition-colors"
                    >
                      <div className="w-16 h-14 relative flex-shrink-0 rounded-lg overflow-hidden">
                        <Image src={rel.image} alt={rel.title} fill className="object-cover" unoptimized />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-900 group-hover:text-green-700 line-clamp-2 leading-tight">
                          {rel.title}
                        </p>
                        <p className="text-xs text-green-700 font-medium mt-1">
                          {formatCurrency(rel.estimatedCost)}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {chatOpen && farmer && (
          <FarmerChat
            farmer={farmer}
            innovations={getFarmerInnovations(farmer.id)}
            onClose={() => setChatOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
