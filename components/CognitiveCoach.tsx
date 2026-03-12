
import React, { useState, useCallback } from 'react';
import { type Driver, TrackTurn } from '../types';
import { getCoachingNotes } from '../services/geminiService';
import { BrainIcon, SparklesIcon } from './Icons';

interface CognitiveCoachProps {
  selectedDriver: Driver | null;
}

const CognitiveCoach: React.FC<CognitiveCoachProps> = ({ selectedDriver }) => {
  const [selectedTurn, setSelectedTurn] = useState<TrackTurn>(TrackTurn.Turn1);
  const [coachingNotes, setCoachingNotes] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateNotes = useCallback(async () => {
    if (!selectedDriver) {
      setError("Please select a driver first.");
      return;
    }
    
    setIsLoading(true);
    setError(null);
    setCoachingNotes('');

    try {
      const notes = await getCoachingNotes(selectedTurn, selectedDriver);
      setCoachingNotes(notes);
    } catch (e) {
      console.error(e);
      setError("Failed to get coaching notes. Please check the API key and try again.");
    } finally {
      setIsLoading(false);
    }
  }, [selectedDriver, selectedTurn]);

  return (
    <div className="bg-race-surface p-4 rounded-xl border border-gray-700 shadow-lg">
      <div className="flex items-center gap-3 mb-4">
        <BrainIcon className="w-6 h-6 text-race-accent" />
        <h2 className="text-xl font-bold text-white">Cognitive Rehearsal</h2>
      </div>

      <div className="space-y-4">
        <div>
          <label htmlFor="turn-select" className="block text-sm font-medium text-race-text-dim mb-1">
            Select Track Section
          </label>
          <select
            id="turn-select"
            value={selectedTurn}
            onChange={(e) => setSelectedTurn(e.target.value as TrackTurn)}
            className="w-full bg-gray-900/50 border border-gray-600 rounded-md p-2 text-race-text focus:ring-race-accent focus:border-race-accent"
          >
            {Object.values(TrackTurn).map((turn) => (
              <option key={turn} value={turn}>{turn}</option>
            ))}
          </select>
        </div>

        <button
          onClick={handleGenerateNotes}
          disabled={isLoading || !selectedDriver}
          className="w-full flex items-center justify-center gap-2 bg-race-accent hover:bg-orange-600 disabled:bg-gray-500 text-white font-bold py-2 px-4 rounded-md transition-colors"
        >
          {isLoading ? (
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : (
             <SparklesIcon className="w-5 h-5"/>
          )}
          <span>{isLoading ? 'Analyzing...' : 'Get AI Rehearsal Cue'}</span>
        </button>

        {error && <p className="text-red-400 text-sm">{error}</p>}

        <div className="bg-gray-900/50 p-4 rounded-lg min-h-[100px] text-race-text-dim">
            <h4 className="font-semibold text-race-text mb-2">AI Generated Insight:</h4>
            {coachingNotes ? (
                <p className="text-sm whitespace-pre-wrap font-mono">{coachingNotes}</p>
            ) : (
                <p className="text-sm italic">{isLoading ? "Generating insights..." : "Your coaching notes will appear here."}</p>
            )}
        </div>
      </div>
    </div>
  );
};

export default CognitiveCoach;
