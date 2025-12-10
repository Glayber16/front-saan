import Link from "next/link";
import { Layers } from "lucide-react";

export function SystemNav({description}) {
  return (
    <nav 
      className="bg-[#1e293b] border-b border-[#334155] text-xl px-6 py-4 flex items-center justify-between mb-8" 
      aria-label="Navegação do Sistema"
    >
      <div className="flex items-center gap-2 font-bold ">
        <Layers className="text-blue-500" aria-hidden="true" /> 
        <span className="text-slate-100">{description}</span>
      </div>
      
    
      <div className="flex gap-5 font-medium">
        <Link href="/" className="text-[#94a3b8] hover:text-blue-500 focus:text-blue-500 transition-colors" > 
        Home
        </Link>
        <Link href="/inicio" className="text-[#94a3b8] hover:text-blue-500 focus:text-blue-500 transition-colors" >
          Início
        </Link>
        <Link href="/getForms" className="text-[#94a3b8] hover:text-blue-500 focus:text-blue-500 transition-colors">
          Visualizar
        </Link>
         <Link href="/cadastroForms" className="text-[#94a3b8] hover:text-blue-500 focus:text-blue-500 transition-colors" >
          Cadastrar
        </Link>
      </div>
    </nav>
  );
}