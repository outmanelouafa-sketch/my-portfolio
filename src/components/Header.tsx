import { motion, AnimatePresence } from 'framer-motion';
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

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const navItems = portfolioData.navigation;

  const renderNavItem = (item: { label: string; href: string }) => {
    const closeMenu = () => setIsMobileMenuOpen(false);

    if (item.href.startsWith('/')) {
      return (
        <Link
          key={item.label}
          to={item.href}
          className="text-2xl lg:text-sm font-display lg:font-body text-foreground lg:text-muted-foreground hover:text-primary lg:hover:text-foreground transition-colors duration-300 lg:animated-underline"
          onClick={closeMenu}
        >
          {item.label}
        </Link>
      );
    }

    return (
      <a
        key={item.label}
        href={item.href}
        className="text-2xl lg:text-sm font-display lg:font-body text-foreground lg:text-muted-foreground hover:text-primary lg:hover:text-foreground transition-colors duration-300 lg:animated-underline"
        onClick={closeMenu}
      >
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
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled || isMobileMenuOpen ? 'glass py-4' : 'py-5 lg:py-6'
        }`}
      >
        <div className="container mx-auto px-6 md:px-12 lg:px-20">
          <div className="flex items-center justify-between">
            <div className="hidden lg:flex items-center gap-6">
              {socialLinks.map((link) => (
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

            <Link
              to="/"
              className="text-xl sm:text-2xl lg:text-3xl font-display font-medium tracking-tight z-50"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {portfolioData.personal.firstName.toLowerCase()}
              <span className="text-primary">.</span>dev
            </Link>

            <nav className="hidden lg:flex items-center gap-8">
              {navItems.map((item) => renderNavItem(item))}
            </nav>

            <button
              type="button"
              className="lg:hidden relative z-50 p-2 -mr-2 text-foreground"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 lg:hidden bg-background/98 backdrop-blur-2xl"
          >
            <motion.nav
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 24 }}
              transition={{ duration: 0.3, delay: 0.05 }}
              className="flex flex-col items-center justify-center h-full gap-8 px-8"
            >
              {navItems.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                >
                  {renderNavItem(item)}
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="flex items-center gap-6 pt-8 mt-4 border-t border-border/50"
              >
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                  </a>
                ))}
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
