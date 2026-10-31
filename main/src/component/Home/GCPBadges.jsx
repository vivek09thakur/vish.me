import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import PropTypes from "prop-types";
import { RxExternalLink } from "react-icons/rx";
import { SiGooglecloud } from "react-icons/si";
import { FiGithub } from "react-icons/fi";
import Data from "../../Data.json";

const API_BASE = "/gcp-badges";
const { profileId, profileUrl, apiBaseUrl } = Data.gcpSkillBoost;
const githubUser = Data.socials.github.split("/").filter(Boolean).pop();

const fetchFirst = async (path, signal) => {
  const urls = [`${API_BASE}${path}`, `${apiBaseUrl}${path}`];
  let lastError;
  for (const url of urls) {
    try {
      const res = await fetch(url, { signal });
      if (res.ok) return res.json();
      lastError = new Error(`Request failed (${res.status})`);
    } catch (err) {
      if (err.name === "AbortError") throw err;
      lastError = err;
    }
  }
  throw lastError;
};

const useFetch = (path, pick) => {
  const [data, setData] = useState(null);
  const [status, setStatus] = useState("loading");
  useEffect(() => {
    const controller = new AbortController();
    fetchFirst(path, controller.signal)
      .then((json) => {
        const items = pick(json);
        setData({ raw: json, items });
        setStatus(items.length ? "ready" : "empty");
      })
      .catch((err) => {
        if (err.name !== "AbortError") setStatus("error");
      });
    return () => controller.abort();
  }, [path, pick]);
  return { data, status };
};

const pickBadges = (json) => json.badges || [];
const pickAchievements = (json) => json.achievements || [];

const BadgeCard = ({ href, title, image, tier }) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noreferrer"
    title={title}
    className="group relative flex items-center justify-center w-36 h-36 max-[680px]:w-28 max-[680px]:h-28"
    variants={{ hidden: { opacity: 0, scale: 0.8 }, show: { opacity: 1, scale: 1 } }}
    whileHover={{ y: -6 }}
    transition={{ type: "spring", stiffness: 280, damping: 20 }}
  >
    <img
      src={image}
      alt={title}
      loading="lazy"
      decoding="async"
      className="relative w-full h-full object-contain rounded-2xl transition-transform duration-300 group-hover:scale-110"
    />
    {tier > 1 && (
      <span className="absolute bottom-1 right-1 rounded-full bg-card px-2 py-0.5 text-xs font-semibold text-font1">
        x{tier}
      </span>
    )}
  </motion.a>
);

BadgeCard.propTypes = {
  href: PropTypes.string,
  title: PropTypes.string,
  image: PropTypes.string,
  tier: PropTypes.number,
};

const Section = ({ icon: Icon, title, accent, subtitle, status, items, renderItem, link, linkLabel, emptyText }) => (
  <div className="w-full h-full my-[5%] mx-auto relative">
    <motion.h2
      className="text-[2.5rem] font-normal p-4 text-center mb-[1%] max-[680px]:text-[2rem]"
      style={{ textTransform: "capitalize" }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.6 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <Icon style={{ marginBottom: "-6px", color: "var(--btn_color)" }} /> {title}{" "}
      <span style={{ color: "var(--btn_color)" }}>{accent}</span>
    </motion.h2>

    {subtitle && status === "ready" && (
      <p className="text-center mb-[3%]" style={{ opacity: 0.7 }}>
        {subtitle}
      </p>
    )}

    {status === "loading" && (
      <p className="text-center" style={{ opacity: 0.6 }}>
        Loading…
      </p>
    )}

    {status === "error" && (
      <p className="text-center" style={{ opacity: 0.6 }}>
        Couldn&apos;t load right now.{" "}
        <a href={link} target="_blank" rel="noreferrer" className="text-btn no-underline">
          View profile
        </a>
      </p>
    )}

    {status === "empty" && (
      <p className="text-center" style={{ opacity: 0.6 }}>
        {emptyText}
      </p>
    )}

    {status === "ready" && (
      <>
        <motion.div
          className="w-[80%] mx-auto flex flex-wrap justify-center items-center gap-6 max-[680px]:w-full max-[680px]:gap-4"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {items.map(renderItem)}
        </motion.div>
        <div className="text-center mt-[3%]">
          <a
            href={link}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-md bg-btn px-4 py-2 text-sm font-semibold text-white no-underline hover:brightness-110 transition"
          >
            {linkLabel} <RxExternalLink />
          </a>
        </div>
      </>
    )}
  </div>
);

Section.propTypes = {
  icon: PropTypes.elementType.isRequired,
  title: PropTypes.string.isRequired,
  accent: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  status: PropTypes.string.isRequired,
  items: PropTypes.array,
  renderItem: PropTypes.func.isRequired,
  link: PropTypes.string.isRequired,
  linkLabel: PropTypes.string.isRequired,
  emptyText: PropTypes.string.isRequired,
};

const GCPBadges = () => {
  const gcp = useFetch(`/profile/${profileId}`, pickBadges);
  const gh = useFetch(`/github/${githubUser}/achievements`, pickAchievements);
  const gcpCount = gcp.data?.raw?.badge_count ?? gcp.data?.items.length ?? 0;
  const memberSince = gcp.data?.raw?.member_since;

  return (
    <>
      <Section
        icon={SiGooglecloud}
        title="Google Cloud"
        accent="Badges"
        subtitle={`${gcpCount} badge${gcpCount === 1 ? "" : "s"} earned on Google Cloud Skills Boost${memberSince ? ` · member since ${memberSince}` : ""}`}
        status={gcp.status}
        items={gcp.data?.items}
        renderItem={(b) => (
          <BadgeCard key={b.id ?? b.url ?? b.title} href={b.url || profileUrl} title={b.title} image={b.image_url} />
        )}
        link={profileUrl}
        linkLabel="View full profile"
        emptyText="No public badges yet."
      />
      <Section
        icon={FiGithub}
        title="GitHub"
        accent="Achievements"
        status={gh.status}
        items={gh.data?.items}
        renderItem={(a) => (
          <BadgeCard
            key={a.slug ?? a.name}
            href={`https://github.com/${githubUser}?tab=achievements&achievement=${a.slug ?? ""}`}
            title={a.name}
            image={a.image_url}
            tier={Number(a.tier) || 1}
          />
        )}
        link={Data.socials.github}
        linkLabel="View GitHub profile"
        emptyText="No achievements yet."
      />
    </>
  );
};

export default GCPBadges;
