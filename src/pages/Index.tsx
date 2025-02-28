
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import StoryCard from "@/components/StoryCard";
import FactCard from "@/components/FactCard";
import QuizCard from "@/components/QuizCard";

const Index = () => {
  // Sample data for featured stories
  const featuredStories = [
    {
      id: "story-1",
      title: "The Kurukshetra War: A Battle of Dharma",
      excerpt: "Explore the profound spiritual significance of the 18-day battle that changed the course of dharma and showcased the divine message of Lord Krishna.",
      category: "Mahabharata",
      imageUrl: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=500&q=80",
    },
    {
      id: "story-2",
      title: "Arjuna's Dilemma and the Divine Counsel",
      excerpt: "Understand how Arjuna's moment of doubt on the battlefield led to the revelation of the Bhagavad Gita and timeless wisdom on duty and action.",
      category: "Bhagavad Gita",
      imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=500&q=80",
    },
    {
      id: "story-3",
      title: "The Divine Play of Krishna and Radha",
      excerpt: "Discover the symbolic meaning behind the sacred relationship of Krishna and Radha, representing the soul's eternal longing for divine union.",
      category: "Bhakti",
      imageUrl: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=500&q=80",
    },
  ];

  // Sample data for facts
  const facts = [
    {
      title: "The Oldest Scripture",
      fact: "The Rig Veda is one of the oldest known religious texts in the world, dating back to approximately 1500 BCE. It consists of 1,028 hymns dedicated to various deities.",
      category: "Vedic Knowledge",
    },
    {
      title: "The Sacred Syllable",
      fact: "The sound 'Om' (Aum) is considered the most sacred syllable in Hinduism, representing the essence of the ultimate reality, consciousness, or Atman.",
      category: "Symbolism",
    },
    {
      title: "The Four Aims of Life",
      fact: "Hinduism prescribes four aims of human life: Dharma (righteousness), Artha (prosperity), Kama (pleasure), and Moksha (liberation from the cycle of rebirth).",
      category: "Philosophy",
    },
  ];

  // Sample data for quizzes
  const featuredQuizzes = [
    {
      id: "quiz-1",
      title: "Bhagavad Gita Essentials",
      description: "Test your knowledge of the key teachings and verses from the divine song of Lord Krishna.",
      questions: 10,
      timeMinutes: 15,
      difficulty: "medium" as const,
      imageUrl: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=500&q=80",
    },
    {
      id: "quiz-2",
      title: "Hindu Deities",
      description: "How well do you know the major gods and goddesses of the Hindu pantheon?",
      questions: 15,
      timeMinutes: 20,
      difficulty: "easy" as const,
      imageUrl: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?w=500&q=80",
    },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <Hero />

      {/* Featured Stories Section */}
      <section className="py-16 bg-white dark:bg-deepBlue-600/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-deepBlue-600 dark:text-white">
                Featured Stories
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mt-1">
                Spiritual tales from ancient Hindu texts
              </p>
            </div>
            <Link
              to="/stories"
              className="text-gold-500 hover:text-gold-600 flex items-center text-sm md:text-base font-medium story-link"
            >
              View all stories
              <ArrowRight size={18} className="ml-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredStories.map((story) => (
              <StoryCard key={story.id} {...story} />
            ))}
          </div>
        </div>
      </section>

      {/* Chatbot Intro Section */}
      <section className="py-20 bg-gradient-to-r from-deepBlue-500 to-deepBlue-600 text-white relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <span className="px-3 py-1 bg-white/10 rounded-full text-xs font-medium text-gold-300 mb-4 inline-block">
              Spiritual Guidance
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Chat with the Wisdom of Bhagavad Gita
            </h2>
            <p className="text-gray-300 text-lg">
              Ask questions about dharma, karma, and spiritual practices. 
              Get answers based on the timeless knowledge of the Gita.
            </p>
          </div>
          
          <div className="flex justify-center">
            <Link
              to="/chat"
              className="px-8 py-3 bg-gold-500 hover:bg-gold-600 rounded-md text-black font-medium shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 inline-flex items-center"
            >
              Start a Spiritual Conversation
              <ArrowRight size={18} className="ml-2" />
            </Link>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10">
          <img 
            src="https://images.unsplash.com/photo-1472396961693-142e6e269027?w=500&q=80" 
            alt="" 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-deepBlue-600 to-transparent"></div>
      </section>

      {/* Hindu Facts Section */}
      <section className="py-16 bg-gray-50 dark:bg-deepBlue-600/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-deepBlue-600 dark:text-white">
                Hindu Facts
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mt-1">
                Discover interesting facts about Hindu culture and spirituality
              </p>
            </div>
            <Link
              to="/facts"
              className="text-gold-500 hover:text-gold-600 flex items-center text-sm md:text-base font-medium story-link"
            >
              Explore all facts
              <ArrowRight size={18} className="ml-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {facts.map((fact, index) => (
              <FactCard key={index} {...fact} />
            ))}
          </div>
        </div>
      </section>

      {/* Quiz Section */}
      <section className="py-16 bg-white dark:bg-deepBlue-600/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-deepBlue-600 dark:text-white">
                Test Your Knowledge
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mt-1">
                Challenge yourself with our spiritual quizzes
              </p>
            </div>
            <Link
              to="/quizzes"
              className="text-gold-500 hover:text-gold-600 flex items-center text-sm md:text-base font-medium story-link"
            >
              See all quizzes
              <ArrowRight size={18} className="ml-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredQuizzes.map((quiz) => (
              <QuizCard key={quiz.id} {...quiz} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
