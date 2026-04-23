import Image from 'next/image';

export const metadata = {
  title: "About Retford",
  description: "Learn about Retford, a historic market town in Nottinghamshire. Discover its rich heritage, local attractions, and community life.",
};

export default function About() {
  return (
    <div className="bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
          About Retford.info
        </h1>

        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-600 mb-8">
            Welcome to Retford.info, your comprehensive online guide to Retford, Nottinghamshire. We are dedicated to providing visitors and residents with accurate, helpful information about this historic market town.
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">About Retford</h2>
          <p className="text-gray-700 mb-4">
            Retford is a historic market town in the Bassetlaw district of Nottinghamshire, England, with a rich and fascinating history stretching back over a thousand years.
          </p>

          <p className="text-gray-700 mb-4">
            The town's origins can be traced to Anglo-Saxon times, and it was mentioned in the Domesday Book of 1086. Throughout the medieval period, Retford developed as an important market town, with St Swithun&apos;s Church and the market square reflecting this heritage.
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">Heritage and Setting</h2>
          <p className="text-gray-700 mb-4">
            Retford is known for its Georgian townscape, traditional markets, strong railway history, and attractive surrounding countryside.
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">Modern Retford</h2>
          <p className="text-gray-700 mb-4">
            Today, Retford remains a thriving market town with regular markets, independent businesses, and excellent road and rail links.
          </p>

          <p className="text-gray-700 mb-4">
            The town also benefits from nearby blue spaces such as Kings&apos; Park and Idle Valley Nature Reserve, alongside canalside and countryside walks.
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">Our Mission</h2>
          <p className="text-gray-700 mb-4">
            Retford.info was established in 2025 with a clear mission: to create the most comprehensive, accurate, and user-friendly online resource about Retford and the surrounding area. We recognized that visitors, potential residents, and even long-time locals needed a centralized hub for reliable information about this historic market town.
          </p>

          <p className="text-gray-700 mb-4">
            Our team consists of local residents, history enthusiasts, and experienced content creators who are passionate about Retford and its heritage. We combine local knowledge with thorough research to ensure every article meets high standards of accuracy and usefulness. Each piece of content is carefully fact-checked and regularly updated to reflect changes in the town.
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">Local Author</h2>
          <div className="my-8 max-w-xs">
            <Image
              src="/images/brenda-cooper.jpg"
              alt="Brenda Cooper"
              width={320}
              height={400}
              className="rounded-lg border border-gray-200"
            />
          </div>
          <p className="text-gray-700 mb-4">
            <a href="/authors/brenda-cooper" className="text-blue-600 hover:text-blue-700 font-medium">Brenda Cooper</a> is one of the named contributors behind Retford.info. Brenda has longstanding family ties to Retford and helps shape our coverage with practical local knowledge of the town centre, its history, and the everyday questions visitors and residents actually ask.
          </p>
          <p className="text-gray-700 mb-4">
            When we publish guides about places, services, and local life in Retford, we want readers to know that the work is informed by someone with a real connection to the area rather than by an anonymous editorial label alone.
          </p>
          <p className="text-gray-700 mb-4">
            We now show fixed review dates on articles instead of automatically refreshing them on every page load. Where a guide depends on organisers, public listings, or official information, we also aim to show source notes directly on the page.
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">What We Cover</h2>
          <div className="grid md:grid-cols-2 gap-6 my-8">
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mt-0 mb-3">Local Attractions</h3>
              <p className="text-gray-700 mb-0">
                Comprehensive guides to Retford&apos;s historic sites, museums, parks, and major points of interest in the area.
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mt-0 mb-3">History & Heritage</h3>
              <p className="text-gray-700 mb-0">
                In-depth articles about Retford's rich history, from its Domesday Book origins through medieval times to the present day.
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mt-0 mb-3">Practical Information</h3>
              <p className="text-gray-700 mb-0">
                Transport links, accommodation options, shopping facilities, dining recommendations, and essential visitor information.
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mt-0 mb-3">Community Resources</h3>
              <p className="text-gray-700 mb-0">
                Information about schools, local services, sports facilities, community events, and resources for residents.
              </p>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">Our Editorial Standards</h2>
          <p className="text-gray-700 mb-4">
            We maintain strict editorial standards to ensure the information on Retford.info is reliable and valuable:
          </p>
          <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
            <li>All content is thoroughly researched using reputable sources including local archives, official council resources, and established historical records</li>
            <li>Articles are written by knowledgeable contributors with local expertise and understanding of Retford</li>
            <li>Information is regularly reviewed and updated to reflect current circumstances</li>
            <li>We fact-check all historical claims and verify practical information such as opening times and contact details</li>
            <li>We clearly distinguish between factual information and opinion or recommendations</li>
            <li>We welcome corrections and feedback from our community to maintain accuracy</li>
          </ul>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">Who This Site Is For</h2>
          <p className="text-gray-700 mb-4">
            Retford.info serves multiple audiences:
          </p>
          <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
            <li><strong>Visitors:</strong> Planning a day trip, weekend visit, or extended stay in the area and looking for comprehensive information about attractions, accommodation, and things to do</li>
            <li><strong>Prospective Residents:</strong> Considering moving to Retford and wanting to learn about the town, its amenities, schools, transport links, and community</li>
            <li><strong>Current Residents:</strong> Long-time locals looking to discover something new about their town, learn about its history, or find information about local services and events</li>
            <li><strong>History Enthusiasts:</strong> Interested in local heritage and the development of English market towns</li>
            <li><strong>Researchers & Students:</strong> Seeking reliable information about Retford for academic or personal research projects</li>
          </ul>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">Independence & Transparency</h2>
          <p className="text-gray-700 mb-4">
            Retford.info is an independent information resource. We are not affiliated with Bassetlaw District Council, Nottinghamshire County Council, or any official government body. While we strive to provide accurate information about official services and facilities, we always recommend verifying critical details directly with the relevant authorities.
          </p>
          <p className="text-gray-700 mb-4">
            Our website is funded through advertising and we may earn commission from affiliate links to accommodation booking sites and other services. However, our editorial content is never influenced by commercial relationships. We provide honest, unbiased information to help our readers make informed decisions.
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">Contact Us</h2>
          <p className="text-gray-700 mb-4">
            We welcome your feedback, suggestions, and contributions. If you have information about Retford that you'd like to share, or if you've spotted an error on our site, please don't hesitate to get in touch via our <a href="/contact" className="text-blue-600 hover:text-blue-700 font-medium">contact page</a>.
          </p>

          <Image src="/images/retford-info.png" alt="Retford.info logo" width={200} height={200} className="rounded mb-2" />
        </div>
      </div>
    </div>
  );
}
