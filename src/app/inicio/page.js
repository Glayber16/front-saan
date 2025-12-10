import Link from "next/link";
import { Layers, Settings2, ClipboardCheck } from "lucide-react";
import { SystemNav } from "@/components/SystemNav";

export default function PortalPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#0f172a] text-[#f8fafc] font-sans">
      
        <SystemNav description={"Avaliação de Acessibilidade"}/>

      <main className="flex-1 flex flex-col items-center justify-center p-5">
        
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold mb-3">Portal de Avaliações</h1>
          <p className="text-[#94a3b8] text-lg">Selecione seu perfil para continuar</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-[800px]">
        
          <Link 
            href="/admin" 
            className="group flex flex-col items-center text-center p-10 bg-[#1e293b] border border-[#334155] rounded-xl transition-all duration-200 hover:border-blue-500 hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="w-20 h-20 rounded-full bg-blue-500/10 text-blue-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Settings2 size={40} />
            </div>
            <h2 className="text-2xl font-semibold mb-2">Sou Admin</h2>
            <p className="text-[#94a3b8] leading-relaxed">
              Cadastrar formulários, gerenciar perguntas e definir escalas.
            </p>
          </Link>

          <Link 
            href="/avaliador" 
            className="group flex flex-col items-center text-center p-10 bg-[#1e293b] border border-[#334155] rounded-xl transition-all duration-200 hover:border-blue-500 hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="w-20 h-20 rounded-full bg-blue-500/10 text-blue-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <ClipboardCheck size={40} />
            </div>
            <h2 className="text-2xl font-semibold mb-2">Sou Avaliador</h2>
            <p className="text-[#94a3b8] leading-relaxed">
              Responder avaliações disponíveis e testar a plataforma.
            </p>
          </Link>

        </div>
      </main>

      <footer className="text-center p-6 text-[#94a3b8] text-sm border-t border-[#334155]">
        &copy; 2025 Sistema de Gestão de Formulários
      </footer>

    </div>
  );
}