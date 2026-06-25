'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  Upload,
  ImagePlus,
  Plus,
  Minus,
  Lightbulb,
  AlertCircle,
  CheckCircle2,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { CATEGORIES } from '@/utils/helpers';
import toast from 'react-hot-toast';
import Link from 'next/link';

const STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
  'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
  'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
  'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
];

export default function UploadPage() {
  const router = useRouter();
  const { user, addInnovation } = useApp();
  const [submitting, setSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [imageBase64, setImageBase64] = useState<string>('');

  const [form, setForm] = useState({
    title: '',
    description: '',
    category: CATEGORIES[0] as string,
    village: user?.village || '',
    state: '',
    estimatedCost: '',
    materials: [''],
    replicationSteps: [''],
    license: 'Open Source',
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

  const updateMat = (index: number, value: string) => {
    const updated = [...form.materials];
    updated[index] = value;
    setForm({ ...form, materials: updated });
  };

  const updateStep = (index: number, value: string) => {
    const updated = [...form.replicationSteps];
    updated[index] = value;
    setForm({ ...form, replicationSteps: updated });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error('Please sign in first!');
      router.push('/signin');
      return;
    }

    if (!form.title.trim() || !form.description.trim() || !form.estimatedCost || !form.state) {
      toast.error('Please fill in all required fields');
      return;
    }

    const validMats = form.materials.filter((m) => m.trim());
    const validSteps = form.replicationSteps.filter((s) => s.trim());

    if (validMats.length === 0 || validSteps.length === 0) {
      toast.error('Add at least one material and one step');
      return;
    }

    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 600));

    const imageSrc = imageBase64 || 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80';

    const result = addInnovation({
      title: form.title.trim(),
      description: form.description.trim(),
      farmerId: user.id,
      farmerName: user.name,
      category: form.category,
      image: imageSrc,
      images: [imageSrc],
      materials: validMats,
      estimatedCost: parseInt(form.estimatedCost, 10),
      replicationSteps: validSteps,
      village: form.village.trim() || user.village,
      state: form.state,
      likes: 0,
      license: form.license,
    });

    setSubmitting(false);

    if (!result.success) {
      toast.error(result.error ?? 'Submission failed. Please try again.');
      return;
    }

    toast.success('Innovation shared with the community!');
    router.push('/innovations');
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-sm p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Lightbulb className="w-8 h-8 text-green-700" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Sign in to Share</h2>
          <p className="text-gray-500 text-sm mb-6">
            Join the community to share your farming innovations with thousands of farmers across
            India.
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
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-3xl font-extrabold">Share Your Innovation</h1>
            <p className="mt-2 text-green-200">
              Help fellow farmers by documenting your low-cost agricultural innovation.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          onSubmit={handleSubmit}
          className="space-y-7"
        >
          {/* Basic Info */}
          <div className="bg-white rounded-2xl p-6 shadow-sm space-y-5">
            <h2 className="font-bold text-gray-900 text-lg border-b border-gray-100 pb-3">
              Basic Information
            </h2>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Innovation Title *
              </label>
              <input
                type="text"
                required
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="e.g., Low-Cost Solar Water Heater"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Description *
              </label>
              <textarea
                required
                rows={4}
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                placeholder="Describe your innovation — what it does, how it helps, and why it works…"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 resize-none"
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Category *
                </label>
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Estimated Cost (₹) *
                </label>
                <input
                  type="number"
                  required
                  min="0"
                  value={form.estimatedCost}
                  onChange={(e) => setForm({ ...form, estimatedCost: e.target.value })}
                  placeholder="e.g., 2500"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">License</label>
                <select
                  value={form.license}
                  onChange={(e) => setForm({ ...form, license: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
                >
                  <option value="Open Source">Open Source</option>
                  <option value="Community Use">Community Use</option>
                  <option value="CC BY-NC">CC BY-NC</option>
                  <option value="All Rights Reserved">All Rights Reserved</option>
                </select>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Village</label>
                <input
                  type="text"
                  value={form.village}
                  onChange={(e) => setForm({ ...form, village: e.target.value })}
                  placeholder={user.village}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">State *</label>
                <select
                  required
                  value={form.state}
                  onChange={(e) => setForm({ ...form, state: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
                >
                  <option value="">Select State</option>
                  {STATES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Image Upload */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h2 className="font-bold text-gray-900 text-lg border-b border-gray-100 pb-3 mb-5">
              Innovation Image
            </h2>
            <label className="cursor-pointer">
              <div
                className={`border-2 border-dashed rounded-2xl p-8 text-center transition-colors ${
                  imagePreview
                    ? 'border-green-400 bg-green-50'
                    : 'border-gray-200 hover:border-green-400 hover:bg-green-50'
                }`}
              >
                {imagePreview ? (
                  <div className="space-y-3">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="max-h-48 mx-auto rounded-xl object-cover"
                    />
                    <p className="text-green-700 text-sm font-semibold flex items-center justify-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4" />
                      Image selected — click to change
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <ImagePlus className="w-10 h-10 text-gray-300 mx-auto" />
                    <p className="text-gray-500 text-sm font-medium">Click to upload an image</p>
                    <p className="text-gray-400 text-xs">JPG, PNG, WebP — max 5MB</p>
                  </div>
                )}
              </div>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </label>
          </div>

          {/* Materials */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3 mb-5">
              <h2 className="font-bold text-gray-900 text-lg">Materials Required</h2>
              <button
                type="button"
                onClick={() => setForm({ ...form, materials: [...form.materials, ''] })}
                className="flex items-center gap-1 text-sm text-green-700 font-semibold hover:text-green-600"
              >
                <Plus className="w-4 h-4" />
                Add
              </button>
            </div>
            <div className="space-y-3">
              {form.materials.map((mat, i) => (
                <div key={i} className="flex gap-2">
                  <span className="w-6 h-6 rounded-full bg-green-100 text-green-700 text-xs font-bold flex items-center justify-center flex-shrink-0 mt-2.5">
                    {i + 1}
                  </span>
                  <input
                    type="text"
                    value={mat}
                    onChange={(e) => updateMat(i, e.target.value)}
                    placeholder={`Material ${i + 1} (e.g., PVC pipe – 1 inch, 5 meters)`}
                    className="flex-1 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
                  />
                  {form.materials.length > 1 && (
                    <button
                      type="button"
                      onClick={() =>
                        setForm({ ...form, materials: form.materials.filter((_, j) => j !== i) })
                      }
                      className="p-2.5 text-gray-300 hover:text-red-400 transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Replication Steps */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3 mb-5">
              <h2 className="font-bold text-gray-900 text-lg">Replication Steps</h2>
              <button
                type="button"
                onClick={() => setForm({ ...form, replicationSteps: [...form.replicationSteps, ''] })}
                className="flex items-center gap-1 text-sm text-green-700 font-semibold hover:text-green-600"
              >
                <Plus className="w-4 h-4" />
                Add Step
              </button>
            </div>
            <div className="space-y-3">
              {form.replicationSteps.map((step, i) => (
                <div key={i} className="flex gap-2">
                  <span className="w-7 h-7 rounded-full bg-green-700 text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-2">
                    {i + 1}
                  </span>
                  <textarea
                    rows={2}
                    value={step}
                    onChange={(e) => updateStep(i, e.target.value)}
                    placeholder={`Step ${i + 1}: Describe this step clearly…`}
                    className="flex-1 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 resize-none"
                  />
                  {form.replicationSteps.length > 1 && (
                    <button
                      type="button"
                      onClick={() =>
                        setForm({
                          ...form,
                          replicationSteps: form.replicationSteps.filter((_, j) => j !== i),
                        })
                      }
                      className="p-2.5 text-gray-300 hover:text-red-400 transition-colors self-start mt-1"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Submit */}
          <div className="bg-green-50 rounded-2xl p-5 border border-green-200 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-green-700 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-green-800">
              Your innovation will be visible to all farmers on the platform immediately. Make sure
              the information is accurate and helpful.
            </p>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full flex items-center justify-center gap-2 py-4 bg-green-700 text-white rounded-xl font-bold text-base hover:bg-green-600 disabled:opacity-60 disabled:cursor-not-allowed transition-colors shadow-md"
          >
            <Upload className="w-5 h-5" />
            {submitting ? 'Sharing Innovation…' : 'Share Innovation with Community'}
          </button>
        </motion.form>
      </div>
    </div>
  );
}
