
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Calendar, BookOpen, Clock, Star, Info } from "lucide-react";

const SacredTimeline = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTimeperiod, setActiveTimeperiod] = useState("all");
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(null);

  // Timeline event interface
  interface TimelineEvent {
    id: string;
    year: string;
    title: string;
    description: string;
    category: "mythology" | "historical" | "scripture";
    imageUrl: string;
    timeperiod: "ancient" | "classical" | "medieval" | "modern";
    significance: string;
    relatedTexts?: string[];
  }

  // Sample timeline events
  const events: TimelineEvent[] = [
    {
      id: "event-1",
      year: "~3200 BCE",
      title: "The Kurukshetra War",
      description: "The great battle of Mahabharata between the Pandavas and the Kauravas, during which Lord Krishna imparted the wisdom of the Bhagavad Gita to Arjuna.",
      category: "mythology",
      imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=500&q=80",
      timeperiod: "ancient",
      significance: "The setting for the Bhagavad Gita, one of Hinduism's most important texts on dharma, karma, and devotion.",
      relatedTexts: ["Mahabharata", "Bhagavad Gita"]
    },
    {
      id: "event-2",
      year: "~1500 BCE",
      title: "Composition of the Rig Veda",
      description: "The oldest of the four Vedas, containing hymns, philosophical discussions, and instructions for rituals.",
      category: "scripture",
      imageUrl: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=500&q=80",
      timeperiod: "ancient",
      significance: "The Rig Veda is considered one of the oldest religious texts in existence and forms the foundation of Hindu philosophy.",
      relatedTexts: ["Rig Veda", "Sama Veda", "Yajur Veda", "Atharva Veda"]
    },
    {
      id: "event-3",
      year: "~1000-500 BCE",
      title: "Composition of the Upanishads",
      description: "The philosophical texts that explore the nature of the soul, reality, and the universe.",
      category: "scripture",
      imageUrl: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=500&q=80",
      timeperiod: "ancient",
      significance: "The Upanishads form the philosophical foundation of Hinduism and introduced concepts like Brahman, Atman, karma, and moksha.",
      relatedTexts: ["Brihadaranyaka Upanishad", "Chandogya Upanishad", "Katha Upanishad"]
    },
    {
      id: "event-4",
      year: "~500 BCE",
      title: "Life of Gautama Buddha",
      description: "The birth, enlightenment, and teachings of Siddhartha Gautama, who became the Buddha.",
      category: "historical",
      imageUrl: "https://images.unsplash.com/photo-1532054042869-c409cdfd5d3c?w=500&q=80",
      timeperiod: "ancient",
      significance: "Buddha's teachings formed Buddhism, which shares philosophical roots with Hinduism but developed distinct practices and beliefs."
    },
    {
      id: "event-5",
      year: "4th century CE",
      title: "Composition of the Puranas",
      description: "A vast collection of texts that contain legends, cosmology, philosophy, and rituals.",
      category: "scripture",
      imageUrl: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=500&q=80",
      timeperiod: "classical",
      significance: "The Puranas popularized Hindu mythology and established worship patterns for various deities, especially Vishnu, Shiva, and the Goddess.",
      relatedTexts: ["Vishnu Purana", "Shiva Purana", "Bhagavata Purana"]
    },
    {
      id: "event-6",
      year: "788-820 CE",
      title: "Life of Adi Shankaracharya",
      description: "The renowned philosopher who consolidated the doctrine of Advaita Vedanta and established four mathas (monasteries) across India.",
      category: "historical",
      imageUrl: "https://images.unsplash.com/photo-1493514789931-586cb221d7a7?w=500&q=80",
      timeperiod: "medieval",
      significance: "Shankaracharya revived Hinduism during a time of Buddhist and Jain dominance, establishing the non-dualistic Advaita philosophy."
    },
    {
      id: "event-7",
      year: "15th century CE",
      title: "Bhakti Movement",
      description: "A devotional movement that emphasized personal relationships with deities, led by saints like Kabir, Mirabai, Tulsidas, and Chaitanya Mahaprabhu.",
      category: "historical",
      imageUrl: "https://images.unsplash.com/photo-1526715666198-a88885054e2a?w=500&q=80",
      timeperiod: "medieval",
      significance: "The Bhakti movement made Hinduism more accessible to ordinary people and emphasized devotion over rituals and caste distinctions."
    },
    {
      id: "event-8",
      year: "1893",
      title: "Swami Vivekananda's Chicago Address",
      description: "Swami Vivekananda's famous speech at the World's Parliament of Religions in Chicago, introducing Hindu philosophy to the Western world.",
      category: "historical",
      imageUrl: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=500&q=80",
      timeperiod: "modern",
      significance: "This event marked the beginning of significant Western interest in Hindu philosophy and practices like Vedanta and yoga."
    }
  ];

  // Filter events based on search query and active timeperiod
  const filteredEvents = events.filter(event => {
    const matchesQuery = event.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        event.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTimeperiod = activeTimeperiod === "all" || event.timeperiod === activeTimeperiod;
    return matchesQuery && matchesTimeperiod;
  });

  // Group events by timeperiod for the timeline
  const groupedEvents = {
    ancient: filteredEvents.filter(event => event.timeperiod === "ancient"),
    classical: filteredEvents.filter(event => event.timeperiod === "classical"),
    medieval: filteredEvents.filter(event => event.timeperiod === "medieval"),
    modern: filteredEvents.filter(event => event.timeperiod === "modern"),
  };

  // Get category icon
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "mythology":
        return <Star className="h-5 w-5 text-purple-500" />;
      case "historical":
        return <Clock className="h-5 w-5 text-blue-500" />;
      case "scripture":
        return <BookOpen className="h-5 w-5 text-gold-500" />;
      default:
        return <Info className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gold-50 to-white dark:from-deepBlue-600/20 dark:to-deepBlue-600/5">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 animate-fade-in">
            <h1 className="text-3xl md:text-4xl font-bold text-deepBlue-600 dark:text-white mb-4">
              Sacred Timeline
            </h1>
            <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-300">
              Explore the rich tapestry of Hindu mythology, history, and scripture across the ages.
              Discover the events that shaped spiritual consciousness.
            </p>
          </div>
          
          {/* Search and filters */}
          <div className="max-w-3xl mx-auto mb-10 animate-fade-in">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search events, figures, or concepts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-white dark:bg-deepBlue-700/50"
                />
              </div>
              <Tabs defaultValue="all" value={activeTimeperiod} onValueChange={setActiveTimeperiod}>
                <TabsList>
                  <TabsTrigger value="all">All Eras</TabsTrigger>
                  <TabsTrigger value="ancient">Ancient</TabsTrigger>
                  <TabsTrigger value="classical">Classical</TabsTrigger>
                  <TabsTrigger value="medieval">Medieval</TabsTrigger>
                  <TabsTrigger value="modern">Modern</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>
          
          {/* Timeline */}
          <div className="max-w-5xl mx-auto mb-10 animate-fade-in">
            {selectedEvent ? (
              // Event detail view
              <div className="bg-white dark:bg-deepBlue-700/50 rounded-lg shadow-lg overflow-hidden animate-scale-in">
                <div className="relative h-64 sm:h-80">
                  <img src={selectedEvent.imageUrl} alt={selectedEvent.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => setSelectedEvent(null)}
                    className="absolute top-4 left-4 text-white hover:bg-white/20"
                  >
                    ← Back to Timeline
                  </Button>
                  <div className="absolute bottom-0 left-0 p-6">
                    <div className="flex items-center mb-2">
                      <div className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs font-medium">
                        {selectedEvent.year}
                      </div>
                      <div className="ml-2 px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs font-medium flex items-center">
                        {getCategoryIcon(selectedEvent.category)}
                        <span className="ml-1 capitalize">{selectedEvent.category}</span>
                      </div>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-white">{selectedEvent.title}</h2>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-lg font-medium text-deepBlue-600 dark:text-gold-300 mb-2">Description</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">{selectedEvent.description}</p>
                  
                  <h3 className="text-lg font-medium text-deepBlue-600 dark:text-gold-300 mb-2">Historical & Spiritual Significance</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">{selectedEvent.significance}</p>
                  
                  {selectedEvent.relatedTexts && (
                    <>
                      <h3 className="text-lg font-medium text-deepBlue-600 dark:text-gold-300 mb-2">Related Texts</h3>
                      <div className="flex flex-wrap gap-2 mb-6">
                        {selectedEvent.relatedTexts.map(text => (
                          <div key={text} className="px-3 py-1 bg-gold-100 dark:bg-gold-900/30 text-gold-700 dark:text-gold-300 rounded-full text-sm">
                            {text}
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                  
                  <Button 
                    onClick={() => setSelectedEvent(null)}
                    variant="outline" 
                    className="w-full mt-4"
                  >
                    Return to Timeline
                  </Button>
                </div>
              </div>
            ) : (
              // Timeline view
              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-0 sm:left-1/2 transform sm:-translate-x-1/2 h-full w-0.5 bg-gold-300 dark:bg-gold-700/50"></div>
                
                {/* Timeline sections */}
                {Object.entries(groupedEvents).map(([period, periodEvents]) => {
                  if (periodEvents.length === 0) return null;
                  
                  return (
                    <div key={period} className="mb-10">
                      <div className="relative flex items-center justify-center mb-8">
                        <div className="absolute w-full h-0.5 bg-gold-300 dark:bg-gold-700/50"></div>
                        <h2 className="relative px-4 py-1 bg-gold-500 text-white rounded-full text-lg font-medium capitalize z-10">
                          {period} Era
                        </h2>
                      </div>
                      
                      <div className="space-y-12">
                        {periodEvents.map((event, index) => (
                          <div 
                            key={event.id} 
                            className={`relative flex flex-col sm:flex-row ${index % 2 === 0 ? 'sm:flex-row-reverse' : ''}`}
                          >
                            {/* Timeline dot */}
                            <div className="absolute left-0 sm:left-1/2 transform sm:-translate-x-1/2 w-5 h-5 rounded-full bg-gold-500 border-4 border-white dark:border-deepBlue-800 z-10"></div>
                            
                            {/* Content */}
                            <div className={`sm:w-1/2 ${index % 2 === 0 ? 'sm:pl-10' : 'sm:pr-10'} pl-10 sm:pl-0`}>
                              <div 
                                className="bg-white dark:bg-deepBlue-700/50 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
                                onClick={() => setSelectedEvent(event)}
                              >
                                <div className="flex items-center justify-between mb-2">
                                  <div className="flex items-center">
                                    {getCategoryIcon(event.category)}
                                    <span className="ml-1 text-sm text-gray-500 dark:text-gray-400 capitalize">{event.category}</span>
                                  </div>
                                  <div className="text-sm font-medium text-gold-500">{event.year}</div>
                                </div>
                                <h3 className="text-lg font-semibold text-deepBlue-600 dark:text-gold-300 mb-2">{event.title}</h3>
                                <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2">{event.description}</p>
                                <Button 
                                  variant="link" 
                                  className="text-gold-500 hover:text-gold-600 p-0 h-auto mt-2"
                                >
                                  Read more
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
                
                {/* Empty state */}
                {Object.values(groupedEvents).every(events => events.length === 0) && (
                  <div className="bg-white dark:bg-deepBlue-700/50 p-8 rounded-lg shadow-md text-center">
                    <Calendar className="h-12 w-12 mx-auto text-gray-400 dark:text-gray-500 mb-4" />
                    <h3 className="text-lg font-medium text-deepBlue-600 dark:text-gold-300 mb-2">No events found</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Try adjusting your search query or filters to see more results.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default SacredTimeline;
