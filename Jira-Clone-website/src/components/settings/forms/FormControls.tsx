import { useState, type InputHTMLAttributes, type ReactNode, type SelectHTMLAttributes } from "react";
import { Eye, EyeOff } from "lucide-react";

export const formControlClassName =
  "w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50 disabled:text-gray-500";

export const formErrorClassName = "mt-1 text-sm text-red-500";

interface FormFieldProps {
  label: string;
  htmlFor?: string;
  error?: string;
  hint?: string;
  children: ReactNode;
}

export const FormField = ({ label, htmlFor, error, hint, children }: FormFieldProps) => (
  <div>
    <label htmlFor={htmlFor} className="mb-2 block text-sm font-semibold text-gray-700">
      {label}
    </label>
    {children}
    {hint && !error ? <p className="mt-1 text-sm text-gray-500">{hint}</p> : null}
    {error ? <p className={formErrorClassName}>{error}</p> : null}
  </div>
);

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  hint?: string;
}

export const FormInput = ({ label, error, hint, id, className = "", ...props }: FormInputProps) => {
  const fieldId = id ?? props.name;
  return (
    <FormField label={label} htmlFor={fieldId} error={error} hint={hint}>
      <input
        id={fieldId}
        className={`${formControlClassName} ${error ? "border-red-500" : ""} ${className}`}
        {...props}
      />
    </FormField>
  );
};

interface FormSelectOption {
  value: string;
  label: string;
}

interface FormSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  error?: string;
  hint?: string;
  options: FormSelectOption[];
}

export const FormSelect = ({
  label,
  error,
  hint,
  id,
  options,
  className = "",
  ...props
}: FormSelectProps) => {
  const fieldId = id ?? props.name;
  return (
    <FormField label={label} htmlFor={fieldId} error={error} hint={hint}>
      <select
        id={fieldId}
        className={`${formControlClassName} ${error ? "border-red-500" : ""} ${className}`}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </FormField>
  );
};

interface FormToggleProps {
  label: string;
  description?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export const FormToggle = ({ label, description, checked, onChange }: FormToggleProps) => (
  <div className="flex items-start justify-between gap-4 rounded-lg border border-gray-100 bg-[#f4f5f7] p-4">
    <div>
      <p className="font-semibold text-gray-900">{label}</p>
      {description ? <p className="mt-1 text-sm text-gray-500">{description}</p> : null}
    </div>
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={`relative h-6 w-11 shrink-0 rounded-full transition ${
        checked ? "bg-blue-600" : "bg-gray-300"
      }`}
    >
      <span
        className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition ${
          checked ? "translate-x-5" : "translate-x-0"
        }`}
      />
    </button>
  </div>
);

interface FormButtonProps {
  type?: "button" | "submit";
  variant?: "primary" | "secondary" | "danger";
  disabled?: boolean;
  children: ReactNode;
  onClick?: () => void;
}

const BUTTON_STYLES = {
  primary: "bg-blue-600 text-white hover:bg-blue-700",
  secondary: "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50",
  danger: "bg-red-600 text-white hover:bg-red-700",
};

export const FormButton = ({
  type = "button",
  variant = "primary",
  disabled,
  children,
  onClick,
}: FormButtonProps) => (
  <button
    type={type}
    disabled={disabled}
    onClick={onClick}
    className={`inline-flex items-center justify-center rounded-lg px-4 py-2.5 text-sm font-medium disabled:opacity-60 ${BUTTON_STYLES[variant]}`}
  >
    {children}
  </button>
);

interface FormAlertProps {
  variant?: "success" | "error";
  children: ReactNode;
}

export const FormPasswordInput = ({
  label,
  error,
  hint,
  id,
  className = "",
  ...props
}: FormInputProps) => {
  const [visible, setVisible] = useState(false);
  const fieldId = id ?? props.name;

  return (
    <FormField label={label} htmlFor={fieldId} error={error} hint={hint}>
      <div className="relative">
        <input
          id={fieldId}
          {...props}
          type={visible ? "text" : "password"}
          className={`${formControlClassName} pr-11 ${error ? "border-red-500" : ""} ${className}`}
        />
        <button
          type="button"
          onClick={() => setVisible((open) => !open)}
          className="absolute top-2.5 right-3 text-gray-400 hover:text-gray-600"
          aria-label={visible ? "Hide password" : "Show password"}
        >
          {visible ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
    </FormField>
  );
};

export const FormAlert = ({ variant = "success", children }: FormAlertProps) => (
  <p
    className={`rounded-lg px-3 py-2 text-sm ${
      variant === "success" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-600"
    }`}
  >
    {children}
  </p>
);
