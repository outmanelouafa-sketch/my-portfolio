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

  const imageY = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const textX = useTransform(scrollYProgress, [0, 1], [-50, 50]);

  return (
    <section
      ref={containerRef}
      id="about"
      className="section-padding relative overflow-hidden"
    >
      {/* Background Number */}
      <motion.div
        style={{ x: textX }}
        className="absolute -left-20 top-1/2 -translate-y-1/2 text-[20rem] font-display font-bold text-foreground/[0.02] pointer-events-none select-none"
      >
        01
      </motion.div>

      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Image Column */}
          <motion.div
            style={{ y: imageY }}
            className="relative order-2 lg:order-1"
          >
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent z-10" />
              <img
                src={portfolioData.about.portraitImage}
                alt="Developer portrait"
                className="w-full h-full object-cover"
              />

              {/* Floating Stats Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="absolute bottom-8 -right-8 md:right-8 glass rounded-2xl p-6 z-20"
              >
                <div className="flex items-center gap-6">
                  <div>
                    <span className="text-4xl font-display font-bold text-primary">{portfolioData.personal.experienceYears}</span>
                    <p className="text-sm text-muted-foreground mt-1">Years Exp.</p>
                  </div>
                  <div className="w-px h-12 bg-border" />
                  <div>
                    <span className="text-4xl font-display font-bold">{portfolioData.personal.projectsCompleted}</span>
                    <p className="text-sm text-muted-foreground mt-1">Projects</p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Decorative Elements */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="absolute -top-8 -left-8 w-24 h-24 border border-border/50 rounded-full hidden lg:block"
            />
          </motion.div>

          {/* Content Column */}
          <div className="order-1 lg:order-2">
            <AnimatedText>
              <p className="text-primary uppercase tracking-[0.3em] text-sm mb-6 flex items-center gap-3">
                <span className="w-8 h-[1px] bg-primary" />
                About Me
              </p>
            </AnimatedText>

            <AnimatedText delay={0.1}>
              <h2 className="section-title mb-8">
                I'm {portfolioData.personal.firstName}, a{' '}
                <span className="font-display italic text-muted-foreground">passionate</span>{' '}
                developer based in {portfolioData.personal.location}
              </h2>
            </AnimatedText>

            <AnimatedText delay={0.2}>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                {portfolioData.about.description1}
              </p>
            </AnimatedText>

            <AnimatedText delay={0.3}>
              <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                {portfolioData.about.description2}
              </p>
            </AnimatedText>

            <AnimatedText delay={0.4}>
              <div className="flex flex-wrap gap-4">
                <a href="#contact" className="btn-primary">
                  Let's Talk
                </a>
                <a href="#" className="btn-outline flex items-center gap-2">
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
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
