
import { useState } from "react";
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
  Sparkle 
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
import { useToast } from "@/components/ui/use-toast";
import { Link } from "react-router-dom";

const MeditationPortal = () => {
  const { isAuthenticated, user } = useAuth();
  const [selectedJourney, setSelectedJourney] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [durationFilter, setDurationFilter] = useState([5, 40]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const { toast } = useToast();
  
  // Sample meditation journeys
  const journeys = [
    {
      id: "chakra-healing",
      title: "Chakra Healing",
      description: "Align and balance your seven chakras through guided visualization and energy work.",
      duration: 20,
      level: "All Levels",
      imageUrl: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=500&q=80",
      bgColor: "from-purple-500 to-indigo-600",
      category: "energy",
      featured: true
    },
    {
      id: "astral-travel",
      title: "Astral Travel",
      description: "Experience a guided journey beyond the physical realm into the astral plane.",
      duration: 30,
      level: "Intermediate",
      imageUrl: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=500&q=80",
      bgColor: "from-blue-500 to-purple-600",
      category: "advanced",
      featured: false
    },
    {
      id: "gita-reflections",
      title: "Gita Reflections",
      description: "Deep contemplation on key verses from the Bhagavad Gita for spiritual insight.",
      duration: 25,
      level: "All Levels",
      imageUrl: "https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?w=500&q=80", 
      bgColor: "from-gold-400 to-amber-600",
      category: "scripture",
      featured: true
    },
    {
      id: "inner-peace",
      title: "Inner Peace Sanctuary",
      description: "Find refuge in a tranquil mental sanctuary cultivated through focused breathing and visualization.",
      duration: 15,
      level: "Beginner",
      imageUrl: "https://images.unsplash.com/photo-1476611338391-6f395a0dd82e?w=500&q=80",
      bgColor: "from-green-400 to-teal-500",
      category: "beginner",
      featured: false
    },
    {
      id: "cosmic-connection",
      title: "Cosmic Connection",
      description: "Connect with universal consciousness and explore your place in the cosmic web of existence.",
      duration: 35,
      level: "Advanced",
      imageUrl: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=500&q=80",
      bgColor: "from-deepBlue-500 to-indigo-700",
      category: "advanced",
      featured: true
    },
    {
      id: "divine-love",
      title: "Divine Love Meditation",
      description: "Open your heart to universal love and compassion through bhakti-inspired meditation.",
      duration: 20,
      level: "All Levels",
      imageUrl: "https://images.unsplash.com/photo-1518002171953-a080ee817e1f?w=500&q=80",
      bgColor: "from-pink-400 to-rose-600",
      category: "devotional",
      featured: false
    },
    {
      id: "sound-healing",
      title: "Sacred Sound Healing",
      description: "Harness the vibrational power of mantras and primordial sounds to harmonize your energy field.",
      duration: 25,
      level: "All Levels",
      imageUrl: "https://images.unsplash.com/photo-1477346611705-65d1883cee1e?w=500&q=80",
      bgColor: "from-amber-400 to-orange-600",
      category: "energy",
      featured: false
    },
    {
      id: "krishna-consciousness",
      title: "Krishna Consciousness",
      description: "Connect with the divine presence of Lord Krishna through devotional visualization.",
      duration: 30,
      level: "All Levels",
      imageUrl: "https://images.unsplash.com/photo-1499002238440-d264edd596ec?w=500&q=80",
      bgColor: "from-blue-400 to-blue-600",
      category: "devotional",
      featured: true
    },
    {
      id: "mindful-awareness",
      title: "Mindful Awareness",
      description: "Develop presence and clarity through simple but powerful mindfulness techniques.",
      duration: 10,
      level: "Beginner",
      imageUrl: "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?w=500&q=80",
      bgColor: "from-yellow-400 to-amber-500",
      category: "beginner",
      featured: false
    },
  ];

  // Filter journeys based on search, category, and duration
  const filteredJourneys = journeys.filter(journey => {
    const matchesSearch = journey.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          journey.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "all" || journey.category === activeCategory;
    const matchesDuration = journey.duration >= durationFilter[0] && journey.duration <= durationFilter[1];
    
    return matchesSearch && matchesCategory && matchesDuration;
  });

  // Group journeys by category for the tabs
  const featuredJourneys = filteredJourneys.filter(journey => journey.featured);
  const beginnerJourneys = filteredJourneys.filter(journey => journey.category === "beginner");
  const energyJourneys = filteredJourneys.filter(journey => journey.category === "energy");
  const devotionalJourneys = filteredJourneys.filter(journey => journey.category === "devotional");
  const advancedJourneys = filteredJourneys.filter(journey => journey.category === "advanced");
  const scriptureJourneys = filteredJourneys.filter(journey => journey.category === "scripture");

  // Weekly schedule data
  const weeklySchedule = [
    { day: "Monday", practice: "Mindful Awareness", time: "7:00 AM", duration: 10 },
    { day: "Tuesday", practice: "Chakra Healing", time: "6:30 AM", duration: 20 },
    { day: "Wednesday", practice: "Divine Love Meditation", time: "7:00 AM", duration: 20 },
    { day: "Thursday", practice: "Gita Reflections", time: "6:30 AM", duration: 25 },
    { day: "Friday", practice: "Sacred Sound Healing", time: "7:00 AM", duration: 25 },
    { day: "Saturday", practice: "Krishna Consciousness", time: "8:00 AM", duration: 30 },
    { day: "Sunday", practice: "Cosmic Connection", time: "8:00 AM", duration: 35 },
  ];

  // Stats data
  const userStats = {
    totalSessions: 24,
    totalMinutes: 540,
    longestStreak: 7,
    currentStreak: 3,
    favoriteJourney: "Chakra Healing",
    lastCompletedSession: "2 hours ago",
  };

  const handleScheduleSession = (day: string, practice: string) => {
    toast({
      title: "Session Scheduled",
      description: `${practice} has been added to your calendar for ${day}.`,
    });
  };

  const handleResetFilters = () => {
    setSearchQuery("");
    setActiveCategory("all");
    setDurationFilter([5, 40]);
    setIsFilterOpen(false);
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="pt-24 pb-16 bg-gradient-to-b from-deepBlue-600/20 to-deepBlue-600/5 dark:from-deepBlue-800 dark:to-deepBlue-900 min-h-screen">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 animate-fade-in">
            <h1 className="text-3xl md:text-4xl font-bold text-deepBlue-600 dark:text-white mb-4">
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
                              <div className="p-4 border rounded-md bg-white/90 dark:bg-deepBlue-700/80">
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
                              <div className="p-4 border rounded-md bg-white/90 dark:bg-deepBlue-700/80">
                                <h3 className="text-sm font-medium mb-1">Last Session</h3>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                  {userStats.favoriteJourney} • {userStats.lastCompletedSession}
                                </p>
                                <div className="mt-2">
                                  <Button size="sm" variant="outline" className="text-xs">
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
                        className="pl-10 bg-white dark:bg-deepBlue-700/50 w-full"
                      />
                    </div>
                    
                    <Drawer open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                      <DrawerTrigger asChild>
                        <Button variant="outline" className="flex-shrink-0">
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
                                    className="w-full justify-start"
                                  >
                                    {category.charAt(0).toUpperCase() + category.slice(1)}
                                  </Button>
                                ))}
                              </div>
                            </div>
                          </div>
                          <DrawerFooter>
                            <Button onClick={() => setIsFilterOpen(false)}>Apply Filters</Button>
                            <DrawerClose asChild>
                              <Button variant="outline" onClick={handleResetFilters}>Reset Filters</Button>
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
                  <Card className="bg-white/90 dark:bg-deepBlue-700/50 border-gold-200 dark:border-gold-800/30">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-xl flex items-center">
                        <Calendar className="h-5 w-5 mr-2 text-gold-500" />
                        Weekly Practice Schedule
                      </CardTitle>
                      <CardDescription>
                        Establish a routine with our recommended meditation schedule
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
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
                            {weeklySchedule.map((session, index) => (
                              <tr key={index} className="border-b border-gray-100 dark:border-gray-800 last:border-0">
                                <td className="py-3 text-sm">{session.day}</td>
                                <td className="py-3 text-sm font-medium">{session.practice}</td>
                                <td className="py-3 text-sm">{session.time}</td>
                                <td className="py-3 text-sm">{session.duration} min</td>
                                <td className="py-3 text-right">
                                  <Button 
                                    size="sm"
                                    variant="ghost"
                                    onClick={() => handleScheduleSession(session.day, session.practice)}
                                    className="text-gold-500 hover:text-gold-600 hover:bg-gold-50 dark:hover:bg-gold-900/10"
                                  >
                                    <PlayCircle className="h-4 w-4 mr-1" />
                                    Start
                                  </Button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full">
                        Customize Schedule
                      </Button>
                    </CardFooter>
                  </Card>
                </div>

                {/* Featured Journeys */}
                {featuredJourneys.length > 0 && (
                  <div id="featured" className="max-w-5xl mx-auto mb-12 animate-fade-in">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-xl md:text-2xl font-bold text-deepBlue-600 dark:text-white flex items-center">
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
                          className="bg-white dark:bg-deepBlue-700/50 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer group"
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
                            <button className="mt-4 w-full py-2 bg-gradient-to-r from-gold-400 to-gold-600 text-white rounded-md font-medium hover:from-gold-500 hover:to-gold-700 transition-colors duration-300">
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
                      <h2 className="text-xl md:text-2xl font-bold text-deepBlue-600 dark:text-white flex items-center">
                        <PlayCircle className="h-5 w-5 mr-2 text-gold-500" />
                        Beginner Practices
                      </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {beginnerJourneys.map(journey => (
                        <div 
                          key={journey.id}
                          onClick={() => setSelectedJourney(journey.id)}
                          className="bg-white dark:bg-deepBlue-700/50 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer group"
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
                            <button className="mt-4 w-full py-2 bg-gradient-to-r from-gold-400 to-gold-600 text-white rounded-md font-medium hover:from-gold-500 hover:to-gold-700 transition-colors duration-300">
                              Begin Journey
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Energy Work Journeys */}
                {energyJourneys.length > 0 && (
                  <div id="energy" className="max-w-5xl mx-auto mb-12 animate-fade-in">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-xl md:text-2xl font-bold text-deepBlue-600 dark:text-white flex items-center">
                        <Sparkle className="h-5 w-5 mr-2 text-gold-500" />
                        Energy Work
                      </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {energyJourneys.map(journey => (
                        <div 
                          key={journey.id}
                          onClick={() => setSelectedJourney(journey.id)}
                          className="bg-white dark:bg-deepBlue-700/50 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer group"
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
                            <button className="mt-4 w-full py-2 bg-gradient-to-r from-gold-400 to-gold-600 text-white rounded-md font-medium hover:from-gold-500 hover:to-gold-700 transition-colors duration-300">
                              Begin Journey
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Devotional Journeys */}
                {devotionalJourneys.length > 0 && (
                  <div id="devotional" className="max-w-5xl mx-auto mb-12 animate-fade-in">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-xl md:text-2xl font-bold text-deepBlue-600 dark:text-white flex items-center">
                        <Heart className="h-5 w-5 mr-2 text-gold-500" />
                        Devotional Practices
                      </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {devotionalJourneys.map(journey => (
                        <div 
                          key={journey.id}
                          onClick={() => setSelectedJourney(journey.id)}
                          className="bg-white dark:bg-deepBlue-700/50 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer group"
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
                            <button className="mt-4 w-full py-2 bg-gradient-to-r from-gold-400 to-gold-600 text-white rounded-md font-medium hover:from-gold-500 hover:to-gold-700 transition-colors duration-300">
                              Begin Journey
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Show a message if no journeys match the filters */}
                {filteredJourneys.length === 0 && (
                  <div className="text-center py-12 bg-white/80 dark:bg-deepBlue-700/30 rounded-lg">
                    <Sparkle className="h-12 w-12 mx-auto text-gray-400 dark:text-gray-600 mb-4" />
                    <h3 className="text-lg font-medium text-deepBlue-600 dark:text-gold-300 mb-2">No meditation journeys found</h3>
                    <p className="text-gray-600 dark:text-gray-300 max-w-md mx-auto">
                      Try adjusting your search query or filters to find the perfect meditation practice for you.
                    </p>
                    <Button 
                      variant="outline" 
                      onClick={handleResetFilters}
                      className="mt-4"
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
