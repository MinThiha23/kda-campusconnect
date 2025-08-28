import { Link } from "react-router-dom";
import { GraduationCap, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  const footerSections = [
    {
      title: "Academic",
      links: [
        { name: "Course Catalog", href: "/courses" },
        { name: "Academic Calendar", href: "/academic-calendar" },
        { name: "Online Learning", href: "/online-learning" },
        { name: "Student Resources", href: "/student-resources" }
      ]
    },
    {
      title: "Services",
      links: [
        { name: "Enrollment", href: "/enrollment" },
        { name: "Attendance", href: "/attendance" },
        { name: "Performance Tracking", href: "/performance" },
        { name: "Support Center", href: "/support-center" }
      ]
    },
    {
      title: "Community",
      links: [
        { name: "Student Portal", href: "/student-portal" },
        { name: "Faculty Hub", href: "/faculty-hub" },
        { name: "Alumni Network", href: "/alumni-network" },
        { name: "Events", href: "/events" }
      ]
    }
  ];

  return (
    <footer className="bg-foreground text-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer */}
        <div className="py-12 grid md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="bg-gradient-hero p-2 rounded-lg">
                <GraduationCap className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="font-bold text-xl">KD Academy</h1>
                <p className="text-xs text-background/70 -mt-1">Campus Connect</p>
              </div>
            </Link>
            
            <p className="text-background/80 max-w-md leading-relaxed">
              Empowering over 1,000 students with innovative technology and exceptional education. 
              Join our community of learners and achievers.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm text-background/70">
                <MapPin className="h-4 w-4" />
                <span>Kuala Lumpur, Malaysia</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-background/70">
                <Phone className="h-4 w-4" />
                <span>+60 3-1234 5678</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-background/70">
                <Mail className="h-4 w-4" />
                <span>info@kdacademy.edu.my</span>
              </div>
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section) => (
            <div key={section.title} className="space-y-4">
              <h3 className="font-semibold text-lg">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link 
                      to={link.href}
                      className="text-background/70 hover:text-background transition-colors duration-200 text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-background/20 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-background/60 text-sm">
              © 2024 KD Academy. All rights reserved. Built with modern technology for the future of education.
            </p>
            
            <div className="flex items-center space-x-6 text-sm">
              <Link to="/privacy" className="text-background/60 hover:text-background transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-background/60 hover:text-background transition-colors">
                Terms of Service
              </Link>
              <Link to="/accessibility" className="text-background/60 hover:text-background transition-colors">
                Accessibility
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;