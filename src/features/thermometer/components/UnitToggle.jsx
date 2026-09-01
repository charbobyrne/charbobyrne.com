export default function UnitToggle({ unit, onChange }) {
  return (
    <fieldset className="thermometerUnitToggle">
      <legend>Temperature unit</legend>
      {[
        { value: "C", label: "°C" },
        { value: "F", label: "°F" },
      ].map((option) => (
        <button
          key={option.value}
          type="button"
          className={unit === option.value ? "isActive" : ""}
          onClick={() => onChange(option.value)}
          aria-pressed={unit === option.value}
        >
          {option.label}
        </button>
      ))}
    </fieldset>
  );
}

