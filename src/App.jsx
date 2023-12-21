// App.js
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './client/components/Header';
import Hero from './client/components/Hero';
import About from './client/components/About';
import MenuPreview from './client/components/MenuPreview';
import Contact from './client/components/Contact';
import Location from './client/components/Location';
import Footer from './client/components/Footer';
import './App.css'

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/about" element={<About />} />
          <Route path="/menu" element={<MenuPreview />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/location" element={<Location />} />
          <Route path="/" element={<Hero />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
