import { useState } from 'react';
import { X } from 'lucide-react';

interface GalleryImage {
  id: string;
  title: string;
  category: string;
  url: string;
}

const galleryImages: GalleryImage[] = [
  {
    id: '1',
    title: 'Golden Retriever Morning Walk',
    category: 'walks',
    url: 'https://images.pexels.com/photos/1458916/pexels-photo-1458916.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&dpr=2'
  },
  {
    id: '2',
    title: 'Happy Labrador on Trail',
    category: 'walks',
    url: 'https://images.pexels.com/photos/2253275/pexels-photo-2253275.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&dpr=2'
  },
  {
    id: '3',
    title: 'German Shepherd Adventure',
    category: 'walks',
    url: 'https://images.pexels.com/photos/1490908/pexels-photo-1490908.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&dpr=2'
  },
  {
    id: '4',
    title: 'Beautiful Kampala Trail',
    category: 'routes',
    url: 'https://images.pexels.com/photos/1496373/pexels-photo-1496373.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&dpr=2'
  },
  {
    id: '5',
    title: 'Buziga Neighborhood Path',
    category: 'routes',
    url: 'https://images.pexels.com/photos/1578750/pexels-photo-1578750.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&dpr=2'
  },
  {
    id: '6',
    title: 'Scenic Walking Route',
    category: 'routes',
    url: 'https://images.pexels.com/photos/814499/pexels-photo-814499.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&dpr=2'
  },
  {
    id: '7',
    title: 'Fresh Groomed Poodle',
    category: 'grooming',
    url: 'https://images.pexels.com/photos/1851164/pexels-photo-1851164.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&dpr=2'
  },
  {
    id: '8',
    title: 'Grooming Session',
    category: 'grooming',
    url: 'https://images.pexels.com/photos/6568939/pexels-photo-6568939.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&dpr=2'
  },
  {
    id: '9',
    title: 'Beagle Park Adventure',
    category: 'walks',
    url: 'https://images.pexels.com/photos/1805164/pexels-photo-1805164.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&dpr=2'
  },
  {
    id: '10',
    title: 'Husky Outdoor Fun',
    category: 'walks',
    url: 'https://images.pexels.com/photos/3671256/pexels-photo-3671256.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&dpr=2'
  },
  {
    id: '11',
    title: 'Corgi Playing Outside',
    category: 'walks',
    url: 'https://images.pexels.com/photos/1629781/pexels-photo-1629781.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&dpr=2'
  },
  {
    id: '12',
    title: 'Park Trail View',
    category: 'routes',
    url: 'https://images.pexels.com/photos/1612847/pexels-photo-1612847.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&dpr=2'
  }
];

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [filter, setFilter] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Photos' },
    { id: 'walks', label: 'Dogs on Walks' },
    { id: 'routes', label: 'Walking Routes' },
    { id: 'grooming', label: 'Grooming' },
  ];

  const filteredImages = filter === 'all'
    ? galleryImages
    : galleryImages.filter(img => img.category === filter);

  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gradient-to-br from-amber-50 to-orange-50 py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">Our Gallery</h1>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            See our happy clients enjoying their walks and the beautiful routes we explore around Kampala
          </p>
        </div>
      </section>

      <section className="py-12 px-4 bg-white border-b">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setFilter(category.id)}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  filter === category.id
                    ? 'bg-amber-600 text-white shadow-lg transform scale-105'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-md'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>

          {filteredImages.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-gray-400 text-6xl mb-4">📷</div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No images found</h3>
              <p className="text-gray-500">
                {filter === 'all'
                  ? 'Check back soon for photos from our dog walking adventures!'
                  : 'Try selecting a different category'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredImages.map((image) => (
                <div
                  key={image.id}
                  className="group cursor-pointer transform hover:scale-105 transition-all duration-300"
                  onClick={() => setSelectedImage(image)}
                >
                  <div className="relative overflow-hidden rounded-2xl shadow-lg bg-gray-200">
                    <img
                      src={image.url}
                      alt={image.title}
                      className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                    />

                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-end">
                      <div className="p-6 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        <h3 className="font-bold text-lg mb-2">{image.title}</h3>
                        <span className="inline-block bg-amber-600 text-white px-3 py-1 rounded-full text-sm font-medium capitalize">
                          {image.category}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="py-16 px-4 bg-gradient-to-br from-amber-500 to-orange-500 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Want to See Your Dog Here?</h2>
          <p className="text-xl mb-8 opacity-90">
            Every walk includes photo updates so you can see your furry friend enjoying their adventure
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="inline-block bg-white text-amber-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl"
            >
              Book a Walk
            </a>
            <a
              href="https://instagram.com/bzugawalkers"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-amber-600 transition-all"
            >
              Follow on Instagram
            </a>
          </div>
        </div>
      </section>

      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <img
                src={selectedImage.url}
                alt={selectedImage.title}
                className="w-full h-auto max-h-[60vh] object-contain"
              />
              <button
                className="absolute top-4 right-4 bg-black bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-70 transition-all"
                onClick={() => setSelectedImage(null)}
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{selectedImage.title}</h3>
              <p className="text-amber-600 font-semibold capitalize">{selectedImage.category}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
