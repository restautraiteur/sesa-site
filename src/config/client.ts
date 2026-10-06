/**
 * Configuration propre au client : SESA Catering.
 * Les fonctionnalités génériques lisent ces valeurs au lieu d'écrire le nom ou les contacts en dur.
 * À remplacer aussi : `src/core/assets/logo.png`, les couleurs de `src/styles.css`, les photos de
 * `src/assets/` et les contenus marqués « exemple » (voir doc/personnaliser.md).
 */
export const CLIENT = {
  /** Nom affiché aux clients (messages, paiement, textes). */
  name: "SESA Catering",
  /** Nom complet (pied de page, texte alternatif du logo). */
  legalName: "SESA Catering",
  /** Nom court affiché à côté du logo dans le menu. */
  brand: "SESA Catering",
  /** Numéro WhatsApp au format international, sans « + » ni espaces. */
  whatsapp: "221773986137",
  /** Le même numéro tel qu'affiché sur le site. */
  whatsappDisplay: "77 398 61 37",
  /** Ville ou zone de livraison. */
  city: "Dakar",
  /** Abonnements repas activés sur le site. */
  subscriptions: false,
  /** Module « Entreprises partenaires » : les employés enrôlés commandent, facturé à leur entreprise. */
  partners: true,
  /** Livraisons individuelles (adresse + paiement). false = commandes entreprises uniquement. */
  individualOrders: false,
} as const;

/** Lien WhatsApp du restaurant. */
export const WHATSAPP_URL = `https://wa.me/${CLIENT.whatsapp}`;
