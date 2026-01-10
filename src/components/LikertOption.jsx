import React from "react";

export function LikertOption({ label, isSelected, onClick }) {
  return (
    <button
      onClick={onClick}
      type="button"
      aria-pressed={isSelected}
      className={`
        flex items-center justify-center h-14 px-2 py-3 rounded-md text-sm transition-all duration-200 border w-full
        ${isSelected 
        
          ? "bg-primary/20 border-primary text-primary font-semibold ring-1 ring-primary" 
          
          : "bg-card border-border text-muted-foreground hover:bg-muted hover:text-foreground hover:border-primary/50"
        }
      `}
    >
      <span className="text-center leading-tight">{label}</span>
    </button>
  );
}