import type { ReactNode } from "react";

interface SectionCardProps {
  title: string;
  children: ReactNode;
  footer?: ReactNode;
  titleClassName?: string;
}

const SectionCard = ({
  title,
  children,
  footer,
  titleClassName = "mb-5",
}: SectionCardProps) => {
  return (
    <section className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
      <h2 className={`text-lg font-semibold text-gray-900 ${titleClassName}`}>
        {title}
      </h2>
      {children}
      {footer}
    </section>
  );
};

export default SectionCard;
