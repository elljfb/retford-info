import Link from "next/link";
import ShareButtons from "@/components/ShareButtons";
import MultiMapClient from "@/components/MultiMapClient";

export default function Home() {
  const categories = [
    { name: "Shops and Businesses", slug: "shops-and-businesses", image: "/businesses/shops-and-businesses/businesses.jpg", path: "/categories/shops-and-businesses" },
    { name: "Eat and Drink", slug: "eat-and-drink", image: "/businesses/eat-and-drink/eat-drink.jpg", path: "/categories/eat-and-drink" },
    { name: "Accommodation", slug: "accommodation", image: "/businesses/accommodation/accommodation.jpg", path: "/categories/accommodation" },
    { name: "Things to Do", slug: "things-to-do", image: "/businesses/things-to-do/things-to-do.jpg", path: "/categories/things-to-do" },
    { name: "Latest News", slug: "news", image: "/news/news-cover.jpg", path: "/news" },
    { name: "Latest Articles", slug: "articles", image: "/articles/articles-cover.jpg", path: "/articles" },
  ];

  return (
    <>
      {/* Cover Section */}
      <section className="relative w-full h-96 bg-gradient-to-r from-blue-400 to-blue-300 flex items-center justify-center" style={{backgroundImage: 'url(/retford-town-hall.jpg)', backgroundSize: 'cover', backgroundPosition: 'center'}}>
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative text-center text-white z-10 px-4">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">Retford in Nottinghamshire</h1>
          <div className="flex justify-center">
            <ShareButtons title="Welcome to Retford | Retford.info" />
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-4xl font-bold mb-6">Retford in Nottinghamshire</h2>
        <div className="flex gap-8 items-center">
          <div>
            <p className="text-lg leading-relaxed text-gray-700 mb-4">
              Welcome to Retford, a historic and charming market town nestled in the heart of Nottinghamshire. Boasting a rich heritage and a warm, community spirit, Retford offers a peaceful escape with its beautifully maintained parks and award-winning floral displays in Kings Park.
            </p>
            <p className="text-lg leading-relaxed text-gray-700">
              Whether you're a local resident or visiting our town, we've got all the information you need.
            </p>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={category.path}
              className="group"
            >
              <div 
                className="bg-gray-100 h-48 rounded-lg flex items-center justify-center text-6xl hover:shadow-lg transition-all relative overflow-hidden"
                style={
                  category.image.startsWith('/') 
                    ? { backgroundImage: `url(${category.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }
                    : {}
                }
              >
                {!category.image.startsWith('/') && (
                  <span className="relative z-10">{category.image}</span>
                )}
                {category.image.startsWith('/') && (
                  <div className="absolute inset-0 bg-black opacity-20 group-hover:opacity-30 transition-opacity"></div>
                )}
              </div>
              <h3 className="text-xl font-semibold mt-4 text-center group-hover:text-accent-dark">
                {category.name}
              </h3>
            </Link>
          ))}
        </div>
      </section>

      {/* Where is Retford Section */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-4xl font-bold mb-6">Where is Retford?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <p className="text-lg leading-relaxed text-gray-700 mb-4">
              Retford is a market town in Nottinghamshire, located in the East Midlands of England.
              Situated on the River Idle, it's approximately 30 miles north of Nottingham and has
              excellent connections to major cities including Sheffield and Lincoln.
            </p>
            <p className="text-lg leading-relaxed text-gray-700">
              Known for its historic charm, vibrant community, and excellent local amenities, Retford
              is the perfect place to visit or call home.
            </p>
          </div>
          <div className="h-64 rounded-lg overflow-hidden">
            <MultiMapClient
              locations={[{ name: 'Retford Town Centre', address: 'Market Square, Retford' }]} 
              center={[53.3225, -0.9417]}
              zoom={9}
            />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="bg-gray-50 py-12">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold mb-6">About Retford.info</h2>
          <p className="text-lg leading-relaxed text-gray-700 max-w-3xl">
            Retford.info is a community-driven website dedicated to promoting local businesses and
            keeping residents and visitors informed about what's happening in our town. We're committed
            to supporting the local economy and fostering a sense of community pride.
          </p>
        </div>
      </section>
    </>
  );
}
