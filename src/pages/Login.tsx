import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GraduationCap, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { mockAuth } from "@/lib/mockAuth";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { user, error } = await mockAuth.signInWithPassword(
        formData.email,
        formData.password
      );

      if (error) {
        toast({
          title: "Login Failed",
          description: error,
          variant: "destructive",
        });
      } else {
        toast({
          title: `Welcome back, ${user?.name}!`,
          description: `You have successfully logged in as ${user?.role}.`,
        });
        navigate("/");
      }
    } catch (error) {
      toast({
        title: "Login Failed",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle flex items-center justify-center px-4">
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <Link to="/" className="inline-flex items-center space-x-2 group">
            <div className="bg-gradient-hero p-3 rounded-xl shadow-button group-hover:shadow-soft transition-all duration-300 group-hover:scale-105">
              <GraduationCap className="h-8 w-8 text-primary-foreground" />
            </div>
            <div className="text-left">
              <h1 className="font-bold text-2xl text-primary">KD Academy</h1>
              <p className="text-sm text-muted-foreground -mt-1">Campus Connect</p>
            </div>
          </Link>
          
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-foreground">Welcome Back!</h2>
            <p className="text-muted-foreground">Sign in to access your student portal</p>
          </div>
        </div>

        {/* Login Form */}
        <Card className="p-6 bg-gradient-card border-0 shadow-card">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="student@kdacademy.edu.my"
                  className="pl-10"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="pl-10 pr-10"
                  value={formData.password}
                  onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <Link to="/forgot-password" className="text-primary hover:underline">
                Forgot password?
              </Link>
            </div>

            <Button type="submit" variant="hero" className="w-full" disabled={loading}>
              {loading ? "Signing In..." : "Sign In to Campus Connect"}
            </Button>
          </form>
        </Card>

        {/* Test Credentials */}
        <Card className="p-4 bg-accent-light border-accent/20">
          <div className="text-center space-y-3">
            <h3 className="font-medium text-accent">Test Credentials</h3>
            <div className="space-y-2 text-xs text-accent/80">
              <div>
                <strong>Student:</strong> student@kdacademy.edu.my (any password)
              </div>
              <div>
                <strong>Faculty:</strong> faculty@kdacademy.edu.my (any password)
              </div>
              <div>
                <strong>Admin:</strong> admin@kdacademy.edu.my (any password)
              </div>
            </div>
          </div>
        </Card>

        {/* Register Link */}
        <div className="text-center text-sm">
          <span className="text-muted-foreground">Don't have an account? </span>
          <Link to="/register" className="text-primary hover:underline font-medium">
            Create Account
          </Link>
        </div>

        {/* Role Information */}
        <Card className="p-4 bg-accent-light border-accent/20">
          <div className="text-center space-y-2">
            <h3 className="font-medium text-accent">Multiple Login Options</h3>
            <p className="text-xs text-accent/80">
              Students, Faculty, and Administrators all use this portal with role-based access
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Login;