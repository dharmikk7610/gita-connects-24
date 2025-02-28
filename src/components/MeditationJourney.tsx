
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { 
  ArrowLeft, Play, Pause, Volume2, VolumeX, Heart, Moon, 
  Sparkle, RefreshCw, Settings, Bookmark, Share2, Download
} from "lucide-react";
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
  const [volume, setVolume] = useState(75);
  const [isMuted, setIsMuted] = useState(false);
  const [mood, setMood] = useState<"peaceful" | "anxious" | "curious" | "grateful">("peaceful");
  const [stars, setStars] = useState<{id: number; x: number; y: number, size: number, opacity: number}[]>([]);
  const [breathCount, setBreathCount] = useState(0);
  const [isBreathMode, setIsBreathMode] = useState(false);
  const [breathPhase, setBreathPhase] = useState<"inhale" | "hold" | "exhale" | "rest">("rest");
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [backgroundSound, setBackgroundSound] = useState<"nature" | "ambient" | "rain" | "none">("ambient");
  const [mantraText, setMantraText] = useState("Om Shanti Om");
  const [showMantra, setShowMantra] = useState(false);
  const [autoProgress, setAutoProgress] = useState(true);
  const animationFrameId = useRef<number | null>(null);
  const { toast } = useToast();
  
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
    
    if (isPlaying && autoProgress) {
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
  }, [isPlaying, journey.duration, autoProgress]);
  
  // Handle breathing animation
  useEffect(() => {
    let animationTimer: NodeJS.Timeout;
    
    if (isBreathMode && isPlaying) {
      const breathCycle = () => {
        // Inhale for 4 seconds
        setBreathPhase("inhale");
        animationTimer = setTimeout(() => {
          // Hold for 4 seconds
          setBreathPhase("hold");
          animationTimer = setTimeout(() => {
            // Exhale for 6 seconds
            setBreathPhase("exhale");
            animationTimer = setTimeout(() => {
              // Rest for 2 seconds
              setBreathPhase("rest");
              animationTimer = setTimeout(() => {
                // Increment breath count
                setBreathCount(prev => prev + 1);
                // Repeat cycle
                breathCycle();
              }, 2000);
            }, 6000);
          }, 4000);
        }, 4000);
      };
      
      breathCycle();
    }
    
    return () => {
      if (animationTimer) clearTimeout(animationTimer);
    };
  }, [isBreathMode, isPlaying]);
  
  // Animation loop for the visualization
  useEffect(() => {
    const animate = () => {
      // Animation logic here - could be particle movement, color transitions, etc.
      animationFrameId.current = requestAnimationFrame(animate);
    };
    
    if (isPlaying) {
      animationFrameId.current = requestAnimationFrame(animate);
    }
    
    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [isPlaying]);
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    
    if (!isPlaying) {
      toast({
        title: "Meditation Started",
        description: `Beginning your ${journey.title} journey. Find a comfortable position.`,
      });
    }
  };
  
  const handleMoodChange = (newMood: "peaceful" | "anxious" | "curious" | "grateful") => {
    setMood(newMood);
    toast({
      title: "Meditation Focus Changed",
      description: `Your meditation is now focused on ${newMood} energy.`,
    });
  };
  
  const toggleBreathingMode = () => {
    setIsBreathMode(!isBreathMode);
    setBreathCount(0);
    setBreathPhase("rest");
    
    toast({
      title: isBreathMode ? "Breathing Guide Disabled" : "Breathing Guide Enabled",
      description: isBreathMode 
        ? "Continue your meditation at your natural rhythm." 
        : "Follow the visual cues for guided breathing.",
    });
  };
  
  const toggleMantra = () => {
    setShowMantra(!showMantra);
  };
  
  const handleVolumeChange = (newVolume: number[]) => {
    setVolume(newVolume[0]);
    if (newVolume[0] === 0) {
      setIsMuted(true);
    } else if (isMuted) {
      setIsMuted(false);
    }
  };
  
  const toggleMute = () => {
    setIsMuted(!isMuted);
  };
  
  const handleSaveProgress = () => {
    toast({
      title: "Progress Saved",
      description: `Your meditation progress has been saved. You can continue later.`,
    });
  };
  
  const handleShareMeditation = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      toast({
        title: "Link Copied",
        description: "Share this link with others to invite them to this meditation journey.",
      });
    });
  };
  
  const getBreathingInstructions = () => {
    switch (breathPhase) {
      case "inhale":
        return "Breathe in slowly...";
      case "hold":
        return "Hold your breath...";
      case "exhale":
        return "Exhale gently...";
      case "rest":
        return "Relax...";
    }
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
  
  const getBackgroundSoundName = () => {
    switch (backgroundSound) {
      case "nature":
        return "Forest Sounds";
      case "ambient":
        return "Ambient Music";
      case "rain":
        return "Gentle Rain";
      case "none":
        return "No Background";
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
          
          <Drawer open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
            <DrawerTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-white hover:bg-white/10"
              >
                <Settings className="h-5 w-5" />
              </Button>
            </DrawerTrigger>
            <DrawerContent>
              <div className="mx-auto w-full max-w-lg">
                <DrawerHeader>
                  <DrawerTitle>Meditation Settings</DrawerTitle>
                  <DrawerDescription>Customize your meditation experience</DrawerDescription>
                </DrawerHeader>
                <div className="p-4 space-y-6">
                  {/* Background Sound Selection */}
                  <div>
                    <h3 className="text-sm font-medium mb-2">Background Sound</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {["nature", "ambient", "rain", "none"].map(sound => (
                        <Button 
                          key={sound}
                          variant={backgroundSound === sound ? "default" : "outline"}
                          onClick={() => setBackgroundSound(sound as any)}
                          className="w-full justify-start"
                        >
                          {sound === "nature" && <Sparkle className="h-4 w-4 mr-2" />}
                          {sound === "ambient" && <Moon className="h-4 w-4 mr-2" />}
                          {sound === "rain" && <Download className="h-4 w-4 mr-2" />}
                          {sound === "none" && <VolumeX className="h-4 w-4 mr-2" />}
                          {sound.charAt(0).toUpperCase() + sound.slice(1)}
                        </Button>
                      ))}
                    </div>
                  </div>
                  
                  {/* Mantra settings */}
                  <div>
                    <h3 className="text-sm font-medium mb-2">Personal Mantra</h3>
                    <input 
                      type="text" 
                      value={mantraText}
                      onChange={(e) => setMantraText(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md mb-2"
                      placeholder="Enter your mantra..."
                    />
                    <div className="flex items-center">
                      <input 
                        type="checkbox" 
                        id="show-mantra" 
                        checked={showMantra}
                        onChange={() => setShowMantra(!showMantra)}
                        className="mr-2"
                      />
                      <label htmlFor="show-mantra" className="text-sm">Display mantra during meditation</label>
                    </div>
                  </div>
                  
                  {/* Auto-progress setting */}
                  <div>
                    <h3 className="text-sm font-medium mb-2">Timer Settings</h3>
                    <div className="flex items-center">
                      <input 
                        type="checkbox" 
                        id="auto-progress" 
                        checked={autoProgress}
                        onChange={() => setAutoProgress(!autoProgress)}
                        className="mr-2"
                      />
                      <label htmlFor="auto-progress" className="text-sm">Auto-progress through meditation</label>
                    </div>
                  </div>
                </div>
                <DrawerFooter>
                  <Button onClick={() => setIsSettingsOpen(false)}>Apply Settings</Button>
                  <DrawerClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DrawerClose>
                </DrawerFooter>
              </div>
            </DrawerContent>
          </Drawer>
        </div>
        
        {/* Breathing guide */}
        {isBreathMode && isPlaying && (
          <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white z-20">
            <div className="mb-2">
              <p className="text-xl font-medium">{getBreathingInstructions()}</p>
              <p className="text-sm text-white/70">Breath count: {breathCount}</p>
            </div>
            <div className="relative w-20 h-20 mx-auto">
              <div 
                className={`absolute inset-0 rounded-full bg-teal-500/30 ${
                  breathPhase === "inhale" ? "animate-scale-in" : 
                  breathPhase === "exhale" ? "animate-scale-out" : ""
                }`}
                style={{
                  transform: breathPhase === "inhale" 
                    ? "scale(1)" 
                    : breathPhase === "exhale" 
                    ? "scale(0.5)" 
                    : breathPhase === "hold" 
                    ? "scale(1)" 
                    : "scale(0.5)"
                }}
              ></div>
            </div>
          </div>
        )}
        
        {/* Mantra display */}
        {showMantra && (
          <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
            <p className="text-2xl font-medium text-white/90 animate-pulse" style={{animationDuration: '3s'}}>
              {mantraText}
            </p>
          </div>
        )}
        
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
                <Sparkle className="h-20 w-20 text-white text-opacity-80" />
              )}
            </div>
          </div>
        </div>
        
        {/* Guided meditation text */}
        <div className="mt-8 mb-6 bg-white/10 backdrop-blur-sm p-4 rounded-lg">
          <p className="text-white text-center text-lg leading-relaxed">
            {getMoodGuidance()}
          </p>
        </div>
        
        {/* Action buttons */}
        <div className="flex justify-center space-x-3 mb-6">
          <Button 
            variant="ghost"
            size="sm"
            onClick={toggleBreathingMode}
            className={`text-white hover:bg-white/10 ${isBreathMode ? 'bg-white/20' : ''}`}
          >
            <RefreshCw className="h-4 w-4 mr-1" />
            Breathing Guide
          </Button>
          
          <Button 
            variant="ghost"
            size="sm"
            onClick={toggleMantra}
            className={`text-white hover:bg-white/10 ${showMantra ? 'bg-white/20' : ''}`}
          >
            <Sparkle className="h-4 w-4 mr-1" />
            Show Mantra
          </Button>
          
          <Button 
            variant="ghost"
            size="sm"
            onClick={handleSaveProgress}
            className="text-white hover:bg-white/10"
          >
            <Bookmark className="h-4 w-4 mr-1" />
            Save
          </Button>
          
          <Button 
            variant="ghost"
            size="sm"
            onClick={handleShareMeditation}
            className="text-white hover:bg-white/10"
          >
            <Share2 className="h-4 w-4 mr-1" />
            Share
          </Button>
        </div>
        
        {/* Mood selector */}
        <div className="mb-6">
          <h3 className="text-white text-sm mb-2">Meditation Focus:</h3>
          <div className="flex justify-center space-x-2 flex-wrap">
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
              <Sparkle className="h-4 w-4 mr-1" />
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
        
        {/* Background sound indicator */}
        <div className="text-center mb-4">
          <span className="inline-flex items-center px-2 py-1 bg-white/10 rounded-full text-xs text-white">
            <Volume2 className="h-3 w-3 mr-1" />
            {getBackgroundSoundName()}
          </span>
        </div>
        
        {/* Controls */}
        <div className="flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <span className="text-white text-sm">{formatTime(currentTime)}</span>
            <span className="text-white text-sm">{formatTime(journey.duration * 60)}</span>
          </div>
          
          <Progress value={progress} className="h-1 bg-white/20" />
          
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center space-x-2">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={toggleMute}
                className="text-white hover:bg-white/10"
              >
                {isMuted ? (
                  <VolumeX className="h-5 w-5" />
                ) : (
                  <Volume2 className="h-5 w-5" />
                )}
              </Button>
              
              <div className="w-24">
                <Slider
                  value={[isMuted ? 0 : volume]}
                  min={0}
                  max={100}
                  step={1}
                  onValueChange={handleVolumeChange}
                  className="h-1"
                />
              </div>
            </div>
            
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
            
            <div className="w-32"></div> {/* For balance */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeditationJourney;
