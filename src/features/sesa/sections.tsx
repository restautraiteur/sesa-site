import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Building2,
  CalendarHeart,
  Check,
  Download,
  Factory,
  Gift,
  HardHat,
  Landmark,
  MessageCircle,
  Ship,
  Sparkles,
} from "lucide-react";
import { MarqueeRow } from "@/components/marquee-row";
import {
  ABOUT,
  CATALOGUE_PDF,
  GIFTS,
  MOTTO,
  REALISATIONS,
  REFERENCES,
  SECTORS,
  SERVICES,
  SESA_PHOTOS,
  STEPS,
  TAGLINE,
  waLink,
} from "@/features/sesa/content";
import { cn } from "@core/lib/utils";

/* -------------------------------- Briques -------------------------------- */

export function Eyebrow({ children, light }: { children: ReactNode; light?: boolean | undefined }) {
  return (
    <p
      className={cn(
        "text-xs font-bold uppercase tracking-[0.2em]",
        light ? "text-accent" : "text-accent",
      )}
    >
      {children}
    </p>
  );
}

export function SectionHead({
  eyebrow,
  title,
  text,
  light,
  center = true,
}: {
  eyebrow: string;
  title: string;
  text?: string;
  light?: boolean | undefined;
  center?: boolean;
}) {
  return (
    <div className={cn("max-w-3xl", center && "mx-auto text-center")}>
      <Eyebrow light={light}>{eyebrow}</Eyebrow>
      <h2
        className={cn(
          "mt-3 font-display text-3xl font-bold leading-tight sm:text-4xl",
          light ? "text-sidebar-foreground" : "text-primary",
        )}
      >
        {title}
      </h2>
      {text && (
        <p
          className={cn(
            "mt-4 text-sm leading-7 sm:text-base",
            light ? "text-sidebar-foreground/75" : "text-muted-foreground",
          )}
        >
          {text}
        </p>
      )}
    </div>
  );
}

const BTN =
  "inline-flex h-12 items-center justify-center gap-2 rounded-full px-6 text-sm font-semibold transition-transform hover:scale-[1.03]";

export function QuoteButtons({
  light,
  wa = "Bonjour, je souhaite demander un devis.",
}: {
  light?: boolean | undefined;
  wa?: string;
}) {
  return (
    <div className="flex flex-wrap gap-3">
      <Link to="/contact" className={cn(BTN, "bg-accent text-accent-foreground")}>
        Demander un Devis
      </Link>
      <a
        href={waLink(wa)}
        target="_blank"
        rel="noreferrer"
        className={cn(
          BTN,
          light
            ? "border border-sidebar-foreground/30 text-sidebar-foreground hover:bg-sidebar-foreground/10"
            : "border border-primary/30 text-primary hover:bg-primary/5",
        )}
      >
        <MessageCircle className="size-4" /> Échanger sur WhatsApp
      </a>
    </div>
  );
}

/** Bandeau de titre des pages intérieures. */
export function PageHero({
  eyebrow,
  title,
  text,
  image,
}: {
  eyebrow: string;
  title: string;
  text?: string;
  image?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-sidebar text-sidebar-foreground">
      <img
        src={image ?? SESA_PHOTOS.real2}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 size-full object-cover opacity-30"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-sidebar/70 via-sidebar/80 to-sidebar" />
      <div className="relative mx-auto max-w-6xl px-4 pb-20 pt-36 sm:pt-44">
        <Eyebrow light>{eyebrow}</Eyebrow>
        <h1 className="mt-3 max-w-3xl font-display text-4xl font-bold leading-tight sm:text-5xl">
          {title}
        </h1>
        {text && <p className="mt-4 max-w-2xl text-sidebar-foreground/80">{text}</p>}
      </div>
    </section>
  );
}

/* --------------------------- Sections de l'accueil ------------------------ */

