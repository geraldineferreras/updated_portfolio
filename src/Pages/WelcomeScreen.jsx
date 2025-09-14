import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, Github, Globe, User, Sparkles, Zap, Target, Rocket } from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const TypewriterEffect = ({ text }) => {
  const [displayText, setDisplayText] = useState('');
  
  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index <= text.length) {
        setDisplayText(text.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 150);
    
    return () => clearInterval(timer);
  }, [text]);

  return (
    <span className="inline-block">
      {displayText}
      <span className="animate-pulse text-primary-400">|</span>
    </span>
  );
};

const BackgroundEffect = () => (
  <div className="absolute inset-0 overflow-hidden">
    {/* Animated gradient orbs */}
    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl animate-float" />
    <div className="absolute top-3/4 right-1/4 w-80 h-80 bg-accent-500/20 rounded-full blur-3xl animate-float animation-delay-2000" />
    <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-secondary-400/20 rounded-full blur-3xl animate-float animation-delay-4000" />
    
    {/* Grid pattern */}
    <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(20,184,166,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(14,165,233,0.1)_1px,transparent_1px)] bg-[size:40px_40px]" />
    
    {/* Central glow */}
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-primary-500/10 via-accent-500/5 to-transparent rounded-full animate-pulse" />
  </div>
);

const FloatingIcon = ({ Icon, delay = 0, className = "" }) => (
  <motion.div 
    className={`relative group ${className}`}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.8, ease: "easeOut" }}
  >
    <div className="absolute -inset-2 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full blur opacity-30 group-hover:opacity-75 transition duration-300" />
    <div className="relative p-3 sm:p-4 glass-effect rounded-full">
      <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-primary-400 group-hover:text-white transition-colors" />
    </div>
  </motion.div>
);

const FeatureCard = ({ icon: Icon, title, description, delay = 0 }) => (
  <motion.div
    className="glass-effect rounded-xl p-4 text-center card-hover"
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.8, ease: "easeOut" }}
  >
    <div className="w-12 h-12 mx-auto mb-3 bg-primary-500/20 rounded-full flex items-center justify-center">
      <Icon className="w-6 h-6 text-primary-400" />
    </div>
    <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
    <p className="text-dark-400 text-sm">{description}</p>
  </motion.div>
);

const WelcomeScreen = ({ onLoadingComplete }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
      mirror: false,
    });

    const timer = setTimeout(() => {
      setIsLoading(false);
      setTimeout(() => {
        onLoadingComplete?.();
      }, 1000);
    }, 4000);
    
    return () => clearTimeout(timer);
  }, [onLoadingComplete]);

  const containerVariants = {
    exit: {
      opacity: 0,
      scale: 1.05,
      filter: "blur(8px)",
      transition: {
        duration: 1.2,
        ease: "easeInOut",
        when: "beforeChildren",
        staggerChildren: 0.15
      }
    }
  };

  const childVariants = {
    exit: {
      y: -30,
      opacity: 0,
      transition: {
        duration: 0.6,
        ease: "easeInOut"
      }
    }
  };

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit="exit"
          variants={containerVariants}
        >
          <BackgroundEffect />
          
          <div className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-8">
            <div className="w-full max-w-7xl mx-auto">
              
              {/* Floating Icons */}
              <motion.div 
                className="flex justify-center gap-4 sm:gap-6 md:gap-8 mb-8 sm:mb-12"
                variants={childVariants}
              >
                {[Code2, Zap, Target, Rocket].map((Icon, index) => (
                  <FloatingIcon key={index} Icon={Icon} delay={index * 0.2} />
                ))}
              </motion.div>

              {/* Main Title */}
              <motion.div 
                className="text-center mb-8 sm:mb-12"
                variants={childVariants}
              >
                <motion.h1 
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-display mb-4"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
                >
                  <span className="block gradient-text mb-2">
                    Welcome to the Future
                  </span>
                  <span className="block text-white">
                    of Web Development
                  </span>
                </motion.h1>
                
                <motion.p 
                  className="text-base sm:text-lg md:text-xl text-dark-300 max-w-2xl mx-auto mb-6"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1, duration: 0.8, ease: "easeOut" }}
                >
                  Experience cutting-edge design and innovative solutions crafted with passion and precision.
                </motion.p>
              </motion.div>

              {/* Feature Cards */}
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 lg:gap-12 mb-8 sm:mb-12"
                variants={childVariants}
              >
                <FeatureCard 
                  icon={Sparkles} 
                  title="Modern Design" 
                  description="Contemporary UI/UX with glass morphism effects"
                  delay={1.2}
                />
                <FeatureCard 
                  icon={Zap} 
                  title="Lightning Fast" 
                  description="Optimized performance and smooth animations"
                  delay={1.4}
                />
                <FeatureCard 
                  icon={Target} 
                  title="User Focused" 
                  description="Built with accessibility and user experience in mind"
                  delay={1.6}
                />
              </motion.div>

              {/* Website Link */}
              <motion.div 
                className="text-center"
                variants={childVariants}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.8, duration: 0.8, ease: "easeOut" }}
              >
                <a
                  href="https://ferreras.my.id"
                  className="inline-flex items-center gap-3 px-6 py-4 sm:px-8 sm:py-5 rounded-full relative group hover:scale-105 transition-all duration-300 button-primary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Globe className="w-5 h-5 sm:w-6 sm:h-6" />
                  <span className="text-lg sm:text-xl font-medium">
                    <TypewriterEffect text="ferreras.my.id" />
                  </span>
                </a>
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WelcomeScreen;