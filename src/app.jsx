import React, { useState, useEffect } from 'react';
import { SignIn } from './components/SignIn';
import { CreateAccount } from './components/CreateAccount';
import { OnboardingNotifications } from './components/OnboardingNotifications';
import { OnboardingLanguage } from './components/OnboardingLanguage';
import { JoinCreateCommunity } from './components/JoinCreateCommunity';
import { CreateCommunity } from './components/CreateCommunity';
import { Header } from './components/Header';
import { BottomNavigation } from './components/BottomNavigation';
import { Home } from './components/Home';
import { Weekly } from './components/Weekly';
import { Log } from './components/Log';
import { Profile } from './components/Profile';
import { Weather } from './components/Weather';
import { UserSettings } from './components/UserSettings';
import { AdminDashboard } from './components/AdminDashboard';
import { v4 as uuidv4 } from 'uuid';

const getMoistureStatus = (moisture, low, high) => {
    if (moisture === null || moisture === undefined) {
        return { status: 'Unknown', level: 'unknown' };
    }
    if (moisture < low) {
        return { status: 'Low Moisture (Needs Water)', level: 'low' };
    }
    if (moisture > high) {
        return { status: 'High Moisture (Overwatered)', level: 'high' };
    }
    return { status: 'Optimal Moisture', level: 'optimal' };
};


