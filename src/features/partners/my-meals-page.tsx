import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Lock, LogOut, Trash2, UtensilsCrossed } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@ui/components/ui/button";
import { Input } from "@ui/components/ui/input";
import { Label } from "@ui/components/ui/label";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@ui/components/ui/alert-dialog";
import { db } from "@core/lib/db";
import { formatDay, formatPrice } from "@core/lib/format";
import { partnersQuery } from "@/features/checkout/partner-order-panel";
import { SiteFooter, SiteHeader } from "@/components/site-header";

type Choice = {
  item_id: string;
  reference: string;
  day_date: string;
  day_product_id: string;
  product_name: string;
  quantity: number;
  amount: number;
  deadline: string;
  editable: boolean;
  options: { day_product_id: string; name: string; price: number; remaining: number }[];
};
type Choices = { employee: string; partner: string; items: Choice[] };
type Credentials = { partnerId: string; phone: string; pin: string };

const SESSION_KEY = "traiteur.partner_login";

function readSession(): Credentials | null {
  try {
    const raw = window.sessionStorage.getItem(SESSION_KEY);
    return raw ? (JSON.parse(raw) as Credentials) : null;
  } catch {
    return null;
  }
}

function deadlineLabel(deadline: string) {
  const [day, time] = deadline.split("T");
  return `${formatDay(day!).toLowerCase()} à ${time!.replace(":", "h")}`;
}

async function call<T>(fn: string, args: Record<string, unknown>) {
  const { data, error } = await db.rpc(fn, args);
  if (error) throw new Error(error.message);
  const result = data as { ok: boolean; error?: string } & T;
  if (!result.ok) throw new Error(result.error ?? "Opération impossible.");
  return result;
}

/**
 * « Mes repas » : un employé d'entreprise partenaire retrouve les plats qu'il a choisis, et peut
 * changer de plat ou annuler un jour jusqu'à l'heure limite. Après, le jour est clos.
 */
