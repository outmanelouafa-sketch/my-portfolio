import { motion } from 'framer-motion';

interface MarqueeStripProps {
  items: string[];
  direction?: 'left' | 'right';
  speed?: number;
  className?: string;
}

const MarqueeStrip = ({ 
  items, 
  direction = 'left', 
  speed = 25,
  className = '' 
}: MarqueeStripProps) => {
  const duplicatedItems = [...items, ...items, ...items, ...items];

  return (
    <div className={`overflow-hidden py-6 ${className}`}>
      <motion.div
        animate={{ x: direction === 'left' ? '-50%' : '0%' }}
        initial={{ x: direction === 'left' ? '0%' : '-50%' }}
        transition={{
          duration: speed,
          repeat: Infinity,
          ease: 'linear',
        }}
        className="flex gap-8 whitespace-nowrap"
      >
        {duplicatedItems.map((item, index) => (
          <div key={index} className="flex items-center gap-8">
            <span className="text-lg md:text-xl font-medium text-muted-foreground hover:text-foreground transition-colors duration-300 cursor-default">
              {item}
            </span>
            <span className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default MarqueeStrip;
