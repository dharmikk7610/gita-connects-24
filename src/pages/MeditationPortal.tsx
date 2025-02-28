
import { useState, useEffect } from "react";
import { 
  ArrowRight, 
  ChevronRight, 
  Calendar, 
  Clock, 
  Search, 
  SlidersHorizontal, 
  PlayCircle, 
  Star,
  Heart,
  Sparkle,
  PlusCircle,
  Pencil,
  Trash,
  X
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/context/AuthContext";
import AuthRequired from "@/components/AuthRequired";
import MeditationJourney from "@/components/MeditationJourney";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { Link } from "react-router-dom";
import { 
  MeditationJourney as MeditationJourneyType,
  ScheduleItem, 
  getAllJourneys, 
  getJourneysByCategory, 
  getFeaturedJourneys,
  getUserSchedule,
  addScheduleItem,
  updateScheduleItem,
  deleteScheduleItem
} from "@/services/meditationService";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const MeditationPortal = () => {
  const { isAuthenticated, user } = useAuth();
  const [selectedJourney, setSelectedJourney] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [durationFilter, setDurationFilter] = useState([5, 40]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isCustomizeScheduleOpen, setIsCustomizeScheduleOpen] = useState(false);
  const [editingScheduleItem, setEditingScheduleItem] = useState<ScheduleItem | null>(null);
  const [newScheduleItem, setNewScheduleItem] = useState<Partial<ScheduleItem>>({
    day: "Monday",
    practice: "",
    time: "7:00 AM",
    duration: 20
  });
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  // Fetch meditation journeys
  const { data: journeys = [], isLoading: isJourneysLoading, error: journeysError } = useQuery({
    queryKey: ['meditationJourneys'],
    queryFn: getAllJourneys,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
  
  // Fetch user's schedule if authenticated
  const { data: scheduleItems = [], isLoading: isScheduleLoading } = useQuery({
    queryKey: ['userSchedule', user?.uid],
    queryFn: () => user?.uid ? getUserSchedule(user.uid) : Promise.resolve([]),
    enabled: !!user?.uid,
    staleTime: 60 * 1000, // 1 minute
  });

  // Mutations for schedule operations
  const addScheduleMutation = useMutation({
    mutationFn: (newItem: Omit<ScheduleItem, "id" | "userId">) => {
      if (!user?.uid) throw new Error("User not authenticated");
      return addScheduleItem(user.uid, newItem);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userSchedule', user?.uid] });
      setIsCustomizeScheduleOpen(false);
      setNewScheduleItem({
        day: "Monday",
        practice: "",
        time: "7:00 AM",
        duration: 20
      });
      toast({
        title: "Schedule Updated",
        description: "New meditation session added to your schedule."
      });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Failed to add schedule item",
        description: error instanceof Error ? error.message : "Unknown error occurred"
      });
    }
  });
  
  const updateScheduleMutation = useMutation({
    mutationFn: updateScheduleItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userSchedule', user?.uid] });
      setEditingScheduleItem(null);
      setIsCustomizeScheduleOpen(false);
      setNewScheduleItem({
        day: "Monday",
        practice: "",
        time: "7:00 AM",
        duration: 20
      });
      toast({
        title: "Schedule Updated",
        description: "Your meditation schedule has been updated."
      });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Failed to update schedule",
        description: error instanceof Error ? error.message : "Unknown error occurred"
      });
    }
  });
  
  const deleteScheduleMutation = useMutation({
    mutationFn: deleteScheduleItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userSchedule', user?.uid] });
      toast({
        title: "Schedule Updated",
        description: "Meditation session removed from your schedule."
      });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Failed to delete schedule item",
        description: error instanceof Error ? error.message : "Unknown error occurred"
      });
    }
  });

  // Filter journeys based on search, category, and duration
  const filteredJourneys = journeys.filter(journey => {
    const matchesSearch = journey.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          journey.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "all" || journey.category === activeCategory;
    const matchesDuration = journey.duration >= durationFilter[0] && journey.duration <= durationFilter[1];
    
    return matchesSearch && matchesCategory && matchesDuration;
  });

  // Group journeys by category
  const featuredJourneys = filteredJourneys.filter(journey => journey.featured);
  const beginnerJourneys = filteredJourneys.filter(journey => journey.category === "beginner");
  const energyJourneys = filteredJourneys.filter(journey => journey.category === "energy");
  const devotionalJourneys = filteredJourneys.filter(journey => journey.category === "devotional");
  const advancedJourneys = filteredJourneys.filter(journey => journey.category === "advanced");
  const scriptureJourneys = filteredJourneys.filter(journey => journey.category === "scripture");

  // Stats data (in a real app, this would come from Firestore)
  const userStats = {
    totalSessions: 24,
    totalMinutes: 540,
    longestStreak: 7,
    currentStreak: 3,
    favoriteJourney: "Chakra Healing",
    lastCompletedSession: "2 hours ago",
  };

  const handleScheduleSession = (day: string, practice: string) => {
    // Find the corresponding journey to start
    const journeyToStart = journeys.find(j => j.title === practice);
    
    if (journeyToStart) {
      setSelectedJourney(journeyToStart.id);
      toast({
        title: "Session Started",
        description: `Starting your ${practice} session scheduled for ${day}.`,
      });
    } else {
      toast({
        title: "Session Scheduled",
        description: `${practice} has been added to your calendar for ${day}.`,
      });
    }
  };

  const handleResetFilters = () => {
    setSearchQuery("");
    setActiveCategory("all");
    setDurationFilter([5, 40]);
    setIsFilterOpen(false);
  };

  const findJourneyForPractice = (practiceName: string) => {
    return journeys.find(journey => journey.title === practiceName);
  };
  
  // Schedule customization functions
  const handleAddScheduleItem = () => {
    if (!newScheduleItem.practice) {
      toast({
        title: "Missing Information",
        description: "Please select a practice for your schedule.",
        variant: "destructive"
      });
      return;
    }
    
    addScheduleMutation.mutate({
      day: newScheduleItem.day || "Monday",
      practice: newScheduleItem.practice || "",
      time: newScheduleItem.time || "7:00 AM",
      duration: newScheduleItem.duration || 20,
    });
  };
  
  const handleEditScheduleItem = (item: ScheduleItem) => {
    setEditingScheduleItem(item);
    setNewScheduleItem({
      day: item.day,
      practice: item.practice,
      time: item.time,
      duration: item.duration
    });
    setIsCustomizeScheduleOpen(true);
  };
  
  const handleUpdateScheduleItem = () => {
    if (!editingScheduleItem) return;
    
    if (!newScheduleItem.practice) {
      toast({
        title: "Missing Information",
        description: "Please select a practice for your schedule.",
        variant: "destructive"
      });
      return;
    }
    
    updateScheduleMutation.mutate({
      id: editingScheduleItem.id,
      userId: editingScheduleItem.userId,
      day: newScheduleItem.day || editingScheduleItem.day,
      practice: newScheduleItem.practice || editingScheduleItem.practice,
      time: newScheduleItem.time || editingScheduleItem.time,
      duration: newScheduleItem.duration || editingScheduleItem.duration
    });
  };
  
  const handleDeleteScheduleItem = (id: string) => {
    deleteScheduleMutation.mutate(id);
  };
  
  const handleCancelEdit = () => {
    setEditingScheduleItem(null);
    setNewScheduleItem({
      day: "Monday",
      practice: "",
      time: "7:00 AM",
      duration: 20
    });
  };

  // Time options for select
  const timeOptions = [
    "5:00 AM", "5:30 AM", "6:00 AM", "6:30 AM", "7:00 AM", "7:30 AM",
    "8:00 AM", "8:30 AM", "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM",
    "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM",
    "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM",
    "5:00 PM", "5:30 PM", "6:00 PM", "6:30 PM", "7:00 PM", "7:30 PM",
    "8:00 PM", "8:30 PM", "9:00 PM", "9:30 PM", "10:00 PM"
  ];

  // Days of the week
  const days = [
    "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
  ];

  // Show loading state if data is loading
  if (isJourneysLoading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <main className="pt-24 pb-16 bg-gradient-to-b from-deepBlue-600/20 to-deepBlue-600/5 dark:from-deepBlue-800 dark:to-deepBlue-900 min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-gold-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-300">Loading meditation journeys...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Show error state if there was an error loading data
  if (journeysError) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <main className="pt-24 pb-16 bg-gradient-to-b from-deepBlue-600/20 to-deepBlue-600/5 dark:from-deepBlue-800 dark:to-deepBlue-900 min-h-screen flex items-center justify-center">
          <div className="text-center max-w-md mx-auto p-6 bg-white/90 dark:bg-deepBlue-700/50 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold text-red-600 mb-4">Error Loading Meditation Data</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              We're having trouble loading the meditation journeys. Please try again later.
            </p>
            <Button onClick={() => window.location.reload()}>
              Retry
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="pt-24 pb-16 bg-gradient-to-b from-deepBlue-600/20 to-deepBlue-600/5 dark:from-deepBlue-800 dark:to-deepBlue-900 min-h-screen">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 animate-fade-in">
            <h1 className="text-3xl md:text-4xl font-bold text-deepBlue-600 dark:text-white mb-4 section-heading">
              Cosmic Meditation Portal
            </h1>
            <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-300">
              Embark on immersive meditation journeys that connect you with higher consciousness,
              balance your chakras, and reveal the deeper wisdom of ancient teachings.
            </p>
          </div>
          
          {isAuthenticated ? (
            selectedJourney ? (
              <MeditationJourney 
                journey={journeys.find(j => j.id === selectedJourney)!} 
                onClose={() => setSelectedJourney(null)}
              />
            ) : (
              <>
                {/* Portal Navigation */}
                <div className="mb-8 flex justify-center">
                  <NavigationMenu>
                    <NavigationMenuList>
                      <NavigationMenuItem>
                        <NavigationMenuTrigger className="bg-white/80 dark:bg-deepBlue-700/50">Explore Journeys</NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-2">
                            <li className="row-span-3">
                              <NavigationMenuLink asChild>
                                <a
                                  className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-purple-500/80 to-indigo-700 p-6 no-underline outline-none focus:shadow-md"
                                  href="#featured"
                                >
                                  <div className="mt-4 mb-2 text-lg font-medium text-white">
                                    Featured Journeys
                                  </div>
                                  <p className="text-sm leading-tight text-white/80">
                                    Discover our most popular meditation experiences curated for spiritual growth.
                                  </p>
                                </a>
                              </NavigationMenuLink>
                            </li>
                            <li>
                              <a
                                href="#beginner"
                                className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                              >
                                <div className="text-sm font-medium leading-none">Beginner Practices</div>
                                <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                  Simple meditation practices for those new to the path.
                                </p>
                              </a>
                            </li>
                            <li>
                              <a
                                href="#energy"
                                className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                              >
                                <div className="text-sm font-medium leading-none">Energy Work</div>
                                <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                  Practices focused on balancing and harmonizing your energy centers.
                                </p>
                              </a>
                            </li>
                            <li>
                              <a
                                href="#devotional"
                                className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                              >
                                <div className="text-sm font-medium leading-none">Devotional Practices</div>
                                <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                  Connect with divine consciousness through bhakti meditation.
                                </p>
                              </a>
                            </li>
                          </ul>
                        </NavigationMenuContent>
                      </NavigationMenuItem>
                      <NavigationMenuItem>
                        <NavigationMenuTrigger className="bg-white/80 dark:bg-deepBlue-700/50">My Practice</NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px]">
                            <li className="row-span-3">
                              <a
                                className="flex flex-col justify-end rounded-md bg-gradient-to-b from-gold-400 to-amber-600 p-6 no-underline outline-none focus:shadow-md"
                                href="#weekly-schedule"
                              >
                                <div className="mt-4 mb-2 text-lg font-medium text-white">
                                  My Progress
                                </div>
                                <p className="text-sm leading-tight text-white/80">
                                  Track your meditation journey, set goals, and view your statistics.
                                </p>
                              </a>
                            </li>
                            <li>
                              <div className="p-4 border rounded-md bg-white/90 dark:bg-deepBlue-700/80 card">
                                <h3 className="text-sm font-medium mb-1">Your Meditation Stats</h3>
                                <div className="grid grid-cols-2 gap-2 text-xs">
                                  <div>
                                    <p className="text-gray-500 dark:text-gray-400">Total Sessions</p>
                                    <p className="font-medium">{userStats.totalSessions}</p>
                                  </div>
                                  <div>
                                    <p className="text-gray-500 dark:text-gray-400">Total Minutes</p>
                                    <p className="font-medium">{userStats.totalMinutes}</p>
                                  </div>
                                  <div>
                                    <p className="text-gray-500 dark:text-gray-400">Current Streak</p>
                                    <p className="font-medium">{userStats.currentStreak} days</p>
                                  </div>
                                  <div>
                                    <p className="text-gray-500 dark:text-gray-400">Longest Streak</p>
                                    <p className="font-medium">{userStats.longestStreak} days</p>
                                  </div>
                                </div>
                              </div>
                            </li>
                            <li>
                              <div className="p-4 border rounded-md bg-white/90 dark:bg-deepBlue-700/80 card">
                                <h3 className="text-sm font-medium mb-1">Last Session</h3>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                  {userStats.favoriteJourney} • {userStats.lastCompletedSession}
                                </p>
                                <div className="mt-2">
                                  <Button size="sm" variant="outline" className="text-xs btn btn-outline">
                                    View Full History
                                  </Button>
                                </div>
                              </div>
                            </li>
                          </ul>
                        </NavigationMenuContent>
                      </NavigationMenuItem>
                      <NavigationMenuItem>
                        <Link to="/timeline" className={navigationMenuTriggerStyle() + " bg-white/80 dark:bg-deepBlue-700/50"}>
                          Sacred Timeline
                        </Link>
                      </NavigationMenuItem>
                    </NavigationMenuList>
                  </NavigationMenu>
                </div>

                {/* Search and Filters */}
                <div className="max-w-5xl mx-auto mb-8 animate-fade-in">
                  <div className="flex flex-col md:flex-row gap-4 items-center">
                    <div className="relative flex-1 w-full">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        type="text"
                        placeholder="Search meditation journeys..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 bg-white dark:bg-deepBlue-700/50 w-full input"
                      />
                    </div>
                    
                    <Drawer open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                      <DrawerTrigger asChild>
                        <Button variant="outline" className="flex-shrink-0 btn btn-outline">
                          <SlidersHorizontal className="h-4 w-4 mr-2" />
                          Filters
                        </Button>
                      </DrawerTrigger>
                      <DrawerContent>
                        <div className="mx-auto w-full max-w-lg">
                          <DrawerHeader>
                            <DrawerTitle>Filter Meditation Journeys</DrawerTitle>
                            <DrawerDescription>Apply filters to find the perfect practice for your needs</DrawerDescription>
                          </DrawerHeader>
                          <div className="p-4 space-y-6">
                            <div>
                              <h3 className="text-sm font-medium mb-3">Meditation Duration</h3>
                              <Slider
                                value={durationFilter}
                                min={5}
                                max={40}
                                step={5}
                                onValueChange={setDurationFilter}
                              />
                              <div className="flex justify-between text-xs text-gray-500 mt-2">
                                <span>{durationFilter[0]} min</span>
                                <span>{durationFilter[1]} min</span>
                              </div>
                            </div>
                            
                            <div>
                              <h3 className="text-sm font-medium mb-3">Categories</h3>
                              <div className="grid grid-cols-2 gap-2">
                                {["all", "beginner", "energy", "devotional", "advanced", "scripture"].map(category => (
                                  <Button 
                                    key={category}
                                    variant={activeCategory === category ? "default" : "outline"}
                                    onClick={() => setActiveCategory(category)}
                                    className={`w-full justify-start ${activeCategory === category ? 'btn btn-primary' : 'btn btn-outline'}`}
                                  >
                                    {category.charAt(0).toUpperCase() + category.slice(1)}
                                  </Button>
                                ))}
                              </div>
                            </div>
                          </div>
                          <DrawerFooter>
                            <Button onClick={() => setIsFilterOpen(false)} className="btn btn-primary">Apply Filters</Button>
                            <DrawerClose asChild>
                              <Button variant="outline" onClick={handleResetFilters} className="btn btn-outline">Reset Filters</Button>
                            </DrawerClose>
                          </DrawerFooter>
                        </div>
                      </DrawerContent>
                    </Drawer>
                    
                    <Tabs defaultValue="all" className="flex-shrink-0">
                      <TabsList>
                        <TabsTrigger value="all" onClick={() => setActiveCategory("all")}>All</TabsTrigger>
                        <TabsTrigger value="featured" onClick={() => setActiveCategory("featured")}>Featured</TabsTrigger>
                        <TabsTrigger value="beginner" onClick={() => setActiveCategory("beginner")}>Beginner</TabsTrigger>
                      </TabsList>
                    </Tabs>
                  </div>
                </div>
                
                {/* Weekly Schedule */}
                <div id="weekly-schedule" className="max-w-5xl mx-auto mb-10 animate-fade-in">
                  <Card className="bg-white/90 dark:bg-deepBlue-700/50 border-gold-200 dark:border-gold-800/30 card">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-xl flex items-center section-heading">
                        <Calendar className="h-5 w-5 mr-2 text-gold-500" />
                        Weekly Practice Schedule
                      </CardTitle>
                      <CardDescription>
                        Establish a routine with our recommended meditation schedule
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {isScheduleLoading ? (
                        <div className="text-center py-8">
                          <div className="w-10 h-10 border-4 border-gold-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                          <p className="text-gray-500 dark:text-gray-400">Loading your schedule...</p>
                        </div>
                      ) : scheduleItems.length === 0 ? (
                        <div className="text-center py-8">
                          <p className="text-gray-500 dark:text-gray-400 mb-4">You haven't added any meditation sessions to your schedule yet.</p>
                          <Button 
                            onClick={() => setIsCustomizeScheduleOpen(true)}
                            className="btn btn-primary"
                          >
                            <PlusCircle className="h-4 w-4 mr-2" />
                            Add Your First Session
                          </Button>
                        </div>
                      ) : (
                        <div className="overflow-x-auto">
                          <table className="w-full">
                            <thead>
                              <tr className="text-left border-b border-gray-200 dark:border-gray-700">
                                <th className="pb-2 text-sm font-medium text-gray-500 dark:text-gray-400">Day</th>
                                <th className="pb-2 text-sm font-medium text-gray-500 dark:text-gray-400">Practice</th>
                                <th className="pb-2 text-sm font-medium text-gray-500 dark:text-gray-400">Time</th>
                                <th className="pb-2 text-sm font-medium text-gray-500 dark:text-gray-400">Duration</th>
                                <th className="pb-2 text-sm font-medium text-gray-500 dark:text-gray-400"></th>
                              </tr>
                            </thead>
                            <tbody>
                              {scheduleItems.map((session, index) => {
                                // Find the matching journey if available
                                const matchingJourney = journeys.find(j => j.title === session.practice);
                                
                                return (
                                  <tr key={session.id} className="border-b border-gray-100 dark:border-gray-800 last:border-0">
                                    <td className="py-3 text-sm">{session.day}</td>
                                    <td className="py-3 text-sm font-medium sanskrit-text">{session.practice}</td>
                                    <td className="py-3 text-sm">{session.time}</td>
                                    <td className="py-3 text-sm">{session.duration} min</td>
                                    <td className="py-3 text-right flex gap-2 justify-end">
                                      <Button 
                                        size="sm"
                                        variant="ghost"
                                        onClick={() => handleScheduleSession(session.day, session.practice)}
                                        className="text-gold-500 hover:text-gold-600 hover:bg-gold-50 dark:hover:bg-gold-900/10 btn btn-primary"
                                      >
                                        <PlayCircle className="h-4 w-4 mr-1" />
                                        Start
                                      </Button>
                                      <Button 
                                        size="sm"
                                        variant="ghost"
                                        onClick={() => handleEditScheduleItem(session)}
                                        className="text-blue-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/10"
                                      >
                                        <Pencil className="h-4 w-4" />
                                      </Button>
                                      <Button 
                                        size="sm"
                                        variant="ghost"
                                        onClick={() => handleDeleteScheduleItem(session.id)}
                                        className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10"
                                      >
                                        <Trash className="h-4 w-4" />
                                      </Button>
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </CardContent>
                    <CardFooter>
                      <Dialog open={isCustomizeScheduleOpen} onOpenChange={setIsCustomizeScheduleOpen}>
                        <DialogTrigger asChild>
                          <Button className="w-full btn btn-primary">
                            Customize Schedule
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-md">
                          <DialogHeader>
                            <DialogTitle>{editingScheduleItem ? "Edit Schedule" : "Customize Your Schedule"}</DialogTitle>
                            <DialogDescription>
                              {editingScheduleItem 
                                ? "Update your meditation practice details" 
                                : "Add new meditation practices to your weekly routine"}
                            </DialogDescription>
                          </DialogHeader>

                          <div className="space-y-4 py-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <label htmlFor="day" className="text-sm font-medium">Day</label>
                                <Select
                                  value={newScheduleItem.day}
                                  onValueChange={(value) => setNewScheduleItem({...newScheduleItem, day: value})}
                                >
                                  <SelectTrigger id="day" className="divine-input">
                                    <SelectValue placeholder="Select day" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {days.map(day => (
                                      <SelectItem key={day} value={day}>
                                        {day}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>
                              
                              <div className="space-y-2">
                                <label htmlFor="time" className="text-sm font-medium">Time</label>
                                <Select
                                  value={newScheduleItem.time}
                                  onValueChange={(value) => setNewScheduleItem({...newScheduleItem, time: value})}
                                >
                                  <SelectTrigger id="time" className="divine-input">
                                    <SelectValue placeholder="Select time" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {timeOptions.map(time => (
                                      <SelectItem key={time} value={time}>
                                        {time}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                            
                            <div className="space-y-2">
                              <label htmlFor="practice" className="text-sm font-medium">Practice</label>
                              <Select
                                value={newScheduleItem.practice}
                                onValueChange={(value) => setNewScheduleItem({...newScheduleItem, practice: value})}
                              >
                                <SelectTrigger id="practice" className="divine-input">
                                  <SelectValue placeholder="Select practice" />
                                </SelectTrigger>
                                <SelectContent>
                                  {journeys.map(journey => (
                                    <SelectItem key={journey.id} value={journey.title}>
                                      {journey.title} ({journey.duration} min)
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                            
                            <div className="space-y-2">
                              <label htmlFor="duration" className="text-sm font-medium">Duration (minutes)</label>
                              <div className="pt-2">
                                <Slider
                                  id="duration"
                                  value={[newScheduleItem.duration || 20]}
                                  min={5}
                                  max={60}
                                  step={5}
                                  onValueChange={(value) => setNewScheduleItem({...newScheduleItem, duration: value[0]})}
                                />
                                <div className="flex justify-between text-xs text-gray-500 mt-2">
                                  <span>5 min</span>
                                  <span>{newScheduleItem.duration || 20} min</span>
                                  <span>60 min</span>
                                </div>
                              </div>
                            </div>
                          </div>

                          <DialogFooter className="flex flex-col sm:flex-row sm:justify-between">
                            {editingScheduleItem ? (
                              <div className="flex flex-col sm:flex-row gap-2 w-full">
                                <Button 
                                  variant="default" 
                                  onClick={handleUpdateScheduleItem}
                                  className="w-full btn btn-primary"
                                  disabled={updateScheduleMutation.isPending}
                                >
                                  {updateScheduleMutation.isPending ? (
                                    <>
                                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                      Updating...
                                    </>
                                  ) : (
                                    "Update Schedule"
                                  )}
                                </Button>
                                <Button 
                                  variant="outline" 
                                  onClick={handleCancelEdit}
                                  className="w-full btn btn-outline"
                                  disabled={updateScheduleMutation.isPending}
                                >
                                  Cancel
                                </Button>
                              </div>
                            ) : (
                              <Button 
                                variant="default" 
                                onClick={handleAddScheduleItem}
                                className="w-full btn btn-primary"
                                disabled={addScheduleMutation.isPending}
                              >
                                {addScheduleMutation.isPending ? (
                                  <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Adding...
                                  </>
                                ) : (
                                  "Add to Schedule"
                                )}
                              </Button>
                            )}
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </CardFooter>
                  </Card>
                </div>

                {/* Featured Journeys */}
                {featuredJourneys.length > 0 && (
                  <div id="featured" className="max-w-5xl mx-auto mb-12 animate-fade-in">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-xl md:text-2xl font-bold text-deepBlue-600 dark:text-white flex items-center section-heading">
                        <Sparkle className="h-5 w-5 mr-2 text-gold-500" />
                        Featured Journeys
                      </h2>
                      <Button variant="link" className="text-gold-500">
                        View All <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {featuredJourneys.map(journey => (
                        <div 
                          key={journey.id}
                          onClick={() => setSelectedJourney(journey.id)}
                          className="bg-white dark:bg-deepBlue-700/50 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer group card divine-card"
                        >
                          <div className="relative h-48 overflow-hidden">
                            <div className={`absolute inset-0 bg-gradient-to-r ${journey.bgColor} opacity-80`}></div>
                            <img 
                              src={journey.imageUrl} 
                              alt={journey.title} 
                              className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                            <div className="absolute bottom-0 left-0 p-4">
                              <h3 className="text-xl font-bold text-white">{journey.title}</h3>
                              <div className="flex items-center mt-1 text-white/80 text-sm">
                                <span>{journey.duration} minutes</span>
                                <span className="mx-2">•</span>
                                <span>{journey.level}</span>
                              </div>
                            </div>
                          </div>
                          <div className="p-5">
                            <p className="text-gray-600 dark:text-gray-300 text-sm">
                              {journey.description}
                            </p>
                            <button className="mt-4 w-full py-2 bg-gradient-to-r from-gold-400 to-gold-600 text-white rounded-md font-medium hover:from-gold-500 hover:to-gold-700 transition-colors duration-300 btn btn-primary">
                              Begin Journey
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Beginner Journeys */}
                {beginnerJourneys.length > 0 && (
                  <div id="beginner" className="max-w-5xl mx-auto mb-12 animate-fade-in">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-xl md:text-2xl font-bold text-deepBlue-600 dark:text-white flex items-center section-heading">
                        <PlayCircle className="h-5 w-5 mr-2 text-gold-500" />
                        Beginner Practices
                      </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {beginnerJourneys.map(journey => (
                        <div 
                          key={journey.id}
                          onClick={() => setSelectedJourney(journey.id)}
                          className="bg-white dark:bg-deepBlue-700/50 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer group card divine-card"
                        >
                          <div className="relative h-48 overflow-hidden">
                            <div className={`absolute inset-0 bg-gradient-to-r ${journey.bgColor} opacity-80`}></div>
                            <img 
                              src={journey.imageUrl} 
                              alt={journey.title} 
                              className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                            <div className="absolute bottom-0 left-0 p-4">
                              <h3 className="text-xl font-bold text-white">{journey.title}</h3>
                              <div className="flex items-center mt-1 text-white/80 text-sm">
                                <span>{journey.duration} minutes</span>
                                <span className="mx-2">•</span>
                                <span>{journey.level}</span>
                              </div>
                            </div>
                          </div>
                          <div className="p-5">
                            <p className="text-gray-600 dark:text-gray-300 text-sm">
                              {journey.description}
                            </p>
                            <button className="mt-4 w-full py-2 bg-gradient-to-r from-gold-400 to-gold-600 text-white rounded-md font-medium hover:from-gold-500 hover:to-gold-700 transition-colors duration-300 btn btn-primary">
                              Begin Journey
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Show more categories... */}
                
                {/* Show a message if no journeys match the filters */}
                {filteredJourneys.length === 0 && (
                  <div className="text-center py-12 bg-white/80 dark:bg-deepBlue-700/30 rounded-lg card">
                    <Sparkle className="h-12 w-12 mx-auto text-gray-400 dark:text-gray-600 mb-4" />
                    <h3 className="text-lg font-medium text-deepBlue-600 dark:text-gold-300 mb-2">No meditation journeys found</h3>
                    <p className="text-gray-600 dark:text-gray-300 max-w-md mx-auto">
                      Try adjusting your search query or filters to find the perfect meditation practice for you.
                    </p>
                    <Button 
                      variant="outline" 
                      onClick={handleResetFilters}
                      className="mt-4 btn btn-outline"
                    >
                      Reset Filters
                    </Button>
                  </div>
                )}
              </>
            )
          ) : (
            <div className="max-w-4xl mx-auto">
              <AuthRequired 
                message="Please log in or sign up to access our immersive meditation journeys." 
                ctaText="logging in"
              />
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default MeditationPortal;
