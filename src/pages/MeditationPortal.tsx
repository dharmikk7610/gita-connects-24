
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/context/AuthContext";
import AuthRequired from "@/components/AuthRequired";
import MeditationJourney from "@/components/MeditationJourney";

const MeditationPortal = () => {
  const { isAuthenticated } = useAuth();
  const [selectedJourney, setSelectedJourney] = useState<string | null>(null);
  
  // Sample meditation journeys
  const journeys = [
    {
      id: "chakra-healing",
      title: "Chakra Healing",
      description: "Align and balance your seven chakras through guided visualization and energy work.",
      duration: 20,
      level: "All Levels",
      imageUrl: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=500&q=80",
      bgColor: "from-purple-500 to-indigo-600"
    },
    {
      id: "astral-travel",
      title: "Astral Travel",
      description: "Experience a guided journey beyond the physical realm into the astral plane.",
      duration: 30,
      level: "Intermediate",
      imageUrl: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=500&q=80",
      bgColor: "from-blue-500 to-purple-600"
    },
    {
      id: "gita-reflections",
      title: "Gita Reflections",
      description: "Deep contemplation on key verses from the Bhagavad Gita for spiritual insight.",
      duration: 25,
      level: "All Levels",
      imageUrl: "https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?w=500&q=80", 
      bgColor: "from-gold-400 to-amber-600"
    },
    {
      id: "inner-peace",
      title: "Inner Peace Sanctuary",
      description: "Find refuge in a tranquil mental sanctuary cultivated through focused breathing and visualization.",
      duration: 15,
      level: "Beginner",
      imageUrl: "https://images.unsplash.com/photo-1476611338391-6f395a0dd82e?w=500&q=80",
      bgColor: "from-green-400 to-teal-500"
    },
    {
      id: "cosmic-connection",
      title: "Cosmic Connection",
      description: "Connect with universal consciousness and explore your place in the cosmic web of existence.",
      duration: 35,
      level: "Advanced",
      imageUrl: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=500&q=80",
      bgColor: "from-deepBlue-500 to-indigo-700"
    },
    {
      id: "divine-love",
      title: "Divine Love Meditation",
      description: "Open your heart to universal love and compassion through bhakti-inspired meditation.",
      duration: 20,
      level: "All Levels",
      imageUrl: "https://images.unsplash.com/photo-1518002171953-a080ee817e1f?w=500&q=80",
      bgColor: "from-pink-400 to-rose-600"
    }
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="pt-24 pb-16 bg-gradient-to-b from-deepBlue-600/20 to-deepBlue-600/5 dark:from-deepBlue-800 dark:to-deepBlue-900 min-h-screen">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 animate-fade-in">
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
                {journeys.map(journey => (
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
