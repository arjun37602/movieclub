const work = document.getElementById("inputField");
const apiUrl = "https://www.omdbapi.com/?t=";
const apiKey = "&apikey=599cbf5c";
const submitButton = document.getElementById("searchButton");
const mainMovie = document.getElementById("movie-details")
const title = document.getElementById("title");
const rating = document.getElementById("rating");
const summary = document.getElementById("summary");

const year = document.getElementById("year");

const poster = document.getElementById("poster");
const boxoffice = document.getElementById("box");



submitButton.addEventListener("click", function () {
  if (work.value != "") {
    main(work.value);
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
    title.innerHTML = "Title: "+ titles;
    rating.innerHTML = "Rating: " + ratings;
    poster.src = imageUrl;
    summary.innerHTML = "Summary: " + plot
    boxoffice.innerHTML = "Box Office Collection: " + BoxOffices
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





