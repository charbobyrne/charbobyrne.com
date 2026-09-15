export function mergeReadings(history, current, now = Date.now()) {
  const rows = new Map(history.map((row) => [Math.floor(Date.parse(row.timestamp) / 1000), { ...row }]));
  if (current.online) for (const sensor of current.sensors) {
    const timestamp = Date.parse(sensor.timestamp);
    if (!sensor.connected || sensor.stale || !Number.isFinite(sensor.temperature) || !Number.isFinite(timestamp) || now - timestamp > 5000 || timestamp > now + 1000) continue;
    const second = Math.floor(timestamp / 1000);
    const row = rows.get(second) || { timestamp: new Date(second * 1000).toISOString(), sensor1: null, sensor2: null };
    row[sensor.sensorId] = sensor.temperature;
    row.online = true;
    row[`${sensor.sensorId}Connected`] = true;
    rows.set(second, row);
  }
  return [...rows.entries()].filter(([second]) => second * 1000 >= now - 301000 && second * 1000 <= now)
    .sort(([a], [b]) => a - b).map(([, row]) => row);
}

const MAX_SMOOTHABLE_GAP_SECONDS = 30;

function smoothConnectedGaps(history, sensorId) {
  let previousIndex = -1;
  for (let index = 0; index < history.length; index += 1) {
    if (!Number.isFinite(history[index][sensorId])) continue;
    const missing = index - previousIndex - 1;
    if (previousIndex >= 0 && missing > 0 && missing <= MAX_SMOOTHABLE_GAP_SECONDS) {
      const connectedKey = `${sensorId}Connected`;
      const canSmooth = history.slice(previousIndex, index + 1)
        .every((row) => row.online !== false && row[connectedKey] !== false);
      if (canSmooth) {
        const start = history[previousIndex][sensorId];
        const end = history[index][sensorId];
        for (let offset = 1; offset <= missing; offset += 1) {
          history[previousIndex + offset][sensorId] = start + (end - start) * offset / (missing + 1);
        }
      }
    }
    previousIndex = index;
  }
}

export function mergeHistoryRefresh(serverHistory, localHistory) {
  const rows = new Map(serverHistory.map((row) => [row.timestamp, { ...row }]));
  for (const local of localHistory) {
    const server = rows.get(local.timestamp) || {};
    rows.set(local.timestamp, {
      ...server,
      ...local,
      sensor1: local.sensor1 ?? server.sensor1 ?? null,
      sensor2: local.sensor2 ?? server.sensor2 ?? null,
    });
  }
  return [...rows.values()].sort((a, b) => Date.parse(a.timestamp) - Date.parse(b.timestamp));
}

// Fixed one-second positions; absent records are explicit gaps, never interpolation.
export function historyWindow(history, now) {
  const end = Math.floor(now / 1000);
  const rows = new Map(history.map((row) => [Math.floor(Date.parse(row.timestamp) / 1000), row]));
  const window = Array.from({ length: 301 }, (_, index) => {
    const second = end - 300 + index;
    const row = rows.get(second);
    return { timestamp: new Date(second * 1000).toISOString(),
      sensor1: Number.isFinite(row?.sensor1) ? row.sensor1 : null,
      sensor2: Number.isFinite(row?.sensor2) ? row.sensor2 : null,
      online: row?.online,
      sensor1Connected: row?.sensor1Connected,
      sensor2Connected: row?.sensor2Connected };
  });
  smoothConnectedGaps(window, "sensor1");
  smoothConnectedGaps(window, "sensor2");
  return window;
}

export function displayConfirmed(sensor, command, online) {
  return online && sensor.displayEnabled === command.enabled &&
    Date.parse(sensor.displayTimestamp) >= Date.parse(command.requestedAt);
}
