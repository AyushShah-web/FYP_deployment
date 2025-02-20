import {
  Search,
  Shield,
  MessageSquareText,
  Check,
  ArrowRight,
} from "lucide-react";

export default function Whyrf() {
  const features = [
    {
      icon: Search,
      title: "Smart Search",
      description:
        "Advanced filters and search options to help you find exactly what you're looking for in seconds",
      bulletPoints: ["Location-based search", "Custom filters"],
    },
    {
      icon: Shield,
      title: "Verified Listings",
      description:
        "Every property is verified by our team to ensure quality and authenticity",
      bulletPoints: ["Quality checks", "Secure transactions"],
    },
    {
      icon: MessageSquareText,
      title: "24/7 Support",
      description:
        "Our dedicated support team is always ready to help you with any queries",
      bulletPoints: ["Live chat support", "Quick response time"],
    },
  ];

  return (
    <section className="py-16 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Choose Roomify?
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Experience the easiest way to find your perfect living space with
            our comprehensive platform
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-lg shadow-gray-200/50"
            >
              <div className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10">
                <feature.icon className="w-8 h-8 text-primary" />
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 mb-6">{feature.description}</p>

              <ul className="space-y-3">
                {feature.bulletPoints.map((point, pointIndex) => (
                  <li key={pointIndex} className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-primary" />
                    <span className="text-gray-700">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex justify-center">
          <button className=" flex items-center bg-primary hover:bg-primary/90 text-white font-semibold px-5 py-3 h-auto text-lg rounded-full">
            Get Started Now
            <ArrowRight className="ml-2 w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
