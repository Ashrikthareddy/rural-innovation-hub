import Link from 'next/link';
import { Sprout, Mail, Github, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-green-950 text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-green-600 rounded-xl flex items-center justify-center">
                <Sprout className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold text-white">Rural Innovation Hub</span>
            </div>
            <p className="text-green-300 text-sm leading-relaxed">
              A community platform where farmers from across India share low-cost agricultural
              innovations to empower each other and transform rural farming.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              {[
                { href: '/', label: 'Home' },
                { href: '/innovations', label: 'Browse Innovations' },
                { href: '/farmers', label: 'Meet Farmers' },
                { href: '/upload', label: 'Share an Innovation' },
                { href: '/signin', label: 'Join Community' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-green-300 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-semibold text-white mb-4">Innovation Categories</h3>
            <ul className="space-y-2 text-sm">
              {[
                'Post-Harvest Processing',
                'Irrigation & Water',
                'Farm Tools',
                'Crop Protection',
                'Soil Health',
                'Renewable Energy',
              ].map((cat) => (
                <li key={cat} className="text-green-300">
                  {cat}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-green-900 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-green-400 text-sm">
            © 2026 Rural Innovation Hub. Built for Indian Farmers.
          </p>
          <p className="text-green-500 text-xs">
            &quot;Technology for the Village, From the Village&quot;
          </p>
        </div>
      </div>
    </footer>
  );
}
