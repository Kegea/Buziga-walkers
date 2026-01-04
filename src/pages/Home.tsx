import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Shield, Calendar, MapPin, Camera, ArrowRight, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface Testimonial {
  id: string;
  client_name: string;
  location: string;
  dog_name: string;
  testimonial: string;
  rating: number;
}

interface ServicePackage {
  id: string;
  name: string;
  description: string;
  price: number;
  frequency: string;
  duration: string;
}

export default function Home() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [services, setServices] = useState<ServicePackage[]>([]);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    fetchTestimonials();
    fetchServices();
  }, []);

  const fetchTestimonials = async () => {
    const { data } = await supabase
      .from('testimonials')
      .select('*')
      .eq('is_featured', true)
      .eq('is_published', true)
      .limit(3);
    if (data) setTestimonials(data);
  };

  const fetchServices = async () => {
    const { data } = await supabase
      .from('service_packages')
      .select('*')
      .eq('is_active', true)
      .order('display_order');
    if (data) setServices(data);
  };

  const nextTestimonial = () => setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  const prevTestimonial = () => setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <div className="bg-white">
      {/* 1. HERO SECTION */}
      <section 
        className="relative py-20 px-4 overflow-hidden min-h-[600px] flex items-center"
        style={{
          backgroundImage: 'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url("https://images.unsplash.com/photo-1548199973-03cce0bbc87b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="relative max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-white">
            <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">Reliable Dog Walking in Buziga, Kampala</h1>
            <p className="text-xl mb-8 opacity-90">Giving your furry friend the exercise and care they deserve, while you're busy.</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/contact" className="bg-amber-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-amber-700 transition-all flex items-center justify-center">
                Book a Walk <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. TRUST FEATURES */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { icon: Shield, title: "Fully Vetted", desc: "Reliable walkers who love animals" },
            { icon: Calendar, title: "Flexible", desc: "Rain or shine, we show up" },
            { icon: MapPin, title: "Local", desc: "Serving Buziga & neighborhoods" },
            { icon: Camera, title: "Updates", desc: "GPS & Photo updates every walk" }
          ].map((item, i) => (
            <div key={i} className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-100 rounded-full mb-4">
                <item.icon className="w-8 h-8 text-amber-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. TESTIMONIALS */}
      {testimonials.length > 0 && (
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">What Our Clients Say</h2>
            <div className="relative bg-white rounded-2xl shadow-xl p-8 md:p-12 text-center">
              <div className="flex justify-center mb-4">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-6 h-6 text-amber-500 fill-amber-500" />)}
              </div>
              <p className="text-lg text-gray-700 italic mb-6">"{testimonials[currentTestimonial]?.testimonial}"</p>
              <p className="font-bold">{testimonials[currentTestimonial]?.client_name}</p>
              <div className="flex justify-center space-x-4 mt-8">
                <button onClick={prevTestimonial} className="p-2"><ChevronLeft /></button>
                <button onClick={nextTestimonial} className="p-2"><ChevronRight /></button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 4. PREMIUM PRICING SECTION */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Pricing & Packages</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Choose the perfect package. All include GPS tracking and photos.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={service.id} className={`relative bg-white rounded-3xl shadow-xl overflow-hidden border transition-all hover:-translate-y-2 ${index === 1 ? 'border-amber-500 ring-2 ring-amber-500/10 lg:scale-105' : 'border-gray-100'}`}>
                {index === 1 && <div className="bg-amber-500 text-white text-center py-2 font-bold text-sm uppercase">Best Value</div>}
                <div className="p-8 text-center">
                  <h3 className="text-2xl font-bold mb-2">{service.name}</h3>
                  <p className="text-gray-500 text-sm mb-6 h-10">{service.description}</p>
                  <div className="bg-gray-50 py-6 rounded-2xl mb-6">
                    <div className="text-3xl font-black text-amber-600">{service.price.toLocaleString()} UGX</div>
                    <div className="text-xs font-semibold text-gray-400 uppercase">{service.frequency}</div>
                  </div>
                  <Link to="/services" className={`block w-full py-4 rounded-xl font-bold ${index === 1 ? 'bg-amber-600 text-white' : 'bg-amber-50 text-amber-700'}`}>
                    See Full Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12 p-6 bg-emerald-50 rounded-2xl border border-emerald-100 max-w-2xl mx-auto text-emerald-800 font-bold">
            🐾 Multi-Dog Discounts: 10% OFF for 2 dogs | 15% OFF for 3+ dogs
          </div>
        </div>
      </section>

      {/* 5. FINAL CTA */}
      <section className="py-20 px-4 bg-gradient-to-br from-amber-600 to-orange-600 text-white text-center">
        <h2 className="text-4xl font-bold mb-6">Start with a FREE Introductory Walk!</h2>
        <Link to="/contact" className="inline-flex items-center bg-white text-amber-600 px-8 py-4 rounded-lg font-bold text-lg shadow-lg">
          Book Your Free Walk <ArrowRight className="ml-2 w-5 h-5" />
        </Link>
      </section>
    </div>
  );
}
