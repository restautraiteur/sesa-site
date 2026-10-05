import { createFileRoute } from "@tanstack/react-router";

import { AboutPage } from "@/features/sesa/pages";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "À Propos - Partenaire Restauration des Entreprises au Sénégal | SESA CATERING" },
      {
        name: "description",
        content:
          "SESA CATERING accompagne les entreprises, institutions, sites industriels et chantiers avec des solutions de restauration adaptées.",
      },
    ],
  }),
  component: AboutPage,
});
