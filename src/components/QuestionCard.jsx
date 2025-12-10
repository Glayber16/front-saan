"use client";

import React, { useState } from "react";
import { Info } from "lucide-react";
import { LikertOption } from "./LikertOption";
import { LIKERT } from "@/data/likert"; 

export function QuestionCard({ question, index }) {
  const [selectedOption, setSelectedOption] = useState(null);


  return (
    <div className="bg-slate-800 border border-slate-700 rounded-xl p-8 mb-6">
      <div className="text-lg font-semibold mb-3 text-slate-100">
        {index + 1}. {question.text}
      </div>

      {question.example && (
        <div className="mb-6 p-3 bg-slate-900/50 border-l-4 border-slate-700 rounded-r-md text-slate-400 text-sm italic flex items-start gap-2">
          <Info size={16} className="mt-0.5 shrink-0" />
          <span>Exemplo: {question.example}</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {LIKERT.map((item) => (
          <LikertOption 
            key={item.id} 
            label={getCleanLabel(item.title)} 
            isSelected={selectedOption === item.id} 
            onClick={() => setSelectedOption(item.id)}
          />
        ))}
      </div>
    </div>
  );
}