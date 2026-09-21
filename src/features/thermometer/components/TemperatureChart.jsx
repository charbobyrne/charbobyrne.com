import { useEffect, useState } from "react";
import { historyWindow } from "../utils/history.js";
import { classifyGraphValue, convertTemperature } from "../utils/temperature";

const VIEW_WIDTH = 1000;
const VIEW_HEIGHT = 300;
const PADDING = { top: 20, right: 58, bottom: 42, left: 20 };
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
  let currentSegment = null;

  function finishSegment() {
    if (currentSegment?.points.length) segments.push(currentSegment);
    currentSegment = null;
  }

  history.forEach((reading, index) => {
    const value = convertTemperature(reading[sensorId], unit);

    if (value === null) {
      finishSegment();
      return;
    }

    const point = `${xPosition(index, history.length)},${yPosition(value, range)}`;
    const condition = classifyGraphValue(value, range);
    if (!currentSegment) {
      currentSegment = { condition, points: [point] };
    } else if (currentSegment.condition === condition) {
      currentSegment.points.push(point);
    } else {
      const previousPoint = currentSegment.points.at(-1);
      finishSegment();
      currentSegment = { condition, points: [previousPoint, point] };
    }
  });

  finishSegment();
  return segments;
}

export default function TemperatureChart({ history: storedHistory, unit }) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, []);
  const history = historyWindow(storedHistory, now);
  const range = getRange(unit);
  const sensor1Segments = createLineSegments(history, "sensor1", unit, range);
  const sensor2Segments = createLineSegments(history, "sensor2", unit, range);
  const yTicks = Array.from(
    { length: Math.floor((range.maximum - range.minimum) / range.step) + 1 },
    (_, index) => range.minimum + index * range.step,
  );
  const xTicks = [300, 240, 180, 120, 60, 0];

  return (
    <section className="card thermometerChartPanel" aria-labelledby="temperature-history-title">
      <div className="thermometerChartHeader">
        <div>
          <div className="kicker">Recorded sensor history</div>
          <h2 id="temperature-history-title">Previous 300 Seconds</h2>
        </div>
        <div className="thermometerChartLegend" aria-label="Chart legend">
          <span><i className="sensor1" />Sensor 1</span>
          <span><i className="sensor2" />Sensor 2</span>
          <span><i className="sensor1Low" />Sensor 1 low</span>
          <span><i className="sensor2Low" />Sensor 2 low</span>
          <span><i className="sensor1High" />Sensor 1 high</span>
          <span><i className="sensor2High" />Sensor 2 high</span>
        </div>
      </div>

      <div className="thermometerChartScroller">
        {history.every((point) => point.sensor1 === null && point.sensor2 === null) && (
          <p className="thermometerEmptyHistory" role="status">
            No readings in the last 300 seconds. The time window continues scrolling.
          </p>
        )}
        <svg
          className="thermometerChart"
          viewBox={`0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}`}
          role="img"
          aria-label={`Two-sensor temperature history in degrees ${unit === "C" ? "Celsius" : "Fahrenheit"}. Missing readings appear as gaps. Sensor 1 is dark blue when low and red when high. Sensor 2 is purple when low and yellow when high.`}
        >
          {yTicks.map((tick) => {
            const y = yPosition(tick, range);
            return (
              <g key={tick}>
                <line className="thermometerGridLine" x1={PADDING.left} x2={VIEW_WIDTH - PADDING.right} y1={y} y2={y} />
                <text className="thermometerAxisLabel" x={VIEW_WIDTH - PADDING.right + 12} y={y + 4} textAnchor="start">
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

          <line
            className="thermometerAxisLine"
            x1={VIEW_WIDTH - PADDING.right}
            x2={VIEW_WIDTH - PADDING.right}
            y1={PADDING.top}
            y2={PADDING.top + PLOT_HEIGHT}
          />

          {sensor1Segments.map((segment, index) => (
            <polyline key={`sensor1-${index}`} className={`thermometerDataLine sensor1 ${segment.condition}`} points={segment.points.length === 1 ? `${segment.points[0]} ${segment.points[0]}` : segment.points.join(" ")} />
          ))}
          {sensor2Segments.map((segment, index) => (
            <polyline key={`sensor2-${index}`} className={`thermometerDataLine sensor2 ${segment.condition}`} points={segment.points.length === 1 ? `${segment.points[0]} ${segment.points[0]}` : segment.points.join(" ")} />
          ))}
        </svg>
      </div>

      <p className="thermometerChartNote">
        Horizontal axis: seconds ago. Missing readings are gaps. At the bottom edge, low Sensor 1 readings are dark blue and low Sensor 2 readings are purple. At the top edge, high Sensor 1 readings are red and high Sensor 2 readings are yellow.
      </p>
    </section>
  );
}
