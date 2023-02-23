class Forecast {
  constructor() {
    this.key = `9bmDD4PegDCNZdPf0ZdhEJSrWxH6JVyy`;
    this.weatherURI = `http://dataservice.accuweather.com/locations/v1/cities/search`;
    this.cityURI = `http://dataservice.accuweather.com/currentconditions/v1/`;
  }
  async updateInfo(cityName) {
    const responseCity = await this.getCity(cityName);
    const responseID = await this.getCondition(responseCity.Key);
    // console.log(responseID);
    let data = { cityInfo: responseCity, weatherInfo: responseID };
    return data;
  }
  // request api from accuWeather to get city to get code
  async getCity(city) {
    const query = `?apikey=${this.key}&q=${city}`;
    const response = await fetch(this.weatherURI + query);
    // console.log(response);
    const data = await response.json();
    // console.log(data[0]);
    return data[0];
  }
  async getCondition(id) {
    const base = `${this.cityURI}`;
    const query = `${id}?apikey=${this.key}`;
    const response = await fetch(base + query);
    // console.log(response);
    let data = await response.json();
    // console.log(data);
    return data[0];
  }
}
