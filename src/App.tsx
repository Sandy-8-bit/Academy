import { Route, Routes } from "react-router-dom";
import "./App.css";
import { appRoutes } from "./routes/appRoutes";

import Main from "./pages/landingPage/Main";
import CourseDetailsPage from "./pages/landingPage/CourseDetails";

import Layout from "./components/Layout/LandingLayout/LandingLayout";
import MainLayout from "./components/Layout/Mainlayout/MainLayout";

// Pages
import Home from "./pages/home/HomePage";
import MyCourses from "./pages/myCourses/MyCoursesPage";
import Certifications from "./pages/certifications/CertificationPage";
import Profile from "./pages/profile/ProfilePage";
import Settings from "./pages/settings/SettingPage";

function App() {
  return (
    <Routes>
      {/* 🔹 Landing page */}
      <Route path={appRoutes.landingPage} element={<Main />} />

      {/* 🔹 Course details (Landing layout) */}
      <Route
        path={appRoutes.Courses.children.details}
        element={
          <Layout>
            <CourseDetailsPage />
          </Layout>
        }
      />

      {/* 🔹 Main authenticated layout */}
      <Route element={<MainLayout />}>
        <Route path={appRoutes.home} element={<Home />} />
        <Route path={appRoutes.myCourses.path} element={<MyCourses />} />
        <Route
          path={appRoutes.certifications.path}
          element={<Certifications />}
        />
        <Route path={appRoutes.profile.path} element={<Profile />} />
        <Route path={appRoutes.settings.path} element={<Settings />} />
      </Route>
    </Routes>
  );
}

export default App;
