import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowUp, ArrowDown, Download, Clock
} from 'lucide-react';
import { 
  LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, PieChart as RechartsPieChart, Pie, Cell
} from 'recharts';

function AnalyticsScreen() {
  const [timeRange, setTimeRange] = useState('30d');

  const analyticsKPIs = [
    {
      label: "Resolution Rate",
      value: 87.5,
      change: "+5.2%",
      trend: "up",
      color: "text-green-600",
      bg: "bg-green-50",
      suffix: "%"
    },
    {
      label: "Avg Response Time",
      value: 4.2,
      change: "-15%",
      trend: "up",
      color: "text-blue-600",
      bg: "bg-blue-50",
      suffix: "hrs"
    },
    {
      label: "Citizen Satisfaction",
      value: 92.3,
      change: "+8.1%",
      trend: "up",
      color: "text-purple-600",
      bg: "bg-purple-50",
      suffix: "%"
    },
    {
      label: "Cost Per Resolution",
      value: 284,
      change: "-12%",
      trend: "up",
      color: "text-orange-600",
      bg: "bg-orange-50",
      prefix: "₹"
    }
  ];

  const monthlyTrends = [
    { month: 'Jan', issues: 240, resolved: 220, satisfaction: 85 },
    { month: 'Feb', issues: 280, resolved: 250, satisfaction: 88 },
    { month: 'Mar', issues: 320, resolved: 300, satisfaction: 90 },
    { month: 'Apr', issues: 290, resolved: 280, satisfaction: 89 },
    { month: 'May', issues: 350, resolved: 330, satisfaction: 92 },
    { month: 'Jun', issues: 380, resolved: 360, satisfaction: 93 }
  ];

  const priorityDistribution = [
    { name: 'High', value: 25, fill: '#f87171' },
    { name: 'Medium', value: 45, fill: '#fbbf24' },
    { name: 'Low', value: 30, fill: '#34d399' }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-100">
          <p className="font-semibold text-gray-800 mb-2">{`${label}`}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {`${entry.dataKey}: ${entry.value}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">Analytics Report</h2>
          <p className="text-gray-600 mt-1">Performance metrics and trends</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 mr-4">
            {['7d', '30d', '90d', '1y'].map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  timeRange === range
                    ? 'bg-blue-500 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-100'
                }`}
              >
                {range}
              </button>
            ))}
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors">
            <Download className="w-4 h-4" />
            Export Report
          </button>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {analyticsKPIs.map((kpi, index) => (
          <motion.div
            key={index}
            className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl ${kpi.bg}`}>
                <Clock className={`w-6 h-6 ${kpi.color}`} />
              </div>
              <div className="flex items-center gap-1">
                {kpi.trend === 'up' ? (
                  <ArrowUp className="w-4 h-4 text-green-600" />
                ) : (
                  <ArrowDown className="w-4 h-4 text-red-600" />
                )}
                <span className={`text-sm font-medium ${
                  kpi.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {kpi.change}
                </span>
              </div>
            </div>
            
            <div className={`text-3xl font-bold ${kpi.color} mb-2`}>
              {kpi.prefix}{kpi.value}{kpi.suffix}
            </div>
            
            <div className="text-sm text-gray-600 font-medium">
              {kpi.label}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Performance Chart */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-bold text-gray-900">Monthly Performance</h3>
            <p className="text-sm text-gray-600">Issues, resolution rate, and satisfaction</p>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={400}>
          <RechartsLineChart data={monthlyTrends}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#666' }} tickLine={false} />
            <YAxis tick={{ fontSize: 12, fill: '#666' }} tickLine={false} axisLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Line 
              type="monotone" 
              dataKey="issues" 
              stroke="#FFA726" 
              strokeWidth={2}
              dot={{ fill: '#FFA726', strokeWidth: 2, r: 4 }}
              name="Issues"
            />
            <Line 
              type="monotone" 
              dataKey="resolved" 
              stroke="#2E7D32" 
              strokeWidth={2}
              dot={{ fill: '#2E7D32', strokeWidth: 2, r: 4 }}
              name="Resolved"
            />
            <Line 
              type="monotone" 
              dataKey="satisfaction" 
              stroke="#9C27B0" 
              strokeWidth={2}
              dot={{ fill: '#9C27B0', strokeWidth: 2, r: 4 }}
              name="Satisfaction %"
            />
          </RechartsLineChart>
        </ResponsiveContainer>
      </div>

      {/* Priority Distribution */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-bold text-gray-900">Priority Distribution</h3>
            <p className="text-sm text-gray-600">Issues by priority level</p>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Pie Chart */}
          <div>
            <ResponsiveContainer width="100%" height={300}>
              <RechartsPieChart>
                <Pie
                  data={priorityDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {priorityDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip />
              </RechartsPieChart>
            </ResponsiveContainer>
          </div>
          
          {/* Stats */}
          <div className="space-y-4">
            {priorityDistribution.map((priority, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 rounded-xl bg-gray-50"
              >
                <div className="flex items-center gap-3">
                  <div 
                    className="w-4 h-4 rounded-full" 
                    style={{ backgroundColor: priority.fill }}
                  ></div>
                  <span className="font-semibold text-gray-800">{priority.name} Priority</span>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-900">{priority.value}%</div>
                  <div className="text-sm text-gray-600">of total</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-bold text-gray-900">Summary</h3>
            <p className="text-sm text-gray-600">Key performance highlights</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-green-50 rounded-xl p-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="font-semibold text-green-800">Good Progress</span>
            </div>
            <p className="text-sm text-green-700">Resolution rate improved by 5.2% with 87.5% success</p>
          </div>
          
          <div className="bg-blue-50 rounded-xl p-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="font-semibold text-blue-800">Response Time</span>
            </div>
            <p className="text-sm text-blue-700">Average response time reduced to 4.2 hours</p>
          </div>
          
          <div className="bg-purple-50 rounded-xl p-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
              <span className="font-semibold text-purple-800">Satisfaction</span>
            </div>
            <p className="text-sm text-purple-700">Citizen satisfaction at 92.3%, highest this year</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default AnalyticsScreen;
