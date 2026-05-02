import React from 'react';

function CampoNumero({ id, label, min, step, value, onChange }) {
  return (
    <label className="field" htmlFor={id}>
      <span>{label}</span>
      <input
        id={id}
        min={min}
        step={step}
        type="number"
        value={value}
        onChange={(event) => onChange(event.target.valueAsNumber)}
      />
    </label>
  );
}

export default CampoNumero;
