import { createFileRoute, notFound } from "@tanstack/react-router";

import { SERVICES, type ServiceSlug } from "@/features/sesa/content";
import { ServiceDetailPage } from "@/features/sesa/pages";

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => {
    const service = SERVICES.find((s) => s.slug === params.slug);
    if (!service) throw notFound();
    return { title: service.page.metaTitle, description: service.page.intro[0] };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.title} | SESA CATERING` },
          { name: "description", content: loaderData.description },
        ]
      : [],
  }),
  component: function ServiceRoute() {
    const { slug } = Route.useParams();
    return <ServiceDetailPage slug={slug as ServiceSlug} />;
  },
});
