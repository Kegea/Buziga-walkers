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

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div>
      {/* Updated Hero Section with Background Image */}
      <section 
        className="relative py-20 px-4 overflow-hidden min-h-[600px] flex items-center"
        style={{
          backgroundImage: 'linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url("https://images.unsplash.com/photo-1548199973-03cce0bbc87b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Content */}
        <div className="relative max-w-7xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Reliable Dog Walking in Buziga, Kampala
              </h1>
              <p className="text-xl mb-8 opacity-90">
                Giving your furry friend the exercise and care they deserve, while you're busy.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/contact"
                  className="bg-amber-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-amber-700 transition-all shadow-lg hover:shadow-xl inline-flex items-center justify-center"
                >
                  Book a Walk <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
                <Link
                  to="/services"
                  className="bg-white text-amber-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-50 transition-all border-2 border-white hover:border-amber-600 inline-flex items-center justify-center"
                >
                  View Packages
                </Link>
              </div>
            </div>
            <div className="hidden lg:block">
              {/* Image in the right box */}
              <div className="relative aspect-square rounded-2xl shadow-2xl overflow-hidden border-2 border-white/30 backdrop-blur-sm">
                <img 
                  src="https://images.unsplash.com/photo-1554456854-55a089fd4cb2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600&q=80"
                  alt="Happy dog being walked in Kampala"
                  className="w-full h-full object-cover"
                />
                {/* Optional overlay for better text contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Rest of your existing code remains the same */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-100 rounded-full mb-4">
                <Shield className="w-8 h-8 text-amber-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Fully Vetted & Trusted</h3>
              <p className="text-gray-600">Experienced and reliable dog walkers who genuinely love animals</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-100 rounded-full mb-4">
                <Calendar className="w-8 h-8 text-amber-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Flexible Scheduling</h3>
              <p className="text-gray-600">Rain or shine, we show up consistently for your furry friend</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-100 rounded-full mb-4">
                <MapPin className="w-8 h-8 text-amber-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Serving Buziga & Beyond</h3>
              <p className="text-gray-600">Local knowledge of safe walking routes and neighborhoods</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-100 rounded-full mb-4">
                <Camera className="w-8 h-8 text-amber-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">GPS & Photo Updates</h3>
              <p className="text-gray-600">Track walks in real-time and receive happy photos of your dog</p>
            </div>
          </div>
        </div>
      </section>

      {testimonials.length > 0 && (
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">What Our Clients Say</h2>
            <div className="relative bg-white rounded-2xl shadow-xl p-8 md:p-12">
              <div className="flex items-center justify-center mb-4">
                {[...Array(testimonials[currentTestimonial]?.rating || 5)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 text-amber-500 fill-amber-500" />
                ))}
              </div>
              <blockquote className="text-lg text-gray-700 text-center mb-6 italic">
                "{testimonials[currentTestimonial]?.testimonial}"
              </blockquote>
              <p className="text-center font-semibold text-gray-900">
                {testimonials[currentTestimonial]?.client_name}
                {testimonials[currentTestimonial]?.dog_name && (
                  <span className="text-gray-600 font-normal"> (owner of {testimonials[currentTestimonial]?.dog_name})</span>
                )}
              </p>
              <p className="text-center text-gray-600">{testimonials[currentTestimonial]?.location}</p>

              {testimonials.length > 1 && (
                <div className="flex justify-center items-center space-x-4 mt-8">
                  <button
                    onClick={prevTestimonial}
                    className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                  >
                    <ChevronLeft className="w-6 h-6 text-gray-600" />
                  </button>
                  <div className="flex space-x-2">
                    {testimonials.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentTestimonial(index)}
                        className={`w-2 h-2 rounded-full transition-colors ${
                          index === currentTestimonial ? 'bg-amber-600' : 'bg-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <button
                    onClick={nextTestimonial}
                    className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                  >
                    <ChevronRight className="w-6 h-6 text-gray-600" />
                  </button>
                </div>
              )}
            </div>
            <div className="text-center mt-8">
              <Link
                to="/testimonials"
                className="text-amber-600 font-semibold hover:text-amber-700 inline-flex items-center"
              >
                Read More Reviews <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      )}

      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">Our Services</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Choose the perfect package for your dog's needs and energy levels
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service) => (
              <div key={service.id} className="bg-white border-2 border-gray-200 rounded-2xl p-8 hover:border-amber-600 hover:shadow-xl transition-all">
                <h3 className="text-2xl font-bold mb-2 text-gray-900">{service.name}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <div className="mb-6">
                  <div className="text-4xl font-bold text-amber-600 mb-2">
                    {service.price.toLocaleString()} UGX
                  </div>
                  <div className="text-sm text-gray-600">{service.frequency}</div>
                  <div className="text-sm text-gray-600">{service.duration} per walk</div>
                </div>
                <Link
                  to="/services"
                  className="block w-full text-center bg-amber-600 text-white py-3 rounded-lg font-semibold hover:bg-amber-700 transition-colors"
                >
                  Learn More
                </Link>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <p className="text-lg text-gray-700 font-semibold mb-4">
              Multi-Dog Discounts Available!
            </p>
            <p className="text-gray-600">
              2 dogs: 10% off | 3 dogs: 15% off
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-gradient-to-br from-amber-600 to-orange-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Start with a FREE Introductory Walk!</h2>
          <p className="text-xl mb-8 opacity-90">
            Let us meet you and your dog with no commitment. Experience our professional service firsthand.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center bg-white text-amber-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all shadow-lg"
          >
            Book Your Free Walk <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}