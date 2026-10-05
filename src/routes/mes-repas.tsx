import { createFileRoute } from "@tanstack/react-router";

import { MyMealsPage } from "@/features/partners/my-meals-page";

export const Route = createFileRoute("/mes-repas")({
  head: () => ({
    meta: [
      { title: "Mes repas — Traiteur" },
      { name: "robots", content: "noindex" },
      {
        name: "description",
        content: "Employés des entreprises partenaires : consultez et modifiez vos repas.",
      },
    ],
  }),
  component: MyMealsPage,
});
