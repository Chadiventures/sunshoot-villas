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
  mosquitoNet: boolean;
  ironingFacilities: boolean;
  coffeeMaker: boolean;
  outdoorFurniture: boolean;
  childSafetyGates: boolean;
  babyCrib: boolean;
  hairdryer: boolean;
  bidet: boolean;
  oven: boolean;
  microwave: boolean;
  toaster: boolean;
};

export type VillaStats = {
  sizeM2: number;
  bedroomCount: number;
  bathroomCount: number;
  bedCount: number;
  terrace?: boolean;
  balcony?: boolean;
  bedDetails: string;
};

export type Villa = {
  slug: string;
  name: string;
  bedrooms: string;
  highlights: string[];
  description: string;
  stats: VillaStats;
  facilities: VillaFacilities;
};

export type VillaKeyInfoCard = {
  label: string;
  value: string;
  href?: string;
};

const MAPS_URL =
  "https://maps.google.com/?q=Jl.+Bidadari+II+E,+Seminyak,+Bali,+Indonesia";

const SHARED_FACILITIES: Pick<
  VillaFacilities,
  | "mosquitoNet"
  | "ironingFacilities"
  | "coffeeMaker"
  | "outdoorFurniture"
  | "childSafetyGates"
  | "babyCrib"
  | "hairdryer"
  | "bidet"
  | "oven"
  | "microwave"
  | "toaster"
> = {
  mosquitoNet: true,
  ironingFacilities: true,
  coffeeMaker: true,
  outdoorFurniture: true,
  childSafetyGates: true,
  babyCrib: true,
  hairdryer: true,
  bidet: true,
  oven: true,
  microwave: true,
  toaster: true,
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
  mosquitoNet: "Mosquito Net",
  ironingFacilities: "Ironing Facilities",
  coffeeMaker: "Coffee Maker",
  outdoorFurniture: "Outdoor Furniture",
  childSafetyGates: "Child Safety Gates",
  babyCrib: "Baby Crib (on request)",
  hairdryer: "Hairdryer",
  bidet: "Bidet",
  oven: "Oven",
  microwave: "Microwave",
  toaster: "Toaster",
};

export const VILLAS: Villa[] = [
  {
    slug: "mawar",
    name: "Villa Mawar",
    bedrooms: "2 bedrooms, 2 floors",
    highlights: ["150 m2", "Private pool", "Garden villa"],
    description:
      "Villa Mawar is a beautiful two-storey garden villa set within the lush Sunshoot Villas Complex. At 150 m2, this private villa offers a stunning private pool, 2 bathrooms with walk-in shower and bidet, and a fully equipped kitchen. The open plan living and dining area is flooded with natural light, creating a warm and welcoming space for families and groups. Connecting rooms are available on request.",
    stats: {
      sizeM2: 150,
      bedroomCount: 2,
      bathroomCount: 2,
      bedCount: 3,
      bedDetails:
        "Bedroom 1 has 1 double bed and 1 king bed. Bedroom 2 has 1 king bed.",
    },
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
      ...SHARED_FACILITIES,
    },
  },
  {
    slug: "jepun",
    name: "Villa Jepun",
    bedrooms: "2 bedrooms, 3 bathrooms",
    highlights: ["150 m2", "Private pool", "Heart of Seminyak"],
    description:
      "Located in the heart of Seminyak, Villa Jepun blends modern elegance with traditional Balinese architecture. This 150 m2 private villa features a stunning private pool, 3 bathrooms with walk-in shower and bidet, and a fully equipped kitchen with stovetop, oven, refrigerator and kitchenware. The spacious living and dining area opens to pool views, making it perfect for couples, honeymooners or small families seeking a stylish and intimate Bali retreat.",
    stats: {
      sizeM2: 150,
      bedroomCount: 2,
      bathroomCount: 3,
      bedCount: 3,
      bedDetails:
        "Bedroom 1 has 1 double bed and 1 king bed. Bedroom 2 has 1 king bed.",
    },
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
      ...SHARED_FACILITIES,
    },
  },
  {
    slug: "anggrek",
    name: "Villa Anggrek",
    bedrooms: "2 bedrooms, 4 bathrooms",
    highlights: ["175 m2", "Private terrace", "Fiber WiFi 20Mbps"],
    description:
      "The largest of the garden villas at 175 m2, Villa Anggrek is Bali's best kept secret for value and space. With 4 bathrooms including a luxurious bathtub, a private terrace with pool views, outdoor dining area, and lightning fast 20Mbps fiber WiFi, this villa is perfect for families, remote workers, and groups who want extra space without compromising on style.",
    stats: {
      sizeM2: 175,
      bedroomCount: 2,
      bathroomCount: 4,
      bedCount: 3,
      terrace: true,
      bedDetails:
        "Bedroom 1 has 1 single bed and 1 king bed. Bedroom 2 has 1 king bed.",
    },
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
      ...SHARED_FACILITIES,
    },
  },
  {
    slug: "sandat",
    name: "Villa Sandat",
    bedrooms: "2 bedrooms, 4 bathrooms",
    highlights: ["190 m2", "Balcony and terrace", "Bidadari area"],
    description:
      "The most spacious villa in the complex at 190 m2, Villa Sandat is a luxurious retreat in the famous Bidadari area of Seminyak. With 4 bathrooms, a private balcony, terrace, outdoor dining, and a stunning private pool, this villa is ideal for larger families or groups. The Sunshooter Bar nearby offers guests special discounts and is just steps away.",
    stats: {
      sizeM2: 190,
      bedroomCount: 2,
      bathroomCount: 4,
      bedCount: 4,
      terrace: true,
      balcony: true,
      bedDetails:
        "Bedroom 1 has 1 double bed and 1 king bed. Bedroom 2 has 1 double bed and 1 king bed.",
    },
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
      ...SHARED_FACILITIES,
    },
  },
];

export function getVillaBySlug(slug: string): Villa | undefined {
  return VILLAS.find((v) => v.slug === slug);
}

export function getVillaSlugs(): string[] {
  return VILLAS.map((v) => v.slug);
}

export function getVillaKeyInfoCards(slug: string): VillaKeyInfoCard[] {
  const villa = getVillaBySlug(slug);
  if (!villa) return [];

  const cards: VillaKeyInfoCard[] = [
    { label: "Location", value: "Jl. Bidadari II E, Seminyak", href: MAPS_URL },
    { label: "Size", value: `${villa.stats.sizeM2} m2` },
    { label: "Bedrooms", value: String(villa.stats.bedroomCount) },
    { label: "Bathrooms", value: String(villa.stats.bathroomCount) },
    { label: "Beds", value: String(villa.stats.bedCount) },
    { label: "Pool", value: "Private" },
    { label: "Daily Cleaning", value: "Included" },
    { label: "Airport Transfer", value: "Free" },
    { label: "Check-in", value: "14:00" },
    { label: "Check-out", value: "11:00" },
    {
      label: "Distance",
      value: "15 min by scooter or car",
    },
    {
      label: "Baby Crib",
      value: "Available on request",
    },
  ];

  if (villa.stats.terrace) {
    cards.push({ label: "Terrace", value: "Yes" });
  }
  if (villa.stats.balcony) {
    cards.push({ label: "Balcony", value: "Yes" });
  }

  return cards;
}
