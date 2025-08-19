import React from 'react';
import { useApp } from '../../context/AppContext';

const SensorControls: React.FC = () => {
  const { sensorStatuses, updateSensorValue } = useApp();

  const handleSliderChange = (sensorId: string, value: number) => {
    updateSensorValue(sensorId, value);
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">Sensor Controls</h2>
        <p className="text-gray-600 mt-1">Manually adjust sensor values to test system responses</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {sensorStatuses.map(sensor => (
          <div key={sensor.id} className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">{sensor.name}</h3>
              <div className="text-right">
                <p className="text-2xl font-bold text-gray-900">
                  {sensor.value.toFixed(1)} <span className="text-sm font-normal text-gray-500">{sensor.unit}</span>
                </p>
                <span className={`px-2 py-1 rounded-full text-xs font-semibold uppercase ${
                  sensor.status === 'optimal' ? 'text-green-600 bg-green-100' :
                  sensor.status === 'warning' ? 'text-yellow-600 bg-yellow-100' :
                  'text-red-600 bg-red-100'
                }`}>
                  {sensor.status}
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between text-sm text-gray-500">
                <span>{sensor.min} {sensor.unit}</span>
                <span>{sensor.max} {sensor.unit}</span>
              </div>
              
              <input
                type="range"
                min={sensor.min}
                max={sensor.max}
                value={sensor.value}
                onChange={(e) => handleSliderChange(sensor.id, parseFloat(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                style={{
                  background: `linear-gradient(to right, ${
                    sensor.status === 'optimal' ? '#10b981' :
                    sensor.status === 'warning' ? '#f59e0b' : '#ef4444'
                  } 0%, ${
                    sensor.status === 'optimal' ? '#10b981' :
                    sensor.status === 'warning' ? '#f59e0b' : '#ef4444'
                  } ${(sensor.value / sensor.max) * 100}%, #d1d5db ${(sensor.value / sensor.max) * 100}%, #d1d5db 100%)`
                }}
              />
              
              <div className="flex justify-between">
                <button
                  onClick={() => handleSliderChange(sensor.id, Math.max(sensor.min, sensor.value - 5))}
                  className="px-3 py-1 bg-red-100 text-red-700 rounded-lg text-sm hover:bg-red-200 transition-colors"
                >
                  Decrease
                </button>
                <button
                  onClick={() => handleSliderChange(sensor.id, Math.min(sensor.max, sensor.value + 5))}
                  className="px-3 py-1 bg-green-100 text-green-700 rounded-lg text-sm hover:bg-green-200 transition-colors"
                >
                  Increase
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
        <h4 className="font-semibold text-blue-900 mb-2">💡 How It Works</h4>
        <p className="text-blue-700 text-sm">
          Adjust the sensor values using the sliders above to simulate real-world conditions. 
          The AI system will automatically generate recommendations and alerts based on these values. 
          Watch how the system status changes as you modify different parameters!
        </p>
      </div>
    </div>
  );
};

export default SensorControls;