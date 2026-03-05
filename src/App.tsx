import { Routes, Route } from 'react-router-dom';
import MainLayout from './components/MainLayout';
import Hero from './components/Hero';
import Features from './components/Features';
import About from './components/About';
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
            <Features />
            <About />
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
