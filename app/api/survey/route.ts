import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  try {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
    if (!url) {
      console.error("Missing Supabase URL env var");
      return NextResponse.json({ error: "Server misconfigured" }, { status: 500 });
    }

    const body = await req.json();

    const { error } = await getSupabase().from("survey_responses").insert([
      {
        meetup_name: body.meetup_name,
        name: body.name || null,
        email: body.email || null,
        background: body.background,
        how_heard: body.how_heard,
        overall_rating: body.overall_rating,
        most_valuable: body.most_valuable || null,
        improvement: body.improvement || null,
        venue_rating: body.venue_rating || null,
        would_return: body.would_return,
        ai_tools_used: body.ai_tools_used || [],
        ai_use_cases: body.ai_use_cases || [],
        tools_curious: body.tools_curious || null,
        experience_level: body.experience_level,
        biggest_challenge: body.biggest_challenge || null,
        next_topics: body.next_topics || [],
        preferred_format: body.preferred_format || null,
        other_feedback: body.other_feedback || null,
      },
    ]);

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Survey API error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
