import Stripe from "stripe";

// Initialize Stripe with secret key from environment
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-02-25.clover",
});

// Price IDs — set these in your Stripe dashboard and add to .env
export const STRIPE_PRICES = {
  starter: {
    monthly: process.env.STRIPE_STARTER_MONTHLY_PRICE_ID!,
    yearly: process.env.STRIPE_STARTER_YEARLY_PRICE_ID!,
  },
  pro: {
    monthly: process.env.STRIPE_PRO_MONTHLY_PRICE_ID!,
    yearly: process.env.STRIPE_PRO_YEARLY_PRICE_ID!,
  },
} as const;

export type PlanId = "free" | "starter" | "pro" | "enterprise";
export type BillingInterval = "monthly" | "yearly";

/**
 * Create a Stripe Checkout Session for the given plan.
 * Returns the checkout URL to redirect the user to.
 */
export async function createCheckoutSession({
  planId,
  interval,
  userId,
  userEmail,
  returnUrl,
}: {
  planId: Exclude<PlanId, "free" | "enterprise">;
  interval: BillingInterval;
  userId: string;
  userEmail: string;
  returnUrl: string;
}): Promise<string> {
  const priceId = STRIPE_PRICES[planId][interval];

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    payment_method_types: ["card"],
    customer_email: userEmail,
    line_items: [{ price: priceId, quantity: 1 }],
    metadata: { userId, planId, interval },
    success_url: `${returnUrl}/settings/billing?success=true&session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${returnUrl}/pricing?cancelled=true`,
    subscription_data: {
      metadata: { userId, planId, interval },
      trial_period_days: 14,
    },
    allow_promotion_codes: true,
  });

  return session.url!;
}

/**
 * Create a Stripe Billing Portal session so the user can
 * manage/cancel their subscription.
 */
export async function createPortalSession({
  customerId,
  returnUrl,
}: {
  customerId: string;
  returnUrl: string;
}): Promise<string> {
  const session = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: `${returnUrl}/settings/billing`,
  });

  return session.url;
}

/**
 * Retrieve the active subscription for a Stripe customer.
 */
export async function getActiveSubscription(customerId: string) {
  const subscriptions = await stripe.subscriptions.list({
    customer: customerId,
    status: "active",
    limit: 1,
    expand: ["data.default_payment_method"],
  });

  return subscriptions.data[0] ?? null;
}

/**
 * Map a Stripe price ID back to a plan name for display.
 */
export function getPlanFromPriceId(priceId: string): PlanId {
  for (const [plan, prices] of Object.entries(STRIPE_PRICES)) {
    if (Object.values(prices).includes(priceId as never)) {
      return plan as PlanId;
    }
  }
  return "free";
}