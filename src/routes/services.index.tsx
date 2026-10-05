import { createFileRoute } from "@tanstack/react-router";

import { ServicesPage } from "@/features/sesa/pages";

export const Route = createFileRoute("/services/")({
  head: () => ({
    meta: [
      { title: "Nos Services de Restauration - Collective, Traiteur & Rapide | SESA CATERING" },
      {
        name: "description",
        content:
          "Restauration collective, service traiteur, restauration rapide, événementiel corporate et mariages à Dakar.",
      },
    ],
  }),
  component: ServicesPage,
});
