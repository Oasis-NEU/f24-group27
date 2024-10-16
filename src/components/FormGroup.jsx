// src/components/FormGroup.jsx
import React from 'react';
import './FormGroup.css'; // Import specific styles for the form group

const FormGroup = ({ label, type, id, name, value, onChange }) => (
  <div className="form-group">
    <label htmlFor={id}>{label}</label> {/* Proper label for accessibility */}
    <input
      type={type}
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      required
    />
  </div>
);

export default FormGroup;



