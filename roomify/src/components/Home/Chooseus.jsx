import { CheckCircle, Clock, Users } from "lucide-react";
import { Link } from "react-router-dom";

export default function Chooseus() {
  const features = [
    {
      icon: CheckCircle,
      text: "Verified Listings",
    },
    {
      icon: Clock,
      text: "Quick Process",
    },
    {
      icon: Users,
      text: "24/7 Support",
    },
  ];

  const stats = [
    {
      value: "500+",
      label: "Happy Users",
    },
    {
      value: "1000+",
      label: "Rooms Listed",
    },
    {
      value: "4.8/5",
      label: "User Rating",
    },
    {
      value: "98%",
      label: "Success Rate",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Ready to Find Your Perfect Room?
        </h2>
        <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
          Join thousands of satisfied users who found their ideal living space
          through Roomify
        </p>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex items-center gap-2 px-6 py-3 bg-[#37d48e]/10 rounded-full"
            >
              <feature.icon className="w-5 h-5 text-[#37d48e]" />
              <span className="text-gray-800 font-medium">{feature.text}</span>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-16">
          <Link to={"/category/rooms"}
            size="lg"
            className="bg-[#37d48e] hover:bg-[#37d48e]/90 text-white px-8 py-2 rounded-md"
          >
            Start Searching Now
          </Link>
          <button
            size="lg"
            className="border-[#37d48e] text-[#37d48e] hover:bg-[#37d48e]/10 px-8 py-2 rounded-md   "
          >
            List Your Property
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-[#37d48e] text-3xl md:text-4xl font-bold mb-2">
                {stat.value}
              </div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
