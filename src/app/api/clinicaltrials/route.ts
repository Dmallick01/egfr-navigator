import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("query") ?? "EGFR";
  const status = request.nextUrl.searchParams.get("status") ?? "RECRUITING";
  const url = `https://clinicaltrials.gov/api/v2/studies?query.cond=NSCLC+EGFR&query.intr=${encodeURIComponent(query)}&filter.overallStatus=${status}&pageSize=10&format=json`;
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(8000) });
    if (!res.ok) return Response.json({ error: "ClinicalTrials.gov request failed" }, { status: 502 });
    return Response.json(await res.json());
  } catch (e: any) {
    return Response.json({ error: e.message }, { status: 502 });
  }
}
