
import { Link } from "react-router-dom";
import { Heart, Mail, Github, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-deepBlue-600/50 border-t border-gold-100 dark:border-gold-900/20 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-deepBlue-500 dark:text-gold-400">Gita<span className="text-gold-500">Sangam</span></h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              A spiritual digital platform exploring Bhagavad Gita teachings, Hindu dharma, and karmic insights.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-gold-500 transition-colors duration-300"
                aria-label="Twitter"
              >
                <Twitter size={18} />
              </a>
              <a 
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-gold-500 transition-colors duration-300"
                aria-label="GitHub"
              >
                <Github size={18} />
              </a>
              <a 
                href="mailto:info@gitasangam.com"
                className="text-gray-500 hover:text-gold-500 transition-colors duration-300"
                aria-label="Email"
              >
                <Mail size={18} />
              </a>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-deepBlue-500 dark:text-gold-400">Explore</h3>
            <ul className="space-y-2">
              {['Bhagavad Gita', 'Spiritual Stories', 'Hindu Facts', 'Quizzes', 'Astrology'].map((item) => (
                <li key={item}>
                  <Link 
                    to="/"
                    className="text-sm text-gray-600 dark:text-gray-300 hover:text-gold-500 dark:hover:text-gold-400 transition-colors duration-200"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-deepBlue-500 dark:text-gold-400">Resources</h3>
            <ul className="space-y-2">
              {['Learn Sanskrit', 'Meditation Guides', 'Yoga & Wellness', 'Temple Guides', 'Ancient Texts'].map((item) => (
                <li key={item}>
                  <Link 
                    to="/"
                    className="text-sm text-gray-600 dark:text-gray-300 hover:text-gold-500 dark:hover:text-gold-400 transition-colors duration-200"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-deepBlue-500 dark:text-gold-400">Legal</h3>
            <ul className="space-y-2">
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Copyright', 'Contact Us'].map((item) => (
                <li key={item}>
                  <Link 
                    to="/"
                    className="text-sm text-gray-600 dark:text-gray-300 hover:text-gold-500 dark:hover:text-gold-400 transition-colors duration-200"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gold-100 dark:border-gold-900/20 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            &copy; {new Date().getFullYear()} GitaSangam. All rights reserved.
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-4 sm:mt-0 flex items-center">
            Made with 
            <Heart size={14} className="mx-1 text-gold-500" /> 
            for spiritual seekers
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
