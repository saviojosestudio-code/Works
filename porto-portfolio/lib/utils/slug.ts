/**
 * Slug normalization and candidate generator for robust dynamic routing.
 * Handles URL percent-encoding (%20), case differences, and whitespace vs hyphen variations.
 */

export function safeDecodeURIComponent(value: string): string {
  if (!value) return "";
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

export interface SlugCandidates {
  slug: string;
  slugs: string[];
  slugsLower: string[];
}

export function getSlugCandidates(rawSlug: string): SlugCandidates {
  if (!rawSlug) {
    return { slug: "", slugs: [], slugsLower: [] };
  }

  const decoded = safeDecodeURIComponent(rawSlug);
  const trimmedDecoded = decoded.trim();
  const trimmedRaw = rawSlug.trim();

  const set = new Set<string>();

  set.add(rawSlug);
  if (trimmedRaw) set.add(trimmedRaw);
  if (decoded) set.add(decoded);

  if (trimmedDecoded) {
    set.add(trimmedDecoded);

    // Spaces to hyphens
    const hyphens = trimmedDecoded.replace(/\s+/g, "-");
    set.add(hyphens);

    // Hyphens to spaces
    const spaces = trimmedDecoded.replace(/-/g, " ");
    set.add(spaces);

    // Trailing space variants (common when copied into Sanity fields)
    set.add(trimmedDecoded + " ");
    set.add(spaces + " ");

    // Ampersand handling (e.g. "ARCHITECTURE & SPACES" vs "architecture-and-spaces")
    set.add(trimmedDecoded.replace(/&/g, "and"));
    set.add(trimmedDecoded.replace(/&/g, "").replace(/\s+/g, " ").trim());
    set.add(trimmedDecoded.replace(/&/g, "and").replace(/\s+/g, "-"));
    set.add(trimmedDecoded.replace(/&/g, "").replace(/\s+/g, "-"));
  }

  const slugs = Array.from(set).filter(Boolean);
  const slugsLower = Array.from(new Set(slugs.map((s) => s.toLowerCase())));

  return {
    slug: decoded || rawSlug,
    slugs,
    slugsLower,
  };
}

/**
 * Checks whether two slugs refer to the same document loosely.
 */
export function isSlugMatch(a?: string, b?: string): boolean {
  if (!a || !b) return false;
  if (a === b) return true;

  const candA = getSlugCandidates(a);
  const candB = getSlugCandidates(b);

  return candA.slugsLower.some((s) => candB.slugsLower.includes(s));
}
