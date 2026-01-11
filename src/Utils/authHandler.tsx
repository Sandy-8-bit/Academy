import { appRoutes } from "@/routes/appRoutes";
import { toast } from "react-hot-toast";

// eslint-disable-next-line react-refresh/only-export-components
export function authHandler() {
  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("token="))
    ?.split("=")[1];

  if (!token) {
    HandleUnauthorized();
  }

  return token;
}

export function HandleUnauthorized() {
  const currentPath = window.location.pathname + window.location.search;

  const redirectPath = `${appRoutes.auth.signIn}?redirect=${encodeURIComponent(
    currentPath
  )}`;

  // Optional toast before redirect
  toast.error("Unauthorized. Please login again.");
  setTimeout(() => {
    window.location.href = redirectPath;
  }, 500);

  // return () => {

  //   setTimeout(() => {
  //     const currentPath = location.pathname + location.search;
  //     const redirectPath = `${appRoutes.signInPage}?redirect=${encodeURIComponent(currentPath)}`;
  //     navigate(redirectPath, { replace: true });
  //   }, 8000);
  // };
}
