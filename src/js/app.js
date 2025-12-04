const state = {
  currentScreen: 'signin', 
  onboardingStep: 'language', 
  currentPage: 'home', 
  selectedPlant: null,
  showModal: null, 
  isAuthReady: false,
  
  user: {
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
  },
  
  communities: {},
  plants: [],
  logActivities: [],
};

import { PlantDetailModal } from './PlantDetailModal.js';
import { PlantCard } from './PlantCard.js';
import { PhLogModal } from './PhLogModal.js';
import { OnboardingNotifications } from './OnboardingNotifications.js';
import { OnboardingLanguage } from './OnboardingLanguage.js';
import { Log } from './Log.js';
import { JoinCreateCommunity } from './JoinCreateCommunity.js';
import { IrrigationLogModal } from './IrrigationLogModal.is';
import { Home } from './Home.js';
import { Header } from './Header.js';
import { Weather } from './Weather.js';
import { Weekly } from './Weekly.js';
import { Profile } from './Profile.js';
import { UserSettings } from './UserSettings.js';
import { TemperatureLogModal } from './TemperatureLogModal.js';
import { SignIn } from './SignIn.js';


function getPlantById(id) {
  return state.plants.find(p => p.id === id);
}

function updatePlantStatus(plantId, type, value) {
  const plant = getPlantById(plantId);
  if (plant) {
    if (type === 'irrigation') {
      plant.currentMoisture = value;
      plant.soilMoisture = value > 40 ? 'High Moisture' : (value > 30 ? 'Optimal Moisture' : 'Low Moisture');
      plant.moistureLevel = value > 40 ? 'high' : (value > 30 ? 'optimal' : 'low');
    } else if (type === 'temperature') {
      plant.temperature = value;
    } else if (type === 'pH') {
      plant.ph = value;
    }
  }
}

function handleLogActivity(type, plantId, value) {
  const plant = getPlantById(plantId);
  if (!plant) return;

  const newActivity = {
    type: type,
    plantId: plantId,
    plantName: plant.name,
    value: value,
    timestamp: new Date(),
  };

  state.logActivities = [newActivity, ...state.logActivities];
  updatePlantStatus(plantId, type, value);
  state.showModal = null;
  render();
}

function handleSignIn(email, password) {
  state.user.email = email;
  state.currentScreen = 'onboarding';
  state.onboardingStep = 'language'; 
  render();
}

function handleCreateAccount(email, password, name) {
  state.user.name = name;
  state.user.email = email;
  state.currentScreen = 'onboarding';
  state.onboardingStep = 'language'; 
  render();
}

function handleOnboardingContinue(data) {
  const currentStep = state.onboardingStep;
  
  if (currentStep === 'language') {
    state.user.language = data.language;
    state.onboardingStep = 'community';
  } else if (currentStep === 'community') {
    state.user.communityId = data.id;
    state.user.community = data.name;
    state.user.communityLocation = data.location;
    state.onboardingStep = 'notifications';
  } else if (currentStep === 'notifications') {
    state.user.notificationsEnabled = data.notificationsEnabled;
    state.currentScreen = 'dashboard';
    state.currentPage = 'home';
  }
  render();
}

function handleOnboardingBack() {
  const currentStep = state.onboardingStep;
  
  if (currentStep === 'community') {
    state.onboardingStep = 'language';
  } else if (currentStep === 'notifications') {
    state.onboardingStep = 'community';
  } else if (currentStep === 'language') {
    state.currentScreen = 'signin';
  }
  render();
}


function handleLogout() {
  state.user = {
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
  };
  state.currentScreen = 'signin';
  render();
}

function handleSaveUserSettings(updatedUser) {
  state.user.name = updatedUser.name;
  state.user.email = updatedUser.email;
  state.user.language = updatedUser.language;
  state.user.bio = updatedUser.bio;
  
  state.currentScreen = 'dashboard';
  state.currentPage = 'profile'; 
  render();
}

