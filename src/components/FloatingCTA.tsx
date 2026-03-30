import { motion } from "framer-motion";
import { Link } from "@/lib/router";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

interface FloatingCTAProps {
  mobileOpen?: boolean;
}

const FloatingCTA = ({ mobileOpen }: FloatingCTAProps) => {
  const isMobile = useIsMobile();

  if (!isMobile || mobileOpen) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 20 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 px-4"
    >
      <Link to="/contact">
        <Button variant="gold" size="xl" className="shadow-luxury whitespace-nowrap">
          Book a Quote
        </Button>
      </Link>
    </motion.div>
  );
};

export default FloatingCTA;