/** « Qui sommes-nous » (accueil). */
export function AboutTeaser() {
  return (
    <section id="qui-sommes-nous" className="scroll-mt-24 bg-background py-16 sm:py-20">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 md:grid-cols-2">
        <div className="relative">
          <img
            src={SESA_PHOTOS.real1}
            alt="Buffet SESA CATERING"
            loading="lazy"
            className="aspect-[4/3] w-full rounded-3xl object-cover shadow-warm"
          />
          <img
            src={SESA_PHOTOS.real3}
            alt=""
            aria-hidden="true"
            loading="lazy"
            className="absolute -bottom-8 -right-4 hidden w-44 rounded-2xl border-4 border-background object-cover shadow-warm sm:block"
          />
        </div>
        <div>
          <SectionHead eyebrow="Qui Sommes-Nous" title={ABOUT.title} center={false} />
          {ABOUT.intro.map((p) => (
            <p key={p} className="mt-4 text-sm leading-7 text-muted-foreground sm:text-base">
              {p}
            </p>
          ))}
          <Link
            to="/about"
            className="mt-6 inline-flex items-center gap-2 font-semibold text-accent hover:underline"
          >
            En savoir plus sur notre approche <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

/** Cartes des 5 services (accueil et page Services). */
export function ServicesGrid({ variant = "home" }: { variant?: "home" | "page" }) {
  return (
    <section id="services-teaser" className="scroll-mt-24 bg-cream py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHead
          eyebrow="Nos Services"
          title="Des solutions adaptées à vos besoins"
          text={MOTTO}
        />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s) => (
            <Link
              key={s.slug}
              to="/services/$slug"
              params={{ slug: s.slug }}
              className="group overflow-hidden rounded-3xl border border-border/60 bg-card shadow-card transition-all hover:-translate-y-1 hover:shadow-warm"
            >
              <img
                src={s.image}
                alt={s.title}
                loading="lazy"
                className="aspect-[16/10] w-full object-cover"
              />
              <div className="p-6">
                <h3 className="font-display text-xl font-bold text-primary">{s.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {variant === "home" ? s.teaser : s.summary}
                </p>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-accent">
                  {s.cta}{" "}
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          ))}
          <Link
            to="/cadeaux-entreprise"
            className="flex flex-col justify-between rounded-3xl bg-sidebar p-6 text-sidebar-foreground shadow-card transition-transform hover:-translate-y-1"
          >
            <Gift className="size-8 text-accent" />
            <div>
              <h3 className="mt-6 font-display text-xl font-bold">Cadeaux Entreprise</h3>
              <p className="mt-2 text-sm text-sidebar-foreground/75">
                Coffrets prestige pour remercier vos collaborateurs et partenaires.
              </p>
              <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-accent">
                Voir les coffrets <ArrowRight className="size-4" />
              </span>
            </div>
          </Link>
        </div>
        {variant === "home" && (
          <div className="mt-10 text-center">
            <Link to="/services" className={cn(BTN, "bg-primary text-primary-foreground")}>
              Découvrir tous nos services
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

const SECTOR_ICONS = [Building2, Factory, HardHat, Ship, Landmark];

/** « Nos solutions pour les entreprises » (accueil). */
export function SectorsSection() {
  return (
    <section className="bg-sidebar py-16 text-sidebar-foreground sm:py-20">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHead
          light
          eyebrow="Nos Solutions Pour Les Entreprises"
          title="Une Restauration Adaptée à Votre Activité"
          text="SESA CATERING adapte ses dispositifs aux exigences opérationnelles de chaque secteur d'activité au Sénégal."
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {SECTORS.map((s, i) => {
            const Icon = SECTOR_ICONS[i] ?? Building2;
            return (
              <article
                key={s.title}
                className="rounded-2xl border border-sidebar-border/60 bg-sidebar-accent/30 p-5"
              >
                <Icon className="size-7 text-accent" />
                <h3 className="mt-4 font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm leading-6 text-sidebar-foreground/75">{s.text}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/** « Nos réalisations » : aperçu (accueil) ou galerie complète (portfolio). */
export function RealisationsSection({ full = false }: { full?: boolean }) {
  const items = full ? REALISATIONS : REALISATIONS.slice(0, 3);
  return (
    <section className="bg-background py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4">
        {!full && <SectionHead eyebrow="Nos Réalisations" title="Derniers Événements" />}
        <div className={cn("grid gap-5 sm:grid-cols-2 lg:grid-cols-3", !full && "mt-10")}>
          {items.map((r) => (
            <figure
              key={r.title}
              className="group relative overflow-hidden rounded-3xl shadow-card"
            >
              <img
                src={r.image}
                alt={r.title}
                loading="lazy"
                className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-sidebar/90 to-transparent p-5 text-sidebar-foreground">
                <span className="block text-xs uppercase tracking-widest text-accent">
                  Grand Événement SESA
                </span>
                <span className="font-display text-lg font-bold">{r.title}</span>
              </figcaption>
            </figure>
          ))}
        </div>
        {!full && (
          <div className="mt-10 text-center">
            <Link
              to="/portfolio"
              className={cn(BTN, "border border-primary/30 text-primary hover:bg-primary/5")}
            >
              Voir tout le portfolio
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

/** « Nos références » : logos qui défilent. */
export function ReferencesSection() {
  const row = [...REFERENCES, ...REFERENCES];
  return (
    <section id="references" className="scroll-mt-24 border-y border-border/60 bg-card py-14">
      <div className="mx-auto max-w-6xl px-4 pb-8">
        <SectionHead eyebrow="Nos Références" title="Ils nous ont fait confiance" />
      </div>
      <MarqueeRow duration="40s">
        {row.map((r, i) => (
          <div
            key={`${r.name}-${i}`}
            className="flex h-24 w-48 shrink-0 items-center justify-center rounded-2xl border border-border/60 bg-white px-5"
            title={r.name}
          >
            <img
              src={r.logo}
              alt={r.name}
              loading="lazy"
              className="max-h-16 w-full object-contain"
            />
          </div>
        ))}
      </MarqueeRow>
    </section>
  );
}

/** Partenaire technique AMHA CATERING. */
export function TechPartnerSection() {
  return (
    <section className="bg-cream py-14">
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-4 px-4 text-center">
        <Eyebrow>Notre Partenaire Technique</Eyebrow>
        <h2 className="font-display text-3xl font-bold text-primary">AMHA CATERING</h2>
        <p className="text-muted-foreground">
          Collaboration stratégique avec AMHA CATERING, expert en restauration offshore.
        </p>
        <a
          href="https://amhacatering.com/"
          target="_blank"
          rel="noreferrer"
          className={cn(BTN, "border border-primary/30 text-primary hover:bg-primary/5")}
        >
          Visiter le site <ArrowRight className="size-4" />
        </a>
      </div>
    </section>
  );
}

/** Coffrets cadeaux : aperçu (accueil) ou catalogue (page Cadeaux). */
export function GiftsSection({ full = false }: { full?: boolean }) {
  return (
    <section id="coffrets" className="scroll-mt-24 bg-background py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4">
        {full ? (
          <SectionHead
            eyebrow="L'Art d'Offrir"
            title="Une Signature d'Excellence"
            text="Nos coffrets cadeaux sont conçus pour marquer les esprits. Que ce soit pour les fêtes de fin d'année, un événement d'entreprise ou simplement pour dire merci, offrez une expérience gustative inoubliable avec la touche SESA."
          />
        ) : (
          <SectionHead eyebrow="Notre Bonus" title="Nos Coffrets Cadeaux" />
        )}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {GIFTS.map((g) => (
            <article
              key={g.name}
              className={cn(
                "relative flex flex-col overflow-hidden rounded-3xl border bg-card shadow-card",
                g.popular ? "border-accent" : "border-border/60",
              )}
            >
              {g.popular && (
                <span className="absolute left-4 top-4 z-10 inline-flex items-center gap-1 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground">
                  <Sparkles className="size-3" /> Le Plus Populaire
                </span>
              )}
              <img
                src={g.image}
                alt={g.name}
                loading="lazy"
                className="aspect-[4/3] w-full bg-muted object-cover"
              />
              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="font-display text-xl font-bold text-primary">{g.name}</h3>
                  <span className="shrink-0 font-bold text-accent">{g.price}</span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{g.text}</p>
                {full && (
                  <ul className="mt-4 space-y-1.5 text-sm">
                    {g.items.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <Check className="mt-0.5 size-4 shrink-0 text-accent" /> {item}
                      </li>
                    ))}
                  </ul>
                )}
                <div className="mt-auto flex flex-wrap gap-2 pt-5">
                  {!full && (
                    <Link
                      to="/cadeaux-entreprise"
                      className="inline-flex h-10 items-center rounded-full border border-border px-4 text-sm font-semibold hover:bg-muted"
                    >
                      En savoir plus
                    </Link>
                  )}
                  <a
                    href={waLink(`Bonjour, je voudrais commander ce coffret - ${g.order}`)}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex h-10 items-center gap-2 rounded-full bg-accent px-4 text-sm font-semibold text-accent-foreground"
                  >
                    <MessageCircle className="size-4" /> Commander
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-10 text-center">
          {full ? (
            <div className="mx-auto max-w-xl rounded-3xl bg-sidebar p-8 text-sidebar-foreground">
              <h3 className="font-display text-2xl font-bold">Catalogue Complet 2026</h3>
              <p className="mt-2 text-sm text-sidebar-foreground/75">
                Téléchargez notre catalogue détaillé avec tous les prix et options de
                personnalisation.
              </p>
              <a
                href={CATALOGUE_PDF}
                target="_blank"
                rel="noreferrer"
                className={cn(BTN, "mt-5 bg-accent text-accent-foreground")}
              >
                <Download className="size-4" /> Télécharger le PDF
              </a>
            </div>
          ) : (
            <Link
              to="/cadeaux-entreprise"
              className={cn(BTN, "bg-primary text-primary-foreground")}
            >
              Voir Tout le Catalogue
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}

/** « Parlons de votre projet » : démarche en 5 étapes. */
export function StepsSection() {
  return (
    <section className="bg-cream py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHead
          eyebrow="Parlons De Votre Projet"
          title="Notre Démarche en 5 Étapes"
          text="Vous recherchez un partenaire de confiance pour la restauration de vos équipes ? SESA CATERING vous accompagne avec méthode et rigueur."
        />
        <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {STEPS.map((s) => (
            <li key={s.n} className="rounded-2xl border border-border/60 bg-card p-5 shadow-card">
              <span className="font-display text-4xl font-bold text-accent/40">{s.n}</span>
              <h3 className="mt-2 font-semibold text-primary">{s.title}</h3>
              <p className="mt-1 text-sm leading-6 text-muted-foreground">{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/** Appel à l'action final. */
export function FinalCta() {
  return (
    <section className="relative overflow-hidden bg-sidebar py-16 text-sidebar-foreground sm:py-20">
      <img
        src={SESA_PHOTOS.real8}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 size-full object-cover opacity-20"
      />
      <div className="relative mx-auto flex max-w-4xl flex-col items-center gap-5 px-4 text-center">
        <CalendarHeart className="size-10 text-accent" />
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">
          SESA CATERING • {TAGLINE}
        </p>
        <h2 className="font-display text-3xl font-bold sm:text-4xl">
          Votre satisfaction est notre priorité.
        </h2>
        <QuoteButtons light wa="Bonjour, je souhaite discuter d'un projet avec SESA CATERING." />
      </div>
    </section>
  );
}
