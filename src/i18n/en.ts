/**
 * English copy for the whole site. `pt-br.ts` must keep the same shape (it is typed as `Dict`),
 * and list entries are index-aligned with the icon arrays kept in the components.
 */
export const en = {
  meta: {
    homeTitle: 'Upvote: Food Scanner App for Your Diet',
    homeDescription:
      'Scan any food product and get a 0-100 match score built around your diet, your allergies, and the ingredients you avoid. Keto, diabetic, gluten-free and more. Free on iPhone and Android.',
    privacyTitle: 'Privacy Policy | Upvote',
    privacyDescription: 'What Upvote collects, how it is used, and the choices you have.',
    notFoundTitle: 'Page not found | Upvote',
    downloadTitle: 'Download Upvote',
    appDescription:
      'Upvote is a free food scanner. Set your diet once, scan any product, and get a 0-100 score for how well it fits you.',
  },
  nav: {
    items: [
      { id: 'diets', label: 'Diets' },
      { id: 'features', label: 'Features' },
      { id: 'how-it-works', label: 'How it works' },
      { id: 'about', label: 'About' },
      { id: 'team', label: 'Team' },
      { id: 'contact', label: 'Contact' },
    ],
    getApp: 'Get the app',
    homeLabel: 'Upvote home',
    toggleMenu: 'Toggle menu',
    switchLanguage: 'Português',
    switchLanguageShort: 'PT',
  },
  hero: {
    titleLine1: 'Know what fits',
    titleLine2: 'your diet',
    lead: 'Keto, diabetic, gluten-free, low-sodium. Set your diet once, then scan any product. Upvote reads the label and scores how well it fits, from 0 to 100.',
    // Figures come from the retailer one-pager. Anything left empty is dropped at render time.
    facts: ['8M+ products in the catalog', 'A match score in under 2 seconds', 'No barcode needed'],
  },
  store: {
    appStoreEyebrow: 'DOWNLOAD ON THE',
    playEyebrow: 'GET IT ON',
  },
  phone: {
    category: 'FOOD & BEVERAGES',
    product: 'Chobani Whole Milk Plain Greek Yogurt',
    verdict: 'Excellent',
    scale: ['BAD', 'OK', 'GREAT'],
    delta: '+30 pts from your Keto plan',
    scoredFor: 'Scored for',
    diet: 'Keto',
    changeDiet: 'change diet',
    rows: ['Net carbs', 'Protein', 'Saturated fat'],
  },
  trust: {
    eyebrow: 'Data partner',
    body: 'Working with Upvote on commercial intelligence and consumer sentiment research.',
  },
  diets: {
    title: 'Built around your diet',
    lead: "Tell Upvote how you eat and what you avoid. Every scan is scored against your profile, not against an average shopper who doesn't exist. Over 8 million products, matched in under two seconds.",
    // IMPORTANT: this list must mirror the diets the app actually ships. Anything listed here
    // that Upvote cannot score is a false claim to a shopper who downloads on the strength of it.
    list: [
      'Keto',
      'Diabetic-friendly',
      'Gluten-free',
      'Low-sodium',
      'Dairy-free',
      'Vegan',
      'Vegetarian',
      'Low-sugar',
      'High-protein',
      'Paleo',
      'Nut-free',
      'Low-FODMAP',
    ],
    disclaimer:
      'Upvote matches products against the preferences you set. It is not a medical device and does not provide medical or dietary advice. Always check the physical label and talk to a healthcare professional about your diet, especially if you have an allergy or a medical condition.',
  },
  features: {
    title: 'How Upvote helps',
    lead: "Reading a label shouldn't take a nutrition degree. Upvote does it for you, against the diet you actually follow.",
    items: [
      {
        title: 'Set your diet',
        description:
          'Keto, diabetic-friendly, gluten-free and more, plus your allergies and anything else you steer clear of',
      },
      {
        title: 'No barcode needed',
        description:
          'Point your camera at the product itself. It works on produce, meats, and anything with no barcode to find',
      },
      {
        title: 'A match score from 0 to 100',
        description:
          'Every product is scored against your diet, so you know in a second whether it belongs in your cart',
      },
      {
        title: 'Ingredient flags',
        description:
          'Upvote highlights the ingredients you asked it to watch for, right when you scan the label',
      },
      {
        title: 'Reviews from your diet',
        description: 'See what people eating the way you eat thought of a product, before you buy it',
      },
      {
        title: 'Earn rewards',
        description: 'Get Upcoins for every helpful review and redeem them for real rewards',
      },
    ],
  },
  how: {
    title: 'How it works',
    lead: 'Five steps between you and knowing exactly what fits your diet',
    steps: [
      {
        title: 'Download Upvote',
        description: 'Get started in seconds. Download from the App Store or Google Play and open the app',
      },
      {
        title: 'Set your diet',
        description: 'Pick your diet, add your allergies and anything you avoid. It takes under a minute',
      },
      {
        title: 'Scan any product',
        description: 'Point your camera at the label and Upvote reads the ingredients and nutrition facts',
      },
      {
        title: 'Get your match score',
        description: 'A 0-100 score showing how well the product fits the diet you set, plus what to watch for',
      },
      {
        title: 'Help others like you',
        description: 'Review what you tried, help the next person on your diet, and earn rewards for it',
      },
    ],
    cta: 'Get the app',
  },
  about: {
    title: 'About Upvote',
    lead: "A free app for everyone whose diet doesn't fit the label",
    body: "Nutrition labels are written for an average shopper who doesn't exist. If you're keto, diabetic, gluten-free, or managing an allergy, the label makes you do the work every aisle, every time. Upvote does it for you. Set your diet once, scan any product, and get a 0–100 score for how well it fits you specifically. The more you scan, the sharper it gets.",
    cards: [
      {
        title: 'Built for your diet',
        body: "Keto, diabetic-friendly, gluten-free, low-sodium, or an allergy you can't take chances on",
      },
      {
        title: 'Free to use',
        body: 'No hidden fees, no subscriptions, no paywall. The full app, for everyone',
      },
      {
        title: 'People who eat like you',
        body: 'Reviews from people managing the same diet, not from the average shopper',
      },
    ],
    privacyTitle: 'Privacy and how Upvote stays free',
    privacyParagraphs: [
      'You are in control of your profile. Update it or delete it at any time.',
      'Upvote is free, with no subscription and no paywall. We fund it by turning what the community scans and reviews into consumer insights and research that we license to business partners.',
    ],
    privacyLinkBefore: 'Our ',
    privacyLink: 'Privacy Policy',
    privacyLinkAfter: ' sets out exactly what we collect, how it is used, and the choices you have.',
    rewardsTitle: 'Rewards program',
    rewardsBody:
      'Earn Upcoins for contributing genuine reviews and redeem them for rewards. Your honest feedback helps the next person on your diet, and gets you closer to great rewards.',
    rewardsHow: 'How it works',
    rewardSteps: [
      'Write helpful product reviews',
      'Earn Upcoins for each contribution',
      'Redeem your Upcoins for rewards like gift cards',
      'Track your balance in the app',
    ],
    rewardsFinePrint:
      'Availability and amounts may vary by region and over time. Terms apply. Amazon is a trademark of Amazon.com, Inc. or its affiliates. Amazon does not sponsor or endorse Upvote.',
  },
  team: {
    title: 'Meet the team',
    lead: "Built by people who spent their careers inside the food industry, in pricing, analytics and eCommerce, and saw how little of what's on the label ever reaches the shopper.",
    leadership: [
      {
        role: 'Co-Founder & CEO',
        highlights: [
          '12+ years in CPG, Pricing & Analytics at Kraft Heinz',
          'Former Management Consultant at McKinsey',
          "Mechanical Engineer, ITA '12",
          'National medalist in Math and Astronomy',
        ],
      },
      {
        role: 'Co-Founder & CFO',
        highlights: [
          '8+ years in CPG, Strategy & eCommerce at Kraft Heinz',
          'Former Management Consultant at Falconi',
          "Industrial Engineer, Northwestern University '17",
          'Division 1 student-athlete, Swimming',
        ],
      },
      {
        role: 'CTO',
        highlights: [
          '7+ years in software development',
          'Founder & CTO at Teora.app and Guilda',
          "Electronic Engineer, ITA '20",
          'React Native, PostgreSQL, Next.js, Node.js',
        ],
      },
    ],
    engineering: 'Engineering',
  },
  contact: {
    title: 'Get in touch',
    lead: "Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.",
    email: 'Email',
    responseTitle: 'Response time',
    responseBody: 'We typically respond within 24-48 hours',
    supportTitle: 'App support',
    supportBody: 'For app issues, open Settings → Help',
    name: 'Name',
    namePlaceholder: 'John Doe',
    emailPlaceholder: 'john@example.com',
    subject: 'Subject',
    subjectPlaceholder: 'How can we help?',
    message: 'Message',
    messagePlaceholder: 'Tell us more about your inquiry...',
    send: 'Send message',
    sending: 'Sending...',
    sentTitle: 'Message sent',
    sentBody: "Thank you for reaching out. We'll get back to you soon.",
    sendAnother: 'Send another message',
    error: 'Failed to send message. Please try again or email us directly.',
  },
  footer: {
    tagline: 'Know what fits your diet. Scan any product and see how well it matches the way you eat.',
    product: 'Product',
    features: 'Features',
    howItWorks: 'How it works',
    download: 'Download app',
    company: 'Company',
    about: 'About us',
    privacy: 'Privacy',
    rewards: 'Rewards terms',
    contact: 'Contact',
    contactForm: 'Contact form',
    support: 'For app support, open Settings → Help in the app',
    rights: 'Upvote. All rights reserved.',
    trademark: 'Amazon is a trademark of Amazon.com, Inc. or its affiliates. Amazon does not sponsor or endorse Upvote.',
  },
  privacy: {
    back: 'Back',
    title: 'Privacy Policy',
  },
  download: {
    // `{store}` is replaced with the store's name.
    redirecting: 'Redirecting to {store}...',
  },
  pages: {
    // Header and footer links to the content sections. `href` is a full site path.
    links: [
      { href: '/articles', label: 'Articles' },
      { href: '/recipes', label: 'Recipes' },
    ],
    footerHeading: 'Learn',
  },
  articles: {
    indexTitle: 'Food Label Guides and Ingredient Explainers | Upvote',
    indexDescription:
      'Plain guides to reading food labels: allergens and the names they hide behind, additives, diets, and what is usually inside common products.',
    indexHeading: 'Guides to reading the label',
    indexLead:
      'What the words on a pack mean, which names an allergen hides behind, and what is usually inside the products you buy. Each one is a preview of a guide in the Upvote app.',
    pageLabel: 'Page',
    titleSuffix: ' | Upvote',
    breadcrumb: 'Articles',
    inThisGuide: 'What the full guide covers',
    sourceCount: 'The guide cites {n} published sources.',
    appTitle: 'Read the full guide in the app',
    appBody:
      'This is a preview. The full guide, with every section and its sources, is in the Upvote app. Download it, open the app and find this guide in the articles.',
    more: 'More guides',
    disclaimer:
      'This describes how Upvote reads a label. It is not medical or dietary advice. Check the physical label and talk to a healthcare professional about your diet.',
    tiers: {
      regulatory_fact: 'Regulatory fact',
      strong: 'Strong evidence',
      moderate: 'Moderate evidence',
      weak_observational: 'Early evidence',
      contested: 'Contested evidence',
      experience: 'Personal experience',
    } as Record<string, string>,
  },
  recipes: {
    indexTitle: 'Recipes in the Upvote App | Upvote',
    indexDescription:
      'A preview of the recipes in the Upvote app. Get the quantities, method and nutrition per serving in the app, and see how each one fits your diet.',
    indexHeading: 'Recipes',
    indexLead:
      'A preview of the recipes in the Upvote app. Open one in the app for the quantities, the method and how it fits your diet.',
    titleSuffix: ' Recipe | Upvote',
    breadcrumb: 'Recipes',
    ingredients: 'What goes in it',
    steps: '{n} steps',
    appTitle: 'Get the full recipe in the app',
    appBody:
      'This is a preview. The quantities, the method and the nutrition per serving are in the Upvote app, where you also see how the recipe fits your diet. Download it and open the app to cook it.',
    servings: 'Serves',
    prep: 'Prep',
    cook: 'Cook',
    total: 'Total',
    minutes: 'min',
    more: 'More recipes',
    slots: { breakfast: 'Breakfast', lunch: 'Lunch', dinner: 'Dinner', snack: 'Snack' } as Record<string, string>,
  },
  dietPages: {
    indexTitle: 'Diets Upvote Checks: Keto, Gluten-Free, Vegan and More | Upvote',
    indexDescription:
      'How the Upvote food scanner reads a label for each diet: keto, gluten-free, celiac, vegan, vegetarian, dairy-free, halal, kosher, low-FODMAP and more.',
    indexHeading: 'Diets Upvote checks',
    indexLead:
      'Each diet has its own set of rules. These pages say what Upvote flags on a label for each one, what it only points out, and what it cannot tell you.',
    breadcrumb: 'Diets',
    allDiets: 'See how Upvote reads each diet',
    flags: 'What Upvote flags on a label',
    notes: 'What it points out without deciding',
    limit: 'What it cannot tell you',
    related: 'Read more',
    more: 'Other diets',
  },
  appCta: {
    title: 'See how it fits your diet',
    body: 'Set your diet once and scan any product. Upvote reads the label and scores it from 0 to 100 for you. Free on iPhone and Android.',
  },
  pagination: {
    previous: 'Previous',
    next: 'Next',
    label: 'Pages',
  },
  notFound: {
    title: 'Page not found',
    body: 'The page you are looking for does not exist or has moved.',
    cta: 'Back to the home page',
  },
};

export type Dict = typeof en;
