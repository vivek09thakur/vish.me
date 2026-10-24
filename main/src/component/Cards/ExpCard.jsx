import { motion } from "framer-motion";
import PropTypes from "prop-types";

const ExpCard = ({ exp }) => {
  const endDate = exp.end_date || "Present";

  return (
    <motion.div
      className="w-full px-1 pb-4"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.3 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <p className="text-xs font-medium opacity-60 mb-2">
        {exp.start_date} - {endDate}
      </p>

      <h2 className="text-base font-semibold m-0 text-font1">{exp.company_name}</h2>

      <h4 className="text-sm font-medium mt-2">
        <span className="uppercase">Designation :</span>{" "}
        <span className="opacity-70">{exp.designation}</span>
      </h4>

      <p className="text-sm mt-2">
        <span className="font-medium uppercase">Roles &amp; Responsibilities :</span>{" "}
        <span className="opacity-70">{exp.description}</span>
      </p>
    </motion.div>
  );
};

ExpCard.propTypes = {
  exp: PropTypes.object.isRequired,
};

export default ExpCard;
