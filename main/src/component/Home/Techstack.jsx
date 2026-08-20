import { motion } from "framer-motion";
import {
  SiPython,
  SiJavascript,
  SiGnubash,
  SiHtml5,
  SiCss3,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiBootstrap,
  SiNodedotjs,
  SiExpress,
  SiVercel,
  SiFigma,
  SiGit,
  SiGithub,
  SiGithubactions,
  SiGitlab,
  SiJenkins,
  SiDocker,
  SiKubernetes,
  SiHelm,
  SiTerraform,
  SiAnsible,
  SiApacheairflow,
  SiLinux,
  SiRedhat,
  SiNginx,
  SiVmware,
  SiPrometheus,
  SiGrafana,
  SiOpenstack,
  SiVisualstudiocode,
} from "react-icons/si";

const TechStack = () => {
  const STACK = [
    // Languages & scripting
    SiPython,
    SiGnubash,
    SiJavascript,
    // Frontend
    SiHtml5,
    SiCss3,
    SiReact,
    SiNextdotjs,
    SiTailwindcss,
    SiBootstrap,
    SiNodedotjs,
    SiExpress,
    SiVercel,
    SiFigma,
    // Version control & CI/CD
    SiGit,
    SiGithub,
    SiGithubactions,
    SiGitlab,
    SiJenkins,
    // Containers & orchestration
    SiDocker,
    SiKubernetes,
    SiHelm,
    // Infrastructure as code & config management
    SiTerraform,
    SiAnsible,
    // Data / workflow orchestration
    SiApacheairflow,
    // OS & infrastructure
    SiLinux,
    SiRedhat,
    SiNginx,
    SiVmware,
    // Observability
    SiPrometheus,
    SiGrafana,
    // Private cloud
    SiOpenstack,
    // Editor
    SiVisualstudiocode,
  ];
  return (
    <div className="w-full h-full my-[5%] mx-auto">
      <div>
        <h2
          className="text-[2.5rem] font-normal p-4 text-center mb-[3%] max-[680px]:text-[2rem] max-[680px]:mt-[25%] max-[680px]:mb-[10%]"
          style={{ textTransform: "capitalize" }}
        >
          Languages <span style={{ color: "var(--btn_color)" }}> and </span>
          Tools 📐
        </h2>
      </div>
      <motion.div
        className="w-[70%] mx-auto text-center max-[680px]:w-full"
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.035 } } }}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.2 }}
      >
        {STACK.map((Icon, index) => (
          <motion.span
            key={index}
            className="inline-flex align-middle text-[3rem] m-[1%] text-font1 hover:text-btn transition-colors duration-300 max-[680px]:text-[1.25rem]"
            style={{
              background: "var(--card_background)",
              padding: ".8rem",
              borderRadius: ".8rem",
              border: "var(--border1)",
            }}
            variants={{ hidden: { opacity: 0, scale: 0.4 }, show: { opacity: 1, scale: 1 } }}
            whileHover={{ scale: 1.3 }}
            transition={{ type: "spring", stiffness: 300, damping: 18 }}
          >
            <Icon />
          </motion.span>
        ))}
      </motion.div>
    </div>
  );
};

export default TechStack;
