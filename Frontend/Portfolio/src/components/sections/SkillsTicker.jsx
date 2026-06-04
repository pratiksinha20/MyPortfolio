import {
  FaPython,
  FaJava,
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
  FaGitAlt,
  FaGithub,
  FaGitlab,
  FaAws,
  FaLinux,
  FaUbuntu,
  FaRedhat,
  FaDocker,
  FaChartBar
} from 'react-icons/fa';
import {
  SiC,
  SiCplusplus,
  SiR,
  SiTailwindcss,
  SiVite,
  SiMysql,
  SiPostgresql,
  SiSupabase,
  SiMongodb,
  SiPostman,
  SiRedis,
  SiVercel,
  SiNetlify,
  SiGreensock
} from 'react-icons/si';

const skillsList = [
  { name: 'C', Icon: SiC, color: '#A8B9CC' },
  { name: 'C++', Icon: SiCplusplus, color: '#00599C' },
  { name: 'Python', Icon: FaPython, color: '#3776AB' },
  { name: 'R', Icon: SiR, color: '#276FDB' },
  { name: 'Java', Icon: FaJava, color: '#5382A1' },
  { name: 'HTML5', Icon: FaHtml5, color: '#E34F26' },
  { name: 'CSS3', Icon: FaCss3Alt, color: '#1572B6' },
  { name: 'TailwindCSS', Icon: SiTailwindcss, color: '#06B6D4' },
  { name: 'JavaScript', Icon: FaJs, color: '#F7DF1E' },
  { name: 'React', Icon: FaReact, color: '#61DAFB' },
  { name: 'Vite', Icon: SiVite, color: '#646CFF' },
  { name: 'MySQL', Icon: SiMysql, color: '#4479A1' },
  { name: 'PostgreSQL', Icon: SiPostgresql, color: '#4169E1' },
  { name: 'Supabase', Icon: SiSupabase, color: '#3ECF8E' },
  { name: 'MongoDB', Icon: SiMongodb, color: '#47A248' },
  { name: 'Git', Icon: FaGitAlt, color: '#F05032' },
  { name: 'GitHub', Icon: FaGithub, color: 'var(--text-primary)' },
  { name: 'GitLab', Icon: FaGitlab, color: '#FC6D26' },
  { name: 'Postman', Icon: SiPostman, color: '#FF6C37' },
  { name: 'AWS', Icon: FaAws, color: '#FF9900' },
  { name: 'Linux', Icon: FaLinux, color: '#FCC624' },
  { name: 'Ubuntu', Icon: FaUbuntu, color: '#E95420' },
  { name: 'RedHat', Icon: FaRedhat, color: '#EE0000' },
  { name: 'Redis', Icon: SiRedis, color: '#DC382D' },
  { name: 'Docker', Icon: FaDocker, color: '#2496ED' },
  { name: 'Vercel', Icon: SiVercel, color: 'var(--text-primary)' },
  { name: 'Netlify', Icon: SiNetlify, color: '#00C853' },
  { name: 'GSAP', Icon: SiGreensock, color: '#88CE02' },
  { name: 'PowerBI', Icon: FaChartBar, color: '#F2C811' }
];

export default function SkillsTicker() {
  const extendedSkillsList = [...skillsList, ...skillsList, ...skillsList];

  return (
    <div className="skills-ticker-container my-6 py-2 select-none relative w-full overflow-hidden">
      <div className="absolute top-0 bottom-0 left-0 w-12 md:w-24" style={{ background: 'linear-gradient(to right, var(--bg-primary), transparent)', zIndex: 10, pointerEvents: 'none' }} />
      <div className="absolute top-0 bottom-0 right-0 w-12 md:w-24" style={{ background: 'linear-gradient(to left, var(--bg-primary), transparent)', zIndex: 10, pointerEvents: 'none' }} />

      <div className="skills-ticker-track flex items-center gap-10 md:gap-14 py-1">
        {extendedSkillsList.map((skill, index) => {
          const { Icon } = skill;
          return (
            <div
              key={index}
              className="flex-shrink-0 hover:scale-125 transition-transform duration-300 cursor-default"
              title={skill.name}
            >
              <Icon
                size={30}
                style={{ color: skill.color, opacity: 0.7 }}
                className="hover:opacity-100 transition-opacity duration-300"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
