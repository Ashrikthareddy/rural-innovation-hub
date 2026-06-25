import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AppProvider } from '@/context/AppContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ChatBot from '@/components/ChatBot';
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Rural Innovation Hub – Empowering Farmers',
  description:
    'A community platform for Indian farmers to share and discover low-cost agricultural innovations.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppProvider>
          <Navbar />
          <main className="pt-16 min-h-screen">{children}</main>
          <Footer />
          <ChatBot />
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                borderRadius: '12px',
                background: '#166534',
                color: '#fff',
                fontSize: '14px',
              },
              error: {
                style: {
                  background: '#dc2626',
                },
              },
            }}
          />
        </AppProvider>
      </body>
    </html>
  );
}
