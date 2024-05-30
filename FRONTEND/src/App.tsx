// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./templates/dashboard/Dashboard";
import Integrations from "./templates/integrations/Integrations";
import History from "./templates/integrations/history";
import AboutUs from "./templates/about_us/AboutUs";
import Navbar from "./components/Navbar";
import CropBoxes from "./templates/Crops";

const App = () => {
  return (
    <Router>
      <>
        <Navbar />
        <Routes>
          {/* Define routes */}
          <Route path="/" element={<Dashboard />} />
          <Route path="/integrations" element={<Integrations />} />
          <Route path="/history/:city/:page/:limit" element={<History />} />
          <Route path="/about_us" element={<AboutUs />} />
          <Route path="/crops" element={<CropBoxes />} />
        </Routes>
      </>
    </Router>
  );
};

export default App;
