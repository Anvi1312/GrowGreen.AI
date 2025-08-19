import React, { useState } from 'react';
import { AppProvider } from './context/AppContext';
import Header from './components/Layout/Header';
import Navigation from './components/Layout/Navigation';
import Dashboard from './components/Dashboard/Dashboard';
import SensorControls from './components/Sensors/SensorControls';
import AIInsights from './components/AI/AIInsights';
import IrrigationSystem from './components/Irrigation/IrrigationSystem';
import Analytics from './components/Analytics/Analytics';
import CarbonCredits from './components/Carbon/CarbonCredits';
import Notifications from './components/Notifications/Notifications';
import Profile from './components/Profile/Profile';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <Dashboard />;
      case 'sensors': return <SensorControls />;
      case 'ai': return <AIInsights />;
      case 'irrigation': return <IrrigationSystem />;
      case 'analytics': return <Analytics />;
      case 'carbon': return <CarbonCredits />;
      case 'notifications': return <Notifications />;
      case 'profile': return <Profile />;
      default: return <Dashboard />;
    }
  };

  return (
    <AppProvider>
      <div className="min-h-screen bg-gray-100">
        <Header activeTab={activeTab} />
        <div className="flex">
          <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
          <main className="flex-1 overflow-auto">
            {renderContent()}
          </main>
        </div>
      </div>
    </AppProvider>
  );
}

export default App;