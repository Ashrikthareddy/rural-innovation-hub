'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { UserPlus, AlertCircle } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import toast from 'react-hot-toast';
import Link from 'next/link';

const STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
  'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
  'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
  'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
];

export default function AddFarmerPage() {
  const router = useRouter();
  const { user, addFarmer } = useApp();
  const [submitting, setSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [imageBase64, setImageBase64] = useState<string>('');

  const [form, setForm] = useState({
    name: '',
    village: '',
    state: '',
    bio: '',
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image must be under 5MB');
      return;
    }
    const reader = new FileReader();
    reader.onload = (ev) => {
      const result = ev.target?.result as string;
      setImagePreview(result);
      setImageBase64(result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error('Please sign in first!');
      router.push('/signin');
      return;
    }

    if (!form.name.trim() || !form.village.trim() || !form.state || !form.bio.trim()) {
      toast.error('Please fill in all required fields');
      return;
    }

    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 600));

    const imageSrc =
      imageBase64 ||
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80';

    const result = addFarmer({
      name: form.name.trim(),
      village: form.village.trim(),
      state: form.state,
      bio: form.bio.trim(),
      image: imageSrc,
    });

    setSubmitting(false);

    if (!result.success) {
      toast.error(result.error ?? 'Submission failed. Please try again.');
      return;
    }

    toast.success('Farmer profile added to the community!');
    router.push('/farmers');
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-sm p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <UserPlus className="w-8 h-8 text-green-700" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Sign in to Add a Farmer</h2>
          <p className="text-gray-500 text-sm mb-6">
            Join the community to register new farmer profiles and grow the Rural Innovation Hub
            network.
          </p>
          <Link
            href="/signin"
            className="inline-flex items-center justify-center w-full py-3 bg-green-700 text-white rounded-xl font-semibold hover:bg-green-600 transition-colors"
          >
            Sign In / Join
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-green-900 to-green-700 text-white py-12">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-3xl font-extrabold">Add a Farmer</h1>
            <p className="mt-2 text-green-200">
              Register a new farmer profile so the community can connect and learn from them.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          {/* Farmer Details */}
          <div className="bg-white rounded-2xl p-6 shadow-sm space-y-5">
            <h2 className="font-bold text-gray-900 text-lg border-b border-gray-100 pb-3">
              Farmer Details
            </h2>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Full Name *
              </label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="e.g., Suresh Reddy"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Village / Town *
                </label>
                <input
                  type="text"
                  required
                  value={form.village}
                  onChange={(e) => setForm({ ...form, village: e.target.value })}
                  placeholder="e.g., Nalgonda"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  State *
                </label>
                <select
                  required
                  value={form.state}
                  onChange={(e) => setForm({ ...form, state: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
                >
                  <option value="">Select state…</option>
                  {STATES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Bio / About *
              </label>
              <textarea
                required
                rows={4}
                value={form.bio}
                onChange={(e) => setForm({ ...form, bio: e.target.value })}
                placeholder="Describe the farmer's background, experience, and contributions to agriculture…"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 resize-none"
              />
            </div>
          </div>

          {/* Profile Photo */}
          <div className="bg-white rounded-2xl p-6 shadow-sm space-y-4">
            <h2 className="font-bold text-gray-900 text-lg border-b border-gray-100 pb-3">
              Profile Photo
            </h2>

            <div className="flex items-start gap-5">
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-24 h-24 rounded-2xl object-cover ring-2 ring-green-200 flex-shrink-0"
                />
              ) : (
                <div className="w-24 h-24 rounded-2xl bg-green-50 flex items-center justify-center flex-shrink-0">
                  <UserPlus className="w-10 h-10 text-green-300" />
                </div>
              )}

              <div className="flex-1">
                <label className="cursor-pointer flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-xl p-5 hover:border-green-400 hover:bg-green-50 transition-colors">
                  <span className="text-sm font-medium text-gray-600">
                    {imagePreview ? 'Change photo' : 'Upload photo'}
                  </span>
                  <span className="text-xs text-gray-400 mt-1">JPG, PNG or WEBP · max 5MB</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                </label>
                <p className="text-xs text-gray-400 mt-2 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  A default portrait will be used if no photo is uploaded.
                </p>
              </div>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={submitting}
            className="w-full py-4 bg-green-700 text-white rounded-xl font-bold text-base hover:bg-green-600 active:bg-green-800 transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {submitting ? (
              <>
                <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                Saving Profile…
              </>
            ) : (
              <>
                <UserPlus className="w-5 h-5" />
                Add Farmer to Community
              </>
            )}
          </button>
        </motion.form>
      </div>
    </div>
  );
}
