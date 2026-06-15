import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import AnimatedText from './AnimatedText';
import { Mail, MapPin, Phone, Send, Github, Linkedin, Twitter } from 'lucide-react';
import portfolioData from '../data/portfolio.json';

const ContactSection = () => {
  const containerRef = useRef<HTMLElement>(null);
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
  });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const backgroundX = useTransform(scrollYProgress, [0, 1], [50, -50]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formState);
    // Handle form submission
  };

  const contactInfo = [
    { icon: Mail, label: 'Email', value: portfolioData.personal.email, href: `mailto:${portfolioData.personal.email}` },
    { icon: Phone, label: 'Phone', value: portfolioData.personal.phone, href: `tel:${portfolioData.personal.phone.replace(/[^0-9]/g, '')}` },
    { icon: MapPin, label: 'Location', value: portfolioData.personal.location, href: '#' },
  ];

  const socialLinks = [
    { icon: Github, label: 'GitHub', href: portfolioData.personal.social.github },
    { icon: Linkedin, label: 'LinkedIn', href: portfolioData.personal.social.linkedin },
    { icon: Twitter, label: 'Twitter', href: portfolioData.personal.social.twitter },
  ];

  return (
    <section
      ref={containerRef}
      id="contact"
      className="section-padding relative overflow-hidden"
    >
      {/* Background Number */}
      <motion.div
        style={{ x: backgroundX }}
        className="absolute left-0 top-1/2 -translate-y-1/2 text-[20rem] font-display font-bold text-foreground/[0.02] pointer-events-none select-none"
      >
        03
      </motion.div>

      <div className="container mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left Column - Info */}
          <div>
            <AnimatedText>
              <p className="text-primary uppercase tracking-[0.3em] text-sm mb-6 flex items-center gap-3">
                <span className="w-8 h-[1px] bg-primary" />
                Get in Touch
              </p>
            </AnimatedText>

            <AnimatedText delay={0.1}>
              <h2 className="section-title mb-8">
                Let's{' '}
                <span className="font-display italic text-muted-foreground">work</span>{' '}
                together
              </h2>
            </AnimatedText>

            <AnimatedText delay={0.2}>
              <p className="text-muted-foreground text-lg leading-relaxed mb-12">
                I'm always open to discussing new projects, creative ideas, or opportunities
                to be part of your vision. Feel free to reach out!
              </p>
            </AnimatedText>

            {/* Contact Info */}
            <div className="space-y-6 mb-12">
              {contactInfo.map((item, index) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  whileHover={{ x: 10 }}
                  className="flex items-center gap-4 group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-secondary flex items-center justify-center group-hover:bg-primary transition-colors duration-300">
                    <item.icon className="w-5 h-5 text-muted-foreground group-hover:text-primary-foreground transition-colors duration-300" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{item.label}</p>
                    <p className="text-foreground group-hover:text-primary transition-colors duration-300">
                      {item.value}
                    </p>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
            >
              <p className="text-sm text-muted-foreground mb-4">Follow me</p>
              <div className="flex gap-3">
                {socialLinks.map((link) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    whileHover={{ scale: 1.1, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-12 h-12 rounded-full border border-border flex items-center justify-center hover:border-primary hover:text-primary transition-colors duration-300"
                  >
                    <link.icon size={18} />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column - Form */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Input */}
              <div className="group">
                <label htmlFor="name" className="block text-sm text-muted-foreground mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  className="w-full bg-transparent border-b-2 border-border py-4 text-lg focus:outline-none focus:border-primary transition-colors duration-300 placeholder:text-muted-foreground/50"
                  placeholder="John Doe"
                  required
                />
              </div>

              {/* Email Input */}
              <div className="group">
                <label htmlFor="email" className="block text-sm text-muted-foreground mb-2">
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={formState.email}
                  onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                  className="w-full bg-transparent border-b-2 border-border py-4 text-lg focus:outline-none focus:border-primary transition-colors duration-300 placeholder:text-muted-foreground/50"
                  placeholder="john@example.com"
                  required
                />
              </div>

              {/* Message Input */}
              <div className="group">
                <label htmlFor="message" className="block text-sm text-muted-foreground mb-2">
                  Your Message
                </label>
                <textarea
                  id="message"
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  rows={4}
                  className="w-full bg-transparent border-b-2 border-border py-4 text-lg focus:outline-none focus:border-primary transition-colors duration-300 placeholder:text-muted-foreground/50 resize-none"
                  placeholder="Tell me about your project..."
                  required
                />
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="btn-primary w-full flex items-center justify-center gap-3 mt-8"
              >
                Send Message
                <Send size={18} />
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
