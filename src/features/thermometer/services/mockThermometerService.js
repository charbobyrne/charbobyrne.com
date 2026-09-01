const HISTORY_LIMIT = 300;
const UPDATE_INTERVAL_MS = 1000;

export const MOCK_SCENARIOS = Object.freeze({
  NORMAL: "normal",
  SENSOR_1_UNPLUGGED: "sensor1-unplugged",
  SENSOR_2_UNPLUGGED: "sensor2-unplugged",
  DEVICE_OFFLINE: "device-offline",
});

const listeners = new Set();
let timerId = null;
let scenario = MOCK_SCENARIOS.NORMAL;
let temperatures = { sensor1: 22, sensor2: 23 };
let displayState = { sensor1: true, sensor2: true };

function varyTemperature(value) {
  const nextValue = value + (Math.random() * 0.4 - 0.2);
  return Math.round(nextValue * 100) / 100;
}

function sensorIsConnected(sensorId) {
  if (scenario === MOCK_SCENARIOS.DEVICE_OFFLINE) return false;
  if (scenario === MOCK_SCENARIOS.SENSOR_1_UNPLUGGED) return sensorId !== "sensor1";
  if (scenario === MOCK_SCENARIOS.SENSOR_2_UNPLUGGED) return sensorId !== "sensor2";
  return true;
}

function createReading(timestamp) {
  const deviceOnline = scenario !== MOCK_SCENARIOS.DEVICE_OFFLINE;
  const sensor1Connected = sensorIsConnected("sensor1");
  const sensor2Connected = sensorIsConnected("sensor2");

  if (deviceOnline && sensor1Connected) {
    temperatures.sensor1 = varyTemperature(temperatures.sensor1);
  }

  if (deviceOnline && sensor2Connected) {
    temperatures.sensor2 = varyTemperature(temperatures.sensor2);
  }

  return {
    timestamp,
    sensor1: deviceOnline && sensor1Connected ? temperatures.sensor1 : null,
    sensor2: deviceOnline && sensor2Connected ? temperatures.sensor2 : null,
  };
}

function createSensor(sensorId, reading, timestamp) {
  const connected = sensorIsConnected(sensorId);
  const temperature = reading[sensorId];

  return {
    sensorId,
    temperature,
    unit: "C",
    timestamp: temperature === null ? null : timestamp,
    connected,
    stale: !connected,
    displayEnabled: displayState[sensorId],
  };
}

function seedHistory() {
  const now = Date.now();
  const history = [];

  for (let secondsAgo = HISTORY_LIMIT - 1; secondsAgo >= 0; secondsAgo -= 1) {
    history.push(createReading(new Date(now - secondsAgo * UPDATE_INTERVAL_MS).toISOString()));
  }

  return history;
}

let history = seedHistory();

function buildSnapshot() {
  const latest = history.at(-1);
  const online = scenario !== MOCK_SCENARIOS.DEVICE_OFFLINE;

  return {
    deviceId: "device1",
    online,
    lastSeen: online ? latest.timestamp : null,
    scenario,
    sensors: [
      createSensor("sensor1", latest, latest.timestamp),
      createSensor("sensor2", latest, latest.timestamp),
    ],
    history,
  };
}

let snapshot = buildSnapshot();

function publishSnapshot() {
  snapshot = buildSnapshot();
  listeners.forEach((listener) => listener());
}

function tick() {
  const reading = createReading(new Date().toISOString());
  history = [...history.slice(-(HISTORY_LIMIT - 1)), reading];
  publishSnapshot();
}

function start() {
  if (timerId === null) {
    timerId = window.setInterval(tick, UPDATE_INTERVAL_MS);
  }
}

function stop() {
  if (timerId !== null) {
    window.clearInterval(timerId);
    timerId = null;
  }
}

export const mockThermometerService = {
  getSnapshot() {
    return snapshot;
  },

  subscribe(listener) {
    listeners.add(listener);
    start();

    return () => {
      listeners.delete(listener);
      if (listeners.size === 0) stop();
    };
  },

  setScenario(nextScenario) {
    if (!Object.values(MOCK_SCENARIOS).includes(nextScenario)) {
      throw new Error(`Unknown mock scenario: ${nextScenario}`);
    }

    scenario = nextScenario;
    tick();
  },

  setDisplayEnabled(sensorId, enabled) {
    if (!(sensorId in displayState)) {
      throw new Error(`Unknown sensor: ${sensorId}`);
    }

    displayState = { ...displayState, [sensorId]: Boolean(enabled) };
    publishSnapshot();
  },

  reset() {
    scenario = MOCK_SCENARIOS.NORMAL;
    temperatures = { sensor1: 22, sensor2: 23 };
    displayState = { sensor1: true, sensor2: true };
    history = seedHistory();
    publishSnapshot();
  },
};

