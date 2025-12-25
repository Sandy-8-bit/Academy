"use client";
import React from "react";
import { StickyScroll } from "../../ui/ui/sticky-scroll-reveal";

interface ContentItem {
  title: string;
  description: string;
  content?: React.ReactNode;
}

const content: ContentItem[] = [
  {
    title: "Lifetime Course Access",
    description:
      "Learn at your own pace with lifetime access to all learning modules, updates, and future content. Continue mastering skills without any time limit.",
    content: (
      <div className="h-full w-full bg-white flex items-center justify-center p-8">
        <img
          src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1600&q=90&auto=format"
          alt="Lifetime Learning"
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
    ),
  },

  {
    title: "Weekly Live Industry Sessions",
    description:
      "Engage with industry professionals through weekly live sessions. Get guidance, insights, and real-world knowledge directly from experts.",
    content: (
      <div className="h-full w-full bg-white flex items-center justify-center p-8">
        <img
          src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1600&q=90&auto=format"
          alt="Lifetime Learning"
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
    ),
  },

  {
    title: "Hands-On Industry-Level Projects",
    description:
      "Gain practical expertise by working on real-life industry-level assignments and projects. Build confidence with true hands-on experience.",
    content: (
      <div className="h-full w-full bg-white flex items-center justify-center p-8">
        <img
          src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1600&q=90&auto=format"
          alt="Lifetime Learning"
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
    ),
  },

  {
    title: "Recognized Professional Certification",
    description:
      "Earn a certification that is trusted and valued by top companies. Strengthen your portfolio with credentials that accelerate your career.",
    content: (
      <div className="h-full w-full bg-white flex items-center justify-center p-8">
        <img
          src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1600&q=90&auto=format"
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
    ),
  },
];

export function WhyChooseUs() {
  return (
    <div id="why" className="w-full ">
      {/* Modern Theme Header — MATCHES THE SCREENSHOT */}
      <div className="bg-white pt-5 px-4 md:px-8  border-gray-200">
        <div className="  text-center">
          {/* Heading with blue highlight effect */}
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight mb-4">
            <span>Why Choose Us ? </span>
            {/* <span className="bg-blue-900 text-white px-2 py-1 rounded">
              Us?
            </span> */}
          </h1>

          {/* Minimal description */}
          <p className="text-gray-600 text-[13px] md:text-lg text-center">
            Your trusted partner for professional certifications — built on
            expertise, transparency, and results-driven processes.
          </p>
        </div>
      </div>

      {/* Sticky Scroll Section */}
      <StickyScroll content={content} />
    </div>
  );
}
