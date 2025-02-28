
import { useState, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Phone, Video, Mic, MicOff, Monitor, X, Info } from "lucide-react";

interface ActiveCallProps {
  isOpen: boolean;
  onClose: () => void;
  guide: {
    id: string;
    name: string;
    imageUrl: string;
  };
  callType: "audio" | "video";
}

const ActiveCall = ({ isOpen, onClose, guide, callType }: ActiveCallProps) => {
  const [isMuted, setIsMuted] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [isCallConnected, setIsCallConnected] = useState(false);
  
  useEffect(() => {
    // Simulate call connecting after 2 seconds
    if (isOpen) {
      const connectTimer = setTimeout(() => {
        setIsCallConnected(true);
      }, 2000);
      
      return () => clearTimeout(connectTimer);
    }
  }, [isOpen]);
  
  // Call duration timer
  useEffect(() => {
    let timer: number;
    
    if (isOpen && isCallConnected) {
      timer = window.setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
    }
    
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isOpen, isCallConnected]);
  
  const formatCallTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  const toggleMute = () => {
    setIsMuted(!isMuted);
  };
  
  const handleEndCall = () => {
    setCallDuration(0);
    setIsCallConnected(false);
    setIsMuted(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden bg-transparent border-none max-h-[80vh] h-[500px]">
        <div className="h-full flex flex-col bg-deepBlue-600 overflow-hidden rounded-lg relative">
          {/* Call header */}
          <div className="absolute top-0 left-0 right-0 z-10 p-4 bg-gradient-to-b from-black/70 to-transparent">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <div className={`h-3 w-3 rounded-full mr-2 ${isCallConnected ? 'bg-green-500 animate-pulse' : 'bg-yellow-500'}`}></div>
                <span className="text-white text-sm font-medium">
                  {isCallConnected ? 'Connected' : 'Connecting...'}
                </span>
              </div>
              <div className="text-white text-sm">
                {isCallConnected && formatCallTime(callDuration)}
              </div>
            </div>
          </div>
          
          {/* Video/Audio area with Hindu theme */}
          <div className="flex-1 flex items-center justify-center relative bg-deepBlue-800 overflow-hidden">
            {/* Background pattern/decoration - Lotus pattern */}
            <div className="absolute inset-0 opacity-20 z-0">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1600431521340-491eca880813?w=500&q=80')] bg-center bg-cover"></div>
            </div>
            
            {/* Golden glow effect behind the video */}
            <div className={`${callType === 'video' ? 'absolute' : 'hidden'} w-64 h-64 rounded-full bg-gold-500/30 filter blur-3xl opacity-50 animate-glow z-0`}></div>
            
            {/* Video display or Audio avatar */}
            {callType === 'video' ? (
              <div className="relative z-10 rounded-lg overflow-hidden shadow-2xl border-4 border-gold-300/30 animate-glow">
                <img 
                  src={guide.imageUrl}
                  alt={guide.name}
                  className="w-72 h-72 sm:w-80 sm:h-80 object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black to-transparent">
                  <div className="text-white text-center font-medium">{guide.name}</div>
                </div>
              </div>
            ) : (
              <div className="relative z-10 flex flex-col items-center">
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gold-300/30 shadow-lg animate-glow mb-4">
                  <img
                    src={guide.imageUrl}
                    alt={guide.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-white text-xl font-medium mb-2">{guide.name}</h3>
                <div className="flex items-center text-gold-300">
                  <div className={`h-2 w-2 rounded-full mr-2 ${isMuted ? 'bg-red-500' : 'bg-green-500 animate-pulse'}`}></div>
                  <span className="text-sm">{isMuted ? 'Audio muted' : 'Audio active'}</span>
                </div>
              </div>
            )}
          </div>
          
          {/* Call controls */}
          <div className="p-4 bg-deepBlue-700 flex justify-around items-center">
            <Button
              variant="outline"
              size="icon"
              onClick={toggleMute}
              className={`rounded-full h-12 w-12 ${
                isMuted 
                  ? 'bg-red-500/20 border-red-500 text-white hover:bg-red-500/30' 
                  : 'bg-gray-600/20 border-gray-500 text-white hover:bg-gray-600/30'
              }`}
            >
              {isMuted ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
            </Button>
            
            <Button
              variant="outline"
              size="icon"
              onClick={handleEndCall}
              className="rounded-full h-14 w-14 bg-red-500 border-red-600 text-white hover:bg-red-600"
            >
              {callType === 'audio' ? 
                <Phone className="h-6 w-6 rotate-135" /> : 
                <Video className="h-6 w-6" strokeWidth={2.5} />
              }
            </Button>
            
            <Button
              variant="outline"
              size="icon"
              className="rounded-full h-12 w-12 bg-gray-600/20 border-gray-500 text-white hover:bg-gray-600/30"
            >
              <Info className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ActiveCall;
