import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, MapPin, Dog, Sparkles } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface ServicePackage {
  id: string;
  name: string;
  description: string;
  price: number;
  frequency: string;
  duration: string;
  features: string[];
  is_per_walk?: boolean;
}

export default function Services() {
  const [services, setServices] = useState<ServicePackage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const { data } = await supabase
        .from('service_packages')
        .select('*')
        .eq('is_active', true)
        .order('display_order');

      if (data) setServices(data);
    } catch (error) {
      console.error('Error fetching services:', error);
    } finally {
      setLoading(false);
    }
  };

  const getDiscountedPrice = (price: number, dogs: number) => {
    if (dogs === 2) return price * 0.9;
    if (dogs >= 3) return price * 0.85;
    return price;
  };

  const getPriceDisplay = (service: ServicePackage) => {
    if (service.name === 'The Silverback' || service.is_per_walk) {
      return `${service.price.toLocaleString()} UGX / walk`;
    }
    return `${service.price.toLocaleString()} UGX / month`;
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading services...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Updated Hero Section with Background Image */}
      <section className="relative py-20 px-4 overflow-hidden">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1554456854-55a089fd4cb2?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80")',
            // Alternative dog walking images you can use:
            // 'url("https://images.unsplash.com/photo-1587300003388-59208cc962cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80")'
            // 'url("https://images.unsplash.com/photo-1548199973-03cce0bbc87b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2069&q=80")'
          }}
        >
          {/* Dark Overlay for better text readability */}
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
          
          {/* Optional: Gradient overlay for more visual appeal */}
          <div className="absolute inset-0 bg-gradient-to-br from-amber-900/30 to-orange-900/30"></div>
        </div>

        {/* Content */}
        <div className="relative max-w-4xl mx-auto text-center text-white">
          <h1 className="text-4xl lg:text-6xl font-bold mb-6 drop-shadow-lg">
            Services & Pricing
          </h1>
          <p className="text-xl lg:text-2xl font-light mb-8 drop-shadow-md max-w-2xl mx-auto leading-relaxed">
            Simple, affordable packages designed to fit your life and your dog's energy levels
          </p>
          
          {/* Optional: Decorative elements */}
          <div className="flex justify-center space-x-4 mb-8">
            <div className="w-3 h-3 bg-amber-400 rounded-full animate-bounce"></div>
            <div className="w-3 h-3 bg-amber-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-3 h-3 bg-amber-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
          </div>
        </div>
      </section>

      {/* Rest of your existing code remains the same */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {services.map((service, index) => (
              <div
                key={service.id}
                className={`bg-white rounded-2xl shadow-xl overflow-hidden border-2 transition-all hover:shadow-2xl hover:-translate-y-1 ${
                  index === 1 ? 'border-amber-500 lg:scale-105' : 'border-gray-200'
                }`}
              >
                {index === 1 && (
                  <div className="bg-amber-500 text-white text-center py-2 font-semibold text-sm">
                    MOST POPULAR
                  </div>
                )}
                <div className="p-8">
                  <div className="flex items-center justify-center w-16 h-16 bg-amber-100 rounded-full mb-4 mx-auto">
                    {index === 0 && <Dog className="w-8 h-8 text-amber-600" />}
                    {index === 1 && <Sparkles className="w-8 h-8 text-amber-600" />}
                    {index === 2 && <Dog className="w-8 h-8 text-amber-600" />}
                  </div>
                  <h3 className="text-2xl font-bold text-center mb-2 text-gray-900">
                    {service.name}
                  </h3>
                  <p className="text-center text-gray-600 mb-6">{service.description}</p>

                  <div className="text-center mb-6">
                    <div className="text-4xl font-bold text-amber-600 mb-2">
                      {getPriceDisplay(service)}
                    </div>
                    <div className="text-sm text-gray-600">{service.frequency}</div>
                    <div className="text-sm text-gray-600">{service.duration} per walk</div>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start space-x-2">
                        <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">
  {feature}
  {feature.toLowerCase().includes('groom') && (
    <span className="text-amber-600 font-semibold ml-1">(Coming Soon)</span>
  )}
</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    to="/contact"
                    className={`block w-full text-center py-3 rounded-lg font-semibold transition-colors ${
                      index === 1
                        ? 'bg-amber-600 text-white hover:bg-amber-700'
                        : 'bg-amber-100 text-amber-600 hover:bg-amber-200'
                    }`}
                  >
                    Get Started
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Multi-Dog Discounts Section */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 lg:p-12 mb-16">
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">Multi-Dog Discounts</h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="text-center mb-4">
                  <div className="text-5xl font-bold text-green-600 mb-2">10%</div>
                  <div className="text-xl font-semibold text-gray-900">2 Dogs</div>
                </div>
                <p className="text-center text-gray-600 mb-4">
                  Save on regular walks when you have two furry friends
                </p>
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="text-sm text-gray-600 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="flex-1">The Black Panther:</span>
                      <span className="font-semibold text-right ml-2">
                        {getDiscountedPrice(110000, 2).toLocaleString()} UGX / month
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="flex-1">The Dog Storm:</span>
                      <span className="font-semibold text-right ml-2">
                        {getDiscountedPrice(133000, 2).toLocaleString()} UGX / month
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="flex-1">The Silverback:</span>
                      <span className="font-semibold text-right ml-2">
                        {getDiscountedPrice(15000, 2).toLocaleString()} UGX / walk
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-green-500">
                <div className="text-center mb-4">
                  <div className="text-5xl font-bold text-green-600 mb-2">15%</div>
                  <div className="text-xl font-semibold text-gray-900">3+ Dogs</div>
                </div>
                <p className="text-center text-gray-600 mb-4">
                  Maximum savings for multiple dogs in your pack
                </p>
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="text-sm text-gray-600 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="flex-1">The Black Panther:</span>
                      <span className="font-semibold text-right ml-2">
                        {getDiscountedPrice(110000, 3).toLocaleString()} UGX / month
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="flex-1">The Dog Storm:</span>
                      <span className="font-semibold text-right ml-2">
                        {getDiscountedPrice(133000, 3).toLocaleString()} UGX / month
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="flex-1">The Silverback:</span>
                      <span className="font-semibold text-right ml-2">
                        {getDiscountedPrice(15000, 3).toLocaleString()} UGX / walk
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Pet Sitting Services */}
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8 lg:p-12 mb-16">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-6 text-gray-900">Pet Sitting Services</h2>
              <p className="text-center text-gray-700 mb-8 text-lg leading-relaxed">
                Need someone to care for your dog while you're away? We offer professional pet sitting services with the same reliability and care you've come to expect.
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl p-6">
                  <h3 className="font-bold text-lg mb-4 text-gray-900">What's Included</h3>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-start space-x-3">
                      <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>Daily visits or overnight stays</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>Feeding and fresh water</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>Exercise and playtime</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>Daily photo updates</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-white rounded-xl p-6">
                  <h3 className="font-bold text-lg mb-4 text-gray-900">Pricing</h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    Custom pricing based on your needs and duration. Contact us for a personalized quote.
                  </p>
                  <Link
                    to="/contact"
                    className="inline-block bg-amber-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-amber-700 transition-colors w-full text-center"
                  >
                    Get a Quote
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Service Area Section - FIXED */}
          <div className="bg-amber-50 rounded-2xl p-6 lg:p-8 border-2 border-amber-200 mb-16">
            <div className="flex flex-col lg:flex-row items-start lg:items-center lg:space-x-6 space-y-4 lg:space-y-0">
              <MapPin className="w-8 h-8 text-amber-600 flex-shrink-0 mt-1 lg:mt-0" />
              <div className="flex-1 min-w-0">
                <h2 className="text-2xl font-bold mb-3 text-gray-900">Service Area</h2>
                <p className="text-gray-700 text-lg mb-4 leading-relaxed">
                  Currently serving <strong>Buziga, Munyonyo, Bunga, Kansanga, Ggaba</strong>, and surrounding neighborhoods in Kampala.
                </p>
                <p className="text-gray-600">
                  Not sure if we serve your area?{' '}
                  <Link to="/contact" className="text-amber-600 font-semibold hover:text-amber-700 underline">
                    Contact us
                  </Link>{' '}
                  to find out!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-amber-600 to-orange-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Start with a FREE Introductory Walk!</h2>
          <p className="text-xl mb-8 opacity-90 leading-relaxed">
            No commitment required. Let us show you the quality of our service firsthand.
          </p>
          <Link
            to="/contact"
            className="inline-block bg-white text-amber-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl"
          >
            Book Your Free Walk
          </Link>
        </div>
      </section>
    </div>
  );
}