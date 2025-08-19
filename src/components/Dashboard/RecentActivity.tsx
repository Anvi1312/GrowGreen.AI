import React from 'react';
import { Clock, Droplets, Thermometer, Wind } from 'lucide-react';

const RecentActivity: React.FC = () => {
  const activities = [
    {
      icon: Droplets,
      title: 'Irrigation System Activated',
      description: 'Sector 2 irrigation ran for 15 minutes',
      time: '2 hours ago',
      color: 'text-blue-600 bg-blue-100'
    },
    {
      icon: Thermometer,
      title: 'Temperature Alert Resolved',
      description: 'Greenhouse temperature returned to optimal range',
      time: '4 hours ago',
      color: 'text-green-600 bg-green-100'
    },
    {
      icon: Wind,
      title: 'Ventilation Adjusted',
      description: 'CO₂ levels optimized through ventilation control',
      time: '6 hours ago',
      color: 'text-purple-600 bg-purple-100'
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h3>
      <div className="space-y-4">
        {activities.map((activity, index) => {
          const IconComponent = activity.icon;
          return (
            <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
              <div className={`p-2 rounded-lg ${activity.color}`}>
                <IconComponent className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900">{activity.title}</p>
                <p className="text-sm text-gray-600">{activity.description}</p>
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <Clock className="h-4 w-4 mr-1" />
                {activity.time}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecentActivity;