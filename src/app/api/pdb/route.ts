import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get('id');
  if (!id || !/^[A-Z0-9]{4}$/i.test(id)) {
    return NextResponse.json({ error: 'Invalid PDB ID' }, { status: 400 });
  }

  try {
    const res = await fetch(
      `https://files.rcsb.org/download/${id.toUpperCase()}.pdb`,
      {
        signal: AbortSignal.timeout(12000),
        headers: { 'User-Agent': 'EGFR-Navigator/1.0 (research)' },
      }
    );

    if (!res.ok) {
      return NextResponse.json(
        { error: `RCSB returned ${res.status} for ${id}` },
        { status: 502 }
      );
    }

    const text = await res.text();
    return new NextResponse(text, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        // PDB files don't change — safe to cache aggressively
        'Cache-Control': 'public, max-age=604800, s-maxage=604800',
      },
    });
  } catch {
    return NextResponse.json({ error: 'Failed to fetch from RCSB' }, { status: 502 });
  }
}
