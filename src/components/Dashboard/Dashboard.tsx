import React from 'react';
import { useApp } from '../../context/AppContext';
import SensorCard from './SensorCard';
import QuickStats from './QuickStats';
import RecentActivity from './RecentActivity';

const Dashboard: React.FC = () => {
  const { sensorStatuses } = useApp();

  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">Farm Dashboard</h2>
        <p className="text-gray-600 mt-1">Real-time monitoring and insights for your smart agriculture system</p>
      </div>

      <QuickStats />

      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Sensor Monitoring</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sensorStatuses.map(sensor => (
            <SensorCard key={sensor.id} sensor={sensor} />
          ))}
        </div>
      </div>

      <RecentActivity />
    </div>
  );
};

export default Dashboard;