// App.js
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import MenuPreview from './components/MenuPreview';
import Contact from './components/Contact';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/about" element={<About />} />
          <Route path="/menu" element={<MenuPreview />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/" element={<Hero />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
