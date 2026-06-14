import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const clinvarId = searchParams.get("clinvar_id");

  if (!clinvarId) {
    return Response.json({ error: "Missing required query parameter: clinvar_id" }, { status: 400 });
  }

  const url = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=clinvar&id=${clinvarId}&retmode=json`;

  try {
    const response = await fetch(url, {
      headers: { "User-Agent": "EGFR-Navigator/1.0 (research tool; contact: himavalley1967@gmail.com)" },
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      return Response.json(
        { error: `ClinVar API returned ${response.status}`, clinvar_id: clinvarId },
        { status: response.status }
      );
    }

    const data = await response.json();
    return Response.json(data);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return Response.json(
      { error: "Failed to fetch from ClinVar", details: message, clinvar_id: clinvarId },
      { status: 502 }
    );
  }
}
