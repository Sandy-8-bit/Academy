import { Outlet } from "react-router-dom";
import SideNav from "./SideNav";
import { useEffect } from "react";
import { useFetchUserMe } from "@/queries/userQuery";

const MainLayout = () => {
    const { data, isLoading } = useFetchUserMe();

  // 👉 Store user details in localStorage once fetched
  useEffect(() => {
    if (data?.data) {
      localStorage.setItem("userMe", JSON.stringify(data.data));
    }
  }, [data]);
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
