import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight, Sparkles, Mail } from 'lucide-react';
import { projects } from '@/lib/projects';
import portfolioData from '@/data/portfolio.json';

const ProjectsArchive = () => {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute bottom-0 -left-40 w-[400px] h-[400px] rounded-full bg-primary/3 blur-[100px]" />
      </div>

      <header className="sticky top-0 z-40 glass border-b border-border/50">
        <div className="container mx-auto px-6 md:px-12 lg:px-20 py-5 flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
          <span className="text-xl font-display font-medium tracking-tight">
            {portfolioData.personal.firstName.toLowerCase()}
            <span className="text-primary">.</span>dev
          </span>
        </div>
      </header>

      <section className="section-padding relative z-10">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-3xl mb-12 sm:mb-16 lg:mb-20"
          >
            <p className="text-primary uppercase tracking-[0.2em] sm:tracking-[0.3em] text-xs sm:text-sm mb-4 sm:mb-6 flex items-center gap-3">
              <span className="w-6 sm:w-8 h-[1px] bg-primary" />
              Project Archive
            </p>
            <h1 className="text-3xl sm:text-5xl md:text-7xl font-display font-bold mb-4 sm:mb-6 leading-[1.1]">
              All{' '}
              <span className="font-display italic text-muted-foreground">works</span>
            </h1>
            <p className="text-muted-foreground text-sm sm:text-lg leading-relaxed">
              A curated collection of mobile apps, web platforms, and digital products —
              each crafted with attention to design, performance, and user experience.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link
                  to={`/projects/${project.id}`}
                  className="group block relative overflow-hidden rounded-[2rem] bg-secondary/20 border border-border/50 hover:border-primary/30 transition-all duration-500"
                >
                  <div className="aspect-[4/3] relative overflow-hidden">
                    <motion.img
                      src={project.thumbnail}
                      alt={project.title}
                      whileHover={{ scale: 1.06 }}
                      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                      className="w-full h-full object-cover filter grayscale-[30%] group-hover:grayscale-0 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />

                    {project.id === 'exam-assistant' && (
                      <div className="absolute top-5 left-5 flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/90 text-black text-xs font-bold uppercase tracking-wider">
                        <Sparkles className="w-3 h-3" />
                        New
                      </div>
                    )}
                  </div>

                  <div className="p-5 sm:p-8 md:p-10">
                    <div className="flex justify-between items-start gap-3 mb-3 sm:mb-4">
                      <div className="min-w-0">
                        <p className="text-[10px] sm:text-xs font-bold text-primary uppercase tracking-[0.2em] mb-1 sm:mb-2">
                          {project.subtitle}
                        </p>
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-display font-bold group-hover:text-primary transition-colors duration-300 leading-tight">
                          {project.title}
                        </h2>
                      </div>
                      <div className="w-11 h-11 rounded-full border border-border/50 flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-all duration-500 flex-shrink-0">
                        <ArrowUpRight className="w-5 h-5 group-hover:text-black transition-colors" />
                      </div>
                    </div>

                    <p className="text-muted-foreground text-sm leading-relaxed mb-6 line-clamp-2">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] font-bold px-3 py-1 rounded-full bg-white/5 border border-white/5 uppercase tracking-wider"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mt-12 sm:mt-16"
          >
            <div className="rounded-2xl sm:rounded-3xl border border-border/50 bg-secondary/30 p-6 sm:p-8 md:p-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div className="max-w-xl">
                <p className="text-primary uppercase tracking-[0.2em] text-xs mb-3">More Projects</p>
                <h2 className="text-xl sm:text-2xl font-display font-bold mb-2">
                  Want to see more work?
                </h2>
                <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                  Many of my projects are private or under NDA. Contact me by email and I'll gladly share more details about my work.
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
    </main>
  );
};

export default ProjectsArchive;
