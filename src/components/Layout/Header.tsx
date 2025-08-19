import React from 'react';
import { Bell, User, Leaf } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface HeaderProps {
  activeTab: string;
}

const Header: React.FC<HeaderProps> = ({ activeTab }) => {
  const { notifications, farmProfile } = useApp();
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <Leaf className="h-8 w-8 text-green-600" />
            <h1 className="text-2xl font-bold text-gray-900">Grow Green AI</h1>
          </div>
          <span className="text-sm text-gray-500">Smart Agriculture Platform</span>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="text-right">
            <p className="text-sm font-medium text-gray-900">{farmProfile.farmName}</p>
            <p className="text-xs text-gray-500">{farmProfile.location}</p>
          </div>
          
          <div className="relative">
            <Bell className="h-6 w-6 text-gray-600 hover:text-gray-900 cursor-pointer" />
            {unreadCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </div>
          
          <div className="flex items-center space-x-2">
            <User className="h-6 w-6 text-gray-600" />
            <span className="text-sm font-medium text-gray-700">{farmProfile.ownerName}</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;