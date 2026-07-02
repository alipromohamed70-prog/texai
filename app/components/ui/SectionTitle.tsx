type SectionTitleProps = {
  title: string;
  highlight?: string;
  description?: string;
};

export default function SectionTitle({
  title,
  highlight,
  description,
}: SectionTitleProps) {
  return (
    <div className="text-center mb-16">
      <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">
        {title}{" "}
        {highlight && (
          <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            {highlight}
          </span>
        )}
      </h2>

      {description && (
        <p className="mt-4 max-w-2xl mx-auto text-gray-400 text-lg">
          {description}
        </p>
      )}
    </div>
  );
}