import { m } from "framer-motion";
import PropTypes from "prop-types";
import { fadeUp, viewportOnce } from "../../motion";

const SectionHeading = ({ as = "h2", align = "left", className = "", children }) => {
  const Tag = m[as];
  const alignClass = align === "center" ? "text-center max-[680px]:text-left" : "";
  return (
    <Tag
      className={`section-title ${alignClass} ${className}`.trim()}
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
    >
      {children}
    </Tag>
  );
};

SectionHeading.propTypes = {
  as: PropTypes.oneOf(["h2", "h3"]),
  align: PropTypes.oneOf(["left", "center"]),
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default SectionHeading;
