import { X, Droplet, Thermometer, Beaker } from 'lucide-react';

export function PlantDetailModal({
  plant,
  onClose
}) {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  
  // Calculate the path for the line chart
  const maxMoisture = Math.max(...plant.moistureHistory);
  const minMoisture = Math.min(...plant.moistureHistory);
  const range = maxMoisture - minMoisture || 1;
  
  const points = plant.moistureHistory.map((value, index) => {
    // X coordinate is normalized from 0 to 100 based on index
    const x = (index / (plant.moistureHistory.length - 1)) * 100;
    // Y coordinate is inverted (high moisture is low Y) and scaled from 10 to 90
    const y = 100 - ((value - minMoisture) / range) * 80 - 10;
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className="fixed inset-0 bg-[#c8ddc4] z-[100] overflow-y-auto">
      <div className="min-h-screen pb-24">
        <div className="p-6 pb-4 flex justify-between items-start sticky top-0 bg-[#c8ddc4] z-10">
          <div>
            <h2 className="text-[#2d5a3d] text-3xl">{plant.name}</h2>
            <p className="text-[#6b8e75]">{plant.type}</p>
          </div>
          <button
            onClick={onClose}
            className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center hover:bg-gray-100 transition-colors" // Corrected hover class syntax
          >
            <X className="text-[#8b6f47]" size={24} />
          </button>
        </div>
        
        <div className="px-6 pb-6 space-y-4">
          <div className="bg-white rounded-3xl p-6 shadow-lg">
            <h3 className="text-[#2d5a3d] mb-2">Soil Moisture</h3>
            <p className="text-[#8b6f47] text-sm mb-4">Last 7 Days</p>
            
            <div className="flex items-end gap-2 mb-4">
              <span className="text-[#2d5a3d] text-5xl">{plant.currentMoisture}%</span>
              <span className="text-[#8b6f47] mb-2">Current</span>
            </div>
            
            <div className="relative h-32 mb-2">
              <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <polyline
                  points={points}
                  fill="none"
                  stroke="#6b8e75"
                  strokeWidth="2"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>
            </div>
            
            <div className="flex justify-between text-[#8b6f47] text-sm">
              {days.map((day) => (
                <span key={day}>{day}</span>
              ))}
            </div>
          </div>
          
          <div className="bg-white rounded-3xl p-6 shadow-lg">
            <h3 className="text-[#2d5a3d] mb-4">Current Conditions</h3>
            
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-[#f5f0eb] rounded-2xl p-4 text-center">
                <Beaker className="text-[#8b6f47] mx-auto mb-2" size={24} />
                <p className="text-[#8b6f47] text-sm mb-1">pH</p>
                <p className="text-[#2d5a3d] text-xl">{plant.ph}</p>
              </div>
              
              <div className="bg-[#f5f0eb] rounded-2xl p-4 text-center">
                <Thermometer className="text-[#8b6f47] mx-auto mb-2" size={24} />
                <p className="text-[#8b6f47] text-sm mb-1">Temp</p>
                <p className="text-[#2d5a3d] text-xl">{plant.temperature}°C</p>
              </div>
              
              <div className="bg-[#f5f0eb] rounded-2xl p-4 text-center">
                <Droplet className="text-[#8b6f47] mx-auto mb-2" size={24} />
                <p className="text-[#8b6f47] text-sm mb-1">Humidity</p>
                <p className="text-[#2d5a3d] text-xl">{plant.humidity}%</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-3xl p-6 shadow-lg">
            <h3 className="text-[#2d5a3d] mb-4">Watering History</h3>
            
            <div className="space-y-3">
              {plant.wateringHistory.map((entry, index) => (
                <div key={index} className="flex items-center gap-4 bg-[#f5f0eb] rounded-2xl p-4">
                  <div className="w-10 h-10 bg-[#c8ddc4] rounded-full flex items-center justify-center flex-shrink-0">
                    <Droplet className="text-[#6b8e75]" size={20} />
                  </div>
                  <div className="flex-1">
                    <p className="text-[#2d5a3d]">{entry.date}</p>
                    <p className="text-[#8b6f47] text-sm">{entry.user}</p>
                  </div>
                  <span className="text-[#5a8a9a] text-xl">{entry.amount} L</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}