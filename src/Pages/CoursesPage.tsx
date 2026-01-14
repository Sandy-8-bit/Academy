import React from "react";
import { useFetchCourses } from "@/queries/courseQuery";
import { useSubscribeCourse } from "@/queries/Subscribe";
import type { CourseResponse } from "@/types/courseTypes";



const CoursesSubPage: React.FC = () => {
  const {
    data: courses,
    isLoading,
    isError,
  } = useFetchCourses();

  const {
    mutate: subscribeCourse,
  } = useSubscribeCourse();

  const handleSubscribe = (courseId: string) => {
    subscribeCourse(courseId);
  };

  if (isLoading) {
    return <div className="p-6">Loading courses...</div>;
  }

  if (isError) {
    return <div className="p-6 text-red-500">Failed to load courses</div>;
  }

  if (!courses || courses.length === 0) {
    return <div className="p-6">No courses available</div>;
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Available Courses</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {courses.map((course: CourseResponse) => (
          <div
            key={course.id}
            className="border rounded-lg p-4 flex flex-col justify-between"
          >
            <div>
              <h2 className="text-lg font-semibold">{course.course_name}</h2>

              {course.description && (
                <p className="text-sm text-gray-600 mt-2">
                  {course.description}
                </p>
              )}

              {course.price !== undefined && (
                <p className="mt-3 font-medium">₹ {course.price}</p>
              )}
            </div>

            <button
              className={`mt-4 px-4 py-2 rounded text-white border-black bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
              onClick={() => handleSubscribe(course.id)}
            >
              { "Subscribe"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoursesSubPage;
