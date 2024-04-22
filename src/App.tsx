import { useEffect, useState } from "react";
import Dashboard from "./templates/dashboard/Dashboard";
import { fetchData } from ".././api/fetchData";

const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // here were getting the fetched data and setting it to the state so we can pass it to the components as soon as the page loads
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
