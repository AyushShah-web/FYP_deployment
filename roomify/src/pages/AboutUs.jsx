import { Users, CheckCircle, Shield, MessageSquareText, Star } from "lucide-react";
import { Link } from "react-router-dom";

export default function AboutUs() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-12 md:mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            About <span className="text-primary">Roomify</span>
          </h1>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Your trusted partner in finding the perfect room hassle-free.
            We connect room seekers with verified listings to ensure a seamless experience.
          </p>
        </div>

        {/* Our Mission Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-gray-600">
              At Roomify, our mission is to simplify the process of finding
              comfortable and affordable living spaces. We aim to provide
              reliable, verified listings and a seamless user experience.
            </p>
          </div>
          <div className="flex justify-center">
            <Users className="w-32 h-32 text-primary" />
          </div>
        </div>

        {/* Why Choose Us Section */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Us?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We provide quality listings, verified landlords, and top-notch
            customer support.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {[ 
            { icon: CheckCircle, title: "Verified Listings", text: "All properties are verified for authenticity." },
            { icon: Shield, title: "Secure Transactions", text: "Your payments and information are safe with us." },
            { icon: MessageSquareText, title: "24/7 Support", text: "Our support team is always here to assist you." },
          ].map((feature, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 shadow-lg text-center">
              <div className="mb-4 inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10">
                <feature.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.text}</p>
            </div>
          ))}
        </div>

        {/* Testimonials Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">What Our Users Say</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Real experiences from our satisfied users who found their perfect living space.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[ 
            { name: "Alice", role: "Student", quote: "Roomify made finding a place easy and stress-free!" },
            { name: "John", role: "Professional", quote: "The verified listings gave me peace of mind." },
            { name: "Emily", role: "Traveler", quote: "I found a great room quickly with their user-friendly platform." },
          ].map((testimonial, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{testimonial.name}</h3>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
              <div className="mb-4 flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-700 italic">&quot;{testimonial.quote}&quot;</p>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-12">
          <Link to="/contact" className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90">
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
}
