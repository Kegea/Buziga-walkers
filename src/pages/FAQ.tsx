import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Link } from 'react-router-dom';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FAQItem[] = [
    {
      category: 'Safety & Logistics',
      question: 'What is your bad weather policy?',
      answer:
        'We walk in all weather conditions, including rain. Dogs still need exercise even when it\'s raining! However, during heavy storms or severe weather, we may shorten the walk slightly for safety. If you prefer to skip walks during bad weather, we can accommodate that preference. Just let us know your comfort level.',
    },
    {
      category: 'Safety & Logistics',
      question: 'How do you handle aggressive or reactive dogs?',
      answer:
        'We have experience working with dogs of all temperaments. During the meet and greet, we assess your dog\'s behavior and discuss any concerns. For reactive dogs, we choose quieter routes and times, use appropriate training techniques, and maintain extra vigilance. Safety is always our top priority for both your dog and others in the community.',
    },
    {
      category: 'Safety & Logistics',
      question: 'What are your security protocols during walks?',
      answer:
        'Security is paramount in Kampala. We know the safe walking routes in each neighborhood and avoid isolated areas. We stay alert to our surroundings at all times and have established relationships with local security personnel. All walks are GPS tracked so you know exactly where your dog has been. We also ensure your home is properly secured before and after each walk.',
    },
    {
      category: 'Safety & Logistics',
      question: 'Are you insured?',
      answer:
        'We operate with full professional liability coverage to protect both you and your pet. We take every precaution to ensure safe, responsible service. During your meet and greet, we\'re happy to discuss our coverage and answer any insurance-related questions you may have.',
    },
    {
      category: 'Scheduling & Payment',
      question: 'What are your hours of operation?',
      answer:
        'We operate Monday through Friday from 7:00 AM to 6:00 PM, and Saturday from 9:00 AM to 1:00 PM. We schedule walks throughout these hours based on your preferences and your dog\'s needs. Morning and late afternoon walks are most popular, but we\'re flexible to accommodate your schedule.',
    },
    {
      category: 'Scheduling & Payment',
      question: 'What payment methods do you accept?',
      answer:
        'We accept cash and Mobile Money (MTN and Airtel) for your convenience. Payment is typically due at the start of each month for monthly packages, or per walk for The Silverback package. We\'ll provide you with payment details and reminders to make the process as easy as possible.',
    },
    {
      category: 'Scheduling & Payment',
      question: 'What is your cancellation policy?',
      answer:
        'We ask for at least 24 hours notice for cancellations so we can adjust our schedule. For regular clients, we\'re very understanding about last-minute changes and will work with you. If you need to cancel an entire month or pause service, just let us know in advance and we\'ll handle it without any penalties.',
    },
    {
      category: 'Scheduling & Payment',
      question: 'Can I adjust my schedule or change packages?',
      answer:
        'Absolutely! We understand that your needs may change. You can upgrade, downgrade, or adjust your walking schedule at any time. Just give us a few days notice so we can update our schedule accordingly. We\'re here to provide a service that works for you.',
    },
    {
      category: 'Service Specific',
      question: 'Do you walk multiple dogs from different households together?',
      answer:
        'Yes, we offer group walks if both owners agree and the dogs are compatible. This can be a great socialization opportunity and is often more fun for the dogs. We carefully assess all dogs during meet and greets to ensure they\'ll get along well. We also offer our multi-dog discount if you have multiple dogs from the same household.',
    },
    {
      category: 'Service Specific',
      question: 'Can you administer medication?',
      answer:
        'Yes, we can give medication during walks if needed. During the meet and greet, please show us exactly how to administer any medications and provide clear written instructions. We\'ll confirm we understand the dosage and timing, and we\'ll let you know after each walk that medication was given as scheduled.',
    },
    {
      category: 'Service Specific',
      question: 'What if my dog has special needs or is elderly?',
      answer:
        'We\'re experienced in caring for dogs with special needs, including elderly dogs, puppies, and dogs with medical conditions. We adjust our walking pace and distance to match your dog\'s abilities. Please share all relevant information during the meet and greet so we can provide the best possible care for your furry friend.',
    },
    {
      category: 'Service Specific',
      question: 'Do you offer services for puppies?',
      answer:
        'Yes! We love working with puppies. For young puppies, we offer shorter, more frequent walks that are appropriate for their age and energy level. We can also help with basic leash training and socialization during walks. This is a great way to tire out an energetic puppy and help them become a well-adjusted adult dog.',
    },
    {
      category: 'Getting Started',
      question: 'How does the free meet and greet work?',
      answer:
        'The meet and greet is completely free with no obligation. We come to your home at a time that works for you. We\'ll meet your dog, discuss their personality and needs, go over your schedule preferences, and answer all your questions. If you have keys to hand over, we\'ll take those at this time. The whole process usually takes 20-30 minutes.',
    },
    {
      category: 'Getting Started',
      question: 'How far in advance do I need to book?',
      answer:
        'We can often start service within a few days of your meet and greet. However, our schedule does fill up, especially during busy seasons, so we recommend booking at least a week in advance when possible. For urgent needs, contact us and we\'ll do our best to accommodate you.',
    },
    {
      category: 'Getting Started',
      question: 'What areas do you serve?',
      answer:
        'We currently serve Buziga, Munyonyo, Bunga, Kansanga, Ggaba, and surrounding neighborhoods in Kampala. If you\'re not sure whether we cover your area, just reach out and we\'ll let you know. We\'re always looking to expand our service area based on client demand.',
    },
  ];

  const categories = [...new Set(faqs.map((faq) => faq.category))];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div>
      <section className="bg-gradient-to-br from-amber-50 to-orange-50 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-gray-700">
            Everything you need to know about our dog walking and pet care services
          </p>
        </div>
      </section>

      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          {categories.map((category) => (
            <div key={category} className="mb-12">
              <h2 className="text-2xl font-bold mb-6 text-gray-900 flex items-center">
                <span className="w-2 h-8 bg-amber-600 mr-3 rounded"></span>
                {category}
              </h2>
              <div className="space-y-4">
                {faqs
                  .filter((faq) => faq.category === category)
                  .map((faq, index) => {
                    const globalIndex = faqs.indexOf(faq);
                    const isOpen = openIndex === globalIndex;

                    return (
                      <div
                        key={globalIndex}
                        className="border border-gray-200 rounded-xl overflow-hidden hover:border-amber-300 transition-colors"
                      >
                        <button
                          onClick={() => toggleFAQ(globalIndex)}
                          className="w-full px-6 py-4 flex items-center justify-between bg-white hover:bg-gray-50 transition-colors text-left"
                        >
                          <span className="font-semibold text-gray-900 pr-4">
                            {faq.question}
                          </span>
                          {isOpen ? (
                            <ChevronUp className="w-5 h-5 text-amber-600 flex-shrink-0" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                          )}
                        </button>
                        {isOpen && (
                          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                            <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                          </div>
                        )}
                      </div>
                    );
                  })}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">Still Have Questions?</h2>
          <p className="text-lg text-gray-700 mb-8">
            We're here to help! Don't hesitate to reach out with any questions or concerns about our services.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="inline-block bg-amber-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-amber-700 transition-all shadow-lg"
            >
              Contact Us
            </Link>
            <a
              href="https://wa.me/256784749832"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-green-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-green-700 transition-all shadow-lg"
            >
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
