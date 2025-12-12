import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll } from "framer-motion";

const cn = (...classes: string[]) => classes.filter(Boolean).join(" ");

interface ContentItem {
  title: string;
  description: string;
  content?: React.ReactNode;
}

interface StickyScrollProps {
  content: ContentItem[];
  contentClassName?: string;
}

export const StickyScroll: React.FC<StickyScrollProps> = ({
  content,
  
}) => {
  const [activeCard, setActiveCard] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const backgroundColors = [
    "#ffffff", // white
    "#ffffff", // white
    "#ffffff", // white
  ];

  const linearGradients = [
    "linear-gradient(to bottom right, #1e3a8a, #3b82f6)", // blue-900 to blue-500
    "linear-gradient(to bottom right, #1e40af, #60a5fa)", // blue-800 to blue-400
    "linear-gradient(to bottom right, #1e3a8a, #2563eb)", // blue-900 to blue-600
  ];

  // Calculate which card should be active based on scroll
  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange((latest) => {
      const cardIndex = Math.min(
        Math.floor(latest * content.length),
        content.length - 1
      );
      setActiveCard(cardIndex);
    });
    return () => unsubscribe();
  }, [scrollYProgress, content.length]);

  return (
    <div ref={containerRef} className="relative">
      {/* Sticky container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <motion.div
          className="h-full w-full flex items-center justify-center"
          animate={{
            backgroundColor: backgroundColors[activeCard % backgroundColors.length],
          }}
          transition={{ duration: 0.5 }}
        >
          <div className="max-w-7xl w-full px-8 md:px-12 lg:px-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              {/* Text Content */}
              <motion.div
                key={`content-${activeCard}`}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="space-y-6"
              >
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-blue-900 leading-tight">
                  {content[activeCard].title}
                </h1>
                <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
                  {content[activeCard].description}
                </p>
              </motion.div>

              {/* Visual Content */}
              <motion.div
                key={`visual-${activeCard}`}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                style={{ background: linearGradients[activeCard % linearGradients.length] }}
                className={cn(
                  "h-[400px] md:h-[500px] lg:h-[600px] w-full rounded-2xl overflow-hidden shadow-xl",
                  
                )}
              >
                {content[activeCard].content ?? null}
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll spacers - creates scroll distance for each section */}
      {content.map((_, index) => (
        <div key={index} className="h-screen" />
      ))}
    </div>
  );
};

