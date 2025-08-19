import React from 'react';
import { SensorStatus } from '../../types';
import * as Icons from 'lucide-react';

interface SensorCardProps {
  sensor: SensorStatus;
}

const SensorCard: React.FC<SensorCardProps> = ({ sensor }) => {
  const IconComponent = Icons[sensor.icon as keyof typeof Icons] as React.ComponentType<{ className?: string }>;
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'optimal': return 'text-green-600 bg-green-100';
      case 'warning': return 'text-yellow-600 bg-yellow-100';
      case 'critical': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getProgressColor = (status: string) => {
    switch (status) {
      case 'optimal': return 'bg-green-500';
      case 'warning': return 'bg-yellow-500';
      case 'critical': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const progressPercentage = (sensor.value / sensor.max) * 100;

  return (
    <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`p-3 rounded-lg ${getStatusColor(sensor.status)}`}>
            <IconComponent className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{sensor.name}</h3>
            <p className="text-2xl font-bold text-gray-900">
              {sensor.value.toFixed(1)} <span className="text-sm font-normal text-gray-500">{sensor.unit}</span>
            </p>
          </div>
        </div>
        <div className={`px-3 py-1 rounded-full text-xs font-semibold uppercase ${getStatusColor(sensor.status)}`}>
          {sensor.status}
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-gray-500">
          <span>Range: {sensor.min} - {sensor.max} {sensor.unit}</span>
          <span>{progressPercentage.toFixed(0)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className={`h-2 rounded-full transition-all duration-500 ${getProgressColor(sensor.status)}`}
            style={{ width: `${Math.min(100, progressPercentage)}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default SensorCard;