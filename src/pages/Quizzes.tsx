
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import QuizCard from "@/components/QuizCard";

const Quizzes = () => {
  // Sample data for quizzes
  const quizzes = [
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
    {
      id: "quiz-3",
      title: "Epic Challenge: Mahabharata",
      description: "Dive deep into the complex characters and events of the great epic Mahabharata.",
      questions: 20,
      timeMinutes: 30,
      difficulty: "hard" as const,
      imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=500&q=80",
    },
    {
      id: "quiz-4",
      title: "The Journey of Rama",
      description: "Follow the path of Lord Rama through the events of the Ramayana in this immersive quiz.",
      questions: 15,
      timeMinutes: 25,
      difficulty: "medium" as const,
      imageUrl: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=500&q=80",
    },
    {
      id: "quiz-5",
      title: "Hindu Festivals & Celebrations",
      description: "Test your knowledge about the colorful and meaningful festivals celebrated in Hinduism.",
      questions: 12,
      timeMinutes: 18,
      difficulty: "easy" as const,
      imageUrl: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=500&q=80",
    },
    {
      id: "quiz-6",
      title: "Advanced Vedic Philosophy",
      description: "Challenge yourself with complex concepts from the Upanishads and Vedantic philosophy.",
      questions: 15,
      timeMinutes: 25,
      difficulty: "hard" as const,
      imageUrl: "https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?w=500&q=80",
    },
  ];

  // Group quizzes by difficulty
  const easyQuizzes = quizzes.filter(quiz => quiz.difficulty === "easy");
  const mediumQuizzes = quizzes.filter(quiz => quiz.difficulty === "medium");
  const hardQuizzes = quizzes.filter(quiz => quiz.difficulty === "hard");

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="pt-24 pb-16 bg-gradient-to-b from-gold-50 to-white dark:from-deepBlue-600/20 dark:to-deepBlue-600/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-3xl md:text-4xl font-bold text-deepBlue-600 dark:text-white mb-4">
              Spiritual Knowledge Quizzes
            </h1>
            <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-300">
              Test and enhance your understanding of Hindu scriptures, deities, and traditions through these interactive quizzes.
            </p>
          </div>
          
          {/* Beginner Level */}
          <div className="mb-16 animate-fade-in">
            <h2 className="text-xl md:text-2xl font-semibold mb-6 text-deepBlue-600 dark:text-white">
              Beginner Level
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {easyQuizzes.map((quiz) => (
                <QuizCard key={quiz.id} {...quiz} />
              ))}
            </div>
          </div>
          
          {/* Intermediate Level */}
          <div className="mb-16 animate-fade-in">
            <h2 className="text-xl md:text-2xl font-semibold mb-6 text-deepBlue-600 dark:text-white">
              Intermediate Level
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mediumQuizzes.map((quiz) => (
                <QuizCard key={quiz.id} {...quiz} />
              ))}
            </div>
          </div>
          
          {/* Advanced Level */}
          <div className="animate-fade-in">
            <h2 className="text-xl md:text-2xl font-semibold mb-6 text-deepBlue-600 dark:text-white">
              Advanced Level
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {hardQuizzes.map((quiz) => (
                <QuizCard key={quiz.id} {...quiz} />
              ))}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Quizzes;
