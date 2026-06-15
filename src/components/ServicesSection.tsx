import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import AnimatedText from './AnimatedText';
import { Smartphone, Globe, Palette, Server, ArrowUpRight } from 'lucide-react';

const services = [
  {
    icon: Smartphone,
    title: 'Mobile App Development',
    description: 'Native and cross-platform mobile applications built with Flutter and Kotlin. From concept to deployment on iOS and Android.',
    features: ['Cross-platform Development', 'Native Performance', 'Offline-first Architecture'],
  },
  {
    icon: Globe,
    title: 'Web Development',
    description: 'Modern, responsive web applications using React, TypeScript, and cutting-edge frontend technologies.',
    features: ['Single Page Applications', 'Progressive Web Apps', 'Performance Optimization'],
  },
  {
    icon: Palette,
    title: 'UI/UX Integration',
    description: 'Pixel-perfect implementation of design systems with a focus on user experience and accessibility.',
    features: ['Design System Implementation', 'Responsive Layouts', 'Animation & Interactions'],
  },
  {
    icon: Server,
    title: 'Backend & API Development',
    description: 'Scalable backend solutions with Node.js, Laravel, and cloud services like Firebase and AWS.',
    features: ['RESTful & GraphQL APIs', 'Database Design', 'Cloud Infrastructure'],
  },
];

const ServicesSection = () => {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <section 
      ref={containerRef} 
      id="services" 
      className="section-padding relative overflow-hidden bg-card/30"
    >
      {/* Background Pattern */}
      <motion.div
        style={{ y: backgroundY }}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
      </motion.div>

      <div className="container mx-auto relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <AnimatedText>
            <p className="text-primary uppercase tracking-[0.3em] text-sm mb-6 flex items-center justify-center gap-3">
              <span className="w-8 h-[1px] bg-primary" />
              What I Do
              <span className="w-8 h-[1px] bg-primary" />
            </p>
          </AnimatedText>

          <AnimatedText delay={0.1}>
            <h2 className="section-title mb-6">
              Services{' '}
              <span className="font-display italic text-muted-foreground">I offer</span>
            </h2>
          </AnimatedText>

          <AnimatedText delay={0.2}>
            <p className="text-muted-foreground text-lg">
              From mobile applications to full-stack web development, I provide end-to-end 
              solutions tailored to your business needs.
            </p>
          </AnimatedText>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ y: -5 }}
              className="service-card group cursor-pointer"
            >
              <div className="flex items-start gap-6">
                {/* Icon */}
                <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center group-hover:from-primary group-hover:to-primary/80 transition-all duration-500">
                  <service.icon className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors duration-500" />
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-display font-medium group-hover:text-primary transition-colors duration-300">
                      {service.title}
                    </h3>
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      whileHover={{ x: 0 }}
                      className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    >
                      <ArrowUpRight className="w-5 h-5 text-primary" />
                    </motion.div>
                  </div>
                  
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    {service.description}
                  </p>

                  {/* Features */}
                  <div className="flex flex-wrap gap-2">
                    {service.features.map((feature) => (
                      <span 
                        key={feature} 
                        className="text-xs px-3 py-1 rounded-full bg-secondary/50 text-muted-foreground"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-16"
        >
          <p className="text-muted-foreground mb-6">
            Have a project in mind? Let's discuss how I can help.
          </p>
          <a href="#contact" className="btn-primary">
            Get in Touch
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
