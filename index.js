const BASE_URL = "http://universities.hipolabs.com";
const END_POINT = "/search";

const searchForm = document.getElementById("search-form");
const countryInput = document.getElementById("country-input");
const resultsTable = document.getElementById("results-table");
const resetButton = document.getElementById("reset-button");

searchForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const country = countryInput.value.toLowerCase();
  if (country) {
    const PARAM = `?country=${country}`;
    fetch(BASE_URL + END_POINT + PARAM)
      .then((response) => response.json())
      .then((data) => {
        populateResults(data);
      })
      .catch((error) => {
        console.error("Помилка отримання даних:", error);
      });
  }
});

resetButton.addEventListener("click", function () {
  countryInput.value = "";
  resultsTable.innerHTML = "";
});

function populateResults(data) {
  if (data && data.length > 0) {
    resultsTable.innerHTML = "";
    data.forEach((university, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${index + 1}</td>
        <td>${university.name}</td>
        <td><a href="${university.web_pages[0]}">${
        university.web_pages[0]
      }</a></td>
        <td>${university.country}</td>
        `;
      resultsTable.appendChild(row);
    });
  } else {
    resultsTable.innerHTML = "<p>Університети не знайдено</p>";
  }
}
