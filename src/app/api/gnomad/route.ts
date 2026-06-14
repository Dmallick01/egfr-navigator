import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const variantId = request.nextUrl.searchParams.get("variantId");
  if (!variantId) return Response.json({ error: "variantId required" }, { status: 400 });

  try {
    const res = await fetch("https://gnomad.broadinstitute.org/api", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `{
          variant(variantId: "${variantId}", dataset: gnomad_r4) {
            variantId
            rsids
            genome { af ac an homozygote_count }
            exome { af ac an }
          }
        }`,
      }),
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) return Response.json({ error: "gnomAD request failed" }, { status: 502 });
    const data = await res.json();
    return Response.json(data);
  } catch (e: any) {
    return Response.json({ error: e.message || "gnomAD fetch failed" }, { status: 502 });
  }
}
