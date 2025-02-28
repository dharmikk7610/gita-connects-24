
import { useState, useEffect } from "react";
import { PlayCircle, PauseCircle, Volume2, VolumeX, X, Heart, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { MeditationJourney as MeditationJourneyType } from "@/services/meditationService";

interface MeditationJourneyProps {
  journey: MeditationJourneyType;
  onClose: () => void;
}

const MeditationJourney = ({ journey, onClose }: MeditationJourneyProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [countdownSeconds, setCountdownSeconds] = useState(3);

  // Start countdown when journey is first shown
  useEffect(() => {
    const countdownInterval = setInterval(() => {
      setCountdownSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(countdownInterval);
          setIsPlaying(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(countdownInterval);
  }, []);

  // Handle meditation timer
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;

    if (isPlaying && currentTime < journey.duration * 60) {
      timer = setInterval(() => {
        setCurrentTime((prevTime) => {
          const newTime = prevTime + 1;
          if (newTime >= journey.duration * 60) {
            if (timer) clearInterval(timer);
            setIsPlaying(false);
          }
          return newTime;
        });
      }, 1000);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isPlaying, currentTime, journey.duration]);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const progressPercentage = (currentTime / (journey.duration * 60)) * 100;

  return (
    <div className="relative h-full w-full animate-fade-in">
      {countdownSeconds > 0 ? (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 text-white">
          <div className="text-center">
            <div className="text-7xl font-bold mb-6">{countdownSeconds}</div>
            <p className="text-lg">Prepare for your journey...</p>
          </div>
        </div>
      ) : null}

      <div className="relative w-full h-[500px] overflow-hidden rounded-2xl">
        {/* Background Image */}
        <div className="absolute inset-0">
          <div className={`absolute inset-0 bg-gradient-to-br ${journey.bgColor} opacity-80`}></div>
          <img 
            src={journey.imageUrl} 
            alt={journey.title}
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        </div>

        {/* Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-white">
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute top-4 right-4 text-white hover:bg-white/20"
            onClick={onClose}
          >
            <X className="h-6 w-6" />
          </Button>

          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center text-shadow-md">
            {journey.title}
          </h1>
          
          <p className="max-w-md text-center mb-12 text-white/90 text-shadow-sm">
            {journey.description}
          </p>
          
          <div className="flex items-center justify-center mb-8">
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-16 w-16 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md mr-6"
              onClick={toggleMute}
            >
              {isMuted ? <VolumeX className="h-8 w-8" /> : <Volume2 className="h-8 w-8" />}
            </Button>
            
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-24 w-24 rounded-full bg-white/30 hover:bg-white/40 backdrop-blur-md"
              onClick={togglePlayPause}
            >
              {isPlaying 
                ? <PauseCircle className="h-14 w-14" />
                : <PlayCircle className="h-14 w-14" />
              }
            </Button>
            
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-16 w-16 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md ml-6"
            >
              <Bell className="h-8 w-8" />
            </Button>
          </div>
          
          <div className="w-full max-w-md mb-8">
            <div className="flex justify-between text-sm mb-2">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(journey.duration * 60)}</span>
            </div>
            <Progress value={progressPercentage} className="h-2 bg-white/30" />
          </div>
          
          <Button variant="outline" className="border-white/30 bg-white/10 hover:bg-white/20 text-white">
            <Heart className="h-4 w-4 mr-2" /> Save to Favorites
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MeditationJourney;
