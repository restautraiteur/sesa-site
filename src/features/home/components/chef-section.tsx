// EXEMPLE À REMPLACER : photo, nom et parcours du chef du restaurant.
import chefImage from "@/assets/chef.jpg";

export function ChefSection() {
  return (
    <section className="text-sidebar-foreground">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 pb-16 pt-20 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
        <div className="relative mx-auto order-first w-full max-w-sm">
          <div className="absolute -inset-3 rounded-3xl border border-accent/30" />
          <img
            src={chefImage}
            alt="Photo du chef (à remplacer)"
            width={960}
            height={1280}
            loading="lazy"
            className="relative aspect-[3/4] w-full rounded-2xl object-cover shadow-warm"
          />
        </div>
        <div>
          <p className="text-sm font-bold uppercase tracking-widest text-accent">Notre cheffe</p>
          <h2 className="mt-3 font-display text-3xl font-bold leading-tight sm:text-4xl">
            Prénom Nom,
            <span className="block italic text-accent">chef(fe) du restaurant</span>
          </h2>
          <p className="mt-5 max-w-xl text-sm leading-7 text-sidebar-foreground/90 sm:text-base">
            Présentez ici le chef : sa passion, depuis quand il dirige la cuisine, ce qui rend sa
            cuisine unique. (Texte d\'exemple à remplacer.)
          </p>
          <p className="mt-4 max-w-xl text-sm leading-7 text-sidebar-foreground/90 sm:text-base">
            Son parcours : restaurants, formations, distinctions. (Texte d\'exemple à remplacer.)
          </p>
          <div className="mt-7 flex flex-wrap gap-2">
            {["Expérience (exemple)", "Formation (exemple)", "Spécialité (exemple)"].map((item) => (
              <span
                key={item}
                className="rounded-full border border-accent/40 bg-sidebar/40 px-4 py-1.5 text-xs font-semibold text-accent backdrop-blur-sm"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
