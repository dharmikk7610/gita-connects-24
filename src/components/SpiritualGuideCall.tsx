
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Phone, Video, Star, X, UserCheck, Clock, Calendar } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface SpiritualGuide {
  id: string;
  name: string;
  expertise: string[];
  rating: number;
  experience: number;
  imageUrl: string;
  availability: "available" | "busy" | "offline";
  nextAvailable?: string;
}

interface SpiritualGuideCallProps {
  isOpen: boolean;
  onClose: () => void;
  onStartCall: (guideId: string, callType: "audio" | "video") => void;
}

const SpiritualGuideCall = ({ isOpen, onClose, onStartCall }: SpiritualGuideCallProps) => {
  const [selectedTab, setSelectedTab] = useState<"audio" | "video">("audio");
  const [selectedGuideId, setSelectedGuideId] = useState<string | null>(null);
  
  // Mock data for spiritual guides
  const guides: SpiritualGuide[] = [
    {
      id: "guide-1",
      name: "Swami Ananda",
      expertise: ["Bhagavad Gita", "Meditation", "Yoga Philosophy"],
      rating: 4.9,
      experience: 15,
      imageUrl: "https://images.unsplash.com/photo-1609710228159-0fa9bd7c0827?w=500&q=80",
      availability: "available"
    },
    {
      id: "guide-2",
      name: "Acharya Priya",
      expertise: ["Vedic Knowledge", "Spiritual Counseling", "Karma Yoga"],
      rating: 4.7,
      experience: 8,
      imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&q=80",
      availability: "busy",
      nextAvailable: "15 minutes"
    },
    {
      id: "guide-3",
      name: "Guru Dev",
      expertise: ["Bhakti Traditions", "Sanskrit Scriptures", "Dharmic Living"],
      rating: 4.8,
      experience: 20,
      imageUrl: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=500&q=80",
      availability: "offline",
      nextAvailable: "Tomorrow, 10:00 AM"
    }
  ];

  const handleStartCall = () => {
    if (selectedGuideId) {
      onStartCall(selectedGuideId, selectedTab);
    }
  };

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case "available":
        return "text-green-500";
      case "busy":
        return "text-yellow-500";
      case "offline":
        return "text-gray-500";
      default:
        return "text-gray-500";
    }
  };

  const getAvailabilityIcon = (availability: string) => {
    switch (availability) {
      case "available":
        return <UserCheck className="h-4 w-4 text-green-500" />;
      case "busy":
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case "offline":
        return <Calendar className="h-4 w-4 text-gray-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] bg-white dark:bg-deepBlue-600/95 border border-gold-200 dark:border-gold-800/30 divine-card">
        <DialogHeader>
          <DialogTitle className="text-center text-xl text-deepBlue-600 dark:text-gold-300">
            Connect with a Spiritual Guide
          </DialogTitle>
          <DialogDescription className="text-center text-gray-600 dark:text-gray-300">
            Choose your preferred call type and select a guide for personalized spiritual guidance.
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="audio" value={selectedTab} onValueChange={(value) => setSelectedTab(value as "audio" | "video")} className="mt-4">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="audio" className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              <span>Voice Call</span>
            </TabsTrigger>
            <TabsTrigger value="video" className="flex items-center gap-2">
              <Video className="h-4 w-4" />
              <span>Video Call</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="audio" className="space-y-4">
            <div className="text-sm text-gray-600 dark:text-gray-300 mb-4">
              Connect through voice for a personal consultation on your spiritual journey.
            </div>
            <div className="space-y-4">
              {guides.map((guide) => (
                <div 
                  key={guide.id}
                  onClick={() => guide.availability === "available" && setSelectedGuideId(guide.id)}
                  className={`p-4 border rounded-lg flex items-center space-x-4 transition-all duration-200 ${
                    selectedGuideId === guide.id 
                      ? "border-gold-500 bg-gold-50 dark:bg-gold-900/10" 
                      : "border-gray-200 dark:border-gray-700 hover:border-gold-300 dark:hover:border-gold-700/50"
                  } ${
                    guide.availability !== "available" ? "opacity-60 cursor-not-allowed" : "cursor-pointer"
                  }`}
                >
                  <div className="relative">
                    <img 
                      src={guide.imageUrl} 
                      alt={guide.name} 
                      className="w-14 h-14 rounded-full object-cover"
                    />
                    <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
                      guide.availability === "available" ? "bg-green-500" :
                      guide.availability === "busy" ? "bg-yellow-500" : "bg-gray-500"
                    }`}></div>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-deepBlue-600 dark:text-gold-300">{guide.name}</h4>
                    <div className="flex items-center mt-1">
                      <Star className="h-3 w-3 text-gold-500 mr-1" fill="#D4AF37" />
                      <span className="text-xs text-gray-600 dark:text-gray-300">{guide.rating} • {guide.experience} years exp.</span>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {guide.expertise.slice(0, 2).map((exp, idx) => (
                        <span key={idx} className="text-xs bg-gray-100 dark:bg-deepBlue-700 px-1.5 py-0.5 rounded text-gray-600 dark:text-gray-300">
                          {exp}
                        </span>
                      ))}
                      {guide.expertise.length > 2 && (
                        <span className="text-xs bg-gray-100 dark:bg-deepBlue-700 px-1.5 py-0.5 rounded text-gray-600 dark:text-gray-300">
                          +{guide.expertise.length - 2}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="flex items-center text-xs">
                      {getAvailabilityIcon(guide.availability)}
                      <span className={`ml-1 ${getAvailabilityColor(guide.availability)}`}>
                        {guide.availability === "available" ? "Available" : 
                         guide.availability === "busy" ? `In ${guide.nextAvailable}` : 
                         guide.nextAvailable}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="video" className="space-y-4">
            <div className="text-sm text-gray-600 dark:text-gray-300 mb-4">
              Face-to-face video consultation for deeper spiritual discussions.
            </div>
            <div className="space-y-4">
              {guides.map((guide) => (
                <div 
                  key={guide.id}
                  onClick={() => guide.availability === "available" && setSelectedGuideId(guide.id)}
                  className={`p-4 border rounded-lg flex items-center space-x-4 transition-all duration-200 ${
                    selectedGuideId === guide.id 
                      ? "border-gold-500 bg-gold-50 dark:bg-gold-900/10" 
                      : "border-gray-200 dark:border-gray-700 hover:border-gold-300 dark:hover:border-gold-700/50"
                  } ${
                    guide.availability !== "available" ? "opacity-60 cursor-not-allowed" : "cursor-pointer"
                  }`}
                >
                  <div className="relative">
                    <img 
                      src={guide.imageUrl} 
                      alt={guide.name} 
                      className="w-14 h-14 rounded-full object-cover"
                    />
                    <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
                      guide.availability === "available" ? "bg-green-500" :
                      guide.availability === "busy" ? "bg-yellow-500" : "bg-gray-500"
                    }`}></div>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-deepBlue-600 dark:text-gold-300">{guide.name}</h4>
                    <div className="flex items-center mt-1">
                      <Star className="h-3 w-3 text-gold-500 mr-1" fill="#D4AF37" />
                      <span className="text-xs text-gray-600 dark:text-gray-300">{guide.rating} • {guide.experience} years exp.</span>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {guide.expertise.slice(0, 2).map((exp, idx) => (
                        <span key={idx} className="text-xs bg-gray-100 dark:bg-deepBlue-700 px-1.5 py-0.5 rounded text-gray-600 dark:text-gray-300">
                          {exp}
                        </span>
                      ))}
                      {guide.expertise.length > 2 && (
                        <span className="text-xs bg-gray-100 dark:bg-deepBlue-700 px-1.5 py-0.5 rounded text-gray-600 dark:text-gray-300">
                          +{guide.expertise.length - 2}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="flex items-center text-xs">
                      {getAvailabilityIcon(guide.availability)}
                      <span className={`ml-1 ${getAvailabilityColor(guide.availability)}`}>
                        {guide.availability === "available" ? "Available" : 
                         guide.availability === "busy" ? `In ${guide.nextAvailable}` : 
                         guide.nextAvailable}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter className="flex flex-col sm:flex-row justify-between gap-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            onClick={handleStartCall} 
            disabled={!selectedGuideId}
            className="bg-gold-500 hover:bg-gold-600 text-white"
          >
            {selectedTab === "audio" ? (
              <Phone className="h-4 w-4 mr-2" />
            ) : (
              <Video className="h-4 w-4 mr-2" />
            )}
            Start {selectedTab === "audio" ? "Voice" : "Video"} Call
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SpiritualGuideCall;
