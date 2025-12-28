import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { supabase } from "@/lib/supabase";
import type { SignUpRequest } from "@/types/AuthTypes";
import toast from "react-hot-toast";
import { appRoutes } from "@/routes/appRoutes";

interface SignupFormProps extends React.ComponentProps<"form"> {
  className?: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  setIsOtpFormVisible: (visible: boolean) => void;
}
export function SignupForm({
  className,
  setEmail,
  setIsOtpFormVisible,
  ...props
}: SignupFormProps) {
  interface SignUpForm extends SignUpRequest {
    confirmPassword: string;
  }

  const [form, setForm] = useState<SignUpForm>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange =
    (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm((f) => ({ ...f, [key]: e.target.value }));
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    const { error, data } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: {
        data: {
          name: form.name,
        },
      },
    });

    setLoading(false);

    if (error) {
      toast.error(error.message);
      return;
    }

    if (!data.user?.email_confirmed_at) {
      setEmail(form.email);
      setIsOtpFormVisible(true);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={cn("flex flex-col", className)}
      {...props}
    >
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Create your account</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Fill in the form below to create your account
          </p>
        </div>

        <Field>
          <FieldLabel htmlFor="name">Full Name</FieldLabel>
          <Input
            id="name"
            value={form.name}
            onChange={handleChange("name")}
            placeholder="John Doe"
            required
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            id="email"
            type="email"
            value={form.email}
            onChange={handleChange("email")}
            placeholder="m@example.com"
            required
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="password">Password</FieldLabel>
          <Input
            id="password"
            type="password"
            value={form.password}
            onChange={handleChange("password")}
            required
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="confirm-password">Confirm Password</FieldLabel>
          <Input
            id="confirm-password"
            type="password"
            value={form.confirmPassword}
            onChange={handleChange("confirmPassword")}
            required
          />
        </Field>

        {error && <p className="text-sm text-red-500 text-center">{error}</p>}

        <Field>
          <Button type="submit" disabled={loading} className="cursor-pointer">
            {loading ? "Creating account..." : "Create Account"}
          </Button>
        </Field>

        <FieldSeparator>Or continue with</FieldSeparator>

        <Field>
          <Button variant="outline" type="button" className="cursor-pointer">
            {/* Google icon stays */}
            <img width={16} src="/icons/google.svg" alt="google" />
            Sign up with Google
          </Button>

          <FieldDescription className="px-6 text-center">
            Already have an account?{" "}
            <a href={appRoutes.auth.signIn} className="underline">
              Sign in
            </a>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
}
