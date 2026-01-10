import React from 'react';

export function InfoCard({ title, description, icon: Icon }) {
  return (
    <article className="card-calm flex flex-col gap-3 p-6 h-full hover:border-primary/50 transition-all">

      {Icon && (
        <div className="w-fit p-2 bg-primary/10 rounded-lg text-primary">
           <Icon size={24} /> 
        </div>
      )}

      <h3 className="text-xl font-bold text-foreground">
        {title}
      </h3>
      
      <p className="text-lg leading-relaxed text-muted-foreground">
        {description}
      </p>
    </article>
  );
}