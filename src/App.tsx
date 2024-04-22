import { useEffect, useState } from "react";
import Dashboard from "./templates/dashboard/Dashboard";
import { fetchData } from ".././api/fetchData";

const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchAndSetData = async () => {
      const fetchedData = await fetchData();
      setData(fetchedData);
    };

    fetchAndSetData();
  }, []);
  return (
    <>
      <Dashboard data={data} />
    </>
  );
};

export default App;
