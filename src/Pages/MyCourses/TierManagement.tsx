import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Blocks } from "lucide-react";
import { useFetchTiersByCourse } from "@/queries/tierQuery";
import type { Tier } from "@/types/tierTypes";
import ButtonSm from "@/ui/Common/Button";

const TierPage = () => {
  const { id: courseId } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data, isLoading, isError, refetch } = useFetchTiersByCourse(courseId!);

  // ✅ SAFE fallback
  const tiers = data?.tiers ?? [];

  return (
    <div className="min-h-screen bg-gray-50">


      {/* Content */}
      <section className="p-6 max-w-7xl mx-auto">
        {isError ? (
          <div className="rounded-lg border border-red-200 bg-red-50 p-6 flex flex-col gap-3">
            <p className="font-medium text-red-900">Unable to load tiers.</p>
            <button
              onClick={() => refetch()}
              className="w-fit px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md font-medium transition-colors"
            >
              Try again
            </button>
          </div>
        ) : null}

        {isLoading && (
          <div className="text-center py-12">
            <div className="text-sm text-gray-500">Loading tiers...</div>
          </div>
        )}

        {!isLoading && tiers.length === 0 && !isError && (
          <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 bg-white py-20 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
              <Blocks size={32} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No tiers available
            </h3>
            <p className="max-w-sm text-sm text-gray-600">
              This course doesn't have any tiers yet.
            </p>
          </div>
        )}

        {!isLoading && tiers.length > 0 && (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {tiers.map((tier: Tier) => (
              <article
                key={tier.id}
                className="group rounded-lg border border-gray-200 bg-white shadow-sm transition-all duration-200 hover:shadow-lg hover:border-gray-300 cursor-pointer"
              >
                <div className="p-5">
                  <div className="mb-4 flex items-center justify-between">
                    <span className="inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                      Tier {tier.tier_number}
                    </span>
                  </div>

                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {tier.tier_name}
                  </h3>

                  <p className="line-clamp-2 text-sm text-gray-600 mb-4 leading-relaxed">
                    {tier.description || "No description provided"}
                  </p>

                  <ButtonSm
                  state="default"
                    type="button"
                    onClick={() =>  navigate(`/my-courses/${courseId}/tier/${tier.id}`)}
                    className="w-full inline-flex justify-center items-center gap-2 rounded-md bg-gray-100 px-4 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-200 transition-colors"
                  >
                    View Content →
                  </ButtonSm>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default TierPage;
