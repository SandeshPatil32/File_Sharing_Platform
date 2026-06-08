import { Navbar } from "./components/Navbar";
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { InfoSection } from "./components/InfoSection";
import Dashboard from "./pages/Dashboard";
import Features from "./pages/Features";
import Help from "./pages/Help";
import Pricing from "./pages/Pricing";
import Sign from "./pages/Sign";
import Log from "./pages/Log";
import Footer from "./components/Footer";

export default function App() {
  return (
    <>
      <div className="hero">
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/Features" element={<Features />} />
            <Route path="/Help" element={<Help />} />
            <Route path="/Pricing" element={<Pricing />} />
            <Route path="/Sign" element={<Sign />} />
            <Route path="/Log" element={<Log />} />
          </Routes>
          <InfoSection />
          <Footer />
        </BrowserRouter>
      </div>
    </>
  );
}
