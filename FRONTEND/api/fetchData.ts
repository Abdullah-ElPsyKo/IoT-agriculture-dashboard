export const fetchUniqueCities = async () => {
  const response = await fetch("http://s140639.devops-ap.be/api/unique_cities");
  if (!response.ok) {
    throw new Error("Failed to fetch unique cities");
  }
  return response.json();
};

export const fetchLatestSCityData = async (city: string) => {
  const response = await fetch(
    `http://s140639.devops-ap.be/api/latest_city_data/${city}`
  );
  if (!response.ok) {
    throw new Error(
      `Failed to fetch data for the selected city: ${response.statusText}`
    );
  }
  const data = await response.json();
  return data; // Assuming the response is a single WeatherData object
};

export async function fetchLatestCityData(city: any, page: any, limit: any) {
  try {
    const response = await fetch(`http://s140639.devops-ap.be/api/latest_city_data/${city}/page/${page}/limit/${limit}`);
    if (!response.ok) {
      throw new Error(`Error fetching data for city ${city}: ${response.status} ${response.statusText}`);
    }
    const json = await response.json();
    return json;  // this should include both data and totalCount as per your server response
  } catch (error) {
    console.error('Error fetching latest city data:', error);
    throw error;
  }
}


export const fetchPaginatedData = (page = 1, limit = 15) => {
  return fetch(`http://s140639.devops-ap.be/api/latest_data/page/${page}/limit/${limit}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .catch(error => {
      console.error("Failed to fetch data:", error);
      return Promise.reject(error);
    });
};

export const fetchAllCityData = async (city: string) => {
  const response = await fetch(`http://s140639.devops-ap.be/api/city_data/${city}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch data for the selected city: ${response.statusText}`);
  }
  return response.json();
};