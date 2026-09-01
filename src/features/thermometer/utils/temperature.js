export function convertTemperature(celsius, unit) {
  if (celsius === null) return null;
  return unit === "F" ? celsius * 9 / 5 + 32 : celsius;
}

export function formatTemperature(celsius, unit) {
  const converted = convertTemperature(celsius, unit);
  return converted === null ? "—" : converted.toFixed(1);
}

