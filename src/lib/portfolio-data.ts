// Re-export everything from domain modules so existing imports keep working.
export { type NavItem, navItems } from "./data/navigation";
export { type JourneyStep, journey } from "./data/journey";
export { type Service, services } from "./data/services";
export { type ProjectCategory, type Project, projects, projectFilters } from "./data/projects";
export { type SkillCategory, skillCategories } from "./data/skills";
export { type Interest, interests } from "./data/interests";
export { type Leadership, leadershipPillars, leadershipStats } from "./data/leadership";
export { type Testimonial, testimonials } from "./data/testimonials";
export { socials, visionStats } from "./data/socials";
export { type AwardItem, awards } from "./data/awards";
