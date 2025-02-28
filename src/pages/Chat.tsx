
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChatBot from "@/components/ChatBot";

const Chat = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-16 bg-gradient-to-b from-gold-50 to-white dark:from-deepBlue-600/20 dark:to-deepBlue-600/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 animate-fade-in">
            <h1 className="text-3xl md:text-4xl font-bold text-deepBlue-600 dark:text-white mb-4">
              Bhagavad Gita Wisdom Chat
            </h1>
            <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-300">
              Ask questions about dharma, karma, meditation, or any spiritual topic. 
              Get guidance based on the timeless wisdom of the Bhagavad Gita.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto animate-scale-in">
            <ChatBot />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Chat;
