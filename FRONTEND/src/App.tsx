import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Dashboard from "./templates/dashboard/Dashboard";
import Integrations from "./templates/integrations/Integrations";
import fetchData from "../api/fetchData";
import Error from "./components/Error";

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
        <Routes>
          {/* Define routes */}
          <Route path="/" element={<Dashboard data={data} />} />
          <Route path="/integrations" element={<Integrations />} />
        </Routes>
        <Error error={error} />
      </>
    </Router>
  );
};

export default App;
