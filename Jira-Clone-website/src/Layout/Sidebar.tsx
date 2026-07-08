import {
  LayoutDashboard,
  CircleCheckBig,
  FolderKanban,
  KanbanSquare,
  ListTodo,
  BarChart3,
  Users,
  Settings,
} from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
}

const Sidebar = ({ isOpen }: SidebarProps) => {
  return (
    <div
      className={`fixed top-16 left-0 bg-linear-to-b from-blue-600 to-teal-950 text-white w-64 min-h-screen p-6 transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <ul className="space-y-1 mt-4">

  <li>
    <a
      href="#"
      className="flex items-center gap-3 p-3 rounded-lg hover:bg-white hover:bg-opacity-20 transition duration-200 font-medium"
    >
      <LayoutDashboard size={20} />
      <span>Dashboard</span>
    </a>
  </li>

  <li>
    <a
      href="#"
     className="flex items-center gap-3 p-3 rounded-lg hover:bg-white hover:bg-opacity-20 transition duration-200 font-medium"
    >
      <CircleCheckBig size={20} />
      <span>My Issues</span>
    </a>
  </li>

  <li>
    <a
      href="#"
      className="flex items-center gap-3 p-3 rounded-lg hover:bg-white hover:bg-opacity-20 transition duration-200 font-medium"
    >
      <FolderKanban size={20} />
      <span>Projects</span>
    </a>
  </li>

  <li>
    <a
      href="#"
      className="flex items-center gap-3 p-3 rounded-lg hover:bg-white hover:bg-opacity-20 transition duration-200 font-medium"
    >
      <KanbanSquare size={20} />
      <span>Boards</span>
    </a>
  </li>

  <li>
    <a
      href="#"
      className="flex items-center gap-3 p-3 rounded-lg hover:bg-white hover:bg-opacity-20 transition duration-200 font-medium"
    >
      <ListTodo size={20} />
      <span>Backlog</span>
    </a>
  </li>

  <li>
    <a
      href="#"
      className="flex items-center gap-3 p-3 rounded-lg hover:bg-white hover:bg-opacity-20 transition duration-200 font-medium"
    >
      <BarChart3 size={20} />
      <span>Reports</span>
    </a>
  </li>

  <li>
    <a
      href="#"
      className="flex items-center gap-3 p-3 rounded-lg hover:bg-white hover:bg-opacity-20 transition duration-200 font-medium"
    >
      <Users size={20} />
      <span>People</span>
    </a>
  </li>

  <li>
    <a
      href="#"
      className="flex items-center gap-3 p-3 rounded-lg hover:bg-white hover:bg-opacity-20 transition duration-200 font-medium"
    >
      <Settings size={20} />
      <span>Settings</span>
    </a>
  </li>

</ul>
    </div>
  );
};

export default Sidebar;