
import { Bookmark, BookmarkCheck } from "lucide-react";
import { useState } from "react";

interface FactCardProps {
  title: string;
  fact: string;
  category: string;
  iconUrl?: string;
}

const FactCard = ({ title, fact, category, iconUrl }: FactCardProps) => {
  const [isBookmarked, setIsBookmarked] = useState(false);

  const toggleBookmark = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsBookmarked(!isBookmarked);
  };

  return (
    <div className="divine-card p-5 group hover-lift">
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center">
          {iconUrl && (
            <div className="w-8 h-8 mr-3 flex items-center justify-center bg-gold-100 dark:bg-gold-900/20 rounded-full divine-glow">
              <img src={iconUrl} alt="" className="w-4 h-4" />
            </div>
          )}
          <span className="text-xs font-medium px-2 py-1 rounded bg-gold-100 dark:bg-gold-900/20 text-gold-600 dark:text-gold-400">
            {category}
          </span>
        </div>
        <button 
          onClick={toggleBookmark}
          className="text-gray-400 hover:text-gold-500 transition-colors duration-300"
          aria-label={isBookmarked ? "Remove bookmark" : "Bookmark this fact"}
        >
          {isBookmarked ? (
            <BookmarkCheck className="h-5 w-5 text-gold-500" />
          ) : (
            <Bookmark className="h-5 w-5" />
          )}
        </button>
      </div>
      <h3 className="text-lg font-semibold mb-2 text-deepBlue-600 dark:text-gold-300 group-hover:text-gold-600 dark:group-hover:text-gold-400 transition-colors duration-300">
        {title}
      </h3>
      <p className="text-gray-600 dark:text-gray-300 text-sm">
        {fact}
      </p>
    </div>
  );
};

export default FactCard;
