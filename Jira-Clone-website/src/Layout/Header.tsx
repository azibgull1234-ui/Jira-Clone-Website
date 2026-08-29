import { Bell, CircleHelp, Menu, Settings } from "lucide-react";
import { Link } from "react-router-dom";

interface HeaderProps {
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
}

const Header = ({ isSidebarOpen, onToggleSidebar }: HeaderProps) => {
  return (
    <header className="fixed top-0 right-0 left-0 z-50 flex h-16 items-center justify-between border-b border-gray-200 bg-white px-4 shadow-sm md:px-6">
      <div className="flex items-center gap-3 md:gap-5">
        <button
          type="button"
          className="rounded-lg bg-blue-600 p-2.5 text-white hover:bg-blue-700"
          onClick={onToggleSidebar}
          aria-label={isSidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
          aria-expanded={isSidebarOpen}
          aria-controls="app-sidebar"
        >
          <Menu size={22} />
        </button>

        <Link to="/dashboard" className="flex items-center gap-2">
          <img
            src="https://cdn.worldvectorlogo.com/logos/jira-3.svg"
            alt=""
            className="h-7 w-7"
          />
          <span className="text-xl font-semibold text-gray-800 md:text-2xl">Jira</span>
        </Link>
      </div>

      <div className="flex items-center gap-4 text-gray-600 md:gap-6">
        <button
          type="button"
          className="rounded-lg p-1 hover:text-blue-600"
          aria-label="Help"
        >
          <CircleHelp size={22} />
        </button>

        <button
          type="button"
          className="rounded-lg p-1 hover:text-blue-600"
          aria-label="Notifications"
        >
          <Bell size={22} />
        </button>

        <Link
          to="/settings"
          className="rounded-lg p-1 hover:text-blue-600"
          aria-label="Settings"
        >
          <Settings size={22} />
        </Link>
      </div>
    </header>
  );
};

export default Header;
