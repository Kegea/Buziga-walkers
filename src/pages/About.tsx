import { Heart, Award, Clock, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function About() {

  return (
    <div>
      <section className="bg-gradient-to-br from-amber-50 to-orange-50 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">About Buziga Dog Walkers</h1>
          <p className="text-xl text-gray-700">
            Professional dog walking and pet care services built on trust, reliability, and genuine love for animals
          </p>
        </div>
      </section>

      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              {/* Our Story Image */}
              <div className="relative aspect-square rounded-2xl shadow-xl overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1587300003388-59208cc962cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600&q=80"
                  alt="Happy dog enjoying a walk in Kampala"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-6 text-gray-900">Our Story</h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                Even the sweetest dogs can get restless if they don't get enough walks or playtime. I've seen it so many times - barking at night, digging up the garden, or just pacing around the compound. It's not because they're bad, they're simply bored.
              </p>
              <p className="text-gray-700 mb-4 leading-relaxed">
                A good walk and a little adventure outside can make such a big difference for them, and for your peace of mind too. That's where I come in.
              </p>
              <p className="text-gray-700 mb-6 leading-relaxed">
                I'm Emmanuel Kiganda, and I help busy dog owners in Kampala give their dogs the consistent exercise and care they need to be happy, healthy, and calm. I offer simple, affordable packages designed to fit your life and your dog's energy levels.
              </p>
              <Link
                to="/contact"
                className="inline-block bg-amber-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-amber-700 transition-colors"
              >
                Get Started Today
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">Our Mission</h2>
          <p className="text-xl text-gray-700 leading-relaxed">
            To enhance the lives of dogs and their owners in the Kampala community by providing reliable, professional, and compassionate pet care services. We believe every dog deserves daily exercise, mental stimulation, and the joy of outdoor exploration.
          </p>
        </div>
      </section>

      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">Meet Your Walker</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Experienced, trusted, and passionate about giving your dog the best care
            </p>
          </div>

          <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-8 lg:p-12">
            <div className="grid lg:grid-cols-3 gap-8 items-center">
              <div className="lg:col-span-1">
                <div className="relative aspect-square rounded-2xl shadow-xl overflow-hidden">
                  <img
                    src="/emmanuel-kiganda.jpeg"
                    alt="Emmanuel S. Kiganda - Founder & Lead Dog Walker"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
                </div>
              </div>
              <div className="lg:col-span-2">
                <h3 className="text-2xl font-bold mb-2 text-gray-900">Emmanuel S. Kiganda</h3>
                <p className="text-amber-600 font-semibold mb-4">Founder & Lead Dog Walker</p>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  With years of experience working with dogs of all breeds, sizes, and temperaments, Emmanuel has built a reputation for reliability and genuine care. He understands that every dog has unique needs and personality traits, and takes the time to build trust with each furry client.
                </p>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  Emmanuel's deep knowledge of the Buziga area and surrounding neighborhoods ensures safe, enjoyable walks on routes that are both secure and stimulating for your dog. He's committed to showing up consistently, rain or shine, because he knows your dog counts on that routine.
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="flex items-start space-x-3">
                    <Heart className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Passionate About Dogs</h4>
                      <p className="text-sm text-gray-600">Genuine love for all breeds and temperaments</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Award className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Experienced Handler</h4>
                      <p className="text-sm text-gray-600">Years of working with diverse dog breeds</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Clock className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Always Reliable</h4>
                      <p className="text-sm text-gray-600">Consistent service you can count on</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Shield className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Trusted Professional</h4>
                      <p className="text-sm text-gray-600">Safety and security conscious</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Why Choose Us?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-amber-600" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Local Knowledge</h3>
              <p className="text-gray-600 leading-relaxed">
                Deep understanding of safe walking routes in Buziga, Munyonyo, Kansanga, and surrounding areas. We know the neighborhoods, security considerations, and best spots for your dog to explore.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-lg">
              <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mb-4">
                <Clock className="w-6 h-6 text-amber-600" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Consistent Commitment</h3>
              <p className="text-gray-600 leading-relaxed">
                We show up when we say we will, every single time. Your dog can count on their daily routine, and you can count on us to be there, rain or shine.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-lg">
              <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mb-4">
                <Heart className="w-6 h-6 text-amber-600" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Clear Communication</h3>
              <p className="text-gray-600 leading-relaxed">
                You'll always know how your dog is doing. We provide GPS tracking, photo updates after each walk, and we're always available to discuss your dog's progress and any concerns.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-gradient-to-br from-amber-600 to-orange-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Give Your Dog the Best Care?</h2>
          <p className="text-xl mb-8 opacity-90">
            Start with a free introductory walk and see the difference professional care can make
          </p>
          <Link
            to="/contact"
            className="inline-block bg-white text-amber-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all shadow-lg"
          >
            Book Your Free Meet & Greet
          </Link>
        </div>
      </section>
    </div>
  );
}