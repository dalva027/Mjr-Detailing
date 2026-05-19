interface InputProps {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  error?: string;
  disabled?: boolean;
}

export function Input({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  required = false,
  error,
  disabled = false,
}: InputProps) {
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={name}
        className="text-xs tracking-widest uppercase text-text-secondary"
      >
        {label}
        {required && <span className="text-primary ml-1">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        className={`
          bg-canvas border text-text-primary px-4 py-3 text-sm
          transition-colors duration-200 focus:outline-none focus:ring-1
          ${
            error
              ? "border-warning focus:border-warning"
              : "border-hairline focus:border-primary"
          }
          ${disabled ? "opacity-50 cursor-not-allowed" : ""}
        `}
      />
      {error && (
        <span className="text-xs text-warning">{error}</span>
      )}
    </div>
  );
}