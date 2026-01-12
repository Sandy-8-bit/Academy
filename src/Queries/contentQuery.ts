import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/utils/axios";
import { authHandler } from "@/utils/authHandler";
import { handleApiError } from "@/utils/handleApiError";
import { type TierContentsResponse } from "@/types/courseContent";
import { apiRoutes } from "@/routes/apiRoutes";

export type UpdateTierContentPayload =
  | {
      module_type: "video";
      week?: number;
      day?: number;
      video: {
        title: string;
        description: string;
        video_url: string;
        thumbnail_url: string;
        duration: number;
      };
    }
  | {
      module_type: "test";
      week?: number;
      day?: number;
      test: {
        title: string;
        test_duration: number;
        quizzes: Array<{
          question: string;
          choices: string[];
          answer: string[];
          isMultiChoice: boolean;
        }>;
      };
    };

interface VideoPlayResponse {
  video_url: string; // adjust based on your backend response
  duration?: number;
}

/* -------------------- GET TIER CONTENTS -------------------- */
export const useFetchTierContents = (tierId: string | undefined) => {
  const fetchTierContents = async (): Promise<TierContentsResponse> => {
    const token = authHandler();

    try {
      const res = await axiosInstance.get<TierContentsResponse>(
        `${apiRoutes.contentById}/${tierId}/contents`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return res.data;
    } catch (error) {
      handleApiError(error, "fetch tier contents");
    }
  };

  return useQuery({
    queryKey: ["tier-contents", tierId],
    queryFn: fetchTierContents,
    enabled: !!tierId && tierId !== undefined,
  });
};

// play video query

export const useFetchVideoPlayUrl = (videoId: string | undefined) => {
  const fetchVideoPlayUrl = async (): Promise<VideoPlayResponse> => {
    const token = authHandler();

    try {
      const res = await axiosInstance.get<VideoPlayResponse>(
        `${apiRoutes.mediaViewUrl}/${videoId}/play`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return res.data;
    } catch (error) {
      handleApiError(error, "fetch video play url");
    }
  };

  return useQuery({
    queryKey: ["video-play", videoId],
    queryFn: fetchVideoPlayUrl,
    enabled: !!videoId,
    retry: 1,
    staleTime: 1000 * 60 * 5, // cache for 5 minutes
  });
};
