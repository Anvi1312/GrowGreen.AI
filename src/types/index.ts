export interface SensorData {
  soilMoisture: number;
  temperature: number;
  humidity: number;
  co2: number;
  lightIntensity: number;
  waterTankLevel: number;
  timestamp: Date;
}

export interface SensorStatus {
  id: string;
  name: string;
  value: number;
  unit: string;
  status: 'optimal' | 'warning' | 'critical';
  icon: string;
  min: number;
  max: number;
}

export interface Recommendation {
  id: string;
  type: 'irrigation' | 'fertilizer' | 'pest' | 'harvest' | 'general';
  priority: 'high' | 'medium' | 'low';
  title: string;
  description: string;
  action?: string;
  timestamp: Date;
}

export interface CarbonCredit {
  id: string;
  amount: number;
  earnedDate: Date;
  source: string;
  status: 'earned' | 'pending' | 'sold';
  value: number;
}

export interface MarketOffer {
  id: string;
  buyerName: string;
  company: string;
  pricePerCredit: number;
  quantity: number;
  totalValue: number;
  expiryDate: Date;
  rating: number;
}

export interface Notification {
  id: string;
  type: 'info' | 'warning' | 'success' | 'error';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
}

export interface FarmProfile {
  id: string;
  farmName: string;
  location: string;
  size: number;
  cropType: string;
  sustainabilityGoal: number;
  ownerName: string;
  email: string;
}