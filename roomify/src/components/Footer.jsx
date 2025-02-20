import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Twitter,
  Linkedin,
  Send,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-[#111827] text-gray-300 py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">
              <span className="text-white">Room</span>
              <span className="text-primary">ify</span>
            </h2>
            <p className="text-gray-400 leading-relaxed">
              Making room hunting easier and more accessible for everyone. Your
              trusted partner in finding the perfect living space.
            </p>
            <div className="flex space-x-4">
              {[
                { icon: Facebook, href: "#" },
                { icon: Twitter, href: "#" },
                { icon: Send, href: "#" },
                { icon: Linkedin, href: "#" },
              ].map((social, index) => (
                <Link
                  key={index}
                  to={social.href}
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary transition-colors duration-200"
                >
                  <social.icon className="w-5 h-5" />
                  <span className="sr-only">{social.icon.name}</span>
                </Link>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white">Quick Links</h3>
            <ul className="space-y-4">
              {[
                "Home",
                "Search Rooms",
                "Featured Listings",
                "Testimonials",
                "List Your Property",
              ].map((link) => (
                <li key={link}>
                  <Link
                    to="#"
                    className="hover:text-primary transition-colors duration-200"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white">Support</h3>
            <ul className="space-y-4">
              {[
                "Help Center",
                "Safety Information",
                "Cancellation Policy",
                "Privacy Policy",
                "Terms of Service",
              ].map((link) => (
                <li key={link}>
                  <Link
                    to="#"
                    className="hover:text-primary transition-colors duration-200"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white">Contact Us</h3>
            <ul className="space-y-4">
              {[
                {
                  icon: Phone,
                  content: "+977 9800225544",
                  href: "tel:98989898998",
                },
                {
                  icon: Mail,
                  content: "support@Roomify.com",
                  href: "mailto:support@Roomify.com",
                },
                {
                  icon: MapPin,
                  content: "IIC street, Morang",
                  href: "#",
                },
              ].map((item, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <item.icon className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <Link
                    to={item.href}
                    className="hover:text-primary transition-colors duration-200"
                  >
                    {item.content}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
