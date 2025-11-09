import { useEffect, useState } from 'react';
import { Star, Quote } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface Testimonial {
  id: string;
  client_name: string;
  location: string;
  dog_name: string | null;
  testimonial: string;
  rating: number;
}

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    const { data } = await supabase
      .from('testimonials')
      .select('*')
      .eq('is_published', true)
      .order('created_at', { ascending: false });

    if (data) setTestimonials(data);
  };

  return (
    <div>
      <section className="bg-gradient-to-br from-amber-50 to-orange-50 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">Client Testimonials</h1>
          <p className="text-xl text-gray-700">
            Hear what our happy clients have to say about their experience with Buziga Dog Walkers
          </p>
        </div>
      </section>

      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          {testimonials.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">Loading testimonials...</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-all border border-gray-100"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-amber-500 fill-amber-500" />
                      ))}
                    </div>
                    <Quote className="w-8 h-8 text-amber-200" />
                  </div>

                  <p className="text-gray-700 mb-6 leading-relaxed italic">
                    "{testimonial.testimonial}"
                  </p>

                  <div className="border-t border-gray-200 pt-4">
                    <p className="font-bold text-gray-900">{testimonial.client_name}</p>
                    <p className="text-sm text-gray-600">{testimonial.location}</p>
                    {testimonial.dog_name && (
                      <p className="text-sm text-amber-600 mt-1">
                        Owner of {testimonial.dog_name}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Why Clients Choose Us</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-5xl font-bold text-amber-600 mb-2">100%</div>
              <div className="text-lg font-semibold text-gray-900 mb-2">Satisfaction Rate</div>
              <p className="text-gray-600">
                Every client is thrilled with our reliable, professional service
              </p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-amber-600 mb-2">5★</div>
              <div className="text-lg font-semibold text-gray-900 mb-2">Average Rating</div>
              <p className="text-gray-600">
                Consistently top-rated by dog owners across Kampala
              </p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-amber-600 mb-2">Rain or Shine</div>
              <div className="text-lg font-semibold text-gray-900 mb-2">We Show Up</div>
              <p className="text-gray-600">
                Reliable service you and your dog can count on every day
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-8 lg:p-12 border-2 border-amber-200">
            <h2 className="text-3xl font-bold text-center mb-6 text-gray-900">
              Want to Share Your Experience?
            </h2>
            <p className="text-center text-gray-700 text-lg mb-8">
              We'd love to hear how we've helped make your dog happier and your life easier. Your feedback helps other dog owners make the right choice.
            </p>
            <div className="text-center">
              <a
                href="mailto:emask2.0user1@outlook.com?subject=Testimonial for Buziga Dog Walkers"
                className="inline-block bg-amber-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-amber-700 transition-all shadow-lg"
              >
                Send Your Testimonial
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
