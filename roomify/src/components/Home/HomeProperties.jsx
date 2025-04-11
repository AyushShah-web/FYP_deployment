import { IndianRupee, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function HomeProperties({ properties }) {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Featured Properties
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our hand-picked selection of premium properties that offer
            the best in comfort and convenience
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {properties.map((property, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg overflow-hidden"
            >
              <div className="p-6 relative">
                <span className="absolute top-0 left-0 bg-primary text-white text-sm px-3 py-1 rounded-br-lg">
                  Featured
                </span>

                <div className="mt-6">
                  <img src={property.image} alt="" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {property.name}
                  </h3>
                  <p className="text-gray-600 mb-4">{property.location}</p>

                  <div className="flex items-center gap-6 mb-6">
                    <div className="flex items-center gap-2 text-gray-700">
                      <IndianRupee className="w-5 h-5" />
                      <span>Nrs.{property.price}/mo</span>
                    </div>
                  </div>
                  <Link
                    to={`/room/${property._id}`}
                    className="w-full bg-primary hover:bg-primary/90 rounded-sm  text-white py-2 px-1 lg:px-2 rounded-xl"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center ">
          <Link
            to={"/category/rooms"}
            className="inline-flex items-center gap-2 text-primary font-semibold hover:text-primary/90 transition-colors"
          >
            View All Properties
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
