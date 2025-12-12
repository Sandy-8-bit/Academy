
import { useEffect } from "react";
import ButtonSm from "../../Component/Common/Button";
import { courseData

 } from "../../Utils/courseData";
 import { useNavigate } from "react-router-dom";

export default function CourseDetailsPage() {
useEffect(() => {
  window.scrollTo(0, 0);
}, []);
const navigate = useNavigate();

  return (
    <div className="w-full bg-white text-gray-900 min-h-screen">

      {/* HERO SECTION */}
<header className="bg-blue-900 text-white py-10 px-6 md:px-16">
  <div className="">

    {/* BACK BUTTON */}
    <div className="">
  <div className="mb-6">
  <ButtonSm
    text="← Back"
    state="outline"
    onClick={() => navigate(-1)}
    className="!border-white !text-white hover:!bg-white hover:!text-blue-900"
  />
</div>

    </div>

    <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
      {courseData.title}
    </h1>

    <p className="max-w-3xl text-lg md:text-xl text-blue-100 leading-relaxed mb-10">
      {courseData.description}
    </p>

    <div className="flex flex-wrap gap-4">
      <ButtonSm text="Enroll Now" state="default" className="!bg-white !text-blue-900 hover:!bg-gray-100" />
      <ButtonSm text="Download Syllabus" state="outline" className="!border-white !text-white hover:!bg-white hover:!text-blue-900" />
    </div>
  </div>
</header>

      {/* WHAT YOU WILL LEARN */}
      <section className="py-20 px-6 md:px-16 bg-white">
        <div className="">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-blue-900">
            What You Will Learn
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {courseData.whatYouWillLearn.map((item, index) => (
              <div
                key={index}
                className="group p-6 bg-white border-2 border-gray-200 rounded-xl hover:border-blue-900 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="w-6 h-6 bg-blue-900 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-lg text-gray-800 leading-relaxed">{item}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COURSE INCLUDES */}
      <section className="py-20 px-6 md:px-16 bg-gray-50">
        <div className="">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-blue-900">
            This Course Includes
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {courseData.courseIncludes.map((item, index) => (
              <div
                key={index}
                className="p-6 bg-white border-2 border-blue-900 rounded-xl text-blue-900 font-semibold text-center hover:bg-blue-900 hover:text-white transition-all duration-300 cursor-pointer"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WEEKLY CURRICULUM - NEW GRID DESIGN */}
      <section className="py-20 px-6 md:px-16 bg-white">
        <div className="">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-blue-900">
            Course Curriculum
          </h2>
          <p className="text-gray-600 text-lg mb-12">
            A comprehensive 6-week journey from fundamentals to mastery
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courseData.weeklyCurriculum.map((week, index) => (
              <div
                key={index}
                className="group bg-white border-2 border-gray-200 rounded-xl overflow-hidden hover:border-blue-900 hover:shadow-xl transition-all duration-300"
              >
                {/* Week Header */}
                <div className="bg-blue-900 text-white p-6">
                  <div className="text-4xl font-bold mb-2">
                    {String(index + 1).padStart(2, '0')}
                  </div>
                  <h3 className="text-xl font-bold">{week.week.split(': ')[1]}</h3>
                  <p className="text-blue-200 text-sm mt-2">{week.description}</p>
                </div>

                {/* Week Content */}
                <div className="p-6 bg-white">
                  <ul className="space-y-3">
                    {week.days.map((day, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-gray-700">
                        <div className="w-1.5 h-1.5 bg-blue-900 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-sm leading-relaxed">{day}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <footer className="py-20 px-6 md:px-16 bg-blue-900 text-white text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Start Your Journey Today
          </h2>

          <p className="text-blue-100 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
            Gain the industry-ready skills to build AI-powered products and become a certified AI Product Engineer.
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <ButtonSm text="Enroll Now" state="default" className="text-lg px-10 py-4 !bg-white !text-blue-900 hover:!bg-gray-100" />
            <ButtonSm text="Contact Us" state="outline" className="text-lg px-10 py-4 !border-white !text-white hover:!bg-white hover:!text-blue-900" />
          </div>
        </div>
      </footer>
    </div>
  );
}