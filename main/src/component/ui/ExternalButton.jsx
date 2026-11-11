import { m } from "framer-motion";
import PropTypes from "prop-types";
import { squishHover, squishTap } from "../../motion";

const ExternalButton = ({ href, className = "", children, ...rest }) => (
  <m.a
    href={href}
    className={`inline-flex items-center gap-2 rounded-lg bg-btn px-5 py-2.5 text-sm font-semibold text-white no-underline hover:bg-[#ab82ff] transition-colors duration-200 ${className}`.trim()}
    whileHover={squishHover}
    whileTap={squishTap}
    {...rest}
  >
    {children}
  </m.a>
);

ExternalButton.propTypes = {
  href: PropTypes.string.isRequired,
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default ExternalButton;
