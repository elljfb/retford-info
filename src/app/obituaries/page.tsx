import Link from 'next/link';
import ShareButtons from '@/components/ShareButtons';
import ObituariesList from '@/components/obituaries/ObituariesList';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://retford.info';

export const metadata = {
  title: 'Retford Obituaries, Death Notices and Funeral Notices',
  description: 'Search and share Retford obituaries, death notices, funeral notices and memorial tributes.',
  keywords: [
    'Retford Obituaries',
    'Retford Deaths',
    'Retford Death Notices',
    'Retford Funeral Notices',
    'Retford Memorials',
    'Retford In Memoriam',
  ],
  openGraph: {
    title: 'Retford Obituaries, Death Notices and Funeral Notices',
    description: 'Search and share Retford obituaries, death notices, funeral notices and memorial tributes.',
    images: [`${siteUrl}/api/og?title=Retford%20Obituaries&subtitle=Death%20Notices%20and%20Tributes`],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Retford Obituaries, Death Notices and Funeral Notices',
    description: 'Search and share Retford obituaries, death notices, funeral notices and memorial tributes.',
    images: [`${siteUrl}/api/og?title=Retford%20Obituaries&subtitle=Death%20Notices%20and%20Tributes`],
  },
};

export default function ObituariesPage() {
  return (
    <>
      <section
        className="relative w-full h-96 bg-gradient-to-r from-blue-400 to-blue-300 flex items-center justify-center"
        style={{ backgroundImage: 'url(/obituaries.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <div className="relative text-center text-white z-10 px-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Retford Obituaries</h1>
          <div className="flex justify-center">
            <ShareButtons title="Retford Obituaries | Retford.info" />
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 items-start">
          <div>
            <h2 className="text-4xl font-bold mb-6">Retford Death Notices And Tributes</h2>
            <div className="entry-content space-y-4">
              <p className="text-lg leading-relaxed text-gray-700">
                Find the latest Retford obituaries, death notices, funeral notices and memorial tributes. Each notice can be shared with family and friends, with a dedicated page for messages of condolence.
              </p>
              <p className="text-lg leading-relaxed text-gray-700">
                You can search by name, filter by notice type, and submit a new notice with a photo for publication on Retford.info.
              </p>
            </div>
          </div>
          <Link
            href="/obituaries/submit"
            className="inline-flex items-center justify-center bg-accent text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-accent-dark hover:text-white transition-colors no-underline"
          >
            Submit a notice
          </Link>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-12">
        <ObituariesList />
      </section>
    </>
  );
}
