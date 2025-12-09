import { UserCog, Smartphone, ClipboardCheck, BarChart3 } from 'lucide-react';

export const ACTORS = [
    {
        id: 'admin',
        title: 'Admin',
        description: 'Cadastra formulários de avaliação personalizados utilizando escalas Likert com exemplos nos itens.',
        icon: UserCog
    },
    {
        id: 'engenheiro',
        title: 'Engenheiro de Testes',
        description: 'Cadastra aplicações (web ou mobile) e associa aos perfis de avaliadores e formulários correspondentes.',
        icon: Smartphone
    },
    {
        id: 'avaliador',
        title: 'Avaliador',
        description: 'Realiza avaliações quantitativas e qualitativas. Pode ser neurotípico ou neurodivergente.',
        icon: ClipboardCheck
    },
    {
        id: 'stakeholder',
        title: 'Cliente/Stakeholder',
        description: 'Visualiza relatórios consolidados e índices de acessibilidade, com opção de exportar em PDF.',
        icon: BarChart3
    }
];