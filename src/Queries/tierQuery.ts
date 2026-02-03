import axiosInstance from "../utils/axios";
import toast from "react-hot-toast";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { TierGet, TierPost, Tier } from "../types/tierTypes";
import { authHandler } from "@/utils/authHandler";
import { handleApiError } from "@/utils/handleApiError";

/* -------------------- GET TIERS BY COURSE -------------------- */
export const useFetchTiersByCourse = (courseId: string) => {
  const fetchTiers = async (): Promise<TierGet> => {
    const token = authHandler();

    try {
      const res = await axiosInstance.get<TierGet>(
        `/api/v1/courses/${courseId}/tiers`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res.data;
    } catch (error) {
      // Re-throw without showing toast - let component handle it
      throw error;
    }
  };

  return useQuery({
    queryKey: ["tiers", courseId],
    queryFn: fetchTiers,
    enabled: !!courseId,
    retry: false,
  });
};
