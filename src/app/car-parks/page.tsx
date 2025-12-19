export const metadata = {
  title: 'Car Parks | Retford.info',
  description: 'Find parking information in Retford town centre.',
};

export default function CarParks() {
  const carParks = [
    {
      name: 'Market Square Car Park',
      spaces: 150,
      location: 'Town centre (Market Square)',
      cost: '£1.20 per hour',
      details: 'Free after 6pm'
    },
    {
      name: 'Cannon Square Car Park',
      spaces: 200,
      location: 'Near leisure centre',
      cost: '£1.00 per hour',
      details: 'Free parking after 3pm'
    },
    {
      name: 'The Arcade Car Park',
      spaces: 120,
      location: 'High Street',
      cost: '£1.20 per hour',
      details: 'Disabled spaces available'
    },
    {
      name: 'Retford Library Car Park',
      spaces: 80,
      location: 'Clermont Street',
      cost: 'Free',
      details: 'Limited spaces'
    }
  ];

  return (
    <>
      <section className="relative w-full h-80 bg-gradient-to-r from-blue-400 to-blue-300 flex items-center justify-center" style={{backgroundImage: 'url(/retford-town-hall.jpg)', backgroundSize: 'cover', backgroundPosition: 'center'}}>
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative text-center text-white z-10">
          <h1 className="text-6xl font-bold">Car Parks</h1>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold mb-6">Parking in Retford</h2>
        <p className="text-lg text-gray-700 mb-12">
          Retford town centre has several convenient car parks with reasonable rates. 
          Most parking is free or low-cost, making it easy to visit our local shops and attractions.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {carParks.map((park, index) => (
            <div key={index} className="border border-gray-300 rounded-lg p-6 hover:shadow-md transition-shadow">
              <h3 className="text-xl font-bold mb-3 text-accent-dark">{park.name}</h3>
              <div className="space-y-2 text-gray-700">
                <p><span className="font-semibold">Location:</span> {park.location}</p>
                <p><span className="font-semibold">Spaces:</span> {park.spaces}</p>
                <p><span className="font-semibold">Cost:</span> {park.cost}</p>
                <p><span className="font-semibold">Details:</span> {park.details}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-blue-50 p-6 rounded-lg border border-accent">
          <h3 className="text-xl font-bold mb-3">Parking Tips</h3>
          <ul className="space-y-2 text-gray-700">
            <li>✓ Most town centre car parks offer free parking after 6pm on weekdays</li>
            <li>✓ Disabled parking is available in several car parks</li>
            <li>✓ The Market Square is central with good access to shops and restaurants</li>
            <li>✓ Consider visiting during off-peak times for easier parking</li>
            <li>✓ Pay and display machines accept cash and card payments</li>
          </ul>
        </div>

        <div className="mt-12 p-6 bg-gray-50 rounded-lg">
          <h3 className="text-xl font-bold mb-3">Plan Your Visit</h3>
          <p className="text-gray-700">
            With convenient parking and plenty to see and do, Retford is the perfect destination 
            for a shopping trip or day out with the family.
          </p>
        </div>
      </div>
    </>
  );
}
