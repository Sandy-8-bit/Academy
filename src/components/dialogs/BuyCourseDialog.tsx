import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { buyCourse } from "@/utils/razorpayHandler";
import { Loader2, X } from "lucide-react";

interface BuyCourseDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  courseId: string;
  courseName: string;
  coursePrice: number;
}

export const BuyCourseDialog = ({
  open,
  onOpenChange,
  courseId,
  courseName,
  coursePrice,
}: BuyCourseDialogProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleBuyCourse = async () => {
    setIsLoading(true);
    try {
      await buyCourse(courseId);
    } finally {
      setIsLoading(false);
      onOpenChange(false);
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-40 bg-black/50" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-full max-w-sm -translate-x-1/2 -translate-y-1/2 border border-gray-200 bg-white p-6 rounded-lg shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <Dialog.Title className="text-lg font-semibold text-gray-900">
              Unlock Course Access
            </Dialog.Title>
            <Dialog.Close className="text-gray-500 hover:text-gray-900 transition-colors">
              <X size={20} />
            </Dialog.Close>
          </div>

          <div className="space-y-3">
            <p className="text-sm text-gray-700">
              You need to purchase{" "}
              <span className="font-semibold">{courseName}</span> to access this
              content.
            </p>

            <div className="rounded-md bg-blue-50 p-3 flex items-center justify-between">
              <span className="text-sm font-medium text-gray-900">
                Course Price:
              </span>
              <span className="text-xl font-bold text-blue-900">
                ₹{coursePrice.toLocaleString()}
              </span>
            </div>
          </div>

          <div className="mt-6 flex gap-3 justify-end">
            <Dialog.Close className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
              Cancel
            </Dialog.Close>
            <button
              onClick={handleBuyCourse}
              disabled={isLoading}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-900 rounded-md hover:bg-blue-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isLoading && <Loader2 size={16} className="animate-spin" />}
              {isLoading ? "Processing..." : "Buy Course"}
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
