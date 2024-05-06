const fetchData = () => {
  return fetch("https://your-backend-url.com/data-endpoint")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error status: ${response.status}`);
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Failed to fetch data:", error);
      return Promise.reject(error);
    });
};

export default fetchData;
