export const STEPS = [
  { label: "Processing", description: "We're preparing and packing your order." },
  { label: "Shipped", description: "Your package has been handed to the courier." },
  { label: "Out for Delivery", description: "The courier is on the way to your address." },
  { label: "Delivered", description: "The package reached your delivery address." },
];

const items = [
  { id: "i1", emoji: "🛏️", name: "Cotton Bedsheet Set", variant: "King · Sky Blue", qty: 1, price: 1850 },
  { id: "i2", emoji: "🛋️", name: "Hand-Woven Cushion Cover", variant: "Pack of 2 · Sand", qty: 2, price: 420 },
  { id: "i3", emoji: "🧺", name: "Bath Towel", variant: "Large · White", qty: 1, price: 650 },
];

const base = {
  id: "ORD-482913",
  items,
  deliveryFee: 80,
  address: {
    name: "Nusrat Jahan",
    line: "House 12, Road 4, Block C, Mirpur, Dhaka 1216",
    phone: "+880 1712-345678",
  },
};

export const SCENARIOS = [
  {
    key: "on-the-way",
    label: "On the way",
    order: {
      ...base,
      placedOn: "26 Sep 2026",
      courier: "SwiftPost Courier",
      trackingId: "SP-77104582",
      currentStep: 2,
      trackingReady: true,
      tone: "info",
      headline: "Out for delivery",
      summary: "Your package will arrive today.",
      eta: { label: "Estimated delivery", value: "Today, 30 Sep · 2:00 – 6:00 PM" },
      times: ["26 Sep, 6:40 PM", "28 Sep, 11:15 AM", "30 Sep, 9:05 AM", null],
      alert: null,
    },
  },
  {
    key: "delayed",
    label: "Delayed",
    order: {
      ...base,
      placedOn: "24 Sep 2026",
      courier: "SwiftPost Courier",
      trackingId: "SP-77104582",
      currentStep: 2,
      trackingReady: true,
      tone: "warning",
      headline: "Delivery delayed",
      summary: "Your package is running late.",
      eta: {
        label: "New estimate",
        value: "Tomorrow, 1 Oct · by 8:00 PM",
        previous: "Was expected: 29 Sep",
      },
      times: ["24 Sep, 5:10 PM", "26 Sep, 12:30 PM", "29 Sep, 9:20 AM", null],
      alert: {
        tone: "warning",
        title: "We're sorry, your order is late",
        message:
          "The estimated delivery time has passed. The courier reported a delay at the local hub. Your package is still on its way and should arrive by tomorrow evening.",
        primary: "contact",
      },
    },
  },
  {
    key: "not-received",
    label: "Not received",
    order: {
      ...base,
      placedOn: "25 Sep 2026",
      courier: "SwiftPost Courier",
      trackingId: "SP-77104582",
      currentStep: 3,
      trackingReady: true,
      tone: "danger",
      headline: "Marked as delivered",
      summary: "Haven't received it? We can help.",
      eta: { label: "Delivered on", value: "29 Sep, 4:12 PM · Left at front door" },
      times: ["25 Sep, 3:25 PM", "27 Sep, 10:00 AM", "29 Sep, 10:40 AM", "29 Sep, 4:12 PM"],
      alert: {
        tone: "danger",
        title: "Didn't receive your package?",
        message:
          "Check with family members or neighbours first. If it's still missing, report it and we'll investigate with the courier.",
        primary: "report",
      },
    },
  },
  {
    key: "no-tracking",
    label: "No tracking yet",
    order: {
      ...base,
      placedOn: "30 Sep 2026",
      courier: null,
      trackingId: null,
      currentStep: 0,
      trackingReady: false,
      tone: "neutral",
      headline: "Preparing your order",
      summary: "Tracking will appear once the courier picks up your package.",
      eta: { label: "Estimated dispatch", value: "By 1 Oct 2026" },
      times: ["30 Sep, 8:45 AM", null, null, null],
      alert: {
        tone: "neutral",
        title: "Tracking isn't available yet",
        message:
          "Your order is confirmed. Tracking details usually appear within 24 hours of dispatch, and we'll notify you as soon as they're ready.",
        primary: null,
      },
    },
  },
];