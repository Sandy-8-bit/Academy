import { useState } from "react";
import { motion } from "framer-motion";
import { LayoutTextFlip } from "../../Component/ui/layout-text-flip";
import { useNavigate } from "react-router-dom";
import { appRoutes } from "../../Routes/appRoutes";

interface Course {
  id: number;
  title: string;
  duration: string;
  image: string;
  category: string;
  comingSoon?: boolean;
}

const courses: Course[] = [
  // ------------------------------------------
  // AI PRODUCT DEVELOPMENT CERTIFICATION (3 LEVELS)
  // ------------------------------------------

  {
    id: 1,
    title: "AI Product Development – Associate Level",
    duration: "6 Weeks • Hands-on + Capstone",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1600&q=80",
    category: "Product",
  },

  {
    id: 2,
    title: "AI Product Development – Specialist Level",
    duration: "6 Weeks • Hands-on + Capstone",
    image:
      "https://images.unsplash.com/photo-1551434678-e076c223a692?w=1600&q=80",
    category: "Product",
  },

  {
    id: 3,
    title: "AI Product Development – Professional Level",
    duration: "4 Weeks • Hands-on + Capstone",
    image:
      "https://images.unsplash.com/photo-1556157382-97eda2d62296?w=1600&q=80",
    category: "Product",
  },

  // ------------------------------------------
  // AGENTIC AI SYSTEMS CERTIFICATION (3 LEVELS)
  // ------------------------------------------

  {
    id: 4,
    title: "Agentic AI Systems – Associate Level",
    duration: "6 Weeks • Hands-on + Capstone",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1600&q=80",
    category: "AI",
  },

  {
    id: 5,
    title: "Agentic AI Systems – Specialist Level",
    duration: "6 Weeks • Hands-on + Capstone",
    image:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1600&q=80",
    category: "AI",
  },

  {
    id: 6,
    title: "Agentic AI Systems – Professional Level",
    duration: "4 Weeks • Hands-on + Capstone",
    image:
      "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=1600&q=90",
    category: "AI",
  },

  // ------------------------------------------
  // AI FOR FINANCE — COMING SOON
  // ------------------------------------------

  {
    id: 7,
    title: "AI for Finance Certification",
    duration: "Coming Soon",
    image:
      "https://images.unsplash.com/photo-1569025690938-a00729c9e1f9?w=1600&q=80",
    category: "Finance",
    comingSoon: true,
  },

  // ------------------------------------------
  // AI FOR SECURITY — COMING SOON
  // ------------------------------------------

  {
    id: 8,
    title: "AI for Security Certification",
    duration: "Coming Soon",
    image:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1600&q=80",
    category: "Security",
    comingSoon: true,
  },
];

const categories = [
  "All",
  ...Array.from(new Set(courses.map((course) => course.category))),
];

export default function CoursesSection() {
  const [activeCategory, setActiveCategory] = useState("All");
    const navigate = useNavigate()
  const filteredCourses =
    activeCategory === "All"
      ? courses
      : courses.filter((c) => c.category === activeCategory);

  return (
    <div className="w-full bg-white py-8 px-6 md:px-12">
      <div>
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 cursor-default">
          <LayoutTextFlip
            text=" Training That Drives"
            words={["Responsiblity", "Productivity", "Efficiency"]}
            duration={3000}
          />
        </h2>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-3 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all border cursor-pointer ${
                activeCategory === cat
                  ? "bg-blue-900 text-white border-blue-900 shadow-sm"
                  : "bg-white text-gray-600 border-gray-300 hover:bg-gray-100"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Course Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredCourses.slice(0, 8).map((course) => {
            const isComingSoon = course.comingSoon;

            return (
              <motion.div
                key={course.id}
                whileHover={isComingSoon ? {} : { y: -6 }}
                transition={{ duration: 0.2 }}
                className={`relative bg-white rounded-xl shadow-md transition-all overflow-hidden border border-gray-200 
                  ${
                    isComingSoon
                      ? "opacity-70 pointer-events-none"
                      : "hover:shadow-lg cursor-pointer"
                  }`}
              >
                {/* Coming Soon Badge */}
                {isComingSoon && (
                  <span className="absolute top-3 right-3 bg-blue-900 text-white px-3 py-1 text-xs font-semibold rounded-full shadow">
                    Coming Soon
                  </span>
                )}

                <img
                  src={course.image}
                  alt={course.title}
                  className="h-40 w-full object-cover"
                />

                <div className="p-5">
                  <h3 className="font-semibold text-gray-900 mb-2 text-lg cursor-pointer">
                    {course.title}
                  </h3>

                  <p className="text-gray-500 text-sm mb-4 cursor-default">
                    {course.duration}
                  </p>

                  {/* See Details Button */}
                  {!isComingSoon && (
                    <button onClick={()=>{navigate(`${appRoutes.Courses.path}/${course.id}`)}} className="w-full  py-2 rounded-lg bg-blue-900 text-white text-sm font-medium hover:bg-blue-800 transition cursor-pointer">
                      See Details
                    </button>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* View All Button */}
        <div className="flex justify-center mt-12">
          <button className="px-6 py-2 rounded-full bg-white border border-blue-900 text-blue-900 hover:bg-blue-900 hover:text-white transition-all shadow-sm font-medium cursor-pointer">
            View All Courses
          </button>
        </div>
      </div>
    </div>
  );
}
