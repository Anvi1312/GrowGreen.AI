import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Star, Building, Clock, DollarSign, TrendingUp } from 'lucide-react';

const CarbonMarketplace: React.FC = () => {
  const { marketOffers, carbonCredits, sellCredits } = useApp();
  const [selectedOffer, setSelectedOffer] = useState<string | null>(null);
  const [quantity, setQuantity] = useState<number>(1);

  const availableCredits = carbonCredits.filter(c => c.status === 'earned').reduce((sum, c) => sum + c.amount, 0);

  const handleSellCredits = (offerId: string) => {
    sellCredits(offerId, quantity);
    setSelectedOffer(null);
    setQuantity(1);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-xl p-6 border border-green-200">
          <div className="flex items-center space-x-3">
            <TrendingUp className="h-6 w-6 text-green-600" />
            <div>
              <p className="text-sm font-medium text-green-800">Available Credits</p>
              <p className="text-2xl font-bold text-green-900">{availableCredits.toFixed(1)}</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-cyan-100 rounded-xl p-6 border border-blue-200">
          <div className="flex items-center space-x-3">
            <DollarSign className="h-6 w-6 text-blue-600" />
            <div>
              <p className="text-sm font-medium text-blue-800">Market Price</p>
              <p className="text-2xl font-bold text-blue-900">₹52-55</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-indigo-100 rounded-xl p-6 border border-purple-200">
          <div className="flex items-center space-x-3">
            <Building className="h-6 w-6 text-purple-600" />
            <div>
              <p className="text-sm font-medium text-purple-800">Active Offers</p>
              <p className="text-2xl font-bold text-purple-900">{marketOffers.length}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Market Offers</h3>
        <div className="space-y-4">
          {marketOffers.map(offer => (
            <div key={offer.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className="bg-gray-100 p-3 rounded-full">
                    <Building className="h-6 w-6 text-gray-600" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900">{offer.buyerName}</h4>
                    <p className="text-sm text-gray-600">{offer.company}</p>
                    <div className="flex items-center space-x-1 mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`h-4 w-4 ${i < Math.floor(offer.rating) ? 'text-yellow-500 fill-current' : 'text-gray-300'}`} 
                        />
                      ))}
                      <span className="text-sm text-gray-600 ml-1">({offer.rating})</span>
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <p className="text-2xl font-bold text-green-600">₹{offer.pricePerCredit}</p>
                  <p className="text-sm text-gray-600">per credit</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-600">Quantity Needed</p>
                  <p className="text-lg font-semibold text-gray-900">{offer.quantity} credits</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Value</p>
                  <p className="text-lg font-semibold text-gray-900">₹{offer.totalValue.toLocaleString()}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-600">Expires</p>
                    <p className="text-sm font-medium text-gray-900">{offer.expiryDate.toLocaleDateString()}</p>
                  </div>
                </div>
              </div>

              {selectedOffer === offer.id ? (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Quantity to Sell
                      </label>
                      <input
                        type="number"
                        min="1"
                        max={Math.min(availableCredits, offer.quantity)}
                        value={quantity}
                        onChange={(e) => setQuantity(parseInt(e.target.value))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      />
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Total Value</p>
                      <p className="text-xl font-bold text-green-600">₹{(quantity * offer.pricePerCredit).toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="flex space-x-3">
                    <button
                      onClick={() => handleSellCredits(offer.id)}
                      className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors"
                      disabled={quantity > availableCredits || quantity > offer.quantity}
                    >
                      Confirm Sale
                    </button>
                    <button
                      onClick={() => setSelectedOffer(null)}
                      className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setSelectedOffer(offer.id);
                    setQuantity(Math.min(availableCredits, offer.quantity));
                  }}
                  className="w-full bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors"
                  disabled={availableCredits === 0}
                >
                  {availableCredits === 0 ? 'No Credits Available' : 'Sell Credits'}
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Transactions</h3>
          <div className="space-y-3">
            {[
              { buyer: 'EcoTech Solutions', amount: 5.2, price: 52, date: '2024-01-20' },
              { buyer: 'Green Corp', amount: 3.8, price: 48, date: '2024-01-18' },
              { buyer: 'Carbon Zero Ltd', amount: 7.1, price: 50, date: '2024-01-15' },
            ].map((transaction, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{transaction.buyer}</p>
                  <p className="text-sm text-gray-600">{transaction.date}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900">{transaction.amount} credits</p>
                  <p className="text-sm text-green-600">₹{transaction.price}/credit</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Market Trends</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <span className="font-medium text-green-800">Average Price</span>
              <span className="text-lg font-bold text-green-600">₹52.3</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <span className="font-medium text-blue-800">Demand</span>
              <span className="text-lg font-bold text-blue-600">High</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
              <span className="font-medium text-purple-800">Price Trend</span>
              <span className="text-lg font-bold text-purple-600">+5.2%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarbonMarketplace;