import { useState, type FormEvent } from "react";
import { FormAlert, FormButton, FormInput } from "./forms";
import SettingsSection from "./SettingsSection";
import type { AccountSettings } from "./types";

interface AccountSectionProps {
  account: AccountSettings;
  onSave: (account: AccountSettings) => void;
}

const AccountSection = ({ account, onSave }: AccountSectionProps) => {
  const [username, setUsername] = useState(account.username);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!username.trim()) {
      setError("Username is required");
      return;
    }
    setError("");
    onSave({ ...account, username: username.trim() });
    setSaved(true);
  };

  return (
    <SettingsSection
      title="Account"
      description="Account identity used for your workspace."
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <FormInput
          label="Username"
          name="username"
          value={username}
          onChange={(event) => {
            setSaved(false);
            setUsername(event.target.value);
          }}
          error={error}
        />
        <FormInput label="Account ID" name="accountId" value={account.accountId} disabled />
        <FormInput label="Role" name="role" value={account.role} disabled />
        <FormInput
          label="Member since"
          name="memberSince"
          value={account.memberSince}
          disabled
        />
        {saved ? <FormAlert>Account saved.</FormAlert> : null}
        <FormButton type="submit">Save account</FormButton>
      </form>
    </SettingsSection>
  );
};

export default AccountSection;
