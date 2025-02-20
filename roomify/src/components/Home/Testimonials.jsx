import { User, Star } from "lucide-react";

const testimonials = [
  {
    name: "anyone",
    role: "Student",
    quote:
      "Found my perfect student accommodation within days. The filters made it so easy to find exactly what I was looking for. Highly recommend!",
  },
  {
    name: "noone",
    role: "Teacher",
    quote:
      "The verification process gave me peace of mind. Found a great building in a prime location. The support team was incredibly helpful throughout.",
  },
  {
    name: "someone",
    role: "Remote Worker",
    quote:
      "As someone who works remotely, finding a quiet space was crucial. Roomify helped me find the perfect setup with high-speed internet and a dedicated workspace.",
  },
];

export default function Testimonials() {
  return (
    <section className="py-16 bg-primary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            What Our Users Say
          </h2>
          <p className="text-white/80 max-w-2xl mx-auto">
            Real experiences from our satisfied users who found their perfect
            living space
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {testimonial.name}
                  </h3>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
              </div>

              <blockquote>
                <p className="text-gray-700 italic">
                  &quot;{testimonial.quote}&quot;
                </p>
              </blockquote>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
