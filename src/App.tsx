import { Route, Routes } from "react-router-dom";
import { appRoutes } from "./routes/appRoutes";

import Main from "./pages/landingPage/Main";
import CourseDetailsPage from "./pages/landingPage/CourseDetails";
import { lazy, Suspense } from "react";
import { Spinner } from "./ui/Layout/Mainlayout/Spinner";
import TierPage from "./pages/myCourses/TierManagement";
import { CourseContentPage } from "./pages/myCourses/CourseContent";
import ProtectedRoute from "./ui/Layout/Mainlayout/ProtectedRoute";
import CoursesSubPage from "./pages/CoursesPage";

/* -------------------------------------------------------------------------- */
/*                                AUTH PAGES                                  */
/* -------------------------------------------------------------------------- */

export const SignInPage = lazy(() => import("./pages/auth/SignInPage"));

export const SignupPage = lazy(() => import("./pages/auth/SignUpPage"));

/* -------------------------------------------------------------------------- */
/*                               MAIN PAGES                                   */
/* -------------------------------------------------------------------------- */

export const HomePage = lazy(() => import("./pages/home/HomePage"));

export const MyCoursesPage = lazy(
  () => import("./pages/myCourses/MyCoursesPage")
);

export const CertificationsPage = lazy(
  () => import("./pages/certifications/CertificationPage")
);

export const ProfilePage = lazy(() => import("./pages/profile/ProfilePage"));

export const SettingsPage = lazy(() => import("./pages/settings/SettingPage"));

/* -------------------------------------------------------------------------- */
/*                                LAYOUTS                                     */
/* -------------------------------------------------------------------------- */

export const LandingPageLayout = lazy(
  () => import("./ui/Layout/LandingLayout/LandingLayout")
);

export const MainLayout = lazy(
  () => import("./ui/Layout/Mainlayout/MainLayout")
);

function App() {
  return (
    <Suspense fallback={<Spinner />}>
      <Routes>
        {/* 🔹 Landing page */}
        <Route path={appRoutes.landingPage} element={<Main />} />

        {/* 🔹 Course details (Landing layout) */}
        <Route
          path={appRoutes.course.children.details}
          element={
            <LandingPageLayout>
              <CourseDetailsPage />
            </LandingPageLayout>
          }
        />

        <Route path={appRoutes.auth.signIn} element={<SignInPage />} />
        <Route path={appRoutes.auth.signUp} element={<SignupPage />} />

        {/* 🔹 Main authenticated layout */}
        <Route element={<MainLayout />}>
          <Route element={<ProtectedRoute />}>
            <Route path={appRoutes.home} element={<HomePage />} />
            <Route
              path={appRoutes.myCourses.path}
              element={<MyCoursesPage />}
            />
            <Route path="/test" element={<CoursesSubPage/>} />
            <Route
              path={appRoutes.certifications.path}
              element={<CertificationsPage />}
            />
            <Route
              path={appRoutes.myCourses.children.courseTier}
              element={<TierPage />}
            />
            <Route
              path={appRoutes.myCourses.children.courseContent}
              element={<CourseContentPage />}
            />
            <Route path={appRoutes.profile.path} element={<ProfilePage />} />
            <Route path={appRoutes.settings.path} element={<SettingsPage />} />
          </Route>
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
