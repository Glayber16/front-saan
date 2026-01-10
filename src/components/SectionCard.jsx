export function SectionCard({ children, id, title }) {
  const titleId = id ? `${id}-title` : undefined;

  return (
    <section
      id={id}
      aria-labelledby={titleId}
      className="card-calm flex flex-col gap-6 p-8 md:p-10"
    >
      {title && (
        <h2 id={titleId} className="text-2xl font-bold leading-tight text-foreground md:text-3xl">
          {title}
        </h2>
      )}

      {children}
    </section>
  );
}
