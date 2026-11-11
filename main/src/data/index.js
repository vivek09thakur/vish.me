import data from "./data.json";

const num = (key) => Number(key.match(/\d+$/)?.[0] ?? 0);
const ordered = (obj) =>
  Object.entries(obj)
    .sort(([a], [b]) => num(a) - num(b))
    .map(([id, value]) => ({ id, ...value }));

const normalizeProject = (p) => ({
  subtitle: null,
  live: null,
  repo: null,
  image: null,
  icon: null,
  ...p,
  href: p.live ?? p.repo,
});

const { site, socials, badges, sections } = data;

const socialLinks = {
  github: `https://github.com/${socials.github}`,
  linkedin: `https://www.linkedin.com/in/${socials.linkedin}/`,
  x: `https://x.com/${socials.x}`,
  instagram: `https://www.instagram.com/${socials.instagram}/`,
  discord: `https://discordapp.com/users/${socials.discord}`,
  stackoverflow: `https://stackoverflow.com/users/${socials.stackoverflow}`,
  devto: `https://dev.to/${socials.devto}`,
};

// Shared ordering for icon rails/footers; each consumer attaches its own icon.
const socialNav = [
  { key: "github", href: socialLinks.github, label: "GitHub" },
  { key: "linkedin", href: socialLinks.linkedin, label: "LinkedIn" },
  { key: "stackoverflow", href: socialLinks.stackoverflow, label: "Stack Overflow" },
  { key: "x", href: socialLinks.x, label: "X" },
  { key: "instagram", href: socialLinks.instagram, label: "Instagram" },
  { key: "discord", href: socialLinks.discord, label: "Discord" },
];

const experience = ordered(data.experience);
const majorProjects = ordered(data.projects).map(normalizeProject);
const weekendProjects = ordered(data.sideProjects).map(normalizeProject);

export { site, socials, socialLinks, socialNav, badges, sections, experience, majorProjects, weekendProjects };
