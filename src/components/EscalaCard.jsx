import { LIKERT } from "@/data/likert";

export default function EscalaCard() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 pt-6">
      {LIKERT.map((item) => (
        <div 
          key={item.id} 
          className="card-calm flex flex-col p-6" 
        >
              
          <h3 className="font-bold text-xl text-foreground mb-3">
            {item.title}
          </h3>
      
          <p className="text-lg text-muted-foreground leading-relaxed">
            {item.description}
          </p>
        </div>
      ))}
    </div>
  );
}