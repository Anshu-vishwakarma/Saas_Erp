import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { stripe } from "@/lib/stripe";

// Tell Next.js not to parse the body — Stripe needs the raw bytes for signature verification
export const config = { api: { bodyParser: false } };

const WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: NextRequest) {
  const sig = req.headers.get("stripe-signature");
  if (!sig) {
    return NextResponse.json({ error: "Missing stripe-signature" }, { status: 400 });
  }

  let event: Stripe.Event;
  const rawBody = await req.text();

  try {
    event = stripe.webhooks.constructEvent(rawBody, sig, WEBHOOK_SECRET);
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  try {
    switch (event.type) {
      //---------------------------------------------------------------------
      // Checkout completed → activate subscription in your DB
      //---------------------------------------------------------------------
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        const { userId, planId, interval } = session.metadata ?? {};

        if (!userId || !planId) break;

        // TODO: upsert subscription record in your DB
        // await db.subscription.upsert({
        //   where: { userId },
        //   create: {
        //     userId,
        //     stripeCustomerId: session.customer as string,
        //     stripeSubscriptionId: session.subscription as string,
        //     plan: planId,
        //     interval,
        //     status: "active",
        //     trialEndsAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
        //   },
        //   update: { status: "active", plan: planId },
        // });

        console.log(`✅ Subscription activated for user ${userId} on plan ${planId} (${interval})`);
        break;
      }

      //---------------------------------------------------------------------
      // Subscription updated (plan change, renewal, etc.)
      //---------------------------------------------------------------------
      case "customer.subscription.updated": {
        const sub = event.data.object as Stripe.Subscription;
        const { userId } = sub.metadata ?? {};

        if (!userId) break;

        // TODO: update subscription status in your DB
        // await db.subscription.update({
        //   where: { stripeSubscriptionId: sub.id },
        //   data: {
        //     status: sub.status,
        //     currentPeriodEnd: new Date(sub.current_period_end * 1000),
        //   },
        // });

        console.log(`🔄 Subscription updated for user ${userId}: ${sub.status}`);
        break;
      }

      //---------------------------------------------------------------------
      // Subscription cancelled / payment failed
      //---------------------------------------------------------------------
      case "customer.subscription.deleted": {
        const sub = event.data.object as Stripe.Subscription;
        const { userId } = sub.metadata ?? {};

        if (!userId) break;

        // TODO: downgrade user to free plan in your DB
        // await db.subscription.update({
        //   where: { stripeSubscriptionId: sub.id },
        //   data: { status: "cancelled", plan: "free" },
        // });

        console.log(`❌ Subscription cancelled for user ${userId}`);
        break;
      }

      //---------------------------------------------------------------------
      // Invoice paid — good time to reset usage quotas
      //---------------------------------------------------------------------
      case "invoice.paid": {
        const invoice = event.data.object as Stripe.Invoice;
        const customerId = invoice.customer as string;

        // TODO: reset monthly AI query counter for this customer
        // await db.usage.update({ where: { stripeCustomerId: customerId }, data: { queriesUsed: 0 } });

        console.log(`💳 Invoice paid for customer ${customerId}`);
        break;
      }

      //---------------------------------------------------------------------
      // Invoice payment failed — notify user / set past_due
      //---------------------------------------------------------------------
      case "invoice.payment_failed": {
        const invoice = event.data.object as Stripe.Invoice;
        const customerId = invoice.customer as string;

        // TODO: send dunning email, set subscription to past_due
        console.warn(`⚠️  Payment failed for customer ${customerId}`);
        break;
      }

      default:
        // Unhandled event types — safe to ignore
        break;
    }
  } catch (err) {
    console.error("Error handling webhook event:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}