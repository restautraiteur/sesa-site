/**
 * Contenus de SESA Catering, repris de sesa-catering.com (pages, sections, textes, images).
 * Tous les textes du site vitrine sont ici : les modifier ici suffit.
 */
import real1 from "@/assets/sesa/realisations/sesa-catering1.webp";
import real2 from "@/assets/sesa/realisations/sesa-catering2.webp";
import real3 from "@/assets/sesa/realisations/sesa-catering3.webp";
import real4 from "@/assets/sesa/realisations/sesa-catering4.webp";
import real5 from "@/assets/sesa/realisations/sesa-catering5.webp";
import real6 from "@/assets/sesa/realisations/sesa-catering6.webp";
import real7 from "@/assets/sesa/realisations/sesa-catering7.webp";
import real8 from "@/assets/sesa/realisations/sesa-catering8.webp";
import real9 from "@/assets/sesa/realisations/sesa-catering9.webp";
import coffretElegance from "@/assets/sesa/coffrets/elegance.webp";
import coffretSynergie from "@/assets/sesa/coffrets/synergie.webp";
import coffretSignature from "@/assets/sesa/coffrets/signature.webp";
import coffretOasis from "@/assets/sesa/coffrets/oasis.webp";
import coffretNotebook from "@/assets/sesa/coffrets/notebook.webp";
import refSmd from "@/assets/sesa/references/spheres-ministerielles-diamniadio.webp";
import refSodipharm from "@/assets/sesa/references/sodipharm.svg";
import refEiffage from "@/assets/sesa/references/eiffage.svg";
import refEnvol from "@/assets/sesa/references/envol-immobilier.svg";
import refSewacard from "@/assets/sesa/references/sewacard-industrie.jpg";
import refAibd from "@/assets/sesa/references/aibd.png";
import refAprosi from "@/assets/sesa/references/aprosi.png";
import refCis from "@/assets/sesa/references/club-investisseurs-senegalais.png";

export const SESA_PHOTOS = { real1, real2, real3, real4, real5, real6, real7, real8, real9 };

export const CONTACT = {
  address: ["Domaine Industriel Diamniadio", "Mermoz Sacré-Cœur, Dakar", "Sénégal"],
  phones: [
    { display: "+221 77 398 61 37", tel: "+221773986137" },
    { display: "+221 78 861 55 55", tel: "+221788615555" },
  ],
  email: "contact@sesa-catering.com",
  socials: [
    { label: "Instagram", href: "https://www.instagram.com/sesacatering/" },
    { label: "Facebook", href: "https://www.facebook.com/sesacaters/" },
    { label: "LinkedIn", href: "https://www.linkedin.com/company/sesacatering" },
  ],
};

export function waLink(text: string) {
  return `https://wa.me/221773986137?text=${encodeURIComponent(text)}`;
}

export const TAGLINE = "Restauration collective • Service traiteur • Restauration rapide";
export const MOTTO = "Nourrir vos équipes. Valoriser vos événements. Simplifier votre quotidien.";
export const FOOTER_TEXT =
  "Des solutions de restauration adaptées à vos besoins opérationnels et événementiels au Sénégal. Nourrir vos équipes, valoriser vos événements.";

/* ------------------------------- Services ------------------------------- */

export type ServiceSlug = "collective" | "traiteur" | "rapide" | "corporate" | "mariage";

export type Service = {
  slug: ServiceSlug;
  title: string;
  /** Texte de la carte (accueil). */
  teaser: string;
  /** Texte de la carte (page Services). */
  summary: string;
  cta: string;
  image: string;
  page: {
    eyebrow: string;
    title: string;
    intro: string[];
    listTitle: string;
    list: string[];
    extraTitle?: string;
    extra?: string;
    button: string;
    metaTitle: string;
  };
};

