import type { ActiveSession, PreferenceSettings } from "./types";

export const LANGUAGES = [
  { value: "en", label: "English" },
  { value: "es", label: "Spanish" },
  { value: "fr", label: "French" },
  { value: "de", label: "German" },
  { value: "ja", label: "Japanese" },
];

export const TIMEZONES = [
  { value: "Asia/Karachi", label: "(UTC+05:00) Pakistan Standard Time" },
  { value: "UTC", label: "(UTC+00:00) Coordinated Universal Time" },
  { value: "America/New_York", label: "(UTC-05:00) Eastern Time" },
  { value: "America/Los_Angeles", label: "(UTC-08:00) Pacific Time" },
  { value: "Europe/London", label: "(UTC+00:00) London" },
  { value: "Europe/Berlin", label: "(UTC+01:00) Berlin" },
  { value: "Asia/Dubai", label: "(UTC+04:00) Dubai" },
  { value: "Asia/Tokyo", label: "(UTC+09:00) Tokyo" },
];

export const THEMES = [
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
  { value: "system", label: "Match system" },
];

export const AVATAR_COLORS = [
  "#2563eb",
  "#7c3aed",
  "#0d9488",
  "#db2777",
  "#ea580c",
  "#16a34a",
  "#64748b",
];

export const defaultPreferences: PreferenceSettings = {
  theme: "light",
  language: "en",
  timezone: "Asia/Karachi",
};

export const defaultSessions: ActiveSession[] = [
  {
    id: "session-1",
    device: "Chrome on Windows",
    location: "Lahore, Pakistan",
    lastActive: "This device · Now",
    current: true,
  },
  {
    id: "session-2",
    device: "Safari on iPhone",
    location: "Lahore, Pakistan",
    lastActive: "2 hours ago",
    current: false,
  },
  {
    id: "session-3",
    device: "Firefox on Mac",
    location: "London, United Kingdom",
    lastActive: "Yesterday",
    current: false,
  },
];
