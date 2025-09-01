import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Users,
  BookOpen,
  BarChart3,
  Settings,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Clock,
  Award,
  FileText,
  Shield,
  Database
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { mockAuth } from "@/lib/mockAuth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    const user = mockAuth.getCurrentUser();
    setCurrentUser(user);
    
    // Redirect non-admin users
    if (user?.role !== 'admin') {
      navigate('/');
      toast({
        title: "Access Denied",
        description: "You don't have permission to access the admin dashboard.",
        variant: "destructive",
      });
    }
  }, [navigate, toast]);

  const systemStats = [
    {
      title: "Total Users",
      value: "1,247",
      change: "+12%",
      icon: Users,
      color: "text-blue-600",
      trend: "up"
    },
    {
      title: "Active Courses",
      value: "89",
      change: "+5%",
      icon: BookOpen,
      color: "text-green-600",
      trend: "up"
    },
    {
      title: "System Health",
      value: "98.5%",
      change: "+0.5%",
      icon: CheckCircle,
      color: "text-green-600",
      trend: "up"
    },
    {
      title: "Pending Requests",
      value: "23",
      change: "-8%",
      icon: Clock,
      color: "text-yellow-600",
      trend: "down"
    }
  ];

  const recentActivities = [
    {
      id: 1,
      action: "New course created",
      user: "Dr. Sarah Johnson",
      course: "Advanced Mathematics",
      time: "2 hours ago",
      type: "course"
    },
    {
      id: 2,
      action: "User registration",
      user: "John Smith",
      role: "Student",
      time: "4 hours ago",
      type: "user"
    },
    {
      id: 3,
      action: "Grade submission",
      user: "Prof. Michael Chen",
      course: "Computer Science",
      time: "6 hours ago",
      type: "grade"
    },
    {
      id: 4,
      action: "System backup",
      user: "System",
      details: "Daily backup completed",
      time: "1 day ago",
      type: "system"
    }
  ];

  const quickActions = [
    {
      title: "User Management",
      description: "Manage users, roles, and permissions",
      icon: Users,
      color: "text-blue-600",
      action: () => {
        toast({
          title: "User Management",
          description: "User management system will be available in the next update.",
          variant: "default",
        });
      }
    },
    {
      title: "Course Management",
      description: "Create, edit, and manage courses",
      icon: BookOpen,
      color: "text-green-600",
      action: () => {
        toast({
          title: "Course Management",
          description: "Course management system will be available in the next update.",
          variant: "default",
        });
      }
    },
    {
      title: "System Reports",
      description: "Generate and view system reports",
      icon: BarChart3,
      color: "text-purple-600",
      action: () => {
        toast({
          title: "System Reports",
          description: "Reporting system will be available in the next update.",
          variant: "default",
        });
      }
    },
    {
      title: "System Settings",
      description: "Configure system preferences",
      icon: Settings,
      color: "text-gray-600",
      action: () => {
        toast({
          title: "System Settings",
          description: "System settings will be available in the next update.",
          variant: "default",
        });
      }
    }
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'course':
        return <BookOpen className="h-4 w-4 text-green-600" />;
      case 'user':
        return <Users className="h-4 w-4 text-blue-600" />;
      case 'grade':
        return <Award className="h-4 w-4 text-purple-600" />;
      case 'system':
        return <Database className="h-4 w-4 text-gray-600" />;
      default:
        return <FileText className="h-4 w-4 text-gray-600" />;
    }
  };

  if (currentUser?.role !== 'admin') {
    return null; // Don't render if not admin
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">
            Admin Dashboard
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            System overview and administrative controls for KD Academy Campus Connect
          </p>
        </div>

        {/* System Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {systemStats.map((stat, index) => (
            <Card 
              key={stat.title}
              className="p-6 bg-gradient-card border-0 shadow-card hover:shadow-soft transition-all duration-300 animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <div className="flex items-center space-x-1 mt-1">
                    {stat.trend === 'up' ? (
                      <TrendingUp className="h-3 w-3 text-green-600" />
                    ) : (
                      <TrendingUp className="h-3 w-3 text-red-600 rotate-180" />
                    )}
                    <span className={`text-xs ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                      {stat.change}
                    </span>
                  </div>
                </div>
                <div className={`p-3 rounded-lg bg-muted ${stat.color}`}>
                  <stat.icon className="h-6 w-6" />
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {quickActions.map((action, index) => (
            <Card 
              key={action.title}
              className="p-6 bg-gradient-card border-0 shadow-card hover:shadow-soft transition-all duration-300 hover:scale-105 cursor-pointer animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
              onClick={action.action}
            >
              <div className="text-center space-y-4">
                <div className={`p-3 rounded-lg bg-muted ${action.color} mx-auto w-fit`}>
                  <action.icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{action.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{action.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Recent Activities */}
        <div className="grid lg:grid-cols-2 gap-8">
          <Card className="p-6 bg-gradient-card border-0 shadow-card">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-foreground">Recent Activities</h2>
              <Badge variant="secondary">Live</Badge>
            </div>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                  {getActivityIcon(activity.type)}
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">
                      {activity.user} • {activity.time}
                    </p>
                    {activity.course && (
                      <p className="text-xs text-muted-foreground">Course: {activity.course}</p>
                    )}
                    {activity.details && (
                      <p className="text-xs text-muted-foreground">{activity.details}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6 bg-gradient-card border-0 shadow-card">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-foreground">System Status</h2>
              <Badge variant="default" className="bg-green-100 text-green-800">All Systems Operational</Badge>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-lg bg-green-50 border border-green-200">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm font-medium">Database</span>
                </div>
                <span className="text-xs text-green-600">Online</span>
              </div>
              
              <div className="flex items-center justify-between p-3 rounded-lg bg-green-50 border border-green-200">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm font-medium">Authentication</span>
                </div>
                <span className="text-xs text-green-600">Online</span>
              </div>
              
              <div className="flex items-center justify-between p-3 rounded-lg bg-green-50 border border-green-200">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm font-medium">File Storage</span>
                </div>
                <span className="text-xs text-green-600">Online</span>
              </div>
              
              <div className="flex items-center justify-between p-3 rounded-lg bg-yellow-50 border border-yellow-200">
                <div className="flex items-center space-x-3">
                  <AlertCircle className="h-4 w-4 text-yellow-600" />
                  <span className="text-sm font-medium">Email Service</span>
                </div>
                <span className="text-xs text-yellow-600">Maintenance</span>
              </div>
            </div>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-subtle rounded-2xl p-8 shadow-card mt-12">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Need Help with System Administration?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Contact our technical support team for assistance with system configuration, user management, or any administrative tasks.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="hero"
              onClick={() => {
                toast({
                  title: "Support Request Sent!",
                  description: "Our technical support team will contact you within 2 hours.",
                  variant: "default",
                });
              }}
            >
              <Shield className="h-4 w-4 mr-2" />
              Contact Technical Support
            </Button>
            <Button 
              variant="outline"
              onClick={() => {
                toast({
                  title: "System Documentation",
                  description: "System documentation will be available in the next update.",
                  variant: "default",
                });
              }}
            >
              <FileText className="h-4 w-4 mr-2" />
              View Documentation
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AdminDashboard;