export const SERVICES: Service[] = [
  {
    slug: "collective",
    title: "Restauration Collective",
    teaser:
      "Gestion de cantines d'entreprise, sites industriels et bases-vie. Menus équilibrés, équipes en horaires continus ou décalés, et respect strict des normes HACCP.",
    summary:
      "Gestion quotidienne pour entreprises, sites industriels, bases-vie et chantiers. Menus équilibrés, service régulier et respect strict des normes sanitaires.",
    cta: "Découvrir l'offre",
    image: real6,
    page: {
      eyebrow: "Une restauration pensée pour vos équipes",
      title: "Restauration Collective Dakar",
      intro: [
        "SESA CATERING accompagne les entreprises, institutions, sites industriels et chantiers dans la gestion de leurs besoins quotidiens en restauration collective.",
        "Nous adaptons nos prestations aux différents rythmes de travail et aux contraintes spécifiques de chaque environnement professionnel : travail continu, équipes postées, cantines d'entreprise ou bases-vie éloignées.",
      ],
      listTitle: "Nos Prestations en Restauration Collective",
      list: [
        "Élaboration de menus équilibrés, variés et rotatifs",
        "Préparation et production soignée des repas & plats du jour",
        "Service en restaurant d'entreprise et cantines",
        "Formules petit-déjeuner, déjeuner, dîner et collations",
        "Prise en charge des repas pour équipes en horaires décalés (24/7)",
        "Gestion complète des espaces de restauration et logistique de service",
        "Nettoyage et remise en état des espaces dédiés (normes HACCP)",
      ],
      extraTitle: "Notre Engagement",
      extra:
        "Des repas réguliers, sains et adaptés aux besoins nutritionnels de vos collaborateurs. Notre organisation garantit une qualité et une sécurité constante, depuis l'approvisionnement jusqu'au service.",
      button: "Demander une Étude / Devis",
      metaTitle: "Restauration Collective Dakar - Gestion Cantine & Sites",
    },
  },
  {
    slug: "traiteur",
    title: "Service Traiteur",
    teaser:
      "Prestations sur mesure pour séminaires, réunions, cocktails, buffets et réceptions officielles. Une gastronomie soignée pour sublimer vos événements.",
    summary:
      "Cocktails, buffets, déjeuners d'affaires, pauses-café et réceptions officielles. Des prestations sur mesure adaptées à chaque événement.",
    cta: "En savoir plus",
    image: real3,
    page: {
      eyebrow: "Vos Événements, Notre Savoir-Faire",
      title: "Service Traiteur Dakar",
      intro: [
        "Pour vos réunions professionnelles, séminaires, formations, cérémonies ou événements d'entreprise, SESA CATERING propose des solutions traiteur adaptées à chaque occasion.",
        "De la livraison de plateaux-repas savoureux à l'organisation complète d'un événement d'envergure, nous vous accompagnons avec rigueur, créativité et sens du détail.",
      ],
      listTitle: "Nos Prestations Traiteur",
      list: [
        "Cocktails déjeunatoires & dînatoires",
        "Buffets chauds et froids",
        "Déjeuners et dîners professionnels",
        "Pauses-café & petits-déjeuners d'affaires",
        "Plateaux-repas livrés sur site",
        "Réceptions officielles & événements institutionnels",
        "Cérémonies, réunions et sessions de formation",
      ],
      extraTitle: "Une prestation sur mesure",
      extra:
        "Nous adaptons nos propositions à vos critères exacts : nombre de participants + type d'événement + budget + lieu + horaires + niveau de service souhaité.",
      button: "Demander un Devis Traiteur",
      metaTitle: "Service Traiteur Dakar - Événements & Entreprises",
    },
  },
  {
    slug: "rapide",
    title: "Restauration Rapide",
    teaser:
      "Une offre pratique, rapide et savoureuse : sandwichs gourmets, burgers, salades fraîches, plats du jour à emporter et formules déjeuners adaptées aux rythmes intenses.",
    summary:
      "Une offre pratique, rapide et savoureuse : sandwichs gourmets, burgers, salades fraîches, plats à emporter et formules déjeuner adaptées.",
    cta: "Découvrir les formules",
    image: real5,
    page: {
      eyebrow: "Une offre pratique, rapide et accessible",
      title: "Restauration Rapide Dakar",
      intro: [
        "SESA CATERING développe des solutions de restauration rapide qualitatives, spécialement pensées pour les environnements professionnels et les lieux à forte fréquentation.",
        "Notre objectif : permettre aux collaborateurs, visiteurs et usagers de bénéficier d'une pause repas rapide, savoureuse, fraîche et accessible à tous les budgets.",
      ],
      listTitle: "Notre Offre au Quotidien",
      list: [
        "Sandwichs gourmets et wraps fraîcheur",
        "Burgers artisanaux et frites",
        "Salades composées équilibrées",
        "Plats chauds du jour à emporter",
        "Snacks salés et encas gourmands",
        "Desserts variés, fruits de saison et pâtisseries",
        "Boissons fraîches, jus locaux et cafés",
      ],
      extraTitle: "Des Formules Adaptées à Votre Environnement",
      extra:
        "Nous concevons des offres modulaires selon les besoins de votre site : Formule Express | Formule Déjeuner | Formule à Emporter | Offre Entreprise.",
      button: "Mettre en place une offre rapide",
      metaTitle: "Restauration Rapide Dakar - Formules Express & À Emporter",
    },
  },
  {
    slug: "corporate",
    title: "Événementiel Corporate",
    teaser:
      "Organisation complète de vos rencontres professionnelles : séminaires, afterworks, inaugurations et galas d'entreprise. Nous gérons tout de A à Z.",
    summary:
      "Organisation clé en main de vos rencontres professionnelles : séminaires, conférences, afterworks et célébrations d'entreprise.",
    cta: "En savoir plus",
    image: real2,
    page: {
      eyebrow: "Événements Professionnels",
      title: "Traiteur Entreprise Dakar",
      intro: [
        "Réussissez vos événements professionnels avec SESA CATERING, le partenaire de confiance des entreprises à Dakar.",
        "Séminaires, conférences, lancements de produits ou simples réunions d'équipe : nous apportons une touche de goût et de professionnalisme à chacune de vos rencontres. Nous nous adaptons à vos contraintes horaires et logistiques.",
      ],
      listTitle: "Solutions Corporate",
      list: [
        "Pauses café et petits-déjeuners d'affaires",
        "Plateaux repas livrés au bureau",
        "Cocktails dînatoires et Buffets Prestige",
        "Dîners de Gala",
      ],
      button: "Devis Événement Entreprise",
      metaTitle: "Traiteur Entreprise Dakar - Séminaires & Cocktails",
    },
  },
  {
    slug: "mariage",
    title: "Mariages & Célébrations",
    teaser:
      "Faites de votre mariage un moment inoubliable. Buffets spectaculaires, pièces montées et menus sur mesure pour votre journée spéciale.",
    summary:
      "Sublimez vos plus beaux moments privés avec des buffets spectaculaires, un service d'exception et une cuisine raffinée.",
    cta: "Découvrir",
    image: real1,
    page: {
      eyebrow: "Mariages & Célébrations",
      title: "Traiteur Mariage Dakar",
      intro: [
        "Faites de votre union un moment inoubliable avec SESA CATERING, votre traiteur mariage de référence à Dakar et partout au Sénégal.",
        "Nous comprenons que votre mariage est l'un des jours les plus importants de votre vie. C'est pourquoi nous mettons tout en œuvre pour offrir une expérience culinaire exceptionnelle, alliant tradition sénégalaise et raffinement international.",
      ],
      listTitle: "Nos Prestations Mariage",
      list: [
        "Menu sur mesure (Buffet ou Service à l'assiette)",
        "Vin d'honneur et Cocktail de bienvenue",
        "Pièces montées et Desserts raffinés",
        "Service en salle professionnel",
      ],
      button: "Obtenez un Devis Mariage",
      metaTitle: "Traiteur Mariage Dakar - Organisation Réception Sénégal",
    },
  },
];

