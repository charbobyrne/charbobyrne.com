export function sensorReadingAvailable(systemOn, connected) {
  return Boolean(systemOn && connected);
}

export function formatTemperature(value) {
  return Number(value).toFixed(1);
}

export function formatDisplayLine(sensorId, sensor, displayEnabled, systemOn) {
  if (!systemOn) return "";
  const prefix = sensorId === "sensor1" ? "S1:" : "S2:";
  if (!displayEnabled) return `${prefix} OFF`;
  if (!sensor.connected) return `${prefix} Disconnected`;
  return `${prefix} ${formatTemperature(sensor.temperature)} C`;
}

