'use client';

import { FormEvent, useEffect, useState } from 'react';
import { MessageCircle, Send } from 'lucide-react';
import {
  fetchObituaryComments,
  insertObituaryComment,
  type ObituaryComment,
} from '@/lib/supabase-obituaries';
import { formatDate } from '@/lib/utils';

interface ObituaryCommentsProps {
  obituaryId: string;
}

export default function ObituaryComments({ obituaryId }: ObituaryCommentsProps) {
  const [comments, setComments] = useState<ObituaryComment[]>([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchObituaryComments(obituaryId)
      .then(setComments)
      .catch(() => setError('Tributes could not be loaded right now.'))
      .finally(() => setLoading(false));
  }, [obituaryId]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');

    if (!name.trim() || !message.trim()) {
      setError('Please add your name and message.');
      return;
    }

    try {
      setSubmitting(true);
      const comment = await insertObituaryComment({
        obituary_id: obituaryId,
        commenter_name: name.trim(),
        commenter_email: email.trim() || null,
        message: message.trim(),
      });

      setComments(current => [...current, comment]);
      setName('');
      setEmail('');
      setMessage('');
    } catch (commentError) {
      console.error(commentError);
      setError('Your tribute could not be posted. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="mt-12 pt-12 border-t border-gray-300">
      <div className="flex items-center gap-3 mb-6">
        <MessageCircle className="text-accent-dark" />
        <h2 className="text-2xl font-bold">Tributes And Comments</h2>
      </div>

      {loading && <p className="text-gray-600">Loading tributes...</p>}

      {!loading && comments.length === 0 && (
        <p className="text-gray-600">No tributes have been added yet.</p>
      )}

      <div className="space-y-4">
        {comments.map(comment => (
          <article key={comment.id} className="border border-gray-200 rounded-lg p-5 bg-white">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-3">
              <h3 className="font-bold text-gray-900">{comment.commenter_name}</h3>
              <time className="text-sm text-gray-500">{formatDate(comment.created_at)}</time>
            </div>
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">{comment.message}</p>
          </article>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="mt-8 border border-gray-200 rounded-lg p-6 space-y-5">
        <h3 className="text-xl font-bold">Leave a tribute</h3>
        {error && (
          <div className="border border-red-300 bg-red-50 text-red-800 rounded-lg p-4">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <label className="block">
            <span className="text-sm font-semibold text-gray-700">Your name *</span>
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="mt-2 w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent"
              required
            />
          </label>

          <label className="block">
            <span className="text-sm font-semibold text-gray-700">Your email</span>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="mt-2 w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </label>
        </div>

        <label className="block">
          <span className="text-sm font-semibold text-gray-700">Message *</span>
          <textarea
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            rows={5}
            className="mt-2 w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent"
            required
          />
        </label>

        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center gap-2 bg-accent text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-accent-dark hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Send size={18} />
          {submitting ? 'Posting...' : 'Post tribute'}
        </button>
      </form>
    </section>
  );
}
