import { Route, Routes } from "react-router-dom";
import "./App.css";
import { appRoutes } from "./routes/appRoutes";
import Main from "./Pages/LandingPage/Main";
import Layout from "./components/Layout/LandingLayout/LandingLayout";
import CourseDetailsPage from "./Pages/LandingPage/CourseDetails";

function App() {
  return (
    <Routes>
      <Route path={appRoutes.landingPage} element={<Main />} />
      <Route path={appRoutes.Courses.children.details} element={
        <Layout>
          <CourseDetailsPage/>
        </Layout>
      }/>
    </Routes>
  );
}

export default App;
