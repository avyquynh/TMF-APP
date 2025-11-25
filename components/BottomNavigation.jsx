import { Home, Cloud, Plus, Calendar, User } from 'lucide-react';

export function BottomNavigation({ 
  currentPage, 
  onNavigate 
}) {
  const navItems = [
    { id: 'home', label: 'Home', icon },
    { id: 'weather', label: 'Weather', icon },
    { id: 'log', label: 'Log', icon },
    { id: 'weekly', label: 'Weekly', icon },
    { id: 'profile', label: 'Profile', icon },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#c8ddc4] border-t border-[#a8bdaa] flex justify-around items-center py-3">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = currentPage === item.id;
        return (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className="flex flex-col items-center gap-1"
          >
            <Icon 
              size={24} 
              className={isActive ? 'text-[#2d5a3d]' : 'text-[#7a9580]'} 
            />
            <span className={`text-xs ${isActive ? 'text-[#2d5a3d]' : 'text-[#7a9580]'}`}>
              {item.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
