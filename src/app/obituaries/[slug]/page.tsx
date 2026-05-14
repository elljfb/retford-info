import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CalendarDays, Gift, MapPin, User } from 'lucide-react';
import ShareButtons from '@/components/ShareButtons';
import ObituaryComments from '@/components/obituaries/ObituaryComments';
import {
  fetchObituaryBySlug,
  formatNoticeType,
  type Obituary,
} from '@/lib/supabase-obituaries';
import { formatDate } from '@/lib/utils';

type ObituaryParams = Promise<{ slug: string }>;

export const dynamic = 'force-dynamic';

function buildDescription(obituary: Obituary) {
  if (obituary.summary) return obituary.summary;
  const place = obituary.town ? ` in ${obituary.town}` : '';
  return `${formatNoticeType(obituary.notice_type)} for ${obituary.full_name}${place}. Share memories and leave tributes.`;
}

function getSafeExternalUrl(url?: string | null) {
  if (!url) return '';

  try {
    const parsed = new URL(url);
    return parsed.protocol === 'https:' || parsed.protocol === 'http:' ? parsed.toString() : '';
  } catch {
    return '';
  }
}

export async function generateMetadata({ params }: { params: ObituaryParams }) {
  const { slug } = await params;
  const obituary = await fetchObituaryBySlug(slug).catch(() => null);

  if (!obituary) return {};

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://retford.info';
  const title = `${obituary.full_name} - Retford Obituary`;
  const description = buildDescription(obituary);
  const image = obituary.image_url || `${siteUrl}/api/og?title=${encodeURIComponent(obituary.full_name)}&subtitle=${encodeURIComponent('Retford Obituary')}`;

  return {
    title,
    description,
    keywords: [
      obituary.full_name,
      'Retford Obituaries',
      'Retford Deaths',
      'Retford Death Notices',
      'Retford Funeral Notices',
    ],
    openGraph: {
      title,
      description,
      images: [image],
      type: 'article',
      publishedTime: obituary.created_at,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
  };
}

export default async function ObituaryPage({ params }: { params: ObituaryParams }) {
  const { slug } = await params;
  const obituary = await fetchObituaryBySlug(slug).catch(() => null);

  if (!obituary) {
    notFound();
  }

  const donationUrl = getSafeExternalUrl(obituary.donation_url);
  const pageUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'https://retford.info'}/obituaries/${obituary.slug}`;
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: `${obituary.full_name} - ${formatNoticeType(obituary.notice_type)}`,
    description: buildDescription(obituary),
    datePublished: obituary.created_at,
    image: obituary.image_url ? [obituary.image_url] : undefined,
    author: {
      '@type': 'Organization',
      name: 'Retford.info',
    },
    mainEntityOfPage: pageUrl,
  };

  return (
    <div className="single-post">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <section
        className="relative w-full h-96 bg-gradient-to-r from-blue-400 to-blue-300 flex items-center justify-center"
        style={{
          backgroundImage: `url(${obituary.image_url || '/retford-town-hall.jpg'})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black opacity-35"></div>
        <div className="relative text-center text-white z-10 px-4">
          <p className="text-sm uppercase font-semibold mb-3">{formatNoticeType(obituary.notice_type)}</p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6">{obituary.full_name}</h1>
          <div className="flex justify-center">
            <ShareButtons title={`${obituary.full_name} | Retford Obituaries`} url={pageUrl} />
          </div>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-6 py-12">
        <article>
          <div className="flex flex-wrap gap-3 mb-8 text-sm text-gray-700">
            {obituary.town && (
              <span className="inline-flex items-center gap-2 bg-gray-100 rounded-full px-4 py-2">
                <MapPin size={16} />
                {obituary.town}
              </span>
            )}
            {obituary.date_of_death && (
              <span className="inline-flex items-center gap-2 bg-gray-100 rounded-full px-4 py-2">
                <CalendarDays size={16} />
                Died {formatDate(obituary.date_of_death)}
              </span>
            )}
            {obituary.age && (
              <span className="inline-flex items-center gap-2 bg-gray-100 rounded-full px-4 py-2">
                <User size={16} />
                Aged {obituary.age}
              </span>
            )}
          </div>

          {obituary.known_as && (
            <p className="text-xl text-gray-600 mb-6">Known as {obituary.known_as}</p>
          )}

          {obituary.image_url && (
            <figure className="mb-8">
              <img
                src={obituary.image_url}
                alt={obituary.full_name}
                className="w-full max-h-[620px] object-contain rounded-lg bg-gray-100"
              />
            </figure>
          )}

          {obituary.summary && (
            <p className="text-xl leading-relaxed text-gray-800 font-medium mb-8">{obituary.summary}</p>
          )}

          <div className="article-content text-gray-700">
            {obituary.tribute && (
              <section>
                <h2>Life And Tribute</h2>
                <p className="whitespace-pre-line">{obituary.tribute}</p>
              </section>
            )}

            {obituary.family_message && (
              <section>
                <h2>Family Message</h2>
                <p className="whitespace-pre-line">{obituary.family_message}</p>
              </section>
            )}

            {(obituary.funeral_date || obituary.funeral_location) && (
              <section>
                <h2>Funeral Details</h2>
                {obituary.funeral_date && (
                  <p>{new Date(obituary.funeral_date).toLocaleString('en-GB', {
                    dateStyle: 'long',
                    timeStyle: 'short',
                  })}</p>
                )}
                {obituary.funeral_location && <p>{obituary.funeral_location}</p>}
              </section>
            )}

            {donationUrl && (
              <section>
                <h2>Donations</h2>
                <a
                  href={donationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-accent text-gray-900 px-5 py-3 rounded-lg font-semibold hover:bg-accent-dark hover:text-white transition-colors no-underline"
                >
                  <Gift size={18} />
                  Make a donation
                </a>
              </section>
            )}
          </div>
        </article>

        <ObituaryComments obituaryId={obituary.id} />

        <div className="mt-12 pt-12 border-t border-gray-300">
          <Link
            href="/obituaries"
            className="inline-block bg-accent text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-accent-dark hover:text-white transition-colors no-underline"
          >
            Back to obituaries
          </Link>
        </div>
      </div>
    </div>
  );
}
