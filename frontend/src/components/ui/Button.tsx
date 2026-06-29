interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "outline" | "ghost";
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
  size = "md",
  fullWidth = false,
  onClick,
  type = "button",
  disabled = false,
  className = "",
}: ButtonProps) {
  const baseClasses =
    "inline-flex items-center justify-center gap-2 font-display font-semibold rounded-full border border-transparent transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-primary/60 focus:ring-offset-2 focus:ring-offset-canvas disabled:opacity-50 disabled:cursor-not-allowed";

  const variantClasses = {
    primary:
      "bg-gradient-to-b from-gold-soft to-gold text-[#171205] shadow-[0_8px_30px_-8px_rgba(200,162,76,0.55),inset_0_1px_0_rgba(255,255,255,0.4)] hover:-translate-y-0.5 hover:shadow-[0_16px_40px_-10px_rgba(200,162,76,0.7),inset_0_1px_0_rgba(255,255,255,0.5)]",
    outline:
      "bg-white/[0.03] border-hairline-strong text-text-primary hover:-translate-y-0.5 hover:border-white/40 hover:bg-white/[0.06]",
    ghost:
      "bg-transparent text-text-secondary hover:bg-white/[0.05] hover:text-text-primary",
  };

  const sizeClasses = {
    sm: "text-sm py-2.5 px-5",
    md: "text-[0.96rem] py-3 px-7",
    lg: "text-[0.96rem] py-3.5 px-8",
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
