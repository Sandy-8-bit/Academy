/* eslint-disable react-hooks/set-state-in-effect */
import React, { useState, useEffect, useCallback, useMemo } from "react";
import { motion } from "motion/react";
import { Home, BookOpen, Award, User, Settings, LogOut } from "lucide-react";
import { appRoutes } from "../../../routes/appRoutes";
import ButtonSm from "@/ui/Common/Button";

type NavigationSection = "main" | "orders" | "settings";

interface NavigationItem {
  label: string;
  path: string;
  icon: React.ReactNode;
  section: NavigationSection;
}

const NAVIGATION_SECTIONS: Array<{ title: string; key: NavigationSection }> = [
  { title: "Main Menu", key: "main" },
  { title: "Order Management", key: "orders" },
  { title: "Settings", key: "settings" },
];

const SideNav: React.FC = () => {
  const [activeRoute, setActiveRoute] = useState<string>("");
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);

  useEffect(() => {
    setActiveRoute(window.location.pathname);
  }, []);

  const navigateToRoute = useCallback((route: string) => {
    setActiveRoute(route);
    window.history.pushState({}, "", route);
    window.dispatchEvent(new PopStateEvent("popstate"));
  }, []);

  const isRouteActive = (route: string) => activeRoute === route;

  const navigationItems: NavigationItem[] = useMemo(
    () => [
      {
        label: "Home",
        path: appRoutes.home,
        icon: <Home className="h-6 w-6" />,
        section: "main",
      },
      {
        label: "My Courses",
        path: appRoutes.myCourses.path,
        icon: <BookOpen className="h-6 w-6" />,
        section: "main",
      },
      {
        label: "Certifications",
        path: appRoutes.certifications.path,
        icon: <Award className="h-6 w-6" />,
        section: "main",
      },
      {
        label: "Profile",
        path: appRoutes.profile.path,
        icon: <User className="h-6 w-6" />,
        section: "settings",
      },
      {
        label: "Settings",
        path: appRoutes.settings.path,
        icon: <Settings className="h-6 w-6" />,
        section: "settings",
      },
    ],
    []
  );

  const handleLogout = useCallback(() => {
  try {
    /* =========================
       1. Local Storage
    ========================== */
    localStorage.removeItem("token-dmif");
    localStorage.removeItem("user");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("auth");
    localStorage.removeItem("persist:root"); // redux-persist (if used)

    /* =========================
       2. Session Storage
    ========================== */
    sessionStorage.clear();

    /* =========================
       3. Cookies (Client-side)
       Clears ALL cookies for current domain
    ========================== */
    document.cookie.split(";").forEach((cookie) => {
      const cookieName = cookie.split("=")[0].trim();

      // Clear for current path
      document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;

      // Clear for domain (covers subdomains)
      document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=${window.location.hostname}`;
    });

    /* =========================
       4. Clear Browser Cache (SPA safe)
       Optional but useful
    ========================== */
    if ("caches" in window) {
      caches.keys().then((names) => {
        names.forEach((name) => caches.delete(name));
      });
    }

    /* =========================
       5. Redirect to Landing Page
    ========================== */
    window.location.replace(appRoutes.landingPage);
  } catch (error) {
    console.error("Logout error:", error);
    window.location.replace(appRoutes.landingPage);
  }
}, []);


  const toggleExpansion = () => setIsExpanded((prev) => !prev);

  return (
    <div
      style={{ zoom: 0.85 }}
      className="floating-container border-r-gray border-1 relative flex min-h-[125vh] bg-[#FAFAFA] transition-all duration-300"
    >
      <motion.section
        className={`flex h-[115vh] flex-col gap-4 overflow-hidden bg-[#FAFAFA] px-2.5 pt-4 transition-all duration-300 select-none ${
          isExpanded ? "w-[280px]" : "w-[100px]"
        }`}
        animate={{ x: 0, opacity: 1 }}
      >
        {/* Header */}
        <motion.div
          className={`mt-1 flex w-full items-center ${
            isExpanded
              ? "justify-between gap-3 rounded-xl border-2 border-[#eeeeee] bg-white p-2"
              : "flex-col gap-3"
          } px-1.5`}
        >
          <img
            src="/logo.webp"
            onClick={toggleExpansion}
            className={`${
              isExpanded ? "h-14 w-14" : "h-16 w-16"
            } self-center cursor-pointer`}
          />

          {isExpanded && (
            <div className="flex w-full flex-col">
              <span className="text-md min-w-max font-semibold text-slate-900">
                DMIF Certification
              </span>
              <span className="text-sm text-slate-500">User</span>
            </div>
          )}

          {/* KEEP THIS BUTTON AS-IS */}
          <button
            type="button"
            onClick={toggleExpansion}
            aria-label="Collapse navigation"
            className={`mr-2 cursor-pointer rounded-sm border-2 border-[#F1F1F1] p-1 text-slate-400 transition hover:text-slate-600 ${
              isExpanded ? "" : "rotate-180"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="11 17 6 12 11 7" />
              <polyline points="18 17 13 12 18 7" />
            </svg>
          </button>
        </motion.div>

        {/* Navigation */}
        <motion.div className="flex h-full w-full flex-col overflow-y-auto">
          <div
            className={`flex w-full flex-col ${
              isExpanded ? "gap-0" : "items-center gap-0"
            }`}
          >
            {NAVIGATION_SECTIONS.map(({ title, key }) => {
              const sectionItems = navigationItems.filter(
                (item) => item.section === key
              );

              if (!sectionItems.length) return null;

              return (
                <React.Fragment key={key}>
                  {isExpanded && (
                    <h4 className="my-3 mt-2 px-3 text-sm font-medium text-slate-500">
                      {title}
                    </h4>
                  )}

                  {sectionItems.map((item) => (
                    <NavigationButton
                      key={item.path}
                      labelName={item.label}
                      isActive={isRouteActive(item.path)}
                      icon={item.icon}
                      onClick={() => navigateToRoute(item.path)}
                      isExpanded={isExpanded}
                    />
                  ))}
                </React.Fragment>
              );
            })}
          </div>

          {/* Logout */}
          <button
            onClick={() => setShowLogoutPopup(true)}
            className={`mt-auto w-full cursor-pointer rounded-[12px] border-2 border-transparent text-red-600 transition-all duration-300 ${
              isExpanded
                ? "flex items-center justify-start gap-3 px-3 py-2 hover:border-[#eeeeee] hover:bg-white"
                : "flex flex-col items-center px-1.5 py-2"
            }`}
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-[10px] text-red-500">
              <LogOut className="h-5 w-5" />
            </div>
            <span className="font-semibold">Logout</span>
          </button>
          {showLogoutPopup && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="w-[440px] rounded-xl bg-white p-5 shadow-xl"
              >
                <h3 className="text-lg font-semibold text-slate-900">
                  Confirm Logout
                </h3>

                <p className="mt-2 text-sm text-slate-600">
                  Are you sure you want to log out of your account?
                </p>

                <div className="mt-5 flex justify-end gap-3">
                  <ButtonSm
                    onClick={() => setShowLogoutPopup(false)}
                    state="outline"
                  >
                    Cancel
                  </ButtonSm>

                  <ButtonSm
                    onClick={handleLogout}
                    state="danger"
                  >
                    Logout
                  </ButtonSm>
                </div>
              </motion.div>
            </motion.div>
          )}
        </motion.div>
      </motion.section>
    </div>
  );
};

export default SideNav;

/* ---------------- Navigation Button ---------------- */

interface NavigationButtonProps {
  labelName: string;
  isActive: boolean;
  icon: React.ReactNode;
  onClick?: () => void;
  isExpanded: boolean;
}

const NavigationButton: React.FC<NavigationButtonProps> = ({
  labelName,
  isActive,
  icon,
  onClick,
  isExpanded,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`Navigation-button-container w-full cursor-pointer rounded-[12px] border-2 border-transparent transition-all duration-300 ease-in-out ${
        isExpanded
          ? `flex  items-center justify-start gap-3 px-3 py-2 ${
              isActive ? "border-[#eeeeee] bg-blue-900 text-white" : ""
            }`
          : "flex scale-90 flex-col items-center px-1.5 py-2 text-center"
      }`}
    >
      <div
        className={`flex items-center justify-center rounded-[10px] transition-all ${
          isExpanded
            ? "h-11 w-11 bg-white/20"
            : `mb-1 h-12 w-12 ${isActive ? "bg-blue-900 text-white" : ""}`
        }`}
      >
        {icon}
      </div>

      <span
        className={`${isExpanded ? "text-base" : "text-sm"} ${
          isExpanded && isActive ? "text-white" : "text-slate-700"
        } font-medium`}
      >
        {labelName}
      </span>
    </button>
  );
};
