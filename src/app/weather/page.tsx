export const metadata = {
  title: 'Weather | Retford.info',
  description: 'Weather information for Retford, Nottinghamshire.',
};

export default function Weather() {
  return (
    <>
      <section className="relative w-full h-80 bg-gradient-to-r from-blue-400 to-blue-300 flex items-center justify-center" style={{backgroundImage: 'url(/retford-town-hall.jpg)', backgroundSize: 'cover', backgroundPosition: 'center'}}>
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative text-center text-white z-10 px-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold">Weather</h1>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold mb-6">Retford Weather</h2>
        
        <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-lg mb-12">
          <p className="text-gray-700 mb-4">
            Weather widget coming soon! Get real-time weather information for Retford.
          </p>
          <p className="text-gray-600">
            In the meantime, check out your favourite weather service for accurate forecasts.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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

        <div className="mt-12 p-6 bg-blue-50 rounded-lg border border-accent">
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
