import Link from 'next/link';
import ContactForm from '@/components/ContactForm';

export const metadata = {
  title: 'Contact Us - Retford, Nottinghamshire',
  description: 'Get in touch with Retford.info for business listings, advertising, or general inquiries.',
  openGraph: {
    title: 'Contact Us - Retford, Nottinghamshire',
    description: 'Get in touch with Retford.info for business listings, advertising, or general inquiries.',
    images: ['/api/og?title=Contact%20Us&subtitle=Retford.info'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Us - Retford, Nottinghamshire',
    description: 'Get in touch with Retford.info for business listings, advertising, or general inquiries.',
    images: ['/api/og?title=Contact%20Us&subtitle=Retford.info'],
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

      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
          {/* Contact Information */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Get In Touch</h2>
            <p className="text-gray-700 mb-8">
              Have questions about listings, advertising, or anything else? We'd love to hear from you!
            </p>

            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-lg mb-2">Email</h3>
                <a href="mailto:info@retfordbusinesshub.co.uk" className="text-accent-dark hover:underline">
                  info@retfordbusinesshub.co.uk
                </a>
              </div>

              <div>
                <h3 className="font-bold text-lg mb-2">Location</h3>
                <p className="text-gray-700">
                  Retford<br />
                  Nottinghamshire<br />
                  England
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <ContactForm />
          </div>
        </div>

        {/* Additional Information */}
        <div className="bg-gray-50 p-8 rounded-lg">
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
