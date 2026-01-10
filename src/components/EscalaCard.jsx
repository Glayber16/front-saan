import { LIKERT } from "@/data/likert";

export default function EscalaCard() {
  return (
    <div className="grid gap-6 pt-6 sm:grid-cols-2 lg:grid-cols-3">
      {LIKERT.map((item) => (
        <div key={item.id} className="card-calm flex flex-col p-6">
          <h3 className="mb-3 text-xl font-bold text-foreground">{item.title}</h3>

          <p className="text-lg leading-relaxed text-muted-foreground">{item.description}</p>
        </div>
      ))}
    </div>
  );
}
