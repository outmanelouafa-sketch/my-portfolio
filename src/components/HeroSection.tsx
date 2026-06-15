import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import AnimatedText from './AnimatedText';
import { ArrowDown, X, ExternalLink, ChevronRight } from 'lucide-react';
import portfolioData from '../data/portfolio.json';

const HeroSection = () => {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const categoryKeys = Object.keys(portfolioData.categories) as Array<keyof typeof portfolioData.categories>;

  const skills = portfolioData.skills;

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Diagonal Stripes */}
        <motion.div
          style={{ y, opacity }}
          className="absolute top-0 right-[20%] w-[300px] h-[200%] bg-foreground/[0.03] transform -rotate-[35deg] origin-top"
        />
        <motion.div
          style={{ y: useTransform(scrollYProgress, [0, 1], [0, 150]) }}
          className="absolute top-[-20%] right-[10%] w-[200px] h-[200%] bg-foreground/[0.02] transform -rotate-[35deg] origin-top"
        />

        {/* Floating Words on Stripes */}
        <motion.div
          style={{ y: useTransform(scrollYProgress, [0, 1], [0, 300]) }}
          className="absolute top-[20%] right-[18%] transform -rotate-[35deg]"
        >
          <div className="flex flex-col gap-20 text-sm font-medium text-muted-foreground/60">
            {skills.map((skill, i) => (
              <motion.span
                key={skill}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1 + i * 0.1 }}
                className="flex items-center gap-3"
              >
                <span className="w-2 h-2 rounded-full bg-primary" />
                {skill.toUpperCase()}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Floating Labels - Left Side */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="floating-label left-4 top-1/2 -translate-y-1/2 z-30"
      >
        <div className="flex flex-col gap-12">
          {categoryKeys.map((key) => (
            <motion.button
              key={key}
              whileHover={{ x: 10, color: 'var(--primary)' }}
              onClick={() => setActiveCategory(key)}
              className="text-left text-xs uppercase tracking-[0.3em] vertical-text font-medium transition-colors duration-300"
            >
              {portfolioData.categories[key].title}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Rotating Badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8, type: "spring" }}
        className="absolute top-32 left-20 hidden lg:block"
      >
        <div className="relative w-28 h-28">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 border-2 border-foreground/10 rounded-full"
          />
          <motion.svg
            animate={{ rotate: 360 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 100 100"
          >
            <defs>
              <path
                id="circlePath"
                d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
              />
            </defs>
            <text fontSize="8" fill="currentColor" className="text-muted-foreground uppercase tracking-[0.3em]">
              <textPath href="#circlePath">
                {portfolioData.personal.name} • Creative Coder •
              </textPath>
            </text>
          </motion.svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xl font-display font-bold">{portfolioData.personal.name.charAt(0)}</span>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <motion.div style={{ y: textY, scale, opacity }} className="container mx-auto px-6 md:px-12 lg:px-20 relative z-10">
        <div className="max-w-5xl">
          {/* Tagline */}
          <AnimatedText delay={0.2}>
            <p className="text-muted-foreground text-lg md:text-xl mb-6 flex items-center gap-3">
              <span className="w-12 h-[1px] bg-primary" />
              {portfolioData.personal.role}
            </p>
          </AnimatedText>

          {/* Main Heading */}
          <h1 className="hero-title mb-8">
            <AnimatedText delay={0.3}>
              <span className="block">Code<span className="text-primary">.</span></span>
            </AnimatedText>
            <AnimatedText delay={0.4}>
              <span className="block hero-title-accent">Design.</span>
            </AnimatedText>
            <AnimatedText delay={0.5}>
              <span className="block">Build<span className="text-primary">.</span></span>
            </AnimatedText>
            <AnimatedText delay={0.6}>
              <span className="block text-muted-foreground/50 text-4xl md:text-5xl lg:text-6xl mt-4">
                & Much More
              </span>
            </AnimatedText>
          </h1>

          {/* CTA Buttons */}
          <AnimatedText delay={0.8}>
            <div className="flex flex-wrap gap-4 mt-12">
              <a href="#projects" className="btn-primary flex items-center gap-2">
                View Projects
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.span>
              </a>
              <a href="#contact" className="btn-outline">
                Contact Me
              </a>
            </div>
          </AnimatedText>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
      >
        <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ArrowDown className="w-5 h-5 text-primary" />
        </motion.div>
      </motion.div>

      {/* Video Button - Bottom Right */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-12 right-12 hidden md:block"
      >
        <motion.div
          whileHover={{ scale: 1.1 }}
          className="relative w-20 h-20 cursor-pointer group"
        >
          <div className="absolute inset-0 rounded-full border border-foreground/20 group-hover:border-primary transition-colors duration-300" />
          <motion.svg
            animate={{ rotate: -360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 100 100"
          >
            <defs>
              <path
                id="watchPath"
                d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0"
              />
            </defs>
            <text fontSize="9" fill="currentColor" className="text-muted-foreground uppercase tracking-widest">
              <textPath href="#watchPath">
                Watch Video • Watch Video •
              </textPath>
            </text>
          </motion.svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-0 h-0 border-t-[6px] border-t-transparent border-l-[10px] border-l-primary border-b-[6px] border-b-transparent ml-1" />
          </div>
        </motion.div>
      </motion.div>

      {/* Detail Overlay */}
      <AnimatePresence>
        {activeCategory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-background/95 backdrop-blur-xl"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="w-full max-w-2xl bg-secondary/50 border border-border/50 rounded-3xl p-8 md:p-12 relative overflow-hidden group"
            >
              {/* Background Accent */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />

              <button
                onClick={() => setActiveCategory(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-background/50 hover:bg-primary hover:text-primary-foreground transition-all duration-300"
              >
                <X size={20} />
              </button>

              <div className="relative z-10">
                <span className="text-primary uppercase tracking-[0.3em] text-xs mb-6 block">
                  {portfolioData.categories[activeCategory as keyof typeof portfolioData.categories].projects_count}
                </span>

                <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 capitalize">
                  {portfolioData.categories[activeCategory as keyof typeof portfolioData.categories].title.toLowerCase()}
                </h2>

                <p className="text-xl text-foreground/80 leading-relaxed mb-6 font-medium italic">
                  {portfolioData.categories[activeCategory as keyof typeof portfolioData.categories].description}
                </p>

                <p className="text-muted-foreground leading-relaxed mb-10 text-lg">
                  {portfolioData.categories[activeCategory as keyof typeof portfolioData.categories].details}
                </p>

                <div className="flex flex-wrap gap-4">
                  <a
                    href="#projects"
                    onClick={() => setActiveCategory(null)}
                    className="btn-primary flex items-center gap-2"
                  >
                    Explore More <ExternalLink size={18} />
                  </a>
                  <button
                    onClick={() => setActiveCategory(null)}
                    className="btn-outline flex items-center gap-2"
                  >
                    Close <ChevronRight size={18} className="rotate-90 md:rotate-0" />
                  </button>
                </div>
              </div>

              {/* Decorative Number */}
              <div className="absolute bottom-[-20%] right-[-5%] text-[15rem] font-bold text-foreground/[0.03] select-none pointer-events-none uppercase">
                {activeCategory.charAt(0)}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default HeroSection;