export default function App() {
    const [currentScreen, setCurrentScreen] = useState('signin');
    const [currentPage, setCurrentPage] = useState('home');
    const [selectedPlantId, setSelectedPlantId] = useState(null);

    const [user, setUser] = useState({
        name: '',
        email: '',
        roles: ['Member'],
        community: '',
        communityId: '',
        communityLocation: '',
        notificationsEnabled: false,
        language: 'English',
        bio: '',
        profilePicture: null
    });

    const [communities, setCommunities] = useState({});
    const [plants, setPlants] = useState([]);
    const [logActivities, setLogActivities] = useState([]);
    const [weeklyData, setWeeklyData] = useState([]); 

    useEffect(() => {
        if (selectedPlantId) {
            setWeeklyData([]); 
        } else {
            setWeeklyData([]);
        }
    }, [selectedPlantId]);

    const handleSignIn = (email, password) => {
        setUser(prev => ({ ...prev, email, name: email.split('@')[0] || 'User' })); 
        setCurrentScreen('dashboard');
    };

    const handleCreateAccountClick = () => {
        setCurrentScreen('create-account');
    };

    const handleCreateAccount = (email, password, name) => {
        setUser(prev => ({ ...prev, email, name, bio: `Hello! I'm ${name} and I'm using VitaPlant.` }));
        setCurrentScreen('onboarding-notifications');
    };

    const handleNotifications = (enabled) => {
        setUser(prev => ({ ...prev, notificationsEnabled: enabled }));
        setCurrentScreen('onboarding-language');
    };

    const handleLanguage = (language) => {
        setUser(prev => ({ ...prev, language }));
        setCurrentScreen('join-create-community');
    };

    const handleJoinCommunity = (communityId, communityName, communityLocation) => {
        setUser(prev => ({
            ...prev,
            communityId,
            community: communityName,
            communityLocation,
            roles: ['Member']
        }));
        setCurrentScreen('dashboard');
    };

    const handleCreateCommunityFlow = () => {
        setCurrentScreen('create-community');
    };

    const handleCreateCommunity = (name, location) => {
        const newId = uuidv4();
        const newCommunity = {
            id: newId,
            name: name,
            location: location,
            emoji: '🌱'
        };

        setCommunities(prev => ({
            ...prev,
            [newId]: newCommunity
        }));

        setUser(prev => ({
            ...prev,
            communityId: newId,
            community: name,
            communityLocation: location,
            roles: ['Owner', 'Administrator']
        }));

        setCurrentScreen('dashboard');
    };

    const handleCreatePlant = (plantName, plantType, initialMoisture = null, lowThreshold, highThreshold) => {
        const hasMoisture = initialMoisture !== null && initialMoisture > 0;
        
        const { status, level } = getMoistureStatus(initialMoisture, lowThreshold, highThreshold);

        const newPlant = {
            id: uuidv4(),
            name: plantName,
            type: plantType,
            
            lowMoistureThreshold: Number(lowThreshold),
            highMoistureThreshold: Number(highThreshold),

            soilMoisture: hasMoisture ? status : 'Unknown',
            moistureLevel: hasMoisture ? level : 'unknown',
            
            lastWatered: hasMoisture ? new Date().toLocaleDateString() : 'N/A',
            currentMoisture: hasMoisture ? initialMoisture : null, 
            moistureHistory: hasMoisture ? [initialMoisture] : [], 
            ph: null, 
            temperature: null,
            humidity: null,
            wateringHistory: []
        };
        setPlants(prev => [...prev, newPlant]);
        alert(`Plant "${plantName}" created with thresholds: Low ${lowThreshold}%, High ${highThreshold}%.`);
        setCurrentScreen('dashboard');
    };

    const handleViewWeekly = (plantId) => {
        setSelectedPlantId(plantId);
        setCurrentPage('weekly');
    };

    const handleLogActivity = (type, plantId, value) => {
        const plant = plants.find(p => p.id === plantId || p.name === plantId);
        const newActivity = {
            type,
            plantId,
            plantName: plant?.name || plantId,
            value,
            timestamp: new Date()
        };
        setLogActivities(prev => [newActivity, ...prev]);
        if (type === 'moisture' && plant) {
            const low = plant.lowMoistureThreshold;
            const high = plant.highMoistureThreshold;
            
            const { status, level } = getMoistureStatus(value, low, high);

            setPlants(prevPlants => prevPlants.map(p => {
                if (p.id === plantId) {
                    return {
                        ...p,
                        currentMoisture: value,
                        moistureHistory: [...p.moistureHistory, value],
                        soilMoisture: status, 
                        moistureLevel: level,
                        lastWatered: new Date().toLocaleDateString(),
                    };
                }
                return p;
            }));
        }
    };

    const handleLogout = () => {
        setCurrentScreen('signin');
        setCurrentPage('home');
        setSelectedPlantId(null);
        setUser({
            name: '', email: '', roles: ['Member'], community: '', communityId: '',
            communityLocation: '', notificationsEnabled: false, language: 'English',
            bio: '', profilePicture: null
        });
        setCommunities({});
        setPlants([]);
        setLogActivities([]);
    };

    const handleBackFromWeekly = () => {
        setCurrentPage('home');
        setSelectedPlantId(null);
    };

    const handleOpenAdminDashboard = () => {
        setCurrentScreen('admin-dashboard');
    };

    const selectedPlant = plants.find(p => p.id === selectedPlantId);

    if (currentScreen === 'admin-dashboard') {
        if (user.roles.includes('Administrator') || user.roles.includes('Owner')) {
            return (
                <AdminDashboard
                    onCreatePlant={handleCreatePlant}
                    onBack={() => setCurrentScreen('dashboard')}
                />
            );
        }
        setCurrentScreen('dashboard');
        return null;
    }

    if (currentScreen === 'signin') {
        return <SignIn onSignIn={handleSignIn} onCreateAccount={handleCreateAccountClick} />;
    }

    if (currentScreen === 'create-account') {
        return (
            <CreateAccount
                onCreate={handleCreateAccount}
                onBack={() => setCurrentScreen('signin')}
            />
        );
    }

    if (currentScreen === 'onboarding-notifications') {
        return (
            <OnboardingNotifications
                onContinue={handleNotifications}
                onBack={() => setCurrentScreen('create-account')}
            />
        );
    }

    if (currentScreen === 'onboarding-language') {
        return (
            <OnboardingLanguage
                onContinue={handleLanguage}
                onBack={() => setCurrentScreen('onboarding-notifications')}
            />
        );
    }

    if (currentScreen === 'join-create-community') {
        const communityList = Object.values(communities);

        return (
            <JoinCreateCommunity
                communities={communityList}
                onJoinCommunity={handleJoinCommunity}
                onCreateCommunity={handleCreateCommunityFlow}
                onBack={() => setCurrentScreen('onboarding-language')}
            />
        );
    }

    if (currentScreen === 'create-community') {
        return (
            <CreateCommunity
                onCreateCommunity={handleCreateCommunity}
                onBack={() => setCurrentScreen('join-create-community')}
            />
        );
    }

    if (currentScreen === 'user-settings') {
        return (
            <UserSettings
                user={user}
                onSave={(updatedUser) => {
                    setUser(prev => ({ ...prev, ...updatedUser }));
                    setCurrentScreen('dashboard');
                    setCurrentPage('profile');
                }}
                onBack={() => {
                    setCurrentScreen('dashboard');
                    setCurrentPage('profile');
                }}
            />
        );
    }

    // Dashboard view
    return (
        <div className="min-h-screen bg-[#f5f0eb]">
            <Header userName={user.name} communityName={user.community} onOpenAdminDashboard={handleOpenAdminDashboard} userRoles={user.roles} />

            {currentPage === 'home' && (
                <Home plants={plants} onViewWeekly={handleViewWeekly} />
            )}

            {currentPage === 'weekly' && (
                <Weekly plant={selectedPlant} weeklyData={weeklyData} onBack={handleBackFromWeekly} />
            )}

            {currentPage === 'log' && (
                <Log plants={plants} onLogActivity={handleLogActivity} logActivities={logActivities} />
            )}

            {currentPage === 'profile' && (
                <Profile
                    user={user}
                    onLogout={handleLogout}
                    onOpenSettings={() => setCurrentScreen('user-settings')}
                    onUpdateProfilePicture={(picture) => setUser(prev => ({ ...prev, profilePicture: picture }))}
                />
            )}

            {currentPage === 'weather' && (
                <Weather />
            )}

            <BottomNavigation currentPage={currentPage} onNavigate={(page) => setCurrentPage(page)} />
        </div>
    );
}
