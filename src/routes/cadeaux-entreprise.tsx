import { createFileRoute } from "@tanstack/react-router";

import { GiftsPage } from "@/features/sesa/pages";

export const Route = createFileRoute("/cadeaux-entreprise")({
  head: () => ({
    meta: [
      { title: "Cadeaux d'Entreprise & Coffrets Prestige | SESA CATERING" },
      {
        name: "description",
        content: "Coffrets cadeaux d'affaires pour remercier vos collaborateurs et partenaires.",
      },
    ],
  }),
  component: GiftsPage,
});
