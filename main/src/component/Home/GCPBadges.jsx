import { m } from "framer-motion";
import PropTypes from "prop-types";
import { RxExternalLink } from "react-icons/rx";
import { SiGooglecloud } from "react-icons/si";
import { FiGithub } from "react-icons/fi";
import { badges, socials, socialLinks } from "../../data";
import useFetch from "../../hooks/useFetch";
import SectionHeading from "../ui/SectionHeading";
import StatusText from "../ui/StatusText";
import ExternalButton from "../ui/ExternalButton";
import { pop, scaleIn, squishTap, stagger, viewportOnce } from "../../motion";

const { proxyPath, apiBase, gcpProfileId: profileId, gcpProfileUrl: profileUrl } = badges;
const githubUser = socials.github;

// Dev proxy first, then the public API as a fallback.
const urlsFor = (path) => [`${proxyPath}${path}`, `${apiBase}${path}`];
const GCP_URLS = urlsFor(`/profile/${profileId}`);
const GH_URLS = urlsFor(`/github/${githubUser}/achievements`);

const pickBadges = (json) => ({ items: json.badges ?? [], count: json.badge_count, memberSince: json.member_since });
const pickAchievements = (json) => ({ items: json.achievements ?? [] });
const itemsOf = (data) => data?.items ?? [];
// Treat a successful response with no items as "empty" so the section shows its empty text.
const statusOf = ({ status, data }) => (status === "ready" && itemsOf(data).length === 0 ? "empty" : status);

const BadgeCard = ({ href, title, image, tier }) => (
  <m.a
    href={href}
    target="_blank"
    rel="noreferrer"
    title={title}
    className="group relative flex items-center justify-center w-40 h-40 max-[1000px]:w-32 max-[1000px]:h-32 max-[680px]:w-24 max-[680px]:h-24"
    variants={scaleIn}
    whileHover={{ y: -12, scale: 1.15, rotate: -4, transition: pop }}
    whileTap={squishTap}
  >
    <img
      src={image}
      alt={title}
      loading="lazy"
      decoding="async"
      className="relative w-full h-full object-contain rounded-2xl"
    />
    {tier > 1 && (
      <span className="absolute bottom-1 right-1 rounded-full bg-card px-2 py-0.5 text-xs font-semibold text-font1">
        x{tier}
      </span>
    )}
  </m.a>
);

BadgeCard.propTypes = {
  href: PropTypes.string,
  title: PropTypes.string,
  image: PropTypes.string,
  tier: PropTypes.number,
};

const Section = ({ icon: Icon, title, accent, subtitle, status, items, renderItem, link, linkLabel, emptyText }) => (
  <div className="w-full mt-28 mb-10 mx-auto relative max-[680px]:mt-20">
    <SectionHeading align="center" className="mb-3">
      <Icon className="inline-block -mt-1.5 mr-1 text-btn" /> {title} <span className="text-btn">{accent}</span>
    </SectionHeading>

    {subtitle && status === "ready" && (
      <p className="text-center mb-10 opacity-70 max-[680px]:text-left">{subtitle}</p>
    )}

    {status === "loading" && <StatusText className="text-center max-[680px]:text-left">Loading…</StatusText>}

    {status === "error" && (
      <StatusText className="text-center max-[680px]:text-left">
        Couldn&apos;t reach the badge service right now.{" "}
        <a href={link} target="_blank" rel="noreferrer" className="text-btn no-underline hover:underline">
          View profile instead
        </a>
      </StatusText>
    )}

    {status === "empty" && <StatusText className="text-center max-[680px]:text-left">{emptyText}</StatusText>}

    {status === "ready" && (
      <>
        <m.div
          className="w-[80%] max-w-[1000px] mx-auto flex flex-wrap justify-center items-center gap-5 max-[680px]:w-full max-[680px]:gap-4"
          variants={stagger(0.04)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
        >
          {items.map(renderItem)}
        </m.div>
        <div className="text-center mt-10">
          <ExternalButton href={link} target="_blank" rel="noreferrer" className="gap-1.5 rounded-md px-4 py-2">
            {linkLabel} <RxExternalLink />
          </ExternalButton>
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
  const gcp = useFetch(GCP_URLS, pickBadges);
  const gh = useFetch(GH_URLS, pickAchievements);
  const gcpItems = itemsOf(gcp.data);
  const gcpCount = gcp.data?.count ?? gcpItems.length;
  const memberSince = gcp.data?.memberSince;

  return (
    <>
      <Section
        icon={SiGooglecloud}
        title="Google Cloud"
        accent="Badges"
        subtitle={`${gcpCount} badge${gcpCount === 1 ? "" : "s"} earned on Google Cloud Skills Boost${memberSince ? ` · member since ${memberSince}` : ""}`}
        status={statusOf(gcp)}
        items={gcpItems}
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
        status={statusOf(gh)}
        items={itemsOf(gh.data)}
        renderItem={(a) => (
          <BadgeCard
            key={a.slug ?? a.name}
            href={`https://github.com/${githubUser}?tab=achievements&achievement=${a.slug ?? ""}`}
            title={a.name}
            image={a.image_url}
            tier={Number(a.tier) || 1}
          />
        )}
        link={socialLinks.github}
        linkLabel="View GitHub profile"
        emptyText="No achievements yet."
      />
    </>
  );
};

export default GCPBadges;
