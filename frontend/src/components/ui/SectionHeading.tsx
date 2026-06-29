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
}: SectionHeadingProps) {
  return (
    <div
      className={`
        flex flex-col gap-4 mb-16
        ${centered ? "items-center text-center" : "items-start"}
      `}
    >
      <span className="eyebrow">{tag}</span>
      <h2 className="chrome text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.02]">
        {title}
      </h2>
      {subtitle && (
        <p className="text-base md:text-lg max-w-2xl leading-relaxed text-text-secondary">
          {subtitle}
        </p>
      )}
      {centered && <div className="gold-rule w-24 mt-3" />}
    </div>
  );
}