export function MyMealsPage() {
  const [creds, setCreds] = useState<Credentials | null>(() =>
    typeof window === "undefined" ? null : readSession(),
  );
  const choices = useQuery({
    queryKey: ["partner_choices", creds?.partnerId, creds?.phone],
    enabled: !!creds,
    retry: false,
    queryFn: () =>
      call<Choices>("partner_my_choices", {
        p_partner: creds!.partnerId,
        p_phone: creds!.phone,
        p_pin: creds!.pin,
      }),
  });

  const logout = () => {
    try {
      window.sessionStorage.removeItem(SESSION_KEY);
    } catch {
      /* ignore */
    }
    setCreds(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-4 py-12">
        <h1 className="font-display text-3xl font-bold text-primary sm:text-4xl">Mes repas</h1>
        <p className="mt-2 text-muted-foreground">
          Retrouvez les plats choisis pour votre entreprise. Vous pouvez changer de plat ou annuler
          un jour jusqu'à l'heure limite ; ensuite le jour est clos, car la cuisine est lancée.
        </p>
        {!creds || choices.isError ? (
          <LoginForm
            error={choices.isError ? (choices.error as Error).message : null}
            onLogin={(c) => {
              try {
                window.sessionStorage.setItem(SESSION_KEY, JSON.stringify(c));
              } catch {
                /* ignore */
              }
              setCreds(c);
            }}
          />
        ) : choices.isLoading || !choices.data ? (
          <p className="mt-8 text-muted-foreground">Chargement…</p>
        ) : (
          <ChoiceList
            data={choices.data}
            creds={creds}
            onRefresh={() => choices.refetch()}
            onLogout={logout}
          />
        )}
      </main>
      <SiteFooter />
    </div>
  );
}

function LoginForm({
  error,
  onLogin,
}: {
  error: string | null;
  onLogin: (c: Credentials) => void;
}) {
  const { data: partners = [] } = useQuery(partnersQuery());
  const [partnerId, setPartnerId] = useState("");
  const [phone, setPhone] = useState("");
  const [pin, setPin] = useState("");
  const valid = !!partnerId && phone.replace(/\D/g, "").length >= 7 && /^\d{4}$/.test(pin);
  return (
    <form
      className="surface-card mt-8 space-y-4 p-4 sm:p-6"
      onSubmit={(e) => {
        e.preventDefault();
        if (valid) onLogin({ partnerId, phone, pin });
      }}
    >
      <div className="space-y-2">
        <Label htmlFor="mm-partner">Votre entreprise</Label>
        <select
          id="mm-partner"
          className="h-11 w-full rounded-md border border-input bg-background px-3 text-sm"
          value={partnerId}
          onChange={(e) => setPartnerId(e.target.value)}
        >
          <option value="">Choisir…</option>
          {partners.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="mm-phone">Votre téléphone</Label>
          <Input
            id="mm-phone"
            inputMode="tel"
            autoComplete="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="mm-pin">Votre code</Label>
          <Input
            id="mm-pin"
            inputMode="numeric"
            maxLength={4}
            placeholder="4 chiffres"
            value={pin}
            onChange={(e) => setPin(e.target.value.replace(/\D/g, ""))}
          />
        </div>
      </div>
      {error && <p className="text-sm font-medium text-destructive">{error}</p>}
      <Button type="submit" className="w-full" size="lg" disabled={!valid}>
        Voir mes repas
      </Button>
    </form>
  );
}

function ChoiceList({
  data,
  creds,
  onRefresh,
  onLogout,
}: {
  data: Choices;
  creds: Credentials;
  onRefresh: () => void;
  onLogout: () => void;
}) {
  const [cancelling, setCancelling] = useState<Choice | null>(null);
  const change = useMutation({
    mutationFn: (input: { item: string; dayProduct: string | null }) =>
      call("partner_change_choice", {
        p_partner: creds.partnerId,
        p_phone: creds.phone,
        p_pin: creds.pin,
        p_item: input.item,
        p_day_product: input.dayProduct,
      }),
    onSuccess: (_, input) => {
      toast.success(input.dayProduct ? "Plat modifié" : "Repas annulé");
      setCancelling(null);
      onRefresh();
    },
    onError: (error: Error) => {
      toast.error(error.message);
      onRefresh();
    },
  });

  return (
    <section className="mt-8 space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p>
          <span className="font-semibold">{data.employee}</span>
          <span className="text-muted-foreground"> · {data.partner}</span>
        </p>
        <div className="flex gap-2">
          <Button asChild size="sm">
            <Link to="/" hash="menu">
              <UtensilsCrossed className="size-4" /> Choisir d'autres jours
            </Link>
          </Button>
          <Button size="sm" variant="outline" onClick={onLogout}>
            <LogOut className="size-4" /> Quitter
          </Button>
        </div>
      </div>

      {data.items.length === 0 ? (
        <div className="surface-card p-8 text-center text-muted-foreground">
          Aucun repas à venir. Choisissez vos plats dans le menu.
        </div>
      ) : (
        <ul className="space-y-3">
          {data.items.map((item) => (
            <li key={item.item_id} className="surface-card space-y-3 p-4">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <p className="font-display text-lg font-bold">{formatDay(item.day_date)}</p>
                {item.editable ? (
                  <span className="text-xs text-muted-foreground">
                    Modifiable jusqu'au {deadlineLabel(item.deadline)}
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 rounded-full bg-muted px-2 py-0.5 text-xs font-medium">
                    <Lock className="size-3" /> Clos
                  </span>
                )}
              </div>
              {item.editable ? (
                <div className="flex flex-wrap items-center gap-2">
                  <select
                    aria-label={`Plat du ${formatDay(item.day_date)}`}
                    className="h-10 min-w-0 flex-1 rounded-md border border-input bg-background px-3 text-sm"
                    value={item.day_product_id}
                    disabled={change.isPending}
                    onChange={(e) =>
                      change.mutate({ item: item.item_id, dayProduct: e.target.value })
                    }
                  >
                    {item.options.map((o) => {
                      const current = o.day_product_id === item.day_product_id;
                      const full = !current && o.remaining < item.quantity;
                      return (
                        <option key={o.day_product_id} value={o.day_product_id} disabled={full}>
                          {o.name} · {formatPrice(o.price)}
                          {full ? " (épuisé)" : ""}
                        </option>
                      );
                    })}
                  </select>
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={change.isPending}
                    onClick={() => setCancelling(item)}
                  >
                    <Trash2 className="size-4" /> Annuler ce jour
                  </Button>
                </div>
              ) : (
                <p>{item.product_name}</p>
              )}
              <p className="text-xs text-muted-foreground">
                {item.quantity > 1 ? `${item.quantity} portions · ` : ""}
                {formatPrice(item.amount)} facturé à {data.partner} · {item.reference}
              </p>
            </li>
          ))}
        </ul>
      )}

      <AlertDialog open={!!cancelling} onOpenChange={(open) => !open && setCancelling(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Annuler ce repas ?</AlertDialogTitle>
            <AlertDialogDescription>
              {cancelling
                ? `${cancelling.product_name}, ${formatDay(cancelling.day_date).toLowerCase()}. Vous pourrez rechoisir un plat avant l'heure limite.`
                : ""}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Garder</AlertDialogCancel>
            <AlertDialogAction
              onClick={() =>
                cancelling && change.mutate({ item: cancelling.item_id, dayProduct: null })
              }
            >
              Annuler le repas
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </section>
  );
}
