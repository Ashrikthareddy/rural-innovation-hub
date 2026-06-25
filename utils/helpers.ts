import { formatDistanceToNow, format } from 'date-fns';

export function formatRelativeDate(dateStr: string): string {
  try {
    return formatDistanceToNow(new Date(dateStr), { addSuffix: true });
  } catch {
    return dateStr;
  }
}

export function formatDate(dateStr: string): string {
  try {
    return format(new Date(dateStr), 'MMM d, yyyy');
  } catch {
    return dateStr;
  }
}

export function formatCurrency(amount: number): string {
  return `₹${amount.toLocaleString('en-IN')}`;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export function generateUserId(name: string, village: string): string {
  return `user-${slugify(name)}-${slugify(village)}-${Date.now()}`;
}

export const CATEGORIES = [
  'Post-Harvest',
  'Irrigation',
  'Water Management',
  'Farm Tools',
  'Crop Protection',
  'Soil Health',
  'Energy',
  'Other',
] as const;

export type Category = (typeof CATEGORIES)[number];

export const CATEGORY_COLORS: Record<string, string> = {
  'Post-Harvest': 'bg-orange-100 text-orange-800',
  Irrigation: 'bg-blue-100 text-blue-800',
  'Water Management': 'bg-cyan-100 text-cyan-800',
  'Farm Tools': 'bg-yellow-100 text-yellow-800',
  'Crop Protection': 'bg-red-100 text-red-800',
  'Soil Health': 'bg-amber-100 text-amber-800',
  Energy: 'bg-purple-100 text-purple-800',
  Other: 'bg-gray-100 text-gray-800',
};
