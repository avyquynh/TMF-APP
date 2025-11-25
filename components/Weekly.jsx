import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

export function Weekly({ 
  plants
}>;
}) {
  const [weekStart, setWeekStart] = useState('October 19, 2025');
  const [weekEnd, setWeekEnd] = useState('October 26, 2025');

  // Calculate optimal moisture band percentages
  const totalTime = 168; // hours in a week
  const tooDry = 15;
  const optimal = 75;
  const tooWet = 10;

  return (
    <div className="min-h-screen bg-[#2d4a3d] pb-24">
      <div className="bg-[#1e3329] px-6 py-6 text-center">
        <h3 className="text-white">Weekly Report</h3>
        <div className="flex items-center justify-center gap-4 mt-2">
          <button onClick={() => {/* Previous week */}}>
            <ChevronLeft className="text-white" size={24} />
          </button>
          <p className="text-white">{weekStart} - {weekEnd}</p>
          <button onClick={() => {/* Next week */}}>
            <ChevronRight className="text-white" size={24} />
          </button>
        </div>
      </div>
      
      <div className="px-6 py-8">
        <div className="mb-8">
          <h2 className="text-white mb-6">Moisture Levels</h2>
          
          <div className="bg-[#1e3329] rounded-3xl p-6">
            <div className="flex items-end justify-around h-64 mb-4">
              {plants.map((plant, index) => {
                const height = (plant.currentMoisture / 100) * 100;
                const colors = ['#6b8e75', '#7a9d85', '#5a7a66', '#6b9d8e', '#7aa595'];
                return (
                  <div key={plant.id} className="flex flex-col items-center flex-1">
                    <div 
                      className="w-full mx-1 rounded-t-xl transition-all"
                      style={{ 
                        height: `${height}%`,
                        backgroundColor % colors.length]
                      }}
                    />
                  </div>
                );
              })}
            </div>
            <div className="flex justify-around text-white text-xs">
              {plants.map((plant) => (
                <div key={plant.id} className="text-center flex-1">
                  <p>{plant.name}</p>
                  <p className="opacity-75">{plant.type}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="mb-8">
          <h2 className="text-white mb-6">Time in Optimal Moisture Band</h2>
          
          <div className="bg-[#1e3329] rounded-3xl p-6">
            <div className="flex h-12 rounded-full overflow-hidden mb-4">
              <div 
                className="bg-[#c8a962] flex items-center justify-center"
                style={{ width: `${tooDry}%` }}
              />
              <div 
                className="bg-[#6b8e75] flex items-center justify-center"
                style={{ width: `${optimal}%` }}
              />
              <div 
                className="bg-[#5a8a9a] flex items-center justify-center"
                style={{ width: `${tooWet}%` }}
              />
            </div>
            <div className="flex justify-between text-white text-sm">
              <span>Too Dry ({tooDry}%)</span>
              <span>Optimal ({optimal}%)</span>
              <span>Too Wet ({tooWet}%)</span>
            </div>
          </div>
        </div>
        
        <div>
          <h2 className="text-white mb-6">pH Levels</h2>
          
          <div className="bg-[#1e3329] rounded-3xl p-6 space-y-6">
            {plants.map((plant) => {
              const phPercent = ((plant.ph - 5) / 4) * 100; // pH 5-9 scale mapped to 0-100%
              return (
                <div key={plant.id}>
                  <div className="flex justify-between text-white mb-2">
                    <span className="text-sm">{plant.name} - {plant.type}</span>
                    <span className="text-sm">{plant.ph}</span>
                  </div>
                  <div className="relative h-8 bg-gradient-to-r from-[#8b6f7a] via-[#6b8e75] to-[#7aa595] rounded-full">
                    <div 
                      className="absolute top-1/2 -translate-y-1/2 w-1 h-10 bg-white rounded-full"
                      style={{ left: `${phPercent}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
