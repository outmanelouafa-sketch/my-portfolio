import { useCallback, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel';
import { encodeAssetPath } from '@/lib/projects';
import { cn } from '@/lib/utils';

interface ProjectGalleryProps {
  screenshots: string[];
  title: string;
}

const ProjectGallery = ({ screenshots, title }: ProjectGalleryProps) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  useEffect(() => {
    if (!api) return;

    const onSelect = () => setCurrent(api.selectedScrollSnap());
    onSelect();
    api.on('select', onSelect);
    return () => {
      api.off('select', onSelect);
    };
  }, [api]);

  const scrollTo = useCallback(
    (index: number) => {
      api?.scrollTo(index);
    },
    [api],
  );

  if (!screenshots.length) return null;

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-primary uppercase tracking-[0.3em] text-xs mb-2">App Screens</p>
          <h3 className="text-2xl md:text-3xl font-display font-bold">Interface Gallery</h3>
        </div>
        <span className="text-sm text-muted-foreground tabular-nums">
          {current + 1} / {screenshots.length}
        </span>
      </div>

      <div className="relative group">
        <Carousel
          setApi={setApi}
          opts={{ align: 'start', loop: true }}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {screenshots.map((src, index) => (
              <CarouselItem key={src} className="pl-4 basis-full md:basis-[85%] lg:basis-[70%]">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="relative"
                >
                  <div className="rounded-[2rem] overflow-hidden border border-border/50 bg-secondary/20 shadow-2xl">
                    <div className="aspect-[9/19] max-h-[70vh] mx-auto flex items-center justify-center bg-black/40 p-4 md:p-8">
                      <img
                        src={encodeAssetPath(src)}
                        alt={`${title} screen ${index + 1}`}
                        className="max-h-full w-auto object-contain rounded-2xl shadow-xl ring-1 ring-white/10"
                        loading="lazy"
                      />
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      scrollTo(index);
                      setLightboxOpen(true);
                    }}
                    className="absolute top-4 right-4 p-2.5 rounded-full bg-background/60 backdrop-blur-md border border-border/50 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-background/80"
                    aria-label="View fullscreen"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-2 md:-left-5 bg-background/80 backdrop-blur-md border-border/50 hover:bg-primary hover:text-black hover:border-primary" />
          <CarouselNext className="right-2 md:-right-5 bg-background/80 backdrop-blur-md border-border/50 hover:bg-primary hover:text-black hover:border-primary" />
        </Carousel>
      </div>

      <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar snap-x snap-mandatory">
        {screenshots.map((src, index) => (
          <button
            key={src}
            type="button"
            onClick={() => scrollTo(index)}
            className={cn(
              'flex-shrink-0 snap-start rounded-xl overflow-hidden border-2 transition-all duration-300',
              current === index
                ? 'border-primary scale-105 shadow-lg shadow-primary/20'
                : 'border-border/30 opacity-60 hover:opacity-100 hover:border-border',
            )}
          >
            <img
              src={encodeAssetPath(src)}
              alt={`${title} thumbnail ${index + 1}`}
              className="w-16 h-28 md:w-20 md:h-36 object-cover object-top"
              loading="lazy"
            />
          </button>
        ))}
      </div>

      {lightboxOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] bg-background/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-12"
          onClick={() => setLightboxOpen(false)}
        >
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              api?.scrollPrev();
            }}
            className="absolute left-4 md:left-8 p-3 rounded-full bg-card border border-border/50 hover:border-primary transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <img
            src={encodeAssetPath(screenshots[current])}
            alt={`${title} fullscreen`}
            className="max-h-[90vh] max-w-full object-contain rounded-2xl"
            onClick={(e) => e.stopPropagation()}
          />

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              api?.scrollNext();
            }}
            className="absolute right-4 md:right-8 p-3 rounded-full bg-card border border-border/50 hover:border-primary transition-colors"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <p className="absolute bottom-6 text-sm text-muted-foreground">
            {current + 1} of {screenshots.length} — click outside to close
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default ProjectGallery;
