import type { FormEvent } from "react";
import { FormAlert, FormButton, FormToggle } from "./forms";
import SettingsSection from "./SettingsSection";
import type { NotificationSettings } from "./types";

interface NotificationsSectionProps {
  notifications: NotificationSettings;
  saved: boolean;
  onChange: (notifications: NotificationSettings) => void;
  onSave: () => void;
}

const NotificationsSection = ({
  notifications,
  saved,
  onChange,
  onSave,
}: NotificationsSectionProps) => {
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    onSave();
  };

  return (
    <SettingsSection
      title="Notifications"
      description="Decide which activity reaches you."
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <FormToggle
          label="Email notifications"
          description="Send a summary of activity to your email."
          checked={notifications.email}
          onChange={(email) => onChange({ ...notifications, email })}
        />
        <FormToggle
          label="Issue notifications"
          description="Get notified when issues are assigned or updated."
          checked={notifications.issues}
          onChange={(issues) => onChange({ ...notifications, issues })}
        />
        <FormToggle
          label="Project notifications"
          description="Get notified about project membership and status changes."
          checked={notifications.projects}
          onChange={(projects) => onChange({ ...notifications, projects })}
        />
        {saved ? <FormAlert>Notification preferences saved.</FormAlert> : null}
        <FormButton type="submit">Save notifications</FormButton>
      </form>
    </SettingsSection>
  );
};

export default NotificationsSection;
