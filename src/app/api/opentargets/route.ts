import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const geneId = request.nextUrl.searchParams.get("geneId") ?? "ENSG00000146889";
  const diseaseId = request.nextUrl.searchParams.get("diseaseId") ?? "EFO_0003060";
  try {
    const res = await fetch("https://api.platform.opentargets.org/api/v4/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `{
          associationsByOverallScore(ensemblId: "${geneId}", diseaseId: "${diseaseId}") {
            score
            datasourceScores { id score }
          }
        }`,
      }),
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) return Response.json({ error: "Open Targets request failed" }, { status: 502 });
    return Response.json(await res.json());
  } catch (e: any) {
    return Response.json({ error: e.message }, { status: 502 });
  }
}
