import { Planets } from "react-preloaders";
import PropTypes from "prop-types";

const Pre = ({ load }) => {
  Pre.propTypes = {
    load: PropTypes.bool.isRequired,
  };
  return (
    <>
      <Planets
        background="var(--dark1)"
        animation="slide-down"
        customLoading={load}
        id="planet"
        time={70}
        color="var(--btn_color)"
      />
    </>
  );
};

export default Pre;
