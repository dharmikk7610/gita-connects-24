
import { useState } from "react";
import { Search, Filter } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FactCard from "@/components/FactCard";

const Facts = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // Sample data for facts
  const allFacts = [
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
    {
      title: "The Cosmic Dance",
      fact: "Lord Shiva's cosmic dance (Tandava) symbolizes the cycles of creation, preservation, and dissolution. The Nataraja sculpture depicts Shiva performing this divine dance.",
      category: "Symbolism",
    },
    {
      title: "The Seven Sacred Rivers",
      fact: "The seven sacred rivers in Hinduism are Ganga (Ganges), Yamuna, Godavari, Saraswati, Narmada, Sindhu (Indus), and Kaveri. They are believed to have purifying properties.",
      category: "Geography",
    },
    {
      title: "Yoga's Ancient Origins",
      fact: "Yoga originated in ancient India around 5,000 years ago. The term comes from the Sanskrit word 'Yuj,' meaning to join or unite, symbolizing the union of body and consciousness.",
      category: "Practices",
    },
    {
      title: "The Science of Architecture",
      fact: "Vastu Shastra is the traditional Hindu system of architecture, which literally translates to 'science of architecture.' It integrates architecture with nature and ancient beliefs.",
      category: "Arts",
    },
    {
      title: "Sacred Number 108",
      fact: "The number 108 has great significance in Hinduism. There are 108 Upanishads, 108 beads in a mala (prayer necklace), and it's believed there are 108 energy lines converging to form the heart chakra.",
      category: "Symbolism",
    },
    {
      title: "The Concept of Karma",
      fact: "Karma, meaning 'action' or 'deed,' is the spiritual principle of cause and effect. According to this concept, a person's actions in this and previous states of existence determine their fate in future existences.",
      category: "Philosophy",
    },
  ];

  // Get unique categories for filter
  const categories = ["all", ...Array.from(new Set(allFacts.map((fact) => fact.category)))];

  // Filter facts based on search and category
  const filteredFacts = allFacts.filter((fact) => {
    const matchesSearch = fact.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          fact.fact.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || fact.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="pt-24 pb-16 bg-gradient-to-b from-gold-50 to-white dark:from-deepBlue-600/20 dark:to-deepBlue-600/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 animate-fade-in">
            <h1 className="text-3xl md:text-4xl font-bold text-deepBlue-600 dark:text-white mb-4">
              Hindu Facts
            </h1>
            <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-300">
              Discover interesting and verified facts about Hindu culture, philosophy, and traditions.
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
                  placeholder="Search facts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 pl-10 bg-white dark:bg-deepBlue-700/50 border border-gray-200 dark:border-deepBlue-700 rounded-md focus:outline-none focus:ring-2 focus:ring-gold-500/50 dark:focus:ring-gold-500/30"
                />
                <Search className="h-4 w-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              </div>
            </div>
          </div>
          
          {/* Facts Grid */}
          {filteredFacts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
              {filteredFacts.map((fact, index) => (
                <FactCard key={index} {...fact} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 animate-fade-in">
              <h3 className="text-xl font-medium text-gray-600 dark:text-gray-400">
                No facts found matching your search
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

export default Facts;
