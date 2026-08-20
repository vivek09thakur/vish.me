import { motion } from "framer-motion";
import { HiOutlineBookmarkAlt } from "react-icons/hi";
import PropTypes from "prop-types";

const ExpCard = ({ exp, index = 0 }) => {
  const endDate = exp.end_date || "Present";
  const isLeft = index % 2 === 0;

  return (
    <motion.div
      className={`relative box-border w-full pl-14 mb-10 self-auto min-[1024px]:w-1/2 min-[1024px]:mb-12 ${
        isLeft
          ? "min-[1024px]:self-start min-[1024px]:pl-0 min-[1024px]:pr-14"
          : "min-[1024px]:self-end min-[1024px]:pl-14"
      }`}
      initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: false, amount: 0.3 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {/* dot on the left line (mobile/tablet) / center line (desktop) */}
      <span
        className={`absolute top-7 w-4 h-4 rounded-full bg-btn ring-4 ring-[var(--dark1)] z-10 left-0 ${
          isLeft
            ? "min-[1024px]:left-auto min-[1024px]:right-[-8px]"
            : "min-[1024px]:left-[-8px]"
        }`}
      ></span>
      {/* horizontal connector from the line to the card */}
      <span
        className={`absolute top-[38px] h-0.5 bg-btn/50 left-[7px] w-12 min-[1024px]:w-14 ${
          isLeft
            ? "min-[1024px]:left-auto min-[1024px]:right-0"
            : "min-[1024px]:left-0"
        }`}
      ></span>

      <div className="bg-card rounded-xl p-5 shadow-card border border-white/5">
        <p className="text-xs font-medium opacity-60 mb-2">
          {exp.start_date} - {endDate}
        </p>

        <div className="flex items-center gap-2 text-font1">
          <HiOutlineBookmarkAlt className="text-xl shrink-0" color="var(--btn_color)" />
          <h2 className="text-base font-semibold m-0">{exp.company_name}</h2>
        </div>

        <h4 className="text-sm font-medium mt-2">
          <span className="uppercase">Designation :</span>{" "}
          <span className="opacity-70">{exp.designation}</span>
        </h4>

        <p className="text-sm mt-2">
          <span className="font-medium uppercase">Roles &amp; Responsibilities :</span>{" "}
          <span className="opacity-70">{exp.description}</span>
        </p>
      </div>
    </motion.div>
  );
};

ExpCard.propTypes = {
  exp: PropTypes.object.isRequired,
  index: PropTypes.number,
};

export default ExpCard;
