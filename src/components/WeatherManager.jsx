import React, { useState, useEffect } from 'react';
import { Droplet, Search } from 'lucide-react';

const apiKey = ""; 
const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;

function parseWeatherResponse(toolResponseJson, location) {
  try {
    const data = JSON.parse(toolResponseJson);
    if (!data.current_conditions || !data.daily_forecasts) {
        console.error("Incomplete weather data structure received.");
        return null;
    }

    const current = data.current_conditions.current_weather_conditions;
    const forecastList = data.daily_forecasts.daily_weather_forecasts;

    // 1. Current Conditions
    const currentConditions = [
      { label: 'Temperature', value: current.temperature },
      { label: 'Humidity', value: current.humidity },
      { label: 'Wind Speed', value: current.wind.speed },
      { label: 'Rain Chance', value: current.precipitation.chance }
    ];

    // 2. 7-Day Forecast
    const forecast = forecastList.slice(0, 7).map(day => {
      const date = new Date(day.forecast_day);
      const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'short' });
      
      let icon = '❓';
      const condition = day.day_time_condition.toLowerCase();
      if (condition.includes('sun') || condition.includes('clear')) {
        icon = '☀️';
      } else if (condition.includes('cloud')) {
        icon = '☁️';
      } else if (condition.includes('rain') || condition.includes('showers')) {
        icon = '🌧️';
      } else if (condition.includes('partly cloud')) {
        icon = '🌤️';
      }
      
      const high = day.high_temperature ? day.high_temperature.replace('°F', '').trim() : 'N/A';
      const low = day.low_temperature ? day.low_temperature.replace('°F', '').trim() : 'N/A';
      
      return {
        day: dayOfWeek,
        high: high,
        low: low,
        rain: day.day_time_precipitation.chance,
        icon: icon,
      };
    });

    return { currentConditions, forecast };
  } catch (e) {
    console.error("Error parsing weather JSON:", e);
    return null;
  }
}

