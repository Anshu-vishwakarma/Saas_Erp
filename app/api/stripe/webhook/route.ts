import { NextRequest, NextResponse } from "next/server";
import { createPortalSession } from "@/lib/stripe";

export async function POST(req: NextRequest) {
  try {
    const { customerId } = await req.json();

    if (!customerId) {
      return NextResponse.json({ error: "Missing customerId" }, { status: 400 });
    }

    const returnUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
    const portalUrl = await createPortalSession({ customerId, returnUrl });

    return NextResponse.json({ url: portalUrl });
  } catch (err) {
    console.error("Error creating portal session:", err);
    return NextResponse.json({ error: "Failed to open billing portal" }, { status: 500 });
  }
}