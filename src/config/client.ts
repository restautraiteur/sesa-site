/**
 * Configuration propre au client — À RENSEIGNER pour chaque restaurant.
 * Les fonctionnalités génériques lisent ces valeurs au lieu d'écrire le nom ou les contacts en dur.
 * À remplacer aussi : `src/core/assets/logo.png`, les couleurs de `src/styles.css`, les photos de
 * `src/assets/` et les contenus marqués « exemple » (voir doc/personnaliser.md).
 */
export const CLIENT = {
  /** Nom affiché aux clients (messages, paiement, textes). */
  name: "Mon Restaurant",
  /** Nom complet (pied de page, texte alternatif du logo). */
  legalName: "Mon Restaurant",
  /** Numéro WhatsApp au format international, sans « + » ni espaces. */
  whatsapp: "221770000000",
  /** Le même numéro tel qu'affiché sur le site. */
  whatsappDisplay: "77 000 00 00",
  /** Ville ou zone de livraison. */
  city: "Dakar",
  /** Abonnements repas activés sur le site. */
  subscriptions: true,
  /** Module « Entreprises partenaires » : les employés enrôlés commandent, facturé à leur entreprise. */
  partners: false,
} as const;

/** Lien WhatsApp du restaurant. */
export const WHATSAPP_URL = `https://wa.me/${CLIENT.whatsapp}`;
