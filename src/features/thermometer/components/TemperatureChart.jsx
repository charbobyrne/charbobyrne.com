import { convertTemperature } from "../utils/temperature";

const VIEW_WIDTH = 1000;
const VIEW_HEIGHT = 360;
const PADDING = { top: 24, right: 24, bottom: 48, left: 64 };
const PLOT_WIDTH = VIEW_WIDTH - PADDING.left - PADDING.right;
const PLOT_HEIGHT = VIEW_HEIGHT - PADDING.top - PADDING.bottom;

function getRange(unit) {
  return unit === "F"
    ? { minimum: 50, maximum: 122, step: 18 }
    : { minimum: 10, maximum: 50, step: 10 };
}

function xPosition(index, total) {
  if (total <= 1) return PADDING.left + PLOT_WIDTH;
  return PADDING.left + index / (total - 1) * PLOT_WIDTH;
}

function yPosition(value, range) {
  const bounded = Math.min(range.maximum, Math.max(range.minimum, value));
  return PADDING.top
    + (range.maximum - bounded) / (range.maximum - range.minimum) * PLOT_HEIGHT;
}

function createLineSegments(history, sensorId, unit, range) {
  const segments = [];
  let currentSegment = [];

  history.forEach((reading, index) => {
    const value = convertTemperature(reading[sensorId], unit);

    if (value === null) {
      if (currentSegment.length > 0) segments.push(currentSegment);
      currentSegment = [];
      return;
    }

    currentSegment.push(`${xPosition(index, history.length)},${yPosition(value, range)}`);
  });

  if (currentSegment.length > 0) segments.push(currentSegment);
  return segments;
}

export default function TemperatureChart({ history, unit }) {
  const range = getRange(unit);
  const sensor1Segments = createLineSegments(history, "sensor1", unit, range);
  const sensor2Segments = createLineSegments(history, "sensor2", unit, range);
  const yTicks = Array.from(
    { length: Math.floor((range.maximum - range.minimum) / range.step) + 1 },
    (_, index) => range.minimum + index * range.step,
  );
  const xTicks = [-300, -240, -180, -120, -60, 0];

  return (
    <section className="card thermometerChartPanel" aria-labelledby="temperature-history-title">
      <div className="thermometerChartHeader">
        <div>
          <div className="kicker">Rolling local history</div>
          <h2 id="temperature-history-title">Previous 300 Seconds</h2>
        </div>
        <div className="thermometerChartLegend" aria-label="Chart legend">
          <span><i className="sensor1" />Sensor 1</span>
          <span><i className="sensor2" />Sensor 2</span>
        </div>
      </div>

      <div className="thermometerChartScroller">
        <svg
          className="thermometerChart"
          viewBox={`0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}`}
          role="img"
          aria-label={`Two-sensor temperature history in degrees ${unit === "C" ? "Celsius" : "Fahrenheit"}. Missing readings appear as gaps.`}
        >
          {yTicks.map((tick) => {
            const y = yPosition(tick, range);
            return (
              <g key={tick}>
                <line className="thermometerGridLine" x1={PADDING.left} x2={VIEW_WIDTH - PADDING.right} y1={y} y2={y} />
                <text className="thermometerAxisLabel" x={PADDING.left - 12} y={y + 4} textAnchor="end">
                  {tick}°
                </text>
              </g>
            );
          })}

          {xTicks.map((tick, index) => {
            const x = PADDING.left + index / (xTicks.length - 1) * PLOT_WIDTH;
            return (
              <g key={tick}>
                <line className="thermometerGridLine thermometerVerticalGrid" x1={x} x2={x} y1={PADDING.top} y2={PADDING.top + PLOT_HEIGHT} />
                <text className="thermometerAxisLabel" x={x} y={VIEW_HEIGHT - 18} textAnchor="middle">
                  {tick}s
                </text>
              </g>
            );
          })}

          {sensor1Segments.map((points, index) => (
            <polyline key={`sensor1-${index}`} className="thermometerDataLine sensor1" points={points.join(" ")} />
          ))}
          {sensor2Segments.map((points, index) => (
            <polyline key={`sensor2-${index}`} className="thermometerDataLine sensor2" points={points.join(" ")} />
          ))}
        </svg>
      </div>

      <p className="thermometerChartNote">
        New mock readings appear on the right. Missing sensor values create a gap rather than a zero reading.
      </p>
    </section>
  );
}

