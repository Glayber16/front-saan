import { Zap, Infinity, Type } from 'lucide-react';

export const PERSONAS = [
  {
    id: 'tdah',
    title: 'Pessoa com TDAH',
    icon: Zap,
    description: 'Valoriza interfaces claras e sem distrações, com fluxos de tarefas curtos e objetivos bem definidos para manter o foco e evitar a paralisia de escolha.',
  },
  {
    id: 'autismo',
    title: 'Pessoa no Espectro Autista',
    icon: Infinity,
    description: 'Prefere previsibilidade e consistência. Padrões literais, evitar metáforas complexas e controle sobre estímulos sensoriais (som/vídeo) são essenciais.',
  },
  {
    id: 'dislexia',
    title: 'Pessoa com Dislexia',
    icon: Type,
    description: 'Necessita de fontes amigáveis, bom espaçamento entre linhas e suporte a leitura em voz alta. Evitar justificação de texto e itálicos excessivos.',
  }
];