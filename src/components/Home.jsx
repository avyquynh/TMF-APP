import { useState } from 'react';
import { PlantCard } from './PlantCard';
import { PlantDetailModal } from './PlantDetailModal';

export function Home({ 
  plants, 
  onViewWeekly 
}) {
  const [selectedPlant, setSelectedPlant] = useState(null);

  return (
    <div className="px-6 py-6 pb-24">
      {plants.map((plant) => (
        <PlantCard
          key={plant.id}
          plantName={plant.name}
          plantType={plant.type}
          soilMoisture={plant.soilMoisture}
          moistureLevel={plant.moistureLevel}
          lastWatered={plant.lastWatered}
          onViewWeekly={() => setSelectedPlant(plant)}
        />
      ))}
      
      {selectedPlant && (
        <PlantDetailModal
          plant={selectedPlant}
          onClose={() => setSelectedPlant(null)}
        />
      )}
    </div>
  );
}