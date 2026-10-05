import { createFileRoute } from "@tanstack/react-router";

import { ContactPage } from "@/features/sesa/pages";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact - Demandez votre devis | SESA CATERING" },
      {
        name: "description",
        content: "Contactez SESA CATERING pour votre projet de restauration à Dakar.",
      },
    ],
  }),
  component: ContactPage,
});
