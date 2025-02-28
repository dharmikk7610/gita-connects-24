
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface StoryCardProps {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  imageUrl: string;
}

const StoryCard = ({ id, title, excerpt, category, imageUrl }: StoryCardProps) => {
  return (
    <div className="divine-card group hover-lift">
      <div className="relative overflow-hidden h-48">
        <div className="absolute inset-0 bg-gray-200 animate-pulse"></div>
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
          onLoad={(e) => {
            const target = e.target as HTMLImageElement;
            target.previousElementSibling?.classList.add('hidden');
          }}
        />
        <div className="absolute top-3 left-3">
          <span className="px-2 py-1 bg-white/80 dark:bg-deepBlue-600/80 backdrop-blur-sm text-xs font-medium rounded text-gold-600 dark:text-gold-400 border border-gold-200 dark:border-gold-800/30">
            {category}
          </span>
        </div>
      </div>
      <div className="p-5">
        <h3 className="text-lg font-semibold mb-2 text-deepBlue-600 dark:text-gold-300 group-hover:text-gold-600 dark:group-hover:text-gold-400 transition-colors duration-300">
          {title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
          {excerpt}
        </p>
        <Link
          to={`/story/${id}`}
          className="inline-flex items-center text-gold-500 hover:text-gold-600 text-sm font-medium transition-colors duration-300"
        >
          Read more
          <ArrowRight size={16} className="ml-1 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
};

export default StoryCard;
