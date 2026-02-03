'use client';

import { motion } from 'framer-motion';
import { Package, TrendingUp, TrendingDown, Minus, BarChart3 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { Product } from '@/types/product';

interface StockInfoProps {
  product: Product;
}

export default function StockInfo({ product }: StockInfoProps) {
  // Check if product has stock data
  if (!product.stockData && !product.consumptionHistory) {
    return null;
  }

  const stockData = product.stockData;
  const history = product.consumptionHistory;

  // Format chart data - filter out months without data inputted
  const rawChartData = history?.monthlyData || [];
  
  // Find last month with consumption > 0 (last month with data inputted)
  const lastActiveMonthIndex = rawChartData.reduce((lastIndex, item, currentIndex) => {
    return item.consumption > 0 ? currentIndex : lastIndex;
  }, -1);
  
  // Only include months up to and including last active month
  const filteredData = lastActiveMonthIndex >= 0 
    ? rawChartData.slice(0, lastActiveMonthIndex + 1)
    : [];
  
  const chartData = filteredData.map((item: any) => ({
    month: new Date(item.month + '-01').toLocaleDateString('en-US', { month: 'short', year: '2-digit' }),
    consumption: item.consumption,
  }));

  // Get trend icon
  const getTrendIcon = (trend?: string) => {
    switch (trend) {
      case 'increasing':
        return <TrendingUp className="h-4 w-4 text-red-600" />;
      case 'decreasing':
        return <TrendingDown className="h-4 w-4 text-green-600" />;
      default:
        return <Minus className="h-4 w-4 text-gray-400" />;
    }
  };

  // Get stock status color
  const getStockBadge = (status?: string) => {
    switch (status) {
      case 'high':
        return <Badge className="bg-green-100 text-green-800 border-green-300">High Stock</Badge>;
      case 'medium':
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-300">Medium Stock</Badge>;
      case 'low':
        return <Badge className="bg-orange-100 text-orange-800 border-orange-300">Low Stock</Badge>;
      case 'critical':
        return <Badge className="bg-red-100 text-red-800 border-red-300">Critical</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Package className="h-5 w-5 text-gray-600" />
          <h3 className="font-semibold text-lg text-gray-900">Design Paper Stock & Usage</h3>
        </div>

        <div className="space-y-6">
          {/* Current Stock */}
          {stockData && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-500">Current Stock (Design Paper)</span>
                {stockData.stockStatus && getStockBadge(stockData.stockStatus)}
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-gray-900">
                  {stockData.currentStock?.toLocaleString() || 'N/A'}
                </span>
                <span className="text-lg text-gray-600">kg</span>
              </div>
              {stockData.currentStock != null && stockData.currentStock > 0 && (
                <p className="text-xs text-gray-400 mt-1">
                  ≈ {Math.round(stockData.currentStock * 4).toLocaleString()} sheets (estimated)
                </p>
              )}
              {stockData.monthsRemaining != null && stockData.monthsRemaining > 0 && (
                <p className="text-xs text-gray-500 mt-1">
                  ~{stockData.monthsRemaining.toFixed(1)} months remaining
                </p>
              )}
            </div>
          )}

          {/* Average Consumption */}
          {stockData && stockData.avgConsumption != null && (
            <div>
              <Separator className="mb-4" />
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-500">Avg. Monthly Consumption</span>
                {history?.trend && (
                  <div className="flex items-center gap-1">
                    {getTrendIcon(history.trend)}
                    <span className="text-xs text-gray-500 capitalize">{history.trend}</span>
                  </div>
                )}
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-gray-900">
                  {stockData.avgConsumption.toFixed(1)}
                </span>
                <span className="text-base text-gray-600">kg/month</span>
              </div>
              {history?.totalConsumption != null && (
                <>
                  <p className="text-xs text-gray-400 mt-1">
                    ≈ {Math.round(stockData.avgConsumption * 4).toLocaleString()} sheets/month (est.)
                  </p>
                  <p className="text-xs text-gray-500">
                    Last 6 months: {history.totalConsumption} kg total
                  </p>
                </>
              )}
            </div>
          )}

          {/* Consumption Chart */}
          {chartData.length > 0 && (
            <div>
              <Separator className="mb-4" />
              <div className="flex items-center gap-2 mb-3">
                <BarChart3 className="h-4 w-4 text-gray-600" />
                <span className="text-sm font-medium text-gray-700">6-Month Consumption Trend (kg)</span>
              </div>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis 
                      dataKey="month" 
                      tick={{ fontSize: 11, fill: '#6b7280' }}
                      tickLine={false}
                    />
                    <YAxis 
                      tick={{ fontSize: 11, fill: '#6b7280' }}
                      tickLine={false}
                      axisLine={false}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'white', 
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                        fontSize: '12px'
                      }}
                      labelStyle={{ fontWeight: 'bold' }}
                      formatter={(value) => [`${value} kg`, 'Consumption']}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="consumption" 
                      stroke="#f59e0b" 
                      strokeWidth={2}
                      dot={{ fill: '#f59e0b', r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {/* Last Updated */}
          {stockData?.lastUpdated && (
            <div className="text-xs text-gray-400 text-center pt-2">
              Last updated: {new Date(stockData.lastUpdated).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
              })}
            </div>
          )}
        </div>
      </Card>
    </motion.div>
  );
}
