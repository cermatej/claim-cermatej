import data from "./airports.json";

export type Airport = {
  iata: string;
  city: string;
  name: string;
  country: string;
  lat: number;
  lon: number;
  eu: boolean;
};

export const AIRPORTS: Airport[] = data as Airport[];

export function findAirport(iata: string): Airport | undefined {
  const code = iata.toUpperCase();
  return AIRPORTS.find((a) => a.iata === code);
}

export function searchAirports(query: string, limit = 8): Airport[] {
  const q = query.trim().toLowerCase();
  if (!q) return AIRPORTS.slice(0, limit);
  const results: { a: Airport; score: number }[] = [];
  for (const a of AIRPORTS) {
    const iata = a.iata.toLowerCase();
    const city = a.city.toLowerCase();
    const name = a.name.toLowerCase();
    let score = 0;
    if (iata === q) score = 100;
    else if (iata.startsWith(q)) score = 80;
    else if (city.startsWith(q)) score = 60;
    else if (city.includes(q)) score = 40;
    else if (name.toLowerCase().includes(q)) score = 20;
    if (score > 0) results.push({ a, score });
  }
  results.sort((x, y) => y.score - x.score);
  return results.slice(0, limit).map((r) => r.a);
}
