export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  initials: string;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "Jibril brings a rare combination of design sensibility, engineering focus, and genuine care for people. He makes everyone around him better.",
    name: "Mentor",
    role: "Tech Community Lead",
    initials: "MN",
  },
  {
    quote:
      "He turned our scattered promotions into a system. Events finally looked like they belonged to one professional brand.",
    name: "Teammate",
    role: "Peak Craft Events",
    initials: "TM",
  },
  {
    quote:
      "Disciplined, curious, and quietly ambitious. Jibril doesn't just participate in a community — he elevates it.",
    name: "Collaborator",
    role: "Designer & Developer",
    initials: "CL",
  },
];
