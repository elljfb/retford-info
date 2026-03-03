import Link from 'next/link';

export const metadata = {
  title: "Local Resources & Services in Retford | Community Guide",
  description: "Essential local resources, services, emergency contacts, and community information for residents and visitors to Retford, Nottinghamshire.",
};

export default function Resources() {
  return (
    <div className="bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
          Local Resources & Services
        </h1>

        <p className="text-xl text-gray-600 mb-12">
          Essential information, services, and contacts for residents and visitors in Retford and the surrounding area.
        </p>

        {/* Emergency Services */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-red-600">
            Emergency Services
          </h2>
          <div className="bg-red-50 border-2 border-red-600 rounded-lg p-6 mb-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Emergency Numbers</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <span className="text-gray-700 font-medium mr-4">Emergency (Police, Fire, Ambulance):</span>
                <span className="text-3xl font-bold text-red-600">999</span>
              </div>
              <div className="flex items-center">
                <span className="text-gray-700 font-medium mr-4">NHS Non-Emergency:</span>
                <span className="text-2xl font-bold text-red-600">111</span>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Nottinghamshire Police</h3>
              <p className="text-gray-700 mb-2">
                <strong>Non-Emergency:</strong> 101
              </p>
              <p className="text-gray-700 mb-2">
                Retford Police Station is located in the town centre. For non-urgent matters, you can also report issues online via the Nottinghamshire Police website.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Bassetlaw Hospital</h3>
              <p className="text-gray-700 mb-2">
                <strong>Location:</strong> Kilton, Retford S81 0BD
              </p>
              <p className="text-gray-700 mb-2">
                <strong>Tel:</strong> 01909 500990
              </p>
              <p className="text-gray-700">
                Provides urgent treatment centre, outpatient services, and some inpatient facilities. For life-threatening emergencies, call 999.
              </p>
            </div>
          </div>
        </section>

        {/* Healthcare Services */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-blue-600">
            Healthcare Services
          </h2>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">GP Surgeries</h3>
              <p className="text-gray-700 mb-3">
                Retford has several GP practices providing primary care services. To register with a GP, contact the surgery directly with your details and NHS number.
              </p>
              <p className="text-gray-700">
                Find local GP surgeries through the NHS website or by searching for "GP surgeries Retford" online.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Pharmacies</h3>
              <p className="text-gray-700 mb-3">
                Multiple pharmacies operate in Retford town centre and surrounding areas, including branches on key high streets and local neighbourhood routes.
              </p>
              <p className="text-gray-700">
                Some pharmacies offer extended hours and Sunday opening. Check locally for current opening times.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Dental Services</h3>
              <p className="text-gray-700">
                Several dental practices in Retford offer NHS and private treatment. To find an NHS dentist accepting new patients, visit the NHS website or call NHS 111.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Mental Health Support</h3>
              <p className="text-gray-700 mb-2">
                <strong>NHS Mental Health Services:</strong> Access through your GP or call NHS 111
              </p>
              <p className="text-gray-700 mb-2">
                <strong>Samaritans:</strong> 116 123 (free 24/7 helpline)
              </p>
              <p className="text-gray-700">
                <strong>MIND:</strong> Mental health charity with local services
              </p>
            </div>
          </div>
        </section>

        {/* Local Government & Council Services */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-blue-600">
            Council & Government Services
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Bassetlaw District Council</h3>
              <p className="text-gray-700 mb-2">
                <strong>Phone:</strong> 01909 533533
              </p>
              <p className="text-gray-700 mb-2">
                <strong>Address:</strong> Queen's Buildings, Potter Street, Retford S80 2AH
              </p>
              <p className="text-gray-700">
                Responsible for: waste collection, council tax, housing, planning applications, environmental health, licensing, and local services.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Nottinghamshire County Council</h3>
              <p className="text-gray-700 mb-2">
                <strong>Phone:</strong> 0300 500 80 80
              </p>
              <p className="text-gray-700">
                Responsible for: education, highways, social services, libraries, trading standards, and other county-wide services.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Retford Library</h3>
              <p className="text-gray-700 mb-2">
                <strong>Location:</strong> Memorial Avenue, Retford S80 2BP
              </p>
              <p className="text-gray-700">
                Offers book lending, computer access, printing services, community events, and information resources. Free library membership available to residents.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Citizen's Advice Bassetlaw</h3>
              <p className="text-gray-700 mb-2">
                Free, confidential advice on benefits, debt, housing, employment, and other issues.
              </p>
              <p className="text-gray-700">
                Contact through their website or national helpline for appointment information.
              </p>
            </div>
          </div>
        </section>

        {/* Education */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-blue-600">
            Education
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Primary Schools</h3>
              <p className="text-gray-700">
                Retford has numerous primary schools serving different areas of the town. School admissions are managed by Nottinghamshire County Council. For detailed information, see our <Link href="/articles/retford-schools-guide" className="text-blue-600 hover:text-blue-700 font-medium">schools guide</Link>.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Secondary Schools</h3>
              <p className="text-gray-700">
                Several secondary schools and academies serve Retford, offering education for ages 11-16/18. Most schools have sixth forms or students can attend Retford College or other sixth form colleges.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Further Education</h3>
              <p className="text-gray-700">
                Retford College provides independent education. For further education and vocational courses, students can access facilities in nearby towns including Sheffield and Chesterfield.
              </p>
            </div>
          </div>
        </section>

        {/* Transport */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-blue-600">
            Transport & Travel
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Retford Railway Station</h3>
              <p className="text-gray-700 mb-2">
                <strong>Services:</strong> Northern, East Midlands Railway
              </p>
              <p className="text-gray-700 mb-2">
                <strong>Connections:</strong> Sheffield, Nottingham, Lincoln, and other regional destinations
              </p>
              <p className="text-gray-700">
                The station has ticket office, waiting facilities, and car parking. For timetables and tickets, visit National Rail or operator websites.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Bus Services</h3>
              <p className="text-gray-700 mb-2">
                <strong>Main Operator:</strong> Stagecoach
              </p>
              <p className="text-gray-700">
                Regular services connect Retford with local villages and nearby towns including Retford, Doncaster, and Mansfield. Bus stops are located throughout the town centre. Timetables available online and at stops.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Taxis</h3>
              <p className="text-gray-700">
                Several taxi companies operate in Retford, offering local and long-distance services. Taxis can be booked by phone or through apps. Taxi ranks are located at the railway station and in the town centre.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Car Parking</h3>
              <p className="text-gray-700">
                Multiple car parks serve the town centre, including short-stay and longer-stay options. Both pay-and-display and some free parking options are available. Details on charges and locations are available from Bassetlaw Council.
              </p>
            </div>
          </div>
        </section>

        {/* Utilities & Services */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-blue-600">
            Utilities & Essential Services
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Waste & Recycling</h3>
              <p className="text-gray-700 mb-2">
                <strong>Provider:</strong> Bassetlaw District Council
              </p>
              <p className="text-gray-700">
                Regular kerbside collection of household waste and recycling. Check your collection day and what can be recycled on the council website. Garden waste collection available by subscription. Household waste recycling centre located nearby.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Water Supply</h3>
              <p className="text-gray-700 mb-2">
                <strong>Provider:</strong> Severn Trent Water
              </p>
              <p className="text-gray-700 mb-2">
                <strong>Customer Service:</strong> 0800 783 4444
              </p>
              <p className="text-gray-700">
                For water supply issues, leaks, or billing enquiries.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Electricity</h3>
              <p className="text-gray-700 mb-2">
                <strong>Network:</strong> Northern Powergrid
              </p>
              <p className="text-gray-700 mb-2">
                <strong>Power Cuts:</strong> 105 (free from mobile or landline)
              </p>
              <p className="text-gray-700">
                Choose your own electricity supplier. Network operator handles infrastructure and power cuts.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Gas</h3>
              <p className="text-gray-700 mb-2">
                <strong>Network:</strong> Cadent Gas
              </p>
              <p className="text-gray-700 mb-2">
                <strong>Gas Emergency:</strong> 0800 111 999
              </p>
              <p className="text-gray-700">
                Choose your own gas supplier. Network operator handles infrastructure and emergencies.
              </p>
            </div>
          </div>
        </section>

        {/* Community & Support */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-blue-600">
            Community Support & Organizations
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Bassetlaw Foodbank</h3>
              <p className="text-gray-700">
                Provides emergency food parcels to people in crisis. Referrals through agencies including GPs, schools, Citizens Advice, and others. Contact through their website or the Trussell Trust network.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Age UK Nottinghamshire</h3>
              <p className="text-gray-700">
                Provides support, information, and services for older people including advice, social activities, and practical help. Local services and activities available in Retford area.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Retford Community Groups</h3>
              <p className="text-gray-700">
                Numerous community groups, societies, and volunteer organizations operate in Retford covering interests from history and conservation to sports and hobbies. Information available through the library and local notice boards.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Places of Worship</h3>
              <p className="text-gray-700">
                Retford has churches of various Christian denominations, including St Swithun's Church, along with other faith communities. All welcome visitors and new members.
              </p>
            </div>
          </div>
        </section>

        {/* Sport & Recreation */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-blue-600">
            Sport & Recreation Facilities
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Retford Leisure Centre</h3>
              <p className="text-gray-700">
                Modern leisure facility with swimming pool, fitness gym, sports halls, and classes. Membership and pay-as-you-go options available. Contact for opening times and current prices.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Sports Clubs</h3>
              <p className="text-gray-700">
                Retford has football clubs, cricket clubs, rugby, tennis, bowls, and many other sports organizations. For more information, see our <Link href="/articles/retford-sports-and-recreation" className="text-blue-600 hover:text-blue-700 font-medium">sports and recreation guide</Link>.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Parks & Open Spaces</h3>
              <p className="text-gray-700">
                Retford has several town parks, playgrounds, and open spaces. Kings' Park and other local blue areas provide space for recreation and relaxation.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Kids Zone</h3>
              <p className="text-gray-700">
                Popular indoor play centre for children offering soft play, activities, and parties. Located in Retford. See our <Link href="/articles/kids-zone-review" className="text-blue-600 hover:text-blue-700 font-medium">Kids Zone review</Link> for details.
              </p>
            </div>
          </div>
        </section>

        {/* Additional Resources */}
        <section className="bg-blue-50 border border-blue-200 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Additional Information</h2>
          <p className="text-gray-700 mb-4">
            For more detailed information about services, businesses, and facilities in Retford, please explore our <Link href="/articles" className="text-blue-600 hover:text-blue-700 font-medium">articles section</Link> or <Link href="/contact" className="text-blue-600 hover:text-blue-700 font-medium">contact us</Link> with specific enquiries.
          </p>
          <p className="text-gray-700 mb-0">
            <strong>Important:</strong> Contact details and service information can change. While we strive to keep this page updated, please verify critical information directly with service providers before relying on it for important decisions.
          </p>
        </section>
      </div>
    </div>
  );
}
