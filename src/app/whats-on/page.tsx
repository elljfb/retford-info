import { getUpcomingEvents, formatEventDate } from '@/lib/events';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://retford.info';

export const metadata = {
  title: 'What\'s On - Retford, Nottinghamshire',
  description: 'Find out what\'s happening in Retford this week and beyond.',
  openGraph: {
    title: 'What\'s On - Retford, Nottinghamshire',
    description: 'Find out what\'s happening in Retford this week and beyond.',
    images: [`${siteUrl}/api/og?title=What%27s%20On&subtitle=Retford.info`],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'What\'s On - Retford, Nottinghamshire',
    description: 'Find out what\'s happening in Retford this week and beyond.',
    images: [`${siteUrl}/api/og?title=What%27s%20On&subtitle=Retford.info`],
  },
};

export default function WhatsOn() {
  const upcomingEvents = getUpcomingEvents();

  return (
    <>
      <section className="relative w-full h-80 bg-gradient-to-r from-blue-400 to-blue-300 flex items-center justify-center" style={{backgroundImage: 'url(/retford-town-hall.jpg)', backgroundSize: 'cover', backgroundPosition: 'center'}}>
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative text-center text-white z-10 px-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold">What's On</h1>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold mb-6">What's on in Retford</h2>
        
        <p className="text-gray-700 mb-8 leading-relaxed">
          This page lists Retford's upcoming events for the benefit of people living in, and visiting, the historic market town. From traditional farmers markets and seasonal celebrations to community festivals and special occasions, discover what's happening in Retford and the surrounding area. Whether you're a long-time resident or planning a visit, check back regularly to stay up to date with all the latest events and activities taking place in our vibrant town centre and beyond.
        </p>

        <h3 className="text-3xl font-bold mb-6">Upcoming Events in Retford</h3>
      
        {upcomingEvents.length === 0 ? (
          <p className="text-gray-600 mb-8">No upcoming events at the moment. Check back soon!</p>
        ) : (
          <div className="space-y-6">
            {upcomingEvents.map((event, index) => (
              <div key={index} className="border-l-4 border-accent p-6 bg-gray-50">
                <h3 className="text-xl font-bold mb-2">{event.name}</h3>
                <p className="text-gray-600 mb-1">📅 {formatEventDate(event.date)}</p>
                <p className="text-gray-600 mb-2">📍 {event.location}</p>
                <p className="text-gray-700">{event.description}</p>
              </div>
            ))}
          </div>
        )}

        <div className="mt-12 p-6 bg-gray-100 rounded-lg">
          <h3 className="text-xl font-bold mb-4">Submit an Event</h3>
          <p className="text-gray-700 mb-4">
            Have an event coming up in Retford? We'd love to feature it on our What's On page!
          </p>
          <p className="text-gray-600">
            Contact us at <a href="/contact" className="text-accent-dark hover:underline">contact</a> with event details.
          </p>
        </div>
      </div>
    </>
  );
}
