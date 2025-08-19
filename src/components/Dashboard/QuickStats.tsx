import React from 'react';
import { TrendingUp, Droplets, Zap, Leaf } from 'lucide-react';

const QuickStats: React.FC = () => {
  const stats = [
    {
      icon: TrendingUp,
      title: 'Yield Forecast',
      value: '+23%',
      description: 'vs last season',
      color: 'text-green-600 bg-green-100'
    },
    {
      icon: Droplets,
      title: 'Water Saved',
      value: '1,240L',
      description: 'this week',
      color: 'text-blue-600 bg-blue-100'
    },
    {
      icon: Zap,
      title: 'Energy Efficiency',
      value: '87%',
      description: 'optimal usage',
      color: 'text-yellow-600 bg-yellow-100'
    },
    {
      icon: Leaf,
      title: 'Carbon Credits',
      value: '36.5',
      description: 'earned this month',
      color: 'text-emerald-600 bg-emerald-100'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => {
        const IconComponent = stat.icon;
        return (
          <div key={index} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</p>
                <p className="text-xs text-gray-500 mt-1">{stat.description}</p>
              </div>
              <div className={`p-3 rounded-lg ${stat.color}`}>
                <IconComponent className="h-8 w-8" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default QuickStats;