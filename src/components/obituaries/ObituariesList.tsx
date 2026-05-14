'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { CalendarDays, MessageCircle, Search, SlidersHorizontal, User } from 'lucide-react';
import {
  fetchPublishedObituaries,
  formatNoticeType,
  hasSupabaseObituariesConfig,
  obituaryNoticeTypes,
  type Obituary,
  type ObituaryNoticeType,
} from '@/lib/supabase-obituaries';
import { formatDate } from '@/lib/utils';

type FilterType = 'all' | ObituaryNoticeType;

export default function ObituariesList() {
  const isSupabaseConfigured = hasSupabaseObituariesConfig();
  const [obituaries, setObituaries] = useState<Obituary[]>([]);
  const [search, setSearch] = useState('');
  const [noticeType, setNoticeType] = useState<FilterType>('all');
  const [town, setTown] = useState('all');
  const [loading, setLoading] = useState(isSupabaseConfigured);
  const [error, setError] = useState(isSupabaseConfigured ? '' : 'Supabase is not configured yet.');

  useEffect(() => {
    if (!isSupabaseConfigured) {
      return;
    }

    fetchPublishedObituaries()
      .then(setObituaries)
      .catch(() => setError('Obituaries could not be loaded right now.'))
      .finally(() => setLoading(false));
  }, [isSupabaseConfigured]);

  const towns = useMemo(() => {
    const uniqueTowns = new Set(
      obituaries
        .map(obituary => obituary.town?.trim())
        .filter((value): value is string => Boolean(value))
    );

    return Array.from(uniqueTowns).sort((a, b) => a.localeCompare(b));
  }, [obituaries]);

  const filteredObituaries = useMemo(() => {
    const query = search.trim().toLowerCase();

    return obituaries.filter(obituary => {
      const matchesType = noticeType === 'all' || obituary.notice_type === noticeType;
      const matchesTown = town === 'all' || obituary.town === town;
      const searchable = [
        obituary.full_name,
        obituary.known_as,
        obituary.town,
        obituary.summary,
        obituary.tribute,
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();

      return matchesType && matchesTown && (!query || searchable.includes(query));
    });
  }, [obituaries, search, noticeType, town]);

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_0.8fr_0.8fr] gap-4 items-end">
        <label className="block">
          <span className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
            <Search size={16} />
            Search notices
          </span>
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search by name, place, or words in the notice"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </label>

        <label className="block">
          <span className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
            <SlidersHorizontal size={16} />
            Notice type
          </span>
          <select
            value={noticeType}
            onChange={(event) => setNoticeType(event.target.value as FilterType)}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-accent"
          >
            <option value="all">All notices</option>
            {obituaryNoticeTypes.map(item => (
              <option key={item.value} value={item.value}>{item.label}</option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="text-sm font-semibold text-gray-700 mb-2">Place</span>
          <select
            value={town}
            onChange={(event) => setTown(event.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-accent"
          >
            <option value="all">All places</option>
            {towns.map(item => (
              <option key={item} value={item}>{item}</option>
            ))}
          </select>
        </label>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <p className="text-gray-600">
          {loading ? 'Loading notices...' : `${filteredObituaries.length} notice${filteredObituaries.length === 1 ? '' : 's'} found`}
        </p>
        <Link
          href="/obituaries/submit"
          className="inline-flex items-center justify-center bg-accent text-gray-900 px-5 py-3 rounded-lg font-semibold hover:bg-accent-dark hover:text-white transition-colors no-underline"
        >
          Submit a notice
        </Link>
      </div>

      {error && (
        <div className="border border-yellow-300 bg-yellow-50 text-yellow-900 rounded-lg p-4">
          {error} Add your Supabase environment variables and run the SQL setup to enable this section.
        </div>
      )}

      {!loading && !error && filteredObituaries.length === 0 && (
        <div className="text-center py-12 border border-gray-200 rounded-lg">
          <p className="text-gray-600 text-lg">No notices match your search.</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredObituaries.map(obituary => (
          <Link
            key={obituary.id}
            href={`/obituaries/${obituary.slug}`}
            className="block group bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow overflow-hidden no-underline"
          >
            <div className="h-48 bg-gray-100 relative">
              {obituary.image_url ? (
                <img
                  src={obituary.image_url}
                  alt={obituary.full_name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-accent to-blue-300 flex items-center justify-center text-white">
                  <User size={58} strokeWidth={1.5} />
                </div>
              )}
              <span className="absolute top-3 left-3 bg-white text-gray-900 text-xs font-semibold px-3 py-1 rounded-full shadow">
                {formatNoticeType(obituary.notice_type)}
              </span>
            </div>
            <div className="p-5">
              <h2 className="text-xl font-bold group-hover:text-accent-dark line-clamp-2">
                {obituary.full_name}
              </h2>
              {obituary.known_as && (
                <p className="text-gray-500 mt-1">Known as {obituary.known_as}</p>
              )}
              <div className="mt-4 space-y-2 text-sm text-gray-600">
                {obituary.date_of_death && (
                  <p className="flex items-center gap-2">
                    <CalendarDays size={16} />
                    Died {formatDate(obituary.date_of_death)}
                    {obituary.age ? `, aged ${obituary.age}` : ''}
                  </p>
                )}
                <p className="flex items-center gap-2">
                  <MessageCircle size={16} />
                  {obituary.comment_count} tribute{obituary.comment_count === 1 ? '' : 's'}
                </p>
              </div>
              {obituary.summary && (
                <p className="text-gray-700 text-sm leading-relaxed mt-4 line-clamp-3">
                  {obituary.summary}
                </p>
              )}
              <span className="inline-block mt-4 text-accent-dark text-sm font-semibold group-hover:underline">
                View notice
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
