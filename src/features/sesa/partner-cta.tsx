import { useEffect, useRef } from "react";
import { Link } from "@tanstack/react-router";
import { Building2, Check, FileText } from "lucide-react";
import cliente from "@/assets/sesa/cliente-entreprise.webp";

/**
 * Bandeau d'accueil « Entreprises partenaires », à cheval entre le menu et les jus (même mise en page
 * que le bandeau abonnement de Ndelli's ; la section des jus lit --abo-overlap pour réserver la place).
 */
export function PartnerCta() {
  const cardRef = useRef<HTMLDivElement>(null);

  // Moitié sur le menu, moitié sur les jus : le chevauchement vaut la moitié de la hauteur du bandeau.
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    const root = document.documentElement;
    const update = () => root.style.setProperty("--abo-overlap", `${card.offsetHeight / 2}px`);
    update();
    const observer = new ResizeObserver(update);
    observer.observe(card);
    return () => {
      observer.disconnect();
      root.style.removeProperty("--abo-overlap");
    };
  }, []);

  return (
    <section className="abo-cta relative z-20 mb-[calc(var(--abo-overlap,10rem)*-1)] mt-2 px-4 lg:mt-0 lg:pt-16">
      <div
        ref={cardRef}
        className="relative mx-auto grid max-w-6xl overflow-hidden rounded-[2rem] bg-sidebar text-sidebar-foreground shadow-warm lg:grid-cols-[1.1fr_1fr] lg:overflow-visible"
      >
        {/* fond graphique : halo et motif de points, rognés aux coins arrondis */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 overflow-hidden rounded-[2rem]"
        >
          <div className="absolute -left-24 -top-24 size-72 rounded-full bg-accent/15 blur-3xl" />
          <div
            className="absolute bottom-0 right-0 h-2/3 w-1/2 opacity-[0.12]"
            style={{
              backgroundImage: "radial-gradient(currentColor 1.5px, transparent 1.5px)",
              backgroundSize: "18px 18px",
            }}
          />
        </div>

        <div className="relative flex flex-col gap-5 px-6 pt-10 sm:px-10 lg:py-16">
          <p className="inline-flex w-fit items-center gap-2 rounded-full bg-accent/15 px-3 py-1 text-xs font-bold uppercase tracking-widest text-accent">
            <Building2 className="size-3.5" /> Entreprises partenaires
          </p>
          <h2 className="font-display text-3xl font-bold leading-tight sm:text-4xl">
            Le déjeuner de vos équipes, <span className="text-accent">en une seule facture</span>
          </h2>
          <p className="max-w-md text-sm text-sidebar-foreground/80 sm:text-base">
            Vos collaborateurs choisissent leurs plats du mois en ligne, avec leur nom et leur
            téléphone. Nous livrons sur site, et l'entreprise reçoit une facture mensuelle.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Link
              to="/contact"
              className="inline-flex h-12 items-center gap-2 rounded-full bg-accent px-6 text-sm font-semibold text-accent-foreground transition-transform hover:scale-105"
            >
              Devenir entreprise partenaire
            </Link>
            <span className="text-sm text-sidebar-foreground/70">
              <strong className="text-sidebar-foreground">Rien à payer</strong> pour vos employés
            </span>
          </div>
        </div>

        <div className="relative mx-auto mt-6 h-80 w-full max-w-[26rem] sm:h-96 lg:mt-0 lg:h-full lg:max-w-none">
          <img
            src={cliente}
            alt="Une collaboratrice savoure son déjeuner livré au bureau"
            loading="lazy"
            width={851}
            height={900}
            className="pointer-events-none absolute bottom-0 left-1/2 h-full w-auto max-w-none -translate-x-1/2 select-none drop-shadow-[0_18px_28px_rgba(0,0,0,0.45)] lg:h-[118%]"
          />

          {/* étiquette « Mes repas du mois » */}
          <div className="deco-float absolute left-2 top-6 w-40 rounded-2xl bg-card p-3 text-foreground shadow-xl sm:left-0 lg:-left-6 lg:top-[22%]">
            <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
              Mes repas
            </p>
            <ul className="mt-2 space-y-1 text-xs">
              {["Lundi", "Mardi", "Mercredi"].map((day) => (
                <li key={day} className="flex items-center justify-between">
                  {day}
                  <Check className="size-4 rounded-full bg-success p-0.5 text-white" />
                </li>
              ))}
              <li className="flex items-center justify-between text-muted-foreground">
                Jeudi <span className="size-4 rounded-full border-2 border-dashed border-border" />
              </li>
            </ul>
          </div>

          {/* étiquette facture */}
          <div className="absolute bottom-8 right-2 flex items-center gap-2 rounded-full bg-card py-1.5 pl-1.5 pr-4 text-foreground shadow-xl sm:right-0 lg:-right-4 lg:bottom-12">
            <span className="flex size-9 items-center justify-center rounded-full bg-accent text-accent-foreground">
              <FileText className="size-4" />
            </span>
            <span className="text-xs leading-tight">
              <span className="block font-bold">1 facture par mois</span>
              <span className="text-muted-foreground">pour l'entreprise</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
