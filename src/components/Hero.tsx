
import { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const slides = [
    {
      title: "Explore the Wisdom of Bhagavad Gita",
      description: "Discover timeless teachings and spiritual insights from the sacred text that guides millions.",
      cta: "Start Your Journey",
      path: "/chat",
    },
    {
      title: "Ancient Stories, Timeless Wisdom",
      description: "Immerse yourself in the rich tapestry of Hindu mythology and its profound life lessons.",
      cta: "Read Stories",
      path: "/stories",
    },
    {
      title: "Test Your Spiritual Knowledge",
      description: "Challenge yourself with interactive quizzes on Hindu scriptures, deities, and traditions.",
      cta: "Take a Quiz",
      path: "/quizzes",
    },
  ];

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
        setIsVisible(true);
      }, 500);
    }, 7000);

    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient and pattern */}
      <div className="absolute inset-0 bg-gradient-to-b from-gold-50/70 to-white dark:from-deepBlue-500/40 dark:to-deepBlue-500/90 z-0"></div>
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?q=80&w=600')] bg-cover bg-center opacity-10 dark:opacity-5 z-0"></div>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-16 md:pt-24">
        <div className="max-w-4xl mx-auto text-center">
          <div 
            className={`transition-all duration-500 ease-in-out transform ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8"
            }`}
          >
            <h1 className="text-3xl md:text-5xl font-bold mb-4 text-deepBlue-600 dark:text-white leading-tight">
              {slides[currentSlide].title}
            </h1>
            <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              {slides[currentSlide].description}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button 
                className="px-6 py-5 rounded-md bg-gradient-to-r from-gold-400 to-gold-600 hover:from-gold-500 hover:to-gold-700 text-white text-lg shadow-md hover:shadow-lg transform transition hover:-translate-y-1 font-medium"
                asChild
              >
                <Link to={slides[currentSlide].path} className="flex items-center gap-2">
                  {slides[currentSlide].cta}
                  <ArrowRight size={18} />
                </Link>
              </Button>
              <Button 
                variant="outline"
                className="px-6 py-5 rounded-md border border-gold-300 dark:border-gold-700 text-deepBlue-500 dark:text-gold-300 bg-transparent text-lg shadow-sm hover:shadow hover:border-gold-500 dark:hover:border-gold-500 transform transition hover:-translate-y-1 font-medium"
              >
                Learn More
              </Button>
            </div>
          </div>

          {/* Slide indicators */}
          <div className="flex justify-center space-x-2 mt-12">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setIsVisible(false);
                  setTimeout(() => {
                    setCurrentSlide(index);
                    setIsVisible(true);
                  }, 500);
                }}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide 
                    ? "bg-gold-500 w-8" 
                    : "bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex justify-center">
          <div className="w-5 h-10 border-2 border-gold-300 dark:border-gold-700 rounded-full flex items-start justify-center">
            <div className="w-1 h-2 bg-gold-400 dark:bg-gold-600 rounded-full animate-bounce mt-1"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
