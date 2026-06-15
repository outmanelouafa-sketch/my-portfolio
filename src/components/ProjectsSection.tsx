import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import AnimatedText from './AnimatedText';
import { ArrowUpRight, Mail } from 'lucide-react';
import { projects } from '@/lib/projects';
import portfolioData from '@/data/portfolio.json';

const ProjectsSection = () => {
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const backgroundX = useTransform(scrollYProgress, [0, 1], [-100, 100]);

  return (
    <section
      ref={containerRef}
      id="projects"
      className="section-padding relative overflow-hidden"
    >
      <motion.div
        style={{ x: backgroundX }}
        className="absolute right-0 top-20 text-[8rem] sm:text-[12rem] lg:text-[20rem] font-display font-bold text-foreground/[0.02] pointer-events-none select-none"
      >
        02
      </motion.div>

      <div className="container mx-auto relative z-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 sm:mb-16 lg:mb-24">
          <div className="max-w-2xl">
            <AnimatedText>
              <p className="text-primary uppercase tracking-[0.2em] sm:tracking-[0.3em] text-xs sm:text-sm mb-4 sm:mb-6 flex items-center gap-3">
                <span className="w-6 sm:w-8 h-[1px] bg-primary" />
                Featured Work
              </p>
            </AnimatedText>

            <AnimatedText delay={0.1}>
              <h2 className="section-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
                Crafting digital{' '}
                <span className="font-display italic text-muted-foreground underline decoration-primary/30 underline-offset-4 sm:underline-offset-8">experiences</span>
              </h2>
            </AnimatedText>
          </div>

          <AnimatedText delay={0.2}>
            <div className="flex flex-col items-start md:items-end">
              <span className="text-xs text-muted-foreground uppercase tracking-widest mb-2 opacity-50">Discovery</span>
              <Link
                to="/projects"
                className="group flex items-center gap-3 text-sm font-bold hover:text-primary transition-colors duration-300"
              >
                View Archive <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </Link>
            </div>
          </AnimatedText>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-24">
          {projects.map((project, index) => {
            const isFullWidth = index % 3 === 0;
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className={`${isFullWidth ? 'lg:col-span-12' : 'lg:col-span-6'} group`}
              >
                <Link
                  to={`/projects/${project.id}`}
                  className="block relative overflow-hidden rounded-2xl sm:rounded-[2.5rem] bg-secondary/20 border border-border/50 group-hover:border-primary/30 transition-all duration-500"
                >
                  <div
                    className={`relative overflow-hidden ${
                      isFullWidth
                        ? 'aspect-[16/10] sm:aspect-[16/9] lg:aspect-[21/9]'
                        : 'aspect-[16/10] sm:aspect-[4/3] lg:aspect-[16/11]'
                    }`}
                  >
                    <motion.img
                      src={project.thumbnail}
                      alt={project.title}
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                      className="w-full h-full object-cover filter grayscale-[40%] group-hover:grayscale-0 transition-all duration-700"
                    />

                    {/* Desktop overlay card */}
                    <div className="absolute inset-x-4 bottom-4 sm:inset-x-6 sm:bottom-6 md:inset-x-10 md:bottom-10 hidden md:block">
                      <div className="p-6 lg:p-10 rounded-[1.5rem] lg:rounded-[2rem] bg-card/40 backdrop-blur-2xl border border-white/10 shadow-2xl overflow-hidden">
                        <div className="flex justify-between items-start mb-4 lg:mb-6">
                          <div>
                            <p className="text-xs font-bold text-primary uppercase tracking-[0.2em] mb-2">
                              {project.subtitle}
                            </p>
                            <h3 className="text-2xl lg:text-4xl font-display font-bold">
                              {project.title}
                            </h3>
                          </div>
                          <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-all duration-500 shadow-xl flex-shrink-0">
                            <ArrowUpRight className="w-5 h-5 lg:w-6 lg:h-6 group-hover:text-black transition-colors" />
                          </div>
                        </div>

                        <p className="text-muted-foreground text-sm lg:text-base leading-relaxed max-w-xl mb-4 lg:mb-8 line-clamp-2">
                          {project.description}
                        </p>

                        <div className="flex flex-wrap gap-2">
                          {project.tags.slice(0, 3).map((tag) => (
                            <span key={tag} className="text-[10px] font-bold px-3 py-1 rounded-full bg-white/5 border border-white/5 uppercase tracking-wider">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Mobile / tablet card below image */}
                  <div className="p-5 sm:p-6 md:hidden">
                    <div className="flex justify-between items-start gap-3 mb-3">
                      <div className="min-w-0">
                        <p className="text-[10px] font-bold text-primary uppercase tracking-[0.2em] mb-1">
                          {project.subtitle}
                        </p>
                        <h3 className="text-xl sm:text-2xl font-display font-bold leading-tight">
                          {project.title}
                        </h3>
                      </div>
                      <div className="w-9 h-9 rounded-full border border-border/50 flex items-center justify-center flex-shrink-0">
                        <ArrowUpRight className="w-4 h-4" />
                      </div>
                    </div>

                    <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-2">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="text-[9px] font-bold px-2.5 py-1 rounded-full bg-secondary border border-border/50 uppercase tracking-wider">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-12 sm:mt-16 lg:mt-20"
        >
          <div className="rounded-2xl sm:rounded-3xl border border-border/50 bg-secondary/30 p-6 sm:p-8 md:p-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="max-w-xl">
              <p className="text-primary uppercase tracking-[0.2em] text-xs mb-3">More Projects</p>
              <h3 className="text-xl sm:text-2xl font-display font-bold mb-2">
                Want to see more work?
              </h3>
              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                Many of my projects are private or under NDA. Reach out by email and I'll share relevant case studies with you.
              </p>
            </div>
            <a
              href={`mailto:${portfolioData.personal.email}?subject=Portfolio%20-%20More%20Projects`}
              className="btn-primary inline-flex items-center justify-center gap-2 flex-shrink-0"
            >
              <Mail className="w-4 h-4" />
              {portfolioData.personal.email}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;
