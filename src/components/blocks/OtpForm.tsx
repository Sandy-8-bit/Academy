import {
  type ComponentProps,
  type FormEvent,
  type MouseEvent,
  useEffect,
  useId,
  useState,
} from "react";
import { createPortal } from "react-dom";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { supabase } from "@/lib/supabase";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { appRoutes } from "@/routes/appRoutes";

type OTPFormProps = ComponentProps<"div"> & {
  onClose?: () => void;
  email: string;
};

export function OTPForm({ className, onClose, email, ...props }: OTPFormProps) {
  const headingId = useId();
  const descriptionId = useId();
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");

  const handleVerify = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (otp.length !== 8) {
      toast.error("Enter the 8-digit code");
      return;
    }

    const { error } = await supabase.auth.verifyOtp({
      email,
      token: otp,
      type: "email",
    });

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("Email verified successfully");
    navigate(appRoutes.home);
  };

  useEffect(() => {
    const { style } = document.body;
    const previousOverflow = style.overflow;
    style.overflow = "hidden";
    return () => {
      style.overflow = previousOverflow;
    };
  }, []);

  const dialogRoot =
    typeof window !== "undefined"
      ? document.getElementById("dialog-root")
      : null;

  if (!dialogRoot) {
    return null;
  }

  const handleOverlayClick = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose?.();
    }
  };

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby={headingId}
      aria-describedby={descriptionId}
      onClick={handleOverlayClick}
    >
      <div
        className={cn(
          "relative mx-auto w-full max-w-md rounded-3xl bg-background shadow-2xl md:max-w-xl",
          className
        )}
        {...props}
      >
        {onClose ? (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-4 top-4 z-10"
            aria-label="Close dialog"
            onClick={onClose}
          >
            <span aria-hidden="true">X</span>
          </Button>
        ) : null}
        <div className="flex flex-col gap-8 rounded-3xl p-6 sm:p-8">
          <Card className="flex-1 overflow-hidden rounded-2xl border-none bg-transparent shadow-none">
            <CardContent className="flex flex-1 flex-col gap-8 p-0">
              <form
                className="flex flex-col items-center justify-center"
                onSubmit={handleVerify}
              >
                <FieldGroup className="w-full max-w-sm space-y-6">
                  <Field className="items-center text-center">
                    <h1 id={headingId} className="text-2xl font-bold">
                      Enter verification code
                    </h1>
                    <p
                      id={descriptionId}
                      className="text-muted-foreground text-sm text-balance"
                    >
                      We sent a 8-digit code to your email
                    </p>
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="otp" className="sr-only">
                      Verification code
                    </FieldLabel>
                    <InputOTP
                      maxLength={8}
                      id="otp"
                      required
                      value={otp}
                      onChange={setOtp}
                      containerClassName="mx-auto flex justify-center gap-3 sm:gap-4"
                    >
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                      </InputOTPGroup>
                      <InputOTPSeparator />
                      <InputOTPGroup>
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                        <InputOTPSlot index={6} />
                        <InputOTPSlot index={7} />
                      </InputOTPGroup>
                    </InputOTP>
                    <FieldDescription className="text-center">
                      Enter the 6-digit code sent to your email.
                    </FieldDescription>
                  </Field>
                  <Field className="flex flex-col gap-3">
                    <Button className="w-full" type="submit">
                      Verify
                    </Button>
                    <FieldDescription className="text-center">
                      Didn&apos;t receive the code? <a href="#">Resend</a>
                    </FieldDescription>
                  </Field>
                </FieldGroup>
              </form>
            </CardContent>
          </Card>
          <FieldDescription className="text-center text-xs text-muted-foreground">
            By clicking continue, you agree to our{" "}
            <a href="#">Terms of Service</a> and
            <a className="ml-1" href="#">
              Privacy Policy
            </a>
            .
          </FieldDescription>
        </div>
      </div>
    </div>,
    dialogRoot
  );
}
