
import React from 'react';
import Plot from 'react-plotly.js';
import { type RaceData, type Driver } from '../types';
import { ChartIcon, TrophyIcon } from './Icons';

interface DashboardProps {
  data: RaceData;
  onDriverSelect: (driver: Driver) => void;
  selectedDriver: Driver | null;
}

const Dashboard: React.FC<DashboardProps> = ({ data, onDriverSelect, selectedDriver }) => {
  const plotLayoutDefaults = {
    paper_bgcolor: 'rgba(0,0,0,0)',
    plot_bgcolor: 'rgba(0,0,0,0)',
    font: { color: '#E5E7EB' },
    xaxis: { gridcolor: '#4B5563' },
    yaxis: { gridcolor: '#4B5563' },
  };

  const handleBarClick = (event: any) => {
    if (event.points && event.points.length > 0) {
      const pointIndex = event.points[0].pointIndex;
      const driver = data.drivers[pointIndex];
      onDriverSelect(driver);
    }
  };

  return (
    <div className="bg-race-surface p-4 rounded-xl border border-gray-700 shadow-lg">
      <div className="flex items-center gap-3 mb-4">
        <ChartIcon className="w-6 h-6 text-race-accent" />
        <h2 className="text-xl font-bold text-white">Race Analytics</h2>
      </div>

      <div className="mb-6 p-4 rounded-lg bg-gray-900/50">
        <h3 className="text-lg font-semibold text-race-accent flex items-center gap-2">
            <TrophyIcon className="w-5 h-5"/>
            Selected Driver
        </h3>
        {selectedDriver ? (
            <div className="mt-2 text-sm grid grid-cols-2 gap-x-4 gap-y-1 font-mono">
                <span className="text-race-text-dim">Name:</span> <span>{selectedDriver.DRIVER}</span>
                <span className="text-race-text-dim">Car #:</span> <span>{selectedDriver.NUMBER}</span>
                <span className="text-race-text-dim">Team:</span> <span>{selectedDriver.TEAM}</span>
                <span className="text-race-text-dim">FL Time:</span> <span className="text-race-blue font-bold">{selectedDriver.FL_TIME}</span>
            </div>
        ) : (
            <p className="text-race-text-dim mt-2">Select a driver from the chart below.</p>
        )}
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2 text-white">Fastest Lap Time by Driver</h3>
        <Plot
          data={[
            {
              x: data.drivers.map(d => `#${d.NUMBER} ${d.DRIVER.split(' ')[1]}`),
              y: data.drivers.map(d => d.FL_TIME_SECONDS),
              type: 'bar',
              marker: {
                color: data.drivers.map(d => d.NUMBER === selectedDriver?.NUMBER ? '#F97316' : '#3B82F6'),
              },
              hovertemplate: 'Driver: %{x}<br>Time: %{customdata}s<extra></extra>',
              customdata: data.drivers.map(d => d.FL_TIME)
            },
          ]}
          layout={{
            ...plotLayoutDefaults,
            title: 'Fastest Lap Time (seconds)',
            xaxis: { title: 'Driver', tickangle: -45 },
            yaxis: { title: 'Time (s)', autorange: 'reversed' },
            bargap: 0.2,
          }}
          useResizeHandler={true}
          style={{ width: '100%', height: '300px' }}
          config={{ displayModeBar: false }}
          onClick={handleBarClick}
        />
      </div>
    </div>
  );
};

export default Dashboard;
