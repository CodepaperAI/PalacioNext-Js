import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const openHouseImage = "https://minimax-algeng-chat-tts-us.oss-us-east-1.aliyuncs.com/ccv2%2F2026-03-27%2FMiniMax-M2.1%2F2016507940642496657%2F61941e7d1cd250b02b8c211003c43bde08525b815b3f94eb48b5dae40f00893a..jpeg?Expires=1774642322&OSSAccessKeyId=LTAI5tCpJNKCf5EkQHSuL9xg&Signature=R3H62w3lqRP96nAEQI81ma3WvDY%3D";

const Popup = () => {
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-2"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-charcoal/80 backdrop-blur-sm"
            onClick={handleClose}
          />

          {/* Popup Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-[200px] xs:max-w-[240px] sm:max-w-[320px] md:max-w-[400px]"
          >
            {/* Close button - above and to the right */}
            <button
              onClick={handleClose}
              className="absolute -top-8 right-0 z-20 text-white/80 hover:text-gold transition-colors"
              aria-label="Close popup"
            >
              <X className="h-6 w-6" />
            </button>

            {/* Image */}
            <img
              src={openHouseImage}
              alt="Palacio Open House - April 3rd, 2026"
              className="w-full h-auto rounded-lg shadow-xl"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Popup;