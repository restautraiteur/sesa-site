import { useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Award,
  CalendarCheck,
  Check,
  ChevronLeft,
  ChevronRight,
  Expand,
  HeartHandshake,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  ShieldCheck,
  Shuffle,
  X,
} from "lucide-react";
import { cn } from "@core/lib/utils";
import { SiteFooter, SiteHeader } from "@/components/site-header";
import { Input } from "@ui/components/ui/input";
import { Textarea } from "@ui/components/ui/textarea";
import {
  ABOUT,
  CONTACT,
  EVENT_TYPES,
  REALISATIONS,
  SERVICES,
  SESA_PHOTOS,
  waLink,
  type ServiceSlug,
} from "@/features/sesa/content";
import {
  Eyebrow,
  FinalCta,
  GiftsSection,
  PageHero,
  QuoteButtons,
  RealisationsSection,
  ReferencesSection,
  SectionHead,
  ServicesGrid,
} from "@/features/sesa/sections";

function Shell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader overlay />
      <main>{children}</main>
      <SiteFooter />
    </div>
  );
}

/* --------------------------------- À propos ------------------------------ */

const COMMITMENT_ICONS = [Award, ShieldCheck, CalendarCheck, Shuffle, HeartHandshake];

export function AboutPage() {
  return (
    <Shell>
      <PageHero eyebrow="Qui Sommes-Nous ?" title={ABOUT.title} image={SESA_PHOTOS.real7} />

      {/* Présentation : texte + mosaïque de photos */}
      <section className="bg-background py-16 sm:py-24">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 lg:grid-cols-2">
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <img
              src={SESA_PHOTOS.real2}
              alt="Buffet SESA Catering"
              loading="lazy"
              className="col-span-2 aspect-[16/10] w-full rounded-3xl object-cover shadow-warm"
            />
            <img
              src={SESA_PHOTOS.real5}
              alt="Détails gourmands"
              loading="lazy"
              className="aspect-square w-full rounded-3xl object-cover shadow-card"
            />
            <div className="relative">
              <img
                src={SESA_PHOTOS.real8}
                alt="Mise en place"
                loading="lazy"
                className="aspect-square w-full rounded-3xl object-cover shadow-card"
              />
              <span className="absolute -bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap rounded-full bg-accent px-4 py-2 text-xs font-semibold text-accent-foreground shadow-warm">
                <MapPin className="size-3.5" /> Diamniadio · Dakar
              </span>
            </div>
          </div>
          <div>
            <Eyebrow>Notre histoire</Eyebrow>
            <h2 className="mt-3 font-display text-3xl font-bold leading-tight text-primary sm:text-4xl">
              Une restauration de qualité, adaptée à chaque environnement professionnel
            </h2>
            <div className="mt-6 space-y-4 text-sm leading-7 text-muted-foreground sm:text-base">
              {ABOUT.intro.map((p) => (
                <p key={p}>{p}</p>
              ))}
              <p>{ABOUT.base}</p>
            </div>
            <p className="mt-6 rounded-2xl border-l-4 border-accent bg-accent/5 p-4 text-sm font-semibold leading-6 text-primary sm:text-base">
              {ABOUT.approach}
            </p>
          </div>
        </div>
      </section>

      {/* Chiffres clés (repris de sesa-catering.com) */}
      <section className="bg-sidebar py-12 text-sidebar-foreground">
        <dl className="mx-auto grid max-w-5xl gap-8 px-4 text-center sm:grid-cols-3">
          {ABOUT.stats.map((s) => (
            <div key={s.label}>
              <dd className="font-display text-5xl font-bold text-accent">{s.value}</dd>
              <dt className="mt-2 text-sm text-sidebar-foreground/75">{s.label}</dt>
            </div>
          ))}
        </dl>
      </section>

      {/* Organisation sur mesure */}
      <section className="bg-cream py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4">
          <SectionHead
            eyebrow="Sur mesure"
            title={ABOUT.adaptTitle.replace(/ :$/, "")}
            text="Avant de démarrer, nous étudions avec vous chaque paramètre de votre site."
          />
          <ul className="mx-auto mt-10 grid max-w-4xl gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {ABOUT.adapt.map((a) => (
              <li
                key={a}
                className="flex items-center gap-3 rounded-2xl border border-border/60 bg-card p-4 text-sm font-medium shadow-card"
              >
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
                  <Check className="size-4" />
                </span>
                {a}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Engagements */}
      <section className="bg-background py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4">
          <SectionHead
            eyebrow="Nos Engagements"
            title={ABOUT.commitmentsTitle}
            text={ABOUT.commitmentsIntro}
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {ABOUT.commitments.map((c, i) => {
              const Icon = COMMITMENT_ICONS[i] ?? Award;
              return (
                <article
                  key={c.title}
                  className="group rounded-3xl border border-border/60 bg-card p-6 shadow-card transition-transform hover:-translate-y-1"
                >
                  <span className="flex size-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground transition-colors group-hover:bg-accent">
                    <Icon className="size-6" />
                  </span>
                  <h3 className="mt-4 font-display text-lg font-bold text-primary">{c.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{c.text}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <ReferencesSection />

      {/* Pourquoi nous choisir : photo + liste */}
      <section className="bg-background py-16 sm:py-20">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <SectionHead
              eyebrow="Pourquoi Choisir SESA CATERING ?"
              title={ABOUT.whyTitle}
              center={false}
            />
            <ol className="mt-8 space-y-5">
              {ABOUT.why.map((w, i) => (
                <li key={w.title} className="flex gap-4">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-full border-2 border-accent font-display text-sm font-bold text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-semibold text-primary">{w.title}</h3>
                    <p className="mt-1 text-sm leading-6 text-muted-foreground">{w.text}</p>
                  </div>
                </li>
              ))}
            </ol>
            <div className="mt-8">
              <QuoteButtons />
            </div>
          </div>
          <img
            src={SESA_PHOTOS.real9}
            alt="Service de buffet SESA Catering"
            loading="lazy"
            className="aspect-[4/5] w-full rounded-[2rem] object-cover shadow-warm"
          />
        </div>
      </section>
    </Shell>
  );
}

/* --------------------------------- Services ------------------------------ */

export function ServicesPage() {
  return (
    <Shell>
      <PageHero
        eyebrow="Nos Services"
        title="Des solutions adaptées à vos besoins"
        text="Nourrir vos équipes. Valoriser vos événements. Simplifier votre quotidien."
        image={SESA_PHOTOS.real4}
      />
      <nav
        aria-label="Nos services"
        className="sticky top-0 z-10 border-b border-border/60 bg-background/90 backdrop-blur"
      >
        <div className="mx-auto flex max-w-6xl gap-2 overflow-x-auto px-4 py-3 scrollbar-hide">
          {SERVICES.map((s) => (
            <a
              key={s.slug}
              href={`#${s.slug}`}
              className="shrink-0 rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold text-primary transition-colors hover:border-accent hover:text-accent"
            >
              {s.title}
            </a>
          ))}
          <a
            href="#cadeaux"
            className="shrink-0 rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold text-primary transition-colors hover:border-accent hover:text-accent"
          >
            Cadeaux Entreprise
          </a>
        </div>
      </nav>

      <div className="bg-background">
        {SERVICES.map((s, i) => (
          <section
            key={s.slug}
            id={s.slug}
            className={cn("scroll-mt-20 py-14 sm:py-20", i % 2 === 1 && "bg-cream")}
          >
            <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 lg:grid-cols-2 lg:gap-16">
              <div className={cn("relative", i % 2 === 1 && "lg:order-2")}>
                <img
                  src={s.image}
                  alt={s.title}
                  loading="lazy"
                  className="aspect-[4/3] w-full rounded-[2rem] object-cover shadow-warm"
                />
                <span className="absolute -top-4 left-6 rounded-full bg-primary px-4 py-1.5 font-display text-sm font-bold text-primary-foreground shadow-card">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <div>
                <Eyebrow>{s.page.eyebrow}</Eyebrow>
                <h2 className="mt-3 font-display text-3xl font-bold leading-tight text-primary sm:text-4xl">
                  {s.title}
                </h2>
                <p className="mt-4 text-sm leading-7 text-muted-foreground sm:text-base">
                  {s.summary}
                </p>
                <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
                  {s.page.list.slice(0, 6).map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm">
                      <Check className="mt-0.5 size-4 shrink-0 text-accent" /> {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link
                    to="/services/$slug"
                    params={{ slug: s.slug }}
                    className="inline-flex h-11 items-center gap-2 rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
                  >
                    {s.cta} <ArrowRight className="size-4" />
                  </Link>
                  <a
                    href={waLink(`Bonjour, je souhaite un devis : ${s.title}.`)}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex h-11 items-center gap-2 rounded-full border border-primary/30 px-6 text-sm font-semibold text-primary"
                  >
                    <MessageCircle className="size-4" /> Devis WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>

      <div id="cadeaux" className="scroll-mt-20">
        <GiftsSection />
      </div>
      <ReferencesSection />
      <FinalCta />
    </Shell>
  );
}

export function ServiceDetailPage({ slug }: { slug: ServiceSlug }) {
  const service = SERVICES.find((s) => s.slug === slug) ?? SERVICES[0]!;
  const { page } = service;
  const others = SERVICES.filter((s) => s.slug !== service.slug);
  return (
    <Shell>
      <PageHero eyebrow={page.eyebrow} title={page.title} image={service.image} />
      <section className="bg-background py-16">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 lg:grid-cols-[1fr_24rem]">
          <div>
            {page.intro.map((p) => (
              <p key={p} className="mb-4 text-sm leading-7 text-muted-foreground sm:text-base">
                {p}
              </p>
            ))}
            <h2 className="mt-8 font-display text-2xl font-bold text-primary">{page.listTitle}</h2>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {page.list.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 rounded-xl border border-border/60 bg-card p-4 text-sm shadow-card"
                >
                  <Check className="mt-0.5 size-4 shrink-0 text-accent" /> {item}
                </li>
              ))}
            </ul>
            {page.extraTitle && (
              <div className="mt-8 rounded-3xl bg-cream p-6">
                <h2 className="font-display text-xl font-bold text-primary">{page.extraTitle}</h2>
                <p className="mt-2 text-sm leading-7 text-muted-foreground">{page.extra}</p>
              </div>
            )}
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/contact"
                className="inline-flex h-12 items-center rounded-full bg-accent px-6 text-sm font-semibold text-accent-foreground"
              >
                {page.button}
              </Link>
              <a
                href={waLink(`Bonjour, je souhaite un devis : ${service.title}.`)}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-12 items-center gap-2 rounded-full border border-primary/30 px-6 text-sm font-semibold text-primary"
              >
                <MessageCircle className="size-4" /> Demander un devis via WhatsApp
              </a>
            </div>
          </div>
          <aside className="space-y-4">
            <img
              src={service.image}
              alt={service.title}
              className="aspect-[4/5] w-full rounded-3xl object-cover shadow-warm"
            />
            <div className="rounded-3xl border border-border/60 bg-card p-5">
              <p className="text-xs font-bold uppercase tracking-widest text-accent">
                Nos autres services
              </p>
              <ul className="mt-3 space-y-2 text-sm">
                {others.map((o) => (
                  <li key={o.slug}>
                    <Link
                      to="/services/$slug"
                      params={{ slug: o.slug }}
                      className="font-medium text-primary hover:underline"
                    >
                      {o.title}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    to="/cadeaux-entreprise"
                    className="font-medium text-primary hover:underline"
                  >
                    Cadeaux Entreprise
                  </Link>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </section>
      <FinalCta />
    </Shell>
  );
}

/* ---------------------------------- Cadeaux ------------------------------ */

export function GiftsPage() {
  return (
    <Shell>
      <PageHero
        eyebrow="SESA CATERING"
        title="Cadeaux d'Affaires & Coffrets Prestige"
        text="Remerciez vos collaborateurs et partenaires avec notre sélection exclusive de coffrets gourmands et raffinés."
        image={SESA_PHOTOS.real9}
      />
      <GiftsSection full />
    </Shell>
  );
}

/* --------------------------------- Portfolio ----------------------------- */

export function PortfolioPage() {
  const [open, setOpen] = useState<number | null>(null);
  const photo = open === null ? null : REALISATIONS[open];
  const step = (d: number) =>
    setOpen((i) => (i === null ? i : (i + d + REALISATIONS.length) % REALISATIONS.length));
  return (
    <Shell>
      <PageHero
        eyebrow="Nos Réalisations"
        title="Grand Événement SESA"
        text="Découvrez en images notre expertise lors de cet événement d'exception."
        image={SESA_PHOTOS.real8}
      />
      <section className="bg-background py-16 sm:py-20">
        <div className="mx-auto max-w-6xl columns-1 gap-4 px-4 sm:columns-2 lg:columns-3">
          {REALISATIONS.map((r, i) => (
            <button
              key={r.title}
              type="button"
              onClick={() => setOpen(i)}
              className="group relative mb-4 block w-full break-inside-avoid overflow-hidden rounded-3xl shadow-card"
            >
              <img
                src={r.image}
                alt={r.title}
                loading="lazy"
                className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <span className="absolute inset-0 bg-gradient-to-t from-sidebar/90 via-sidebar/10 to-transparent opacity-90 transition-opacity group-hover:opacity-100" />
              <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5 text-left text-sidebar-foreground">
                <span>
                  <span className="block text-[11px] font-semibold uppercase tracking-widest text-accent">
                    Grand Événement SESA
                  </span>
                  <span className="mt-1 block font-display text-xl font-bold">{r.title}</span>
                </span>
                <Expand className="size-5 shrink-0 opacity-80" />
              </span>
            </button>
          ))}
        </div>
      </section>

      {photo && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={photo.title}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={() => setOpen(null)}
          onKeyDown={(e) => {
            if (e.key === "Escape") setOpen(null);
            if (e.key === "ArrowRight") step(1);
            if (e.key === "ArrowLeft") step(-1);
          }}
          tabIndex={-1}
          ref={(el) => el?.focus()}
        >
          <img
            src={photo.image}
            alt={photo.title}
            className="max-h-[85vh] max-w-full rounded-2xl object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          <p className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full bg-black/60 px-4 py-2 text-sm font-semibold text-white">
            {photo.title} · {(open ?? 0) + 1} / {REALISATIONS.length}
          </p>
          {(
            [
              [-1, "Photo précédente", ChevronLeft, "left-3"],
              [1, "Photo suivante", ChevronRight, "right-3"],
            ] as const
          ).map(([d, label, Icon, pos]) => (
            <button
              key={label}
              type="button"
              aria-label={label}
              className={cn(
                "absolute top-1/2 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-white hover:bg-white/25",
                pos,
              )}
              onClick={(e) => {
                e.stopPropagation();
                step(d);
              }}
            >
              <Icon className="size-6" />
            </button>
          ))}
          <button
            type="button"
            aria-label="Fermer"
            className="absolute right-4 top-4 flex size-11 items-center justify-center rounded-full bg-white/15 text-white hover:bg-white/25"
            onClick={() => setOpen(null)}
          >
            <X className="size-6" />
          </button>
        </div>
      )}
      <FinalCta />
    </Shell>
  );
}

/* ---------------------------------- Contact ------------------------------ */

function ContactField({ id, label, children }: { id: string; label: string; children: ReactNode }) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="text-sm font-medium text-foreground">
        {label}
      </label>
      {children}
    </div>
  );
}

export function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    type: EVENT_TYPES[0]!,
    date: "",
    people: "",
    message: "",
  });
  const valid = form.name.trim() && form.email.trim() && form.phone.trim() && form.message.trim();
  const text = [
    "Bonjour SESA CATERING, je souhaite un devis.",
    `Nom : ${form.name}`,
    `Email : ${form.email}`,
    `Téléphone : ${form.phone}`,
    `Type d'événement : ${form.type}`,
    form.date && `Date : ${form.date}`,
    form.people && `Nombre de personnes : ${form.people}`,
    `Projet : ${form.message}`,
  ]
    .filter(Boolean)
    .join("\n");
  const set = (key: keyof typeof form) => (e: { target: { value: string } }) =>
    setForm({ ...form, [key]: e.target.value });
  const mapQuery = encodeURIComponent("Domaine Industriel Diamniadio, Sénégal");

  return (
    <Shell>
      <PageHero
        eyebrow="Contactez-Nous"
        title="Demandez Votre Devis"
        text="Parlez-nous de votre projet, nous vous répondrons dans les plus brefs délais."
        image={SESA_PHOTOS.real6}
      />
      <section className="relative -mt-10 pb-16 sm:pb-20">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 lg:grid-cols-[1fr_22rem]">
          <form
            className="space-y-5 rounded-[2rem] border border-border/60 bg-card p-6 shadow-warm sm:p-10"
            onSubmit={(e) => {
              e.preventDefault();
              if (valid) window.open(waLink(text), "_blank", "noopener");
            }}
          >
            <div>
              <h2 className="font-display text-2xl font-bold text-primary sm:text-3xl">
                Parlons de votre projet
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Les champs marqués * sont obligatoires. Votre demande part sur WhatsApp ou par
                email, au choix.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <ContactField id="c-name" label="Nom et prénom *">
                <Input id="c-name" required value={form.name} onChange={set("name")} />
              </ContactField>
              <ContactField id="c-company" label="Type de prestation">
                <select
                  id="c-company"
                  className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
                  value={form.type}
                  onChange={set("type")}
                >
                  {EVENT_TYPES.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </ContactField>
              <ContactField id="c-email" label="Email *">
                <Input
                  id="c-email"
                  type="email"
                  required
                  value={form.email}
                  onChange={set("email")}
                />
              </ContactField>
              <ContactField id="c-phone" label="Téléphone *">
                <Input
                  id="c-phone"
                  type="tel"
                  required
                  placeholder="77 000 00 00"
                  value={form.phone}
                  onChange={set("phone")}
                />
              </ContactField>
              <ContactField id="c-date" label="Date souhaitée">
                <Input id="c-date" type="date" value={form.date} onChange={set("date")} />
              </ContactField>
              <ContactField id="c-people" label="Nombre de personnes">
                <Input
                  id="c-people"
                  type="number"
                  min={1}
                  value={form.people}
                  onChange={set("people")}
                />
              </ContactField>
            </div>
            <ContactField id="c-message" label="Votre projet *">
              <Textarea
                id="c-message"
                rows={5}
                required
                placeholder="Lieu, horaires, type de cuisine, budget…"
                value={form.message}
                onChange={set("message")}
              />
            </ContactField>
            <div className="flex flex-wrap gap-3">
              <button
                type="submit"
                disabled={!valid}
                className="inline-flex h-12 items-center gap-2 rounded-full bg-accent px-7 text-sm font-semibold text-accent-foreground shadow-warm transition-opacity disabled:opacity-50"
              >
                <MessageCircle className="size-4" /> Envoyer sur WhatsApp
              </button>
              <a
                href={`mailto:${CONTACT.email}?subject=${encodeURIComponent("Demande de devis")}&body=${encodeURIComponent(text)}`}
                className="inline-flex h-12 items-center gap-2 rounded-full border border-primary/30 px-7 text-sm font-semibold text-primary"
              >
                <Mail className="size-4" /> Envoyer par email
              </a>
            </div>
          </form>

          <aside className="space-y-4">
            <a
              href={waLink("Bonjour SESA CATERING, j'aimerais échanger sur un projet.")}
              target="_blank"
              rel="noreferrer"
              className="block rounded-[2rem] bg-sidebar p-6 text-sidebar-foreground shadow-warm ring-1 ring-accent/40 transition-transform hover:-translate-y-0.5"
            >
              <span className="flex size-12 items-center justify-center rounded-2xl bg-accent text-accent-foreground">
                <MessageCircle className="size-6" />
              </span>
              <p className="mt-4 font-display text-xl font-bold">Une question rapide ?</p>
              <p className="mt-1 text-sm text-sidebar-foreground/75">
                Écrivez-nous directement sur WhatsApp.
              </p>
              <p className="mt-3 font-semibold text-accent">{CONTACT.phones[0]!.display}</p>
            </a>
            <div className="space-y-5 rounded-[2rem] border border-border/60 bg-card p-6 shadow-card">
              <div className="flex gap-3">
                <Phone className="mt-0.5 size-5 shrink-0 text-accent" />
                <div>
                  <p className="font-semibold text-primary">Téléphone</p>
                  {CONTACT.phones.map((p) => (
                    <a
                      key={p.tel}
                      href={`tel:${p.tel}`}
                      className="block text-sm text-muted-foreground hover:text-accent"
                    >
                      {p.display}
                    </a>
                  ))}
                </div>
              </div>
              <div className="flex gap-3">
                <Mail className="mt-0.5 size-5 shrink-0 text-accent" />
                <div>
                  <p className="font-semibold text-primary">Email</p>
                  <a
                    href={`mailto:${CONTACT.email}`}
                    className="text-sm text-muted-foreground hover:text-accent"
                  >
                    {CONTACT.email}
                  </a>
                </div>
              </div>
              <div className="flex gap-3">
                <MapPin className="mt-0.5 size-5 shrink-0 text-accent" />
                <div>
                  <p className="font-semibold text-primary">Adresse</p>
                  {CONTACT.address.map((l) => (
                    <p key={l} className="text-sm text-muted-foreground">
                      {l}
                    </p>
                  ))}
                </div>
              </div>
              <div className="flex flex-wrap gap-2 border-t border-border pt-4">
                {CONTACT.socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full border border-border px-3 py-1.5 text-xs font-semibold text-primary hover:border-accent hover:text-accent"
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            </div>
          </aside>
        </div>

        <div className="mx-auto mt-6 max-w-6xl px-4">
          <iframe
            title="Plan d'accès : Domaine Industriel Diamniadio"
            src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-80 w-full rounded-[2rem] border border-border/60 shadow-card"
          />
        </div>
      </section>
    </Shell>
  );
}