function renderApp() {
  const appRoot = document.getElementById('app');
  let content = '';

  function renderComponent(Component, props) {
    return Component(props);
  }
  
  if (state.currentScreen === 'signin') {
    content = renderComponent(SignIn, {
      onSignIn: (email, password) => handleSignIn(email, password),
      onCreateAccount: (email, password, name) => handleCreateAccount(email, password, name)
    });
  } else if (state.currentScreen === 'onboarding') {
    let onboardingComponent;
    
    if (state.onboardingStep === 'language') {
      onboardingComponent = renderComponent(OnboardingLanguage, {
        onContinue: (language) => handleOnboardingContinue({ language }),
        onBack: handleOnboardingBack
      });
    } else if (state.onboardingStep === 'community') {
      onboardingComponent = renderComponent(JoinCreateCommunity, {
        communities: Object.keys(state.communities).map(id => ({ 
          id, 
          name: state.communities[id].name, 
          logo: state.communities[id].logo, 
          location: state.communities[id].location 
        })),
        onJoinCommunity: (id, name, location) => handleOnboardingContinue({ id, name, location }),
        onCreateCommunity: () => console.log('Simulating community creation...'), 
        onBack: handleOnboardingBack
      });
    } else if (state.onboardingStep === 'notifications') {
      onboardingComponent = renderComponent(OnboardingNotifications, {
        onContinue: (notificationsEnabled) => handleOnboardingContinue({ notificationsEnabled }),
        onBack: handleOnboardingBack
      });
    } else {
      onboardingComponent = `<div class="p-6 text-center text-[#8b6f47]">Loading Onboarding Step...</div>`;
    }
    
    content = onboardingComponent;

  } else if (state.currentScreen === 'dashboard' || state.currentScreen === 'weekly' || state.currentScreen === 'settings') {
    
    const dashboardHeader = state.currentScreen !== 'weekly' && state.currentScreen !== 'settings'
      ? renderComponent(Header, {
          userName: state.user.name || state.user.email,
          communityName: state.user.community
        })
      : '';
      
    let mainContent = '';
    
    if (state.currentScreen === 'weekly') {
      const plant = getPlantById(state.selectedPlant);
      mainContent = renderComponent(Weekly, { 
        plants: plant ? [plant] : state.plants, 
        onBack: () => { state.currentScreen = 'dashboard'; state.selectedPlant = null; render(); }
      });
    } else if (state.currentScreen === 'settings') {
       mainContent = renderComponent(UserSettings, {
         user: state.user,
         onSave: handleSaveUserSettings,
         onBack: () => { state.currentScreen = 'dashboard'; state.currentPage = 'profile'; render(); }
       });
    } else { 
      switch (state.currentPage) {
        case 'home':
          mainContent = renderComponent(Home, {
            plants: state.plants,
            onViewWeekly: (plantId) => { state.selectedPlant = plantId; state.currentScreen = 'weekly'; render(); }
          });
          break;
        case 'log':
          mainContent = renderComponent(Log, {
            plants: state.plants,
            logActivities: state.logActivities,
            onLogActivity: handleLogActivity,
            onOpenModal: (type) => { state.showModal = type; render(); }
          });
          break;
        case 'weather':
          mainContent = renderComponent(Weather, {});
          break;
        case 'profile':
          mainContent = renderComponent(Profile, {
            user: state.user,
            onLogout: handleLogout,
            onOpenSettings: () => { state.currentScreen = 'settings'; render(); },
            onUpdateProfilePicture: (pic) => { state.user.profilePicture = pic; render(); }
          });
          break;
        default:
          mainContent = `<div class="p-6 text-center text-[#8b6f47]">Page Not Found</div>`;
      }
    }
    
    const dashboardNav = state.currentScreen === 'dashboard'
      ? `<div class="fixed bottom-0 left-0 right-0 bg-white shadow-2xl rounded-t-3xl p-4 flex justify-around border-t border-[#c8ddc4] z-50">
          ${renderNavLink('home', 'Home')}
          ${renderNavLink('log', 'Activity')}
          <button onclick="state.showModal = 'irrigation'; render();" class="w-14 h-14 bg-[#2d5a3d] text-white rounded-full flex items-center justify-center text-xl shadow-lg -mt-4 ring-4 ring-[#f5f0eb] hover:bg-[#234a31] transition-colors">${Icons.Plus(24)}</button>
          ${renderNavLink('weather', 'Weather')}
          ${renderNavLink('profile', 'Profile')}
        </div>`
      : '';
      
    content = `
      ${dashboardHeader}
      <div class="flex-1 overflow-y-auto">
        ${mainContent}
      </div>
      ${dashboardNav}
      ${renderModals()}
    `;
  }
  
  appRoot.innerHTML = content;
  attachEventListeners();
}

function renderNavLink(page, label) {
  const isActive = state.currentPage === page;
  const color = isActive ? 'text-[#2d5a3d]' : 'text-[#8b6f47]';
  const icon = Icons[label];
  
  return `
    <button 
      onclick="state.currentPage = '${page}'; render();" 
      class="flex flex-col items-center justify-center p-2 transition-colors"
    >
      <span class="${color}">${Icons[label](24, color.replace('text-', ''))}</span>
      <span class="text-xs ${color} mt-1">${label}</span>
    </button>
  `;
}

function renderModals() {
  const plantsProps = state.plants.map(p => ({ id: p.id, name: p.name, type: p.type }));
  
  if (state.showModal === 'irrigation') {
    return renderComponent(IrrigationLogModal, {
      plants: plantsProps,
      onClose: () => { state.showModal = null; render(); },
      onSubmit: (plantId, moistureLevel) => handleLogActivity('irrigation', plantId, moistureLevel)
    });
  }
  if (state.showModal === 'temperature') {
    return renderComponent(TemperatureLogModal, {
      plants: plantsProps,
      onClose: () => { state.showModal = null; render(); },
      onSubmit: (plantId, temperature) => handleLogActivity('temperature', plantId, temperature)
    });
  }
  if (state.showModal === 'ph') {
    return renderComponent(PhLogModal, {
      plants: plantsProps,
      onClose: () => { state.showModal = null; render(); },
      onSubmit: (plantId, ph) => handleLogActivity('pH', plantId, ph)
    });
  }
  if (state.selectedPlant && state.currentScreen === 'dashboard') {
    return renderComponent(PlantDetailModal, {
      plant: getPlantById(state.selectedPlant),
      onClose: () => { state.selectedPlant = null; render(); }
    });
  }
  return '';
}

function attachEventListeners() {
}

window.state = state;
window.render = renderApp;
window.Icons = Icons; 
window.handleLogActivity = handleLogActivity;
window.handleSignIn = handleSignIn;
window.handleCreateAccount = handleCreateAccount;
window.handleOnboardingContinue = handleOnboardingContinue;
window.handleOnboardingBack = handleOnboardingBack;
window.handleLogout = handleLogout;
window.handleSaveUserSettings = handleSaveUserSettings;

document.addEventListener('DOMContentLoaded', () => {
  renderApp();
});
