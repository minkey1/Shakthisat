import {
  useEffect,
  useRef,
  useState,
  ReactNode,
  TouchEvent,
  WheelEvent,
} from 'react';
import { motion } from 'framer-motion';
import BackgroundCanvas from './background-canvas';
import AnimatedShaderBackground from './animated-shader-background';

interface ScrollExpandMediaProps {
  mediaType?: 'video' | 'image';
  mediaSrc: string;
  posterSrc?: string;
  bgImageSrc: string;
  title?: string;
  date?: string;
  scrollToExpand?: string;
  children?: ReactNode;
  use3DBackground?: boolean;
  useAnimatedShader?: boolean;
}

const ScrollExpandMedia = ({
  mediaType = 'video',
  mediaSrc,
  posterSrc,
  bgImageSrc,
  title,
  date,
  scrollToExpand,
  children,
  use3DBackground = false,
  useAnimatedShader = false,
}: ScrollExpandMediaProps) => {
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [showContent, setShowContent] = useState<boolean>(false);
  const [touchStartY, setTouchStartY] = useState<number>(0);
  const [isMobileState, setIsMobileState] = useState<boolean>(false);
  const [shouldRenderShader, setShouldRenderShader] = useState<boolean>(false);

  const sectionRef = useRef<HTMLDivElement | null>(null);
  const scrollProgressRef = useRef<number>(0);
  const rafIdRef = useRef<number | null>(null);
  const pendingUpdateRef = useRef(false);
  const mediaFullyExpandedRef = useRef(false);
  const lastUpdateTimeRef = useRef(0);

  useEffect(() => {
    setScrollProgress(0);
    setShowContent(false);
    mediaFullyExpandedRef.current = false;
  }, [mediaType]);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (mediaFullyExpandedRef.current && e.deltaY < 0 && window.scrollY <= 5) {
        mediaFullyExpandedRef.current = false;
        e.preventDefault();
      } else if (!mediaFullyExpandedRef.current) {
        e.preventDefault();
        const scrollDelta = e.deltaY * 0.0012;
        scrollProgressRef.current = Math.min(
          Math.max(scrollProgressRef.current + scrollDelta, 0),
          1
        );
        pendingUpdateRef.current = true;
        
        if (scrollProgressRef.current >= 1) {
          mediaFullyExpandedRef.current = true;
          setShowContent(true);
        } else if (scrollProgressRef.current < 0.75) {
          setShowContent(false);
        }
      }
    };

    // RAF loop with frame skipping for smooth performance
    const updateFrame = () => {
      const now = performance.now();
      if (pendingUpdateRef.current && (now - lastUpdateTimeRef.current >= 16)) {
        setScrollProgress(scrollProgressRef.current);
        pendingUpdateRef.current = false;
        lastUpdateTimeRef.current = now;
      }
      rafIdRef.current = requestAnimationFrame(updateFrame);
    };
    
    rafIdRef.current = requestAnimationFrame(updateFrame);

    const handleTouchStart = (e: TouchEvent) => {
      setTouchStartY(e.touches[0].clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!touchStartY) return;

      const touchY = e.touches[0].clientY;
      const deltaY = touchStartY - touchY;

      if (mediaFullyExpandedRef.current && deltaY < -20 && window.scrollY <= 5) {
        mediaFullyExpandedRef.current = false;
        e.preventDefault();
      } else if (!mediaFullyExpandedRef.current) {
        e.preventDefault();
        // Increase sensitivity for mobile, especially when scrolling back
        const scrollFactor = deltaY < 0 ? 0.008 : 0.005;
        const scrollDelta = deltaY * scrollFactor;
        const newProgress = Math.min(
          Math.max(scrollProgress + scrollDelta, 0),
          1
        );
        setScrollProgress(newProgress);

        if (newProgress >= 1) {
          mediaFullyExpandedRef.current = true;
          setShowContent(true);
        } else if (newProgress < 0.75) {
          setShowContent(false);
        }

        setTouchStartY(touchY);
      }
    };

    const handleTouchEnd = (): void => {
      setTouchStartY(0);
    };

    const handleScroll = (): void => {
      if (!mediaFullyExpandedRef.current) {
        window.scrollTo(0, 0);
      }
    };

    window.addEventListener('wheel', handleWheel as unknown as EventListener, {
      passive: false,
    });
    window.addEventListener('scroll', handleScroll as EventListener);
    window.addEventListener(
      'touchstart',
      handleTouchStart as unknown as EventListener,
      { passive: false }
    );
    window.addEventListener(
      'touchmove',
      handleTouchMove as unknown as EventListener,
      { passive: false }
    );
    window.addEventListener('touchend', handleTouchEnd as EventListener);

    return () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      window.removeEventListener(
        'wheel',
        handleWheel as unknown as EventListener
      );
      window.removeEventListener('scroll', handleScroll as EventListener);
      window.removeEventListener(
        'touchstart',
        handleTouchStart as unknown as EventListener
      );
      window.removeEventListener(
        'touchmove',
        handleTouchMove as unknown as EventListener
      );
      window.removeEventListener('touchend', handleTouchEnd as EventListener);
    };
  }, [scrollProgress, touchStartY]);

  useEffect(() => {
    const checkIfMobile = (): void => {
      setIsMobileState(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);

    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  // Lazy load shader on first interaction
  useEffect(() => {
    const handleFirstInteraction = () => {
      setShouldRenderShader(true);
      window.removeEventListener('scroll', handleFirstInteraction);
      window.removeEventListener('wheel', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
    };

    window.addEventListener('scroll', handleFirstInteraction, { passive: true });
    window.addEventListener('wheel', handleFirstInteraction);
    window.addEventListener('touchstart', handleFirstInteraction);

    return () => {
      window.removeEventListener('scroll', handleFirstInteraction);
      window.removeEventListener('wheel', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
    };
  }, []);

  // Start from circle (equal width/height) and expand to vertical or horizontal rectangle
  const baseSize = isMobileState ? 250 : 300;
  
  // For vertical rectangle expansion
  const maxWidthVertical = isMobileState ? 350 : 500;
  const maxHeightVertical = isMobileState ? 600 : 800;
  
  // For horizontal rectangle expansion
  const maxWidthHorizontal = isMobileState ? 600 : 900;
  const maxHeightHorizontal = isMobileState ? 350 : 500;
  
  // Choose animation type: 'vertical' or 'horizontal'
  type AnimationType = 'vertical' | 'horizontal';
  const animationType: AnimationType = 'horizontal'; // Change this to 'vertical' for vertical rectangle animation
  
  let maxWidth: number;
  let maxHeight: number;
  
  if ((animationType as string) === 'vertical') {
    maxWidth = maxWidthVertical;
    maxHeight = maxHeightVertical;
  } else {
    maxWidth = maxWidthHorizontal;
    maxHeight = maxHeightHorizontal;
  }
  
  const mediaWidth = baseSize + scrollProgress * (maxWidth - baseSize);
  const mediaHeight = baseSize + scrollProgress * (maxHeight - baseSize);
  
  // Calculate border radius - starts as circle (150px) and becomes rectangle (rounded corners)
  // Apply ease-in easing for faster initial decrease
  const borderRadiusProgress = scrollProgress * scrollProgress; // Quadratic ease-in
  const borderRadius = 150 - (borderRadiusProgress * 145); // Goes from 150px to 5px
  
  // Original animation with initial offset to position text around circle
  const baseOffset = isMobileState ? 15 : 18;
  const scrollOffset = scrollProgress * (isMobileState ? 180 : 150);
  const textTranslateX = baseOffset + scrollOffset;

  return (
    <div
      ref={sectionRef}
      className='transition-colors duration-700 ease-in-out overflow-x-hidden relative'
    >
      {useAnimatedShader && shouldRenderShader && <AnimatedShaderBackground />}
      {use3DBackground && shouldRenderShader && <BackgroundCanvas />}
      <section className='relative flex flex-col items-center justify-start min-h-[100dvh]'>
        <div className='relative w-full flex flex-col items-center min-h-[100dvh]'>
          <motion.div
            className='absolute inset-0 z-0 h-full'
            initial={{ opacity: 0 }}
            animate={{ opacity: useAnimatedShader || use3DBackground ? 0 : 1 - scrollProgress }}
            transition={{ type: 'tween', duration: 0 }}
          >
            <img
              src={bgImageSrc}
              alt='Background'
              loading='lazy'
              decoding='async'
              className='w-screen h-screen object-cover object-center'
            />
            <div className='absolute inset-0 bg-gradient-to-b from-purple-900/20 via-black/40 to-teal-900/20' />
          </motion.div>

          <div className='container mx-auto flex flex-col items-center justify-start relative z-10'>
            <div className='flex flex-col items-center justify-center w-full h-[100dvh] relative'>
              <div
                className='absolute z-20 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 overflow-hidden'
                style={{
                  width: `${mediaWidth}px`,
                  height: `${mediaHeight}px`,
                  maxWidth: '95vw',
                  maxHeight: '85vh',
                  boxShadow: '0px 0px 50px rgba(147, 51, 234, 0.3)',
                  borderRadius: `${borderRadius}px`,
                  willChange: 'width, height, border-radius',
                  transform: 'translate3d(-50%, -50%, 0)',
                }}
              >
                {mediaType === 'video' ? (
                  mediaSrc.includes('youtube.com') ? (
                    <div className='relative w-full h-full pointer-events-none'>
                      <iframe
                        width='100%'
                        height='100%'
                        src={
                          mediaSrc.includes('embed')
                            ? mediaSrc +
                              (mediaSrc.includes('?') ? '&' : '?') +
                              'autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&disablekb=1&modestbranding=1'
                            : mediaSrc.replace('watch?v=', 'embed/') +
                              '?autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&disablekb=1&modestbranding=1&playlist=' +
                              mediaSrc.split('v=')[1]
                        }
                        className='w-full h-full'
                        style={{ borderRadius: `${borderRadius}px` }}
                        frameBorder='0'
                        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                        allowFullScreen
                      />
                      <div
                        className='absolute inset-0 z-10'
                        style={{ pointerEvents: 'none' }}
                      ></div>

                      <motion.div
                        className='absolute inset-0 bg-black/30'
                        style={{ borderRadius: `${borderRadius}px` }}
                        initial={{ opacity: 0.7 }}
                        animate={{ opacity: 0.5 - scrollProgress * 0.3 }}
                        transition={{ type: 'tween', duration: 0 }}
                      />
                    </div>
                  ) : (
                    <div className='relative w-full h-full pointer-events-none'>
                      <video
                        src={mediaSrc}
                        poster={posterSrc}
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload='auto'
                        className='w-full h-full object-cover'
                        style={{ borderRadius: `${borderRadius}px` }}
                        controls={false}
                        disablePictureInPicture
                        disableRemotePlayback
                      />
                      <div
                        className='absolute inset-0 z-10'
                        style={{ pointerEvents: 'none' }}
                      ></div>

                      <motion.div
                        className='absolute inset-0 bg-black/30'
                        style={{ borderRadius: `${borderRadius}px` }}
                        initial={{ opacity: 0.7 }}
                        animate={{ opacity: 0.5 - scrollProgress * 0.3 }}
                        transition={{ duration: 0.2 }}
                      />
                    </div>
                  )
                ) : (
                  <div className='relative w-full h-full'>
                    <img
                      src={mediaSrc}
                      alt={title || 'Media content'}
                      loading='lazy'
                      decoding='async'
                      className='w-full h-full object-cover'
                      style={{ borderRadius: `${borderRadius}px` }}
                    />

                    <motion.div
                      className='absolute inset-0 bg-black/50'
                      style={{ borderRadius: `${borderRadius}px` }}
                      initial={{ opacity: 0.7 }}
                      animate={{ opacity: 0.7 - scrollProgress * 0.3 }}
                      transition={{ type: 'tween', duration: 0 }}
                    />
                  </div>
                )}

                <div className='flex flex-col items-center text-center relative z-10 mt-4 transition-none'>
                  {date && (
                    <p
                      className='text-2xl text-teal-200 font-medium'
                      style={{
                        transform: `translate3d(-${textTranslateX}vw, 0, 0)`,
                        willChange: 'transform',
                      }}
                    >
                      {date}
                    </p>
                  )}
                  {scrollToExpand && (
                    <p
                      className='text-purple-200 font-medium text-center'
                      style={{
                        transform: `translate3d(${textTranslateX}vw, 0, 0)`,
                        willChange: 'transform',
                      }}
                    >
                      {scrollToExpand}
                    </p>
                  )}
                </div>
              </div>

            </div>

            <motion.section
              className='flex flex-col w-full px-8 py-10 md:px-16 lg:py-20'
              initial={{ opacity: 0 }}
              animate={{ opacity: showContent ? 1 : 0 }}
              transition={{ duration: 0.7 }}
            >
              {children}
            </motion.section>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ScrollExpandMedia;