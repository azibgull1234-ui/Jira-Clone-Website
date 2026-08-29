import {
  BarChart3,
  CircleCheckBig,
  FolderKanban,
  KanbanSquare,
  LayoutDashboard,
  ListTodo,
  LogOut,
  Settings,
  Users,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface SidebarProps {
  isOpen: boolean;
  onNavigate?: () => void;
}

const navItems = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/issues", label: "My Issues", icon: CircleCheckBig },
  { to: "/projects", label: "Projects", icon: FolderKanban },
  { to: "/boards", label: "Boards", icon: KanbanSquare },
  { to: "/backlog", label: "Backlog", icon: ListTodo },
  { to: "/reports", label: "Reports", icon: BarChart3 },
  { to: "/people", label: "People", icon: Users },
  { to: "/settings", label: "Settings", icon: Settings },
];

const Sidebar = ({ isOpen, onNavigate }: SidebarProps) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    onNavigate?.();
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <aside
      id="app-sidebar"
      className={`fixed top-16 left-0 z-40 flex h-[calc(100vh-4rem)] w-64 flex-col overflow-y-auto bg-linear-to-b from-blue-600 to-teal-950 p-4 text-white transition-transform duration-300 md:p-6 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <nav aria-label="Main" className="flex-1">
        <ul className="mt-2 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  onClick={onNavigate}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-lg p-3 font-medium transition duration-200 ${
                      isActive ? "bg-white/20" : "hover:bg-white/15"
                    }`
                  }
                >
                  <Icon size={20} />
                  <span>{item.label}</span>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>

      <button
        type="button"
        onClick={handleLogout}
        className="mt-4 flex w-full items-center gap-3 rounded-lg p-3 font-medium hover:bg-white/15"
      >
        <LogOut size={20} />
        <span>Logout</span>
      </button>
    </aside>
  );
};

export default Sidebar;
