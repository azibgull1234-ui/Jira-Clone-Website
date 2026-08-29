import { defaultPreferences, defaultSessions } from "./mockData";
import type { UserSettings } from "./types";

const STORAGE_KEY = "jira-settings";

const usernameFromEmail = (email: string) => email.split("@")[0] ?? "user";

export const buildDefaultSettings = (
  name: string,
  email: string
): UserSettings => ({
  profile: {
    name,
    email,
    avatar: "#2563eb",
  },
  account: {
    username: usernameFromEmail(email),
    accountId: `acc-${email.replace(/[^a-z0-9]/gi, "").slice(0, 12)}`,
    role: "Member",
    memberSince: "Jan 2026",
  },
  preferences: { ...defaultPreferences },
  notifications: {
    email: true,
    issues: true,
    projects: false,
  },
  sessions: defaultSessions.map((session) => ({ ...session })),
});

export const loadSettings = (name: string, email: string): UserSettings => {
  const defaults = buildDefaultSettings(name, email);

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return defaults;
    }

    const parsed = JSON.parse(raw) as Partial<UserSettings> & { email?: string };
    if (parsed.profile?.email && parsed.profile.email !== email) {
      return defaults;
    }

    return {
      profile: { ...defaults.profile, ...parsed.profile, name, email },
      account: { ...defaults.account, ...parsed.account },
      preferences: { ...defaults.preferences, ...parsed.preferences },
      notifications: { ...defaults.notifications, ...parsed.notifications },
      sessions: parsed.sessions?.length ? parsed.sessions : defaults.sessions,
    };
  } catch {
    return defaults;
  }
};

export const saveSettings = (settings: UserSettings) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
};
