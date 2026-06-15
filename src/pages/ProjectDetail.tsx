import { motion } from 'framer-motion';
import { Link, useParams, Navigate } from 'react-router-dom';
import {
  ArrowLeft,
  Github,
  ExternalLink,
  Monitor,
  Smartphone,
  Calendar,
  CheckCircle2,
  Wrench,
  Lock,
} from 'lucide-react';
import { getProjectById } from '@/lib/projects';
import ProjectGallery from '@/components/ProjectGallery';
import portfolioData from '@/data/portfolio.json';

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const project = id ? getProjectById(id) : undefined;

  if (!project) {
    return <Navigate to="/projects" replace />;
  }

  const hasGallery = project.screenshots && project.screenshots.length > 0;

  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-40 glass border-b border-border/50">
        <div className="container mx-auto px-6 md:px-12 lg:px-20 py-5 flex items-center justify-between">
          <Link
            to="/projects"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            All Projects
          </Link>
          <span className="text-xl font-display font-medium tracking-tight hidden sm:block">
            {portfolioData.personal.firstName.toLowerCase()}
            <span className="text-primary">.</span>dev
          </span>
        </div>
      </header>

      <article>
        <div className="relative w-full aspect-[16/9] md:aspect-[21/9] overflow-hidden">
          <motion.img
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            src={project.thumbnail}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />

          <div className="absolute bottom-0 left-0 right-0 px-6 md:px-12 lg:px-20 pb-12 md:pb-16">
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.7 }}
              className="container mx-auto"
            >
              <p className="text-primary font-medium tracking-widest uppercase mb-4 text-sm">
                {project.subtitle}
              </p>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold mb-6">
                {project.title}
              </h1>
              <div className="flex flex-wrap gap-3">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold backdrop-blur-md"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        <div className="container mx-auto px-6 md:px-12 lg:px-20 py-16 md:py-24">
          <div className="grid lg:grid-cols-3 gap-16 lg:gap-24">
            <div className="lg:col-span-2 space-y-16">
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <h2 className="text-2xl font-display font-bold border-l-4 border-primary pl-4">
                  Overview
                </h2>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  {project.description}
                </p>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  {project.fullStory}
                </p>
              </motion.section>

              {project.features && project.features.length > 0 && (
                <motion.section
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="space-y-6"
                >
                  <h2 className="text-2xl font-display font-bold border-l-4 border-primary pl-4">
                    Key Features
                  </h2>
                  <ul className="grid sm:grid-cols-2 gap-4">
                    {project.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-3 p-4 rounded-2xl bg-secondary/30 border border-border/50"
                      >
                        <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-muted-foreground leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </motion.section>
              )}

              {hasGallery && (
                <motion.section
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <ProjectGallery screenshots={project.screenshots!} title={project.title} />
                </motion.section>
              )}
            </div>

            <aside className="space-y-10">
              <div className="sticky top-28 space-y-10">
                <div className="p-6 rounded-2xl bg-secondary/30 border border-border/50 space-y-5">
                  <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">
                    Project Info
                  </h3>

                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-background/50 border border-border/50">
                      <Monitor className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Platform</p>
                      <p className="text-xs text-muted-foreground">
                        {project.platform ?? 'Cross-Platform Web/Mobile'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-background/50 border border-border/50">
                      <Smartphone className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Framework</p>
                      <p className="text-xs text-muted-foreground">
                        {project.framework ?? 'React / Vite / TypeScript'}
                      </p>
                    </div>
                  </div>

                  {project.year && (
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-xl bg-background/50 border border-border/50">
                        <Calendar className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Year</p>
                        <p className="text-xs text-muted-foreground">{project.year}</p>
                      </div>
                    </div>
                  )}
                </div>

                {project.tools && project.tools.length > 0 && (
                  <div className="p-6 rounded-2xl bg-secondary/30 border border-border/50 space-y-4">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                      <Wrench className="w-4 h-4" />
                      Tools & Stack
                    </h3>
                    <ul className="space-y-3">
                      {project.tools.map((tool) => (
                        <li key={tool.name} className="border-b border-border/30 pb-3 last:border-0 last:pb-0">
                          <p className="text-sm font-semibold text-foreground">{tool.name}</p>
                          <p className="text-xs text-muted-foreground mt-0.5">{tool.role}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="space-y-3">
                  {project.liveUrl !== '#' && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-between p-4 rounded-2xl bg-primary text-black font-bold hover:scale-[1.02] active:scale-95 transition-all duration-300"
                    >
                      <span>Live Preview</span>
                      <ExternalLink className="w-5 h-5" />
                    </a>
                  )}
                  {project.isPrivate ? (
                    <div className="w-full flex items-center justify-between p-4 rounded-2xl bg-secondary/50 border border-border/50 text-muted-foreground cursor-default">
                      <span className="font-semibold">Private Project</span>
                      <Lock className="w-5 h-5" />
                    </div>
                  ) : (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-between p-4 rounded-2xl bg-foreground text-background font-bold hover:scale-[1.02] active:scale-95 transition-all duration-300"
                    >
                      <span>View GitHub</span>
                      <Github className="w-5 h-5" />
                    </a>
                  )}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </article>
    </main>
  );
};

export default ProjectDetail;
