export function PlantCard({ 
  plantName, 
  plantType, 
  soilMoisture, 
  moistureLevel,
  lastWatered,
  onViewWeekly
}) {
  const moistureColors = {
    optimal: '#6b8e75',
    high: '#5a8a9a',
    low: '#d4a574'
  };

  return (
    <div className="bg-white rounded-3xl p-6 shadow-lg mb-4">
      <h3 className="text-[#2d5a3d] mb-1">{plantName}</h3>
      <p className="text-[#8b6f47] mb-4">{plantType}</p>
      
      <div className="flex items-center gap-2 mb-2">
        <div 
          className="w-3 h-3 rounded-full" 
          style={{ backgroundColor }}
        />
        <span className="text-[#8b6f47]">Soil Moisture:</span>
        <span className="text-[#8b6f47]">{soilMoisture}</span>
      </div>
      
      <p className="text-[#8b6f47] mb-4">
        <span>Last Watered:</span> {lastWatered}
      </p>
      
      <button 
        onClick={onViewWeekly}
        className="w-full bg-[#2d5a3d] text-white py-3 rounded-2xl hover-[#234a31] transition-colors text-center"
      >
        View Weekly Log
      </button>
    </div>
  );
}
