interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  className?: string;
}

export function Button({
  children,
  variant = "primary",
  size = "sm",
  fullWidth = false,
  onClick,
  type = "button",
  disabled = false,
  className = "",
}: ButtonProps) {
  const baseClasses =
    "inline-flex items-center justify-center font-medium tracking-widest uppercase transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-canvas disabled:opacity-50 disabled:cursor-not-allowed";

  const variantClasses: Record<string, string> = {
    primary: "bg-primary hover:bg-primary-hover text-white border border-primary",
    outline:
      "bg-transparent border border-text-secondary hover:border-primary hover:text-primary text-text-secondary",
    ghost: "bg-transparent hover:bg-canvas-elevated text-text-secondary hover:text-text-primary",
    danger: "bg-warning/10 hover:bg-warning/20 text-warning border border-warning/30",
  };

  const sizeClasses: Record<string, string> = {
    sm: "text-xs py-2 px-4",
    md: "text-sm py-3 px-8",
    lg: "text-sm py-4 px-10",
  };

  const widthClass = fullWidth ? "w-full" : "";

  return (
    <button
      type={type}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClass} ${className}`.trim()}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
