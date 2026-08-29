import type { FormEvent } from "react";
import { FormAlert, FormButton, FormSelect } from "./forms";
import { LANGUAGES, THEMES, TIMEZONES } from "./mockData";
import SettingsSection from "./SettingsSection";
import type { PreferenceSettings } from "./types";

interface PreferencesSectionProps {
  preferences: PreferenceSettings;
  saved: boolean;
  onChange: (preferences: PreferenceSettings) => void;
  onSave: () => void;
}

const PreferencesSection = ({
  preferences,
  saved,
  onChange,
  onSave,
}: PreferencesSectionProps) => {
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    onSave();
  };

  return (
    <SettingsSection
      title="Preferences"
      description="Choose how Jira looks and how dates are displayed."
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <FormSelect
          label="Theme"
          name="theme"
          value={preferences.theme}
          options={THEMES}
          onChange={(event) =>
            onChange({
              ...preferences,
              theme: event.target.value as PreferenceSettings["theme"],
            })
          }
        />
        <FormSelect
          label="Language"
          name="language"
          value={preferences.language}
          options={LANGUAGES}
          onChange={(event) =>
            onChange({ ...preferences, language: event.target.value })
          }
        />
        <FormSelect
          label="Timezone"
          name="timezone"
          value={preferences.timezone}
          options={TIMEZONES}
          onChange={(event) =>
            onChange({ ...preferences, timezone: event.target.value })
          }
        />
        {saved ? <FormAlert>Preferences saved.</FormAlert> : null}
        <FormButton type="submit">Save preferences</FormButton>
      </form>
    </SettingsSection>
  );
};

export default PreferencesSection;
