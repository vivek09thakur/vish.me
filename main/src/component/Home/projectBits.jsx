import PropTypes from "prop-types";
import { RiRobot2Line } from "react-icons/ri";
import { LuBrainCircuit, LuImage, LuGamepad2, LuNetwork, LuCode, LuWebhook } from "react-icons/lu";

const ICONS = {
  robot: RiRobot2Line,
  brain: LuBrainCircuit,
  image: LuImage,
  game: LuGamepad2,
  network: LuNetwork,
  api: LuWebhook,
  code: LuCode,
};

export const ProjectIcon = ({ name, className }) => {
  const Icon = ICONS[name] ?? LuCode;
  return <Icon className={className} />;
};
ProjectIcon.propTypes = { name: PropTypes.string, className: PropTypes.string };

export const Hashtags = ({ tags, className = "" }) => (
  <p className={`text-xs text-[#5b8def] m-0 flex flex-wrap gap-x-3 gap-y-1 ${className}`}>
    {tags.map((t) => (
      <span key={t}>#{t.replace(/\s+/g, "")}</span>
    ))}
  </p>
);
Hashtags.propTypes = { tags: PropTypes.arrayOf(PropTypes.string).isRequired, className: PropTypes.string };
