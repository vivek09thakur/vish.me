import { m } from "framer-motion";
import { pop, scaleIn, squishTap, stagger, viewportOnce } from "../../motion";
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
    SiPython,
    SiGnubash,
    SiJavascript,
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
      <m.div
        className="w-[70%] mx-auto text-center max-[680px]:w-full"
        variants={stagger(0.03)}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
      >
        {STACK.map((Icon, index) => (
          <m.span
            key={index}
            className="inline-flex align-middle text-[3rem] m-[1%] text-font1 hover:text-btn transition-colors duration-300 max-[680px]:text-[1.25rem]"
            style={{
              background: "var(--card_background)",
              padding: ".8rem",
              borderRadius: ".8rem",
              border: "var(--border1)",
            }}
            variants={scaleIn}
            whileHover={{ scale: 1.35, rotate: -8, y: -4, transition: pop }}
            whileTap={squishTap}
          >
            <Icon />
          </m.span>
        ))}
      </m.div>
    </div>
  );
};

export default TechStack;
