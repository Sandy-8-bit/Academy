import { useNavigate } from "react-router-dom";
import { BookOpen, Clock3 } from "lucide-react";
import { useFetchCourses } from "@/queries/courseQuery";
import type { CourseResponse } from "@/types/courseTypes";

const MyCourses = () => {
  const navigate = useNavigate();

  const { data: courses = [], isLoading, isError, refetch } = useFetchCourses();

  const formatDate = (value: string): string => {
    try {
      return new Intl.DateTimeFormat(undefined, {
        month: "short",
        day: "numeric",
        year: "numeric",
      }).format(new Date(value));
    } catch {
      return "--";
    }
  };

  const CourseCard = ({ course }: { course: CourseResponse }) => {
    const priceLabel = course.price || 0;
    const hasThumbnail = Boolean(course.thumbnail_url?.trim());

    const handleCardClick = () => {
      navigate(`/my-courses/tier/${course.id}`);
    };

    return (
      <article
        role="button"
        tabIndex={0}
        onClick={handleCardClick}
        onKeyDown={(event: React.KeyboardEvent) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            handleCardClick();
          }
        }}
        className="group relative cursor-pointer rounded-lg border border-gray-200 bg-white shadow-sm transition-all duration-200 hover:shadow-lg hover:border-gray-300"
      >
        <div className="relative h-48 w-full overflow-hidden rounded-t-lg bg-gradient-to-br from-gray-100 to-gray-200">
          {hasThumbnail ? (
            <img
              src={course.thumbnail_url}
              alt={course.course_name}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
              onError={(e) => {
                e.currentTarget.src = "/images/course-placeholder.png";
              }}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
              <BookOpen className="h-12 w-12 text-gray-300" />
            </div>
          )}

          <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-md bg-white/95 backdrop-blur-sm px-2.5 py-1 text-xs font-semibold text-gray-700 shadow-md">
            <Clock3 className="h-3.5 w-3.5 text-gray-500" />
            {course.total_hours} hrs
          </div>
        </div>

        <div className="flex flex-col gap-3 p-4">
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-1 line-clamp-2">
              {course.course_name}
            </h3>
            <p className="text-xs text-gray-500">
              Published {formatDate(course.created_at)}
            </p>
          </div>

          <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
            {course.description || "No description provided."}
          </p>

          <div className="flex items-center justify-between pt-3 border-t border-gray-100">
            <span className="text-lg font-bold text-gray-900">
              ₹{priceLabel}
            </span>
            <span className="inline-flex items-center rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700">
              Active
            </span>
          </div>
        </div>
      </article>
    );
  };

  const renderSkeletons = () => (
    <>
      {[...Array(3)].map((_, index) => (
        <div
          key={`skeleton-${index}`}
          className="animate-pulse rounded-lg border border-gray-200 bg-white overflow-hidden shadow-sm"
        >
          <div className="h-48 w-full bg-gray-200" />
          <div className="p-4 space-y-3">
            <div className="h-5 w-3/4 rounded bg-gray-200" />
            <div className="h-3 w-1/2 rounded bg-gray-200" />
            <div className="h-4 w-full rounded bg-gray-200" />
            <div className="h-4 w-5/6 rounded bg-gray-200" />
            <div className="flex justify-between pt-2">
              <div className="h-6 w-20 rounded bg-gray-200" />
              <div className="h-6 w-24 rounded bg-gray-200" />
            </div>
          </div>
        </div>
      ))}
    </>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <section className="p-4">
        {isError ? (
          <div className="rounded-lg border border-red-200 bg-red-50 p-6 flex flex-col gap-3">
            <p className="font-medium text-red-900">Unable to load courses.</p>
            <button
              onClick={() => refetch()}
              className="w-fit px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md font-medium transition-colors"
            >
              Try again
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {isLoading && renderSkeletons()}
            {!isLoading && courses.length === 0 && (
              <div className="col-span-full rounded-lg border border-dashed border-gray-300 bg-white p-12 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                  <BookOpen className="h-8 w-8 text-gray-400" />
                </div>
                <p className="text-lg font-semibold text-gray-900 mb-2">
                  No courses yet
                </p>
                <p className="text-sm text-gray-600">
                  You haven't enrolled in any courses yet. Explore the course
                  catalog to get started.
                </p>
              </div>
            )}
            {!isLoading &&
              courses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default MyCourses;
