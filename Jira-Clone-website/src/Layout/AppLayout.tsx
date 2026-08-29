import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";

const DESKTOP_QUERY = "(min-width: 768px)";

const getIsDesktop = () =>
  typeof window !== "undefined" && window.matchMedia(DESKTOP_QUERY).matches;

const AppLayout = () => {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(getIsDesktop);

  useEffect(() => {
    const media = window.matchMedia(DESKTOP_QUERY);
    const onChange = (event: MediaQueryListEvent) => {
      setIsSidebarOpen(event.matches);
    };

    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (!getIsDesktop()) {
      setIsSidebarOpen(false);
    }
  }, [location.pathname]);

  const closeSidebarOnMobile = () => {
    if (!getIsDesktop()) {
      setIsSidebarOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f5f7]">
      <Header
        isSidebarOpen={isSidebarOpen}
        onToggleSidebar={() => setIsSidebarOpen((open) => !open)}
      />

      {isSidebarOpen ? (
        <button
          type="button"
          className="fixed top-16 right-0 bottom-0 left-0 z-30 bg-black/40 md:hidden"
          aria-label="Close sidebar"
          onClick={() => setIsSidebarOpen(false)}
        />
      ) : null}

      <Sidebar isOpen={isSidebarOpen} onNavigate={closeSidebarOnMobile} />

      <main
        className={`min-h-screen px-4 pt-20 pb-10 transition-all duration-300 sm:px-6 ${
          isSidebarOpen ? "md:ml-64" : "ml-0"
        }`}
      >
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
