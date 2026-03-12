import React, { useState, useEffect } from 'react';
import TrackScene from './components/TrackScene';
import Dashboard from './components/Dashboard';
import CognitiveCoach from './components/CognitiveCoach';
import { type Driver, type RaceData } from './types';
import rawData from './data/race.json';
import { LogoIcon } from './components/Icons';

const App: React.FC = () => {
  const [raceData, setRaceData] = useState<RaceData | null>(null);
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);

  useEffect(() => {
    // In a real app, you might fetch this data. Here we use the imported JSON.
    const processedData: RaceData = {
      drivers: rawData.map(d => ({
        ...d,
        FL_TIME_SECONDS: parseFloat(d.FL_TIME.split(':').reduce((acc, time) => (60 * acc) + +time, 0).toFixed(3)),
      })).sort((a, b) => a.FL_TIME_SECONDS - b.FL_TIME_SECONDS)
    };
    setRaceData(processedData);
    setSelectedDriver(processedData.drivers[0]); // Select the fastest driver by default
  }, []);

  const handleDriverSelect = (driver: Driver) => {
    setSelectedDriver(driver);
  };

  return (
    <main className="bg-race-bg text-race-text font-sans min-h-screen">
      <div className="flex flex-col lg:flex-row h-screen p-4 gap-4">
        
        {/* Left Side: 3D Visualization */}
        <div className="lg:w-2/3 h-1/2 lg:h-full flex flex-col rounded-xl bg-race-surface overflow-hidden border border-gray-700 shadow-2xl">
          <header className="p-4 bg-gray-900/50 border-b border-gray-700 flex items-center gap-3">
            <LogoIcon className="h-8 w-8 text-race-accent"/>
            <div>
              <h1 className="text-xl font-bold text-white">RaceMind 3D</h1>
              <p className="text-sm text-race-text-dim">Cognitive Visualization & Race Intelligence</p>
            </div>
          </header>
          <div className="flex-grow w-full h-full">
            <TrackScene />
          </div>
        </div>

        {/* Right Side: Dashboard & AI Coach */}
        <div className="lg:w-1/3 h-1/2 lg:h-full flex flex-col gap-4 overflow-y-auto">
          {raceData ? (
            <>
              <Dashboard 
                data={raceData}
                onDriverSelect={handleDriverSelect}
                selectedDriver={selectedDriver}
              />
              <CognitiveCoach selectedDriver={selectedDriver} />
            </>
          ) : (
            <div className="flex items-center justify-center h-full text-race-text-dim">
              Loading Race Data...
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default App;