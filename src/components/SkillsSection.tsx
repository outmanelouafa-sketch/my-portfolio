import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import AnimatedText from './AnimatedText';

const skills = [
  { name: 'Flutter', level: 95, category: 'Mobile' },
  { name: 'Kotlin', level: 85, category: 'Mobile' },
  { name: 'React', level: 90, category: 'Frontend' },
  { name: 'TypeScript', level: 88, category: 'Frontend' },
  { name: 'Laravel', level: 82, category: 'Backend' },
  { name: 'Node.js', level: 85, category: 'Backend' },
  { name: 'Firebase', level: 90, category: 'Backend' },
  { name: 'PostgreSQL', level: 80, category: 'Database' },
  { name: 'Figma', level: 75, category: 'Design' },
  { name: 'Docker', level: 78, category: 'DevOps' },
  { name: 'AWS', level: 72, category: 'DevOps' },
  { name: 'Git', level: 95, category: 'Tools' },
];

const SkillsSection = () => {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const x = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section 
      ref={containerRef} 
      id="skills" 
      className="section-padding relative overflow-hidden bg-card/30"
    >
      {/* Background Text */}
      <motion.div
        style={{ x }}
        className="absolute right-0 top-1/2 -translate-y-1/2 text-[12rem] font-display font-bold text-foreground/[0.02] pointer-events-none select-none whitespace-nowrap"
      >
        SKILLS & TECHNOLOGIES
      </motion.div>

      <div className="container mx-auto relative z-10">
        <div className="max-w-3xl mb-16">
          <AnimatedText>
            <p className="text-primary uppercase tracking-[0.3em] text-sm mb-6 flex items-center gap-3">
              <span className="w-8 h-[1px] bg-primary" />
              Skills & Tech
            </p>
          </AnimatedText>

          <AnimatedText delay={0.1}>
            <h2 className="section-title mb-6">
              Technologies I{' '}
              <span className="font-display italic text-muted-foreground">work</span>{' '}
              with
            </h2>
          </AnimatedText>

          <AnimatedText delay={0.2}>
            <p className="text-muted-foreground text-lg">
              From mobile apps to full-stack web solutions, I leverage modern technologies 
              to build scalable, performant, and user-friendly applications.
            </p>
          </AnimatedText>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.05, duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
              className="service-card cursor-pointer group"
            >
              <div className="flex flex-col">
                <span className="text-xs text-primary mb-2">{skill.category}</span>
                <span className="text-lg font-medium mb-3">{skill.name}</span>
                
                {/* Progress Bar */}
                <div className="h-1 bg-border rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + index * 0.05, duration: 1, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-primary to-orange-400 rounded-full"
                  />
                </div>
                <span className="text-xs text-muted-foreground mt-2">{skill.level}%</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Skills Tags */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-12 pt-12 border-t border-border/50"
        >
          <p className="text-sm text-muted-foreground mb-6">Also familiar with:</p>
          <div className="flex flex-wrap gap-3">
            {['GraphQL', 'Redux', 'Swift', 'MongoDB', 'Redis', 'Nginx', 'Jest', 'Cypress', 'Tailwind CSS', 'Next.js', 'Vue.js', 'Python'].map((skill, index) => (
              <motion.span
                key={skill}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 + index * 0.03 }}
                className="skill-badge"
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;
