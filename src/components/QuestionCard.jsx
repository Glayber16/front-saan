"use client";

import React, {useState} from "react";
import {Info} from "lucide-react";
import {LikertOption} from "./LikertOption";
import {LIKERT} from "@/data/likert";

function getCleanLabel(title) {
  return title ? title.replace(/^[0-9]+\.\s*/, "") : "";
}

export function QuestionCard({question, index}) {
  const [selectedOption, setSelectedOption] = useState(null);

  return (
    <div className="card-calm mb-6 p-8">
      <div className="mb-3 text-lg font-semibold text-foreground">
        {index + 1}. {question.text}
      </div>

      {question.example && (
        <div className="mb-6 flex items-start gap-2 rounded-r-md border-l-4 border-primary bg-muted/50 p-3 text-sm italic text-muted-foreground">
          <Info size={16} className="mt-0.5 shrink-0 text-primary" />
          <span>Exemplo: {question.example}</span>
        </div>
      )}

      <div className="grid grid-cols-1 gap-3 md:grid-cols-3 lg:grid-cols-6">
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
