import axiosInstance from "@/utils/axios";
import { loadRazorpay } from "@/utils/loadRazorpay";
import toast from "react-hot-toast";
import { authHandler } from "@/utils/authHandler";

interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  order_id: string;
  name: string;
  description: string;
  handler: (response: RazorpayResponse) => Promise<void>;
  modal: {
    ondismiss: () => void;
  };
  theme: {
    color: string;
  };
}

interface RazorpayResponse {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

interface RazorpayInstance {
  open(): void;
}

declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => RazorpayInstance;
  }
}

export const buyCourse = async (courseId: string) => {
  try {
    const loaded = await loadRazorpay();
    if (!loaded) {
      toast.error("Razorpay SDK failed to load");
      return;
    }

    const token = authHandler();

    // 1️⃣ Create order
    const { data } = await axiosInstance.post(
      `/api/v1/courses/${courseId}/subscribe`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const order = data.order;

    // 2️⃣ Open checkout
    const options: RazorpayOptions = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      order_id: order.id,
      name: "WiseWork Academy",
      description: "Course Purchase",
      handler: async function (response: RazorpayResponse) {
        try {
          // 3️⃣ Verify payment
          await axiosInstance.post(
            `/api/v1/courses/subscribe/verify`,
            {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          toast.success("Payment successful! Access granted.");
          // Reload the page or refetch data
          window.location.reload();
        } catch {
          toast.success(
            "Payment successful. Access will be activated shortly."
          );
          window.location.reload();
        }
      },
      modal: {
        ondismiss: () => {
          console.log("Checkout closed");
        },
      },
      theme: {
        color: "#111827",
      },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  } catch (error) {
    console.error("Error initiating payment:", error);
    toast.error("Failed to initiate payment. Please try again.");
  }
};
