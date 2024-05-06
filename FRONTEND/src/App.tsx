import { useEffect, useState } from "react";
import Dashboard from "./templates/dashboard/Dashboard";
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
    <>
      {/* Render the Dashboard component */}
      <Dashboard data={data} />

      {/* Render the error component if there's an error */}
      <Error error={error} />
    </>
  );
};

export default App;
