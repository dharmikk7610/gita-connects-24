
import { useState, useRef, useEffect } from "react";
import { Send, User, Loader2, MessageSquare, Phone, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import SpiritualGuideCall from "./SpiritualGuideCall";
import ActiveCall from "./ActiveCall";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

const ChatBot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      text: "नमस्ते 🙏 Welcome to GitaSangam. I'm your spiritual guide to the wisdom of Bhagavad Gita. How may I assist you on your dharmic journey today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [language, setLanguage] = useState<"english" | "hindi">("english");
  const [isCallModalOpen, setIsCallModalOpen] = useState(false);
  const [isActiveCallOpen, setIsActiveCallOpen] = useState(false);
  const [callType, setCallType] = useState<"audio" | "video">("audio");
  const [selectedGuide, setSelectedGuide] = useState<{id: string; name: string; imageUrl: string} | null>(null);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Simulated bot responses based on input
  const getBotResponse = (userInput: string): Promise<string> => {
    return new Promise((resolve) => {
      const userInputLower = userInput.toLowerCase();
      
      // Simulate API delay
      setTimeout(() => {
        // Hindi responses if language is set to Hindi
        if (language === "hindi") {
          if (userInputLower.includes("karma") || userInputLower.includes("कर्म")) {
            resolve("कर्म का सिद्धांत बताता है कि हर कार्य का एक परिणाम होता है। गीता में श्री कृष्ण कहते हैं, 'कर्मण्येवाधिकारस्ते मा फलेषु कदाचन' - आपका अधिकार केवल कर्म करने में है, फल पर नहीं।");
          } else if (userInputLower.includes("dharma") || userInputLower.includes("धर्म")) {
            resolve("धर्म का अर्थ है आपका कर्तव्य और नैतिक जिम्मेदारी। गीता में, धर्म का पालन करना जीवन का मूल उद्देश्य माना गया है। अपने धर्म का पालन करना ही सच्ची आध्यात्मिकता है।");
          } else if (userInputLower.includes("meditation") || userInputLower.includes("ध्यान")) {
            resolve("ध्यान एक महत्वपूर्ण आध्यात्मिक अभ्यास है। गीता के अनुसार, ध्यान से मन की एकाग्रता और आत्म-ज्ञान बढ़ता है। नियमित ध्यान से आंतरिक शांति और स्पष्टता मिलती है।");
          } else {
            resolve("मुझे खेद है, मैं आपके प्रश्न का उत्तर नहीं दे पा रहा हूँ। कृपया भगवद गीता के किसी विशिष्ट विषय या श्लोक के बारे में पूछें।");
          }
        } 
        // English responses
        else {
          if (userInputLower.includes("karma")) {
            resolve("The principle of Karma teaches that every action has a consequence. In the Gita, Lord Krishna says, 'You have a right to perform your prescribed duties, but you are not entitled to the fruits of your actions.' This teaches us to act without attachment to results.");
          } else if (userInputLower.includes("dharma")) {
            resolve("Dharma refers to your duty and moral responsibility. In the Gita, following one's dharma is considered the primary purpose of life. The path of dharma leads to harmony and spiritual growth.");
          } else if (userInputLower.includes("meditation")) {
            resolve("Meditation is a key spiritual practice. According to the Gita, meditation helps in developing concentration and self-awareness. Regular meditation leads to inner peace and clarity of mind.");
          } else {
            resolve("I apologize, but I don't have a specific answer for that question. Please ask about a specific topic or verse from the Bhagavad Gita, and I'll do my best to help you understand its teachings.");
          }
        }
      }, 1500);
    });
  };

  const handleSendMessage = async () => {
    if (input.trim() === "") return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: "user",
      timestamp: new Date(),
    };
    
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInput("");
    setIsTyping(true);
    
    try {
      const botResponse = await getBotResponse(input);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        sender: "bot",
        timestamp: new Date(),
      };
      
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error("Error getting bot response:", error);
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "I apologize, but I'm having trouble connecting to the wisdom of the Gita right now. Please try again later.",
        sender: "bot",
        timestamp: new Date(),
      };
      
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "english" ? "hindi" : "english"));
  };

  const openCallModal = () => {
    setIsCallModalOpen(true);
  };

  const closeCallModal = () => {
    setIsCallModalOpen(false);
  };

  const handleStartCall = (guideId: string, type: "audio" | "video") => {
    // Mocked guide data - in a real app, you would fetch this from the backend
    const mockGuides = [
      {
        id: "guide-1",
        name: "Swami Ananda",
        imageUrl: "https://images.unsplash.com/photo-1609710228159-0fa9bd7c0827?w=500&q=80",
      },
      {
        id: "guide-2",
        name: "Acharya Priya",
        imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&q=80",
      },
      {
        id: "guide-3",
        name: "Guru Dev",
        imageUrl: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=500&q=80",
      }
    ];
    
    const guide = mockGuides.find(g => g.id === guideId);
    
    if (guide) {
      setSelectedGuide(guide);
      setCallType(type);
      setIsCallModalOpen(false);
      setIsActiveCallOpen(true);
    }
  };

  const handleEndCall = () => {
    setIsActiveCallOpen(false);
    setSelectedGuide(null);
    
    // Add a message about the completed call
    const callEndedMessage: Message = {
      id: Date.now().toString(),
      text: `Your call with ${selectedGuide?.name} has ended. If you need further guidance, you can initiate another call or continue chatting.`,
      sender: "bot",
      timestamp: new Date(),
    };
    
    setMessages(prevMessages => [...prevMessages, callEndedMessage]);
  };

  // Auto-scroll to the bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="h-[calc(100vh-9rem)] flex flex-col bg-white dark:bg-deepBlue-600/30 rounded-lg shadow-xl overflow-hidden divine-card">
      {/* Header */}
      <div className="p-4 border-b border-gold-200 dark:border-gold-800/30 bg-gradient-to-r from-gold-50 to-white dark:from-deepBlue-600 dark:to-deepBlue-500 flex justify-between items-center">
        <div className="flex items-center">
          <div className="h-10 w-10 rounded-full bg-gold-100 dark:bg-gold-900/30 flex items-center justify-center mr-3">
            <MessageSquare className="h-5 w-5 text-gold-500 dark:text-gold-400" />
          </div>
          <div>
            <h2 className="font-semibold text-deepBlue-600 dark:text-gold-300">Gita Wisdom Guide</h2>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Ask questions about the Bhagavad Gita and Hindu dharma
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={toggleLanguage}
            className="text-sm border-gold-200 dark:border-gold-800/30 hover:bg-gold-50 dark:hover:bg-gold-900/20"
          >
            {language === "english" ? "हिंदी में पूछें" : "Ask in English"}
          </Button>
          <Button
            variant="default"
            size="sm"
            onClick={openCallModal}
            className="text-sm bg-gold-500 hover:bg-gold-600 text-white flex items-center gap-1"
          >
            <Phone className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Talk to a Guide</span>
          </Button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-gray-50 to-white dark:from-deepBlue-600/10 dark:to-deepBlue-600/5">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`flex max-w-[80%] md:max-w-[70%] animate-fade-in ${
                message.sender === "user"
                  ? "flex-row-reverse"
                  : "flex-row"
              }`}
            >
              <div
                className={`flex items-center justify-center h-8 w-8 rounded-full mr-2 flex-shrink-0 ${
                  message.sender === "user"
                    ? "bg-gold-100 dark:bg-gold-900/30 ml-2"
                    : "bg-deepBlue-100 dark:bg-deepBlue-800/30 mr-2"
                }`}
              >
                {message.sender === "user" ? (
                  <User className="h-4 w-4 text-gold-500 dark:text-gold-400" />
                ) : (
                  <MessageSquare className="h-4 w-4 text-deepBlue-500 dark:text-deepBlue-300" />
                )}
              </div>

              <div
                className={`p-3 rounded-lg ${
                  message.sender === "user"
                    ? "bg-gold-500 text-white"
                    : "bg-white dark:bg-deepBlue-700/50 shadow text-deepBlue-600 dark:text-gray-200 border border-gray-100 dark:border-deepBlue-700"
                }`}
              >
                <p className={`text-sm ${language === "hindi" && message.sender === "bot" ? "font-devanagari" : ""}`}>
                  {message.text}
                </p>
                <span className="text-xs mt-1 opacity-70 block text-right">
                  {message.timestamp.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            </div>
          </div>
        ))}

        {/* Typing indicator */}
        {isTyping && (
          <div className="flex justify-start">
            <div className="flex max-w-[80%] md:max-w-[70%]">
              <div className="flex items-center justify-center h-8 w-8 rounded-full bg-deepBlue-100 dark:bg-deepBlue-800/30 mr-2 flex-shrink-0">
                <MessageSquare className="h-4 w-4 text-deepBlue-500 dark:text-deepBlue-300" />
              </div>

              <div className="p-3 rounded-lg bg-white dark:bg-deepBlue-700/50 shadow text-deepBlue-600 dark:text-gray-200 border border-gray-100 dark:border-deepBlue-700">
                <div className="flex space-x-1">
                  <div className="h-2 w-2 bg-deepBlue-300 dark:bg-deepBlue-400 rounded-full animate-bounce"></div>
                  <div className="h-2 w-2 bg-deepBlue-300 dark:bg-deepBlue-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                  <div className="h-2 w-2 bg-deepBlue-300 dark:bg-deepBlue-400 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-gold-200 dark:border-gold-800/30 bg-white dark:bg-deepBlue-600">
        <div className="flex items-center bg-gray-50 dark:bg-deepBlue-700/50 rounded-lg border border-gray-200 dark:border-deepBlue-700 p-2">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={language === "english" ? "Ask about the Bhagavad Gita..." : "भगवद गीता के बारे में पूछें..."}
            className="flex-1 bg-transparent border-0 focus:ring-0 resize-none max-h-20 text-sm placeholder:text-gray-400 dark:placeholder:text-gray-500 text-deepBlue-600 dark:text-gray-200"
            rows={1}
          />
          <Button
            onClick={handleSendMessage}
            disabled={isTyping || input.trim() === ""}
            className="ml-2 bg-gold-500 hover:bg-gold-600 text-white rounded-full h-8 w-8 flex items-center justify-center p-0 transition-colors duration-200"
          >
            {isTyping ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </div>
        <div className="flex justify-between items-center mt-2">
          <p className="text-xs text-gray-400 dark:text-gray-500">
            Ask questions about dharma, karma, meditation, and Bhagavad Gita teachings
          </p>
          <Button
            variant="link"
            size="sm"
            onClick={openCallModal}
            className="text-xs text-gold-500 hover:text-gold-600 p-0 h-auto flex items-center gap-1"
          >
            <Phone className="h-3 w-3" />
            <span>Need deeper guidance? Talk to a spiritual guide</span>
          </Button>
        </div>
      </div>

      {/* Call a Spiritual Guide Modal */}
      <SpiritualGuideCall 
        isOpen={isCallModalOpen}
        onClose={closeCallModal}
        onStartCall={handleStartCall}
      />

      {/* Active Call UI */}
      {selectedGuide && (
        <ActiveCall 
          isOpen={isActiveCallOpen}
          onClose={handleEndCall}
          guide={selectedGuide}
          callType={callType}
        />
      )}
    </div>
  );
};

export default ChatBot;
