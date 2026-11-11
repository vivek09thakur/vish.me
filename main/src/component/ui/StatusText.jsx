import PropTypes from "prop-types";

const StatusText = ({ className = "", children }) => (
  <p className={`opacity-60 ${className}`.trim()}>{children}</p>
);

StatusText.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default StatusText;
