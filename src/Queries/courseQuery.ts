import axiosInstance from "../utils/axios";
import { useQuery } from "@tanstack/react-query";
import { apiRoutes } from "../routes/apiRoutes";
import type { CourseResponse } from "../types/courseTypes";
import { authHandler } from "@/utils/authHandler";
import { handleApiError } from "@/utils/handleApiError";

interface VideoPlayResponse {
  video_url: string; // adjust based on your backend response
  duration?: number;
}
/* -------------------- GET ALL COURSES -------------------- */
export const useFetchCourses = () => {
  const fetchCourses = async (): Promise<CourseResponse[]> => {
    const token = authHandler();
    try {
      const res = await axiosInstance.get<CourseResponse[]>(apiRoutes.course, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    } catch (error) {
      handleApiError(error, "fetch courses");
    }
  };

  return useQuery({
    queryKey: ["courses"],
    queryFn: fetchCourses,
    staleTime: 1000 * 60 * 5,
  });
};




