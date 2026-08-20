import { motion } from "framer-motion";
import Data from "../../Data.json";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <motion.div
      className="w-[90%] h-[15vh] pt-[5%] ml-[10%] bg-dark1 max-[680px]:pt-[3rem]"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.4 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="flex justify-center items-center">
        <div className="w-[40%] h-[2px] bg-line max-[680px]:w-[10%]"></div>
        <div className="w-[60%] max-[680px]:w-[90%]">
          <a href={`mailto: ${Data.user.email}`} className="no-underline text-font1 ml-4 font-mono">
            {Data.user.email}
          </a>
        </div>
      </div>
      <div className="w-full text-center my-[2%]">
        <p className="text-[.95rem] opacity-30 font-light">
          All Rights Reserved © {year} | {" "}
          <a href={Data.user.github}>vivek09thakur</a>
        </p>
      </div>
    </motion.div>
  );
};

export default Footer;
