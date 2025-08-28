import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  BookOpen,
  Users,
  FileText,
  Video,
  Headphones,
  Download,
  Calendar,
  MapPin,
  Phone,
  Mail,
  Clock,
  Star
} from "lucide-react";

const StudentResources = () => {
  const resourceCategories = [
    {
      id: 1,
      title: "Academic Resources",
      icon: BookOpen,
      color: "text-primary",
      resources: [
        { name: "Library Database Access", type: "Link", description: "Access to online journals and research papers" },
        { name: "Study Guides Collection", type: "PDF", description: "Comprehensive study materials for all courses" },
        { name: "Citation Tools", type: "Tool", description: "APA, MLA, and Chicago citation generators" },
        { name: "Academic Writing Center", type: "Service", description: "Get help with essays and research papers" }
      ]
    },
    {
      id: 2,
      title: "Technology Support",
      icon: Users,
      color: "text-secondary",
      resources: [
        { name: "IT Help Desk", type: "Service", description: "24/7 technical support for all IT issues" },
        { name: "Software Downloads", type: "Download", description: "Free software for students (Office, Adobe, etc.)" },
        { name: "WiFi Setup Guide", type: "PDF", description: "How to connect to campus WiFi networks" },
        { name: "Online Learning Platform", type: "Link", description: "Access to course materials and assignments" }
      ]
    },
    {
      id: 3,
      title: "Student Services",
      icon: FileText,
      color: "text-accent",
      resources: [
        { name: "Career Counseling", type: "Service", description: "Professional career guidance and planning" },
        { name: "Mental Health Support", type: "Service", description: "Confidential counseling and wellness services" },
        { name: "Financial Aid Office", type: "Service", description: "Scholarships, grants, and financial assistance" },
        { name: "Student ID Services", type: "Service", description: "ID card replacement and verification" }
      ]
    }
  ];

  const popularResources = [
    {
      id: 1,
      title: "Student Handbook 2024",
      type: "PDF",
      downloads: 1247,
      rating: 4.8,
      size: "3.2 MB",
      icon: FileText
    },
    {
      id: 2,
      title: "Campus Map & Directory",
      type: "PDF",
      downloads: 892,
      rating: 4.6,
      size: "1.8 MB",
      icon: MapPin
    },
    {
      id: 3,
      title: "Academic Calendar 2024",
      type: "PDF",
      downloads: 1567,
      rating: 4.9,
      size: "2.1 MB",
      icon: Calendar
    },
    {
      id: 4,
      title: "IT Support Video Tutorials",
      type: "Video",
      downloads: 445,
      rating: 4.7,
      size: "156 MB",
      icon: Video
    }
  ];

  const supportContacts = [
    {
      name: "Academic Advisor",
      contact: "Dr. Sarah Johnson",
      phone: "+60 3-1234 5678",
      email: "advisor@kdacademy.edu.my",
      availability: "Mon-Fri, 9AM-5PM",
      icon: Users
    },
    {
      name: "IT Support",
      contact: "Tech Support Team",
      phone: "+60 3-1234 5679",
      email: "support@kdacademy.edu.my",
      availability: "24/7",
      icon: Users
    },
    {
      name: "Student Services",
      contact: "Student Affairs Office",
      phone: "+60 3-1234 5680",
      email: "student.services@kdacademy.edu.my",
      availability: "Mon-Fri, 8AM-6PM",
      icon: Users
    }
  ];

  const stats = [
    { label: "Total Resources", value: "156", icon: FileText, color: "text-primary" },
    { label: "Downloads This Month", value: "2,847", icon: Download, color: "text-secondary" },
    { label: "Support Tickets", value: "23", icon: Users, color: "text-accent" },
    { label: "Average Rating", value: "4.7", icon: Star, color: "text-green-600" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">
            Student Resources
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Access all the tools, services, and support you need for academic success
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card 
              key={stat.label}
              className="p-6 bg-gradient-card border-0 shadow-card hover:shadow-soft transition-all duration-300 animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center space-x-4">
                <div className={`p-3 rounded-lg bg-muted ${stat.color}`}>
                  <stat.icon className="h-6 w-6" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Resource Categories */}
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-6">Resource Categories</h2>
              <div className="space-y-6">
                {resourceCategories.map((category, index) => (
                  <Card 
                    key={category.id}
                    className="p-6 bg-gradient-card border-0 shadow-card hover:shadow-soft transition-all duration-300 animate-slide-up"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <div className={`p-3 rounded-lg bg-muted ${category.color}`}>
                          <category.icon className="h-6 w-6" />
                        </div>
                        <h3 className="text-lg font-semibold text-foreground">{category.title}</h3>
                      </div>
                      <div className="grid gap-3">
                        {category.resources.map((resource, resourceIndex) => (
                          <div key={resourceIndex} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-1">
                                <h4 className="font-medium text-foreground">{resource.name}</h4>
                                <Badge variant="outline" className="text-xs">{resource.type}</Badge>
                              </div>
                              <p className="text-sm text-muted-foreground">{resource.description}</p>
                            </div>
                            <Button variant="outline" size="sm">
                              Access
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Popular Resources */}
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-6">Popular Resources</h2>
              <div className="grid gap-4">
                {popularResources.map((resource, index) => (
                  <Card 
                    key={resource.id}
                    className="p-4 bg-gradient-card border-0 shadow-card hover:shadow-soft transition-all duration-300 animate-slide-up"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="p-3 rounded-lg bg-muted text-primary">
                        <resource.icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground">{resource.title}</h3>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-1">
                          <span className="flex items-center">
                            <Download className="h-3 w-3 mr-1" />
                            {resource.downloads} downloads
                          </span>
                          <span className="flex items-center">
                            <Star className="h-3 w-3 mr-1" />
                            {resource.rating}
                          </span>
                          <span>{resource.size}</span>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Support Contacts */}
            <Card className="p-6 bg-gradient-card border-0 shadow-card">
              <h3 className="text-lg font-semibold text-foreground mb-4">Support Contacts</h3>
              <div className="space-y-4">
                {supportContacts.map((contact) => (
                  <div key={contact.name} className="p-4 bg-muted rounded-lg">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="p-2 rounded-lg bg-background">
                        <contact.icon className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium text-foreground">{contact.name}</h4>
                        <p className="text-sm text-muted-foreground">{contact.contact}</p>
                      </div>
                    </div>
                    <div className="space-y-1 text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <Phone className="h-3 w-3 mr-2" />
                        {contact.phone}
                      </div>
                      <div className="flex items-center">
                        <Mail className="h-3 w-3 mr-2" />
                        {contact.email}
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-3 w-3 mr-2" />
                        {contact.availability}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Quick Actions */}
            <Card className="p-6 bg-gradient-card border-0 shadow-card">
              <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="h-4 w-4 mr-2" />
                  Download Student Handbook
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Calendar className="h-4 w-4 mr-2" />
                  View Academic Calendar
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <MapPin className="h-4 w-4 mr-2" />
                  Campus Map
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Users className="h-4 w-4 mr-2" />
                  Contact Support
                </Button>
              </div>
            </Card>

            {/* Emergency Contacts */}
            <Card className="p-6 bg-gradient-card border-0 shadow-card">
              <h3 className="text-lg font-semibold text-foreground mb-4">Emergency Contacts</h3>
              <div className="space-y-3">
                <div className="p-3 bg-red-50 rounded-lg">
                  <div className="font-medium text-red-800">Campus Security</div>
                  <div className="text-sm text-red-600">+60 3-1234 9999</div>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg">
                  <div className="font-medium text-blue-800">Health Services</div>
                  <div className="text-sm text-blue-600">+60 3-1234 8888</div>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <div className="font-medium text-green-800">IT Emergency</div>
                  <div className="text-sm text-green-600">+60 3-1234 7777</div>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-subtle rounded-2xl p-8 shadow-card mt-12">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Can't Find What You're Looking For?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Our student services team is here to help you find the resources you need. 
            Don't hesitate to reach out for assistance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero">
              Contact Student Services
            </Button>
            <Button variant="outline">
              Submit Support Ticket
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default StudentResources;
