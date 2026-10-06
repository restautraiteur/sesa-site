import { SiteFooter, SiteHeader } from "@/components/site-header";
// Bannière classique : remplacer <HeroShowcase /> par <Hero /> pour y revenir.
// import { Hero } from "@/features/home/components/hero";
import { HeroShowcase } from "@/features/home/components/hero-showcase";
import { WeeklyMenu } from "@/features/menu/components/weekly-menu";
import { JuiceSection } from "@/features/juices/components/juice-section";
import { GalleryMarquee } from "@/features/home/components/gallery-marquee";
import { CartBar } from "@/features/cart/components/cart-bar";
import { PartnerCta } from "@/features/sesa/partner-cta";
import {
  AboutTeaser,
  FinalCta,
  GiftsSection,
  RealisationsSection,
  ReferencesSection,
  SectorsSection,
  ServicesGrid,
  StepsSection,
  TechPartnerSection,
} from "@/features/sesa/sections";
import menuPattern from "@/assets/doodles-aliments.webp";

export function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader overlay />

      <HeroShowcase />

      {/* Motif du menu commun au menu et au bandeau abonnement : le bandeau fait partie du menu et
          déborde sur les jus (sa marge négative arrête le motif pile au début des jus). */}
      <div className="abo-zone relative">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-repeat opacity-[0.12] mix-blend-multiply"
          style={{ backgroundImage: `url(${menuPattern})`, backgroundSize: "520px" }}
        />
        <WeeklyMenu />
        <PartnerCta />
      </div>

      <JuiceSection />

      <GalleryMarquee />

      <AboutTeaser />

      <ServicesGrid />

      <SectorsSection />

      <RealisationsSection />

      <ReferencesSection />

      <TechPartnerSection />

      <GiftsSection />

      <StepsSection />

      <FinalCta />

      <CartBar />
      <SiteFooter />
    </div>
  );
}
