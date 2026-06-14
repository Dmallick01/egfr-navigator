import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const ids = searchParams.get("ids");

  if (!ids) {
    return Response.json({ error: "Missing required query parameter: ids (comma-separated PMIDs)" }, { status: 400 });
  }

  const url = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=pubmed&id=${ids}&retmode=json`;

  try {
    const response = await fetch(url, {
      headers: { "User-Agent": "EGFR-Navigator/1.0 (research tool; contact: himavalley1967@gmail.com)" },
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      return Response.json(
        { error: `PubMed API returned ${response.status}`, ids },
        { status: response.status }
      );
    }

    const data = await response.json();
    return Response.json(data);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return Response.json(
      { error: "Failed to fetch from PubMed", details: message, ids },
      { status: 502 }
    );
  }
}
