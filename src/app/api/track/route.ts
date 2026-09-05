import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase-admin";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const supabase = getSupabaseAdmin();
        const client = supabase as any;

        await client.from("analytics_events").insert({
            event_type: body.type,
            url: body.url,
            title: body.title,
            company: body.company,
            job_id: body.jobId,
            traffic_source: body.trafficSource || body.source,
            search_query: body.searchQuery,
            share_channel: body.shareChannel,
            payload: body.meta || {},
        });

        return NextResponse.json({ ok: true });
    } catch (e) {
        return NextResponse.json({ ok: false }, { status: 400 });
    }
}
