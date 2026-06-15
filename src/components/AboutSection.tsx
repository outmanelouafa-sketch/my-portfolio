import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import AnimatedText from './AnimatedText';
import portfolioData from '../data/portfolio.json';

const AboutSection = () => {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const textX = useTransform(scrollYProgress, [0, 1], [-50, 50]);

  return (
    <section
      ref={containerRef}
      id="about"
      className="section-padding relative overflow-hidden"
    >
      <motion.div
        style={{ x: textX }}
        className="absolute -left-20 top-1/2 -translate-y-1/2 text-[8rem] sm:text-[12rem] lg:text-[20rem] font-display font-bold text-foreground/[0.02] pointer-events-none select-none"
      >
        01
      </motion.div>

      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          <div>
            <AnimatedText>
              <p className="text-primary uppercase tracking-[0.2em] sm:tracking-[0.3em] text-xs sm:text-sm mb-4 sm:mb-6 flex items-center gap-3">
                <span className="w-6 sm:w-8 h-[1px] bg-primary" />
                About Me
              </p>
            </AnimatedText>

            <AnimatedText delay={0.1}>
              <h2 className="section-title mb-6 sm:mb-8">
                I'm {portfolioData.personal.firstName}, a{' '}
                <span className="font-display italic text-muted-foreground">passionate</span>{' '}
                developer based in {portfolioData.personal.location}
              </h2>
            </AnimatedText>

            <AnimatedText delay={0.2}>
              <p className="text-muted-foreground text-base sm:text-lg leading-relaxed mb-4 sm:mb-6">
                {portfolioData.about.description1}
              </p>
            </AnimatedText>

            <AnimatedText delay={0.3}>
              <p className="text-muted-foreground text-base sm:text-lg leading-relaxed mb-8">
                {portfolioData.about.description2}
              </p>
            </AnimatedText>

            <AnimatedText delay={0.4}>
              <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
                <a href="#contact" className="btn-primary text-center">
                  Let's Talk
                </a>
                <a href="#" className="btn-outline flex items-center justify-center gap-2">
                  Download CV
                  <motion.span
                    animate={{ y: [0, 3, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    ↓
                  </motion.span>
                </a>
              </div>
            </AnimatedText>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="rounded-2xl sm:rounded-3xl border border-border/50 bg-secondary/30 p-8 sm:p-10 lg:p-12">
              <p className="text-primary uppercase tracking-[0.3em] text-xs mb-8">At a Glance</p>

              <div className="grid grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-10">
                <div>
                  <span className="text-4xl sm:text-5xl font-display font-bold text-primary">
                    {portfolioData.personal.experienceYears}
                  </span>
                  <p className="text-sm text-muted-foreground mt-2">Years Experience</p>
                </div>
                <div>
                  <span className="text-4xl sm:text-5xl font-display font-bold">
                    {portfolioData.personal.projectsCompleted}
                  </span>
                  <p className="text-sm text-muted-foreground mt-2">Projects Done</p>
                </div>
              </div>

              <div className="space-y-4 pt-6 sm:pt-8 border-t border-border/50">
                <div>
                  <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">Role</p>
                  <p className="text-sm sm:text-base font-medium">{portfolioData.personal.role}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">Location</p>
                  <p className="text-sm sm:text-base font-medium">{portfolioData.personal.location}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">Focus</p>
                  <p className="text-sm sm:text-base font-medium">Mobile & Web Development</p>
                </div>
              </div>
            </div>

            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="absolute -top-6 -right-6 w-20 h-20 sm:w-24 sm:h-24 border border-border/50 rounded-full hidden sm:block"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
