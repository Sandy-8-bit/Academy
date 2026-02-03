import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Blocks } from "lucide-react";
import { useFetchTiersByCourse } from "@/queries/tierQuery";
import { useFetchCourses } from "@/queries/courseQuery";
import { BuyCourseDialog } from "@/components/dialogs/BuyCourseDialog";
import type { Tier } from "@/types/tierTypes";
import axios from "axios";

const TierPage = () => {
  const { id: courseId } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data, isLoading, isError, refetch, error } = useFetchTiersByCourse(
    courseId!
  );
  const { data: coursesData } = useFetchCourses();
  const [showBuyDialog, setShowBuyDialog] = useState(false);

  // ✅ SAFE fallback
  const tiers = data?.tiers ?? [];

  // Get current course details for buy dialog
  const currentCourse = coursesData?.find((c) => c.id === courseId);

  // Check if error is 403 (permission denied)
  const is403Error =
    axios.isAxiosError(error) && error.response?.status === 403;

  console.log(is403Error ? "403 error detected" : "No 403 error");
  useEffect(() => {
    if (is403Error) {
      const timer = setTimeout(() => setShowBuyDialog(true), 0);
      return () => clearTimeout(timer);
    }
  }, [is403Error]);

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="">
        {/* Buy Course Dialog */}
        {currentCourse && (
          <BuyCourseDialog
            open={showBuyDialog}
            onOpenChange={setShowBuyDialog}
            courseId={courseId!}
            courseName={currentCourse.course_name}
            coursePrice={currentCourse.price}
          />
        )}

        {/* Error - Permission Denied */}
        {is403Error && !showBuyDialog && (
          <div className="mb-6 rounded-md border border-orange-200 bg-orange-50 px-4 py-3 flex items-center justify-between">
            <p className="text-sm font-medium text-orange-900">
              You need to purchase this course to access its content.
            </p>
            <button
              onClick={() => setShowBuyDialog(true)}
              className="px-3 py-1.5 text-sm font-medium text-orange-700 border border-orange-300 rounded-md hover:bg-orange-100"
            >
              Buy Course
            </button>
          </div>
        )}

        {/* Error - Other Errors */}
        {isError && !is403Error && (
          <div className="mb-6 rounded-md border border-red-200 bg-red-50 px-4 py-3 flex items-center justify-between">
            <p className="text-sm font-medium text-red-900">
              Unable to load tiers.
            </p>
            <button
              onClick={() => refetch()}
              className="px-3 py-1.5 text-sm font-medium text-red-700 border border-red-300 rounded-md hover:bg-red-100"
            >
              Retry
            </button>
          </div>
        )}

        {/* Loading */}
        {isLoading && (
          <div className="py-20 text-center text-sm text-gray-500">
            Loading tiers…
          </div>
        )}

        {/* Empty */}
        {!isLoading && tiers.length === 0 && !isError && (
          <div className="rounded-md border border-gray-200 bg-white p-10 text-center">
            <Blocks size={28} className="mx-auto text-gray-400 mb-3" />
            <h3 className="text-sm font-semibold text-gray-900 mb-1">
              No tiers available
            </h3>
            <p className="text-sm text-gray-600">
              This course does not contain any tiers yet.
            </p>
          </div>
        )}

        {/* Tier List */}
        {!isLoading && tiers.length > 0 && (
          <div className="rounded-md border border-gray-200 bg-white overflow-hidden">
            {/* Header */}
            <div className="grid grid-cols-[80px_1fr_160px] gap-4 px-4 py-3 border-b text-xs font-semibold text-gray-500 uppercase tracking-wide">
              <span>Tier</span>
              <span>Details</span>
              <span className="text-right">Action</span>
            </div>

            {/* Rows */}
            <div className="divide-y">
              {tiers.map((tier: Tier) => (
                <div
                  key={tier.id}
                  className="grid grid-cols-[80px_1fr_160px] gap-4 px-4 py-4 items-center hover:bg-gray-50 transition-colors"
                >
                  {/* Tier Number */}
                  <div className="text-sm font-semibold text-gray-900">
                    {tier.tier_number}
                  </div>

                  {/* Info */}
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900">
                      {tier.tier_name}
                    </h4>
                    <p className="text-sm text-gray-600 line-clamp-2 mt-0.5">
                      {tier.description || "No description provided"}
                    </p>
                  </div>

                  {/* Action */}
                  <div className="text-right">
                    <button
                      onClick={() =>
                        navigate(`/my-courses/${courseId}/tier/${tier.id}`)
                      }
                      className="inline-flex items-center gap-2 text-sm font-medium text-blue-900 hover:underline"
                    >
                      View content →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default TierPage;
