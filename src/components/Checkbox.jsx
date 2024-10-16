// src/components/Checkbox.jsx
import React from 'react';
import './Checkbox.css';

const Checkbox = ({ isChecked, onChange, label }) => (
  <div className="checkbox-container">
    <input
      type="checkbox"
      checked={isChecked}
      onChange={onChange}
    />
    <label>{label}</label>
  </div>
);

export default Checkbox;

