import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { SensorData, SensorStatus, Recommendation, CarbonCredit, MarketOffer, Notification, FarmProfile } from '../types';

interface AppContextType {
  sensorData: SensorData;
  sensorStatuses: SensorStatus[];
  recommendations: Recommendation[];
  carbonCredits: CarbonCredit[];
  marketOffers: MarketOffer[];
  notifications: Notification[];
  farmProfile: FarmProfile;
  irrigationActive: boolean;
  totalEarnings: number;
  updateSensorValue: (sensorId: string, value: number) => void;
  activateIrrigation: () => void;
  sellCredits: (offerId: string, quantity: number) => void;
  markNotificationRead: (notificationId: string) => void;
  updateFarmProfile: (profile: Partial<FarmProfile>) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

const initialSensorData: SensorData = {
  soilMoisture: 65,
  temperature: 24,
  humidity: 70,
  co2: 400,
  lightIntensity: 75,
  waterTankLevel: 80,
  timestamp: new Date()
};

const initialSensorStatuses: SensorStatus[] = [
  { id: 'soil', name: 'Soil Moisture', value: 65, unit: '%', status: 'optimal', icon: 'Droplets', min: 0, max: 100 },
  { id: 'temp', name: 'Temperature', value: 24, unit: '°C', status: 'optimal', icon: 'Thermometer', min: 0, max: 50 },
  { id: 'humidity', name: 'Humidity', value: 70, unit: '%', status: 'optimal', icon: 'Cloud', min: 0, max: 100 },
  { id: 'co2', name: 'CO₂ Level', value: 400, unit: 'ppm', status: 'optimal', icon: 'Wind', min: 300, max: 800 },
  { id: 'light', name: 'Light Intensity', value: 75, unit: '%', status: 'optimal', icon: 'Sun', min: 0, max: 100 },
  { id: 'water', name: 'Water Tank', value: 80, unit: '%', status: 'optimal', icon: 'Gauge', min: 0, max: 100 }
];

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [sensorData, setSensorData] = useState<SensorData>(initialSensorData);
  const [sensorStatuses, setSensorStatuses] = useState<SensorStatus[]>(initialSensorStatuses);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [carbonCredits, setCarbonCredits] = useState<CarbonCredit[]>([]);
  const [marketOffers, setMarketOffers] = useState<MarketOffer[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [irrigationActive, setIrrigationActive] = useState(false);
  const [totalEarnings, setTotalEarnings] = useState(15420);
  const [farmProfile, setFarmProfile] = useState<FarmProfile>({
    id: '1',
    farmName: 'Green Valley Farm',
    location: 'Maharashtra, India',
    size: 5.2,
    cropType: 'Tomatoes',
    sustainabilityGoal: 85,
    ownerName: 'Rajesh Kumar',
    email: 'rajesh@greenvalley.com'
  });

  // Simulate sensor data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setSensorData(prev => ({
        ...prev,
        soilMoisture: Math.max(20, prev.soilMoisture + (Math.random() - 0.5) * 2),
        temperature: Math.max(15, Math.min(35, prev.temperature + (Math.random() - 0.5) * 1)),
        humidity: Math.max(30, Math.min(90, prev.humidity + (Math.random() - 0.5) * 3)),
        co2: Math.max(300, Math.min(600, prev.co2 + (Math.random() - 0.5) * 10)),
        lightIntensity: Math.max(0, Math.min(100, prev.lightIntensity + (Math.random() - 0.5) * 5)),
        waterTankLevel: irrigationActive ? Math.max(0, prev.waterTankLevel - 0.5) : prev.waterTankLevel,
        timestamp: new Date()
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, [irrigationActive]);

  // Update sensor statuses based on sensor data
  useEffect(() => {
    setSensorStatuses(prev => prev.map(sensor => {
      let value = sensorData[sensor.id as keyof SensorData] as number;
      if (sensor.id === 'soil') value = sensorData.soilMoisture;
      if (sensor.id === 'temp') value = sensorData.temperature;
      if (sensor.id === 'humidity') value = sensorData.humidity;
      if (sensor.id === 'co2') value = sensorData.co2;
      if (sensor.id === 'light') value = sensorData.lightIntensity;
      if (sensor.id === 'water') value = sensorData.waterTankLevel;

      let status: 'optimal' | 'warning' | 'critical' = 'optimal';
      if (sensor.id === 'soil' && value < 40) status = 'warning';
      if (sensor.id === 'soil' && value < 25) status = 'critical';
      if (sensor.id === 'water' && value < 30) status = 'warning';
      if (sensor.id === 'water' && value < 15) status = 'critical';
      if (sensor.id === 'temp' && (value > 30 || value < 18)) status = 'warning';
      if (sensor.id === 'temp' && (value > 35 || value < 15)) status = 'critical';

      return { ...sensor, value, status };
    }));
  }, [sensorData]);

