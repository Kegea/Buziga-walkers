import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, Dog, Sparkles } from 'lucide-react';
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

const FALLBACK_SERVICES: ServicePackage[] = [
  { id: '1', name: 'The Black Panther', description: 'Perfect for busy owners who want regular exercise for their pets.', price: 110000, frequency: '3 walks per week', duration: '45 mins', features: ['GPS Tracked Walks', 'Fresh Water Top-up', 'Paws Cleaned', 'Daily Photo Updates'], is_per_walk: false },
  { id: '2', name: 'The Dog Storm', description: 'Our most popular package for high-energy dogs.', price: 133000, frequency: '5 walks per week', duration: '60 mins', features: ['High-Energy Exercise', 'Socialization Play', 'Complimentary Grooming (Soon)', 'Priority Scheduling'], is_per_walk: false },
  { id: '3', name: 'The Silverback', description: 'On-demand walking for your flexible schedule.', price: 15000, frequency: 'Single Walk', duration: '60 mins', features: ['No Commitment', 'Weekend Availability', 'Detailed Visit Report', 'One-on-One Attention'], is_per_walk: true }
];

export default function PricingGrid() {
  const [services, setServices] = useState<ServicePackage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const { data, error } = await supabase
          .from('service_packages')
          .select('*')
          .eq('is_active', true)
          .order('display_order');
        if (error) throw error;
        setServices(data && data.length > 0 ? data : FALLBACK_SERVICES);
      } catch (error) {
        setServices(FALLBACK_SERVICES);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  const getPriceDisplay = (service: ServicePackage) => {
    const priceStr = service.price.toLocaleString();
    return service.is_per_walk || service.name === 'The Silverback' 
      ? `${priceStr} UGX / walk` 
      : `${priceStr} UGX / month`;
  };

  if (loading) return <div className="text-center py-10">Loading plans...</div>;

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      {services.map((service, index) => (
        <div key={service.id} className={`relative bg-white rounded-3xl shadow-xl overflow-hidden border transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 ${index === 1 ? 'border-amber-500 ring-2 ring-amber-500/20 lg:scale-105 z-10' : 'border-gray-100'}`}>
          {index === 1 && <div className="bg-amber-500 text-white text-center py-2 font-bold text-sm uppercase tracking-widest">Best Value</div>}
          <div className="p-10">
            <div className="flex items-center justify-center w-20 h-20 bg-amber-50 rounded-2xl mb-6 mx-auto">
              {index === 1 ? <Sparkles className="w-10 h-10 text-amber-600" /> : <Dog className="w-10 h-10 text-amber-600" />}
            </div>
            <h3 className="text-2xl font-bold text-center mb-3 text-gray-900">{service.name}</h3>
            <p className="text-center text-gray-500 mb-8 min-h-[48px] text-sm">{service.description}</p>
            <div className="text-center mb-8 bg-gray-50 py-6 rounded-2xl">
              <div className="text-2xl font-black text-amber-600 mb-1">{getPriceDisplay(service)}</div>
              <div className="text-xs font-semibold text-gray-400 uppercase tracking-tighter">{service.frequency} • {service.duration}</div>
            </div>
            <ul className="space-y-4 mb-10">
              {service.features.map((feature, idx) => (
                <li key={idx} className="flex items-start space-x-3">
                  <Check className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                  <span className="text-gray-600 text-sm font-medium">{feature}</span>
                </li>
              ))}
            </ul>
            <Link to="/contact" className={`block w-full text-center py-4 rounded-xl font-bold transition-all ${index === 1 ? 'bg-amber-600 text-white hover:bg-amber-700' : 'bg-amber-50 text-amber-700 hover:bg-amber-100'}`}>
              Select Plan
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
