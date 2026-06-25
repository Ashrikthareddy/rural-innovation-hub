'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Trash2, ArrowLeft, IndianRupee, MapPin, Lightbulb } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { CATEGORY_COLORS, formatCurrency } from '@/utils/helpers';
import toast from 'react-hot-toast';

export default function CartPage() {
  const { cart, innovations, removeFromCart, clearCart, isLoaded } = useApp();

  const cartItems = innovations.filter((i) => cart.includes(i.id));
  const totalCost = cartItems.reduce((sum, i) => sum + i.estimatedCost, 0);

  const handleRemove = (id: string, title: string) => {
    removeFromCart(id);
    toast.success(`Removed "${title}" from cart`);
  };

  const handleClear = () => {
    clearCart();
    toast.success('Cart cleared');
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gray-50 animate-pulse">
        <div className="max-w-4xl mx-auto px-4 py-10 space-y-4">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-28 bg-gray-200 rounded-2xl" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 sticky top-16 z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-2 text-sm text-gray-500">
          <Link href="/innovations" className="flex items-center gap-1 hover:text-green-700 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Innovations
          </Link>
          <span className="text-gray-300">/</span>
          <span className="text-gray-800 font-medium">My Cart</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page title */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
              <ShoppingCart className="w-5 h-5 text-green-700" />
            </div>
            <div>
              <h1 className="text-2xl font-extrabold text-gray-900">My Cart</h1>
              <p className="text-sm text-gray-500">{cartItems.length} innovation{cartItems.length !== 1 ? 's' : ''} saved</p>
            </div>
          </div>
          {cartItems.length > 0 && (
            <button
              onClick={handleClear}
              className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-red-500 border border-red-200 rounded-xl hover:bg-red-50 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              Clear All
            </button>
          )}
        </div>

        {cartItems.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-24 bg-white rounded-2xl shadow-sm"
          >
            <ShoppingCart className="w-14 h-14 text-gray-200 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-gray-700 mb-2">Your cart is empty</h2>
            <p className="text-gray-400 text-sm mb-6">Save innovations you want to try or share with others.</p>
            <Link
              href="/innovations"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-green-700 text-white rounded-xl font-semibold text-sm hover:bg-green-600 transition-colors"
            >
              <Lightbulb className="w-4 h-4" />
              Browse Innovations
            </Link>
          </motion.div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Items list */}
            <div className="lg:col-span-2 space-y-4">
              <AnimatePresence>
                {cartItems.map((innovation, i) => {
                  const categoryStyle = CATEGORY_COLORS[innovation.category] || CATEGORY_COLORS['Other'];
                  return (
                    <motion.div
                      key={innovation.id}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -40 }}
                      transition={{ duration: 0.3, delay: i * 0.05 }}
                      className="bg-white rounded-2xl shadow-sm overflow-hidden flex gap-4 p-4"
                    >
                      {/* Thumbnail */}
                      <Link href={`/innovations/${innovation.id}`} className="flex-shrink-0">
                        <div className="w-24 h-20 relative rounded-xl overflow-hidden">
                          <Image
                            src={innovation.image}
                            alt={innovation.title}
                            fill
                            className="object-cover"
                            unoptimized
                          />
                        </div>
                      </Link>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${categoryStyle}`}>
                              {innovation.category}
                            </span>
                            <Link href={`/innovations/${innovation.id}`}>
                              <h3 className="font-bold text-gray-900 mt-1 hover:text-green-700 transition-colors line-clamp-1">
                                {innovation.title}
                              </h3>
                            </Link>
                          </div>
                          <button
                            onClick={() => handleRemove(innovation.id, innovation.title)}
                            className="flex-shrink-0 p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="flex items-center gap-3 mt-2 text-xs text-gray-400">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {innovation.village}, {innovation.state}
                          </span>
                          <Link
                            href={`/farmers/${innovation.farmerId}`}
                            className="text-green-700 font-medium hover:underline"
                          >
                            {innovation.farmerName}
                          </Link>
                        </div>

                        <div className="flex items-center gap-1 mt-2 text-green-700 font-bold text-sm">
                          <IndianRupee className="w-3.5 h-3.5" />
                          {formatCurrency(innovation.estimatedCost).replace('₹', '')}
                          <span className="text-xs text-gray-400 font-normal ml-1">estimated cost</span>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>

            {/* Summary panel */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-2xl shadow-sm p-6 sticky top-24"
              >
                <h2 className="text-lg font-bold text-gray-900 mb-4">Summary</h2>

                <div className="space-y-3 text-sm">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex justify-between text-gray-600">
                      <span className="line-clamp-1 flex-1 mr-2">{item.title}</span>
                      <span className="font-medium text-gray-800 flex-shrink-0">
                        {formatCurrency(item.estimatedCost)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-gray-100 mt-4 pt-4 flex justify-between items-center">
                  <span className="font-bold text-gray-900">Total Estimated Cost</span>
                  <span className="text-xl font-extrabold text-green-700">{formatCurrency(totalCost)}</span>
                </div>

                <p className="text-xs text-gray-400 mt-2">
                  Costs are estimates based on locally available materials.
                </p>

                <Link
                  href="/innovations"
                  className="mt-5 flex items-center justify-center gap-2 w-full py-2.5 bg-green-700 text-white rounded-xl text-sm font-semibold hover:bg-green-600 transition-colors"
                >
                  <Lightbulb className="w-4 h-4" />
                  Browse More
                </Link>
              </motion.div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
