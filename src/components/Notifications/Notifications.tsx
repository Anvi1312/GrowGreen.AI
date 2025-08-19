import React from 'react';
import { useApp } from '../../context/AppContext';
import { Bell, CheckCircle, AlertTriangle, Info, X } from 'lucide-react';

const Notifications: React.FC = () => {
  const { notifications, markNotificationRead } = useApp();

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success': return CheckCircle;
      case 'warning': return AlertTriangle;
      case 'error': return AlertTriangle;
      default: return Info;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'success': return 'text-green-600 bg-green-100 border-green-200';
      case 'warning': return 'text-yellow-600 bg-yellow-100 border-yellow-200';
      case 'error': return 'text-red-600 bg-red-100 border-red-200';
      default: return 'text-blue-600 bg-blue-100 border-blue-200';
    }
  };

  const unreadNotifications = notifications.filter(n => !n.read);
  const readNotifications = notifications.filter(n => n.read);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center space-x-3">
        <Bell className="h-8 w-8 text-blue-600" />
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Notifications & Alerts</h2>
          <p className="text-gray-600 mt-1">Stay updated with your farm's important events</p>
        </div>
      </div>

      {unreadNotifications.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-900">New Notifications ({unreadNotifications.length})</h3>
          {unreadNotifications.map(notification => {
            const IconComponent = getNotificationIcon(notification.type);
            return (
              <div 
                key={notification.id}
                className={`border rounded-xl p-4 ${getNotificationColor(notification.type)} ${
                  !notification.read ? 'shadow-md' : ''
                }`}
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 mt-1">
                    <IconComponent className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-lg font-semibold">{notification.title}</h4>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs opacity-75">
                          {notification.timestamp.toLocaleString()}
                        </span>
                        <button
                          onClick={() => markNotificationRead(notification.id)}
                          className="p-1 hover:bg-white hover:bg-opacity-50 rounded transition-colors"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    <p className="mt-1">{notification.message}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {readNotifications.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-900">Previous Notifications</h3>
          {readNotifications.map(notification => {
            const IconComponent = getNotificationIcon(notification.type);
            return (
              <div 
                key={notification.id}
                className="border border-gray-200 rounded-xl p-4 bg-gray-50 opacity-75"
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 mt-1">
                    <IconComponent className="h-5 w-5 text-gray-500" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-gray-700">{notification.title}</h4>
                      <span className="text-xs text-gray-500">
                        {notification.timestamp.toLocaleString()}
                      </span>
                    </div>
                    <p className="mt-1 text-gray-600">{notification.message}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {notifications.length === 0 && (
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 text-center">
          <Bell className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-700 mb-2">No Notifications</h3>
          <p className="text-gray-500">You're all caught up! New notifications will appear here.</p>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Notification Settings</h3>
        <div className="space-y-4">
          {[
            { label: 'Sensor Alerts', description: 'Get notified when sensor values go out of range', enabled: true },
            { label: 'Irrigation Reminders', description: 'Receive reminders for scheduled irrigation', enabled: true },
            { label: 'Carbon Credit Updates', description: 'Notifications about new credits and market offers', enabled: true },
            { label: 'System Maintenance', description: 'Updates about system maintenance and upgrades', enabled: false },
            { label: 'Weekly Reports', description: 'Summary reports of your farm performance', enabled: true },
          ].map((setting, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-900">{setting.label}</h4>
                <p className="text-sm text-gray-600">{setting.description}</p>
              </div>
              <div className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                setting.enabled ? 'bg-green-600' : 'bg-gray-300'
              }`}>
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  setting.enabled ? 'translate-x-6' : 'translate-x-1'
                }`} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Notifications;