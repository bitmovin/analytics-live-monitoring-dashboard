import React from 'react';
import Chart from './Chart.js';

export default function UserChart({ loading, data, from, to}) {
  const config = {
    yAxis: {
      min: 0,
      allowDecimals: false,
      title: {
        text: 'Viewers',
      },
    },
    series: [{
      name: 'Users watching',
      data
    }],
  };

  return <Chart config={config} title="Audience" loading={loading} from={from} to={to} />
}
