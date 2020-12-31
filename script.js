const file = './eg.json'
const cities = []

fetch(file)
  .then((blob) => blob.json())
  .then((data) => cities.push(...data))

function findMatched(wordToMatch, cities) {
  return cities.filter((place) => {
    const regex = new RegExp(wordToMatch, 'gi')
    return place.city.match(regex)
  })
}

function displayMatch() {
  const match = findMatched(this.value, cities)
  if (!this.value) {
    suggestions.innerHTML = '<li>Filter for a city</li>'
  } else {
    const html = match
      .map((place) => {
        const regex = new RegExp(this.value, 'gi')
        const cityName = place.city.replace(
          regex,
          `<span class="hl">${this.value}</span>`
        )
        return `
        <li>
        <span class="name">${cityName}</span>
        <span class="population">${numberWithCommas(place.population)}</span>
        </li>
        `
      })
      .join('')
    suggestions.innerHTML = html
  }
}

//https://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript
function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

const searchInput = document.querySelector('.search')
const suggestions = document.querySelector('.suggestions')
searchInput.addEventListener('keyup', displayMatch)
