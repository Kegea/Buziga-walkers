import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, MapPin, Dog, Sparkles, Clock, ShieldCheck } from 'lucide-react';
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

// Backup data so the site never looks "broken" if Supabase is disconnected
const FALLBACK_SERVICES: ServicePackage[] = [
  {
    id: '1',
    name: 'The Black Panther',
    description: 'Perfect for busy owners who want regular exercise for their pets.',
    price: 110000,
    frequency: '3 walks per week',
    duration: '45 mins',
    features: ['GPS Tracked Walks', 'Fresh Water Top-up', 'Paws Cleaned', 'Daily Photo Updates'],
    is_per_walk: false
  },
  {
    id: '2',
    name: 'The Dog Storm',
    description: 'Our most popular package for high-energy dogs.',
    price: 133000,
    frequency: '5 walks per week',
    duration: '60 mins',
    features: ['High-Energy Exercise', 'Socialization Play', 'Complimentary Grooming (Soon)', 'Priority Scheduling'],
    is_per_walk: false
  },
  {
    id: '3',
    name: 'The Silverback',
    description: 'On-demand walking for your flexible schedule.',
    price: 15000,
    frequency: 'Single Walk',
    duration: '60 mins',
    features: ['No Commitment', 'Weekend Availability', 'Detailed Visit Report', 'One-on-One Attention'],
    is_per_walk: true
  }
];

