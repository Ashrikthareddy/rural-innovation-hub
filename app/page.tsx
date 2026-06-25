'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import {
  ArrowRight,
  Leaf,
  Users,
  Lightbulb,
  TrendingUp,
  MapPin,
  Star,
  ChevronRight,
  Sprout,
  Droplets,
  Sun,
  Wind,
} from 'lucide-react';
import InnovationCard from '@/components/InnovationCard';
import { useApp } from '@/context/AppContext';

function CountUp({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target]);

  return (
    <span ref={ref}>
      {count.toLocaleString('en-IN')}
      {suffix}
    </span>
  );
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

export default function HomePage() {
  const { innovations } = useApp();
  const featuredInnovations = innovations.slice(0, 3);
  const heroRef = useRef(null);

  return (
    <div className="overflow-x-hidden">
      {/* ─── HERO ─── */}
      <section
        ref={heroRef}
        className="relative min-h-[92vh] bg-gradient-to-br from-green-950 via-green-900 to-green-800 flex items-center overflow-hidden"
      >
        {/* Decorative background circles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{ scale: [1, 1.15, 1], opacity: [0.08, 0.14, 0.08] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-green-400"
          />
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.06, 0.12, 0.06] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
            className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-green-300"
          />
          <motion.div
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-1/4 right-1/4 w-4 h-4 bg-green-400 rounded-full opacity-30"
          />
          <motion.div
            animate={{ y: [0, 20, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            className="absolute bottom-1/3 left-1/3 w-3 h-3 bg-yellow-300 rounded-full opacity-30"
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="text-white"
          >
            <motion.div
              variants={fadeUp}
              className="inline-flex items-center gap-2 px-4 py-2 bg-green-800/60 rounded-full text-green-300 text-sm font-medium mb-6 border border-green-700/50"
            >
              <Sprout className="w-4 h-4" />
              Built for Indian Farmers
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight"
            >
              Empowering Farmers,{' '}
              <span className="text-green-400">One Innovation</span> at a Time
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mt-6 text-green-100 text-lg leading-relaxed max-w-lg"
            >
              Rural Innovation Hub connects farmers across India to share low-cost, high-impact
              agricultural innovations. Learn from experts, share your own ideas, and transform
              your farm.
            </motion.p>

            <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/innovations"
                className="flex items-center gap-2 px-6 py-3.5 bg-green-500 hover:bg-green-400 text-white rounded-xl font-semibold transition-all duration-200 shadow-lg shadow-green-900/30 hover:shadow-green-700/40"
              >
                Explore Innovations
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/upload"
                className="flex items-center gap-2 px-6 py-3.5 border-2 border-green-500 text-green-300 hover:bg-green-800/50 rounded-xl font-semibold transition-all duration-200"
              >
                Share Your Innovation
                <Lightbulb className="w-4 h-4" />
              </Link>
            </motion.div>

            {/* Quick stats */}
            <motion.div
              variants={fadeUp}
              className="mt-12 grid grid-cols-3 gap-4"
            >
              {[
                { label: 'Farmers', value: 500, suffix: '+' },
                { label: 'Innovations', value: 200, suffix: '+' },
                { label: 'States', value: 22, suffix: '' },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-2xl font-extrabold text-green-400">
                    <CountUp target={stat.value} suffix={stat.suffix} />
                  </p>
                  <p className="text-green-300 text-sm mt-0.5">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: Floating innovation preview cards */}
          <div className="hidden lg:block relative h-96">
            {featuredInnovations.slice(0, 3).map((innovation, i) => (
              <motion.div
                key={innovation.id}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0, y: [0, i % 2 === 0 ? -10 : 10, 0] }}
                transition={{
                  opacity: { delay: 0.5 + i * 0.2, duration: 0.5 },
                  x: { delay: 0.5 + i * 0.2, duration: 0.5 },
                  y: { delay: 1 + i * 0.3, duration: 4 + i, repeat: Infinity, ease: 'easeInOut' },
                }}
                style={{
                  position: 'absolute',
                  top: `${10 + i * 28}%`,
                  left: `${5 + i * 15}%`,
                  zIndex: 3 - i,
                }}
                className="bg-white rounded-2xl shadow-2xl overflow-hidden w-56"
              >
                <div className="w-full h-28 relative">
                  <Image
                    src={innovation.image}
                    alt={innovation.title}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
                <div className="p-3">
                  <p className="font-bold text-gray-900 text-sm line-clamp-1">{innovation.title}</p>
                  <p className="text-gray-500 text-xs mt-0.5">{innovation.farmerName}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Wave bottom */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M0 60L48 50C96 40 192 20 288 16.7C384 13.3 480 26.7 576 33.3C672 40 768 40 864 33.3C960 26.7 1056 13.3 1152 10C1248 6.7 1344 13.3 1392 16.7L1440 20V60H0Z"
              fill="#f9fafb"
            />
          </svg>
        </div>
      </section>

      {/* ─── FEATURED INNOVATIONS ─── */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={stagger}
            className="text-center mb-12"
          >
            <motion.span
              variants={fadeUp}
              className="inline-block px-4 py-1.5 bg-green-100 text-green-800 rounded-full text-sm font-semibold mb-3"
            >
              Farmer Innovations
            </motion.span>
            <motion.h2
              variants={fadeUp}
              className="text-3xl sm:text-4xl font-extrabold text-gray-900"
            >
              Featured Innovations
            </motion.h2>
            <motion.p variants={fadeUp} className="mt-3 text-gray-500 text-lg max-w-xl mx-auto">
              Real solutions from real farmers — affordable, replicable, and proven on the farm.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {featuredInnovations.map((innovation, i) => (
              <InnovationCard key={innovation.id} innovation={innovation} index={i} />
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/innovations"
              className="inline-flex items-center gap-2 px-6 py-3 bg-green-700 text-white rounded-xl font-semibold hover:bg-green-600 transition-colors shadow-sm"
            >
              View All Innovations
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── WHY RURAL INNOVATION ─── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={stagger}
            className="text-center mb-14"
          >
            <motion.span
              variants={fadeUp}
              className="inline-block px-4 py-1.5 bg-amber-100 text-amber-800 rounded-full text-sm font-semibold mb-3"
            >
              Why It Matters
            </motion.span>
            <motion.h2
              variants={fadeUp}
              className="text-3xl sm:text-4xl font-extrabold text-gray-900"
            >
              Why Rural Innovation Matters
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7"
          >
            {[
              {
                icon: TrendingUp,
                color: 'bg-green-100 text-green-700',
                title: '40% Cost Reduction',
                desc: 'Farmers report up to 40% reduction in operational costs after adopting community innovations.',
              },
              {
                icon: Droplets,
                color: 'bg-blue-100 text-blue-700',
                title: '60% Water Savings',
                desc: 'Innovative irrigation techniques help save up to 60% of water compared to traditional flood irrigation.',
              },
              {
                icon: Sun,
                color: 'bg-yellow-100 text-yellow-700',
                title: 'Zero Electricity Cost',
                desc: 'Solar and human-powered innovations eliminate electricity bills for millions of small farmers.',
              },
              {
                icon: Users,
                color: 'bg-purple-100 text-purple-700',
                title: 'Community Knowledge',
                desc: 'Peer-to-peer knowledge transfer accelerates adoption and improves livelihoods across villages.',
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="text-center p-6 rounded-2xl bg-gray-50 hover:shadow-md transition-shadow"
              >
                <div
                  className={`w-12 h-12 ${item.color} rounded-xl flex items-center justify-center mx-auto mb-4`}
                >
                  <item.icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── COMMUNITY IMPACT ─── */}
      <section className="py-20 bg-gradient-to-br from-green-900 to-green-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={stagger}
            className="text-center mb-14"
          >
            <motion.h2
              variants={fadeUp}
              className="text-3xl sm:text-4xl font-extrabold"
            >
              Community Impact
            </motion.h2>
            <motion.p variants={fadeUp} className="mt-3 text-green-200 text-lg">
              Numbers that tell the story of rural transformation.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={stagger}
            className="grid grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {[
              { value: 500, suffix: '+', label: 'Active Farmers', icon: Users },
              { value: 200, suffix: '+', label: 'Innovations Shared', icon: Lightbulb },
              { value: 22, suffix: '', label: 'Indian States', icon: MapPin },
              { value: 1200, suffix: '+', label: 'Farmers Helped', icon: Star },
            ].map((stat, i) => (
              <motion.div key={i} variants={fadeUp} className="text-center group">
                <div className="w-14 h-14 rounded-2xl bg-green-700/60 flex items-center justify-center mx-auto mb-3 group-hover:bg-green-600/60 transition-colors">
                  <stat.icon className="w-7 h-7 text-green-300" />
                </div>
                <p className="text-4xl font-extrabold text-white">
                  <CountUp target={stat.value} suffix={stat.suffix} />
                </p>
                <p className="text-green-300 mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── CTA BANNER ─── */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={stagger}
          >
            <motion.div
              variants={fadeUp}
              className="w-16 h-16 rounded-2xl bg-green-700 flex items-center justify-center mx-auto mb-6"
            >
              <Sprout className="w-8 h-8 text-white" />
            </motion.div>
            <motion.h2
              variants={fadeUp}
              className="text-3xl sm:text-4xl font-extrabold text-gray-900"
            >
              Join the Innovation Community
            </motion.h2>
            <motion.p variants={fadeUp} className="mt-4 text-gray-500 text-lg max-w-xl mx-auto">
              Share your farming innovations with thousands of farmers across India. Your idea
              could transform someone&apos;s livelihood.
            </motion.p>
            <motion.div variants={fadeUp} className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                href="/signin"
                className="px-8 py-3.5 bg-green-700 text-white rounded-xl font-semibold hover:bg-green-600 transition-colors shadow-md"
              >
                Join Community Free
              </Link>
              <Link
                href="/farmers"
                className="px-8 py-3.5 border-2 border-green-200 text-green-700 rounded-xl font-semibold hover:bg-green-50 transition-colors"
              >
                Meet Our Farmers
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
