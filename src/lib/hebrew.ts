import CITY_DATA from '../data/city-data.json';

// Hebrew to English translations for Pikud HaOref alert terms
// The alert system uses a fixed vocabulary so a dictionary works perfectly

// Threat type translations
export const THREAT_TRANSLATIONS: Record<string, string> = {
  // Missile threats
  'ירי רקטות וטילים': 'Rocket and Missile Fire',
  'ירי רקטות': 'Rocket Fire',
  'ירי טילים': 'Missile Fire',
  'טיל בליסטי': 'Ballistic Missile',
  'טילים': 'Missiles',
  'רקטות': 'Rockets',

  // Drone/UAV threats
  'חדירת כלי טיס עוין': 'Hostile Aircraft Intrusion',
  'חדירת כטבם': 'UAV Intrusion',
  'כלי טיס עוין': 'Hostile Aircraft',
  'כטבם': 'UAV/Drone',
  'כטב"ם': 'UAV/Drone',

  // Ground threats
  'חדירת מחבלים': 'Terrorist Infiltration',
  'חדירה': 'Infiltration',

  // Other threats
  'רעידת אדמה': 'Earthquake',
  'צונמי': 'Tsunami',
  'חומרים מסוכנים': 'Hazardous Materials',
  'אירוע חומרים מסוכנים': 'Hazmat Incident',
  'אירוע רדיולוגי': 'Radiological Event',
  'התרעה': 'Alert',
  'התרעת צבע אדום': 'Red Alert Warning',
  'צבע אדום': 'Red Alert',

  // Instructions
  'היכנסו למרחב המוגן': 'Enter Protected Space',
  'היכנסו למבנה': 'Enter Building',

  // Military/weapon terms for partial matching
  'טיל': 'Missile',
  'מטוס': 'Aircraft',
  'מסוק': 'Helicopter',
  'מל"ט': 'Drone',
  'רחפן': 'Drone',
};

// Israeli locality translations - 1,266 official localities from Israel CBS (data.gov.il)
// plus custom additions for regions, alert-specific terms, and alternate spellings
export const CITY_TRANSLATIONS: Record<string, string> = CITY_DATA;

/**
 * Translate a Hebrew string to English using the lookup tables.
 * Falls back to the original string if no translation is found.
 */
export function translateHebrew(text: string): string {
  if (!text) return text;

  // Check for exact match in threat translations
  if (THREAT_TRANSLATIONS[text]) return THREAT_TRANSLATIONS[text];

  // Check for exact match in city translations
  if (CITY_TRANSLATIONS[text]) return CITY_TRANSLATIONS[text];

  // Try partial matching - replace known Hebrew terms within the string
  let translated = text;
  for (const [heb, eng] of Object.entries(THREAT_TRANSLATIONS)) {
    if (translated.includes(heb)) {
      translated = translated.replace(heb, eng);
    }
  }
  for (const [heb, eng] of Object.entries(CITY_TRANSLATIONS)) {
    if (translated.includes(heb)) {
      translated = translated.replace(heb, eng);
    }
  }

  return translated;
}

/**
 * Translate an array of Hebrew city names to English
 */
export function translateCities(cities: string[]): string[] {
  return cities.map(city => CITY_TRANSLATIONS[city.trim()] || translateHebrew(city.trim()));
}

/**
 * Detect if a string contains Hebrew characters
 */
export function isHebrew(text: string): boolean {
  return /[\u0590-\u05FF]/.test(text);
}

/**
 * Translate free-form text to English using Google Translate (free, no key)
 * Supports auto-detection of Hebrew, Arabic, Farsi
 * Falls back to original text on failure
 */
export async function translateFreeText(text: string): Promise<string> {
  if (!text) return text;

  try {
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=en&dt=t&q=${encodeURIComponent(text)}`;

    const res = await fetch(url, {
      signal: AbortSignal.timeout(3000),
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' },
    });

    if (!res.ok) return text;

    const data = await res.json();
    const translated = (data[0] as [string][]).map((part: [string]) => part[0]).join('');
    return translated || text;
  } catch {
    return text;
  }
}

/**
 * Batch translate multiple Hebrew strings
 */
export async function translateBatch(texts: string[]): Promise<string[]> {
  const results = await Promise.allSettled(
    texts.map(t => translateFreeText(t))
  );
  return results.map((r, i) =>
    r.status === 'fulfilled' ? r.value : texts[i]
  );
}
