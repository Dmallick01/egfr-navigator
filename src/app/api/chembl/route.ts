import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const target = request.nextUrl.searchParams.get("target") ?? "CHEMBL203";
  const url = `https://www.ebi.ac.uk/chembl/api/data/activity?target_chembl_id=${target}&limit=20&format=json`;
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(8000) });
    if (!res.ok) return Response.json({ error: "ChEMBL request failed" }, { status: 502 });
    const data = await res.json();
    return Response.json(data);
  } catch (e: any) {
    return Response.json({ error: e.message }, { status: 502 });
  }
}
