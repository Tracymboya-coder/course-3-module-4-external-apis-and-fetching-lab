document.getElementById("fetch-alerts").addEventListener("click", () => {
  const input = document.getElementById("location-input");
  const state = input.value.trim().toUpperCase();

  const errorDiv = document.getElementById("error-message");
  const displayDiv = document.getElementById("alerts-display");

  // Reset UI every click
  errorDiv.textContent = "";
  errorDiv.classList.add("hidden");
  displayDiv.innerHTML = "";

  if (!state) {
    errorDiv.textContent = "Please enter a state code";
    errorDiv.classList.remove("hidden");
    return;
  }

  fetchWeatherAlerts(state)
    .then(data => {
      displayAlerts(data);
      input.value = ""; // clear input on success
    })
    .catch(error => {
      errorDiv.textContent = error.message;
      errorDiv.classList.remove("hidden");
    });
});

// STEP 1: FETCH DATA
function fetchWeatherAlerts(state) {
  return fetch(`https://api.weather.gov/alerts/active?area=${state}`)
    .then(response => {
      if (!response.ok) {
        throw new Error("Network failure");
      }
      return response.json();
    })
    .then(data => {
      console.log(data);
      return data;
    })
    .catch(error => {
      console.log(error.message);
      throw error;
    });
}

// STEP 2: DISPLAY DATA
function displayAlerts(data) {
  const displayDiv = document.getElementById("alerts-display");

  const alerts = data.features || [];

  // Summary
  const summary = document.createElement("h2");
  summary.textContent = `Weather Alerts: ${alerts.length}`;
  displayDiv.appendChild(summary);

  // List alerts
  const ul = document.createElement("ul");

  alerts.forEach(alert => {
    const li = document.createElement("li");
    li.textContent = alert.properties.headline;
    ul.appendChild(li);
  });

  displayDiv.appendChild(ul);
}
