const fetchAllData = () => {
  return fetch("http://s140639.devops-ap.be/api/all_data")
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

export default fetchAllData;
