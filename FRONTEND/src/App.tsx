// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Dashboard from "./templates/dashboard/Dashboard";
import Integrations from "./templates/integrations/Integrations";
import History from "./templates/integrations/history";
import fetchData from "../api/fetchData";
import Error from "./components/Error";
import AboutUs from "./templates/about_us/AboutUs";
import Navbar from "./components/Navbar";
import CropBoxes from "./templates/Crops";

const App = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData()
      .then((fetchedData) => {
        setData(fetchedData);
        setError(null);
      })
      .catch((fetchError) => {
        setError(fetchError);
      });
  }, []);

  return (
    <Router>
      <>
        <Navbar />
        <Routes>
          {/* Define routes */}
          <Route path="/" element={<Dashboard data={data} />} />
          <Route path="/integrations" element={<Integrations />} />
          <Route path="/history" element={<History />} />
          <Route path="/about_us" element={<AboutUs />} />
          <Route path="/crops" element={<CropBoxes />} />
        </Routes>
        <Error error={error} />
      </>
    </Router>
  );
};

export default App;
