import { useEffect, useState } from "react";
import Dashboard from "./templates/dashboard/Dashboard";
import fetchData from ".././api/fetchData";
import Error from "./components/Error";

const App = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetchData()
      .then((fetchedData) => {
        // here were getting the fetched data and setting it to the state so we can pass it to the components as soon as the page loads
        setData(fetchedData);
        setError(null); //clear the error state if data is successfully fetched
      })
      .catch((fetchError) => {
        setError(fetchError); //set the error state if there's an error
      });
  }, []);

  if (error) {
    // Render the error page or a message
    return <Error error={error} />;
  }

  if (!data) {
    return <div>Loading...</div>; // Or any loading indicator
  }

  return (
    <>
      <Dashboard data={data} />
    </>
  );
};

export default App;