/* --------------------------- Secteurs (accueil) -------------------------- */

export const SECTORS = [
  {
    title: "Entreprises & Administrations",
    text: "Restaurant d'entreprise, déjeuners de direction, pauses-café exécutives et événements internes.",
  },
  {
    title: "Sites Industriels",
    text: "Solutions de restauration adaptées aux cadences et contraintes techniques des équipes opérationnelles.",
  },
  {
    title: "Chantiers & Bases-Vie",
    text: "Organisation complète des repas pour les équipes déployées sur sites éloignés ou en horaires postés.",
  },
  {
    title: "Ports & Zones Logistiques",
    text: "Restauration continue adaptée aux personnels travaillant en horaires continus, décalés ou par équipes (24/7).",
  },
  {
    title: "Événements & Institutions",
    text: "Cocktails diplomatiques, buffets de séminaires, cérémonies protocolaires et réceptions d'envergure.",
  },
];

/* ------------------------------- Références ------------------------------ */

export const REFERENCES = [
  { name: "Sphères Ministérielles de Diamniadio", logo: refSmd },
  { name: "Sodipharm", logo: refSodipharm },
  { name: "Eiffage", logo: refEiffage },
  { name: "Envol Immobilier", logo: refEnvol },
  { name: "Sewacard Industrie", logo: refSewacard },
  { name: "AIBD", logo: refAibd },
  { name: "APROSI", logo: refAprosi },
  { name: "Club Des Investisseurs Sénégalais", logo: refCis },
];

