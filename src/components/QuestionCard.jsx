"use client";

import React, { useState } from "react";
import { Info } from "lucide-react";
import { LikertOption } from "./LikertOption";
import { LIKERT } from "@/data/likert"; 


function getCleanLabel(title) {
  return title ? title.replace(/^[0-9]+\.\s*/, "") : "";
}

export function QuestionCard({ question, index }) {
  const [selectedOption, setSelectedOption] = useState(null);

  return (
    <div className="card-calm p-8 mb-6">
      
      <div className="text-lg font-semibold mb-3 text-foreground">
        {index + 1}. {question.text}
      </div>

      {question.example && (
        
        <div className="mb-6 p-3 bg-muted/50 border-l-4 border-primary rounded-r-md text-muted-foreground text-sm italic flex items-start gap-2">
          <Info size={16} className="mt-0.5 shrink-0 text-primary" />
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