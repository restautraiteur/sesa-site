import { createFileRoute } from "@tanstack/react-router";

import { PortfolioPage } from "@/features/sesa/pages";

export const Route = createFileRoute("/portfolio")({
  head: () => ({
    meta: [
      { title: "Nos Réalisations | SESA CATERING" },
      { name: "description", content: "Découvrez en images l'expertise de SESA CATERING." },
    ],
  }),
  component: PortfolioPage,
});
