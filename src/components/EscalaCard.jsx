import { LIKERT } from "@/data/likert";

export default function EscalaCard() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 pt-6">
      {LIKERT.map((item) => (
        <div 
          key={item.id} 
          className="flex flex-col p-6 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-200  " >
    
          <h3 className="font-bold text-xl text-gray-900 mb-3">
            {item.title}
          </h3>
          
          
          <p className="text-lg text-gray-700 leading-relaxed">
            {item.description}
          </p>
        </div>
      ))}
    </div>
  );
}