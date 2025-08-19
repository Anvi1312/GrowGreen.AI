import React from 'react';
import { 
  Home, 
  Gauge, 
  Brain, 
  Droplets, 
  BarChart3, 
  Leaf, 
  Bell, 
  User 
} from 'lucide-react';

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'dashboard', name: 'Dashboard', icon: Home },
    { id: 'sensors', name: 'Sensors', icon: Gauge },
    { id: 'ai', name: 'AI Insights', icon: Brain },
    { id: 'irrigation', name: 'Irrigation', icon: Droplets },
    { id: 'analytics', name: 'Analytics', icon: BarChart3 },
    { id: 'carbon', name: 'Carbon Credits', icon: Leaf },
    { id: 'notifications', name: 'Alerts', icon: Bell },
    { id: 'profile', name: 'Profile', icon: User }
  ];

  return (
    <nav className="bg-gray-50 border-r border-gray-200 w-64 min-h-screen">
      <div className="p-4">
        <ul className="space-y-2">
          {tabs.map(tab => {
            const IconComponent = tab.icon;
            return (
              <li key={tab.id}>
                <button
                  onClick={() => onTabChange(tab.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                    activeTab === tab.id
                      ? 'bg-green-100 text-green-700 border-l-4 border-green-600'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  <IconComponent className="h-5 w-5" />
                  <span className="font-medium">{tab.name}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;