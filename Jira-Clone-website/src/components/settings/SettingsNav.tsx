import {
  Bell,
  Shield,
  SlidersHorizontal,
  User,
  UserCog,
  type LucideIcon,
} from "lucide-react";
import type { SettingsSectionId } from "./types";

const NAV_ITEMS: { id: SettingsSectionId; label: string; icon: LucideIcon }[] = [
  { id: "profile", label: "Profile", icon: User },
  { id: "account", label: "Account", icon: UserCog },
  { id: "preferences", label: "Preferences", icon: SlidersHorizontal },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "security", label: "Security", icon: Shield },
];

interface SettingsNavProps {
  active: SettingsSectionId;
  onSelect: (id: SettingsSectionId) => void;
}

const SettingsNav = ({ active, onSelect }: SettingsNavProps) => (
  <nav
    aria-label="Settings"
    className="flex gap-2 overflow-x-auto lg:w-56 lg:shrink-0 lg:flex-col lg:overflow-visible"
  >
    {NAV_ITEMS.map((item) => {
      const Icon = item.icon;
      const isActive = item.id === active;
      return (
        <button
          key={item.id}
          type="button"
          onClick={() => onSelect(item.id)}
          className={`flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium whitespace-nowrap ${
            isActive
              ? "bg-blue-50 text-blue-700"
              : "text-gray-600 hover:bg-white hover:text-gray-900"
          }`}
        >
          <Icon size={18} />
          {item.label}
        </button>
      );
    })}
  </nav>
);

export default SettingsNav;
