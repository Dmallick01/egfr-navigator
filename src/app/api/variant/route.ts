import { NextRequest } from "next/server";
import curatedVariants from "@/data/curated-variants.json";

export async function GET(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id");
  const live = request.nextUrl.searchParams.get("live") === "true";

  if (!id) {
    return Response.json({ error: "id parameter required" }, { status: 400 });
  }

  // Check curated cache
  const cached = (curatedVariants as any[]).find((v: any) => v.id === id);
  if (cached) {
    return Response.json({ variant: cached, source: "cached", timestamp: new Date().toISOString(), errors: [] });
  }

  if (!live) {
    return Response.json({
      error: "Variant not in curated set. Pass live=true to attempt live lookup.",
      available: (curatedVariants as any[]).map((v: any) => v.id),
    }, { status: 404 });
  }

  // Live lookup — attempt parallel fetches
  const errors: string[] = [];
  let gnomadAF: number | null = null;

  // gnomAD GraphQL
  try {
    const gnomadRes = await fetch("https://gnomad.broadinstitute.org/api", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `{ variant(variantId: "${id}", dataset: gnomad_r4) { genome { af } } }`,
      }),
      signal: AbortSignal.timeout(5000),
    });
    if (gnomadRes.ok) {
      const d = await gnomadRes.json();
      gnomadAF = d?.data?.variant?.genome?.af ?? null;
    }
  } catch {
    errors.push("gnomAD lookup failed");
  }

  return Response.json({
    variant: {
      id,
      common_name: id,
      gnomad_af: gnomadAF,
      clinvar_significance: null,
      drugs: [],
      interpretation: "Live lookup — partial data. This variant is not in the curated set.",
    },
    source: "live",
    timestamp: new Date().toISOString(),
    errors,
  });
}
