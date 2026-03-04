import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

const patronImages = import.meta.glob('../img/Patrons/*', {
  eager: true,
  query: '?url',
  import: 'default',
});

const FEATURED_PATRON_KEY = '../img/Patrons/Smt Meenkashi Lekhi.png';
const featuredPatronSrc = (patronImages[FEATURED_PATRON_KEY] as string | undefined) ?? null;

type GalleryItem = {
  id: string;
  src: string;
  alt: string;
};

const buildGalleryItems = (): GalleryItem[] =>
  Object.entries(patronImages)
    .filter(([path]) => path !== FEATURED_PATRON_KEY)
    .sort(([a], [b]) => {
      const filenameA = a.split('/').pop() ?? '';
      const filenameB = b.split('/').pop() ?? '';
      const numA = parseInt(filenameA.match(/^�\d+/)?.[0] ?? '99999', 10);
      const numB = parseInt(filenameB.match(/^�\d+/)?.[0] ?? '99999', 10);
      if (numA !== numB) return numA - numB;
      return filenameA.localeCompare(filenameB);
    })
    .map(([path, url]) => {
      const fileName = path.split('/').pop() ?? 'patron';
      const baseName = fileName.replace(/\.[^/.]+$/, '');
      const title = baseName
        .replace(/[-_]+/g, ' ')
        .replace(/\b\w/g, (char) => char.toUpperCase());
      return {
        id: path,
        src: url as string,
        alt: `${title} patron portrait`,
      };
    });

const GalleryCarousel = ({ items }: { items: GalleryItem[] }) => {
  return (
    <div className="relative rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_30px_100px_-45px_rgba(0,0,0,0.8)]">
      <Carousel
        opts={{ align: 'start', loop: true, startIndex: 0 }}
        className="px-6 sm:px-10 py-10"
      >
        <CarouselContent>
          {items.map((item) => (
            <CarouselItem key={item.id} className="md:basis-1/2 lg:basis-1/3">
              <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-black/50 p-2 shadow-lg transition-transform duration-300 hover:-translate-y-1">
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-purple-600/20 via-fuchsia-500/10 to-teal-400/20" />
                <div className="relative aspect-[4/5] overflow-hidden rounded-xl">
                  <img
                    src={item.src}
                    alt={item.alt}
                    className="h-full w-full object-cover"
                    loading="eager"
                    fetchPriority="high"
                  />
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="border-white/20 bg-black/60 text-white hover:bg-white/10" />
        <CarouselNext className="border-white/20 bg-black/60 text-white hover:bg-white/10" />
      </Carousel>
    </div>
  );
};

const PatronsOfHonor = () => {
  const [isPreloaded, setIsPreloaded] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const galleryItems = useMemo(() => buildGalleryItems(), []);

  useEffect(() => {
    if (galleryItems.length === 0) {
      setIsPreloaded(true);
      return;
    }
    let isMounted = true;
    const preload = async () => {
      const loaders = galleryItems.map(
        (item) =>
          new Promise<void>((resolve) => {
            const img = new Image();
            img.src = item.src;
            img.onload = () => resolve();
            img.onerror = () => resolve();
          })
      );
      await Promise.all(loaders);
      if (isMounted) setIsPreloaded(true);
    };
    preload();
    return () => { isMounted = false; };
  }, [galleryItems]);

  return (
    <main className="relative min-h-screen bg-black text-white overflow-hidden">
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <div className="absolute -top-40 -left-32 h-96 w-96 rounded-full bg-purple-700 blur-[120px]" />
        <div className="absolute top-20 right-0 h-96 w-96 rounded-full bg-teal-500 blur-[140px]" />
        <div className="absolute bottom-0 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-fuchsia-500 blur-[160px]" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 space-y-16">
        <div className="text-center space-y-6">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs uppercase tracking-[0.24em] text-purple-200">
            Patrons of Honor
          </span>
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-300 via-teal-200 to-purple-100 bg-clip-text text-transparent drop-shadow-lg">
              Guardians of the Mission
            </h1>
            <p className="text-lg text-white/70 max-w-3xl mx-auto">
              Celebrating the visionary patrons who amplify ShakthiSAT and empower the next generation of explorers.
            </p>
          </div>
          <div className="w-24 h-1 mx-auto bg-gradient-to-r from-purple-500 via-fuchsia-400 to-teal-400 rounded-full" />
        </div>

        {featuredPatronSrc && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75 }}
            className="flex flex-col items-center gap-8"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-purple-600/30 to-teal-500/30 border border-white/10 text-xs uppercase tracking-[0.24em] text-teal-200">
              ✦ GLOBAL PATRON D'HONNEUR ✦
            </span>
            <div className="relative group w-64 sm:w-72 md:w-80">
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-br from-purple-500 via-fuchsia-400 to-teal-400 opacity-60 blur-lg group-hover:opacity-90 transition-opacity duration-500" />
              <div className="relative overflow-hidden rounded-3xl border border-white/20 bg-black/60 p-2 shadow-2xl">
                <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
                  <img
                    src={featuredPatronSrc}
                    alt="Smt. Meenakshi Lekhi – Special Patron"
                    className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    loading="eager"
                    fetchPriority="high"
                  />
                  <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/80 to-transparent" />
                </div>
              </div>
            </div>
            <div className="text-center space-y-2">
              <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-300 via-fuchsia-200 to-teal-200 bg-clip-text text-transparent">
                Smt. Meenakshi Lekhi
              </h2>
              <p className="text-white/60 text-sm uppercase tracking-widest">GLOBAL PATRON D'HONNEUR</p>
            </div>
            <div className="w-32 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          </motion.div>
        )}

        {galleryItems.length > 0 ? (
          isPreloaded ? (
            <GalleryCarousel items={galleryItems} />
          ) : (
            <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-10 text-center text-white/70">
              Loading patrons of honor...
            </div>
          )
        ) : (
          !featuredPatronSrc && (
            <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-10 text-center text-white/70">
              Add images to the img/Patrons folder to populate the gallery.
            </div>
          )
        )}
      </div>
    </main>
  );
};

export default PatronsOfHonor;
