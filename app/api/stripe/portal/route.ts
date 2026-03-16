import { NextRequest, NextResponse } from "next/server";
import { createCheckoutSession, BillingInterval, PlanId } from "@/lib/stripe";

export async function POST(req: NextRequest) {
  try {
    const { planId, interval, userId, userEmail } = await req.json();

    if (!planId || !interval || !userId || !userEmail) {
      return NextResponse.json(
        { error: "Missing required fields: planId, interval, userId, userEmail" },
        { status: 400 }
      );
    }

    if (planId === "free" || planId === "enterprise") {
      return NextResponse.json(
        { error: "Use the free signup or enterprise contact form for these plans" },
        { status: 400 }
      );
    }

    const returnUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

    const checkoutUrl = await createCheckoutSession({
      planId: planId as Exclude<PlanId, "free" | "enterprise">,
      interval: interval as BillingInterval,
      userId,
      userEmail,
      returnUrl,
    });

    return NextResponse.json({ url: checkoutUrl });
  } catch (err) {
    console.error("Error creating checkout session:", err);
    return NextResponse.json({ error: "Failed to create checkout session" }, { status: 500 });
  }
}