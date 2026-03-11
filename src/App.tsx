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
      <SEOHead />
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