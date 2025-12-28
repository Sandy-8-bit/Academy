import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import type { SignUpRequest, SignUpResponse } from "../types/AuthTypes";
import { supabase } from "@/lib/supabase";

/**
 * 🆕 REGISTER USER
 */
export const useRegister = () => {
  const registerUser = async (
    payload: SignUpRequest
  ): Promise<SignUpResponse> => {
    try {
      const res = await supabase.auth.signUp({
        email: payload.email,
        password: payload.password,
        options: {
          data: {
            name: payload.name,
          },
        },
      });

      return res.data.user as SignUpResponse;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Registration failed");
      } else {
        toast.error("Something went wrong while registering");
      }
      throw error;
    }
  };

  return useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      toast.success("Registration Successful");
    },
  });
};
