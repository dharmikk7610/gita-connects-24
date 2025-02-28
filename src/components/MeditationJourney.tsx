
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Play, Pause, Volume2, VolumeX, Heart, Moon, Sparkles, RefreshCw } from "lucide-react";

interface Journey {
  id: string;
  title: string;
  description: string;
  duration: number;
  level: string;
  imageUrl: string;
  bgColor: string;
}

interface MeditationJourneyProps {
  journey: Journey;
  onClose: () => void;
}

const MeditationJourney = ({ journey, onClose }: MeditationJourneyProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [mood, setMood] = useState<"peaceful" | "anxious" | "curious" | "grateful">("peaceful");
  const [stars, setStars] = useState<{id: number; x: number; y: number, size: number, opacity: number}[]>([]);
  
  // Create star field effect
  useEffect(() => {
    const newStars = Array.from({ length: 100 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      opacity: Math.random() * 0.8 + 0.2
    }));
    setStars(newStars);
  }, []);
  
  // Handle meditation timer
  useEffect(() => {
    let timer: number;
    
    if (isPlaying) {
      timer = window.setInterval(() => {
        setCurrentTime(prev => {
          const newTime = prev + 1;
          const newProgress = (newTime / (journey.duration * 60)) * 100;
          setProgress(newProgress);
          
          if (newTime >= journey.duration * 60) {
            setIsPlaying(false);
            return journey.duration * 60;
          }
          return newTime;
        });
      }, 1000);
    }
    
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isPlaying, journey.duration]);
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };
  
  const handleMoodChange = (newMood: "peaceful" | "anxious" | "curious" | "grateful") => {
    setMood(newMood);
  };
  
  const getMoodGuidance = () => {
    switch (mood) {
      case "peaceful":
        return "Focus on your breath flowing like a gentle river. Let each inhale bring pure light, each exhale release tension.";
      case "anxious":
        return "Notice any anxious thoughts without judgment. Picture them as leaves on a stream, floating away as you breathe deeply.";
      case "curious":
        return "Open your mind to the mysteries of consciousness. Ask yourself: 'Who am I beyond my thoughts?' and let insights arise naturally.";
      case "grateful":
        return "Bring to mind three blessings in your life. Feel gratitude filling your heart with golden light, expanding with each breath.";
    }
  };

  return (
    <div className="max-w-5xl mx-auto bg-black rounded-xl overflow-hidden shadow-2xl relative animate-scale-in">
      {/* Star field background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-deepBlue-900">
          {stars.map(star => (
            <div 
              key={star.id}
              className="absolute rounded-full bg-white animate-pulse"
              style={{
                left: `${star.x}%`,
                top: `${star.y}%`,
                width: `${star.size}px`,
                height: `${star.size}px`,
                opacity: star.opacity,
                animationDuration: `${3 + Math.random() * 4}s`
              }}
            ></div>
          ))}
        </div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 p-6 md:p-10 flex flex-col min-h-[600px]">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onClose}
            className="text-white hover:bg-white/10"
          >
            <ArrowLeft className="h-6 w-6" />
          </Button>
          
          <div className="text-center flex-1">
            <h2 className="text-2xl font-bold text-white">{journey.title}</h2>
            <p className="text-gray-300 text-sm">{journey.duration} minute journey</p>
          </div>
          
          <div className="w-10"></div> {/* For balance */}
        </div>
        
        {/* Main visualization area */}
        <div className="flex-1 flex items-center justify-center">
          <div className="relative w-64 h-64 md:w-80 md:h-80">
            {/* Chakra/energy visualization based on the meditation type */}
            <div className={`absolute inset-0 rounded-full ${
              journey.id.includes('chakra') ? 'bg-gradient-to-r from-purple-500 to-indigo-500' : 
              journey.id.includes('astral') ? 'bg-gradient-to-r from-blue-500 to-purple-600' :
              'bg-gradient-to-r from-gold-400 to-amber-600'
            } opacity-40 animate-pulse`} style={{animationDuration: '3s'}}></div>
            
            {/* Pulsing energy rings */}
            <div className="absolute inset-0 rounded-full border-2 border-white/30 animate-ping" style={{animationDuration: '2s'}}></div>
            <div className="absolute inset-0 rounded-full border border-white/20 animate-ping" style={{animationDuration: '3s', animationDelay: '0.5s'}}></div>
            <div className="absolute inset-0 rounded-full border border-white/10 animate-ping" style={{animationDuration: '4s', animationDelay: '1s'}}></div>
            
            {/* Central symbol/icon */}
            <div className="absolute inset-0 flex items-center justify-center">
              {journey.id.includes('chakra') ? (
                <div className="text-white text-opacity-80 animate-pulse" style={{animationDuration: '4s'}}>
                  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="40" cy="40" r="20" stroke="white" strokeWidth="2" strokeOpacity="0.8" />
                    <circle cx="40" cy="40" r="30" stroke="white" strokeWidth="1" strokeOpacity="0.6" />
                    <circle cx="40" cy="40" r="40" stroke="white" strokeWidth="0.5" strokeOpacity="0.4" />
                  </svg>
                </div>
              ) : journey.id.includes('astral') ? (
                <Moon className="h-20 w-20 text-white text-opacity-80" />
              ) : (
                <Sparkles className="h-20 w-20 text-white text-opacity-80" />
              )}
            </div>
          </div>
        </div>
        
        {/* Guided meditation text */}
        <div className="mt-8 mb-10 bg-white/10 backdrop-blur-sm p-4 rounded-lg">
          <p className="text-white text-center text-lg leading-relaxed">
            {getMoodGuidance()}
          </p>
        </div>
        
        {/* Mood selector */}
        <div className="mb-6">
          <h3 className="text-white text-sm mb-2">Meditation Focus:</h3>
          <div className="flex justify-center space-x-4">
            <Button 
              variant={mood === "peaceful" ? "default" : "ghost"} 
              size="sm"
              onClick={() => handleMoodChange("peaceful")}
              className={`${mood === "peaceful" ? "bg-teal-500 hover:bg-teal-600" : "text-white hover:bg-white/10"}`}
            >
              <Moon className="h-4 w-4 mr-1" />
              Peaceful
            </Button>
            <Button 
              variant={mood === "anxious" ? "default" : "ghost"} 
              size="sm"
              onClick={() => handleMoodChange("anxious")}
              className={`${mood === "anxious" ? "bg-amber-500 hover:bg-amber-600" : "text-white hover:bg-white/10"}`}
            >
              <RefreshCw className="h-4 w-4 mr-1" />
              Release Anxiety
            </Button>
            <Button 
              variant={mood === "curious" ? "default" : "ghost"} 
              size="sm"
              onClick={() => handleMoodChange("curious")}
              className={`${mood === "curious" ? "bg-purple-500 hover:bg-purple-600" : "text-white hover:bg-white/10"}`}
            >
              <Sparkles className="h-4 w-4 mr-1" />
              Curiosity
            </Button>
            <Button 
              variant={mood === "grateful" ? "default" : "ghost"} 
              size="sm"
              onClick={() => handleMoodChange("grateful")}
              className={`${mood === "grateful" ? "bg-gold-500 hover:bg-gold-600" : "text-white hover:bg-white/10"}`}
            >
              <Heart className="h-4 w-4 mr-1" />
              Gratitude
            </Button>
          </div>
        </div>
        
        {/* Controls */}
        <div className="flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <span className="text-white text-sm">{formatTime(currentTime)}</span>
            <span className="text-white text-sm">{formatTime(journey.duration * 60)}</span>
          </div>
          
          <Progress value={progress} className="h-1 bg-white/20" />
          
          <div className="flex items-center justify-between mt-4">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setIsMuted(!isMuted)}
              className="text-white hover:bg-white/10"
            >
              {isMuted ? (
                <VolumeX className="h-5 w-5" />
              ) : (
                <Volume2 className="h-5 w-5" />
              )}
            </Button>
            
            <Button
              variant="outline"
              size="icon"
              onClick={handlePlayPause}
              className="h-14 w-14 rounded-full border-2 border-white hover:bg-white/10 text-white"
            >
              {isPlaying ? (
                <Pause className="h-6 w-6" />
              ) : (
                <Play className="h-6 w-6 ml-1" />
              )}
            </Button>
            
            <div className="w-10"></div> {/* For balance */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeditationJourney;
