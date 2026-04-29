import HeroSection from "@/components/HeroSection";
import SkillsSection from "@/components/SkillsSection";
import ExperienceSection from "@/components/ExperienceSection";
import ProjectsSection from "@/components/ProjectsSection";
import AchievementsSection from "@/components/AchievementsSection";
import ContactSection from "@/components/ContactSection";
import { SectionDivider } from "@/components/ScrollReveal";

export default function Home() {
  return (
    <>
      <main>
        <HeroSection />
        <SectionDivider label="SKILL_DECK" />
        <SkillsSection />
        <SectionDivider label="QUEST_LOG" />
        <ExperienceSection />
        <SectionDivider label="PROJECTS" />
        <ProjectsSection />
        <SectionDivider label="ACHIEVEMENTS" />
        <AchievementsSection />
        <SectionDivider label="CONTACT" />
        <ContactSection />
      </main>
    </>
  );
}
