import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import AnimatedText from './AnimatedText';
import { ArrowUpRight } from 'lucide-react';
import { projects } from '@/lib/projects';

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
      {/* Background Number */}
      <motion.div
        style={{ x: backgroundX }}
        className="absolute right-0 top-20 text-[20rem] font-display font-bold text-foreground/[0.02] pointer-events-none select-none"
      >
        02
      </motion.div>

      <div className="container mx-auto relative z-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-24">
          <div className="max-w-2xl mb-8 md:mb-0">
            <AnimatedText>
              <p className="text-primary uppercase tracking-[0.3em] text-sm mb-6 flex items-center gap-3">
                <span className="w-8 h-[1px] bg-primary" />
                Featured Work
              </p>
            </AnimatedText>

            <AnimatedText delay={0.1}>
              <h2 className="section-title">
                Crafting digital{' '}
                <span className="font-display italic text-muted-foreground underline decoration-primary/30 underline-offset-8">experiences</span>
              </h2>
            </AnimatedText>
          </div>

          <AnimatedText delay={0.2}>
            <div className="flex flex-col items-end">
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

        {/* Projects Grid - 2026 Style */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-24">
          {projects.map((project, index) => {
            const isFullWidth = index % 3 === 0;
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: index * 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className={`${isFullWidth ? 'lg:col-span-12' : 'lg:col-span-6'} group`}
              >
                <Link
                  to={`/projects/${project.id}`}
                  className="relative overflow-hidden rounded-[2.5rem] bg-secondary/20 border border-border/50 group-hover:border-primary/30 transition-all duration-500 block"
                >
                  {/* Image Container */}
                  <div className={`${isFullWidth ? 'aspect-[16/9] lg:aspect-[21/9]' : 'aspect-[4/3] lg:aspect-[16/11]'} relative overflow-hidden`}>
                    <motion.img
                      src={project.thumbnail}
                      alt={project.title}
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                      className="w-full h-full object-cover filter grayscale-[40%] group-hover:grayscale-0 transition-all duration-700"
                    />

                    {/* Glass Card Overlay */}
                    <div className="absolute inset-x-6 bottom-6 md:inset-x-10 md:bottom-10">
                      <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="p-6 md:p-10 rounded-[2rem] bg-card/40 backdrop-blur-2xl border border-white/10 shadow-2xl overflow-hidden group/card"
                      >
                        <div className="relative z-10">
                          <div className="flex justify-between items-start mb-4 md:mb-6">
                            <div>
                              <p className="text-[10px] md:text-xs font-bold text-primary uppercase tracking-[0.2em] mb-1 md:mb-2">
                                {project.subtitle}
                              </p>
                              <h3 className="text-2xl md:text-4xl font-display font-bold">
                                {project.title}
                              </h3>
                            </div>
                            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/20 flex items-center justify-center group-hover/card:bg-primary group-hover/card:border-primary transition-all duration-500 shadow-xl">
                              <ArrowUpRight className="w-5 h-5 md:w-6 md:h-6 group-hover/card:text-black transition-colors" />
                            </div>
                          </div>

                          <p className="text-muted-foreground text-xs md:text-base leading-relaxed max-w-xl mb-6 md:mb-8 line-clamp-2">
                            {project.description}
                          </p>

                          <div className="flex flex-wrap gap-2">
                            {project.tags.slice(0, 3).map((tag) => (
                              <span key={tag} className="text-[9px] md:text-[10px] font-bold px-3 py-1 rounded-full bg-white/5 border border-white/5 uppercase tracking-wider">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Interactive Background Gradient for Card */}
                        <div className="absolute -inset-10 bg-gradient-to-br from-primary/20 via-transparent to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-1000" />
                      </motion.div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