  // Generate recommendations based on sensor data
  useEffect(() => {
    const newRecommendations: Recommendation[] = [];
    
    if (sensorData.soilMoisture < 40) {
      newRecommendations.push({
        id: 'irrigation-' + Date.now(),
        type: 'irrigation',
        priority: sensorData.soilMoisture < 25 ? 'high' : 'medium',
        title: 'Irrigation Needed',
        description: 'Soil moisture is low. Consider activating irrigation system.',
        action: 'Activate Irrigation',
        timestamp: new Date()
      });
    }

    if (sensorData.co2 > 500) {
      newRecommendations.push({
        id: 'ventilation-' + Date.now(),
        type: 'general',
        priority: 'medium',
        title: 'Improve Ventilation',
        description: 'CO₂ levels are elevated. Increase ventilation to optimize growth.',
        timestamp: new Date()
      });
    }

    if (sensorData.temperature > 30) {
      newRecommendations.push({
        id: 'cooling-' + Date.now(),
        type: 'general',
        priority: 'high',
        title: 'Temperature Control',
        description: 'High temperature detected. Activate cooling system.',
        timestamp: new Date()
      });
    }

    setRecommendations(prev => {
      const filtered = prev.filter(rec => 
        !(rec.type === 'irrigation' && sensorData.soilMoisture >= 40) &&
        !(rec.type === 'general' && rec.title.includes('CO₂') && sensorData.co2 <= 500) &&
        !(rec.type === 'general' && rec.title.includes('Temperature') && sensorData.temperature <= 30)
      );
      return [...filtered, ...newRecommendations].slice(0, 5);
    });
  }, [sensorData]);

  // Initialize sample data
  useEffect(() => {
    // Carbon credits
    setCarbonCredits([
      { id: '1', amount: 12.5, earnedDate: new Date('2024-01-15'), source: 'Water Conservation', status: 'earned', value: 625 },
      { id: '2', amount: 8.3, earnedDate: new Date('2024-01-10'), source: 'Organic Farming', status: 'sold', value: 415 },
      { id: '3', amount: 15.7, earnedDate: new Date('2024-01-08'), source: 'Energy Efficiency', status: 'earned', value: 785 },
    ]);

    // Market offers
    setMarketOffers([
      { id: '1', buyerName: 'EcoTech Solutions', company: 'Green Corp', pricePerCredit: 52, quantity: 10, totalValue: 520, expiryDate: new Date('2024-02-01'), rating: 4.8 },
      { id: '2', buyerName: 'Sustainable Industries', company: 'Carbon Zero Ltd', pricePerCredit: 48, quantity: 25, totalValue: 1200, expiryDate: new Date('2024-01-28'), rating: 4.6 },
      { id: '3', buyerName: 'Global Green Initiative', company: 'Planet First', pricePerCredit: 55, quantity: 15, totalValue: 825, expiryDate: new Date('2024-02-05'), rating: 4.9 },
    ]);

    // Notifications
    setNotifications([
      { id: '1', type: 'success', title: 'Carbon Credits Earned!', message: 'You earned 2.3 carbon credits from your water conservation efforts.', timestamp: new Date(), read: false },
      { id: '2', type: 'info', title: 'New Market Offer', message: 'EcoTech Solutions made an offer for your carbon credits at ₹52 per credit.', timestamp: new Date(Date.now() - 3600000), read: false },
      { id: '3', type: 'warning', title: 'Irrigation Alert', message: 'Soil moisture is below optimal levels in sector 2.', timestamp: new Date(Date.now() - 7200000), read: true },
    ]);
  }, []);

  const updateSensorValue = (sensorId: string, value: number) => {
    setSensorData(prev => {
      const updated = { ...prev };
      if (sensorId === 'soil') updated.soilMoisture = value;
      if (sensorId === 'temp') updated.temperature = value;
      if (sensorId === 'humidity') updated.humidity = value;
      if (sensorId === 'co2') updated.co2 = value;
      if (sensorId === 'light') updated.lightIntensity = value;
      if (sensorId === 'water') updated.waterTankLevel = value;
      updated.timestamp = new Date();
      return updated;
    });
  };

  const activateIrrigation = () => {
    setIrrigationActive(true);
    setTimeout(() => setIrrigationActive(false), 10000);
    
    // Add notification
    const newNotification: Notification = {
      id: Date.now().toString(),
      type: 'info',
      title: 'Irrigation Activated',
      message: 'Irrigation system has been activated for 10 seconds.',
      timestamp: new Date(),
      read: false
    };
    setNotifications(prev => [newNotification, ...prev]);
  };

  const sellCredits = (offerId: string, quantity: number) => {
    const offer = marketOffers.find(o => o.id === offerId);
    if (!offer) return;

    const earnings = offer.pricePerCredit * quantity;
    setTotalEarnings(prev => prev + earnings);

    // Update carbon credits
    setCarbonCredits(prev => 
      prev.map(credit => 
        credit.status === 'earned' ? 
        { ...credit, status: 'sold' as const, value: credit.value + (earnings / prev.filter(c => c.status === 'earned').length) } 
        : credit
      )
    );

    // Add notification
    const newNotification: Notification = {
      id: Date.now().toString(),
      type: 'success',
      title: 'Credits Sold Successfully!',
      message: `Sold ${quantity} carbon credits to ${offer.buyerName} for ₹${earnings}`,
      timestamp: new Date(),
      read: false
    };
    setNotifications(prev => [newNotification, ...prev]);
  };

  const markNotificationRead = (notificationId: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === notificationId ? { ...notif, read: true } : notif
      )
    );
  };

  const updateFarmProfile = (profile: Partial<FarmProfile>) => {
    setFarmProfile(prev => ({ ...prev, ...profile }));
  };

  return (
    <AppContext.Provider value={{
      sensorData,
      sensorStatuses,
      recommendations,
      carbonCredits,
      marketOffers,
      notifications,
      farmProfile,
      irrigationActive,
      totalEarnings,
      updateSensorValue,
      activateIrrigation,
      sellCredits,
      markNotificationRead,
      updateFarmProfile
    }}>
      {children}
    </AppContext.Provider>
  );
};