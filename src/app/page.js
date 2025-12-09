import Link from 'next/link';
import {InfoCard } from '@/components/InfoCard';
import { SectionCard } from '@/components/SectionCard';
import {PERSONAS} from '@/data/personas'
import EscalaCard from '@/components/EscalaCard';
import { SNav } from '@/components/SNav';
import { ACTORS } from '@/data/atores';
import { FEATURES } from '@/data/features';
import { Github } from 'lucide-react';
export default function Home() {
  return (
    <main className="flex min-h-screen w-full flex-col items-center bg-[#f6f7f8] pt-20 ">
      <SNav></SNav>
      <div className='flex w-full max-w-[960px] flex-1 flex-col px-4 gap-16'>

        <section aria-labelledby="hero-title" className="flex flex-col items-center text-center space-y-8">
          <div className="space-y-4 max-w-3xl">
            <h1 id="hero-title" className="text-3xl md:text-5xl font-black leading-tight tracking-tight text-[#0d141b]">
              Avaliando a Acessibilidade com Foco em Neurodivergência
            </h1>
            <p className="text-lg md:text-xl font-normal leading-relaxed text-[#0d141b]/80 max-w-2xl mx-auto">
              Entenda como nossa ferramenta ajuda a criar experiências digitais mais inclusivas através de personas e avaliações detalhadas.
            </p>
          </div>

          <Link 
            href="/ferramenta" 
            className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-lg bg-[#137fec] px-8 font-medium text-white transition-all hover:bg-[#0f6bc9] hover:scale-105 focus:outline-none focus:ring-4 focus:ring-[#137fec]/40"
          >
            <span className="relative text-base font-semibold">Conheça a Ferramenta</span>
          </Link>
        </section>
        <SectionCard title="O que é Neurodivergência?" id="O_que">
          <p className='text-base md:text-lg font-normal leading-relaxed text-[#0d141b]/90'>
            Neurodivergência é um termo que descreve variações naturais no cérebro humano em relação à sociabilidade, aprendizagem, atenção, humor e outras funções mentais. Nosso objetivo é desmistificar o conceito e promover 
            a importância da acessibilidade digital para criar ambientes online onde todos possam navegar confortavelmente.
          </p>
        </SectionCard>

        <SectionCard id="personas" title="Nossas Personas">
          <p className='text-base md:text-lg font-normal leading-relaxed text-[#0d141b]/90 mb-6'>
             Para avaliar a acessibilidade de forma eficaz, utilizamos personas baseadas em pesquisas e entrevistas. 
             Elas representam diferentes perfis neurodivergentes.
          </p>
          
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            {PERSONAS.map((persona) => (
              <InfoCard 
                key={persona.id} 
                title={persona.title} 
                description={persona.description} 
                icon={persona.icon}
              />
            ))}
          </div>

        </SectionCard>

        <SectionCard id="atores" title="Atores do Sistema">
            <p className='mb-8 text-gray-600 '>Diferentes perfis com responsabilidades especificas para garantir avaliações completas.</p>
            <div className="grid grid-cols-1 md:grid-cols-2  gap-6">
              {ACTORS.map((actor) => (
                <InfoCard 
                  key={actor.id}
                  title={actor.title}
                  description={actor.description}
                  icon={actor.icon}
                />
              ))}
            </div>
        </SectionCard>

        <SectionCard id="funcionalidades" title="Funcionalidades Principais">
            <p className='mb-8 text-gray-60'>Recursos projetados para avaliações completas e acessiveis</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {FEATURES.map((feature) => (
                <InfoCard 
                  key={feature.id}
                  title={feature.title}
                  description={feature.description}
                  icon={feature.icon}
                />
              ))}
            </div>
        </SectionCard>

        <SectionCard id="Likert" title="Como funciona a Avaliação">
            <p className='text-base md:text-lg font-normal leading-relaxed text-[#0d141b]/90 mb-6'>
              Nossa avaliação utiliza uma escala Likert, um método comprovado para medir atitudes e percepções. Cada ponto da escala 
              tem um significado claro para garantir que suas respostas reflitam com precisão sua experiência.         
            </p>

            <EscalaCard></EscalaCard>
        </SectionCard>
      </div>
      <footer className="w-full py-8 mt-16 border-t border-zinc-800  bg-zinc-950">
        <div className="flex justify-center">
          <a 
            href="https://github.com/Glayber16/front-saan"
            target="_blank" 
            className="group flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-[#137fec] transition-colors"
          >
            <Github size={20} className="group-hover:-translate-y-0.5 transition-transform duration-200" />
            <span>Acesse o projeto no GitHub</span>
          </a>
        </div>
      </footer>
    </main>
  );
}