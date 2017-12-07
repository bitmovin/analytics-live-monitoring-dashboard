import React from 'react';
import { Table } from 'react-bootstrap';
import errors from '../errors.js';
import { minutes } from '../calcDate';
import './ErrorTable.css';

const errorMapping = errors
  .reduce((errorMap, { errorCode, errorMessage }) => ({ ...errorMap, [errorCode]: errorMessage }));

export default function ErrorTable({ selectedTimestamp, selectedSeriesName, onSelectSeriesName,
  onSelectTimestamp, data, from, to, loading }) {
  if (!selectedTimestamp) {
    return '';
  }

  const selectedDate = new Date(selectedTimestamp);
  const formattedTime = [selectedDate.getHours(), selectedDate.getMinutes()]
    .map(num => `0${num}`.slice(-2)) // padding 0
    .join(':');

  const errorRows = data
    .filter(([timestamp,]) => timestamp === selectedTimestamp)
    .sort((a, b) =>  b[2] - a[2] || a[1] - b[1]) // desc by occurrence, then acs by error code
    // Since we query multiple times, it's possible that the rows contain duplicates.
    // After sorting, these duplicates are subsequent
    .filter((row, index, array) => index === 0 || array[index - 1][1] !== row[1]);

  const wrapperClasses = ['ErrorTable'];
  if (loading) {
    wrapperClasses.push('loading');
  }

  return (
    <div className={wrapperClasses.join(' ')}>
      <h2>
        <button
          type="button"
          onClick={() => onSelectTimestamp(selectedTimestamp - 1 * minutes)}
          disabled={selectedTimestamp <= from}
        >
          ＜
        </button>
        Errors at {formattedTime}
        <button
          type="button"
          onClick={() => onSelectTimestamp(selectedTimestamp + 1 * minutes)}
          disabled={selectedTimestamp + 1 * minutes >= to}
        >
          ＞
        </button>
      </h2>
      <Table striped condensed hover>
        <thead>
          <tr>
            <th>Code</th>
            <th>Description</th>
            <th>Occurrences</th>
          </tr>
        </thead>
        <tbody>
          {errorRows.map(([, errorCode, occurrences]) =>
            <tr
              key={errorCode}
              className={`${errorCode}` === selectedSeriesName ? 'highlighted' : null}
              onClick={() => onSelectSeriesName(`${errorCode}`)}
            >
              <td>{errorCode}</td>
              <td>{errorMapping[errorCode]}</td>
              <td>{occurrences}</td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  )
}
