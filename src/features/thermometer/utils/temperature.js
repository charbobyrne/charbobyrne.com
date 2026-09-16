export function convertTemperature(celsius, unit) {
  if (celsius === null) return null;
  return unit === "F" ? celsius * 9 / 5 + 32 : celsius;
}

export function formatTemperature(celsius, unit) {
  const converted = convertTemperature(celsius, unit);
  return converted === null ? "—" : converted.toFixed(1);
}

export function getTemperaturePresentation(deviceOnline, sensor) {
  const hasReading = Boolean(
    deviceOnline
      && sensor.connected
      && !sensor.stale
      && Number.isFinite(sensor.temperature),
  );

  if (hasReading) return { hasReading: true, message: "Live reading" };
  if (!deviceOnline) {
    return { hasReading: false, message: "No data available" };
  }
  if (!sensor.connected) {
    return { hasReading: false, message: "Unplugged sensor" };
  }
  if (sensor.stale) {
    return { hasReading: false, message: "No data available" };
  }
  return { hasReading: false, message: "No data available" };
}

