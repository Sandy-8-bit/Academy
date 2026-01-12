import { Outlet } from "react-router-dom";
import SideNav from "./SideNav";

const MainLayout = () => {
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#FAFAFA]">
      {/* Sidebar */}
      <SideNav />

      {/* Main Content */}
      <section className="flex h-full w-full flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto p-3">
          <Outlet />
        </main>
      </section>
    </div>
  );
};

export default MainLayout;
