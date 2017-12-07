import React from 'react';
import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import './LicenseKeySelect.css';

export default function LicenseKeySelect({ currentLicenseKey, handleLicenseChange, licenses }) {
  return (
    <FormGroup controlId="formControlsSelect" bsSize="small" className="LicenseKeySelect">
      <ControlLabel>License</ControlLabel>
      <FormControl
        componentClass="select"
        placeholder="select"
        value={currentLicenseKey}
        onChange={handleLicenseChange}
      >
        {licenses.map(({ name, licenseKey }) =>
          <option value={licenseKey} key={licenseKey}>
            {name || licenseKey}
          </option>)}
      </FormControl>
    </FormGroup>
  );
}
