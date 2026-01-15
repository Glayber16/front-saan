import React from "react";

export function LikertOption({label, isSelected, onClick}) {
  return (
    <button
      onClick={onClick}
      type="button"
      aria-pressed={isSelected}
      className={`flex h-14 w-full items-center justify-center rounded-md border px-2 py-3 text-sm transition-all duration-200 ${
        isSelected
          ? "border-primary bg-primary/20 font-semibold text-primary ring-1 ring-primary"
          : "border-border bg-card text-muted-foreground hover:border-primary/50 hover:bg-muted hover:text-foreground"
      } `}
    >
      <span className="text-center leading-tight">{label}</span>
    </button>
  );
}