export default function Services() {
  const [services, setServices] = useState<ServicePackage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const { data, error } = await supabase
        .from('service_packages')
        .select('*')
        .eq('is_active', true)
        .order('display_order');

      if (error) throw error;

      if (data && data.length > 0) {
        setServices(data);
      } else {
        setServices(FALLBACK_SERVICES);
      }
    } catch (error) {
      console.error('Error fetching services, using fallback:', error);
      setServices(FALLBACK_SERVICES);
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
    const priceStr = service.price.toLocaleString();
    if (service.name === 'The Silverback' || service.is_per_walk) {
      return `${priceStr} UGX / walk`;
    }
    return `${priceStr} UGX / month`;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 font-medium">Loading Kampala's Best Pet Services...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1554456854-55a089fd4cb2?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80")' }}>
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        </div>

        <div className="relative max-w-4xl mx-auto text-center text-white">
          <h1 className="text-5xl lg:text-7xl font-extrabold mb-6 tracking-tight drop-shadow-2xl">
            Services & Pricing
          </h1>
          <p className="text-xl lg:text-2xl font-light mb-8 max-w-2xl mx-auto leading-relaxed drop-shadow-md">
            Premium care for your furry family members in the heart of Kampala.
          </p>
        </div>
      </section>

      {/* Main Services Grid */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8 mb-20">
            {services.map((service, index) => (
              <div
                key={service.id}
                className={`relative bg-white rounded-3xl shadow-xl overflow-hidden border transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 ${
                  index === 1 ? 'border-amber-500 ring-2 ring-amber-500/20 lg:scale-105 z-10' : 'border-gray-100'
                }`}
              >
                {index === 1 && (
                  <div className="bg-amber-500 text-white text-center py-2 font-bold text-sm uppercase tracking-widest">
                    Best Value
                  </div>
                )}
                <div className="p-10">
                  <div className="flex items-center justify-center w-20 h-20 bg-amber-50 rounded-2xl mb-6 mx-auto">
                    {index === 1 ? <Sparkles className="w-10 h-10 text-amber-600" /> : <Dog className="w-10 h-10 text-amber-600" />}
                  </div>
                  <h3 className="text-2xl font-bold text-center mb-3 text-gray-900">{service.name}</h3>
                  <p className="text-center text-gray-500 mb-8 min-h-[48px]">{service.description}</p>

                  <div className="text-center mb-8 bg-gray-50 py-6 rounded-2xl">
                    <div className="text-3xl font-black text-amber-600 mb-1">
                      {getPriceDisplay(service)}
                    </div>
                    <div className="text-sm font-semibold text-gray-400 uppercase tracking-tighter">
                      {service.frequency} • {service.duration}
                    </div>
                  </div>

                  <ul className="space-y-4 mb-10">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start space-x-3">
                        <Check className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                        <span className="text-gray-600 text-sm font-medium">
                          {feature}
                          {feature.toLowerCase().includes('groom') && (
                            <span className="text-amber-600 font-bold ml-1 text-[10px] uppercase">Coming Soon</span>
                          )}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    to="/contact"
                    className={`block w-full text-center py-4 rounded-xl font-bold transition-all ${
                      index === 1
                        ? 'bg-amber-600 text-white hover:bg-amber-700 shadow-lg shadow-amber-200'
                        : 'bg-amber-50 text-amber-700 hover:bg-amber-100'
                    }`}
                  >
                    Select Plan
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Multi-Dog Discount */}
          <div className="bg-emerald-900 rounded-[3rem] p-10 lg:p-16 text-white mb-20 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10">
               <Dog size={200} />
            </div>
            <div className="relative z-10 text-center max-w-3xl mx-auto">
              <h2 className="text-4xl font-bold mb-4">Multiple Dogs? Save Big.</h2>
              <p className="text-emerald-100 text-lg mb-12">We believe every dog deserves a stroll. Save up to 15% when you book for the whole pack.</p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                  <div className="text-4xl font-black text-amber-400 mb-2">10% OFF</div>
                  <div className="text-xl font-bold">2 Dogs</div>
                  <p className="text-emerald-100 text-sm mt-2 font-light">Applied automatically to monthly packages.</p>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                  <div className="text-4xl font-black text-amber-400 mb-2">15% OFF</div>
                  <div className="text-xl font-bold">3+ Dogs</div>
                  <p className="text-emerald-100 text-sm mt-2 font-light">The best rate for larger families in Kampala.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Pet Sitting Section */}
          <div className="grid lg:grid-cols-2 gap-12 mb-20 items-center">
            <div className="rounded-3xl overflow-hidden shadow-2xl h-[400px]">
              <img 
                src="https://images.unsplash.com/photo-1541599540903-216a46ca1df0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                alt="Pet Sitting" 
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h2 className="text-4xl font-bold mb-6 text-gray-900">Professional Pet Sitting</h2>
              <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                Traveling or have a long day at the office? Our <strong>Kampala pet sitting</strong> team provides reliable, loving care in the comfort of your home.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-center space-x-3">
                  <Clock className="text-amber-600 w-6 h-6" />
                  <span className="text-gray-700 font-medium">Overnight Stays & Day Visits</span>
                </div>
                <div className="flex items-center space-x-3">
                  <ShieldCheck className="text-amber-600 w-6 h-6" />
                  <span className="text-gray-700 font-medium">Safe, Vetted, & Trusted Sitters</span>
                </div>
              </div>
              <Link to="/contact" className="inline-block bg-gray-900 text-white px-10 py-4 rounded-xl font-bold hover:bg-gray-800 transition-all">
                Book a Sitter
              </Link>
            </div>
          </div>

          {/* Service Area */}
          <div className="bg-amber-50 rounded-3xl p-10 border border-amber-100 flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-6 mb-6 md:mb-0">
              <div className="bg-white p-4 rounded-2xl shadow-sm">
                <MapPin className="w-10 h-10 text-amber-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">Our Service Areas</h3>
                <p className="text-gray-600">Buziga, Munyonyo, Bunga, Kansanga, Ggaba & More.</p>
              </div>
            </div>
            <Link to="/contact" className="text-amber-700 font-bold hover:underline flex items-center">
              Check availability in your area →
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto bg-amber-600 rounded-[3rem] p-12 text-center text-white relative overflow-hidden shadow-2xl">
          <h2 className="text-4xl font-bold mb-6">Get Your First Walk for FREE!</h2>
          <p className="text-xl mb-10 opacity-90 max-w-2xl mx-auto">
            Experience why Kampala's dog owners trust us. No commitment required for your introductory walk.
          </p>
          <Link
            to="/contact"
            className="inline-block bg-white text-amber-600 px-12 py-5 rounded-2xl font-black text-xl hover:scale-105 transition-all shadow-xl"
          >
            Claim Free Walk
          </Link>
        </div>
      </section>
    </div>
  );
}
