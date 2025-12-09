// src/components/InfoCard.jsx
import React from 'react';

export function InfoCard({ title, description, icon: Icon }) {
  return (
    <article className="flex flex-col gap-3 p-6 bg-white border border-[#e7edf3]  rounded-xl hover:border-[#137fec]/50transition-all shadow-sm hover:shadow-md h-full">

      {Icon && (
        <div className="w-fit p-2 bg-[#137fec]/10 rounded-lg text-[#137fec]">
           <Icon size={24} /> 
        </div>
      )}

      <h3 className="text-xl font-bold text-[#0d141b] ">
        {title}
      </h3>
      
      <p className="text-lg leading-relaxed text-[#0d141b]/80 ">
        {description}
      </p>
    </article>
  );
}