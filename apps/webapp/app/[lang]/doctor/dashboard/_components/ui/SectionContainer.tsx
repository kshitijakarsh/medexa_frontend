export default function SectionContainer({
  title,
  children
}: {
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white p-4 shadow-sm rounded-xl border">
      {title && <h2 className="font-semibold text-lg mb-4">{title}</h2>}
      {children}
    </div>
  );
}
