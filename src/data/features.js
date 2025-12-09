import { Gauge, FileText, HeartHandshake, Lightbulb } from 'lucide-react';

export const FEATURES = [
    {
        id: 'indices',
        title: 'Índices de Acessibilidade',
        description: 'Cálculo automático de índices de 0 a 10, por perfil neurodivergente e média global consolidada.',
        icon: Gauge // Ou 'Calculator'
    },
    {
        id: 'relatorios',
        title: 'Relatórios Detalhados',
        description: 'Visualização online e exportação em PDF de relatórios consolidados de acessibilidade.',
        icon: FileText
    },
    {
        id: 'empatia',
        title: 'Suporte à Empatia',
        description: 'Instruções específicas para avaliadores neurotípicos se conectarem com os perfis avaliados.',
        icon: HeartHandshake 
    },
    {
        id: 'diagnosticos',
        title: 'Diagnósticos Qualitativos',
        description: 'Sugestões de adaptação genéricas e específicas para cada condição neurodivergente.',
        icon: Lightbulb
    }
];