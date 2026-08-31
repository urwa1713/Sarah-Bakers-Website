// ---------------------------------------------------------------------------
// Ordering configuration — edit the numbers here to change pricing.
// All prices are in PKR.
// ---------------------------------------------------------------------------

export type Option = { id: string; label: string; price: number };

/** Base price per size/weight */
export const SIZES: Option[] = [
  { id: "0.5kg", label: "0.5 kg", price: 1800 },
  { id: "1kg", label: "1 kg", price: 3000 },
  { id: "1.5kg", label: "1.5 kg", price: 4200 },
  { id: "2kg", label: "2 kg", price: 5400 },
  { id: "3kg", label: "3 kg", price: 7800 },
];

/** Shape upcharge (added to the base price) */
export const SHAPES: Option[] = [
  { id: "round", label: "Round", price: 0 },
  { id: "square", label: "Square", price: 300 },
  { id: "heart", label: "Heart", price: 500 },
];

export const FLAVOURS: Option[] = [
  { id: "chocolate", label: "Chocolate", price: 0 },
  { id: "vanilla", label: "Vanilla", price: 0 },
  { id: "fresh-cream", label: "Fresh Cream", price: 200 },
  { id: "red-velvet", label: "Red Velvet", price: 400 },
  { id: "chocolate-fudge", label: "Chocolate Fudge", price: 500 },
  { id: "lotus", label: "Lotus / Biscoff", price: 700 },
];

export const FROSTINGS: Option[] = [
  { id: "buttercream", label: "Buttercream", price: 0 },
  { id: "whipped", label: "Whipped Cream", price: 150 },
  { id: "ganache", label: "Chocolate Ganache", price: 400 },
  { id: "fondant", label: "Fondant", price: 900 },
];

export const TOPPINGS: Option[] = [
  { id: "sprinkles", label: "Sprinkles", price: 150 },
  { id: "candles", label: "Number / Letter Candles", price: 200 },
  { id: "drip", label: "Chocolate Drip", price: 300 },
  { id: "fruits", label: "Fresh Fruits", price: 500 },
  { id: "flowers", label: "Edible Flowers", price: 600 },
  { id: "photo", label: "Photo Print Topper", price: 800 },
];

/** Delivery areas and their flat delivery fee. Add or edit freely. */
export const DELIVERY_AREAS: { city: string; areas: { id: string; label: string; fee: number }[] }[] = [
  {
    city: "Islamabad",
    areas: [
      { id: "isb-f6", label: "F-6 / F-7", fee: 300 },
      { id: "isb-f8", label: "F-8 / F-10", fee: 300 },
      { id: "isb-f11", label: "F-11 / E-11", fee: 350 },
      { id: "isb-g6", label: "G-6 / G-7 / G-8", fee: 300 },
      { id: "isb-g9", label: "G-9 / G-10 / G-11", fee: 350 },
      { id: "isb-g13", label: "G-13 / G-14", fee: 450 },
      { id: "isb-i8", label: "I-8 / I-10", fee: 400 },
      { id: "isb-dha", label: "DHA Islamabad", fee: 600 },
      { id: "isb-bahria", label: "Bahria Town Islamabad", fee: 600 },
    ],
  },
  {
    city: "Rawalpindi",
    areas: [
      { id: "rwp-saddar", label: "Saddar", fee: 450 },
      { id: "rwp-satellite", label: "Satellite Town", fee: 450 },
      { id: "rwp-chaklala", label: "Chaklala Scheme 3", fee: 500 },
      { id: "rwp-westridge", label: "Westridge / Peshawar Road", fee: 550 },
      { id: "rwp-gulraiz", label: "Gulraiz / Airport Housing", fee: 600 },
      { id: "rwp-bahria", label: "Bahria Town Phase 1–8", fee: 650 },
    ],
  },
];

export const ALL_AREAS = DELIVERY_AREAS.flatMap((c) =>
  c.areas.map((a) => ({ ...a, city: c.city })),
);

export const TIME_SLOTS = [
  { id: "morning", label: "Morning (10am – 1pm)" },
  { id: "afternoon", label: "Afternoon (1pm – 5pm)" },
  { id: "evening", label: "Evening (5pm – 9pm)" },
];

/** Minimum prep time in hours before a cake can be delivered. */
export const MIN_NOTICE_HOURS = 48;

export const PAYMENT_METHODS = [
  {
    id: "cod",
    label: "Cash on Delivery",
    hint: "Pay the rider when your cake arrives.",
    details: null as string[] | null,
    needsProof: false,
  },
  {
    id: "bank",
    label: "Bank Transfer",
    hint: "Transfer the advance and share the receipt.",
    details: [
      "Bank: Meezan Bank",
      "Title: Home Baker Islamabad",
      "Account / IBAN: PK00 MEZN 0000 0000 0000 0000",
    ],
    needsProof: true,
  },
  {
    id: "jazzcash",
    label: "JazzCash / EasyPaisa",
    hint: "Send to the number below and upload the screenshot.",
    details: ["JazzCash / EasyPaisa: 0317-5285494", "Title: Home Baker Islamabad"],
    needsProof: true,
  },
];

export const ADVANCE_NOTE =
  "50% advance confirms your order. Cancellations are refunded at 50% of the advance.";

export function formatPKR(amount: number) {
  return `Rs. ${Math.round(amount).toLocaleString("en-PK")}`;
}

export function byId(list: Option[], id: string) {
  return list.find((o) => o.id === id) ?? list[0];
}

export function minDeliveryDate() {
  const d = new Date(Date.now() + MIN_NOTICE_HOURS * 3600 * 1000);
  return d.toISOString().slice(0, 10);
}
