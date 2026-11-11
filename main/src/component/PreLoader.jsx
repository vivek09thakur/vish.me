import { Planets } from "react-preloaders";
import PropTypes from "prop-types";

const Pre = ({ load }) => (
  <Planets
    background="var(--dark1)"
    animation="slide-down"
    customLoading={load}
    id="planet"
    time={70}
    color="var(--btn_color)"
  />
);

Pre.propTypes = {
  load: PropTypes.bool.isRequired,
};

export default Pre;
