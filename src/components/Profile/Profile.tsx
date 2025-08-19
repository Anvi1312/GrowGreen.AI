import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { User, MapPin, Leaf, Target, Mail, Save } from 'lucide-react';

const Profile: React.FC = () => {
  const { farmProfile, updateFarmProfile } = useApp();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(farmProfile);

  const handleSave = () => {
    updateFarmProfile(formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData(farmProfile);
    setIsEditing(false);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center space-x-3">
        <User className="h-8 w-8 text-blue-600" />
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Farm Profile</h2>
          <p className="text-gray-600 mt-1">Manage your farm information and sustainability goals</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-900">Farm Information</h3>
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Edit Profile
              </button>
            ) : (
              <div className="flex space-x-2">
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
                >
                  <Save className="h-4 w-4" />
                  <span>Save</span>
                </button>
                <button
                  onClick={handleCancel}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Farm Name</label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.farmName}
                  onChange={(e) => setFormData({...formData, farmName: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              ) : (
                <p className="text-lg font-semibold text-gray-900">{farmProfile.farmName}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Owner Name</label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.ownerName}
                  onChange={(e) => setFormData({...formData, ownerName: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              ) : (
                <p className="text-lg font-semibold text-gray-900">{farmProfile.ownerName}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              ) : (
                <p className="text-lg font-semibold text-gray-900">{farmProfile.location}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              {isEditing ? (
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              ) : (
                <p className="text-lg font-semibold text-gray-900">{farmProfile.email}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Farm Size (hectares)</label>
              {isEditing ? (
                <input
                  type="number"
                  step="0.1"
                  value={formData.size}
                  onChange={(e) => setFormData({...formData, size: parseFloat(e.target.value)})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              ) : (
                <p className="text-lg font-semibold text-gray-900">{farmProfile.size} hectares</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Primary Crop</label>
              {isEditing ? (
                <select
                  value={formData.cropType}
                  onChange={(e) => setFormData({...formData, cropType: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="Tomatoes">Tomatoes</option>
                  <option value="Peppers">Peppers</option>
                  <option value="Lettuce">Lettuce</option>
                  <option value="Herbs">Herbs</option>
                  <option value="Cucumbers">Cucumbers</option>
                  <option value="Mixed Vegetables">Mixed Vegetables</option>
                </select>
              ) : (
                <p className="text-lg font-semibold text-gray-900">{farmProfile.cropType}</p>
              )}
            </div>
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Sustainability Goal (%)</label>
            {isEditing ? (
              <div className="space-y-2">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={formData.sustainabilityGoal}
                  onChange={(e) => setFormData({...formData, sustainabilityGoal: parseInt(e.target.value)})}
                  className="w-full"
                />
                <p className="text-sm text-gray-600">Target: {formData.sustainabilityGoal}%</p>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-green-500 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${farmProfile.sustainabilityGoal}%` }}
                  />
                </div>
                <p className="text-sm text-gray-600">Current Goal: {farmProfile.sustainabilityGoal}%</p>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="text-sm text-gray-600">Location</p>
                  <p className="font-medium text-gray-900">{farmProfile.location}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Leaf className="h-5 w-5 text-green-600" />
                <div>
                  <p className="text-sm text-gray-600">Primary Crop</p>
                  <p className="font-medium text-gray-900">{farmProfile.cropType}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Target className="h-5 w-5 text-purple-600" />
                <div>
                  <p className="text-sm text-gray-600">Sustainability</p>
                  <p className="font-medium text-gray-900">{farmProfile.sustainabilityGoal}% goal</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-gray-600" />
                <div>
                  <p className="text-sm text-gray-600">Contact</p>
                  <p className="font-medium text-gray-900">{farmProfile.email}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Achievement Badges</h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                { name: 'Water Saver', color: 'bg-blue-100 text-blue-800', icon: '💧' },
                { name: 'Green Farmer', color: 'bg-green-100 text-green-800', icon: '🌱' },
                { name: 'Efficient', color: 'bg-yellow-100 text-yellow-800', icon: '⚡' },
                { name: 'Carbon Neutral', color: 'bg-purple-100 text-purple-800', icon: '🌍' },
              ].map((badge, index) => (
                <div key={index} className={`${badge.color} rounded-lg p-3 text-center`}>
                  <div className="text-2xl mb-1">{badge.icon}</div>
                  <div className="text-xs font-semibold">{badge.name}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Security</h3>
            <div className="space-y-3">
              <button className="w-full text-left px-3 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                Change Password
              </button>
              <button className="w-full text-left px-3 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                Two-Factor Authentication
              </button>
              <button className="w-full text-left px-3 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                Privacy Settings
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;