import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Leaf, TrendingUp, ShoppingCart, Award, DollarSign } from 'lucide-react';
import CarbonMarketplace from './CarbonMarketplace';

const CarbonCredits: React.FC = () => {
  const { carbonCredits, totalEarnings } = useApp();
  const [activeTab, setActiveTab] = useState('overview');

  const totalCredits = carbonCredits.reduce((sum, credit) => sum + credit.amount, 0);
  const earnedCredits = carbonCredits.filter(c => c.status === 'earned');
  const soldCredits = carbonCredits.filter(c => c.status === 'sold');

  const tabs = [
    { id: 'overview', name: 'Overview', icon: Leaf },
    { id: 'marketplace', name: 'Marketplace', icon: ShoppingCart }
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center space-x-3">
        <Leaf className="h-8 w-8 text-green-600" />
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Carbon Credits</h2>
          <p className="text-gray-600 mt-1">Track and trade your environmental impact credits</p>
        </div>
      </div>

      <div className="flex space-x-4 border-b border-gray-200">
        {tabs.map(tab => {
          const IconComponent = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-3 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.id
                  ? 'border-green-500 text-green-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <IconComponent className="h-5 w-5" />
              <span>{tab.name}</span>
            </button>
          );
        })}
      </div>

      {activeTab === 'overview' ? (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-xl p-6 border border-green-200">
              <div className="flex items-center space-x-3">
                <Leaf className="h-8 w-8 text-green-600" />
                <div>
                  <p className="text-sm font-medium text-green-800">Total Credits</p>
                  <p className="text-3xl font-bold text-green-900">{totalCredits.toFixed(1)}</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-cyan-100 rounded-xl p-6 border border-blue-200">
              <div className="flex items-center space-x-3">
                <Award className="h-8 w-8 text-blue-600" />
                <div>
                  <p className="text-sm font-medium text-blue-800">Available</p>
                  <p className="text-3xl font-bold text-blue-900">{earnedCredits.reduce((sum, c) => sum + c.amount, 0).toFixed(1)}</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-indigo-100 rounded-xl p-6 border border-purple-200">
              <div className="flex items-center space-x-3">
                <TrendingUp className="h-8 w-8 text-purple-600" />
                <div>
                  <p className="text-sm font-medium text-purple-800">Sold</p>
                  <p className="text-3xl font-bold text-purple-900">{soldCredits.reduce((sum, c) => sum + c.amount, 0).toFixed(1)}</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-yellow-50 to-amber-100 rounded-xl p-6 border border-yellow-200">
              <div className="flex items-center space-x-3">
                <DollarSign className="h-8 w-8 text-yellow-600" />
                <div>
                  <p className="text-sm font-medium text-yellow-800">Total Earnings</p>
                  <p className="text-3xl font-bold text-yellow-900">₹{totalEarnings.toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Credit Sources</h3>
              <div className="space-y-4">
                {[
                  { source: 'Water Conservation', credits: 12.5, color: 'bg-blue-500' },
                  { source: 'Organic Farming', credits: 8.3, color: 'bg-green-500' },
                  { source: 'Energy Efficiency', credits: 15.7, color: 'bg-yellow-500' },
                  { source: 'Soil Management', credits: 6.2, color: 'bg-purple-500' }
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                      <span className="font-medium text-gray-900">{item.source}</span>
                    </div>
                    <span className="text-lg font-bold text-gray-900">{item.credits}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Monthly Performance</h3>
              <div className="space-y-4">
                {[
                  { month: 'January', earned: 8.2, sold: 5.1, earnings: 2550 },
                  { month: 'February', earned: 9.7, sold: 7.3, earnings: 3650 },
                  { month: 'March', earned: 12.4, sold: 8.9, earnings: 4450 },
                  { month: 'Current', earned: 6.3, sold: 4.2, earnings: 2100 }
                ].map((item, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-gray-900">{item.month}</span>
                      <span className="text-sm font-bold text-green-600">₹{item.earnings}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                      <div>Earned: {item.earned} credits</div>
                      <div>Sold: {item.sold} credits</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Recent Credit History</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Date</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Source</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Amount</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Value</th>
                  </tr>
                </thead>
                <tbody>
                  {carbonCredits.map(credit => (
                    <tr key={credit.id} className="border-b border-gray-100">
                      <td className="py-3 px-4 text-gray-900">
                        {credit.earnedDate.toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4 text-gray-600">{credit.source}</td>
                      <td className="py-3 px-4 font-medium text-gray-900">{credit.amount}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          credit.status === 'earned' ? 'text-green-600 bg-green-100' :
                          credit.status === 'sold' ? 'text-blue-600 bg-blue-100' :
                          'text-yellow-600 bg-yellow-100'
                        }`}>
                          {credit.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-medium text-gray-900">₹{credit.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <CarbonMarketplace />
      )}
    </div>
  );
};

export default CarbonCredits;