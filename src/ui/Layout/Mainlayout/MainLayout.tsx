import { SidebarProvider } from "@/components/ui/sidebar";
import { Outlet } from "react-router-dom";
import { TopNav } from "./TopNav";
import { AppSidebar } from "@/components/layout/AppSideBar";

const MainLayout = () => {
  const userName = "John Doe";
  const formattedDate = "Saturday, 11th November 2022";

  return (
    <SidebarProvider>
      <div className="flex h-screen w-screen overflow-hidden bg-[#FAFAFA]">
        <AppSidebar />

        <section className="flex h-full w-full flex-col overflow-hidden">
          <TopNav userName={userName} formattedDate={formattedDate} />

          <main className="flex-1 overflow-y-auto py-3 pr-3 pb-24 md:pb-0 lg:py-4 lg:pr-4">
            <Outlet />
          </main>
        </section>
      </div>
    </SidebarProvider>
  );
};

export default MainLayout;
