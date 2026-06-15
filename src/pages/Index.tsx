import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import MarqueeStrip from '@/components/MarqueeStrip';
import AboutSection from '@/components/AboutSection';
import SkillsSection from '@/components/SkillsSection';
import ProjectsSection from '@/components/ProjectsSection';
import ServicesSection from '@/components/ServicesSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import ScrollProgress from '@/components/ScrollProgress';
import CustomCursor from '@/components/CustomCursor';

const marqueeItems = [
  'Mobile Development',
  'Web Applications',
  'UI/UX Design',
  'Flutter',
  'React',
  'TypeScript',
  'Firebase',
  'Node.js',
];

const Index = () => {
  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <CustomCursor />
      <ScrollProgress />
      <Header />
      <HeroSection />
      <MarqueeStrip items={marqueeItems} className="border-y border-border/50" />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <MarqueeStrip items={marqueeItems} direction="right" className="border-y border-border/50" />
      <ServicesSection />
      <ContactSection />
      <Footer />
    </main>
  );
};

export default Index;
