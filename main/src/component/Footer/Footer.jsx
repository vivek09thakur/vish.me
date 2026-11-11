import { m } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";
import { site, socials, socialLinks, socialNav } from "../../data";
import SOCIAL_ICONS from "../ui/socialIcons";
import { fadeUp, viewportOnce } from "../../motion";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <m.footer
      className="with-rail pt-24 pb-12 bg-dark1 max-[680px]:pt-16 max-[680px]:pr-4"
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
    >
      <div className="flex items-center gap-6 max-[680px]:gap-4">
        <div className="h-px flex-1 bg-line/40" />
        <p className="font-archivo text-[1.6rem] leading-none max-[680px]:text-xl">Say hello</p>
      </div>

      <div className="mt-10 grid gap-10 md:grid-cols-[1fr_auto] md:items-end">
        <div>
          <p className="opacity-70 max-w-md leading-relaxed">
            Open to conversations about cloud infrastructure, small AI models, and anything worth building.
          </p>
          <a
            href={`mailto:${site.email}`}
            className="group mt-4 inline-flex items-center gap-2 font-mono text-lg text-green1 no-underline break-all hover:text-[#d4f78a] transition-colors max-[680px]:text-base"
          >
            {site.email}
            <FiArrowUpRight className="shrink-0 transition-transform duration-500 ease-bounce group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </div>

        <ul className="flex flex-wrap gap-2 list-none">
          {socialNav.map(({ key, href, label }) => {
            const Icon = SOCIAL_ICONS[key];
            return (
              <li key={key}>
                <a
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  title={label}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-card/40 text-font1 no-underline hover:text-btn hover:border-btn/50 transition-colors duration-200"
                >
                  <Icon />
                </a>
              </li>
            );
          })}
        </ul>
      </div>

      <p className="mt-14 text-sm opacity-40 font-light">
        © {year} {site.name}. Built with React and a lot of weekends.{" "}
        <a href={socialLinks.github} target="_blank" rel="noreferrer" className="hover:opacity-100 hover:text-btn transition-colors">
          {socials.github}
        </a>
      </p>
    </m.footer>
  );
};

export default Footer;
