import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useMutation, useQuery, queryOptions } from "@tanstack/react-query";
import { Building2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@ui/components/ui/button";
import { Input } from "@ui/components/ui/input";
import { Label } from "@ui/components/ui/label";
import type { CartItem } from "@/features/cart/cart-context";
import { db } from "@core/lib/db";
import { formatPrice } from "@core/lib/format";

export const partnersQuery = () =>
  queryOptions({
    queryKey: ["partners", "public"],
    queryFn: async () => {
      const { data, error } = await db.rpc("list_partners");
      if (error) throw new Error(error.message);
      return (data ?? []) as { id: string; name: string }[];
    },
  });

/**
 * Commande d'un employé d'entreprise partenaire : il choisit son entreprise, saisit son téléphone et
 * son code. Pas de compte, pas d'adresse (livraison à l'entreprise), pas de paiement.
 */
export function PartnerOrderPanel({ items, onDone }: { items: CartItem[]; onDone: () => void }) {
  const navigate = useNavigate();
  const { data: partners = [] } = useQuery(partnersQuery());
  const [partnerId, setPartnerId] = useState("");
  const [phone, setPhone] = useState("");
  const [pin, setPin] = useState("");
  const total = items.reduce((s, i) => s + i.price * i.quantity, 0);
  const partner = partners.find((p) => p.id === partnerId);
  const valid = !!partnerId && phone.replace(/\D/g, "").length >= 7 && /^\d{4}$/.test(pin);

  const order = useMutation({
    mutationFn: async () => {
      const { data, error } = await db.rpc("place_partner_order", {
        p_partner: partnerId,
        p_phone: phone,
        p_pin: pin,
        p_items: items.map((i) =>
          i.source === "jus"
            ? { variant_id: i.id, quantity: i.quantity }
            : { day_product_id: i.id, quantity: i.quantity },
        ),
      });
      if (error) throw new Error(error.message);
      const result = data as {
        ok: boolean;
        error?: string;
        reference?: string;
        total?: number;
        partner?: string;
        employee?: string;
      };
      if (!result.ok) throw new Error(result.error ?? "Commande impossible.");
      return result;
    },
    onSuccess: (result) => {
      window.sessionStorage.setItem(
        "traiteur.last_order",
        JSON.stringify({
          reference: result.reference,
          total: result.total,
          partner: result.partner,
          customer: {
            first_name: result.employee,
            last_name: "",
            phone,
            address: result.partner,
          },
          items: items.map((i) => ({ ...i })),
        }),
      );
      onDone();
      void navigate({ to: "/confirmation" });
    },
    onError: (error: Error) => toast.error(error.message),
  });

  return (
    <section className="surface-card space-y-4 p-4 sm:p-6">
      <h2 className="flex items-center gap-2 font-display text-lg font-bold text-primary">
        <Building2 className="size-5" /> Commande entreprise
      </h2>
      {partners.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          Aucune entreprise partenaire pour le moment.
        </p>
      ) : (
        <>
          <div className="space-y-2">
            <Label htmlFor="po-partner">Votre entreprise</Label>
            <select
              id="po-partner"
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
              <Label htmlFor="po-phone">Votre téléphone</Label>
              <Input
                id="po-phone"
                inputMode="tel"
                autoComplete="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="po-pin">Votre code</Label>
              <Input
                id="po-pin"
                inputMode="numeric"
                maxLength={4}
                placeholder="4 chiffres"
                value={pin}
                onChange={(e) => setPin(e.target.value.replace(/\D/g, ""))}
              />
            </div>
          </div>
          <div className="flex items-baseline justify-between rounded-lg bg-muted/50 p-3">
            <span className="text-sm">
              {partner ? `Facturé à ${partner.name}` : "Facturé à votre entreprise"}
            </span>
            <span className="text-lg font-bold">{formatPrice(total)}</span>
          </div>
          <p className="text-xs text-muted-foreground">
            Rien à payer : livraison à votre entreprise. Vous pourrez changer ou annuler un plat
            dans « Mes repas » jusqu'à l'heure limite de chaque jour. Votre code vous a été envoyé à
            l'inscription ; en cas d'oubli, demandez-le à votre responsable.
          </p>
          <Button
            className="w-full"
            size="lg"
            disabled={!valid || order.isPending}
            onClick={() => order.mutate()}
          >
            {order.isPending ? "Validation…" : "Valider ma commande"}
          </Button>
        </>
      )}
    </section>
  );
}
