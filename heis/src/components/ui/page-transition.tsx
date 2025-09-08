import { motion } from "motion/react";
import type { ReactNode } from "react";

interface PageTransitionProps {
  children: ReactNode;
  className?: string;
  stagger?: boolean;
}

export default function PageTransition({
  children,
  className = "",
  stagger = false,
}: PageTransitionProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut" as const,
        staggerChildren: stagger ? 0.1 : 0,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.2,
        ease: "easeIn" as const,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className={className}
    >
      {stagger ? (
        <motion.div variants={itemVariants}>{children}</motion.div>
      ) : (
        children
      )}
    </motion.div>
  );
}
