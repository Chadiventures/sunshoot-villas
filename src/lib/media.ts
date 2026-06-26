export const HERO_VIDEO =
  "https://videos.pexels.com/video-files/2169880/2169880-hd_1920_1080_30fps.mp4";

export const BOOKING_PHOTOS = [
  "https://cf.bstatic.com/xdata/images/hotel/max1280x900/139426334.jpg?k=569d217c470479f965a215fcea4cb500cd01984424776e0550018463d651d567&o=&hp=1",
  "https://cf.bstatic.com/xdata/images/hotel/max1280x900/185354554.jpg?k=5541438d3715f06575d9cf5298bbf73db085483cebce43802645af39a6bdeb0f&o=&hp=1",
  "https://cf.bstatic.com/xdata/images/hotel/max1280x900/185354556.jpg?k=93cc84675b1e46a12d3c9cef4fc88d44a7bc93dc25e98af06b9348e1561eb429&o=&hp=1",
  "https://cf.bstatic.com/xdata/images/hotel/max1280x900/185354557.jpg?k=61724561fa2ffba6d2d46d436a5d54501d6928005012f4111304e4a31be50362&o=&hp=1",
  "https://cf.bstatic.com/xdata/images/hotel/max1280x900/185354560.jpg?k=6a8de904dbd7d2121d6e233fd5a13746df529ac987d74da48410ae3357898cfa&o=&hp=1",
] as const;

export const VILLA_IMAGES: Record<string, string> = {
  mawar: BOOKING_PHOTOS[0],
  jepun: BOOKING_PHOTOS[1],
  anggrek: BOOKING_PHOTOS[2],
  sandat: BOOKING_PHOTOS[3],
};

export const MAPS_EMBED =
  "https://maps.google.com/maps?q=Jl.+Bidadari+II+E,+Seminyak,+Kuta,+Bali,+Indonesia&z=15&output=embed";

const VILLA_SLUG_ORDER = ["mawar", "jepun", "anggrek", "sandat"] as const;

export function getVillaGalleryImages(slug: string): string[] {
  const startIndex = VILLA_SLUG_ORDER.indexOf(
    slug as (typeof VILLA_SLUG_ORDER)[number],
  );
  const offset = startIndex >= 0 ? startIndex : 0;

  return Array.from(
    { length: BOOKING_PHOTOS.length },
    (_, i) => BOOKING_PHOTOS[(offset + i) % BOOKING_PHOTOS.length],
  );
}
