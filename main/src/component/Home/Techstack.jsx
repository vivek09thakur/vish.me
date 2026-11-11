import { m } from "framer-motion";
import PropTypes from "prop-types";
import SectionHeading from "../ui/SectionHeading";
import { fadeUp, stagger, viewportOnce } from "../../motion";
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

const GROUPS = [
  {
    title: "Code and web",
    color: "#c6f26e",
    items: [
      ["Python", SiPython],
      ["Bash", SiGnubash],
      ["JavaScript", SiJavascript],
      ["HTML5", SiHtml5],
      ["CSS3", SiCss3],
      ["React", SiReact],
      ["Next.js", SiNextdotjs],
      ["Tailwind CSS", SiTailwindcss],
      ["Bootstrap", SiBootstrap],
      ["Node.js", SiNodedotjs],
      ["Express", SiExpress],
      ["Vercel", SiVercel],
      ["Figma", SiFigma],
      ["VS Code", SiVisualstudiocode],
    ],
  },
  {
    title: "Ship and automate",
    color: "#9b6bff",
    items: [
      ["Git", SiGit],
      ["GitHub", SiGithub],
      ["GitHub Actions", SiGithubactions],
      ["GitLab", SiGitlab],
      ["Jenkins", SiJenkins],
      ["Docker", SiDocker],
      ["Kubernetes", SiKubernetes],
      ["Helm", SiHelm],
      ["Terraform", SiTerraform],
      ["Ansible", SiAnsible],
      ["Apache Airflow", SiApacheairflow],
    ],
  },
  {
    title: "Run and observe",
    color: "#5b8def",
    items: [
      ["Linux", SiLinux],
      ["Red Hat", SiRedhat],
      ["Nginx", SiNginx],
      ["VMware", SiVmware],
      ["OpenStack", SiOpenstack],
      ["Prometheus", SiPrometheus],
      ["Grafana", SiGrafana],
    ],
  },
];

const Tool = ({ name, Icon, color }) => (
  <m.li className="group relative" variants={fadeUp} style={{ "--tool": color }}>
    <span
      className="flex rounded-2xl border border-line/30 bg-card p-3 text-[2.75rem] text-font1 transition-[color,transform] duration-500 ease-bounce group-hover:-translate-y-1 group-hover:-rotate-6 group-hover:scale-125 group-hover:text-[var(--tool)] active:scale-95 max-[1000px]:text-[2.5rem] max-[680px]:p-2.5 max-[680px]:text-[1.75rem]"
      aria-hidden="true"
    >
      <Icon />
    </span>
    <span className="sr-only">{name}</span>
    <span
      aria-hidden="true"
      className="pointer-events-none absolute left-1/2 top-full z-10 mt-3 -translate-x-1/2 translate-y-1 whitespace-nowrap rounded-md px-2 py-0.5 text-xs font-semibold text-dark1 opacity-0 transition-[opacity,transform] duration-200 group-hover:translate-y-0 group-hover:opacity-100"
      style={{ background: color }}
    >
      {name}
    </span>
  </m.li>
);

Tool.propTypes = {
  name: PropTypes.string.isRequired,
  Icon: PropTypes.elementType.isRequired,
  color: PropTypes.string.isRequired,
};

const TechStack = () => (
  <div className="w-full mt-28 mb-20 mx-auto max-[680px]:mt-20 max-[680px]:mb-14">
    <SectionHeading align="center" className="mb-14 max-[680px]:mb-8">
      Languages <span className="text-btn">and</span> Tools
    </SectionHeading>

    <div className="mx-auto flex w-[80%] max-w-[1000px] flex-col gap-10 max-[680px]:w-full max-[680px]:gap-7">
      {GROUPS.map(({ title, color, items }) => (
        <m.section
          key={title}
          variants={stagger(0.03)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
        >
          <m.h3 className="m-0 mb-5 flex items-center gap-4 text-base font-medium opacity-80" variants={fadeUp}>
            <span className="h-px flex-1 bg-line/20 max-[680px]:hidden" />
            <span className="inline-flex items-center gap-2.5">
              <span className="h-2.5 w-2.5 rounded-full" style={{ background: color }} />
              {title}
            </span>
            <span className="h-px flex-1 bg-line/20" />
          </m.h3>
          <ul className="m-0 flex list-none flex-wrap justify-center gap-3 p-0 max-[680px]:gap-2 max-[680px]:justify-start">
            {items.map(([name, Icon]) => (
              <Tool key={name} name={name} Icon={Icon} color={color} />
            ))}
          </ul>
        </m.section>
      ))}
    </div>
  </div>
);

export default TechStack;
