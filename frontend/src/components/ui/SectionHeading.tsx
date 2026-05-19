interface SectionHeadingProps {
  tag: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
  light?: boolean;
}

export function SectionHeading({
  tag,
  title,
  subtitle,
  centered = false,
  light = false,
}: SectionHeadingProps) {
  return (
    <div
      className={`
        flex flex-col gap-3 mb-16
        ${centered ? "items-center text-center" : "items-start"}
      `}
    >
      <span
        className={`
          text-xs tracking-[0.2em] uppercase font-medium
          ${light ? "text-primary" : "text-primary"}
        `}
      >
        {tag}
      </span>
      <h2
        className={`
          text-3xl md:text-4xl lg:text-5xl font-light leading-tight
          ${light ? "text-text-primary" : "text-text-primary"}
        `}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`
            text-base md:text-lg max-w-2xl leading-relaxed
            ${light ? "text-text-secondary" : "text-text-secondary"}
          `}
        >
          {subtitle}
        </p>
      )}
      {centered && (
        <div className="w-12 h-px bg-primary mt-2" />
      )}
    </div>
  );
}