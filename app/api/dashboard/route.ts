import { NextRequest, NextResponse } from "next/server";
import { createServiceClient, getSupabase } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  try {
    const { passcode } = await req.json();

    if (passcode !== process.env.DASHBOARD_PASSCODE) {
      return NextResponse.json({ error: "Incorrect passcode" }, { status: 401 });
    }

    // Try service role client first, fall back to anon client
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    const supabase = serviceKey ? createServiceClient() : getSupabase();

    if (!serviceKey) {
      console.warn("SUPABASE_SERVICE_ROLE_KEY not set, using anon client for dashboard reads");
    }

    const { data, error } = await supabase
      .from("survey_responses")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Supabase fetch error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ data: data || [] });
  } catch (err) {
    console.error("Dashboard API error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
