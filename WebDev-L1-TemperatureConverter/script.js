const form = document.querySelector("#converter-form");
const input = document.querySelector("#temperature");
const fromUnit = document.querySelector("#from-unit");
const errorMessage = document.querySelector("#error-message");
const summary = document.querySelector("#result-summary");
const resetButton = document.querySelector("#reset-button");

const ABSOLUTE_ZERO_C = -273.15;
const ABSOLUTE_ZERO_K = 0;

function toCelsius(value, unit) {
  if (unit === "C") return value;
  if (unit === "F") return (value - 32) * 5 / 9;
  return value - 273.15;
}

function fromCelsius(celsius) {
  return {
    C: celsius,
    F: celsius * 9 / 5 + 32,
    K: celsius + 273.15
  };
}

function formatTemperature(value) {
  const rounded = Math.abs(value) < 0.0000001 ? 0 : value;
  return rounded.toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 4
  });
}

function showError(message) {
  errorMessage.textContent = message;
}

function clearResults() {
  ["C", "F", "K"].forEach(unit => {
    document.querySelector(`#result-${unit}`).textContent = "—";
  });
  document.querySelectorAll(".result-tile").forEach(tile => tile.classList.remove("active"));
  summary.textContent = "Your converted values will appear here.";
}

form.addEventListener("submit", event => {
  event.preventDefault();
  showError("");

  const rawValue = input.value.trim();
  if (rawValue === "") {
    showError("Please enter a temperature value before converting.");
    input.focus();
    return;
  }

  const value = Number(rawValue);
  if (!Number.isFinite(value)) {
    showError("Please enter a valid numeric temperature.");
    input.focus();
    return;
  }

  const celsius = toCelsius(value, fromUnit.value);
  if (!Number.isFinite(celsius)) {
    showError("That value could not be converted. Check your input and try again.");
    return;
  }

  if (celsius < ABSOLUTE_ZERO_C - 1e-10) {
    const threshold = fromUnit.value === "F" ? "-459.67°F" : fromUnit.value === "K" ? "0 K" : "-273.15°C";
    showError(`That temperature is below absolute zero. The lowest possible temperature is ${threshold}.`);
    clearResults();
    return;
  }

  const results = fromCelsius(Math.max(celsius, ABSOLUTE_ZERO_C));
  ["C", "F", "K"].forEach(unit => {
    document.querySelector(`#result-${unit}`).textContent = formatTemperature(results[unit]);
  });

  document.querySelectorAll(".result-tile").forEach(tile => {
    tile.classList.toggle("active", tile.dataset.unit === fromUnit.value);
  });

  const unitNames = { C: "Celsius", F: "Fahrenheit", K: "Kelvin" };
  summary.textContent = `${formatTemperature(value)}°${fromUnit.value === "K" ? "" : fromUnit.value} ${unitNames[fromUnit.value]} converted successfully.`;
});

resetButton.addEventListener("click", () => {
  form.reset();
  showError("");
  clearResults();
  input.focus();
});

input.addEventListener("input", () => {
  if (errorMessage.textContent) showError("");
});
