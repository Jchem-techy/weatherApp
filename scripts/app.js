const form = document.querySelector(`form`);
const input = document.querySelector(`input`);
const details = document.querySelector(`.details`);
const card = document.querySelector(`.card`);
const icon = document.querySelector(`.icon > img`);
const time = document.querySelector(`img.time`);
const forecast = new Forecast();

form.addEventListener(`submit`, (e) => {
  e.preventDefault();
  const cityName = input.value.trim();
  localStorage.setItem(`city`, cityName);
  forecast
    .updateInfo(cityName)
    .then((data) => {
      updateUI(data);
    })
    .then((data) => {
      // console.log(data);
    })
    .catch((error) => {
      console.log(error);
    });
  e.target.reset();
});

function updateUI(data) {
  // console.log(data);
  details.innerHTML = `
          <h5 class="my-3">${data.cityInfo.EnglishName}</h5>
          <div class="my-3">${data.weatherInfo.WeatherText}</div>
          <div class="display-4 my-4">
            <span>${data.weatherInfo.Temperature.Metric.Value}</span>
            <span>&deg;C</span>`;
  if (card.classList.contains(`d-none`)) {
    card.classList.remove(`d-none`);
  }
  // to check for daytime and night time
  if (data.weatherInfo.IsDayTime === true) {
    time.setAttribute(`src`, `img/day.svg`);
  } else if (data.weatherInfo.IsDayTime === false) {
    time.setAttribute(`src`, `img/night.svg`);
  }
  // to cheack for weatherIcon
  icon.setAttribute(`src`, `img/icons/${data.weatherInfo.WeatherIcon}.svg`);
}
if (localStorage.getItem(`city`)) {
  forecast
    .updateInfo(localStorage.getItem(`city`))
    .then((data) => {
      updateUI(data);
    })
    .catch((error) => {
      alert(error);
    });
}
