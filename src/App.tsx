import { Route, Routes } from "react-router-dom";
import "./App.css";
import { appRoutes } from "./routes/appRoutes";

import Main from "./Pages/LandingPage/Main";
import CourseDetailsPage from "./Pages/LandingPage/CourseDetails";

import Layout from "./components/Layout/LandingLayout/LandingLayout";
import MainLayout from "./components/Layout/Mainlayout/MainLayout";

// Pages
import Home from "./Pages/Home/HomePage";
import MyCourses from "./Pages/MyCourses/MyCoursesPage";
import Certifications from "./Pages/Certifications/CertificationPage";
import Profile from "./Pages/Profile/ProfilePage";
import Settings from "./Pages/Settings/SettingPage";

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
