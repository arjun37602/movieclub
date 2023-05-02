const work = document.getElementById("inputField");
const apiUrl = "https://www.omdbapi.com/?t=";
const apiKey = "&apikey=599cbf5c";
const pageTitle = document.getElementById("pageTitle");
const movieWrapper = document.getElementById("movieWrapper");
const mainMovie = document.getElementById("movie-details");
const title = document.getElementById("title");
const rating = document.getElementById("rating");
const summary = document.getElementById("summary");

const year = document.getElementById("year");

const poster = document.getElementById("poster");
const boxoffice = document.getElementById("box");

work.addEventListener("keypress", function(event) {
  if (event.key == "Enter") {
    event.preventDefault();
    if (work.value != "") {
      main(work.value);  
    }
  }
});

async function main(inp) {
    let allData = await getData(inp)
    const titles= allData.title
    const year = allData.year
    const imageUrl = allData.image
    const ratings = allData.rating
    const BoxOffices = allData.BoxOffice
    const runtime = allData.runtime
    const plot = allData.summary
    movieWrapper.innerHTML = `<div id="movie-details">
      <h2 id="title">${titles}</h2>
      <img id="poster" src="${imageUrl}">
      <h3 id="rating">${ratings}</h3>
      <p id="summary">${plot}</p>
      <p id="box">Box Office Collection: ${BoxOffices}</p>
      </div>`
}

async function getData(input) {
  let formattedUrl = apiUrl + input + apiKey;
  console.log(formattedUrl)
  let data = await apiCall(formattedUrl);
  console.log(data)
  return {
    "title": data.Title,
    "year": data.Year,
    "image": data.Poster,
    "rating": data.Ratings[0].Value,
    "runtime": data.runtime,
    "BoxOffice": data.BoxOffice,
    "summary": data.Plot
  }
}

async function apiCall(url) {
  let response = await fetch(url);
  let data = await response.json();
  return data;
}