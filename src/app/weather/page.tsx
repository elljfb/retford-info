import ShareButtons from '@/components/ShareButtons';

export const metadata = {
  title: 'Weather - Retford, Nottinghamshire',
  description: 'Weather information for Retford, Nottinghamshire.',
};

export default function Weather() {
  return (
    <>
      <section className="relative w-full h-80 bg-gradient-to-r from-blue-400 to-blue-300 flex items-center justify-center" style={{backgroundImage: 'url(/retford-town-hall.jpg)', backgroundSize: 'cover', backgroundPosition: 'center'}}>
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative text-center text-white z-10 px-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold">Weather</h1>
          <div className="flex justify-center">
            <ShareButtons title={`Weather - Retford, Nottinghamshire`} />
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold mb-6">Retford Weather</h2>
        
        {/* Introduction */}
          <div className="entry-content">
            <p className="mb-4 leading-relaxed">
              Retford experiences a temperate climate with moderate rainfall typical of the East Midlands. 
              Located inland in North Nottinghamshire, the town benefits from more stable weather patterns 
              compared to coastal areas, with warm summers and cool winters perfect for exploring the historic 
              market town and surrounding countryside.
            </p>
            <p className="leading-relaxed">
              For your convenience, we have embedded a weather forecast below along with flood warnings for the area. 
              To help you plan your day in Retford, explore our <a href="/categories/things-to-do" className="text-accent-dark hover:underline font-semibold">Things to Do</a> section 
              featuring both indoor and outdoor activities, or browse our <a href="/categories/eat-and-drink" className="text-accent-dark hover:underline font-semibold">Eat & Drink</a> guide 
              for cozy cafes and restaurants whatever the weather.
            </p>
          </div>

          <br></br>
        
        {/* Weather Widget */}
        <div className="bg-white rounded-lg shadow-lg mb-12 overflow-hidden">
          <iframe 
            src="https://www.meteoblue.com/en/weather/widget/daily/retford-gamston-airport_united-kingdom_8532002?days=7&tempunit=CELSIUS&windunit=KILOMETER_PER_HOUR&precipunit=MILLIMETER&coloured=coloured&pictoicon=0&pictoicon=1&maxtemperature=0&maxtemperature=1&mintemperature=0&mintemperature=1&windspeed=0&windspeed=1&windgust=0&winddirection=0&winddirection=1&uv=0&humidity=0&precipitation=0&precipitation=1&precipitationprobability=0&precipitationprobability=1&spot=0&pressure=0&layout=light"
            frameBorder="0" 
            scrolling="NO" 
            allowTransparency={true}
            sandbox="allow-same-origin allow-scripts allow-popups allow-popups-to-escape-sandbox"
            style={{
              width: '100%',
              height: '420px'
            }}
            className="w-full"
          ></iframe>
        </div>

        {/* Flood Warning Widget */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Flood Warnings</h2>
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <iframe 
              title="Flood warnings in Nottinghamshire" 
              src="https://environment.data.gov.uk/flood-widgets/widgets/widget-Nottinghamshire-horizontal.html"
              style={{
                width: '100%',
                height: '160px',
                border: '0'
              }}
              className="w-full"
            ></iframe>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            <a 
              href="https://check-for-flooding.service.gov.uk/location/retford-nottinghamshire" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-accent-dark hover:underline"
            >
              View full Retford flood information on GOV.UK
            </a>
          </p>
        </div>

        {/* Emergency Contacts */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Weather Emergency Contacts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-3 text-red-900">Power Cuts</h3>
              <p className="text-gray-700 mb-2"><strong>Northern Powergrid</strong></p>
              <p className="text-gray-700 mb-1">Emergency: <a href="tel:105" className="text-accent-dark hover:underline font-semibold">105</a></p>
              <p className="text-gray-700 mb-1">Standard: <a href="tel:08003163105" className="text-accent-dark hover:underline">0800 316 3105</a></p>
              <p className="text-sm text-gray-600 mt-2">
                <a href="https://www.northernpowergrid.com" target="_blank" rel="noopener noreferrer" className="text-accent-dark hover:underline">
                  Visit website
                </a>
              </p>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-3 text-blue-900">Flooding</h3>
              <p className="text-gray-700 mb-2"><strong>Environment Agency</strong></p>
              <p className="text-gray-700 mb-1">Floodline: <a href="tel:0345988 1188" className="text-accent-dark hover:underline font-semibold">0345 988 1188</a></p>
              <p className="text-gray-700 mb-1">Emergency: <a href="tel:0800807060" className="text-accent-dark hover:underline font-semibold">0800 80 70 60</a></p>
              <p className="text-sm text-gray-600 mt-2">
                <a href="https://www.gov.uk/report-flood-cause" target="_blank" rel="noopener noreferrer" className="text-accent-dark hover:underline">
                  Report flooding
                </a>
              </p>
            </div>

            <div className="bg-orange-50 border-l-4 border-orange-500 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-3 text-orange-900">Road Issues</h3>
              <p className="text-gray-700 mb-2"><strong>Nottinghamshire County Council</strong></p>
              <p className="text-gray-700 mb-1">Report: <a href="tel:03002500080" className="text-accent-dark hover:underline font-semibold">0300 500 80 80</a></p>
              <p className="text-sm text-gray-600 mt-2">
                <a href="https://www.nottinghamshire.gov.uk/transport/roads" target="_blank" rel="noopener noreferrer" className="text-accent-dark hover:underline">
                  Report road problems online
                </a>
              </p>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-3 text-yellow-900">Severe Weather</h3>
              <p className="text-gray-700 mb-2"><strong>Met Office Warnings</strong></p>
              <p className="text-gray-700 mb-1">Weather Warnings: <a href="tel:03700 100 0 00" className="text-accent-dark hover:underline">0370 900 0100</a></p>
              <p className="text-sm text-gray-600 mt-2">
                <a href="https://www.metoffice.gov.uk/weather/warnings-and-advice" target="_blank" rel="noopener noreferrer" className="text-accent-dark hover:underline">
                  View weather warnings
                </a>
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-4 text-accent-dark">About Retford's Climate</h3>
            <p className="text-gray-700 leading-relaxed">
              Retford experiences a temperate oceanic climate typical of the East Midlands. 
              Summers are mild and winters are cool. The town benefits from being inland, 
              meaning it experiences less extreme weather compared to coastal areas.
            </p>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-4 text-accent-dark">Weather Resources</h3>
            <ul className="space-y-2 text-gray-700">
              <li>• <a href="https://www.bbc.co.uk/weather" target="_blank" rel="noopener noreferrer" className="text-accent-dark hover:underline">BBC Weather</a></li>
              <li>• <a href="https://weather.com" target="_blank" rel="noopener noreferrer" className="text-accent-dark hover:underline">Weather.com</a></li>
              <li>• <a href="https://www.metoffice.gov.uk" target="_blank" rel="noopener noreferrer" className="text-accent-dark hover:underline">Met Office</a></li>
              <li>• <a href="https://www.weatherunderground.com" target="_blank" rel="noopener noreferrer" className="text-accent-dark hover:underline">Weather Underground</a></li>
            </ul>
          </div>
        </div>

        <div className="entry-content mt-12 p-6 bg-blue-50 rounded-lg border border-accent">
          <h3 className="text-xl font-bold mb-3">Planning Your Visit?</h3>
          <p className="text-gray-700">
            Whatever the weather, Retford has plenty to offer! Check the forecast and plan 
            your visit accordingly. We have indoor attractions for rainy days and great outdoor 
            activities for sunny ones.
          </p>
        </div>
      </div>
    </>
  );
}
