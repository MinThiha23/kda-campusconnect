import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  BookOpen,
  Users,
  Calendar,
  CheckCircle,
  Clock,
  AlertCircle,
  FileText,
  GraduationCap,
  DollarSign,
  Star
} from "lucide-react";

const Enrollment = () => {
  const enrollmentSteps = [
    {
      id: 1,
      title: "Application Submitted",
      description: "Your application has been received and is under review",
      status: "completed",
      date: "2024-01-15",
      icon: FileText
    },
    {
      id: 2,
      title: "Documents Verified",
      description: "All required documents have been verified",
      status: "completed",
      date: "2024-01-18",
      icon: CheckCircle
    },
    {
      id: 3,
      title: "Interview Scheduled",
      description: "Academic interview scheduled for next week",
      status: "current",
      date: "2024-01-25",
      icon: Users
    },
    {
      id: 4,
      title: "Admission Decision",
      description: "Waiting for admission committee decision",
      status: "pending",
      date: "2024-02-01",
      icon: GraduationCap
    },
    {
      id: 5,
      title: "Course Registration",
      description: "Register for courses after admission approval",
      status: "pending",
      date: "2024-02-15",
      icon: BookOpen
    }
  ];

  const requiredDocuments = [
    {
      name: "Academic Transcripts",
      status: "submitted",
      date: "2024-01-15",
      size: "2.4 MB"
    },
    {
      name: "Personal Statement",
      status: "submitted",
      date: "2024-01-15",
      size: "1.2 MB"
    },
    {
      name: "Letters of Recommendation",
      status: "submitted",
      date: "2024-01-16",
      size: "3.1 MB"
    },
    {
      name: "Financial Aid Application",
      status: "pending",
      date: "2024-01-20",
      size: "0.8 MB"
    },
    {
      name: "Health Certificate",
      status: "not-submitted",
      date: null,
      size: null
    }
  ];

  const programDetails = {
    name: "Bachelor of Computer Science",
    duration: "4 years",
    startDate: "September 2024",
    totalCredits: 120,
    tuitionFee: "$12,000/year",
    applicationFee: "$50",
    deadline: "March 31, 2024"
  };

  const stats = [
    { label: "Application Progress", value: "60%", icon: Progress, color: "text-primary" },
    { label: "Documents Submitted", value: "4/5", icon: FileText, color: "text-secondary" },
    { label: "Days Remaining", value: "45", icon: Calendar, color: "text-accent" },
    { label: "Application Status", value: "In Review", icon: Clock, color: "text-green-600" }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case "current":
        return <Clock className="h-5 w-5 text-blue-600" />;
      case "pending":
        return <AlertCircle className="h-5 w-5 text-yellow-600" />;
      default:
        return <AlertCircle className="h-5 w-5 text-gray-600" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "submitted":
        return <Badge className="bg-green-100 text-green-800">Submitted</Badge>;
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      case "not-submitted":
        return <Badge className="bg-red-100 text-red-800">Not Submitted</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">Unknown</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">
            Enrollment Status
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Track your application progress and complete your enrollment process
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
            {/* Program Details */}
            <Card className="p-6 bg-gradient-card border-0 shadow-card">
              <div className="space-y-4">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-3 rounded-lg bg-muted text-primary">
                    <GraduationCap className="h-6 w-6" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-foreground">{programDetails.name}</h2>
                    <p className="text-muted-foreground">Program Details</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="p-3 bg-muted rounded-lg">
                    <div className="text-sm text-muted-foreground">Duration</div>
                    <div className="font-semibold text-foreground">{programDetails.duration}</div>
                  </div>
                  <div className="p-3 bg-muted rounded-lg">
                    <div className="text-sm text-muted-foreground">Start Date</div>
                    <div className="font-semibold text-foreground">{programDetails.startDate}</div>
                  </div>
                  <div className="p-3 bg-muted rounded-lg">
                    <div className="text-sm text-muted-foreground">Total Credits</div>
                    <div className="font-semibold text-foreground">{programDetails.totalCredits}</div>
                  </div>
                  <div className="p-3 bg-muted rounded-lg">
                    <div className="text-sm text-muted-foreground">Tuition Fee</div>
                    <div className="font-semibold text-foreground">{programDetails.tuitionFee}</div>
                  </div>
                  <div className="p-3 bg-muted rounded-lg">
                    <div className="text-sm text-muted-foreground">Application Fee</div>
                    <div className="font-semibold text-foreground">{programDetails.applicationFee}</div>
                  </div>
                  <div className="p-3 bg-muted rounded-lg">
                    <div className="text-sm text-muted-foreground">Deadline</div>
                    <div className="font-semibold text-foreground">{programDetails.deadline}</div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Enrollment Steps */}
            <Card className="p-6 bg-gradient-card border-0 shadow-card">
              <h2 className="text-xl font-bold text-foreground mb-6">Enrollment Progress</h2>
              <div className="space-y-4">
                {enrollmentSteps.map((step, index) => (
                  <div key={step.id} className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      {getStatusIcon(step.status)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-foreground">{step.title}</h3>
                        <span className="text-sm text-muted-foreground">{step.date}</span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{step.description}</p>
                      {step.status === "current" && (
                        <div className="w-full bg-muted rounded-full h-2">
                          <div className="bg-primary h-2 rounded-full" style={{ width: '60%' }}></div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Required Documents */}
            <Card className="p-6 bg-gradient-card border-0 shadow-card">
              <h2 className="text-xl font-bold text-foreground mb-6">Required Documents</h2>
              <div className="space-y-4">
                {requiredDocuments.map((doc, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 rounded-lg bg-background">
                        <FileText className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium text-foreground">{doc.name}</h3>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          {doc.date && <span>Submitted: {doc.date}</span>}
                          {doc.size && <span>Size: {doc.size}</span>}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      {getStatusBadge(doc.status)}
                      {doc.status === "not-submitted" && (
                        <Button variant="outline" size="sm">
                          Upload
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Application Summary */}
            <Card className="p-6 bg-gradient-card border-0 shadow-card">
              <h3 className="text-lg font-semibold text-foreground mb-4">Application Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Application ID</span>
                  <span className="font-medium">APP-2024-001</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Submission Date</span>
                  <span className="font-medium">Jan 15, 2024</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Status</span>
                  <Badge className="bg-blue-100 text-blue-800">In Review</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Priority</span>
                  <span className="font-medium">High</span>
                </div>
              </div>
            </Card>

            {/* Quick Actions */}
            <Card className="p-6 bg-gradient-card border-0 shadow-card">
              <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="h-4 w-4 mr-2" />
                  Upload Documents
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule Interview
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <DollarSign className="h-4 w-4 mr-2" />
                  Pay Application Fee
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Users className="h-4 w-4 mr-2" />
                  Contact Admissions
                </Button>
              </div>
            </Card>

            {/* Important Dates */}
            <Card className="p-6 bg-gradient-card border-0 shadow-card">
              <h3 className="text-lg font-semibold text-foreground mb-4">Important Dates</h3>
              <div className="space-y-3">
                <div className="p-3 bg-muted rounded-lg">
                  <div className="font-medium text-foreground">Application Deadline</div>
                  <div className="text-sm text-muted-foreground">March 31, 2024</div>
                </div>
                <div className="p-3 bg-muted rounded-lg">
                  <div className="font-medium text-foreground">Interview Period</div>
                  <div className="text-sm text-muted-foreground">Jan 20 - Feb 15, 2024</div>
                </div>
                <div className="p-3 bg-muted rounded-lg">
                  <div className="font-medium text-foreground">Decision Release</div>
                  <div className="text-sm text-muted-foreground">March 15, 2024</div>
                </div>
                <div className="p-3 bg-muted rounded-lg">
                  <div className="font-medium text-foreground">Enrollment Deadline</div>
                  <div className="text-sm text-muted-foreground">April 30, 2024</div>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-subtle rounded-2xl p-8 shadow-card mt-12">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Need Help with Your Application?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Our admissions team is here to help you complete your application successfully. 
            Don't hesitate to reach out with any questions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero">
              Contact Admissions Office
            </Button>
            <Button variant="outline">
              Schedule Consultation
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Enrollment;
