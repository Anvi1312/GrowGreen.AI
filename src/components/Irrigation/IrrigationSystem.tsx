import React from 'react';
import { useApp } from '../../context/AppContext';
import { Droplets, Power, Gauge, Clock } from 'lucide-react';

const IrrigationSystem: React.FC = () => {
  const { sensorData, irrigationActive, activateIrrigation } = useApp();

  const getZoneStatus = (moisture: number) => {
    if (moisture > 60) return { status: 'Optimal', color: 'text-green-600 bg-green-100' };
    if (moisture > 40) return { status: 'Good', color: 'text-yellow-600 bg-yellow-100' };
    return { status: 'Needs Water', color: 'text-red-600 bg-red-100' };
  };

  const zones = [
    { id: 1, name: 'Zone A - Tomatoes', moisture: sensorData.soilMoisture, area: '1.2 hectares' },
    { id: 2, name: 'Zone B - Peppers', moisture: sensorData.soilMoisture - 10, area: '0.8 hectares' },
    { id: 3, name: 'Zone C - Herbs', moisture: sensorData.soilMoisture + 5, area: '0.5 hectares' },
    { id: 4, name: 'Zone D - Leafy Greens', moisture: sensorData.soilMoisture - 5, area: '0.7 hectares' },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center space-x-3">
        <Droplets className="h-8 w-8 text-blue-600" />
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Irrigation Management</h2>
          <p className="text-gray-600 mt-1">Smart water management for optimal crop growth</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900">Irrigation Zones</h3>
              <button
                onClick={activateIrrigation}
                disabled={irrigationActive}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                  irrigationActive
                    ? 'bg-blue-100 text-blue-600 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                <Power className="h-5 w-5" />
                <span>{irrigationActive ? 'Irrigating...' : 'Start Irrigation'}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {zones.map(zone => {
                const zoneStatus = getZoneStatus(zone.moisture);
                return (
                  <div key={zone.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-semibold text-gray-900">{zone.name}</h4>
                        <p className="text-sm text-gray-500">{zone.area}</p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${zoneStatus.color}`}>
                        {zoneStatus.status}
                      </span>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Soil Moisture</span>
                        <span className="font-medium">{zone.moisture.toFixed(1)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all duration-500 ${
                            zone.moisture > 60 ? 'bg-green-500' :
                            zone.moisture > 40 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${Math.min(100, zone.moisture)}%` }}
                        />
                      </div>
                    </div>

                    {irrigationActive && (
                      <div className="mt-3 flex items-center space-x-2 text-blue-600">
                        <Droplets className="h-4 w-4 animate-pulse" />
                        <span className="text-sm font-medium">Irrigating...</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Irrigation Schedule</h3>
            <div className="space-y-3">
              {[
                { time: '06:00', zone: 'Zone A', duration: '15 min', status: 'Completed' },
                { time: '06:20', zone: 'Zone B', duration: '12 min', status: 'Completed' },
                { time: '18:00', zone: 'Zone C', duration: '10 min', status: 'Scheduled' },
                { time: '18:15', zone: 'Zone D', duration: '8 min', status: 'Scheduled' },
              ].map((schedule, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Clock className="h-5 w-5 text-gray-600" />
                    <div>
                      <p className="font-medium text-gray-900">{schedule.time} - {schedule.zone}</p>
                      <p className="text-sm text-gray-600">Duration: {schedule.duration}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    schedule.status === 'Completed' 
                      ? 'text-green-600 bg-green-100' 
                      : 'text-blue-600 bg-blue-100'
                  }`}>
                    {schedule.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Water Usage</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Gauge className="h-5 w-5 text-blue-600" />
                <div className="flex-1">
                  <p className="text-sm text-gray-600">Tank Level</p>
                  <p className="text-xl font-bold text-gray-900">{sensorData.waterTankLevel.toFixed(1)}%</p>
                </div>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-blue-500 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${sensorData.waterTankLevel}%` }}
                />
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                <div>
                  <p className="text-sm text-gray-600">Today</p>
                  <p className="text-lg font-semibold text-gray-900">2,340L</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">This Week</p>
                  <p className="text-lg font-semibold text-gray-900">16,780L</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Efficiency Metrics</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-600">Water Efficiency</span>
                  <span className="text-sm font-medium">92%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '92%' }} />
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-600">Cost Savings</span>
                  <span className="text-sm font-medium">78%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '78%' }} />
                </div>
              </div>

              <div className="pt-3 border-t">
                <p className="text-sm text-gray-600">Monthly Savings</p>
                <p className="text-2xl font-bold text-green-600">₹4,250</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IrrigationSystem;