export type ThemePreference = "light" | "dark" | "system";

export type SettingsSectionId =
  | "profile"
  | "account"
  | "preferences"
  | "notifications"
  | "security";

export interface ProfileSettings {
  name: string;
  email: string;
  avatar: string;
}

export interface AccountSettings {
  username: string;
  accountId: string;
  role: string;
  memberSince: string;
}

export interface PreferenceSettings {
  theme: ThemePreference;
  language: string;
  timezone: string;
}

export interface NotificationSettings {
  email: boolean;
  issues: boolean;
  projects: boolean;
}

export interface ActiveSession {
  id: string;
  device: string;
  location: string;
  lastActive: string;
  current: boolean;
}

export interface UserSettings {
  profile: ProfileSettings;
  account: AccountSettings;
  preferences: PreferenceSettings;
  notifications: NotificationSettings;
  sessions: ActiveSession[];
}
