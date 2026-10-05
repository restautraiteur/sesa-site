import { useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { Check, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { SiteFooter, SiteHeader } from "@/components/site-header";
import { Input } from "@ui/components/ui/input";
import { Textarea } from "@ui/components/ui/textarea";
import {
  ABOUT,
  CONTACT,
  EVENT_TYPES,
  SERVICES,
  SESA_PHOTOS,
  waLink,
  type ServiceSlug,
} from "@/features/sesa/content";
import {
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

export function AboutPage() {
  return (
    <Shell>
      <PageHero eyebrow="Qui Sommes-Nous ?" title={ABOUT.title} image={SESA_PHOTOS.real7} />
      <section className="bg-background py-16">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 md:grid-cols-2">
          <div className="space-y-4 text-sm leading-7 text-muted-foreground sm:text-base">
            {ABOUT.intro.map((p) => (
              <p key={p}>{p}</p>
            ))}
            <p>{ABOUT.base}</p>
            <p className="font-semibold text-primary">{ABOUT.approach}</p>
          </div>
          <div className="rounded-3xl border border-border/60 bg-card p-6 shadow-card">
            <h2 className="font-semibold text-primary">{ABOUT.adaptTitle}</h2>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {ABOUT.adapt.map((a) => (
                <li key={a} className="flex items-start gap-2 text-sm">
                  <Check className="mt-0.5 size-4 shrink-0 text-accent" /> {a}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <dl className="mx-auto mt-12 grid max-w-4xl grid-cols-3 divide-x divide-border px-4 text-center">
          {ABOUT.stats.map((s) => (
            <div key={s.label} className="px-2">
              <dd className="font-display text-4xl font-bold text-accent sm:text-5xl">{s.value}</dd>
              <dt className="mt-1 text-xs text-muted-foreground sm:text-sm">{s.label}</dt>
            </div>
          ))}
        </dl>
      </section>
      <ReferencesSection />
      <section className="bg-cream py-16">
        <div className="mx-auto max-w-6xl px-4">
          <SectionHead
            eyebrow="Nos Engagements"
            title={ABOUT.commitmentsTitle}
            text={ABOUT.commitmentsIntro}
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {ABOUT.commitments.map((c) => (
              <article
                key={c.title}
                className="rounded-2xl border border-border/60 bg-card p-5 shadow-card"
              >
                <h3 className="font-semibold text-primary">{c.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{c.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-background py-16">
        <div className="mx-auto max-w-6xl px-4">
          <SectionHead eyebrow="Pourquoi Choisir SESA CATERING ?" title={ABOUT.whyTitle} />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {ABOUT.why.map((w, i) => (
              <article
                key={w.title}
                className="flex gap-4 rounded-2xl border border-border/60 bg-card p-5 shadow-card"
              >
                <span className="font-display text-3xl font-bold text-accent/40">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-semibold text-primary">{w.title}</h3>
                  <p className="mt-1 text-sm leading-6 text-muted-foreground">{w.text}</p>
                </div>
              </article>
            ))}
          </div>
          <div className="mt-10 flex justify-center">
            <QuoteButtons />
          </div>
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
      <ServicesGrid variant="page" />
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
  return (
    <Shell>
      <PageHero
        eyebrow="Nos Réalisations"
        title="Grand Événement SESA"
        text="Découvrez en images notre expertise lors de cet événement d'exception."
        image={SESA_PHOTOS.real8}
      />
      <RealisationsSection full />
      <FinalCta />
    </Shell>
  );
}

/* ---------------------------------- Contact ------------------------------ */

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

  return (
    <Shell>
      <PageHero
        eyebrow="Contactez-Nous"
        title="Demandez Votre Devis"
        text="Parlez-nous de votre projet, nous vous répondrons dans les plus brefs délais"
        image={SESA_PHOTOS.real3}
      />
      <section className="bg-background py-16">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 lg:grid-cols-[22rem_1fr]">
          <aside className="space-y-4">
            <div className="flex gap-3 rounded-2xl border border-border/60 bg-card p-5 shadow-card">
              <MapPin className="size-5 shrink-0 text-accent" />
              <div>
                <p className="font-semibold text-primary">Adresse</p>
                {CONTACT.address.map((l) => (
                  <p key={l} className="text-sm text-muted-foreground">
                    {l}
                  </p>
                ))}
              </div>
            </div>
            <div className="flex gap-3 rounded-2xl border border-border/60 bg-card p-5 shadow-card">
              <Phone className="size-5 shrink-0 text-accent" />
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
                <p className="text-xs text-muted-foreground">Disponibles sur WhatsApp</p>
              </div>
            </div>
            <div className="flex gap-3 rounded-2xl border border-border/60 bg-card p-5 shadow-card">
              <Mail className="size-5 shrink-0 text-accent" />
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
          </aside>

          <form
            className="space-y-4 rounded-3xl border border-border/60 bg-card p-6 shadow-card sm:p-8"
            onSubmit={(e) => {
              e.preventDefault();
              if (valid) window.open(waLink(text), "_blank", "noopener");
            }}
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <Input placeholder="Votre nom *" required value={form.name} onChange={set("name")} />
              <Input
                type="email"
                placeholder="Votre email *"
                required
                value={form.email}
                onChange={set("email")}
              />
              <Input
                type="tel"
                placeholder="Votre téléphone *"
                required
                value={form.phone}
                onChange={set("phone")}
              />
              <select
                aria-label="Type d'événement"
                className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
                value={form.type}
                onChange={set("type")}
              >
                {EVENT_TYPES.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
              <Input
                type="date"
                aria-label="Date de l'événement"
                value={form.date}
                onChange={set("date")}
              />
              <Input
                type="number"
                min={1}
                placeholder="Nombre de personnes"
                value={form.people}
                onChange={set("people")}
              />
            </div>
            <Textarea
              rows={5}
              placeholder="Décrivez votre projet *"
              required
              value={form.message}
              onChange={set("message")}
            />
            <div className="flex flex-wrap gap-3">
              <button
                type="submit"
                disabled={!valid}
                className="inline-flex h-12 items-center gap-2 rounded-full bg-accent px-6 text-sm font-semibold text-accent-foreground disabled:opacity-50"
              >
                <MessageCircle className="size-4" /> Envoyer la demande (WhatsApp)
              </button>
              <a
                href={`mailto:${CONTACT.email}?subject=${encodeURIComponent("Demande de devis")}&body=${encodeURIComponent(text)}`}
                className="inline-flex h-12 items-center gap-2 rounded-full border border-primary/30 px-6 text-sm font-semibold text-primary"
              >
                <Mail className="size-4" /> Par email
              </a>
            </div>
          </form>
        </div>
      </section>
    </Shell>
  );
}
