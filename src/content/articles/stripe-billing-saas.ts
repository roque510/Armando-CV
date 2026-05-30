import type { Article } from "../types";

const webhookCode = `// stripe/webhook.ts — the events that actually keep billing honest.
export async function handleStripeEvent(event: Stripe.Event) {
  switch (event.type) {
    case "invoice.payment_failed":
      // Don't cut access yet — Stripe will retry. Flag and notify.
      await markPastDue(event.data.object.customer);
      break;

    case "customer.subscription.deleted":
      await revokeAccess(event.data.object.customer);
      break;

    case "customer.subscription.updated":
      // Plan changes, proration, cancel-at-period-end all land here.
      await syncSubscription(event.data.object);
      break;
  }
}`;

const article: Article = {
  slug: "stripe-billing-saas",
  en: {
    title: "Stripe billing for SaaS: the parts the docs quietly skip",
    dek: "Proration, failed payments, plan migrations, and the webhooks you actually need. The billing edge cases that bite in month three.",
    blocks: [
      { t: "p", text: "Stripe's happy path is a joy: drop in Checkout, collect a card, create a subscription. You'll have billing \"working\" in an afternoon. Then month three arrives — a card expires, someone upgrades mid-cycle, a customer churns and comes back — and you discover that the happy path was about 30% of the job. Here's the other 70%." },
      { t: "h2", text: "Your database is the source of truth, not Stripe's API" },
      { t: "p", text: "The most common mistake I see is treating Stripe as the place you _read_ subscription state from on every request. Don't. Stripe is the system of record for _payments_; your database is the system of record for _access_. Mirror the subscription status locally and update it from webhooks. Then \"can this user do X?\" is a fast local read, not a network call that can rate-limit or time out at the worst moment." },
      { t: "h2", text: "Webhooks are the real integration" },
      { t: "p", text: "Checkout is the front door; webhooks are the plumbing that keeps your local state honest after the customer walks away. These are the events that matter, and the ones the quickstart never makes you handle:" },
      { t: "code", file: "stripe/webhook.ts", lang: "ts", code: webhookCode },
      { t: "callout", text: "**Make webhook handlers idempotent.** Stripe will deliver the same event more than once — that's a guarantee, not a bug. Key on the event ID and no-op if you've seen it. A double-processed `subscription.deleted` that runs revoke twice is harmless; a double-processed credit grant is a refund waiting to happen." },
      { t: "h2", text: "The edge cases that actually bite" },
      {
        t: "ul",
        items: [
          "**Failed payments aren't churn.** A `payment_failed` is the start of a retry sequence, not the end of a subscription. Flag the account as past-due, email the customer, and let Stripe's dunning run before you cut access. Killing access on the first failure infuriates good customers whose card just expired.",
          "**Proration is a feature, not a glitch.** When someone upgrades mid-cycle, Stripe prorates by default and the next invoice looks weird to anyone not expecting it. Decide your policy — prorate, or charge full at next cycle — and surface it in the UI before they're surprised by a charge.",
          "**Plan migrations need a plan.** When you reprice, existing customers shouldn't silently jump tiers. Grandfather them explicitly, or migrate on a date you communicate. Price IDs are forever; treat changing one as a migration, not an edit.",
          "**Cancel ≠ delete.** Cancel-at-period-end keeps access until the paid period ends. Don't revoke on the cancel event — revoke when the subscription actually ends. Two different webhooks, two different moments.",
        ],
      },
      { t: "h2", text: "Reconcile, don't trust" },
      { t: "p", text: "Webhooks get dropped. Networks fail. At some point your local state and Stripe's will disagree, and you won't notice until a customer emails. Run a nightly reconciliation job that pulls active subscriptions from Stripe and compares them to your database. It's fifty lines that turn \"silent billing drift\" into \"a log line you can act on.\"" },
      { t: "quote", text: "Billing isn't a feature you build once. It's a system you operate — and the docs only ever cover the build." },
    ],
  },
  es: {
    title: "Facturación con Stripe para SaaS: las partes que los docs omiten",
    dek: "Prorrateo, pagos fallidos, migraciones de plan y los webhooks que de verdad necesitas. Los casos límite de facturación que muerden en el mes tres.",
    blocks: [
      { t: "p", text: "El camino feliz de Stripe es un placer: pones Checkout, cobras una tarjeta, creas una suscripción. Tendrás la facturación \"funcionando\" en una tarde. Luego llega el mes tres — una tarjeta vence, alguien sube de plan a mitad de ciclo, un cliente se va y vuelve — y descubres que el camino feliz era como el 30% del trabajo. Este es el otro 70%." },
      { t: "h2", text: "Tu base de datos es la fuente de verdad, no la API de Stripe" },
      { t: "p", text: "El error más común que veo es tratar a Stripe como el lugar del que _lees_ el estado de la suscripción en cada petición. No lo hagas. Stripe es el sistema de registro de los _pagos_; tu base de datos es el sistema de registro del _acceso_. Refleja el estado de la suscripción localmente y actualízalo desde los webhooks. Así, \"¿este usuario puede hacer X?\" es una lectura local rápida, no una llamada de red que puede limitarse o expirar en el peor momento." },
      { t: "h2", text: "Los webhooks son la integración de verdad" },
      { t: "p", text: "Checkout es la puerta de entrada; los webhooks son la tubería que mantiene honesto tu estado local después de que el cliente se va. Estos son los eventos que importan, y los que el quickstart nunca te hace manejar:" },
      { t: "code", file: "stripe/webhook.ts", lang: "ts", code: webhookCode },
      { t: "callout", text: "**Haz los handlers de webhooks idempotentes.** Stripe entregará el mismo evento más de una vez — eso es una garantía, no un bug. Usa el ID del evento como clave y no hagas nada si ya lo viste. Un `subscription.deleted` procesado dos veces que revoca dos veces es inofensivo; un crédito otorgado dos veces es un reembolso esperando a pasar." },
      { t: "h2", text: "Los casos límite que de verdad muerden" },
      {
        t: "ul",
        items: [
          "**Un pago fallido no es churn.** Un `payment_failed` es el inicio de una secuencia de reintentos, no el fin de una suscripción. Marca la cuenta como en mora, escribe al cliente y deja correr el dunning de Stripe antes de cortar el acceso. Matar el acceso al primer fallo enfurece a buenos clientes cuya tarjeta solo venció.",
          "**El prorrateo es una función, no un fallo.** Cuando alguien sube de plan a mitad de ciclo, Stripe prorratea por defecto y la siguiente factura se ve rara para quien no lo espera. Decide tu política — prorratear, o cobrar completo en el siguiente ciclo — y muéstrala en la UI antes de que un cargo los sorprenda.",
          "**Las migraciones de plan necesitan un plan.** Cuando cambias precios, los clientes existentes no deberían saltar de nivel en silencio. Mantenlos en su plan explícitamente, o migra en una fecha que comuniques. Los price IDs son para siempre; trata cambiar uno como una migración, no una edición.",
          "**Cancelar ≠ eliminar.** Cancelar al fin del periodo mantiene el acceso hasta que termina el periodo pagado. No revoques en el evento de cancelación — revoca cuando la suscripción de verdad termina. Dos webhooks distintos, dos momentos distintos.",
        ],
      },
      { t: "h2", text: "Reconcilia, no confíes" },
      { t: "p", text: "Los webhooks se pierden. Las redes fallan. En algún momento tu estado local y el de Stripe no coincidirán, y no lo notarás hasta que un cliente escriba. Corre un job nocturno de reconciliación que trae las suscripciones activas de Stripe y las compara con tu base de datos. Son cincuenta líneas que convierten la \"deriva silenciosa de facturación\" en \"una línea de log sobre la que puedes actuar\"." },
      { t: "quote", text: "La facturación no es una función que construyes una vez. Es un sistema que operas — y los docs solo cubren la construcción." },
    ],
  },
};

export default article;
