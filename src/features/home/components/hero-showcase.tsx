import { Link } from "@tanstack/react-router";
import { ArrowDown, Building2, MapPin, ShieldCheck } from "lucide-react";

import heroImage from "@/assets/plats-traiteur-header.webp";
import heroImageMobile from "@/assets/plats-traiteur-header-mobile.webp";
import { TAGLINE } from "@/features/sesa/content";

/** Points clés de SESA (repris de sesa-catering.com ; aucun chiffre inventé). */
const FACTS = [
  { icon: Building2, title: "Livraison sur site", text: "Du lundi au vendredi" },
  { icon: ShieldCheck, title: "Normes HACCP", text: "Hygiène et traçabilité" },
  { icon: MapPin, title: "Dakar & Diamniadio", text: "Entreprises et institutions" },
];

/** Bannière d'accueil SESA : titre centré sur la photo des plats. */
export function HeroShowcase() {
  return (
    <section className="relative overflow-hidden border-b border-border/70 bg-sidebar pb-20 pt-36 text-sidebar-foreground sm:pb-28 sm:pt-44">
      <img
        src={heroImage}
        srcSet={`${heroImageMobile} 960w, ${heroImage} 1920w`}
        sizes="100vw"
        alt=""
        aria-hidden="true"
        width={1920}
        height={714}
        fetchPriority="high"
        className="absolute inset-0 size-full object-cover"
      />
      {/* voile sombre pour la lisibilité du titre centré */}
      <div className="absolute inset-0 bg-gradient-to-r from-sidebar/95 via-sidebar/85 to-sidebar/70" />

      <div className="relative mx-auto max-w-4xl px-4 text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-sidebar-foreground/15 bg-sidebar-foreground/5 px-4 py-1.5 text-xs font-semibold text-sidebar-foreground/85 backdrop-blur">
          <span className="size-2 rounded-full bg-accent" />
          {TAGLINE}
        </span>
        <h1 className="mt-6 font-display text-4xl font-bold uppercase leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
          Nourrir vos équipes,
          <span className="block italic text-accent">valoriser vos événements.</span>
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-sm leading-6 text-sidebar-foreground/80 sm:text-base">
          Entreprises partenaires : vos collaborateurs choisissent leurs plats du mois en ligne,
          nous livrons sur site, et l'entreprise reçoit une seule facture. Traiteur et événementiel
          sur devis.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a
            href="#menu"
            className="inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3 text-sm font-semibold uppercase tracking-wide text-accent-foreground shadow-warm transition-transform hover:scale-105"
          >
            Voir le menu <ArrowDown className="size-4" aria-hidden="true" />
          </a>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-sidebar-foreground px-7 py-3 text-sm font-semibold uppercase tracking-wide text-sidebar transition-transform hover:scale-105"
          >
            Demander un devis
          </Link>
        </div>

        <ul className="mx-auto mt-12 grid max-w-3xl gap-3 sm:grid-cols-3">
          {FACTS.map(({ icon: Icon, title, text }) => (
            <li
              key={title}
              className="flex items-center gap-3 rounded-2xl border border-sidebar-foreground/10 bg-sidebar-foreground/5 px-4 py-3 text-left backdrop-blur"
            >
              <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
                <Icon className="size-5" aria-hidden="true" />
              </span>
              <span>
                <span className="block text-sm font-semibold">{title}</span>
                <span className="block text-xs text-sidebar-foreground/70">{text}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
