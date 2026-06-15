import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import portfolioData from '../data/portfolio.json';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = portfolioData.navigation;

  const navLinkClass =
    'text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 animated-underline';
  const mobileNavLinkClass =
    'text-lg text-muted-foreground hover:text-foreground transition-colors duration-300';

  const renderNavItem = (item: { label: string; href: string }, mobile = false) => {
    const className = mobile ? mobileNavLinkClass : navLinkClass;
    const closeMenu = () => setIsMobileMenuOpen(false);

    if (item.href.startsWith('/')) {
      return (
        <Link key={item.label} to={item.href} className={className} onClick={closeMenu}>
          {item.label}
        </Link>
      );
    }

    return (
      <a key={item.label} href={item.href} className={className} onClick={closeMenu}>
        {item.label}
      </a>
    );
  };

  const socialLinks = [
    { label: 'FB', href: '#' },
    { label: 'IN', href: '#' },
    { label: 'DR', href: '#' },
    { label: 'GH', href: portfolioData.personal.social.github },
  ];

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${isScrolled ? 'glass py-4' : 'py-6'
        }`}
    >
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        <div className="flex items-center justify-between">
          {/* Social Links - Desktop */}
          <div className="hidden md:flex items-center gap-6">
            {socialLinks.map((link, index) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300 flex items-center gap-1.5"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                {link.label}
              </a>
            ))}
          </div>

          {/* Logo */}
          <a href="#" className="text-2xl md:text-3xl font-display font-medium tracking-tight">
            {portfolioData.personal.firstName.toLowerCase()}<span className="text-primary">.</span>dev
          </a>

          {/* Navigation - Desktop */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => renderNavItem(item))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-foreground p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <motion.div
          initial={false}
          animate={{
            height: isMobileMenuOpen ? 'auto' : 0,
            opacity: isMobileMenuOpen ? 1 : 0
          }}
          className="md:hidden overflow-hidden"
        >
          <nav className="flex flex-col gap-4 pt-6 pb-2">
            {navItems.map((item) => renderNavItem(item, true))}
          </nav>
        </motion.div>
      </div>
    </motion.header>
  );
};

export default Header;
