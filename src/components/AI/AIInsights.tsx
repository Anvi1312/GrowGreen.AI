import React from 'react';
import { useApp } from '../../context/AppContext';
import { AlertTriangle, CheckCircle, Clock, Brain } from 'lucide-react';

const AIInsights: React.FC = () => {
  const { recommendations } = useApp();

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-100 border-red-200';
      case 'medium': return 'text-yellow-600 bg-yellow-100 border-yellow-200';
      case 'low': return 'text-green-600 bg-green-100 border-green-200';
      default: return 'text-gray-600 bg-gray-100 border-gray-200';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high': return AlertTriangle;
      case 'medium': return Clock;
      case 'low': return CheckCircle;
      default: return Brain;
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center space-x-3">
        <Brain className="h-8 w-8 text-purple-600" />
        <div>
          <h2 className="text-3xl font-bold text-gray-900">AI Insights</h2>
          <p className="text-gray-600 mt-1">Smart recommendations powered by machine learning</p>
        </div>
      </div>

      {recommendations.length === 0 ? (
        <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-green-900 mb-2">All Systems Optimal!</h3>
          <p className="text-green-700">Your farm conditions are currently in the optimal range. No immediate actions needed.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {recommendations.map(rec => {
            const PriorityIcon = getPriorityIcon(rec.priority);
            return (
              <div 
                key={rec.id} 
                className={`border rounded-xl p-6 ${getPriorityColor(rec.priority)}`}
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <PriorityIcon className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-semibold">{rec.title}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase`}>
                        {rec.priority} Priority
                      </span>
                    </div>
                    <p className="mb-3">{rec.description}</p>
                    {rec.action && (
                      <button className="bg-white bg-opacity-50 hover:bg-opacity-75 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                        {rec.action}
                      </button>
                    )}
                    <p className="text-xs opacity-75 mt-2">
                      {rec.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-md p-6">
          <h4 className="font-semibold text-gray-900 mb-3">Growth Prediction</h4>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Current Progress</span>
              <span className="text-sm font-medium">78%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-green-500 h-2 rounded-full" style={{ width: '78%' }} />
            </div>
            <p className="text-xs text-gray-500 mt-2">Harvest expected in 18 days</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <h4 className="font-semibold text-gray-900 mb-3">Pest Risk Assessment</h4>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Risk Level</span>
              <span className="text-sm font-medium text-green-600">Low</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-green-500 h-2 rounded-full" style={{ width: '25%' }} />
            </div>
            <p className="text-xs text-gray-500 mt-2">Weather conditions favorable</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <h4 className="font-semibold text-gray-900 mb-3">Efficiency Score</h4>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Overall Score</span>
              <span className="text-sm font-medium text-blue-600">87%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-blue-500 h-2 rounded-full" style={{ width: '87%' }} />
            </div>
            <p className="text-xs text-gray-500 mt-2">Above industry average</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIInsights;