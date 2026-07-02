import type { MetadataRoute } from "next";

const routes = [
  "",
  "/journey",
  "/work",
  "/projects",
  "/peak-craft",
  "/skills",
  "/beyond",
  "/awards",
  "/vision",
  "/contact",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((path) => ({
    url: `https://jibrilnuredin.dev${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.8,
  }));
}
