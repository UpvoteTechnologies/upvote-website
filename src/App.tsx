import { Routes, Route } from 'react-router-dom';
import MainLayout from './components/MainLayout';
import Hero from './components/Hero';
import TrustBar from './components/TrustBar';
import Diets from './components/Diets';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import About from './components/About';
import Team from './components/Team';
import Contact from './components/Contact';
import Privacy from './components/Privacy';
import Download from './components/Download';

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={
          <main>
            <Hero />
            <TrustBar />
            <Diets />
            <Features />
            <HowItWorks />
            <About />
            <Team />
            <Contact />
          </main>
        } />
        <Route path="/privacy" element={
          <main>
            <Privacy />
          </main>
        } />
      </Route>
      <Route path="/download" element={<Download />} />
    </Routes>
  );
}

export default App;
