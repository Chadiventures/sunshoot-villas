export const HERO_VIDEO =
  "https://videos.pexels.com/video-files/1093662/1093662-hd_1920_1080_30fps.mp4";

export const VILLA_IMAGES: Record<string, string> = {
  mawar: "https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg",
  jepun: "https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg",
  anggrek: "https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg",
  sandat: "https://images.pexels.com/photos/189296/pexels-photo-189296.jpeg",
};

export const MAPS_EMBED =
  "https://maps.google.com/maps?q=Jl.+Bidadari+II+E,+Seminyak,+Kuta,+Bali,+Indonesia&z=15&output=embed";

const GALLERY_EXTRAS = [
  "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg",
  "https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg",
  "https://images.pexels.com/photos/32870/pexels-photo.jpg",
  "https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg",
];

export function getVillaGalleryImages(heroImage: string): string[] {
  return [heroImage, ...GALLERY_EXTRAS];
}
