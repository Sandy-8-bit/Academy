import { Route, Routes } from "react-router-dom";
import "./App.css";
import { appRoutes } from "./Routes/appRoutes";
import Main from "./Pages/LandingPage/Main";

function App() {
  return (
    <Routes>
      <Route path={appRoutes.landingPage} element={<Main />} />
    </Routes>
  );
}

export default App;
