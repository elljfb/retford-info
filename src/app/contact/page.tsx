import Link from 'next/link';
import ContactForm from '@/components/ContactForm';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://retford.info';

export const metadata = {
  title: 'Contact Us - Retford, Nottinghamshire',
  description: 'Get in touch with Retford.info for business listings, advertising, or general inquiries.',
  openGraph: {
    title: 'Contact Us - Retford, Nottinghamshire',
    description: 'Get in touch with Retford.info for business listings, advertising, or general inquiries.',
    images: [`${siteUrl}/api/og?title=Contact%20Us&subtitle=Retford.info`],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Us - Retford, Nottinghamshire',
    description: 'Get in touch with Retford.info for business listings, advertising, or general inquiries.',
    images: [`${siteUrl}/api/og?title=Contact%20Us&subtitle=Retford.info`],
  },
};

export default function Contact() {
  return (
    <>
      <section className="relative w-full h-80 bg-gradient-to-r from-blue-400 to-blue-300 flex items-center justify-center" style={{backgroundImage: 'url(/retford-town-hall.jpg)', backgroundSize: 'cover', backgroundPosition: 'center'}}>
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative text-center text-white z-10 px-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold">Contact Us</h1>
        </div>
      </section>

      <div className="max-w-2xl mx-auto px-6 py-12">
        <div className="mb-12">
          <ContactForm />
        </div>

        {/* Additional Information */}
        <div className="entry-content bg-gray-50 p-8 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Other Pages</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link href="/about" className="text-accent-dark hover:underline">
              → About Retford.info
            </Link>
            <Link href="/advertise" className="text-accent-dark hover:underline">
              → Get Your Business Listed
            </Link>
            <Link href="/privacy" className="text-accent-dark hover:underline">
              → Privacy Policy
            </Link>
            <Link href="/terms" className="text-accent-dark hover:underline">
              → Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
