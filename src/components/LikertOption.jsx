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
          ? "bg-blue-500/20 border-blue-500 text-white font-semibold ring-1 ring-blue-500" 
          : "bg-transparent border-slate-700 text-slate-400 hover:bg-white/5 hover:text-white hover:border-slate-500"
        }
      `}
    >
      <span className="text-center leading-tight">{label}</span>
    </button>
  );
}