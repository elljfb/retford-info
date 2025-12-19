export const metadata = {
  title: 'What\'s On - Retford, Nottinghamshire',
  description: 'Find out what\'s happening in Retford this week and beyond.',
};

export default function WhatsOn() {
  return (
    <>
      <section className="relative w-full h-80 bg-gradient-to-r from-blue-400 to-blue-300 flex items-center justify-center" style={{backgroundImage: 'url(/retford-town-hall.jpg)', backgroundSize: 'cover', backgroundPosition: 'center'}}>
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative text-center text-white z-10 px-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold">What's On</h1>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold mb-6">Events in Retford</h2>
        
        <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-lg mb-12">
          <p className="text-gray-700">
            Coming soon! Our events calendar is currently under development. 
            Check back regularly for the latest events, festivals, and activities happening in Retford.
          </p>
        </div>

        <div className="space-y-6">
          <div className="border-l-4 border-accent p-6 bg-gray-50">
            <h3 className="text-xl font-bold mb-2">Community Week</h3>
            <p className="text-gray-600 mb-2">Upcoming Event</p>
            <p className="text-gray-700">
              A week-long celebration of local community with markets, entertainment, and special events.
            </p>
          </div>

          <div className="border-l-4 border-accent p-6 bg-gray-50">
            <h3 className="text-xl font-bold mb-2">Christmas Markets</h3>
            <p className="text-gray-600 mb-2">Seasonal Event</p>
            <p className="text-gray-700">
              Browse local crafts, gifts, and festive treats at our town centre Christmas markets.
            </p>
          </div>

          <div className="border-l-4 border-accent p-6 bg-gray-50">
            <h3 className="text-xl font-bold mb-2">Farmers Market</h3>
            <p className="text-gray-600 mb-2">Monthly Event</p>
            <p className="text-gray-700">
              Fresh local produce, baked goods, and artisan products. Usually held on the third Saturday.
            </p>
          </div>
        </div>

        <div className="mt-12 p-6 bg-gray-100 rounded-lg">
          <h3 className="text-xl font-bold mb-4">Submit an Event</h3>
          <p className="text-gray-700 mb-4">
            Have an event coming up in Retford? We'd love to feature it on our What's On page!
          </p>
          <p className="text-gray-600">
            Contact us at <a href="mailto:info@retford.info" className="text-accent-dark hover:underline">info@retford.info</a> with event details.
          </p>
        </div>
      </div>
    </>
  );
}
