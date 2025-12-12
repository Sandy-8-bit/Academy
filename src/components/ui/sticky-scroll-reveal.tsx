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
                  "h-[400px] md:h-[500px] lg:h-[600px] w-full rounded-2xl overflow-hidden shadow-2xl",
                  
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

// Demo Component
export default function Demo() {
  const content: ContentItem[] = [
    {
      title: "ISO Certified Excellence",
      description:
        "Get globally recognized ISO certifications for your business. Our expert team guides you through the entire certification process, ensuring compliance with international standards. Boost your credibility and open doors to new business opportunities.",
      content: (
        <div className="h-full w-full bg-white flex items-center justify-center p-8">
          <img 
            src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80" 
            alt="ISO Certification"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
      ),
    },
    {
      title: "Quick Turnaround Time",
      description:
        "Time is money. We understand that. Our streamlined certification process ensures you get certified faster than traditional methods. With our efficient documentation and expert consultation, achieve your certifications in record time without compromising quality.",
      content: (
        <div className="h-full w-full bg-white flex items-center justify-center p-8">
          <img 
            src="https://images.unsplash.com/photo-1557426272-fc759fdf7a8d?w=800&q=80" 
            alt="Fast Process"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
      ),
    },
    {
      title: "Expert Consultation",
      description:
        "Our team of certified professionals brings years of industry experience. We provide personalized guidance tailored to your business needs. From documentation to audit preparation, we're with you every step of the way to ensure successful certification.",
      content: (
        <div className="h-full w-full bg-white flex items-center justify-center p-8">
          <img 
            src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80" 
            alt="Expert Team"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
      ),
    },
    {
      title: "Affordable Pricing",
      description:
        "Quality certifications shouldn't break the bank. We offer competitive pricing packages designed for businesses of all sizes. Transparent pricing with no hidden costs. Invest in your business growth without the financial burden.",
      content: (
        <div className="h-full w-full bg-white flex items-center justify-center p-8">
          <img 
            src="https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800&q=80" 
            alt="Affordable Services"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
      ),
    },
  ];

  return (
    <div className="w-full bg-white">
      {/* Hero Section */}
      <div className="bg-linear-to-br from-blue-900 to-blue-700 text-white py-20 px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
            Why Choose Us?
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
            Your trusted partner for professional certifications. We make the certification process simple, fast, and affordable.
          </p>
        </div>
      </div>
      
      <StickyScroll content={content} />
    </div>
  );
}