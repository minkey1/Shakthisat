import { useEffect } from 'react';
import ScrollExpandMedia from '../components/ui/scroll-expansion-hero';
import MissionOverview from '../components/sections/MissionOverview';
import WhatIsShakthiSat from '../components/sections/WhatIsShakthiSat';
import WhyGirlsInSpace from '../components/sections/WhyGirlsInSpace';
import Why108Countries from '../components/sections/Why108Countries';

// SEO-optimized content component
const ShakthiSatContent = () => {
  return (
    <div className='space-y-0' itemScope itemType="https://schema.org/Project">
      <meta itemProp="name" content="Mission ShakthiSat" />
      <meta itemProp="description" content="Global space initiative empowering 12,000 girls from 108 countries through real-time satellite projects and STEM education" />
      <meta itemProp="url" content="https://shakthisat.com" />
      <meta itemProp="image" content="https://shakthisat.com/img/shakthisat.png" />
      
      <MissionOverview />
      <WhatIsShakthiSat />
      <WhyGirlsInSpace />
      <Why108Countries />
    </div>
  );
};

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // SEO: Update page title dynamically if needed
    document.title = "Mission ShakthiSat | Global Space Initiative Empowering 12,000 Girls from 108 Countries | Space Tech India";
    
    const resetEvent = new Event('resetSection');
    window.dispatchEvent(resetEvent);
  }, []);

  return (
    <main className='min-h-screen bg-black overflow-x-hidden' role="main">
      {/* SEO: Hidden structured data for better indexing */}
      <div style={{ display: 'none' }}>
        <h1>Mission ShakthiSat - India's Premier Space Mission</h1>
        <p>Empowering 12,000 girls from 108 countries through space technology, satellite missions, and STEM education. Leading space research and innovation in India.</p>
        <span>Keywords: space mission, ShakthiSat, space tech India, satellite technology, STEM education, space research, girls in space, aerospace startup</span>
      </div>
      
      <ScrollExpandMedia
        mediaType='video'
        bgImageSrc="/img/shakthisat.png"
        mediaSrc="https://raw.githubusercontent.com/financial1mastery1hub-sudo/Shakthisat/main/src/img/video.mp4"
        date='Global Space Initiative'
        scrollToExpand='Scroll to Expand & Explore'
        useAnimatedShader={true}
        use3DBackground={false}
      >
        <ShakthiSatContent />
      </ScrollExpandMedia>
    </main>
  );
};

export default Home;
