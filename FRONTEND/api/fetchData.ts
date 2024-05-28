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

export const fetchUniqueCities = async () => {
  const response = await fetch("http://s140639.devops-ap.be/api/unique_cities");
  if (!response.ok) {
    throw new Error("Failed to fetch unique cities");
  }
  return response.json();
};

export const fetchLatestSCityData = async (city: string) => {
  try {
    const response = await fetch(
      `http://s140639.devops-ap.be/api/latest_city_data/${city}`
    );
    if (!response.ok) {
      throw new Error(
        `Failed to fetch data for the selected city: ${response.statusText}`
      );
    }
    return response.json();
  } catch (error) {
    console.error(`Error fetching data for city ${city}:`, error);
    throw error;
  }
};
