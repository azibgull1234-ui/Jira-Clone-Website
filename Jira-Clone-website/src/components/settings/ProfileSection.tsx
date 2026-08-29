import { useState, type FormEvent } from "react";
import { FormAlert, FormButton, FormInput } from "./forms";
import { AVATAR_COLORS } from "./mockData";
import SettingsSection from "./SettingsSection";
import type { ProfileSettings } from "./types";

const initials = (name: string) =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");

const isImageSrc = (value: string) =>
  value.startsWith("http") || value.startsWith("/") || value.startsWith("data:");

interface ProfileSectionProps {
  profile: ProfileSettings;
  onSave: (profile: ProfileSettings) => void;
}

const ProfileSection = ({ profile, onSave }: ProfileSectionProps) => {
  const [form, setForm] = useState(profile);
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});
  const [saved, setSaved] = useState(false);

  const update = (key: keyof ProfileSettings, value: string) => {
    setSaved(false);
    setForm((previous) => ({ ...previous, [key]: value }));
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const nextErrors: { name?: string; email?: string } = {};
    if (!form.name.trim()) {
      nextErrors.name = "Name is required";
    }
    if (!form.email.trim()) {
      nextErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      nextErrors.email = "Enter a valid email address";
    }
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      return;
    }
    onSave({
      name: form.name.trim(),
      email: form.email.trim(),
      avatar: form.avatar.trim() || "#2563eb",
    });
    setSaved(true);
  };

  return (
    <SettingsSection
      title="Profile"
      description="This is how you appear across Jira."
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <p className="mb-2 text-sm font-semibold text-gray-700">Avatar</p>
          <div className="flex flex-wrap items-center gap-4">
            {isImageSrc(form.avatar) ? (
              <img
                src={form.avatar}
                alt=""
                className="h-16 w-16 rounded-full object-cover"
              />
            ) : (
              <div
                className="flex h-16 w-16 items-center justify-center rounded-full text-lg font-semibold text-white"
                style={{ backgroundColor: form.avatar || "#2563eb" }}
              >
                {initials(form.name) || "?"}
              </div>
            )}
            <div className="flex flex-wrap gap-2">
              {AVATAR_COLORS.map((color) => (
                <button
                  key={color}
                  type="button"
                  aria-label={`Use avatar color ${color}`}
                  onClick={() => update("avatar", color)}
                  className={`h-8 w-8 rounded-full ring-offset-2 ${
                    form.avatar === color ? "ring-2 ring-blue-600" : ""
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>
        </div>

        <FormInput
          label="Avatar URL (optional)"
          name="avatar"
          value={isImageSrc(form.avatar) ? form.avatar : ""}
          onChange={(event) =>
            update("avatar", event.target.value || AVATAR_COLORS[0])
          }
          placeholder="https://..."
          hint="Leave blank to use initials and a color."
        />

        <FormInput
          label="Name"
          name="name"
          value={form.name}
          onChange={(event) => update("name", event.target.value)}
          error={errors.name}
        />

        <FormInput
          label="Email"
          name="email"
          type="email"
          value={form.email}
          onChange={(event) => update("email", event.target.value)}
          error={errors.email}
        />

        {saved ? <FormAlert>Profile saved.</FormAlert> : null}
        <FormButton type="submit">Save profile</FormButton>
      </form>
    </SettingsSection>
  );
};

export default ProfileSection;
