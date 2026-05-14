import Link from 'next/link';
import ObituarySubmitForm from '@/components/obituaries/ObituarySubmitForm';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://retford.info';

export const metadata = {
  title: 'Submit a Retford Obituary or Death Notice',
  description: 'Submit a Retford obituary, death notice, funeral notice or memorial tribute with a photo.',
  keywords: [
    'Submit Retford Obituary',
    'Retford Death Notices',
    'Retford Obituaries',
    'Retford Funeral Notices',
  ],
  openGraph: {
    title: 'Submit a Retford Obituary or Death Notice',
    description: 'Submit a Retford obituary, death notice, funeral notice or memorial tribute with a photo.',
    images: [`${siteUrl}/api/og?title=Submit%20a%20Notice&subtitle=Retford%20Obituaries`],
  },
};

export default function SubmitObituaryPage() {
  return (
    <>
      <section
        className="relative w-full h-80 bg-gradient-to-r from-blue-400 to-blue-300 flex items-center justify-center"
        style={{ backgroundImage: 'url(/obituaries.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <div className="relative text-center text-white z-10 px-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">Submit a Notice</h1>
          <p className="text-lg max-w-2xl mx-auto">Create a Retford obituary, death notice, funeral notice or memorial page.</p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 py-12">
        <Link href="/obituaries" className="text-accent-dark font-semibold hover:underline">
          Back to obituaries
        </Link>
        <div className="mt-8">
          <ObituarySubmitForm />
        </div>
      </section>
    </>
  );
}
