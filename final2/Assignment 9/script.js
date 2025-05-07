function getWeather() {
    const xhr = new XMLHttpRequest(); //create httpxml request object
    xhr.open("GET", "weatherData.json", true); // get is the http request weather.json is the file which loads data and true is for async request
    xhr.onload = function() {
      if (xhr.status === 200) {
        const data = JSON.parse(xhr.responseText); //converts to json
        const city = document.getElementById("cityname").value // gets the value from input box
        const weather = data[city]; 
        document.getElementById("result").innerHTML = weather
          ? `<div class="card d-block mx-auto" style="width: 18rem;">
              <div class="card-header">Weather</div>
              <ul class="list-group list-group-flush">
                <li class="list-group-item">Temp: ${weather.temperature}°C</li>
                <li class="list-group-item">Humidity: ${weather.humidity}%</li>
                <li class="list-group-item">Condition: ${weather.condition}</li>
              </ul>
            </div>`
          : `<div class="text-center">City not found.</div>`;
      }
    };
    xhr.send();
  }