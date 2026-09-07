export const business = {
  name: "RC7",
  owner: "Isaid Rangel",
  email: "Rc7Isa@gmail.com",
  phone: "682-203-3923",
  call: "tel:+16822033923",
  facebook: "https://www.facebook.com/isaid.rangel3",
  tagline: "Professional | Reliable | Affordable",
};
export const delivery = {
  mode: "email-draft",
  recipient: business.email,
} as const;
export const assets = {
  logo: "/assets/logo.png",
  owner: "/assets/owner.jpg",
  poster: "/assets/hero-poster.jpg",
  video:
    "/assets/hero.mp4",
};
export const navigation = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
];
export const services = [
  {
    name: "Electrical",
    icon: "bolt",
    description: "Thoughtful electrical updates for the way you use your home.",
    detail:
      "Tell us about the lighting, outlets, or electrical changes you have in mind. We’ll discuss the scope and requirements with you before planning the work.",
  },
  {
    name: "Roofing",
    icon: "roof",
    description: "A considered approach to the roof over your head.",
    detail:
      "Whether you’re concerned about your existing roof or planning an update, start with a conversation about its condition, materials, and your priorities.",
  },
  {
    name: "Painting",
    icon: "paint",
    description: "Fresh color. Clean lines. A space that feels like you.",
    detail:
      "Bring new life to interior and exterior surfaces. We’ll talk through colors, finishes, surface preparation, and the areas you want to refresh.",
  },
  {
    name: "Flooring",
    icon: "floor",
    description: "A fresh foundation for everyday living.",
    detail:
      "Explore a flooring update that suits your space and daily routine. Share your preferred materials and the rooms you’re considering.",
  },
  {
    name: "Concrete",
    icon: "concrete",
    description: "Practical surfaces, carefully considered from the ground up.",
    detail:
      "Discuss your concrete project, its intended use, and the existing site. Those details help shape a practical scope and estimate.",
  },
  {
    name: "Framing",
    icon: "frame",
    description: "Structure that gives your next idea its shape.",
    detail:
      "Planning a new layout or construction project? Let’s review the framing needs and how they fit into the overall work.",
  },
  {
    name: "Interior & Exterior Remodeling",
    icon: "home",
    description: "Bring your vision together, inside and out.",
    detail:
      "From a room refresh to a broader home update, we’ll discuss what you want to change, how you use the space, and the work involved.",
  },
];
export const approach = [
  {
    title: "Clear Communication",
    text: "Good work starts with a good conversation. Our approach is to listen first, discuss your priorities, and keep the next steps clear.",
  },
  {
    title: "Thoughtful Planning",
    text: "A clear scope makes room for better decisions. We aim to talk through materials, timing, and the details that matter before work begins.",
  },
  {
    title: "Attention to Detail",
    text: "The small things shape how a space feels. We approach each project with care for the practical details and the finishing touches.",
  },
  {
    title: "Respect for Your Space",
    text: "It’s a worksite to us, but it’s home to you. Planning around your space and discussing the impact of the work is part of our approach.",
  },
];
// Preview only. Set enabled to false to hide the entire reviews section before launch.
export const reviews = {
  enabled: true,
  items: [
    {
      id: "01",
      text: "A place for a future customer to share their experience discussing a project with RC7.",
    },
    {
      id: "02",
      text: "A place for a future customer to describe the planning and details of their home update.",
    },
    {
      id: "03",
      text: "A place for a future customer to reflect on their remodeling experience.",
    },
    {
      id: "04",
      text: "A place for a future customer to share what their updated space means to them.",
    },
  ],
};
export const gallery = [
  {
    src: "/assets/gallery-1.jpg",
    width: 2048,
    height: 1536,
    alt: "Living room with a stone fireplace, wood mantel, built-in cabinets, and dark ceiling beams",
  },
  {
    src: "/assets/gallery-2.jpg",
    width: 1536,
    height: 2048,
    alt: "Kitchen in progress with unfinished wood cabinets, an island, and exposed drywall",
  },
  {
    src: "/assets/gallery-3.jpg",
    width: 1536,
    height: 2048,
    alt: "Bathroom with a white tiled shower, black fixtures, white vanity, and hexagonal floor tiles",
  },
  {
    src: "/assets/gallery-4.jpg",
    width: 1536,
    height: 2048,
    alt: "Office interior with a suspended tile ceiling, wood doors, and wall-mounted air conditioner",
  },
];
export function estimateHref(service?: string) {
  return service
    ? `/contact?service=${encodeURIComponent(service)}`
    : "/contact";
}
export function emailDraft(values: Record<string, string>) {
  return `mailto:${delivery.recipient}?subject=${encodeURIComponent(`RC7 Free Estimate — ${values.service}`)}&body=${encodeURIComponent(`Hello Isaid,\n\nI’d like to discuss a project with RC7.\n\nName: ${values.name}\nPhone: ${values.phone}\nEmail: ${values.email || "Not provided"}\nService: ${values.service}\nProject location: ${values.location || "Not provided"}\n\nProject details:\n${values.details}\n`)}`;
}
