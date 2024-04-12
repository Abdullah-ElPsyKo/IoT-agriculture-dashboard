document.addEventListener("DOMContentLoaded", function () {
  const daySquares = document.querySelectorAll(".day-square");

  daySquares.forEach((daySquare, index) => {
    fetch(`https://s140639.devops-ap.be/day=${index}`) // change this to the api URL from the backend!!
      .then((response) => response.json())
      .then((data) => {
        // Change this to the format we are using in the backend!!!
        daySquare.textContent = `${data.date}: ${data.temperature}°C - ${data.description}`;
      })
      .catch((error) =>
        console.error("Fout bij het ophalen van de weergegevens:", error)
      );
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const daySquares = document.querySelectorAll(".day-square");

  daySquares.forEach((daySquare, index) => {
    const daysAgo = 7 - index;
    // ^ how this works; reverse index starts at 7 for 7 days ago and ends with i=0 to represent today. So first time run would be 7-0= 7;

    fetch(`https://s140639.devops-ap.be/day=${index}`) // change this to the api URL from the backend!!
      // (note for abdullah: do we use something like /day=${index} or one GET with all the data and then we extract each day in the frontend?? )
      .then((response) => response.json())
      .then((data) => {
        // Change this to the format we are using in the backend!!!
        daySquare.textContent = `${data.date}: ${data.temperature}°C - ${data.description}`;
      })
      .catch((error) =>
        console.error("Fout bij het ophalen van de weergegevens:", error)
      );
  });
});
