import React, { useState } from 'react';

export function AdminDashboard({ onCreatePlant, onBack }) {
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [initialMoisture, setInitialMoisture] = useState(''); 
    const [lowThreshold, setLowThreshold] = useState(20);
    const [highThreshold, setHighThreshold] = useState(80);

    const handleSubmit = (e) => {
        e.preventDefault();        
        if (!name || !type) {
            console.error('Please enter a plant name and type.');
            alert('Please enter a plant name and type.');
            return;
        }        
        const low = Number(lowThreshold);
        const high = Number(highThreshold);
        const moisture = initialMoisture === '' ? null : Number(initialMoisture);

        if (low >= high || low < 0 || high > 100) {
            alert('Please ensure Low Threshold is less than High Threshold (0-100%).');
            return;
        }
        onCreatePlant(name, type, moisture, low, high); 
    };

    return (
        <div className="min-h-screen bg-[#f5f0eb] flex flex-col p-6">
            <button 
                className="mb-8 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-[#8b6f47]"
                onClick={onBack}
            >
                {'<-'}
            </button>
            <h1 className="text-[#2d5a3d] text-3xl mb-8 text-center">Admin: Create Plant Profile 🌱</h1>

            <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-8 shadow-lg space-y-4">
                <div>
                    <label className="block text-[#8b6f47] mb-2">Plant Name</label>
                    <input 
                        type="text" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-[#c8ddc4] focus:outline-none focus:ring-2 focus:ring-[#2d5a3d]" 
                        placeholder="e.g., Cherry Tomatoes"
                    />
                </div>
                <div>
                    <label className="block text-[#8b6f47] mb-2">Plant Type/Variety</label>
                    <input 
                        type="text" 
                        value={type} 
                        onChange={(e) => setType(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-[#c8ddc4] focus:outline-none focus:ring-2 focus:ring-[#2d5a3d]" 
                        placeholder="e.g., Solanum lycopersicum"
                    />
                </div>                
                <div className="pt-4 border-t border-[#c8ddc4]">
                    <h2 className="text-[#2d5a3d] text-xl mb-3">Initial Sensor Data (Optional)</h2>
                    <div>
                        <label className="block text-[#8b6f47] mb-2 text-sm">Initial Soil Moisture (%)</label>
                        <input 
                            type="number" 
                            min="0"
                            max="100"
                            value={initialMoisture} 
                            onChange={(e) => setInitialMoisture(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-[#c8ddc4] focus:outline-none focus:ring-2 focus:ring-[#2d5a3d]" 
                            placeholder="Leave blank if no reading available"
                        />
                    </div>
                </div>
                <div className="pt-4 border-t border-[#c8ddc4]">
                    <h2 className="text-[#2d5a3d] text-xl mb-3">Moisture Thresholds (%)</h2>
                    <div className="flex space-x-4">
                        <div className="flex-1">
                            <label className="block text-[#8b6f47] mb-2 text-sm">Low Threshold (Needs Water)</label>
                            <input 
                                type="number" 
                                min="0"
                                max="100"
                                value={lowThreshold} 
                                onChange={(e) => setLowThreshold(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl border border-[#c8ddc4] focus:outline-none focus:ring-2 focus:ring-[#2d5a3d]" 
                                required
                            />
                        </div>
                        <div className="flex-1">
                            <label className="block text-[#8b6f47] mb-2 text-sm">High Threshold (Too Wet)</label>
                            <input 
                                type="number" 
                                min="0"
                                max="100"
                                value={highThreshold} 
                                onChange={(e) => setHighThreshold(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl border border-[#c8ddc4] focus:outline-none focus:ring-2 focus:ring-[#2d5a3d]" 
                                required
                            />
                        </div>
                    </div>
                </div>
                
                <button 
                    type="submit"
                    className="w-full bg-[#2d5a3d] text-white py-3 rounded-2xl hover:bg-[#234a31] transition-colors mt-6 text-center"
                >
                    Create Plant
                </button>
            </form>
        </div>
    );
}
