export const metadata = {
  title: "Contact Us",
  description: "Get in touch with Retford.info. We welcome your feedback, suggestions, and enquiries about Retford, Nottinghamshire.",
};

export default function Contact() {
  return (
    <div className="bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
          Contact Us
        </h1>

        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-600 mb-12">
            We'd love to hear from you! Whether you have a question, suggestion, or would like to contribute information about Retford, please get in touch.
          </p>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-8 mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mt-0 mb-4">Get In Touch</h2>
            <p className="text-gray-700 mb-4">
              We'd love to hear from you! Whether you have questions about Retford, feedback about our content, or suggestions for new articles, we're here to help.
            </p>
            <p className="text-gray-700 mb-6">
              For all enquiries, feedback, suggestions, or to report errors, please email us at:
            </p>
            <p className="mb-4">
              <a href="mailto:info@retford.info" className="text-2xl font-semibold text-blue-700 hover:text-blue-800">
                info@retford.info
              </a>
            </p>
            <p className="text-gray-600 text-sm mb-0">
              We aim to respond to all enquiries within 2-3 working days.
            </p>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">About Retford.info</h2>
          <p className="text-gray-700 mb-4">
            Retford.info is an independent online information resource dedicated to providing comprehensive, accurate, and valuable content about Retford, Nottinghamshire. Established in 2025, we are operated by <a href="https://801web.co" className="text-blue-600 hover:text-blue-700 font-medium">801 Web Co</a>, a digital publishing company focused on creating high-quality local information websites.
          </p>
          <p className="text-gray-700 mb-4">
            Our team includes local residents, researchers, and experienced content creators who are passionate about sharing the story of Retford with visitors and residents. We maintain strict editorial standards and are committed to accuracy, transparency, and providing genuine value to our readers.
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">What We Can Help With</h2>
          
          <div className="grid md:grid-cols-2 gap-6 my-8">
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mt-0 mb-3">General Enquiries</h3>
              <p className="text-gray-700 mb-0">
                Questions about Retford, our content, or how to use the site.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mt-0 mb-3">Content Suggestions</h3>
              <p className="text-gray-700 mb-0">
                Ideas for articles or topics you'd like us to cover about Retford.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mt-0 mb-3">Corrections</h3>
              <p className="text-gray-700 mb-0">
                Spotted an error? Let us know so we can keep our information accurate.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mt-0 mb-3">Partnership Opportunities</h3>
              <p className="text-gray-700 mb-0">
                Interested in working with us? We're open to collaboration with local businesses and organisations.
              </p>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">Response Times</h2>
          <p className="text-gray-700 mb-4">
            We aim to respond to all enquiries within 2-3 working days. During busy periods, it may take slightly longer, but we will get back to you as soon as possible.
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">About Retford</h2>
          <p className="text-gray-700 mb-4">
            Retford is a historic market town in Nottinghamshire, England. For general information about visiting or living in Retford, we recommend browsing our <a href="/articles" className="text-blue-600 hover:text-blue-700 font-medium">articles section</a> or visiting the official Bassetlaw District Council website.
          </p>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-8">
            <p className="text-gray-700 mb-0">
              <strong className="text-gray-900">Please note:</strong> Retford.info is an independent information website and is not affiliated with Bassetlaw District Council or any official government body. For official council services, please visit the Bassetlaw District Council website.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
