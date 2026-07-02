type CardProps = {
  children: React.ReactNode;
  className?: string;
};

export default function Card({
  children,
  className = "",
}: CardProps) {
  return (
    <div
      className={`
        rounded-2xl
        border
        border-white/10
        bg-white/5
        p-6
        transition-all
        duration-300
        hover:-translate-y-1
        hover:bg-white/10
        hover:shadow-[0_0_30px_rgba(34,211,238,0.15)]
        ${className}
      `}
    >
      {children}
    </div>
  );
}