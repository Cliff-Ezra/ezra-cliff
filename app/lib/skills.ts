/**
 * Skills — single source of truth for the /about "Tech Stack" section.
 *
 * Grouped into the categories shown on the about page, in display order. Each
 * skill carries its brand icon (react-icons) + brand color; Next.js uses the
 * theme ink token instead of its black brand color so it stays visible in both
 * light and dark themes.
 */

import type { IconType } from "react-icons";
import {
  SiJavascript,
  SiTypescript,
  SiPython,
  SiGo,
  SiPhp,
  SiKotlin,
  SiDart,
  SiGnubash,
  SiC,
  SiCplusplus,
  SiReact,
  SiVuedotjs,
  SiAngular,
  SiNextdotjs,
  SiHtml5,
  SiCss,
  SiFlutter,
  SiNodedotjs,
  SiLaravel,
  SiPostgresql,
  SiMysql,
  SiRedis,
  SiApachecouchdb,
  SiDigitalocean,
  SiDocker,
  SiKubernetes,
  SiLinux,
} from "react-icons/si";
import { FaAws } from "react-icons/fa6";

export type Skill = { name: string; icon: IconType; color: string };
export type SkillCategory = { label: string; skills: Skill[] };

export const skillCategories: SkillCategory[] = [
  {
    label: "Languages",
    skills: [
      { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
      { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
      { name: "Python", icon: SiPython, color: "#3776AB" },
      { name: "Go", icon: SiGo, color: "#00ADD8" },
      { name: "PHP", icon: SiPhp, color: "#777BB4" },
      { name: "Kotlin", icon: SiKotlin, color: "#7F52FF" },
      { name: "Dart", icon: SiDart, color: "#0175C2" },
      { name: "Bash", icon: SiGnubash, color: "#4EAA25" },
      { name: "C", icon: SiC, color: "#A8B9CC" },
      { name: "C++", icon: SiCplusplus, color: "#00599C" },
    ],
  },
  {
    label: "Frontend",
    skills: [
      { name: "React", icon: SiReact, color: "#61DAFB" },
      { name: "Vue.js", icon: SiVuedotjs, color: "#4FC08D" },
      { name: "Angular", icon: SiAngular, color: "#DD0031" },
      { name: "Next.js", icon: SiNextdotjs, color: "var(--color-ink)" },
      { name: "HTML5", icon: SiHtml5, color: "#E34F26" },
      { name: "CSS3", icon: SiCss, color: "#1572B6" },
    ],
  },
  {
    label: "Mobile",
    skills: [
      { name: "React Native", icon: SiReact, color: "#61DAFB" },
      { name: "Flutter", icon: SiFlutter, color: "#02569B" },
    ],
  },
  {
    label: "Backend & Frameworks",
    skills: [
      { name: "Node.js", icon: SiNodedotjs, color: "#5FA04E" },
      { name: "Laravel", icon: SiLaravel, color: "#FF2D20" },
    ],
  },
  {
    label: "Databases",
    skills: [
      { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
      { name: "MySQL", icon: SiMysql, color: "#4479A1" },
      { name: "Redis", icon: SiRedis, color: "#FF4438" },
      { name: "CouchDB", icon: SiApachecouchdb, color: "#E42528" },
    ],
  },
  {
    label: "Cloud & DevOps",
    skills: [
      { name: "AWS", icon: FaAws, color: "#FF9900" },
      { name: "DigitalOcean", icon: SiDigitalocean, color: "#0080FF" },
      { name: "Docker", icon: SiDocker, color: "#2496ED" },
      { name: "Kubernetes", icon: SiKubernetes, color: "#326CE5" },
      { name: "Linux", icon: SiLinux, color: "#FCC624" },
    ],
  },
];
