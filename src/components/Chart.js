import React from 'react';
import Highcharts from 'react-highcharts';
import calcDate, { minutes } from '../calcDate.js';
import './Chart.css';

Highcharts.Highcharts.setOptions({ global: { useUTC: false } });

const defaultConfig = Object.freeze({
  chart: {
    type: 'column',
    height: '23%',
  },
  title: {
    text: null,
  },
  legend: {
    enabled: false
  },
});

export default function Chart({ loading, config, title, from, to }) {
  const finalConfig = {
    ...defaultConfig,
    ...{
      xAxis: {
        type: 'datetime',
        min: from.getTime(),
        max: calcDate(to, - 1 * minutes).getTime(),
      },
    },
    ...config
  }

  const wrapperClasses = ['Chart'];
  if (loading) {
    wrapperClasses.push('loading');
  }

  return (
    <div className={wrapperClasses.join(' ')}>
      <h2>{title}</h2>
      <div className="highchartsContainer">
        <Highcharts config={finalConfig} isPureConfig />
      </div>
    </div>
  );
}
