import {
  Menu,
  Search,
  Bell,
  CircleHelp,
  Settings,
} from "lucide-react";
import Sidebar from "./Sidebar";

interface NavbarProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (value: boolean) => void;
}

const Navbar = ({ isMenuOpen, setIsMenuOpen }: NavbarProps) => {

  return (
    <>
   
    <header className="h-16 border-b bg-white flex items-center justify-between px-6 shadow-sm">
      {/* Left Section */}
      <div className="flex items-center gap-5">
        <button className="flex items-center gap-3 p-3 rounded-lg bg-blue-600 text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <Menu size={22} />
        </button>

        <div className="flex items-center gap-2">
          <img
            src="https://cdn.worldvectorlogo.com/logos/jira-3.svg"
            alt="Jira"
            className="w-7 h-7"
          />

          <h1 className="text-2xl font-semibold text-gray-800">
            Jira
          </h1>
        </div>

        <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md font-medium">
          + Create
        </button>
      </div>

      {/* Search */}
      <div className="w-[45%] relative">
        <Search
          className="absolute left-3 top-3 text-gray-400"
          size={18}
        />

        <input
          type="text"
          placeholder="Search issues, projects, people..."
          className="w-full border rounded-lg py-2.5 pl-10 pr-4 outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-6">
        <CircleHelp
          size={22}
          className="cursor-pointer text-gray-600 hover:text-blue-600"
        />

        <Bell
          size={22}
          className="cursor-pointer text-gray-600 hover:text-blue-600"
        />

        <Settings
          size={22}
          className="cursor-pointer text-gray-600 hover:text-blue-600"
        />
      </div>
    </header>
    {/* Sidebar */}
      <Sidebar isOpen={isMenuOpen} />
      </>
  );
};

export default Navbar;