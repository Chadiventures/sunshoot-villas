export type ReviewPlatform = "Google" | "TripAdvisor" | "Facebook";

export type VillaReview = {
  text: string;
  name: string;
  country: string;
  platform: ReviewPlatform;
};

export const DEFAULT_REVIEWS: VillaReview[] = [
  {
    text: "Warren and Liniah are amazing hosts who go above and beyond to make your stay enjoyable. We loved Villa Jepun and its beautiful pool. They are well connected and can recommend the best tours and activities.",
    name: "Sarah M",
    country: "Australia",
    platform: "Google",
  },
  {
    text: "Each time I come to Bali I stay at Sunshoot Villas. Me and all my friends were satisfied 1000%. The host Warren was great, staff and neighbourhood were excellent.",
    name: "Jean-Pierre L",
    country: "France",
    platform: "TripAdvisor",
  },
  {
    text: "Everything was excellent. Warren goes over and above to accommodate our needs. Staff are friendly and do a wonderful job. It was quiet, clean and had everything we needed.",
    name: "David K",
    country: "United Kingdom",
    platform: "Google",
  },
  {
    text: "Had an exceptional stay. The villa is beautiful with a gorgeous private pool. Warren and the team are incredible hosts. Highly recommend to anyone visiting Bali.",
    name: "Emma T",
    country: "New Zealand",
    platform: "Facebook",
  },
  {
    text: "Best value villa in Seminyak by far. Spotlessly clean, great location, and Warren was always available if we needed anything. Will definitely be back!",
    name: "Michael R",
    country: "United States",
    platform: "TripAdvisor",
  },
];

export const VILLA_REVIEWS: Record<string, VillaReview[]> = {
  mawar: [
    {
      text: "Villa Mawar was absolutely stunning. The garden and pool area felt so private and lush. Perfect for our family holiday.",
      name: "Lisa B",
      country: "Australia",
      platform: "Google",
    },
    {
      text: "Beautiful two storey villa with everything you need. Warren made sure we had a perfect stay from day one.",
      name: "Thomas H",
      country: "Germany",
      platform: "TripAdvisor",
    },
    {
      text: "The open plan living area is gorgeous and the pool is incredible. We did not want to leave!",
      name: "Sophie R",
      country: "United Kingdom",
      platform: "Google",
    },
  ],
  jepun: [
    {
      text: "Warren and Liniah are amazing hosts who go above and beyond to make your stay enjoyable. We loved Villa Jepun and its beautiful pool. They are well connected and can recommend the best tours and activities.",
      name: "Sarah M",
      country: "Australia",
      platform: "Google",
    },
    {
      text: "Stylish, modern and perfectly located. The Balinese touches make it feel so authentic. Highly recommend.",
      name: "Claire D",
      country: "France",
      platform: "TripAdvisor",
    },
    {
      text: "Best villa we have ever stayed in. Warren was always available and nothing was too much trouble.",
      name: "James K",
      country: "United Kingdom",
      platform: "Facebook",
    },
  ],
  anggrek: [
    {
      text: "Best value private pool villa in Bali, no question. Spotlessly clean and the WiFi was lightning fast.",
      name: "Michael R",
      country: "United States",
      platform: "TripAdvisor",
    },
    {
      text: "Perfect for our family. Kids loved the pool and we loved how close everything was. Warren was fantastic.",
      name: "Anna L",
      country: "Sweden",
      platform: "Google",
    },
    {
      text: "Great location, great price, great host. We will definitely be back next time we visit Bali.",
      name: "David W",
      country: "New Zealand",
      platform: "Google",
    },
  ],
  sandat: [
    {
      text: "Each time I come to Bali I stay at Sunshoot Villas. Me and all my friends were satisfied 1000%. Warren and the team were excellent.",
      name: "Jean-Pierre L",
      country: "France",
      platform: "TripAdvisor",
    },
    {
      text: "Spacious, beautiful and in a perfect location. The Sunshooter Bar nearby is a great bonus for guests.",
      name: "Emma T",
      country: "New Zealand",
      platform: "Facebook",
    },
    {
      text: "Had an exceptional stay. The villa is beautiful with a gorgeous private pool. Warren and his team are incredible hosts.",
      name: "Rachel S",
      country: "Canada",
      platform: "Google",
    },
  ],
};

export function getVillaReviews(slug: string): VillaReview[] {
  return VILLA_REVIEWS[slug] ?? DEFAULT_REVIEWS;
}
