import { motion, AnimatePresence } from 'framer-motion';
import { X, Github, ExternalLink, ArrowRight, Monitor, Smartphone, Layout, Cpu } from 'lucide-react';
import { useEffect } from 'react';

interface Project {
    id: string;
    title: string;
    subtitle: string;
    description: string;
    fullStory: string;
    thumbnail: string;
    tags: string[];
    githubUrl: string;
    liveUrl: string;
}

interface ProjectDetailViewProps {
    project: Project | null;
    isOpen: boolean;
    onClose: () => void;
}

const ProjectDetailView = ({ project, isOpen, onClose }: ProjectDetailViewProps) => {
    // Prevent scrolling when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!project) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] flex items-center justify-center lg:p-6 p-0"
                >
                    {/* Backdrop Blur */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-background/80 backdrop-blur-xl cursor-pointer"
                    />

                    {/* Main Content Modal */}
                    <motion.div
                        layoutId={`project-card-${project.id}`}
                        className="relative w-full h-full max-w-6xl bg-card border border-border/50 lg:rounded-3xl shadow-2xl overflow-y-auto no-scrollbar"
                        initial={{ y: 100, opacity: 0, scale: 0.9 }}
                        animate={{ y: 0, opacity: 1, scale: 1 }}
                        exit={{ y: 100, opacity: 0, scale: 0.9 }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                    >
                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="fixed lg:absolute top-6 right-6 z-[110] p-3 rounded-full bg-background/10 hover:bg-background/20 backdrop-blur-md transition-all duration-300 border border-border/50 group"
                        >
                            <X className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />
                        </button>

                        {/* Content Container */}
                        <div className="flex flex-col">
                            {/* Hero Section */}
                            <div className="relative w-full aspect-[16/9] lg:aspect-[21/9] overflow-hidden">
                                <motion.img
                                    initial={{ scale: 1.2, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ delay: 0.2, duration: 1 }}
                                    src={project.thumbnail}
                                    alt={project.title}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />

                                <div className="absolute bottom-12 left-8 md:left-16 right-8 md:right-16">
                                    <motion.div
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 0.4 }}
                                    >
                                        <p className="text-primary font-medium tracking-widest uppercase mb-4 text-sm">
                                            {project.subtitle}
                                        </p>
                                        <h1 className="text-4xl md:text-7xl font-display font-bold mb-6">
                                            {project.title}
                                        </h1>
                                    </motion.div>

                                    <motion.div
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 0.5 }}
                                        className="flex flex-wrap gap-3"
                                    >
                                        {project.tags.map((tag) => (
                                            <span key={tag} className="px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold backdrop-blur-md">
                                                {tag}
                                            </span>
                                        ))}
                                    </motion.div>
                                </div>
                            </div>

                            {/* Body Content */}
                            <div className="px-8 md:px-16 py-16 grid lg:grid-cols-3 gap-16">
                                {/* Left Column: Full Story */}
                                <div className="lg:col-span-2">
                                    <motion.div
                                        initial={{ y: 20, opacity: 0 }}
                                        whileInView={{ y: 0, opacity: 1 }}
                                        viewport={{ once: true }}
                                        className="space-y-8"
                                    >
                                        <h2 className="text-2xl font-display font-bold border-l-4 border-primary pl-4">
                                            The Story
                                        </h2>
                                        <p className="text-muted-foreground text-lg leading-relaxed">
                                            {project.fullStory}
                                        </p>
                                        <div className="grid md:grid-cols-2 gap-8 pt-8">
                                            <div className="p-6 rounded-2xl bg-secondary/30 border border-border/50">
                                                <Layout className="w-8 h-8 text-primary mb-4" />
                                                <h4 className="font-bold mb-2 text-foreground">Responsive Design</h4>
                                                <p className="text-sm text-muted-foreground">Flawless experience across all devices and screen sizes.</p>
                                            </div>
                                            <div className="p-6 rounded-2xl bg-secondary/30 border border-border/50">
                                                <Cpu className="w-8 h-8 text-primary mb-4" />
                                                <h4 className="font-bold mb-2 text-foreground">High Performance</h4>
                                                <p className="text-sm text-muted-foreground">Optimized code for blazing fast load times and interaction.</p>
                                            </div>
                                        </div>
                                    </motion.div>
                                </div>

                                {/* Right Column: Meta Info & Links */}
                                <div className="space-y-12">
                                    {/* Tech Stack Info */}
                                    <div className="space-y-6">
                                        <h4 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Core Tech</h4>
                                        <div className="flex flex-col gap-4">
                                            <div className="flex items-center gap-4 group">
                                                <div className="p-3 rounded-xl bg-secondary/50 border border-border/50 group-hover:border-primary/50 transition-colors">
                                                    <Monitor className="w-5 h-5" />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium">Platform</p>
                                                    <p className="text-xs text-muted-foreground">Cross-Platform Web/Mobile</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-4 group">
                                                <div className="p-3 rounded-xl bg-secondary/50 border border-border/50 group-hover:border-primary/50 transition-colors">
                                                    <Smartphone className="w-5 h-5" />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium">Framework</p>
                                                    <p className="text-xs text-muted-foreground">React / Vite / TypeScript</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="space-y-4">
                                        <a
                                            href={project.liveUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-full flex items-center justify-between p-4 rounded-2xl bg-primary text-black font-bold hover:scale-[1.02] active:scale-95 transition-all duration-300"
                                        >
                                            <span>Live Preview</span>
                                            <ExternalLink className="w-5 h-5" />
                                        </a>
                                        <a
                                            href={project.githubUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-full flex items-center justify-between p-4 rounded-2xl bg-foreground text-background font-bold hover:scale-[1.02] active:scale-95 transition-all duration-300"
                                        >
                                            <span>View GitHub</span>
                                            <Github className="w-5 h-5" />
                                        </a>
                                    </div>

                                    {/* Next Project Hint */}
                                    <div className="pt-12 border-t border-border/50">
                                        <p className="text-xs text-muted-foreground mb-4 font-bold uppercase tracking-widest">Next Phase</p>
                                        <p className="text-sm italic">"Integrating real-time inventory API for VOLTTECH warehouse..."</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ProjectDetailView;
