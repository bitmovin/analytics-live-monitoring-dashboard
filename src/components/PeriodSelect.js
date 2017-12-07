import React from 'react';
import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

import { minutes } from '../calcDate.js';

const periodMinutes = Object.freeze([15, 30, 60]);

export default function PeriodSelect({ currentPeriod, handlePeriodChange }) {
  return (
    <FormGroup controlId="periodSelectGroup">
      <ControlLabel>Period</ControlLabel>
      <FormControl
        componentClass="select"
        placeholder="select"
        value={currentPeriod}
        onChange={handlePeriodChange}
      >
        {periodMinutes.map((numMins) =>
          <option value={numMins * minutes} key={numMins}>
            Last {numMins} minutes
          </option>)}
      </FormControl>
    </FormGroup>
  );
}
