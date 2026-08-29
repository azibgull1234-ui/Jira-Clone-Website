import type { ReactNode } from "react";

interface SettingsSectionProps {
  title: string;
  description: string;
  children: ReactNode;
}

const SettingsSection = ({ title, description, children }: SettingsSectionProps) => (
  <section className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
    <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
    <p className="mt-1 mb-5 text-sm text-gray-500">{description}</p>
    {children}
  </section>
);

export default SettingsSection;
