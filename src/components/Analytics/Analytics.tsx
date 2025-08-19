import React from 'react';
import { TrendingUp, BarChart3, Droplets, Zap, Target } from 'lucide-react';

const Analytics: React.FC = () => {
  const yieldData = [
    { month: 'Jan', current: 450, previous: 380 },
    { month: 'Feb', current: 520, previous: 420 },
    { month: 'Mar', current: 580, previous: 480 },
    { month: 'Apr', current: 640, previous: 520 },
    { month: 'May', current: 720, previous: 600 },
    { month: 'Jun', current: 780, previous: 650 },
  ];

  const resourceSavings = [
    { resource: 'Water', saved: 1240, unit: 'Liters', percentage: 23, color: 'text-blue-600' },
    { resource: 'Energy', saved: 156, unit: 'kWh', percentage: 18, color: 'text-yellow-600' },
    { resource: 'Fertilizer', saved: 45, unit: 'kg', percentage: 12, color: 'text-green-600' },
    { resource: 'Pesticides', saved: 8.5, unit: 'Liters', percentage: 35, color: 'text-purple-600' },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center space-x-3">
        <BarChart3 className="h-8 w-8 text-blue-600" />
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h2>
          <p className="text-gray-600 mt-1">Comprehensive insights into your farm performance</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-900">Yield Comparison</h3>
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded"></div>
                <span>Current Year</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-gray-400 rounded"></div>
                <span>Previous Year</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {yieldData.map((data, index) => (
              <div key={index} className="flex items-center space-x-4">
                <div className="w-12 text-sm font-medium text-gray-600">{data.month}</div>
                <div className="flex-1 flex space-x-2">
                  <div className="flex-1">
                    <div className="flex justify-between mb-1">
                      <span className="text-xs text-gray-500">Current</span>
                      <span className="text-xs font-medium">{data.current}kg</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${(data.current / 800) * 100}%` }}
                      />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between mb-1">
                      <span className="text-xs text-gray-500">Previous</span>
                      <span className="text-xs font-medium">{data.previous}kg</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gray-400 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${(data.previous / 800) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
                <div className="w-16 text-right">
                  <span className="text-sm font-medium text-green-600">
                    +{Math.round(((data.current - data.previous) / data.previous) * 100)}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Target className="h-6 w-6 text-green-600" />
              <h3 className="text-lg font-semibold text-gray-900">Performance Goals</h3>
            </div>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-600">Yield Target</span>
                  <span className="text-sm font-medium">87%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '87%' }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-600">Sustainability</span>
                  <span className="text-sm font-medium">92%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '92%' }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-600">Cost Efficiency</span>
                  <span className="text-sm font-medium">78%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '78%' }} />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center space-x-3 mb-4">
              <TrendingUp className="h-6 w-6 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-900">Key Metrics</h3>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">ROI</span>
                <span className="text-sm font-bold text-green-600">+156%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Growth Rate</span>
                <span className="text-sm font-bold text-blue-600">+23.4%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Efficiency</span>
                <span className="text-sm font-bold text-purple-600">94.2%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex items-center space-x-3 mb-6">
          <Droplets className="h-6 w-6 text-blue-600" />
          <h3 className="text-xl font-semibold text-gray-900">Resource Optimization</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {resourceSavings.map((resource, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-gray-900">{resource.resource}</h4>
                <span className={`text-2xl font-bold ${resource.color}`}>
                  -{resource.percentage}%
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-2">
                Saved: {resource.saved} {resource.unit}
              </p>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${resource.color.replace('text-', 'bg-')}`}
                  style={{ width: `${resource.percentage}%` }}
                />
              </div>
              <p className="text-xs text-gray-500 mt-2">vs. traditional methods</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Cost Analysis</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
              <span className="text-sm font-medium text-green-800">Monthly Savings</span>
              <span className="text-lg font-bold text-green-600">₹18,450</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
              <span className="text-sm font-medium text-blue-800">Operational Costs</span>
              <span className="text-lg font-bold text-blue-600">₹12,300</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-sm font-medium text-gray-800">Net Profit</span>
              <span className="text-lg font-bold text-gray-900">₹45,680</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Environmental Impact</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Carbon Footprint Reduction</span>
              <span className="text-sm font-bold text-green-600">-32%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Water Conservation</span>
              <span className="text-sm font-bold text-blue-600">1,240L</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Biodiversity Score</span>
              <span className="text-sm font-bold text-purple-600">8.7/10</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Soil Health Index</span>
              <span className="text-sm font-bold text-green-600">94%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;