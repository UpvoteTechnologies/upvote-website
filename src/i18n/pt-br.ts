import type { Dict } from './en';

/** Brazilian Portuguese copy. Same shape and list order as `en.ts`. */
export const ptBr: Dict = {
  meta: {
    homeTitle: 'Upvote: Scanner de Alimentos para a Sua Dieta',
    homeDescription:
      'Escaneie qualquer alimento e receba uma nota de 0 a 100 feita para a sua dieta, as suas alergias e os ingredientes que você evita. Keto, diabetes, sem glúten e mais. Grátis para iPhone e Android.',
    privacyTitle: 'Política de Privacidade | Upvote',
    privacyDescription: 'O que o Upvote coleta, como os dados são usados e quais são as suas escolhas.',
    notFoundTitle: 'Página não encontrada | Upvote',
    downloadTitle: 'Baixar o Upvote',
    appDescription:
      'O Upvote é um scanner de alimentos gratuito. Configure a sua dieta uma vez, escaneie qualquer produto e veja uma nota de 0 a 100 para o quanto ele combina com você.',
  },
  nav: {
    items: [
      { id: 'diets', label: 'Dietas' },
      { id: 'features', label: 'Recursos' },
      { id: 'how-it-works', label: 'Como funciona' },
      { id: 'about', label: 'Sobre' },
      { id: 'team', label: 'Equipe' },
      { id: 'contact', label: 'Contato' },
    ],
    getApp: 'Baixar o app',
    homeLabel: 'Página inicial do Upvote',
    toggleMenu: 'Abrir menu',
    switchLanguage: 'English',
    switchLanguageShort: 'EN',
  },
  hero: {
    eyebrow: 'Escaneie · Avalie · Coma melhor',
    titleLine1: 'Saiba o que cabe',
    titleLine2: 'na sua dieta',
    lead: 'Keto, diabetes, sem glúten, baixo sódio. Configure a sua dieta uma vez e escaneie qualquer produto. O Upvote lê o rótulo e dá uma nota de 0 a 100 para o quanto ele combina com você.',
    stats: [
      { value: '8M+', label: 'Produtos no catálogo' },
      { value: '< 2s', label: 'Do scan até a nota' },
      { value: '0', label: 'Códigos de barras necessários' },
    ],
  },
  store: {
    appStoreEyebrow: 'BAIXAR NA',
    playEyebrow: 'DISPONÍVEL NO',
  },
  phone: {
    category: 'ALIMENTOS E BEBIDAS',
    product: 'Iogurte Grego Integral Natural Chobani',
    verdict: 'Excelente',
    scale: ['RUIM', 'OK', 'ÓTIMO'],
    delta: '+30 pts com o seu plano Keto',
    scoredFor: 'Nota para',
    diet: 'Keto',
    changeDiet: 'trocar dieta',
    rows: ['Carboidratos líquidos', 'Proteína', 'Gordura saturada'],
  },
  trust: {
    eyebrow: 'Parceiro de dados',
    body: 'Trabalha com o Upvote em inteligência comercial e pesquisa de percepção do consumidor.',
  },
  diets: {
    title: 'Feito para a sua dieta',
    lead: 'Conte ao Upvote como você come e o que você evita. Cada scan recebe uma nota de acordo com o seu perfil, e não com um consumidor médio que não existe. Mais de 8 milhões de produtos, avaliados em menos de dois segundos.',
    list: [
      'Keto',
      'Para diabéticos',
      'Sem glúten',
      'Baixo sódio',
      'Sem laticínios',
      'Vegana',
      'Vegetariana',
      'Baixo açúcar',
      'Rica em proteína',
      'Paleo',
      'Sem oleaginosas',
      'Low-FODMAP',
    ],
    disclaimer:
      'O Upvote compara os produtos com as preferências que você define. Ele não é um dispositivo médico e não oferece orientação médica ou nutricional. Confira sempre o rótulo físico e converse com um profissional de saúde sobre a sua dieta, principalmente se você tem alergia ou alguma condição de saúde.',
  },
  features: {
    title: 'Como o Upvote ajuda',
    lead: 'Ler um rótulo não deveria exigir um diploma de nutrição. O Upvote faz isso por você, de acordo com a dieta que você segue de verdade.',
    items: [
      {
        title: 'Configure a sua dieta',
        description:
          'Keto, para diabéticos, sem glúten e outras, além das suas alergias e de tudo o que você prefere evitar',
      },
      {
        title: 'Sem código de barras',
        description:
          'Aponte a câmera para o próprio produto. Funciona com frutas, verduras, carnes e tudo o que não tem código de barras',
      },
      {
        title: 'Nota de 0 a 100',
        description:
          'Cada produto recebe uma nota de acordo com a sua dieta, e você sabe em um segundo se ele entra no carrinho',
      },
      {
        title: 'Alertas de ingredientes',
        description:
          'O Upvote destaca os ingredientes que você pediu para acompanhar, na hora em que você escaneia o rótulo',
      },
      {
        title: 'Avaliações da sua dieta',
        description: 'Veja o que pessoas que comem como você acharam de um produto, antes de comprar',
      },
      {
        title: 'Ganhe recompensas',
        description: 'Receba Upcoins por cada avaliação útil e troque por recompensas reais',
      },
    ],
  },
  how: {
    title: 'Como funciona',
    lead: 'Cinco passos para saber exatamente o que combina com a sua dieta',
    steps: [
      {
        title: 'Baixe o Upvote',
        description: 'Comece em segundos. Baixe na App Store ou no Google Play e abra o app',
      },
      {
        title: 'Configure a sua dieta',
        description: 'Escolha a sua dieta, adicione as suas alergias e o que você evita. Leva menos de um minuto',
      },
      {
        title: 'Escaneie qualquer produto',
        description: 'Aponte a câmera para o rótulo e o Upvote lê os ingredientes e a tabela nutricional',
      },
      {
        title: 'Veja a sua nota',
        description:
          'Uma nota de 0 a 100 que mostra o quanto o produto combina com a sua dieta, além dos pontos de atenção',
      },
      {
        title: 'Ajude quem come como você',
        description:
          'Avalie o que você provou, ajude a próxima pessoa que segue a sua dieta e ganhe recompensas por isso',
      },
    ],
    cta: 'Comece agora',
  },
  about: {
    title: 'Sobre o Upvote',
    lead: 'Um app gratuito para quem tem uma dieta que não cabe no rótulo',
    body: 'Os rótulos nutricionais são escritos para um consumidor médio que não existe. Se você segue keto, tem diabetes, não come glúten ou convive com uma alergia, o rótulo deixa o trabalho com você, em todo corredor, toda vez. O Upvote faz esse trabalho. Configure a sua dieta uma vez, escaneie qualquer produto e veja uma nota de 0 a 100 para o quanto ele combina com você. Quanto mais você escaneia, mais preciso ele fica.',
    cards: [
      {
        title: 'Feito para a sua dieta',
        body: 'Keto, para diabéticos, sem glúten, baixo sódio ou uma alergia com a qual você não pode arriscar',
      },
      {
        title: 'Gratuito',
        body: 'Sem taxas escondidas, sem assinatura, sem bloqueio de recursos. O app completo, para todo mundo',
      },
      {
        title: 'Gente que come como você',
        body: 'Avaliações de pessoas que seguem a mesma dieta, e não do consumidor médio',
      },
    ],
    privacyTitle: 'Privacidade e como o Upvote se mantém gratuito',
    privacyParagraphs: [
      'Você controla o seu perfil. Atualize ou apague quando quiser.',
      'O Upvote é gratuito, sem assinatura e sem bloqueio de recursos. Ele é financiado pela transformação do que a comunidade escaneia e avalia em análises e pesquisas de consumo, licenciadas para parceiros comerciais.',
    ],
    privacyLinkBefore: 'A nossa ',
    privacyLink: 'Política de Privacidade',
    privacyLinkAfter: ' descreve exatamente o que coletamos, como os dados são usados e quais são as suas escolhas.',
    rewardsTitle: 'Programa de recompensas',
    rewardsBody:
      'Ganhe Upcoins ao contribuir com avaliações genuínas e troque por recompensas. A sua opinião sincera ajuda a próxima pessoa que segue a sua dieta e aproxima você de ótimas recompensas.',
    rewardsHow: 'Como funciona:',
    rewardSteps: [
      'Escreva avaliações úteis de produtos',
      'Ganhe Upcoins a cada contribuição',
      'Troque os seus Upcoins por recompensas, como vales-presente',
      'Acompanhe o seu saldo no app',
    ],
    rewardsFinePrint:
      'A disponibilidade e os valores podem variar por região e ao longo do tempo. Sujeito a termos. Amazon é uma marca registrada da Amazon.com, Inc. ou de suas afiliadas. A Amazon não patrocina nem endossa o Upvote.',
  },
  team: {
    title: 'Conheça a equipe',
    lead: 'Criado por pessoas que passaram a carreira dentro da indústria de alimentos, em precificação, analytics e e-commerce, e viram como pouco do que está no rótulo chega de fato ao consumidor.',
    leadership: [
      {
        role: 'Cofundador e CEO',
        highlights: [
          'Mais de 12 anos em bens de consumo, precificação e analytics na Kraft Heinz',
          'Ex-consultor de gestão na McKinsey',
          "Engenheiro mecânico, ITA '12",
          'Medalhista nacional em matemática e astronomia',
        ],
      },
      {
        role: 'Cofundador e CFO',
        highlights: [
          'Mais de 8 anos em bens de consumo, estratégia e e-commerce na Kraft Heinz',
          'Ex-consultor de gestão na Falconi',
          "Engenheiro de produção, Northwestern University '17",
          'Atleta universitário da Divisão 1, natação',
        ],
      },
      {
        role: 'CTO',
        highlights: [
          'Mais de 7 anos em desenvolvimento de software',
          'Fundador e CTO da Teora.app e da Guilda',
          "Engenheiro eletrônico, ITA '20",
          'React Native, PostgreSQL, Next.js, Node.js',
        ],
      },
    ],
    engineering: 'Engenharia',
  },
  contact: {
    title: 'Fale com a gente',
    lead: 'Tem alguma dúvida? Envie uma mensagem e responderemos o mais rápido possível.',
    infoTitle: 'Informações de contato',
    infoLead: 'Escreva para nós e retornaremos o mais rápido possível',
    email: 'E-mail',
    responseTitle: 'Tempo de resposta',
    responseBody: 'Costumamos responder em 24 a 48 horas',
    supportTitle: 'Suporte do app',
    supportBody: 'Para problemas no app, abra Ajustes → Ajuda',
    name: 'Nome',
    namePlaceholder: 'Maria Silva',
    emailPlaceholder: 'maria@exemplo.com',
    subject: 'Assunto',
    subjectPlaceholder: 'Como podemos ajudar?',
    message: 'Mensagem',
    messagePlaceholder: 'Conte mais sobre a sua dúvida...',
    send: 'Enviar mensagem',
    sending: 'Enviando...',
    sentTitle: 'Mensagem enviada!',
    sentBody: 'Obrigado pelo contato. Responderemos em breve.',
    sendAnother: 'Enviar outra mensagem',
    error: 'Não foi possível enviar a mensagem. Tente de novo ou escreva direto para o nosso e-mail.',
  },
  footer: {
    tagline: 'Saiba o que cabe na sua dieta. Escaneie qualquer produto e veja o quanto ele combina com o seu jeito de comer.',
    product: 'Produto',
    features: 'Recursos',
    howItWorks: 'Como funciona',
    download: 'Baixar o app',
    company: 'Empresa',
    about: 'Sobre nós',
    privacy: 'Privacidade',
    rewards: 'Termos de recompensas',
    contact: 'Contato',
    contactForm: 'Formulário de contato',
    support: 'Para suporte do app, abra Ajustes → Ajuda no app',
    rights: 'Upvote. Todos os direitos reservados.',
    trademark:
      'Amazon é uma marca registrada da Amazon.com, Inc. ou de suas afiliadas. A Amazon não patrocina nem endossa o Upvote.',
  },
  privacy: {
    back: 'Voltar',
    title: 'Política de Privacidade',
  },
  download: {
    redirecting: 'Redirecionando para {store}...',
  },
  pages: {
    links: [{ href: '/pt-br/artigos', label: 'Artigos' }],
    footerHeading: 'Aprenda',
  },
  articles: {
    indexTitle: 'Guias para Ler Rótulos de Alimentos | Upvote',
    indexDescription:
      'Guias simples para ler rótulos de alimentos: alergênicos, aditivos, dietas e o que as palavras da embalagem querem dizer.',
    indexHeading: 'Guias para ler o rótulo',
    indexLead:
      'O que as palavras da embalagem querem dizer e o que costuma estar dentro dos produtos que você compra. Cada guia lista as suas fontes.',
    pageLabel: 'Página',
    titleSuffix: ' | Upvote',
    breadcrumb: 'Artigos',
    sources: 'Fontes',
    whatWeDoNotKnow: 'O que isto não diz',
    planCue: 'Quando',
    planAction: 'Então',
    figureCount: 'Com base em {n} itens.',
    figureExcluded: '{n} ficaram de fora.',
    more: 'Mais guias',
    disclaimer:
      'Este texto descreve como o Upvote lê um rótulo. Ele não é orientação médica ou nutricional. Confira o rótulo físico e converse com um profissional de saúde sobre a sua dieta.',
    tiers: {
      regulatory_fact: 'Fato regulatório',
      strong: 'Evidência forte',
      moderate: 'Evidência moderada',
      weak_observational: 'Evidência inicial',
      contested: 'Evidência contestada',
      experience: 'Experiência pessoal',
    },
  },
  recipes: {
    indexTitle: 'Receitas com Informação Nutricional por Porção | Upvote',
    indexDescription:
      'Receitas simples com ingredientes por peso e informação nutricional estimada por porção. Veja no app Upvote como cada uma combina com a sua dieta.',
    indexHeading: 'Receitas',
    indexLead:
      'Receitas simples com ingredientes por peso e informação nutricional estimada por porção. Abra uma no app para ver como ela combina com a sua dieta.',
    titleSuffix: ' | Receita | Upvote',
    breadcrumb: 'Receitas',
    ingredients: 'Ingredientes',
    method: 'Modo de preparo',
    nutrition: 'Informação nutricional por porção',
    nutritionNote: 'Estimada a partir dos ingredientes. As marcas variam, então use como referência.',
    servings: 'Rende',
    prep: 'Preparo',
    cook: 'Cozimento',
    total: 'Total',
    minutes: 'min',
    more: 'Mais receitas',
    slots: { breakfast: 'Café da manhã', lunch: 'Almoço', dinner: 'Jantar', snack: 'Lanche' },
    nutrients: {
      energy_kcal: 'Calorias',
      proteins_g: 'Proteína',
      carbohydrates_g: 'Carboidratos',
      sugars_g: 'Açúcares',
      fiber_g: 'Fibra',
      fat_g: 'Gordura',
      saturated_fat_g: 'Gordura saturada',
      sodium_mg: 'Sódio',
    },
  },
  dietPages: {
    indexTitle: 'Dietas que o Upvote Confere: Keto, Sem Glúten, Vegana e Mais | Upvote',
    indexDescription:
      'Como o scanner de alimentos Upvote lê um rótulo em cada dieta: keto, sem glúten, celíaca, vegana, vegetariana, sem laticínios, halal, kosher, low-FODMAP e outras.',
    indexHeading: 'Dietas que o Upvote confere',
    indexLead:
      'Cada dieta tem o seu conjunto de regras. Estas páginas dizem o que o Upvote sinaliza no rótulo em cada uma, o que ele só aponta e o que ele não consegue dizer.',
    breadcrumb: 'Dietas',
    allDiets: 'Veja como o Upvote lê cada dieta',
    flags: 'O que o Upvote sinaliza no rótulo',
    notes: 'O que ele aponta sem decidir',
    limit: 'O que ele não consegue dizer',
    related: 'Leia mais',
    more: 'Outras dietas',
  },
  appCta: {
    title: 'Veja o quanto combina com a sua dieta',
    body: 'Configure a sua dieta uma vez e escaneie qualquer produto. O Upvote lê o rótulo e dá uma nota de 0 a 100 para você. Grátis para iPhone e Android.',
  },
  pagination: {
    previous: 'Anterior',
    next: 'Próxima',
    label: 'Páginas',
  },
  notFound: {
    title: 'Página não encontrada',
    body: 'A página que você procura não existe ou mudou de endereço.',
    cta: 'Voltar para a página inicial',
  },
};
