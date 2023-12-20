// App.js
// Main component that renders all other components
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import MenuPreview from './components/MenuPreview';
//import Recommendations from './components/Recommendations';
import Contact from './components/Contact';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/about" component={About} />
          <Route path="/menu" component={MenuPreview} />
          <Route path="/contact" component={Contact} />
          <Route path="/" element={<Hero />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
