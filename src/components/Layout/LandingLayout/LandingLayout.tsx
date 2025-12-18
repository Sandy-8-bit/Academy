import React from "react";
import TopNav from "./Topnav";
import Footer from "./Footer";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* TOP NAVIGATION */}
      <TopNav />

      {/* PAGE CONTENT */}
      <main className="grow w-full mx-auto">
        {children} {/* <-- renders whatever you pass inside Layout */}
      </main>

      {/* FOOTER */}
      <Footer />
    </div>
  );
};

export default Layout;
