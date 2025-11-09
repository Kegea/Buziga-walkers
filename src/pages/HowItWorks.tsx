import { Phone, Calendar, DogIcon, Camera, MessageCircle, Heart } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      icon: Phone,
      title: 'Get in Touch',
      description: 'Contact us via WhatsApp or phone to discuss your dog\'s needs, schedule, and any special requirements.',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Calendar,
      title: 'Schedule Your Walk',
      description: 'Choose a convenient time that works for you. We offer flexible scheduling for morning, afternoon, and evening walks.',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: DogIcon,
      title: 'Meet & Greet',
      description: 'We\'ll meet your furry friend and learn about their personality, preferences, and any special care instructions.',
      color: 'from-amber-500 to-amber-600'
    },
    {
      icon: Heart,
      title: 'Enjoy the Walk',
      description: 'Your dog enjoys a safe, fun walk through Kampala\'s best routes while getting exercise and socialization.',
      color: 'from-red-500 to-red-600'
    },
    {
      icon: Camera,
      title: 'Photo Updates',
      description: 'Receive real-time photos and updates during the walk so you can see your dog having a great time.',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: MessageCircle,
      title: 'Walk Report',
      description: 'Get a summary of the walk including distance, duration, bathroom breaks, and your dog\'s behavior.',
      color: 'from-teal-500 to-teal-600'
    }
  ];

  return (
    <div>
      {/* Title Section with Background Image */}
      <section className="relative py-20 px-4 bg-amber-50">
        {/* Background Image Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
  
          }}
        ></div>
        
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
            How It Works
          </h1>
          <p className="text-xl lg:text-2xl text-gray-700 font-medium">
            Getting started with Buziga Walkers is simple and stress-free. Here's how we make dog walking easy for you.
          </p>
        </div>
      </section>

      {/* Rest of your existing content remains the same */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid gap-12">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="flex flex-col md:flex-row gap-6 items-start md:items-center group">
                  <div className="flex-shrink-0">
                    <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all group-hover:scale-110`}>
                      <Icon className="w-10 h-10 text-white" />
                    </div>
                  </div>

                  <div className="flex-grow relative">
                    <div className="absolute -left-3 top-0 text-6xl font-bold text-gray-100 select-none">
                      {index + 1}
                    </div>
                    <div className="relative z-10">
                      <h3 className="text-2xl font-bold text-gray-900 mb-3">
                        Step {index + 1}: {step.title}
                      </h3>
                      <p className="text-lg text-gray-700 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-gradient-to-br from-amber-600 to-orange-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Ready to Give Your Dog the Walk They Deserve?
          </h2>
          <p className="text-xl text-amber-50 mb-8">
            Join hundreds of happy pet owners in Kampala who trust Buziga Walkers with their furry friends.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/256784749832"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-amber-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-amber-50 transition-all shadow-lg hover:shadow-xl inline-block"
            >
              Book Your First Walk
            </a>
            <a
              href="/contact"
              className="bg-amber-700 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-amber-800 transition-all shadow-lg hover:shadow-xl inline-block"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">What to Expect</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-50 p-6 rounded-xl">
              <h3 className="text-xl font-bold text-gray-900 mb-3">During the Walk</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 font-bold">•</span>
                  <span>30-60 minute walks based on your package</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 font-bold">•</span>
                  <span>Professional handling and safety precautions</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 font-bold">•</span>
                  <span>Fresh water provided during longer walks</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 font-bold">•</span>
                  <span>Waste cleanup included</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 font-bold">•</span>
                  <span>GPS tracking available upon request</span>
                </li>
              </ul>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl">
              <h3 className="text-xl font-bold text-gray-900 mb-3">After the Walk</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 font-bold">•</span>
                  <span>Photos of your dog during the walk</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 font-bold">•</span>
                  <span>Walk summary with distance and time</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 font-bold">•</span>
                  <span>Behavioral notes and observations</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 font-bold">•</span>
                  <span>Bathroom break documentation</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 font-bold">•</span>
                  <span>Any concerns or highlights shared immediately</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}