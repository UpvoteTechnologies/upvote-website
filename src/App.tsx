import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import About from './components/About';
import Contact from './components/Contact';
import Privacy from './components/Privacy';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-pink-50/40 to-orange-50/40">
      <Header />
      <Routes>
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
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
