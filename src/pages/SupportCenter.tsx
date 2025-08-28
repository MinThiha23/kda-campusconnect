import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  HelpCircle,
  MessageCircle,
  Phone,
  Mail,
  Clock,
  Users,
  FileText,
  Video,
  Search,
  Star,
  CheckCircle,
  AlertCircle
} from "lucide-react";

const SupportCenter = () => {
  const supportCategories = [
    {
      id: 1,
      title: "Technical Support",
      description: "IT issues, software problems, and technical assistance",
      icon: HelpCircle,
      color: "text-primary",
      articles: 45,
      tickets: 12
    },
    {
      id: 2,
      title: "Academic Support",
      description: "Course registration, grades, and academic advising",
      icon: FileText,
      color: "text-secondary",
      articles: 32,
      tickets: 8
    },
    {
      id: 3,
      title: "Financial Aid",
      description: "Scholarships, payment issues, and financial assistance",
      icon: Star,
      color: "text-accent",
      articles: 28,
      tickets: 15
    },
    {
      id: 4,
      title: "Student Services",
      description: "Campus life, housing, and student activities",
      icon: Users,
      color: "text-green-600",
      articles: 38,
      tickets: 6
    }
  ];

  const faqItems = [
    {
      question: "How do I reset my password?",
      answer: "You can reset your password by clicking the 'Forgot Password' link on the login page, or contact IT support for assistance.",
      category: "Technical Support",
      helpful: 156
    },
    {
      question: "When will my grades be available?",
      answer: "Grades are typically available within 5-7 business days after the final exam. You can check your student portal for updates.",
      category: "Academic Support",
      helpful: 89
    },
    {
      question: "How do I apply for financial aid?",
      answer: "Complete the financial aid application form available in your student portal. Submit all required documents by the deadline.",
      category: "Financial Aid",
      helpful: 234
    },
    {
      question: "Where can I find my class schedule?",
      answer: "Your class schedule is available in the student portal under 'My Courses' section. You can also download it as a PDF.",
      category: "Academic Support",
      helpful: 67
    }
  ];

  const supportContacts = [
    {
      name: "IT Support",
      phone: "+60 3-1234 5679",
      email: "support@kdacademy.edu.my",
      availability: "24/7",
      responseTime: "2-4 hours",
      icon: HelpCircle
    },
    {
      name: "Academic Advisor",
      phone: "+60 3-1234 5678",
      email: "advisor@kdacademy.edu.my",
      availability: "Mon-Fri, 9AM-5PM",
      responseTime: "24 hours",
      icon: Users
    },
    {
      name: "Financial Aid Office",
      phone: "+60 3-1234 5680",
      email: "financial@kdacademy.edu.my",
      availability: "Mon-Fri, 8AM-6PM",
      responseTime: "48 hours",
      icon: Star
    }
  ];

  const stats = [
    { label: "Support Tickets", value: "41", icon: MessageCircle, color: "text-primary" },
    { label: "Response Time", value: "2.3h", icon: Clock, color: "text-secondary" },
    { label: "Satisfaction Rate", value: "96%", icon: Star, color: "text-accent" },
    { label: "Knowledge Base", value: "143", icon: FileText, color: "text-green-600" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">
            Support Center
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Get help with any questions or issues you may have. We're here to support your academic journey.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search for help articles, FAQs, or contact information..."
              className="w-full pl-10 pr-4 py-3 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
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
            {/* Support Categories */}
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-6">How Can We Help You?</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {supportCategories.map((category, index) => (
                  <Card 
                    key={category.id}
                    className="p-6 bg-gradient-card border-0 shadow-card hover:shadow-soft transition-all duration-300 animate-slide-up cursor-pointer"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <div className={`p-3 rounded-lg bg-muted ${category.color}`}>
                          <category.icon className="h-6 w-6" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-foreground">{category.title}</h3>
                          <p className="text-sm text-muted-foreground">{category.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>{category.articles} help articles</span>
                        <span>{category.tickets} open tickets</span>
                      </div>
                      <Button variant="outline" className="w-full">
                        Get Help
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* FAQ Section */}
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-6">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {faqItems.map((faq, index) => (
                  <Card 
                    key={index}
                    className="p-6 bg-gradient-card border-0 shadow-card hover:shadow-soft transition-all duration-300 animate-slide-up"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="space-y-3">
                      <div className="flex items-start justify-between">
                        <h3 className="font-semibold text-foreground">{faq.question}</h3>
                        <Badge variant="outline" className="text-xs">{faq.category}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{faq.answer}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <CheckCircle className="h-4 w-4" />
                          <span>{faq.helpful} people found this helpful</span>
                        </div>
                        <Button variant="outline" size="sm">
                          Contact Support
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Support */}
            <Card className="p-6 bg-gradient-card border-0 shadow-card">
              <h3 className="text-lg font-semibold text-foreground mb-4">Contact Support</h3>
              <div className="space-y-4">
                {supportContacts.map((contact) => (
                  <div key={contact.name} className="p-4 bg-muted rounded-lg">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="p-2 rounded-lg bg-background">
                        <contact.icon className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium text-foreground">{contact.name}</h4>
                        <p className="text-sm text-muted-foreground">Response: {contact.responseTime}</p>
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
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Submit Support Ticket
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Phone className="h-4 w-4 mr-2" />
                  Call Support
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Video className="h-4 w-4 mr-2" />
                  Schedule Video Call
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="h-4 w-4 mr-2" />
                  View Help Articles
                </Button>
              </div>
            </Card>

            {/* Live Chat */}
            <Card className="p-6 bg-gradient-card border-0 shadow-card">
              <div className="text-center space-y-4">
                <div className="p-3 rounded-lg bg-green-50 mx-auto w-fit">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Live Chat Available</h3>
                  <p className="text-sm text-muted-foreground">Get instant help from our support team</p>
                </div>
                <Button variant="hero" className="w-full">
                  Start Live Chat
                </Button>
              </div>
            </Card>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-subtle rounded-2xl p-8 shadow-card mt-12">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Still Need Help?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Our support team is available 24/7 to assist you with any questions or issues. 
            Don't hesitate to reach out for personalized help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero">
              Submit Support Ticket
            </Button>
            <Button variant="outline">
              View All Help Articles
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default SupportCenter;
