
import { useState } from "react";
import { Search } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StoryCard from "@/components/StoryCard";

const Stories = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // Sample data for stories
  const allStories = [
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
    {
      id: "story-4",
      title: "The Story of Lord Rama's Exile",
      excerpt: "Follow the journey of Lord Rama during his 14-year exile and the spiritual lessons of righteousness, duty, and devotion from the Ramayana.",
      category: "Ramayana",
      imageUrl: "https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=500&q=80",
    },
    {
      id: "story-5",
      title: "The Churning of the Ocean (Samudra Manthan)",
      excerpt: "Learn about the cooperation between devas and asuras to churn the cosmic ocean for amrita, the nectar of immortality, and the emergence of divine entities.",
      category: "Puranas",
      imageUrl: "https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?w=500&q=80",
    },
    {
      id: "story-6",
      title: "The Birth of Lord Ganesha",
      excerpt: "Explore the fascinating origin story of the elephant-headed deity and why he's worshipped first in all Hindu ceremonies.",
      category: "Puranas",
      imageUrl: "https://images.unsplash.com/photo-1500673922987-e212871fec22?w=500&q=80",
    },
  ];

  // Get unique categories for filter
  const categories = ["all", ...Array.from(new Set(allStories.map((story) => story.category)))];

  // Filter stories based on search and category
  const filteredStories = allStories.filter((story) => {
    const matchesSearch = story.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          story.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || story.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="pt-24 pb-16 bg-gradient-to-b from-gold-50 to-white dark:from-deepBlue-600/20 dark:to-deepBlue-600/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 animate-fade-in">
            <h1 className="text-3xl md:text-4xl font-bold text-deepBlue-600 dark:text-white mb-4">
              Spiritual Stories
            </h1>
            <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-300">
              Explore ancient tales from Hindu mythology that offer profound wisdom and spiritual insights.
            </p>
          </div>
          
          {/* Filters and Search */}
          <div className="mb-10 animate-fade-in">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-3 py-1 rounded-full text-sm transition-colors duration-200 ${
                      selectedCategory === category
                        ? "bg-gold-500 text-white"
                        : "bg-gray-100 dark:bg-deepBlue-700/50 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-deepBlue-700"
                    }`}
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </button>
                ))}
              </div>
              
              <div className="relative w-full md:w-64">
                <input
                  type="text"
                  placeholder="Search stories..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 pl-10 bg-white dark:bg-deepBlue-700/50 border border-gray-200 dark:border-deepBlue-700 rounded-md focus:outline-none focus:ring-2 focus:ring-gold-500/50 dark:focus:ring-gold-500/30"
                />
                <Search className="h-4 w-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              </div>
            </div>
          </div>
          
          {/* Stories Grid */}
          {filteredStories.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
              {filteredStories.map((story) => (
                <StoryCard key={story.id} {...story} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 animate-fade-in">
              <h3 className="text-xl font-medium text-gray-600 dark:text-gray-400">
                No stories found matching your search
              </h3>
              <p className="mt-2 text-gray-500 dark:text-gray-500">
                Try adjusting your filters or search terms
              </p>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Stories;
