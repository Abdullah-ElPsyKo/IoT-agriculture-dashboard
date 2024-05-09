const fetchData = () => {
  return fetch("http://localhost:3000/all_data")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error status: ${response.status}`);
      }
      console.log("Data fetched successfully");
      return response.json();
    })
    .then((data) => {
      console.log("Data from the database:", data);
      return data; 
    })
    .catch((error) => {
      console.error("Failed to fetch data:", error);
      return Promise.reject(error);
    });
};

export default fetchData;
