import { useMemo, useState } from "react";
import { CalendarDays, Minus, Plus } from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@ui/components/ui/dialog";
import { Button } from "@ui/components/ui/button";
import type { MenuRow } from "@core/domain/menu/api";
import { useCart } from "@/features/cart/cart-context";
import { formatDay, formatPrice, todayISO } from "@core/lib/format";
import { cn } from "@core/lib/utils";

/** Lundi de la semaine d'une date « AAAA-MM-JJ ». */
function mondayOf(day: string) {
  const d = new Date(`${day}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() - ((d.getUTCDay() + 6) % 7));
  return d.toISOString().slice(0, 10);
}

/**
 * « Voir tout le menu » : tous les plats publiés (souvent le mois entier), semaine par semaine et
 * jour par jour, avec ajout direct au panier.
 */
export function MonthMenuDialog({
  rows,
  onPickDay,
}: {
  rows: MenuRow[];
  onPickDay: (day: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const { items, add, setQuantity } = useCart();
  const plats = useMemo(() => rows.filter((r) => r.category === "plat"), [rows]);
  const weeks = useMemo(() => {
    const map = new Map<string, Map<string, MenuRow[]>>();
    for (const row of plats) {
      const week = map.get(mondayOf(row.day_date)) ?? new Map<string, MenuRow[]>();
      week.set(row.day_date, [...(week.get(row.day_date) ?? []), row]);
      map.set(mondayOf(row.day_date), week);
    }
    return [...map].sort(([a], [b]) => a.localeCompare(b));
  }, [plats]);
  const chosenDays = new Set(items.filter((i) => i.source === "menu").map((i) => i.day_date));

  if (plats.length === 0) return null;
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="rounded-full">
          <CalendarDays className="size-4" /> Voir tout le menu
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] max-w-3xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl">Tout le menu</DialogTitle>
          <DialogDescription>
            Choisissez vos plats jour après jour : ils s'ajoutent à votre panier, classés par jour.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6">
          {weeks.map(([monday, days]) => (
            <section key={monday} className="space-y-3">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                Semaine du {formatDay(monday).toLowerCase()}
              </h3>
              {[...days]
                .sort(([a], [b]) => a.localeCompare(b))
                .map(([day, dayRows]) => (
                  <div key={day} className="rounded-xl border border-border p-3">
                    <div className="mb-2 flex items-center justify-between gap-2">
                      <button
                        type="button"
                        className="font-semibold text-primary hover:underline"
                        onClick={() => {
                          onPickDay(day);
                          setOpen(false);
                        }}
                      >
                        {formatDay(day)}
                        {day === todayISO() && " · aujourd'hui"}
                      </button>
                      {chosenDays.has(day) && (
                        <span className="rounded-full bg-accent/15 px-2 py-0.5 text-xs font-medium text-accent">
                          Choisi
                        </span>
                      )}
                    </div>
                    <ul className="divide-y divide-border">
                      {dayRows.map((row) => {
                        const inCart = items.find((i) => i.id === row.day_product_id);
                        const available = row.state === "disponible" && row.stock_left > 0;
                        return (
                          <li
                            key={row.day_product_id}
                            className={cn(
                              "flex items-center gap-3 py-2",
                              !available && "opacity-50",
                            )}
                          >
                            {row.photo_url ? (
                              <img
                                src={row.photo_url}
                                alt=""
                                loading="lazy"
                                className="size-11 shrink-0 rounded-lg object-cover"
                              />
                            ) : (
                              <span className="size-11 shrink-0 rounded-lg bg-secondary" />
                            )}
                            <div className="min-w-0 flex-1">
                              <p className="truncate text-sm font-medium">{row.name}</p>
                              <p className="text-xs text-muted-foreground">
                                {formatPrice(row.price)}
                                {row.dish_category ? ` · ${row.dish_category}` : ""}
                                {!available ? " · indisponible" : ""}
                              </p>
                            </div>
                            {inCart ? (
                              <div className="flex items-center gap-1">
                                <Button
                                  size="icon"
                                  variant="outline"
                                  className="size-8"
                                  aria-label="Retirer"
                                  onClick={() =>
                                    setQuantity(row.day_product_id, inCart.quantity - 1)
                                  }
                                >
                                  <Minus className="size-3.5" />
                                </Button>
                                <span className="w-6 text-center text-sm font-semibold">
                                  {inCart.quantity}
                                </span>
                                <Button
                                  size="icon"
                                  variant="outline"
                                  className="size-8"
                                  aria-label="Ajouter"
                                  disabled={inCart.quantity >= row.stock_left}
                                  onClick={() =>
                                    setQuantity(row.day_product_id, inCart.quantity + 1)
                                  }
                                >
                                  <Plus className="size-3.5" />
                                </Button>
                              </div>
                            ) : (
                              <Button
                                size="sm"
                                disabled={!available}
                                onClick={() => {
                                  add({
                                    id: row.day_product_id,
                                    source: "menu",
                                    name: row.name,
                                    category: row.category,
                                    price: row.price,
                                    day_date: row.day_date,
                                  });
                                  toast.success(
                                    `${row.name} ajouté pour le ${formatDay(day).toLowerCase()}`,
                                  );
                                }}
                              >
                                Choisir
                              </Button>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ))}
            </section>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
