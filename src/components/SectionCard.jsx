export function SectionCard({ children, id, title }) {
  const titleId = id ? `${id}-title` : undefined;

  return (
    <section 
      id={id}
      aria-labelledby={titleId}
      className="card-calm p-8 md:p-10 flex flex-col gap-6"
    >
      {title && (
        <h2 id={titleId} className="text-2xl md:text-3xl font-bold leading-tight text-foreground">
          {title}
        </h2>
      )}
      
      {children}
    </section>
  );
}