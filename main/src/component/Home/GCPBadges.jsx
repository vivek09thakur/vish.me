import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import PropTypes from "prop-types";
import { RxExternalLink } from "react-icons/rx";
import { SiGooglecloud } from "react-icons/si";
import Data from "../../Data.json";

const API_BASE = "/gcp-badges";
const { profileId, profileUrl, apiBaseUrl } = Data.gcpSkillBoost;

const fetchProfile = async (signal) => {
  const urls = [`${API_BASE}/profile/${profileId}`, `${apiBaseUrl}/profile/${profileId}`];
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

const BadgeCard = ({ badge }) => (
  <motion.a
    href={badge.url}
    target="_blank"
    rel="noreferrer"
    title={badge.title}
    className="group relative flex items-center justify-center w-36 h-36 max-[680px]:w-28 max-[680px]:h-28"
    variants={{ hidden: { opacity: 0, scale: 0.8 }, show: { opacity: 1, scale: 1 } }}
    whileHover={{ y: -6 }}
    transition={{ type: "spring", stiffness: 280, damping: 20 }}
  >
    <img
      src={badge.image_url}
      alt={badge.title}
      loading="lazy"
      decoding="async"
      className="relative w-full h-full object-cover rounded-2xl transition-transform duration-300 group-hover:scale-110"
    />
  </motion.a>
);

BadgeCard.propTypes = {
  badge: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    earned_at: PropTypes.string,
    earned_raw: PropTypes.string,
    image_url: PropTypes.string,
    url: PropTypes.string,
  }).isRequired,
};

const GCPBadges = () => {
  const [profile, setProfile] = useState(null);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    const controller = new AbortController();
    fetchProfile(controller.signal)
      .then((data) => {
        setProfile(data);
        setStatus(data.badges && data.badges.length ? "ready" : "empty");
      })
      .catch((err) => {
        if (err.name !== "AbortError") setStatus("error");
      });
    return () => controller.abort();
  }, []);

  return (
    <div className="w-full h-full my-[5%] mx-auto relative">
      <motion.h2
        className="text-[2.5rem] font-normal p-4 text-center mb-[1%] max-[680px]:text-[2rem]"
        style={{ textTransform: "capitalize" }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.6 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <SiGooglecloud style={{ marginBottom: "-6px", color: "var(--btn_color)" }} /> Google Cloud{" "}
        <span style={{ color: "var(--btn_color)" }}>Badges</span>
      </motion.h2>

      {profile && status !== "error" && (
        <p className="text-center mb-[3%]" style={{ opacity: 0.7 }}>
          {profile.badge_count} badge{profile.badge_count === 1 ? "" : "s"} earned on Google Cloud
          Skills Boost{profile.member_since ? ` · member since ${profile.member_since}` : ""}
        </p>
      )}

      {status === "loading" && (
        <p className="text-center" style={{ opacity: 0.6 }}>
          Loading badges…
        </p>
      )}

      {status === "error" && (
        <p className="text-center" style={{ opacity: 0.6 }}>
          Couldn&apos;t load badges right now.{" "}
          <a href={profileUrl} target="_blank" rel="noreferrer" className="text-btn no-underline">
            View profile
          </a>
        </p>
      )}

      {status === "empty" && (
        <p className="text-center" style={{ opacity: 0.6 }}>
          No public badges yet.
        </p>
      )}

      {status === "ready" && (
        <>
          <motion.div
            className="w-[80%] mx-auto flex flex-wrap justify-center items-center gap-6 max-[680px]:w-full max-[680px]:gap-4"
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.2 }}
          >
            {profile.badges.map((badge) => (
              <BadgeCard key={badge.id ?? badge.url} badge={badge} />
            ))}
          </motion.div>
          <div className="text-center mt-[3%]">
            <a
              href={profileUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-md bg-btn px-4 py-2 text-sm font-semibold text-white no-underline hover:brightness-110 transition"
            >
              View full profile <RxExternalLink />
            </a>
          </div>
        </>
      )}
    </div>
  );
};

export default GCPBadges;
