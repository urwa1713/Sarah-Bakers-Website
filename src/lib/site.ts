import c1 from "@/assets/gallery/cake-1.png.asset.json";
import c2 from "@/assets/gallery/cake-2.png.asset.json";
import c3 from "@/assets/gallery/cake-3.png.asset.json";
import c4 from "@/assets/gallery/cake-4.png.asset.json";
import c5 from "@/assets/gallery/cake-5.png.asset.json";
import c6 from "@/assets/gallery/cake-6.png.asset.json";
import c7 from "@/assets/gallery/cake-7.png.asset.json";
import c8 from "@/assets/gallery/cake-8.png.asset.json";
import c9 from "@/assets/gallery/cake-9.png.asset.json";
import c10 from "@/assets/gallery/cake-10.png.asset.json";
import c11 from "@/assets/gallery/cake-11.png.asset.json";
import c12 from "@/assets/gallery/cake-12.png.asset.json";
import c13 from "@/assets/gallery/cake-13.png.asset.json";
import c14 from "@/assets/gallery/cake-14.png.asset.json";
import c15 from "@/assets/gallery/cake-15.png.asset.json";
import c16 from "@/assets/gallery/cake-16.png.asset.json";
import c17 from "@/assets/gallery/cake-17.png.asset.json";
import c18 from "@/assets/gallery/cake-18.png.asset.json";
import c19 from "@/assets/gallery/cake-19.png.asset.json";

export const WHATSAPP_URL = "https://wa.me/923175285494?text=Hi%2C%20I%27d%20like%20to%20order%20a%20cake";
export const INSTAGRAM_URL = "https://instagram.com/sarahh_bakers";
export const INSTAGRAM_HANDLE = "@sarahh_bakers";
export const PHONE_DISPLAY = "0317-5285494";
export const CAKES = [c1, c2, c3, c4, c5, c6, c7, c8, c9, c10, c11, c12, c13, c14, c15, c16, c17, c18, c19].map((c) => c.url);

export type CategorySlug = "wedding" | "birthday" | "custom" | "seasonal";

export const CATEGORIES: {
  slug: CategorySlug;
  name: string;
  tag: string;
  desc: string;
  long: string;
  cover: string;
  images: string[];
}[] = [
  {
    slug: "wedding",
    name: "Wedding Cakes",
    tag: "Timeless",
    desc: "Elegant tiered showstoppers for your big day.",
    long: "Hand-piped florals, buttercream lace and tiered silhouettes — designed to be the centrepiece of your celebration.",
    cover: CAKES[0],
    images: [CAKES[0], CAKES[3], CAKES[7], CAKES[11], CAKES[15]],
  },
  {
    slug: "birthday",
    name: "Birthday Cakes",
    tag: "Signature",
    desc: "Personal, playful and made to be photographed.",
    long: "Custom names, colours, candles and flavours — a fresh-baked birthday moment, exactly the way you want it.",
    cover: CAKES[1],
    images: [CAKES[1], CAKES[4], CAKES[8], CAKES[12], CAKES[16]],
  },
  {
    slug: "custom",
    name: "Custom Treats",
    tag: "Bespoke",
    desc: "Cupcakes, cakesicles & one-of-a-kind bakes.",
    long: "Bring us a theme, a photo or just a vibe — we'll turn it into a hand-piped edible little masterpiece.",
    cover: CAKES[2],
    images: [CAKES[2], CAKES[5], CAKES[9], CAKES[13], CAKES[17]],
  },
  {
    slug: "seasonal",
    name: "Seasonal Specials",
    tag: "Limited",
    desc: "Eid, Christmas & festive-only creations.",
    long: "Seasonal flavours and festive decor — small-batch bakes that only show up once or twice a year.",
    cover: CAKES[6],
    images: [CAKES[6], CAKES[10], CAKES[14], CAKES[18]],
  },
];

export function getCategory(slug: string) {
  return CATEGORIES.find((c) => c.slug === slug);
}