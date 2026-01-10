import Link from "next/link";
import { InfoCard } from "@/components/InfoCard";
import { SectionCard } from "@/components/SectionCard";
import { PERSONAS } from "@/data/personas";
import EscalaCard from "@/components/EscalaCard";
import { SNav } from "@/components/SNav";
import { ACTORS } from "@/data/atores";
import { FEATURES } from "@/data/features";
import { Github } from "lucide-react";

export default function Home() {
  return (
    <main className="flex min-h-screen w-full flex-col items-center bg-background pt-20 transition-colors duration-300">
      <SNav />

      <div className="flex w-full max-w-[960px] flex-1 flex-col gap-16 px-4">
        <section
          aria-labelledby="hero-title"
          className="mt-8 flex flex-col items-center space-y-8 text-center"
        >
          <div className="max-w-3xl space-y-4">
            <h1
              id="hero-title"
              className="text-3xl font-black leading-tight tracking-tight text-foreground md:text-5xl"
            >
              Avaliando a Acessibilidade com Foco em Neurodivergência
            </h1>
            <p className="mx-auto max-w-2xl text-lg font-normal leading-relaxed text-muted-foreground md:text-xl">
              Entenda como nossa ferramenta ajuda a criar experiências digitais mais inclusivas
              através de personas e avaliações detalhadas.
            </p>
          </div>

          <Link
            href="/inicio"
            className="btn-primary h-12 px-8 text-base font-semibold shadow-xl shadow-primary/20 hover:scale-105"
          >
            Conheça a Ferramenta
          </Link>
        </section>

        <SectionCard title="O que é Neurodivergência?" id="O_que">
          <p className="text-base font-normal leading-relaxed text-muted-foreground md:text-lg">
            Neurodivergência é um termo que descreve variações naturais no cérebro humano em relação
            à sociabilidade, aprendizagem, atenção, humor e outras funções mentais. Nosso objetivo é
            desmistificar o conceito e promover a importância da acessibilidade digital para criar
            ambientes online onde todos possam navegar confortavelmente.
          </p>
        </SectionCard>

        <SectionCard id="personas" title="Nossas Personas">
          <p className="mb-6 text-base font-normal leading-relaxed text-muted-foreground md:text-lg">
            Para avaliar a acessibilidade de forma eficaz, utilizamos personas baseadas em pesquisas
            e entrevistas. Elas representam diferentes perfis neurodivergentes.
          </p>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
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
          <p className="mb-8 text-muted-foreground">
            Diferentes perfis com responsabilidades especificas para garantir avaliações completas.
          </p>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
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
          <p className="mb-8 text-muted-foreground">
            Recursos projetados para avaliações completas e acessíveis.
          </p>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
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
          <p className="mb-6 text-base font-normal leading-relaxed text-muted-foreground md:text-lg">
            Nossa avaliação utiliza uma escala Likert, um método comprovado para medir atitudes e
            percepções. Cada ponto da escala tem um significado claro para garantir que suas
            respostas reflitam com precisão sua experiência.
          </p>

          <EscalaCard />
        </SectionCard>
      </div>

      <footer className="mt-16 w-full border-t border-border bg-card py-8">
        <div className="flex justify-center">
          <a
            href="https://github.com/Glayber16/front-saan"
            target="_blank"
            className="group flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            <Github
              size={20}
              className="transition-transform duration-200 group-hover:-translate-y-0.5"
            />
            <span>Acesse o projeto no GitHub</span>
          </a>
        </div>
      </footer>
    </main>
  );
}
