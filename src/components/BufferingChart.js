import React from 'react';
import Chart from './Chart.js';

export default function BufferingChart({ loading, data, from, to}) {
  const config = {
    chart: {
      type: 'column',
      height: '12%',
    },
    yAxis: {
      min: 0,
      allowDecimals: false,
      title: {
        text: 'Rebufferings',
      },
    },
    series: [{
      name: 'Users needing to rebuffer',
      color: 'hsl(30, 90%, 78%)',
      data
    }],
  };

  return <Chart config={config} title="Buffering" loading={loading} from={from} to={to} />
}