/* ------------------------------ Réalisations ----------------------------- */

export const REALISATIONS = [
  { title: "Buffet & Présentation", image: real3 },
  { title: "Service Traiteur", image: real4 },
  { title: "Détails Gourmands", image: real5 },
  { title: "Restauration & Accueil", image: real6 },
  { title: "Mise en Place", image: real7 },
  { title: "Ambiance", image: real8 },
  { title: "Gastronomie", image: real9 },
  { title: "Service à Table", image: real1 },
  { title: "Excellence", image: real2 },
];

/* --------------------------------- Coffrets ------------------------------ */

export const GIFTS = [
  {
    name: "Coffret Élégance",
    price: "30.000 FCFA",
    text: "Un ensemble technologique et pratique pour le professionnel moderne.",
    items: ["Notebook", "Stylo", "Clé USB", "Souris", "Clavier Wireless"],
    image: coffretElegance,
    order: "Coffret Elegance",
  },
  {
    name: "Coffret Synergie",
    price: "35.000 FCFA",
    text: "Le kit complet pour une productivité maximale avec une touche d'élégance.",
    items: ["Clavier, Souris, Tapis Cuir", "Notebook, Stylo, Clé USB", "Organizer, Malette"],
    image: coffretSynergie,
    order: "Coffret Synergie",
  },
  {
    name: "Coffret Signature",
    price: "25.000 FCFA",
    text: "L'alliance parfaite entre l'utile et l'agréable.",
    items: ["Sac Cuir, Notebook", "Parapluie, Cadre Photo", "Mug"],
    image: coffretSignature,
    order: "Coffret Signature",
    popular: true,
  },
  {
    name: "Coffret Oasis",
    price: "20.000 FCFA",
    text: "Simplicité et efficacité pour vos collaborateurs.",
    items: ["Mug avec Thermostat", "Stylo", "Notebook"],
    image: coffretOasis,
    order: "Coffret Oasis",
  },
  {
    name: "Pack Notebooks",
    price: "5.500 FCFA",
    text: "L'indispensable du quotidien en version premium.",
    items: ["Notebook Cuir", "Notebook Couverture Croco"],
    image: coffretNotebook,
    order: "Pack Notebook",
  },
];

export const CATALOGUE_PDF = "/sesa/catalogue-cadeaux-2026.pdf";

/* ---------------------------------- Démarche ----------------------------- */

