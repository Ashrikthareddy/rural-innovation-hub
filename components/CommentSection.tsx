'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Send } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { formatRelativeDate } from '@/utils/helpers';
import Link from 'next/link';
import toast from 'react-hot-toast';

interface CommentSectionProps {
  innovationId: string;
}

export default function CommentSection({ innovationId }: CommentSectionProps) {
  const { getInnovationComments, addComment, user } = useApp();
  const comments = getInnovationComments(innovationId);
  const [text, setText] = useState('');
  const [guestName, setGuestName] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    if (!user && !guestName.trim()) {
      toast.error('Please enter your name to comment!');
      return;
    }
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 300));
    addComment(innovationId, text, guestName.trim() || undefined);
    setText('');
    setSubmitting(false);
    toast.success('Comment posted!');
  };

  return (
    <div id="comments" className="mt-10">
      <div className="flex items-center gap-2 mb-6">
        <MessageCircle className="w-5 h-5 text-green-700" />
        <h2 className="text-xl font-bold text-gray-900">
          Community Feedback
          <span className="ml-2 text-base font-normal text-gray-400">({comments.length})</span>
        </h2>
      </div>

      {/* Comment form */}
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="flex gap-3 items-start">
          <div className="w-9 h-9 bg-green-700 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
            <span className="text-white text-sm font-bold">
              {(user?.name ?? (guestName.trim() || '?')).charAt(0).toUpperCase()}
            </span>
          </div>
          <div className="flex-1">
            {!user && (
              <input
                type="text"
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                placeholder="Your name *"
                maxLength={50}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent mb-2"
              />
            )}
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder={user ? `Share your thoughts about this innovation, ${user.name}...` : 'Share your thoughts about this innovation...'}
              rows={3}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent resize-none"
              maxLength={500}
            />
            <div className="flex items-center justify-between mt-2">
              <span className="text-xs text-gray-400">{text.length}/500</span>
              <button
                type="submit"
                disabled={!text.trim() || submitting}
                className="flex items-center gap-1.5 px-4 py-2 bg-green-700 text-white rounded-lg text-sm font-semibold hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Send className="w-3.5 h-3.5" />
                {submitting ? 'Posting...' : 'Post Comment'}
              </button>
            </div>
          </div>
        </div>
      </form>

      {/* Comments list */}
      <div className="space-y-5">
        <AnimatePresence>
          {comments.length === 0 ? (
            <div className="text-center py-10 text-gray-400">
              <MessageCircle className="w-10 h-10 mx-auto mb-2 opacity-30" />
              <p>No comments yet. Be the first to share your feedback!</p>
            </div>
          ) : (
            comments.map((comment, i) => (
              <motion.div
                key={comment.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="flex gap-3"
              >
                <div className="w-9 h-9 bg-gradient-to-br from-green-600 to-green-800 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-sm font-bold">
                    {comment.userName.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="flex-1 bg-gray-50 rounded-xl px-4 py-3">
                  <div className="flex items-baseline justify-between gap-2 mb-1">
                    <span className="font-semibold text-sm text-gray-900">{comment.userName}</span>
                    <span className="text-xs text-gray-400 flex-shrink-0">
                      {formatRelativeDate(comment.createdAt)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed">{comment.text}</p>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
