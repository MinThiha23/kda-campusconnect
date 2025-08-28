import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Users,
  MessageCircle,
  Heart,
  Share2,
  BookOpen,
  Calendar,
  MapPin,
  Star,
  TrendingUp,
  Plus,
  X,
  CheckCircle
} from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const Community = () => {
  const { toast } = useToast();
  const [showNewPostModal, setShowNewPostModal] = useState(false);
  const [showCreateGroupModal, setShowCreateGroupModal] = useState(false);
  const [newPostContent, setNewPostContent] = useState("");
  const [newGroupName, setNewGroupName] = useState("");
  const [newGroupDescription, setNewGroupDescription] = useState("");
  const [joinedEvents, setJoinedEvents] = useState<number[]>([]);
  const [likedPosts, setLikedPosts] = useState<number[]>([]);

  const communityPosts = [
    {
      id: 1,
      author: {
        name: "Ahmad Rahman",
        avatar: "AR",
        role: "Student",
        course: "Computer Science"
      },
      content: "Just completed the Advanced Mathematics assignment! The calculus section was challenging but really rewarding. Anyone else working on it?",
      timestamp: "2 hours ago",
      likes: 12,
      comments: 5,
      shares: 2,
      tags: ["Mathematics", "Study Group"]
    },
    {
      id: 2,
      author: {
        name: "Dr. Sarah Johnson",
        avatar: "SJ",
        role: "Faculty",
        course: "Mathematics"
      },
      content: "Great work everyone on the midterm exams! I'm impressed with the overall performance. Remember, my office hours are available for anyone who needs extra help.",
      timestamp: "5 hours ago",
      likes: 28,
      comments: 8,
      shares: 3,
      tags: ["Faculty", "Office Hours"]
    },
    {
      id: 3,
      author: {
        name: "Lisa Chen",
        avatar: "LC",
        role: "Student",
        course: "Business Administration"
      },
      content: "Looking for study partners for the Business Administration final project. Anyone interested in forming a study group?",
      timestamp: "1 day ago",
      likes: 8,
      comments: 12,
      shares: 1,
      tags: ["Study Group", "Business"]
    }
  ];

  const upcomingEvents = [
    {
      id: 1,
      title: "Study Group: Advanced Mathematics",
      date: "2024-01-20",
      time: "2:00 PM",
      location: "Library Study Room A",
      attendees: 15,
      organizer: "Ahmad Rahman"
    },
    {
      id: 2,
      title: "Faculty Office Hours",
      date: "2024-01-21",
      time: "10:00 AM",
      location: "Faculty Building Room 205",
      attendees: 8,
      organizer: "Dr. Sarah Johnson"
    },
    {
      id: 3,
      title: "Campus Career Fair",
      date: "2024-01-25",
      time: "9:00 AM",
      location: "Main Auditorium",
      attendees: 45,
      organizer: "Career Services"
    }
  ];

  const communityStats = [
    { label: "Active Students", value: "1,247", icon: Users, color: "text-primary" },
    { label: "Study Groups", value: "23", icon: BookOpen, color: "text-secondary" },
    { label: "Events This Month", value: "8", icon: Calendar, color: "text-accent" },
    { label: "Discussion Posts", value: "156", icon: MessageCircle, color: "text-green-600" }
  ];

  // Interactive functions
  const handleNewPost = () => {
    setShowNewPostModal(true);
  };

  const handleCreateGroup = () => {
    setShowCreateGroupModal(true);
  };

  const handleJoinEvent = (eventId: number) => {
    setJoinedEvents(prev => [...prev, eventId]);
    toast({
      title: "Event Joined!",
      description: "You have successfully joined this event. Check your email for details.",
      variant: "default",
    });
  };

  const handleLikePost = (postId: number) => {
    setLikedPosts(prev => 
      prev.includes(postId) 
        ? prev.filter(id => id !== postId)
        : [...prev, postId]
    );
  };

  const handleSharePost = (postId: number) => {
    toast({
      title: "Post Shared!",
      description: "The post has been shared with your network.",
      variant: "default",
    });
  };

  const handleSubmitPost = () => {
    if (newPostContent.trim()) {
      toast({
        title: "Post Created!",
        description: "Your post has been published to the community feed.",
        variant: "default",
      });
      setNewPostContent("");
      setShowNewPostModal(false);
    }
  };

  const handleSubmitGroup = () => {
    if (newGroupName.trim() && newGroupDescription.trim()) {
      toast({
        title: "Study Group Created!",
        description: "Your study group has been created successfully.",
        variant: "default",
      });
      setNewGroupName("");
      setNewGroupDescription("");
      setShowCreateGroupModal(false);
    }
  };

  const handleBrowseEvents = () => {
    toast({
      title: "Events Page Opened!",
      description: "You can now browse all upcoming events and activities.",
      variant: "default",
    });
  };

  const isEventJoined = (eventId: number) => joinedEvents.includes(eventId);
  const isPostLiked = (postId: number) => likedPosts.includes(postId);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">
            Campus Community
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Connect with fellow students, faculty, and participate in campus activities
          </p>
        </div>

        {/* Community Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          {communityStats.map((stat, index) => (
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
          {/* Community Feed */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-foreground">Community Feed</h2>
              <Button variant="hero" onClick={handleNewPost}>
                <MessageCircle className="h-4 w-4 mr-2" />
                New Post
              </Button>
            </div>

            <div className="space-y-6">
              {communityPosts.map((post, index) => (
                <Card 
                  key={post.id}
                  className="p-6 bg-gradient-card border-0 shadow-card hover:shadow-soft transition-all duration-300 animate-slide-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="space-y-4">
                    {/* Post Header */}
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src="" />
                        <AvatarFallback className="bg-gradient-hero text-primary-foreground">
                          {post.author.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <h3 className="font-semibold text-foreground">{post.author.name}</h3>
                          <Badge variant="secondary" className="text-xs">
                            {post.author.role}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {post.author.course} • {post.timestamp}
                        </p>
                      </div>
                    </div>

                    {/* Post Content */}
                    <p className="text-foreground leading-relaxed">{post.content}</p>

                    {/* Post Tags */}
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          #{tag}
                        </Badge>
                      ))}
                    </div>

                    {/* Post Actions */}
                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <div className="flex items-center space-x-6">
                        <button 
                          className={`flex items-center space-x-2 transition-colors ${
                            isPostLiked(post.id) 
                              ? 'text-red-500 hover:text-red-600' 
                              : 'text-muted-foreground hover:text-foreground'
                          }`}
                          onClick={() => handleLikePost(post.id)}
                        >
                          <Heart className={`h-4 w-4 ${isPostLiked(post.id) ? 'fill-current' : ''}`} />
                          <span className="text-sm">{post.likes + (isPostLiked(post.id) ? 1 : 0)}</span>
                        </button>
                        <button className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors">
                          <MessageCircle className="h-4 w-4" />
                          <span className="text-sm">{post.comments}</span>
                        </button>
                        <button 
                          className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors"
                          onClick={() => handleSharePost(post.id)}
                        >
                          <Share2 className="h-4 w-4" />
                          <span className="text-sm">{post.shares}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Upcoming Events */}
            <Card className="p-6 bg-gradient-card border-0 shadow-card">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-foreground">Upcoming Events</h3>
                  <Button variant="outline" size="sm" onClick={handleBrowseEvents}>
                    <Calendar className="h-4 w-4 mr-2" />
                    View All
                  </Button>
                </div>

                <div className="space-y-4">
                  {upcomingEvents.map((event) => (
                    <div key={event.id} className="p-4 bg-muted rounded-lg">
                      <h4 className="font-medium text-foreground mb-2">{event.title}</h4>
                      <div className="space-y-1 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-3 w-3" />
                          <span>{new Date(event.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <MapPin className="h-3 w-3" />
                          <span>{event.location}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Users className="h-3 w-3" />
                          <span>{event.attendees} attending</span>
                        </div>
                      </div>
                      {isEventJoined(event.id) ? (
                        <Button variant="outline" size="sm" className="w-full mt-3 text-green-600 border-green-600" disabled>
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Joined
                        </Button>
                      ) : (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="w-full mt-3"
                          onClick={() => handleJoinEvent(event.id)}
                        >
                          Join Event
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            {/* Quick Actions */}
            <Card className="p-6 bg-gradient-card border-0 shadow-card">
              <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => {
                    toast({
                      title: "Study Groups Found!",
                      description: "Here are the available study groups in your area.",
                      variant: "default",
                    });
                  }}
                >
                  <BookOpen className="h-4 w-4 mr-2" />
                  Find Study Groups
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => {
                    toast({
                      title: "Peer Connections!",
                      description: "Connect with students who share your interests.",
                      variant: "default",
                    });
                  }}
                >
                  <Users className="h-4 w-4 mr-2" />
                  Connect with Peers
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={handleBrowseEvents}
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  Browse Events
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => {
                    toast({
                      title: "Question Forum!",
                      description: "Ask questions and get answers from the community.",
                      variant: "default",
                    });
                  }}
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Ask Questions
                </Button>
              </div>
            </Card>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-subtle rounded-2xl p-8 shadow-card mt-12">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Get Involved in Campus Life
          </h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Join study groups, attend events, and connect with your peers to make the most of your academic journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" onClick={handleCreateGroup}>
              Create Study Group
            </Button>
            <Button variant="outline" onClick={handleBrowseEvents}>
              Browse All Events
            </Button>
          </div>
        </div>
      </main>

      {/* New Post Modal */}
      {showNewPostModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-background rounded-lg p-6 max-w-md w-full shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold">Create New Post</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowNewPostModal(false)}
                className="h-8 w-8 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="space-y-4">
              <Textarea
                placeholder="What's on your mind? Share your thoughts with the community..."
                value={newPostContent}
                onChange={(e) => setNewPostContent(e.target.value)}
                className="min-h-[120px]"
              />
              
              <div className="flex space-x-3">
                <Button 
                  variant="outline" 
                  onClick={() => setShowNewPostModal(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button 
                  onClick={handleSubmitPost}
                  className="flex-1"
                  disabled={!newPostContent.trim()}
                >
                  Post
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create Study Group Modal */}
      {showCreateGroupModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-background rounded-lg p-6 max-w-md w-full shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold">Create Study Group</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowCreateGroupModal(false)}
                className="h-8 w-8 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground">Group Name</label>
                <Input
                  placeholder="Enter study group name..."
                  value={newGroupName}
                  onChange={(e) => setNewGroupName(e.target.value)}
                />
              </div>
              
              <div>
                <label className="text-sm font-medium text-foreground">Description</label>
                <Textarea
                  placeholder="Describe the purpose and focus of your study group..."
                  value={newGroupDescription}
                  onChange={(e) => setNewGroupDescription(e.target.value)}
                  className="min-h-[100px]"
                />
              </div>
              
              <div className="flex space-x-3">
                <Button 
                  variant="outline" 
                  onClick={() => setShowCreateGroupModal(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button 
                  onClick={handleSubmitGroup}
                  className="flex-1"
                  disabled={!newGroupName.trim() || !newGroupDescription.trim()}
                >
                  Create Group
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <Footer />
    </div>
  );
};

export default Community;
