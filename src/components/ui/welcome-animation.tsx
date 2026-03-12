import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface WelcomeAnimationProps {
  onComplete: () => void;
}

const WelcomeAnimation = ({ onComplete }: WelcomeAnimationProps) => {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const timer1 = setTimeout(() => setCurrentStep(1), 1000);
    const timer2 = setTimeout(() => setCurrentStep(2), 2000);
    const timer3 = setTimeout(() => onComplete(), 3500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center overflow-hidden"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
        {/* Dotted Background */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 25% 25%, #ffffff 1px, transparent 1px),
                                radial-gradient(circle at 75% 75%, #ffffff 1px, transparent 1px)`,
              backgroundSize: "50px 50px",
            }}
          />
        </div>

        {/* MAIN CENTER COLUMN */}
        <div className="relative z-20 flex flex-col items-center text-center px-4">

          {/* LOGO */}
          <motion.div
            initial={{ scale: 0.3, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="mb-10"
          >
            <motion.img
              src="https://raw.githubusercontent.com/financial1mastery1hub-sudo/Shakthisat/main/src/img/shakthisat.png"
              className="w-56 md:w-72 object-contain"
              animate={{
                filter: [
                  "brightness(0.7) drop-shadow(0 0 20px rgba(255,255,255,0.3))",
                  "brightness(1) drop-shadow(0 0 40px rgba(255,255,255,0.5))",
                  "brightness(0.7) drop-shadow(0 0 20px rgba(255,255,255,0.3))",
                ],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>

          {/* SUBTITLE */}
          {currentStep >= 1 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex flex-col items-center"
            >
              <p className="text-2xl md:text-3xl font-light tracking-wide text-gray-300">
                Empowering Girls in Space
              </p>

              <motion.div
                className="mt-4 h-0.5 bg-gray-400"
                initial={{ width: 0 }}
                animate={{ width: "120px" }}
                transition={{ duration: 1 }}
              />

              <p className="text-sm md:text-xl text-gray-400 mt-4">
                12,000 Girls • 108 Countries • ∞ Possibilities
              </p>
            </motion.div>
          )}
        </div>

        {/* LOADING BAR */}
        {currentStep >= 2 && (
          <motion.div
            className="absolute bottom-10 w-80"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden border border-gray-700">
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                className="h-full rounded-full"
                style={{
                  background:
                    "linear-gradient(90deg, #808080, #C0C0C0, #E8E8E8, #C0C0C0, #808080)",
                }}
              />
            </div>

            {/* Loading Text */}
            <div className="flex justify-between mt-2 text-gray-400 text-xs md:text-sm">
              <span>0%</span>
              <motion.span
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Initializing Mission...
              </motion.span>
              <span>100%</span>
            </div>
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default WelcomeAnimation;
