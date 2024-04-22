export async function fetchData() {
  try {
    //get backend data
    const response = await fetch('https://api.example.com/data');
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    //here im converting the data to json so we can use it in the components
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}