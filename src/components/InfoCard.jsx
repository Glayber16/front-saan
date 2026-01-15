import React from "react";

export function InfoCard({title, description, icon: Icon}) {
  return (
    <article className="card-calm flex h-full flex-col gap-3 p-6 transition-all hover:border-primary/50">
      {Icon && (
        <div className="w-fit rounded-lg bg-primary/10 p-2 text-primary">
          <Icon size={24} />
        </div>
      )}

      <h3 className="text-xl font-bold text-foreground">{title}</h3>

      <p className="text-lg leading-relaxed text-muted-foreground">{description}</p>
    </article>
  );
}
