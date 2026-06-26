import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import path from "path";
import { VILLAS } from "./villas";

export type VillaContentEntry = {
  description: string;
  heroImage: string;
  galleryImages: string[];
  pricing: string;
};

export type VillaContentStore = Record<string, VillaContentEntry>;

const DATA_DIR = path.join(process.cwd(), "data");
const CONTENT_FILE = path.join(DATA_DIR, "villa-content.json");

function defaultContent(): VillaContentStore {
  const store: VillaContentStore = {};
  const placeholder =
    "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=1200&q=80";

  for (const villa of VILLAS) {
    store[villa.slug] = {
      description: villa.description,
      heroImage: placeholder,
      galleryImages: [placeholder],
      pricing: "Contact us for current rates and availability.",
    };
  }
  return store;
}

export function readVillaContent(): VillaContentStore {
  try {
    if (!existsSync(CONTENT_FILE)) {
      const defaults = defaultContent();
      writeVillaContent(defaults);
      return defaults;
    }
    const raw = readFileSync(CONTENT_FILE, "utf-8");
    const parsed = JSON.parse(raw) as VillaContentStore;
    const defaults = defaultContent();
    return { ...defaults, ...parsed };
  } catch {
    return defaultContent();
  }
}

export function writeVillaContent(content: VillaContentStore): void {
  if (!existsSync(DATA_DIR)) {
    mkdirSync(DATA_DIR, { recursive: true });
  }
  writeFileSync(CONTENT_FILE, JSON.stringify(content, null, 2), "utf-8");
}

export function getVillaContent(slug: string): VillaContentEntry {
  const all = readVillaContent();
  return (
    all[slug] ?? {
      description: "",
      heroImage:
        "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=1200&q=80",
      galleryImages: [],
      pricing: "Contact us for current rates.",
    }
  );
}
