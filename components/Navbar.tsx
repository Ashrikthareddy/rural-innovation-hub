'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Leaf, Menu, X, User, LogOut, Upload, Sprout, UserPlus, ShoppingCart } from 'lucide-react';
import { useApp } from '@/context/AppContext';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/innovations', label: 'Innovations' },
  { href: '/farmers', label: 'Farmers' },
  { href: '/upload', label: 'Share Innovation' },
  { href: '/add-farmer', label: 'Add Farmer' },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, signOut, isLoaded, cart } = useApp();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleSignOut = () => {
    signOut();
    setUserMenuOpen(false);
    router.push('/');
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-md' : 'bg-white/95 backdrop-blur-sm shadow-sm'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 bg-green-700 rounded-xl flex items-center justify-center group-hover:bg-green-600 transition-colors">
              <Sprout className="w-5 h-5 text-white" />
            </div>
            <div className="hidden sm:block">
              <span className="text-green-800 font-bold text-lg leading-none">Rural</span>
              <span className="text-green-600 font-bold text-lg leading-none ml-1">
                Innovation Hub
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  pathname === link.href
                    ? 'bg-green-100 text-green-800'
                    : 'text-gray-600 hover:text-green-700 hover:bg-green-50'
                }`}
              >
                {link.label === 'Share Innovation' ? (
                  <span className="flex items-center gap-1.5">
                    <Upload className="w-3.5 h-3.5" />
                    {link.label}
                  </span>
                ) : link.label === 'Add Farmer' ? (
                  <span className="flex items-center gap-1.5">
                    <UserPlus className="w-3.5 h-3.5" />
                    {link.label}
                  </span>
                ) : (
                  link.label
                )}
              </Link>
            ))}
          </div>

          {/* Cart + User area */}
          <div className="hidden md:flex items-center gap-3">
            <Link href="/cart" className="relative p-2 rounded-xl hover:bg-green-50 transition-colors">
              <ShoppingCart className="w-5 h-5 text-gray-600" />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-700 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {cart.length > 9 ? '9+' : cart.length}
                </span>
              )}
            </Link>
            {!isLoaded ? (
              <div className="w-24 h-8 bg-gray-100 rounded-lg animate-pulse" />
            ) : user ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-green-50 transition-colors border border-green-200"
                >
                  <div className="w-7 h-7 bg-green-700 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">
                      {user.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-semibold text-gray-800 leading-none">{user.name}</p>
                    <p className="text-xs text-gray-500 leading-none mt-0.5">{user.village}</p>
                  </div>
                </button>

                <AnimatePresence>
                  {userMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.95 }}
                      className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden"
                    >
                      <button
                        onClick={handleSignOut}
                        className="w-full flex items-center gap-2 px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                href="/signin"
                className="flex items-center gap-2 px-4 py-2 bg-green-700 text-white rounded-xl text-sm font-medium hover:bg-green-600 transition-colors shadow-sm"
              >
                <User className="w-4 h-4" />
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-gray-100 bg-white overflow-hidden"
          >
            <div className="px-4 py-3 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`block px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    pathname === link.href
                      ? 'bg-green-100 text-green-800'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {link.label}
                </Link>
              ))}

              {/* Mobile cart link */}
              <Link
                href="/cart"
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  pathname === '/cart' ? 'bg-green-100 text-green-800' : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <ShoppingCart className="w-4 h-4" />
                My Cart
                {cart.length > 0 && (
                  <span className="ml-auto w-5 h-5 bg-green-700 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {cart.length > 9 ? '9+' : cart.length}
                  </span>
                )}
              </Link>

              <div className="pt-2 border-t border-gray-100 mt-2">
                {user ? (
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 px-4 py-2">
                      <div className="w-8 h-8 bg-green-700 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-bold">
                          {user.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-800">{user.name}</p>
                        <p className="text-xs text-gray-500">{user.village}</p>
                      </div>
                    </div>
                    <button
                      onClick={handleSignOut}
                      className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <Link
                    href="/signin"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-center gap-2 mx-2 px-4 py-2.5 bg-green-700 text-white rounded-xl text-sm font-medium hover:bg-green-600 transition-colors"
                  >
                    <User className="w-4 h-4" />
                    Sign In
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
