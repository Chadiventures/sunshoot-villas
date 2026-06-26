export type VillaFacilities = {
  pool: boolean;
  kitchen: boolean;
  tv: boolean;
  tvCable: boolean;
  dvd: boolean;
  ac: boolean;
  breakfast: boolean;
  wifi: boolean;
  parking: boolean;
  petsAllowed: boolean;
  suitableForEvents: boolean;
  bathtub: boolean;
  heating: boolean;
  safetyBox: boolean;
  dryer: boolean;
  washer: boolean;
  doorman: boolean;
  firstAidKit: boolean;
};

export type Villa = {
  slug: string;
  name: string;
  bedrooms: string;
  highlights: string[];
  description: string;
  facilities: VillaFacilities;
};

export const FACILITY_LABELS: Record<keyof VillaFacilities, string> = {
  pool: "Private Pool",
  kitchen: "Fully Equipped Kitchen",
  tv: "Television",
  tvCable: "Cable TV",
  dvd: "DVD Player",
  ac: "Air Conditioning",
  breakfast: "Breakfast Included",
  wifi: "WiFi",
  parking: "Parking",
  petsAllowed: "Pets Allowed",
  suitableForEvents: "Suitable for Events",
  bathtub: "Bathtub",
  heating: "Heating",
  safetyBox: "Safety Box",
  dryer: "Dryer",
  washer: "Washing Machine",
  doorman: "Doorman",
  firstAidKit: "First Aid Kit",
};

export const VILLAS: Villa[] = [
  {
    slug: "mawar",
    name: "Villa Mawar",
    bedrooms: "2 bedrooms, 2 floors",
    highlights: ["Private pool", "2 floors", "Garden villa"],
    description:
      "One of 3 Garden Villas in the Sunshoot Villas Seminyak Complex on Jl. Bidadari II E. Designed to offer the ultimate in Balinese luxury. Open plan living and dining area, ideal for families.",
    facilities: {
      pool: true,
      kitchen: true,
      tv: true,
      tvCable: true,
      dvd: true,
      ac: true,
      breakfast: false,
      wifi: true,
      parking: true,
      petsAllowed: true,
      suitableForEvents: true,
      bathtub: true,
      heating: false,
      safetyBox: true,
      dryer: false,
      washer: false,
      doorman: false,
      firstAidKit: true,
    },
  },
  {
    slug: "jepun",
    name: "Villa Jepun",
    bedrooms: "2 bedrooms (Queen size), modern ensuite",
    highlights: ["Private pool", "Modern ensuite", "Full service"],
    description:
      "Located in the heart of Seminyak. Modern stylish interpretation of the villa concept with a traditional Balinese twist. Exclusive privacy with full service. Supreme comfort and quality.",
    facilities: {
      pool: true,
      kitchen: true,
      tv: true,
      tvCable: true,
      dvd: true,
      ac: true,
      breakfast: true,
      wifi: true,
      parking: true,
      petsAllowed: true,
      suitableForEvents: true,
      bathtub: false,
      heating: true,
      safetyBox: true,
      dryer: true,
      washer: true,
      doorman: true,
      firstAidKit: true,
    },
  },
  {
    slug: "anggrek",
    name: "Villa Anggrek",
    bedrooms: "2 bedrooms",
    highlights: ["Private pool", "Fiber WiFi 20mbps", "Best value"],
    description:
      "Best value private pool villa in Bali. Open plan living and dining. Perfect for couples and families with kids. Fast fiber optic 20mbs WiFi included.",
    facilities: {
      pool: true,
      kitchen: true,
      tv: true,
      tvCable: true,
      dvd: true,
      ac: true,
      breakfast: false,
      wifi: true,
      parking: true,
      petsAllowed: true,
      suitableForEvents: true,
      bathtub: true,
      heating: false,
      safetyBox: true,
      dryer: true,
      washer: false,
      doorman: false,
      firstAidKit: true,
    },
  },
  {
    slug: "sandat",
    name: "Villa Sandat",
    bedrooms: "2 bedrooms + guest toilet",
    highlights: ["Private pool", "Fully equipped kitchen", "Bidadari area"],
    description:
      "Located in the famous Bidadari area of Seminyak. Walking distance to restaurants, supermarkets and salons. Sunshooter Bar delivers directly to your villa.",
    facilities: {
      pool: true,
      kitchen: true,
      tv: true,
      tvCable: true,
      dvd: true,
      ac: true,
      breakfast: true,
      wifi: true,
      parking: true,
      petsAllowed: true,
      suitableForEvents: true,
      bathtub: true,
      heating: true,
      safetyBox: true,
      dryer: true,
      washer: true,
      doorman: true,
      firstAidKit: true,
    },
  },
];

export function getVillaBySlug(slug: string): Villa | undefined {
  return VILLAS.find((v) => v.slug === slug);
}

export function getVillaSlugs(): string[] {
  return VILLAS.map((v) => v.slug);
}
