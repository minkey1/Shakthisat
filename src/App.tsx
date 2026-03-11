import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import SEOHead from './components/seo/SEOHead';
import Layout from './components/layout/Layout';
import WelcomeAnimation from './components/ui/welcome-animation';
import Home from './pages/Home';
import Partners from './pages/Partners';
import About from './pages/About';
import Advisors from './pages/Advisors';
import Countries from './pages/Countries';
import Devis from './pages/Devis';
import PatronsOfHonor from './pages/PatronsOfHonor';

function App() {
  const [showWelcome, setShowWelcome] = useState(true);

  useEffect(() => {
    // Always show welcome animation on page load/refresh
    setShowWelcome(true);
  }, []);

  const handleAnimationComplete = () => {
    setShowWelcome(false);
  };

  if (showWelcome) {
    return <WelcomeAnimation onComplete={handleAnimationComplete} />;
  }

  return (
    <Router>
      <SEOHead 
        title="Mission ShakthiSat | Global Space Initiative | Space Tech India Australia | 12,000 Girls 108 Countries"
        description="Mission ShakthiSat: Global space initiative empowering 12,000 girls from 108 countries including Australia, India, USA, UK. Leading space research, satellite missions, STEM education worldwide."
        keywords="Mission ShakthiSat, ShakthiSat space mission, space tech India, space tech Australia, space research India, space research Australia, space organizations, satellite mission, STEM education girls, space exploration, girls in space, international space mission, Space Kidz India, Dr Srimathy Kesan, space technology, orbital satellites, space collaboration, space science education, aerospace startup India, space innovation Australia, space mission Australia, space education Australia, satellite technology, space program, space agency, space industry, aerospace engineering, space science, women in space, space leadership, NewSpace, commercial space, space technology development, space research organization, satellite development, space engineering, space manufacturing, space economy, space business, space enterprise, space investment, space innovation hub, space ecosystem, space community, space future, space vision, space mission management, space operations, space systems, space platforms, space vehicles, space exploration mission, space discovery, space science mission, space technology mission"
      />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/partners" element={<Partners />} />
          <Route path="/patrons-of-honor" element={<PatronsOfHonor />} />
          <Route path="/about" element={<About />} />
          <Route path="/advisors" element={<Advisors />} />
          <Route path="/countries" element={<Countries />} />
          <Route path="/devis" element={<Devis />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;