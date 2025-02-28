
import { ArrowRight, Clock, Award } from "lucide-react";
import { Link } from "react-router-dom";

interface QuizCardProps {
  id: string;
  title: string;
  description: string;
  questions: number;
  timeMinutes: number;
  difficulty: "easy" | "medium" | "hard";
  imageUrl: string;
}

const QuizCard = ({
  id,
  title,
  description,
  questions,
  timeMinutes,
  difficulty,
  imageUrl,
}: QuizCardProps) => {
  const getDifficultyColor = () => {
    switch (difficulty) {
      case "easy":
        return "bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400";
      case "medium":
        return "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/20 dark:text-yellow-400";
      case "hard":
        return "bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400";
      default:
        return "bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400";
    }
  };

  return (
    <div className="divine-card group hover-lift">
      <div className="relative overflow-hidden h-40">
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
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-3 left-3 right-3 flex justify-between items-center">
          <h3 className="text-white font-semibold text-shadow-md">{title}</h3>
          <span
            className={`px-2 py-1 text-xs font-medium rounded capitalize ${getDifficultyColor()}`}
          >
            {difficulty}
          </span>
        </div>
      </div>
      <div className="p-5">
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
          {description}
        </p>
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
            <Award size={14} className="mr-1" />
            <span>{questions} questions</span>
          </div>
          <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
            <Clock size={14} className="mr-1" />
            <span>{timeMinutes} minutes</span>
          </div>
        </div>
        <Link
          to={`/quiz/${id}`}
          className="w-full inline-flex items-center justify-center py-2 px-4 bg-gold-500 hover:bg-gold-600 text-white rounded-md text-sm font-medium transition-colors duration-300"
        >
          Start Quiz
          <ArrowRight size={16} className="ml-1 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
};

export default QuizCard;
