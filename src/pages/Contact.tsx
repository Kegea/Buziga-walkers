import { useState } from 'react';
import { Calendar, Dog, User, Phone } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    dogName: '',
    dogBreed: '',
    serviceType: '30min-walk',
    preferredDate: '',
    preferredTime: '',
    message: '',
    meetGreet: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Format WhatsApp message
    const message = `🎉 NEW MEET & GREET REQUEST 🎉

👤 Customer: ${formData.name}
📞 Phone: ${formData.phone}
📧 Email: ${formData.email}

🐕 Dog: ${formData.dogName} (${formData.dogBreed})
📅 Preferred Date: ${formData.preferredDate}
⏰ Preferred Time: ${formData.preferredTime}
🎯 Service: ${formData.serviceType}

💬 Message: ${formData.message}

📍 Type: ${formData.meetGreet ? 'MEET & GREET' : 'Regular Inquiry'}`;

    // Encode message for WhatsApp URL
    const encodedMessage = encodeURIComponent(message);
    
    // Your WhatsApp number
    const whatsappNumber = '256784749832';
    
    // Open WhatsApp with pre-filled message
    window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8">Book a Free Meet & Greet</h1>
        
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-8">
          {/* Personal Information */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <User className="w-5 h-5 mr-2 text-amber-600" />
              Your Information
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Full Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Phone Number *</label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  placeholder="+256 XXX XXX XXX"
                />
              </div>
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Dog Information */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Dog className="w-5 h-5 mr-2 text-amber-600" />
              Dog Information
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Dog's Name *</label>
                <input
                  type="text"
                  required
                  value={formData.dogName}
                  onChange={(e) => setFormData({...formData, dogName: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Breed</label>
                <input
                  type="text"
                  value={formData.dogBreed}
                  onChange={(e) => setFormData({...formData, dogBreed: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Service & Scheduling */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-amber-600" />
              Schedule & Service
            </h2>
            
            <div className="mb-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.meetGreet}
                  onChange={(e) => setFormData({...formData, meetGreet: e.target.checked})}
                  className="mr-2 w-4 h-4 text-amber-600 focus:ring-amber-500"
                />
                <span className="font-semibold text-amber-700">This is for a Meet & Greet session</span>
              </label>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Service Type</label>
                <select
                  value={formData.serviceType}
                  onChange={(e) => setFormData({...formData, serviceType: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                >
                  <option value="The Black Panther (3x per week)">The Black Panther (3x per week)</option>
                  <option value="The Dog Storm (2x + grooming)">The Dog Storm (2x + grooming)</option>
                  <option value="The Silverback (Daily Walks)">The Silverback (Daily Walks)</option>
                     <option value="Pet sitting">Pet sitting</option>
                  <option value="Not Sure Yet">Not Sure Yet</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Preferred Date</label>
                <input
                  type="date"
                  value={formData.preferredDate}
                  onChange={(e) => setFormData({...formData, preferredDate: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium mb-2">Preferred Time</label>
              <select
                value={formData.preferredTime}
                onChange={(e) => setFormData({...formData, preferredTime: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              >
                <option value="">Select time</option>
                <option value="morning">Morning (7AM - 10AM)</option>
                <option value="midday">Midday (10AM - 2PM)</option>
                <option value="afternoon">Afternoon (2PM - 5PM)</option>
                <option value="evening">Evening (5PM - 7PM)</option>
              </select>
            </div>
          </div>

          {/* Additional Message */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Additional Information</label>
            <textarea
              rows={4}
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              placeholder="Tell us about your dog's personality, any special needs, or specific requirements..."
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-amber-600 text-white py-4 rounded-lg font-semibold text-lg hover:bg-amber-700 transition-all shadow-lg hover:shadow-xl flex items-center justify-center"
          >
            <Phone className="w-5 h-5 mr-2" />
            Send via WhatsApp
          </button>

          <p className="text-center text-gray-600 mt-4 text-sm">
            You'll be redirected to WhatsApp to confirm your booking
          </p>
        </form>
      </div>
    </div>
  );
}