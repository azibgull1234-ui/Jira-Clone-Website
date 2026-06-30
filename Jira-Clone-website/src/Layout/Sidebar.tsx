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
      className={`fixed top-16 left-0 bg-[#172B4D] text-white w-64 min-h-screen p-5 transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <h1 className="text-2xl font-bold mb-5">Sidebar</h1>

      <ul className="space-y-2 mt-6">

  <li>
    <a
      href="#"
      className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#344563] hover:text-white transition duration-200"
    >
      <LayoutDashboard size={20} />
      <span>Dashboard</span>
    </a>
  </li>

  <li>
    <a
      href="#"
     className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#344563] hover:text-white transition duration-200"
    >
      <CircleCheckBig size={20} />
      <span>My Issues</span>
    </a>
  </li>

  <li>
    <a
      href="#"
      className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#344563] hover:text-white transition duration-200"
    >
      <FolderKanban size={20} />
      <span>Projects</span>
    </a>
  </li>

  <li>
    <a
      href="#"
      className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#344563] hover:text-white transition duration-200"
    >
      <KanbanSquare size={20} />
      <span>Boards</span>
    </a>
  </li>

  <li>
    <a
      href="#"
      className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#344563] hover:text-white transition duration-200"
    >
      <ListTodo size={20} />
      <span>Backlog</span>
    </a>
  </li>

  <li>
    <a
      href="#"
      className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#344563] hover:text-white transition duration-200"
    >
      <BarChart3 size={20} />
      <span>Reports</span>
    </a>
  </li>

  <li>
    <a
      href="#"
      className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#344563] hover:text-white transition duration-200"
    >
      <Users size={20} />
      <span>People</span>
    </a>
  </li>

  <li>
    <a
      href="#"
      className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#344563] hover:text-white transition duration-200"
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