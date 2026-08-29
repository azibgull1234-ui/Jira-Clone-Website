import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import AccountSection from "./AccountSection";
import NotificationsSection from "./NotificationsSection";
import PreferencesSection from "./PreferencesSection";
import ProfileSection from "./ProfileSection";
import SecuritySection from "./SecuritySection";
import SettingsNav from "./SettingsNav";
import { loadSettings, saveSettings } from "./settingsService";
import type {
  AccountSettings,
  NotificationSettings,
  PreferenceSettings,
  ProfileSettings,
  SettingsSectionId,
  UserSettings,
} from "./types";

const applyTheme = (theme: PreferenceSettings["theme"]) => {
  const root = document.documentElement;
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const resolved = theme === "system" ? (prefersDark ? "dark" : "light") : theme;
  root.setAttribute("data-theme", resolved);
};

const SettingsPage = () => {
  const { currentUser, logout, updateProfile } = useAuth();
  const navigate = useNavigate();
  const [settings, setSettings] = useState<UserSettings>(() =>
    loadSettings(currentUser?.fullName ?? "User", currentUser?.email ?? "")
  );
  const [section, setSection] = useState<SettingsSectionId>("profile");
  const [preferencesSaved, setPreferencesSaved] = useState(false);
  const [notificationsSaved, setNotificationsSaved] = useState(false);

  useEffect(() => {
    applyTheme(settings.preferences.theme);
  }, [settings.preferences.theme]);

  const persist = (next: UserSettings) => {
    setSettings(next);
    saveSettings(next);
  };

  const handleProfileSave = (profile: ProfileSettings) => {
    persist({ ...settings, profile });
    updateProfile(profile.name, profile.email);
  };

  const handleAccountSave = (account: AccountSettings) => {
    persist({ ...settings, account });
  };

  const handlePreferencesChange = (preferences: PreferenceSettings) => {
    setPreferencesSaved(false);
    setSettings((previous) => ({ ...previous, preferences }));
  };

  const handlePreferencesSave = () => {
    setSettings((previous) => {
      saveSettings(previous);
      return previous;
    });
    setPreferencesSaved(true);
  };

  const handleNotificationsChange = (notifications: NotificationSettings) => {
    setNotificationsSaved(false);
    setSettings((previous) => ({ ...previous, notifications }));
  };

  const handleNotificationsSave = () => {
    setSettings((previous) => {
      saveSettings(previous);
      return previous;
    });
    setNotificationsSaved(true);
  };

  const handleRevokeSession = (id: string) => {
    persist({
      ...settings,
      sessions: settings.sessions.filter((session) => session.id !== id),
    });
  };

  const handleRevokeOthers = () => {
    persist({
      ...settings,
      sessions: settings.sessions.filter((session) => session.current),
    });
  };

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="mt-1 text-gray-500">
          Manage your profile, account, and workspace preferences.
        </p>
      </div>

      <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
        <SettingsNav active={section} onSelect={setSection} />

        <div className="min-w-0 flex-1">
          {section === "profile" ? (
            <ProfileSection profile={settings.profile} onSave={handleProfileSave} />
          ) : null}
          {section === "account" ? (
            <AccountSection account={settings.account} onSave={handleAccountSave} />
          ) : null}
          {section === "preferences" ? (
            <PreferencesSection
              preferences={settings.preferences}
              saved={preferencesSaved}
              onChange={handlePreferencesChange}
              onSave={handlePreferencesSave}
            />
          ) : null}
          {section === "notifications" ? (
            <NotificationsSection
              notifications={settings.notifications}
              saved={notificationsSaved}
              onChange={handleNotificationsChange}
              onSave={handleNotificationsSave}
            />
          ) : null}
          {section === "security" ? (
            <SecuritySection
              sessions={settings.sessions}
              onRevokeSession={handleRevokeSession}
              onRevokeOthers={handleRevokeOthers}
              onLogout={handleLogout}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