export const STEPS = [
  {
    n: "01",
    title: "Écouter",
    text: "Comprendre votre organisation, vos contraintes et vos attentes précises.",
  },
  {
    n: "02",
    title: "Analyser",
    text: "Évaluer le nombre de convives, les horaires, les menus et le budget.",
  },
  {
    n: "03",
    title: "Proposer",
    text: "Construire une offre technique et tarifaire personnalisée.",
  },
  {
    n: "04",
    title: "Déployer",
    text: "Mettre en place les équipes qualifiées et la logistique nécessaire.",
  },
  {
    n: "05",
    title: "Suivre",
    text: "Mesurer la satisfaction convives et améliorer en continu la qualité.",
  },
];

/* --------------------------------- À propos ------------------------------ */

export const ABOUT = {
  title: "SESA CATERING, votre partenaire restauration",
  intro: [
    "SESA CATERING accompagne les entreprises, institutions, sites industriels, chantiers, bases-vie et organisations dans la mise en place de solutions de restauration adaptées à leurs exigences opérationnelles.",
    "Notre ambition est simple : offrir une restauration de qualité, accessible et adaptée aux contraintes de chaque environnement professionnel.",
  ],
  base: "Basée à Diamniadio, Dakar, notre équipe mobilise son savoir-faire avec une attention permanente portée à la fraîcheur des repas, à l'hygiène, à la régularité du service et à la satisfaction des convives.",
  adaptTitle: "Notre organisation s'adapte à vos spécificités :",
  adapt: [
    "Nombre de convives",
    "Horaires de travail & équipes",
    "Contraintes du site & logistique",
    "Type de cuisine souhaité",
    "Cadre budgétaire",
    "Besoins permanents ou ponctuels",
  ],
  approach:
    "Notre approche : Comprendre votre besoin, construire la solution et assurer un service régulier et professionnel.",
  stats: [
    { value: "500+", label: "Événements Réalisés" },
    { value: "200+", label: "Clients Satisfaits" },
    { value: "100%", label: "Normes Sanitaires Respectées" },
  ],
  commitmentsTitle: "Qualité. Hygiène. Régularité. Satisfaction.",
  commitmentsIntro:
    "Chez SESA CATERING, la restauration professionnelle ne se limite pas à servir un repas. Elle doit répondre aux plus hauts standards d'hygiène, de sécurité alimentaire et de ponctualité.",
  commitments: [
    {
      title: "Qualité",
      text: "Une sélection rigoureuse des produits, une préparation minutieuse et une présentation soignée à chaque assiette.",
    },
    {
      title: "Hygiène & Sécurité",
      text: "Application stricte des bonnes pratiques sanitaires et des normes HACCP à chaque étape de la chaîne alimentaire.",
    },
    {
      title: "Régularité",
      text: "Notre objectif : garantir une qualité de service constante et ponctuelle, jour après jour et sur chaque site.",
    },
    {
      title: "Flexibilité",
      text: "Capacité d'ajustement immédiat aux variations d'effectifs, aux horaires décalés et aux imprévus d'exploitation.",
    },
    {
      title: "Satisfaction",
      text: "Écoute active des retours convives et amélioration continue pour créer des moments de restauration fédérateurs.",
    },
  ],
  whyTitle: "Votre besoin, notre solution",
  why: [
    {
      title: "Une offre complète",
      text: "Un seul partenaire pour vos besoins en restauration collective, service traiteur et restauration rapide.",
    },
    {
      title: "Une approche sur mesure",
      text: "Chaque prestation est construite en fonction précise de vos contraintes opérationnelles et budgétaires.",
    },
    {
      title: "Organisation professionnelle",
      text: "Des brigades qualifiées et mobilisées pour assurer la préparation, le service et le suivi de vos prestations.",
    },
    {
      title: "Attention portée à la qualité",
      text: "Parce que la santé et la satisfaction de vos collaborateurs et invités sont au cœur de notre démarche.",
    },
    {
      title: "Capacité d'adaptation avérée",
      text: "Du service quotidien d'une cantine d'entreprise à la prestation événementielle ponctuelle, nous calibrons nos ressources à votre rythme.",
    },
  ],
};

export const EVENT_TYPES = [
  "Restauration Collective",
  "Service Traiteur",
  "Événementiel Corporate",
  "Mariage & Célébration",
  "Autre",
];
