import { Droplet } from 'lucide-react';

export function Weather({ location, currentConditions, forecast }) {
  if (!currentConditions || !forecast) {
    return (
      <div className="px-6 py-6 pb-24 bg-[#e8f0e8] text-center text-[#3d5a4a]">
        <h2 className="text-xl mb-4">Weather Data Unavailable</h2>
        <p>Please ensure a valid garden location is set for this community.</p>
      </div>
    );
  }
  
  const highRainDays = Array.isArray(forecast) ? forecast.filter(day => parseInt(day.rain) > 40).length : 0;
  
  const wateringSuggestion = highRainDays >= 2 
    ? 'Significant rain is expected this week, reduce watering by 30%.'
    : highRainDays >= 1
    ? 'Light rain expected, reduce watering by 15%.'
    : 'No significant rain expected, maintain regular watering schedule.';

  return (
    <div className="px-6 py-6 pb-24 bg-[#e8f0e8]">
      <h1 className="text-[#3d5a4a] text-3xl mb-8 text-center">{location} Garden Weather</h1>
      
      <div className="mb-6">
        <h2 className="text-[#3d5a4a]">Current Conditions</h2>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-8">
        {currentConditions.map((condition) => (
          <div key={condition.label} className="bg-white rounded-3xl p-6 shadow-md">
            <p className="text-[#6b8e75] text-sm mb-2">{condition.label}</p>
            <p className="text-[#3d5a4a] text-3xl">{condition.value}</p>
          </div>
        ))}
      </div>
      
      <div className="mb-6">
        <h2 className="text-[#3d5a4a]">7-Day Forecast</h2>
      </div>
      
      <div className="flex gap-4 overflow-x-auto pb-4 mb-6">
        {forecast.map((day, index) => (
          <div key={index} className="bg-white rounded-3xl p-6 shadow-md flex-shrink-0 w-40 text-center">
            <p className="text-[#3d5a4a] mb-4">{day.day}</p>
            <div className="text-5xl mb-4">{day.icon}</div>
            <p className="text-[#6b8e75] text-sm mb-2">{day.high}° / {day.low}°</p>
            <p className="text-[#6b8e75] text-sm">{day.rain} chance</p>
          </div>
        ))}
      </div>
      
      <div className="bg-[#c8ddc4] rounded-3xl p-6 shadow-md">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 bg-[#8b6f47] rounded-full flex items-center justify-center flex-shrink-0">
            <Droplet className="text-white" size={20} />
          </div>
          <div>
            <h3 className="text-[#5a7a66] mb-2">Watering Suggestions</h3>
            <p className="text-[#5a7a66]">{wateringSuggestion}</p>
          </div>
        </div>
      </div>
    </div>
  );
}