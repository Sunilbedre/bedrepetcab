import { NextRequest, NextResponse } from 'next/server';
import { searchPlaces, type PlaceScope } from '@/lib/placeSuggestions';

const SCOPES: PlaceScope[] = ['dubai', 'uae', 'city', 'country'];

async function photonSuggestions(query: string, scope: PlaceScope) {
  const url = new URL('https://photon.komoot.io/api/');
  url.searchParams.set('q', scope === 'dubai' ? `${query} Dubai` : query);
  url.searchParams.set('limit', '6');
  url.searchParams.set('lang', 'en');
  if (scope === 'dubai' || scope === 'uae') {
    url.searchParams.set('lat', '25.2048');
    url.searchParams.set('lon', '55.2708');
  }
  if (scope === 'city') url.searchParams.set('osm_tag', 'place:city');
  if (scope === 'country') url.searchParams.set('osm_tag', 'place:country');

  const res = await fetch(url.toString(), {
    headers: { 'User-Agent': 'GlobalPetCab/1.0 (dubai@globalpetcab.com)' },
    next: { revalidate: 120 },
  });
  if (!res.ok) return [] as { label: string; subtitle?: string }[];

  const data = (await res.json()) as {
    features?: { properties?: Record<string, unknown> }[];
  };
  const out: { label: string; subtitle?: string }[] = [];

  for (const feature of data.features || []) {
    const props = feature.properties || {};
    const label = String(props.name || props.street || '').trim();
    if (!label) continue;
    const subtitle = [props.district, props.city, props.state, props.country]
      .map((v) => String(v || '').trim())
      .filter((v, i, arr) => v && v.toLowerCase() !== label.toLowerCase() && arr.indexOf(v) === i)
      .slice(0, 2)
      .join(', ');
    out.push({ label, subtitle: subtitle || undefined });
  }
  return out;
}

export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get('q') || '';
  const scopeParam = request.nextUrl.searchParams.get('scope') || 'dubai';
  const scope: PlaceScope = SCOPES.includes(scopeParam as PlaceScope)
    ? (scopeParam as PlaceScope)
    : 'dubai';

  type Suggestion = { label: string; subtitle?: string };
  const local: Suggestion[] = searchPlaces(q, scope, 8).map(({ label, subtitle }) => ({
    label,
    subtitle,
  }));
  const seen = new Set(local.map((s) => s.label.toLowerCase()));
  const suggestions: Suggestion[] = [...local];

  if (q.trim().length >= 3 && scope !== 'country') {
    try {
      for (const item of await photonSuggestions(q.trim(), scope)) {
        const key = item.label.toLowerCase();
        if (!seen.has(key)) {
          seen.add(key);
          suggestions.push(item);
        }
      }
    } catch {
      /* photon optional */
    }
  }

  return NextResponse.json({ suggestions: suggestions.slice(0, 10) });
}
