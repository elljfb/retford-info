import Link from 'next/link';

export const metadata = {
  title: 'Contact Us | Retford.info',
  description: 'Get in touch with Retford.info for business listings, advertising, or general inquiries.',
};

export default function Contact() {
  return (
    <>
      <section className="relative w-full h-80 bg-gradient-to-r from-blue-400 to-blue-300 flex items-center justify-center" style={{backgroundImage: 'url(/retford-town-hall.jpg)', backgroundSize: 'cover', backgroundPosition: 'center'}}>
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative text-center text-white z-10">
          <h1 className="text-6xl font-bold">Contact Us</h1>
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
                <a href="mailto:info@retford.info" className="text-accent-dark hover:underline">
                  info@retford.info
                </a>
              </div>

              <div>
                <h3 className="font-bold text-lg mb-2">Phone</h3>
                <a href="tel:+441777" className="text-accent-dark hover:underline">
                  +44 (0)1777 XXXXXX
                </a>
              </div>

              <div>
                <h3 className="font-bold text-lg mb-2">Hours</h3>
                <p className="text-gray-700">
                  Monday - Friday: 9:00 AM - 5:00 PM<br />
                  Saturday: 10:00 AM - 2:00 PM<br />
                  Sunday: Closed
                </p>
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
            <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
            <form className="space-y-4">
              <div>
                <label className="block font-semibold mb-2" htmlFor="name">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full border border-gray-300 rounded px-4 py-2"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold mb-2" htmlFor="email">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full border border-gray-300 rounded px-4 py-2"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold mb-2" htmlFor="subject">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  className="w-full border border-gray-300 rounded px-4 py-2"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold mb-2" htmlFor="message">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  className="w-full border border-gray-300 rounded px-4 py-2"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-accent text-gray-900 font-semibold py-2 rounded hover:bg-accent-dark transition-colors"
              >
                Send Message
              </button>
            </form>
            <p className="text-sm text-gray-600 mt-4">
              We'll get back to you as soon as possible. Thank you for contacting Retford.info!
            </p>
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
