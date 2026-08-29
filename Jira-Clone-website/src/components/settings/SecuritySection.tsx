import { useState, type FormEvent } from "react";
import { Monitor } from "lucide-react";
import {
  FormAlert,
  FormButton,
  FormPasswordInput,
} from "./forms";
import SettingsSection from "./SettingsSection";
import type { ActiveSession } from "./types";

interface SecuritySectionProps {
  sessions: ActiveSession[];
  onRevokeSession: (id: string) => void;
  onRevokeOthers: () => void;
  onLogout: () => void;
}

const SecuritySection = ({
  sessions,
  onRevokeSession,
  onRevokeOthers,
  onLogout,
}: SecuritySectionProps) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<{
    currentPassword?: string;
    newPassword?: string;
    confirmPassword?: string;
  }>({});
  const [message, setMessage] = useState("");
  const [messageVariant, setMessageVariant] = useState<"success" | "error">("success");

  const handlePasswordSubmit = (event: FormEvent) => {
    event.preventDefault();
    const nextErrors: typeof errors = {};
    if (!currentPassword) {
      nextErrors.currentPassword = "Current password is required";
    }
    if (newPassword.length < 6) {
      nextErrors.newPassword = "Password must be at least 6 characters";
    }
    if (confirmPassword !== newPassword) {
      nextErrors.confirmPassword = "Passwords do not match";
    }
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      setMessage("");
      return;
    }

    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setMessageVariant("success");
    setMessage("Password updated.");
  };

  return (
    <div className="space-y-6">
      <SettingsSection
        title="Change password"
        description="Choose a strong password that you do not use elsewhere."
      >
        <form onSubmit={handlePasswordSubmit} className="space-y-5">
          <FormPasswordInput
            label="Current password"
            name="currentPassword"
            value={currentPassword}
            onChange={(event) => setCurrentPassword(event.target.value)}
            error={errors.currentPassword}
            autoComplete="current-password"
          />
          <FormPasswordInput
            label="New password"
            name="newPassword"
            value={newPassword}
            onChange={(event) => setNewPassword(event.target.value)}
            error={errors.newPassword}
            autoComplete="new-password"
          />
          <FormPasswordInput
            label="Confirm new password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            error={errors.confirmPassword}
            autoComplete="new-password"
          />
          {message ? <FormAlert variant={messageVariant}>{message}</FormAlert> : null}
          <FormButton type="submit">Update password</FormButton>
        </form>
      </SettingsSection>

      <SettingsSection
        title="Active sessions"
        description="Devices currently signed in to this account."
      >
        <ul className="space-y-3">
          {sessions.map((session) => (
            <li
              key={session.id}
              className="flex flex-col gap-3 rounded-lg border border-gray-100 bg-[#f4f5f7] p-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-700">
                  <Monitor size={18} />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">
                    {session.device}
                    {session.current ? (
                      <span className="ml-2 rounded-full bg-green-100 px-2 py-0.5 text-[11px] font-semibold text-green-700">
                        Current
                      </span>
                    ) : null}
                  </p>
                  <p className="text-sm text-gray-500">{session.location}</p>
                  <p className="text-xs text-gray-400">{session.lastActive}</p>
                </div>
              </div>
              {!session.current ? (
                <FormButton
                  variant="secondary"
                  onClick={() => onRevokeSession(session.id)}
                >
                  Log out
                </FormButton>
              ) : null}
            </li>
          ))}
        </ul>
        {sessions.some((session) => !session.current) ? (
          <div className="mt-4">
            <FormButton variant="secondary" onClick={onRevokeOthers}>
              Log out of other sessions
            </FormButton>
          </div>
        ) : null}
      </SettingsSection>

      <SettingsSection
        title="Logout"
        description="Sign out of Jira on this device."
      >
        <FormButton variant="danger" onClick={onLogout}>
          Log out
        </FormButton>
      </SettingsSection>
    </div>
  );
};

export default SecuritySection;
