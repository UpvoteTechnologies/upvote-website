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
      { id: 'how-it-works', label: 'How It Works' },
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
    eyebrow: 'Scan · Score · Eat better',
    titleLine1: 'Know What Fits',
    titleLine2: 'Your Diet',
    lead: 'Keto, diabetic, gluten-free, low-sodium. Set your diet once, then scan any product. Upvote reads the label and scores how well it fits, from 0 to 100.',
    // Figures come from the retailer one-pager. Anything left empty is dropped at render time.
    stats: [
      { value: '8M+', label: 'Products in catalog' },
      { value: '< 2s', label: 'Scan to match score' },
      { value: '0', label: 'Barcodes needed' },
    ],
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
    title: 'Built Around Your Diet',
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
    title: 'How Upvote Helps',
    lead: "Reading a label shouldn't take a nutrition degree. Upvote does it for you, against the diet you actually follow.",
    items: [
      {
        title: 'Set Your Diet',
        description:
          'Keto, diabetic-friendly, gluten-free and more, plus your allergies and anything else you steer clear of',
      },
      {
        title: 'No Barcode Needed',
        description:
          'Point your camera at the product itself. It works on produce, meats, and anything with no barcode to find',
      },
      {
        title: 'Match Score 0-100',
        description:
          'Every product is scored against your diet, so you know in a second whether it belongs in your cart',
      },
      {
        title: 'Ingredient Flags',
        description:
          'Upvote highlights the ingredients you asked it to watch for, right when you scan the label',
      },
      {
        title: 'Reviews From Your Diet',
        description: 'See what people eating the way you eat thought of a product, before you buy it',
      },
      {
        title: 'Earn Rewards',
        description: 'Get Upcoins for every helpful review and redeem them for real rewards',
      },
    ],
  },
  how: {
    title: 'How It Works',
    lead: 'Five steps between you and knowing exactly what fits your diet',
    steps: [
      {
        title: 'Download Upvote',
        description: 'Get started in seconds. Download from the App Store or Google Play and open the app',
      },
      {
        title: 'Set Your Diet',
        description: 'Pick your diet, add your allergies and anything you avoid. It takes under a minute',
      },
      {
        title: 'Scan Any Product',
        description: 'Point your camera at the label and Upvote reads the ingredients and nutrition facts',
      },
      {
        title: 'Get Your Match Score',
        description: 'A 0-100 score showing how well the product fits the diet you set, plus what to watch for',
      },
      {
        title: 'Help Others Like You',
        description: 'Review what you tried, help the next person on your diet, and earn rewards for it',
      },
    ],
    cta: 'Start Your Journey',
  },
  about: {
    title: 'About Upvote',
    lead: "A free app for everyone whose diet doesn't fit the label",
    body: "Nutrition labels are written for an average shopper who doesn't exist. If you're keto, diabetic, gluten-free, or managing an allergy, the label makes you do the work every aisle, every time. Upvote does it for you. Set your diet once, scan any product, and get a 0–100 score for how well it fits you specifically. The more you scan, the sharper it gets.",
    cards: [
      {
        title: 'Built For Your Diet',
        body: "Keto, diabetic-friendly, gluten-free, low-sodium, or an allergy you can't take chances on",
      },
      {
        title: 'Free to Use',
        body: 'No hidden fees, no subscriptions, no paywall. The full app, for everyone',
      },
      {
        title: 'People Who Eat Like You',
        body: 'Reviews from people managing the same diet, not from the average shopper',
      },
    ],
    privacyTitle: 'Privacy & How Upvote Stays Free',
    privacyParagraphs: [
      'You are in control of your profile. Update it or delete it at any time.',
      'Upvote is free, with no subscription and no paywall. We fund it by turning what the community scans and reviews into consumer insights and research that we license to business partners.',
    ],
    privacyLinkBefore: 'Our ',
    privacyLink: 'Privacy Policy',
    privacyLinkAfter: ' sets out exactly what we collect, how it is used, and the choices you have.',
    rewardsTitle: 'Rewards Program',
    rewardsBody:
      'Earn Upcoins for contributing genuine reviews and redeem them for rewards. Your honest feedback helps the next person on your diet, and gets you closer to great rewards.',
    rewardsHow: 'How it works:',
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
    title: 'Meet the Team',
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
    title: 'Get In Touch',
    lead: "Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.",
    infoTitle: 'Contact Information',
    infoLead: "Reach out and we'll get back to you as soon as possible",
    email: 'Email',
    responseTitle: 'Response Time',
    responseBody: 'We typically respond within 24-48 hours',
    supportTitle: 'App Support',
    supportBody: 'For app issues, open Settings → Help',
    name: 'Name',
    namePlaceholder: 'John Doe',
    emailPlaceholder: 'john@example.com',
    subject: 'Subject',
    subjectPlaceholder: 'How can we help?',
    message: 'Message',
    messagePlaceholder: 'Tell us more about your inquiry...',
    send: 'Send Message',
    sending: 'Sending...',
    sentTitle: 'Message Sent!',
    sentBody: "Thank you for reaching out. We'll get back to you soon.",
    sendAnother: 'Send Another Message',
    error: 'Failed to send message. Please try again or email us directly.',
  },
  footer: {
    tagline: 'Know what fits your diet. Scan any product and see how well it matches the way you eat.',
    product: 'Product',
    features: 'Features',
    howItWorks: 'How It Works',
    download: 'Download App',
    company: 'Company',
    about: 'About Us',
    privacy: 'Privacy',
    rewards: 'Rewards Terms',
    contact: 'Contact',
    contactForm: 'Contact Form',
    support: 'For app support, open Settings → Help in the app',
    rights: 'Upvote. All rights reserved.',
    trademark: 'Amazon is a trademark of Amazon.com, Inc. or its affiliates. Amazon does not sponsor or endorse Upvote.',
  },
  privacy: {
    back: 'Back',
    title: 'Privacy Policy',
  },
  notFound: {
    title: 'Page not found',
    body: 'The page you are looking for does not exist or has moved.',
    cta: 'Back to the home page',
  },
};

export type Dict = typeof en;
