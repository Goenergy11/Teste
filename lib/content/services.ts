export type Service = {
  slug: string;
  title: string;
  shortTitle: string;
  summary: string;
  description: string;
  benefits: string[];
  process: string[];
  idealFor: string[];
};

export const services: Service[] = [
  {
    slug: 'construcao-piscinas',
    title: 'Construção de piscinas',
    shortTitle: 'Construção',
    summary: 'Projetos chave-na-mão para moradias, alojamentos turísticos, condomínios e espaços premium no Algarve.',
    description:
      'A GoPools planeia e executa piscinas com foco em hidráulica correta, durabilidade, eficiência energética e integração estética com o espaço exterior.',
    benefits: ['Projeto técnico dimensionado', 'Equipamentos adequados ao uso real', 'Acompanhamento organizado da obra', 'Preparação para manutenção futura'],
    process: ['Visita técnica e levantamento', 'Definição de solução e orçamento', 'Planeamento de obra', 'Execução e coordenação técnica', 'Testes, entrega e recomendações'],
    idealFor: ['Moradias particulares', 'Alojamento local', 'Villas premium', 'Condomínios']
  },
  {
    slug: 'remodelacao-piscinas',
    title: 'Remodelação de piscinas',
    shortTitle: 'Remodelação',
    summary: 'Renovação visual e técnica para piscinas antigas, pouco eficientes ou com problemas recorrentes.',
    description:
      'Intervimos em revestimentos, hidráulica, iluminação, filtração, tratamento e zonas envolventes para valorizar a piscina e reduzir problemas operacionais.',
    benefits: ['Melhoria estética imediata', 'Redução de perdas e avarias', 'Maior eficiência de operação', 'Valorização do imóvel'],
    process: ['Diagnóstico técnico', 'Identificação de prioridades', 'Proposta faseada', 'Execução da remodelação', 'Validação e arranque'],
    idealFor: ['Piscinas antigas', 'Imóveis para venda', 'Unidades turísticas', 'Clientes com avarias recorrentes']
  },
  {
    slug: 'manutencao-piscinas',
    title: 'Manutenção de piscinas',
    shortTitle: 'Manutenção',
    summary: 'Planos preventivos para manter água equilibrada, equipamentos protegidos e utilização sem imprevistos.',
    description:
      'Criamos rotinas de manutenção ajustadas ao volume, tipo de tratamento, intensidade de utilização e sazonalidade da piscina.',
    benefits: ['Água limpa e segura', 'Menos urgências técnicas', 'Histórico de intervenções', 'Rotinas adaptadas à época'],
    process: ['Caracterização da piscina', 'Definição da periodicidade', 'Visitas programadas', 'Registo de parâmetros', 'Recomendações preventivas'],
    idealFor: ['Clientes particulares', 'Alojamento turístico', 'Piscinas de utilização intensiva', 'Segundas habitações']
  },
  {
    slug: 'assistencia-tecnica',
    title: 'Assistência técnica',
    shortTitle: 'Assistência',
    summary: 'Diagnóstico e resolução de avarias em bombas, filtros, tratamento, aquecimento, iluminação e automação.',
    description:
      'Apoiamos pedidos técnicos com triagem, prioridade por urgência e registo organizado para garantir resposta clara e rastreável.',
    benefits: ['Triagem por prioridade', 'Diagnóstico objetivo', 'Reparação ou proposta clara', 'Histórico técnico da avaria'],
    process: ['Pedido com descrição', 'Triagem da urgência', 'Visita técnica', 'Diagnóstico', 'Reparação ou orçamento'],
    idealFor: ['Avarias urgentes', 'Bombas e filtros', 'Aquecimento', 'Doseadores e automação']
  },
  {
    slug: 'tratamento-agua',
    title: 'Tratamento de água',
    shortTitle: 'Tratamento de água',
    summary: 'Análise, correção e otimização química para conforto, segurança e proteção dos equipamentos.',
    description:
      'Ajustamos parâmetros, identificamos causas de desequilíbrio e recomendamos rotinas ou sistemas para reduzir desperdício químico.',
    benefits: ['Conforto para banhistas', 'Água equilibrada', 'Menor consumo químico', 'Proteção de revestimentos e equipamentos'],
    process: ['Análise da água', 'Correção dos parâmetros', 'Identificação de causas', 'Plano preventivo', 'Monitorização'],
    idealFor: ['Água turva ou verde', 'Piscinas salinas', 'Piscinas com muita utilização', 'Clientes com irritações ou odores']
  },
  {
    slug: 'equipamentos-eficiencia',
    title: 'Equipamentos e eficiência energética',
    shortTitle: 'Equipamentos',
    summary: 'Bombas de calor, filtração, coberturas, iluminação LED e automação para reduzir consumos e melhorar controlo.',
    description:
      'Selecionamos e instalamos equipamentos dimensionados para a piscina e para os objetivos de conforto, eficiência e fiabilidade.',
    benefits: ['Menor custo operacional', 'Mais conforto durante a época', 'Controlo inteligente', 'Equipamentos dimensionados corretamente'],
    process: ['Auditoria ao sistema atual', 'Dimensionamento', 'Proposta de equipamentos', 'Instalação', 'Configuração e explicação ao cliente'],
    idealFor: ['Bombas de calor', 'Coberturas', 'Iluminação LED', 'Automação e controlo']
  }
];

export function getServiceBySlug(slug: string) {
  return services.find((service) => service.slug === slug);
}
