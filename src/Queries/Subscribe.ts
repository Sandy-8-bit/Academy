import { apiRoutes } from "@/routes/apiRoutes";
import { authHandler } from "@/utils/authHandler";
import axiosInstance from "@/utils/axios";
import { handleApiError } from "@/utils/handleApiError";
import { useMutation } from "@tanstack/react-query";

/**
 * API function
 */
const subscribeCourse = async (courseId: string): Promise<any> => {
  const token = authHandler();

  try {
    const res = await axiosInstance.post(
      `${apiRoutes.subscribe}/${courseId}/subscribe`,
      {}, // no request body
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return res.data;
  } catch (error) {
    handleApiError(error, "subscribe course");
    throw error;
  }
};

/**
 * React Query mutation hook
 */
export const useSubscribeCourse = () =>
  useMutation({
    mutationFn: (courseId: string) => subscribeCourse(courseId),
  });