function Weather({ location, currentConditions, forecast }) {
  if (!currentConditions || !forecast) {
    return (
      <div className="p-6 text-center text-[#3d5a4a] bg-[#f5f0eb] rounded-xl shadow-lg">
        <h2 className="text-xl mb-4">No Weather Data Available</h2>
        <p>The community location is set to "{location}", but weather data could not be retrieved.</p>
      </div>
    );
  }
  
  const highRainDays = Array.isArray(forecast) 
    ? forecast.filter(day => parseInt(day.rain.replace('%', '')) > 40).length 
    : 0;
  
  const wateringSuggestion = highRainDays >= 2 
    ? 'Significant rain is expected this week, reduce watering by 30%.'
    : highRainDays >= 1
    ? 'Light rain expected, reduce watering by 15%.'
    : 'No significant rain expected, maintain regular watering schedule.';

  return (
    <div className="px-6 py-6 pb-24 bg-[#e8f0e8] rounded-xl shadow-lg">
      <h1 className="text-[#3d5a4a] text-3xl mb-8 text-center font-semibold">
        {location} Garden Weather
      </h1>
      
      <div className="mb-6">
        <h2 className="text-[#3d5a4a] text-xl font-medium">Current Conditions</h2>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-8">
        {currentConditions.map((condition) => (
          <div key={condition.label} className="bg-white rounded-2xl p-4 shadow-md">
            <p className="text-[#6b8e75] text-sm mb-1">{condition.label}</p>
            <p className="text-[#3d5a4a] text-2xl font-bold">{condition.value}</p>
          </div>
        ))}
      </div>
      
      <div className="mb-6">
        <h2 className="text-[#3d5a4a] text-xl font-medium">7-Day Forecast</h2>
      </div>
      
      <div className="flex gap-4 overflow-x-auto pb-4 mb-6">
        {forecast.map((day, index) => (
          <div key={index} className="bg-white rounded-2xl p-4 shadow-md flex-shrink-0 w-32 text-center">
            <p className="text-[#3d5a4a] mb-3 font-medium">{day.day}</p>
            <div className="text-4xl mb-3">{day.icon}</div>
            <p className="text-[#6b8e75] text-xs mb-1">H: {day.high}° / L: {day.low}°</p>
            <p className="text-[#6b8e75] text-xs font-semibold">{day.rain} P.O.P.</p>
          </div>
        ))}
      </div>
      
      <div className="bg-[#c8ddc4] rounded-2xl p-6 shadow-md mt-6">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 bg-[#8b6f47] rounded-full flex items-center justify-center flex-shrink-0">
            <Droplet className="text-white" size={20} />
          </div>
          <div>
            <h3 className="text-[#5a7a66] font-semibold mb-1">Watering Suggestions</h3>
            <p className="text-[#5a7a66] text-sm">{wateringSuggestion}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function WeatherManager({ communityLocation }) {
  const [currentConditions, setCurrentConditions] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!communityLocation) {
      setCurrentConditions(null);
      setForecast(null);
      setLoading(false);
      setError("No community location has been set by the administrator.");
      return;
    }

    setLoading(true);
    setError(null);
    
    const fetchWeatherData = async (location) => {
      const userQuery = `current weather and 7-day forecast for ${location}`;
      
      const payload = {
        contents: [{ parts: [{ text: userQuery }] }],
        tools: [{ "google_search": {} }],
        systemInstruction: {
          parts: [{ text: "Respond only with the structured JSON weather data from the search tool. Do not add any conversational text." }]
        },
      };

      try {
        let response = null;
        let attempts = 0;
        const maxAttempts = 3;
        
        while (attempts < maxAttempts) {
          try {
            response = await fetch(apiUrl, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(payload)
            });
            if (response.ok) break;
          } catch (e) {
            console.warn(`Attempt ${attempts + 1} failed, retrying...`, e);
          }
          attempts++;
          if (attempts < maxAttempts) {
            const delay = Math.pow(2, attempts) * 1000;
            await new Promise(resolve => setTimeout(resolve, delay));
          }
        }
        
        if (!response || !response.ok) {
          throw new Error('Failed to fetch weather data after multiple retries.');
        }

        const result = await response.json();
        const candidate = result.candidates?.[0];
        
        // This logic is fragile but necessary to extract the tool response from the snippet
        if (candidate?.groundingMetadata?.groundingAttributions?.[0]?.web?.uri) {
          const snippet = candidate.groundingMetadata.groundingAttributions[0].web.snippet;
          // Look for the tool_response_json key within the snippet string
          const jsonMatch = snippet.match(/tool_response_json\\":\\"(.*?)\\"/);
          
          if (jsonMatch && jsonMatch[1]) {
            // The JSON string is often heavily escaped. Replace the escaped quotes.
            const escapedJson = jsonMatch[1].replace(/\\"/g, '"');
            const data = parseWeatherResponse(escapedJson, location);
            
            if (data) {
              setCurrentConditions(data.currentConditions);
              setForecast(data.forecast);
            } else {
              setError("Could not parse weather data structure from search results.");
            }
          } else {
            setError("Weather data snippet format was unexpected or JSON was missing.");
          }
        } else {
          setError("Location not found or no weather data available from the search tool.");
        }
      } catch (e) {
        console.error("Fetch error:", e);
        setError(`Failed to retrieve weather: ${e.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData(communityLocation);
  }, [communityLocation]); 

  // --- Render Logic ---
  if (!communityLocation && !loading) {
     return <div className="p-10 text-center text-[#3d5a4a] bg-white rounded-xl shadow-lg">Waiting for administrator to set community location...</div>;
  }
  
  if (loading) {
    return (
      <div className="p-10 text-center text-[#3d5a4a] bg-white rounded-xl shadow-lg">
        <div className="animate-spin inline-block w-8 h-8 border-4 border-t-4 border-[#8b6f47] border-t-transparent rounded-full mb-4"></div>
        <p>Fetching real-time weather for {communityLocation}...</p>
      </div>
    );
  }

  if (error) {
    return <div className="p-10 text-center text-red-600 bg-red-100 rounded-xl shadow-lg">Error: {error}</div>;
  }
  
  return (
    <Weather 
      location={communityLocation}
      currentConditions={currentConditions}
      forecast={forecast}
    />
  );
}

// --- Main App Component (Simulates Admin-Set Location) ---
export default function App() {
  const adminSetLocation = "Phoenix, AZ";

  return (
    <div className="min-h-screen bg-[#f5f0eb] p-6 font-sans flex flex-col items-center">
      <div className="w-full max-w-xl">
        <h1 className="text-4xl text-[#8b6f47] font-bold text-center mb-10">
          Community Garden Weather Tracker
        </h1>
        
        {}
        <WeatherManager communityLocation={adminSetLocation} />

      </div>
    </div>
  );
}