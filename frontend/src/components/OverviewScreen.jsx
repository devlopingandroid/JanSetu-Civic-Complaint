import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, ArrowUp, ArrowDown, MoreHorizontal, ExternalLink, Activity,
  Clock, MapPin, CheckCircle, AlertTriangle, Users, BarChart3, Filter,
  Download, RefreshCw, Eye, Bell, Search
} from 'lucide-react';
import { 
  BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, PieChart as RechartsPieChart, Pie, Cell, ComposedChart, Line
} from 'recharts';

function OverviewScreen() {
  const [timeRange, setTimeRange] = useState('7d');
  const [animatedKPIs, setAnimatedKPIs] = useState([0, 0, 0, 0, 0, 0]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const kpiData = [
    { 
      label: "Total Issues", 
      value: 2847, 
      change: "+12%", 
      trend: "up",
      icon: AlertTriangle, 
      color: "text-blue-600", 
      bg: "bg-blue-50"
    },
    { 
      label: "Pending", 
      value: 340, 
      change: "-8%", 
      trend: "down",
      icon: Clock, 
      color: "text-orange-600", 
      bg: "bg-orange-50"
    },
    { 
      label: "Resolved", 
      value: 2507, 
      change: "+15%", 
      trend: "up",
      icon: CheckCircle, 
      color: "text-green-600", 
      bg: "bg-green-50"
    },
    { 
      label: "Active Users", 
      value: 15420, 
      change: "+23%", 
      trend: "up",
      icon: Users, 
      color: "text-purple-600", 
      bg: "bg-purple-50"
    },
    {
      label: "Avg Response",
      value: 2.4,
      change: "-18%",
      trend: "up",
      icon: Activity,
      color: "text-red-600",
      bg: "bg-red-50",
      suffix: "h"
    },
    {
      label: "Satisfaction",
      value: 94.2,
      change: "+5%",
      trend: "up",
      icon: CheckCircle,
      color: "text-teal-600",
      bg: "bg-teal-50",
      suffix: "%"
    }
  ];

  const performanceData = [
    { name: 'Jan', issues: 240, resolved: 220, pending: 20, efficiency: 92 },
    { name: 'Feb', issues: 280, resolved: 250, pending: 30, efficiency: 89 },
    { name: 'Mar', issues: 320, resolved: 300, pending: 20, efficiency: 94 },
    { name: 'Apr', issues: 290, resolved: 280, pending: 10, efficiency: 97 },
    { name: 'May', issues: 350, resolved: 330, pending: 20, efficiency: 94 },
    { name: 'Jun', issues: 380, resolved: 360, pending: 20, efficiency: 95 }
  ];

  const categoryData = [
    { name: 'Roads', value: 35, color: '#2E7D32', count: 995 },
    { name: 'Waste', value: 25, color: '#26A69A', count: 712 },
    { name: 'Water', value: 20, color: '#FFA726', count: 569 },
    { name: 'Electricity', value: 15, color: '#D81B60', count: 427 },
    { name: 'Others', value: 5, color: '#9E9E9E', count: 142 }
  ];

  const departmentPerformance = [
    { name: 'Roads Dept', efficiency: 96, issues: 420, resolved: 403, rating: 4.8 },
    { name: 'Water Dept', efficiency: 91, issues: 280, resolved: 255, rating: 4.5 },
    { name: 'Waste Mgmt', efficiency: 88, issues: 350, resolved: 308, rating: 4.3 },
    { name: 'Electricity', efficiency: 94, issues: 180, resolved: 169, rating: 4.6 },
    { name: 'Public Safety', efficiency: 99, issues: 85, resolved: 84, rating: 4.9 }
  ];

  const recentActivity = [
    { 
      id: 1, 
      type: "issue_created", 
      user: "Hari Singh", 
      description: "reported pothole issue on Main Street", 
      time: "2 mins ago", 
      avatar: "JD",
      priority: "high",
      location: "Main St"
    },
    { 
      id: 2, 
      type: "issue_resolved", 
      user: "Water Dept", 
      description: "resolved water leakage complaint", 
      time: "5 mins ago", 
      avatar: "WD",
      priority: "medium",
      location: "Oak Ave"
    },
    { 
      id: 3, 
      type: "department_update", 
      user: "Roads Dept", 
      description: "updated bridge maintenance status", 
      time: "10 mins ago", 
      avatar: "RD",
      priority: "low",
      location: "City Bridge"
    },
    { 
      id: 4, 
      type: "user_joined", 
      user: "Chirag Kaushik", 
      description: "registered on platform", 
      time: "15 mins ago", 
      avatar: "SS",
      priority: "info",
      location: "District 2"
    }
  ];

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsRefreshing(false);
  };

  const handleExport = () => {
    const data = JSON.stringify({ kpiData, performanceData, categoryData }, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `dashboard-data-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  useEffect(() => {
    kpiData.forEach((kpi, index) => {
      let start = 0;
      const end = kpi.value;
      const duration = 2000;
      const increment = end / (duration / 50);
      
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          start = end;
          clearInterval(timer);
        }
        setAnimatedKPIs(prev => {
          const newKPIs = [...prev];
          newKPIs[index] = start;
          return newKPIs;
        });
      }, 50);
    });
  }, [timeRange]);

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

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
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
          <h2 className="text-3xl font-bold text-gray-800">Dashboard Overview</h2>
          <p className="text-gray-600 mt-1">Monitor civic management metrics</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="p-2 bg-white rounded-xl border border-gray-200 hover:shadow-md transition-all">
            <Bell className="w-5 h-5 text-gray-600" />
          </button>

          <div className="flex items-center gap-1 bg-white rounded-xl p-1 border border-gray-200">
            {['24h', '7d', '30d', '90d'].map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  timeRange === range
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {range}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="p-2 bg-white rounded-xl border border-gray-200 hover:shadow-md transition-all disabled:opacity-50"
            >
              <RefreshCw className={`w-5 h-5 text-gray-600 ${isRefreshing ? 'animate-spin' : ''}`} />
            </button>
            
            <button
              onClick={handleExport}
              className="px-4 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-all flex items-center gap-2 font-medium"
            >
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
        {kpiData.map((kpi, index) => (
          <motion.div
            key={index}
            className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-all"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl ${kpi.bg}`}>
                <kpi.icon className={`w-6 h-6 ${kpi.color}`} />
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
              {index < 4 
                ? Math.floor(animatedKPIs[index]).toLocaleString()
                : animatedKPIs[index].toFixed(1)
              }
              {kpi.suffix && <span className="text-lg">{kpi.suffix}</span>}
            </div>
            
            <div className="text-sm text-gray-600 font-medium">
              {kpi.label}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Performance Chart */}
        <div className="xl:col-span-2 bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-gray-900">Performance Analytics</h3>
              <p className="text-sm text-gray-600">Monthly tracking</p>
            </div>
            <MoreHorizontal className="w-5 h-5 text-gray-400" />
          </div>
          
          <ResponsiveContainer width="100%" height={350}>
            <ComposedChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#666' }} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: '#666' }} tickLine={false} axisLine={false} />
              <Tooltip content={<CustomTooltip />} />
              
              <Bar dataKey="issues" fill="#FFA726" radius={[4, 4, 0, 0]} name="Issues" />
              <Bar dataKey="resolved" fill="#2E7D32" radius={[4, 4, 0, 0]} name="Resolved" />
              <Line type="monotone" dataKey="efficiency" stroke="#26A69A" strokeWidth={2} name="Efficiency" />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        {/* Category Distribution */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-gray-900">Issue Categories</h3>
              <p className="text-sm text-gray-600">Distribution by type</p>
            </div>
          </div>
          
          <ResponsiveContainer width="100%" height={250}>
            <RechartsPieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                innerRadius={35}
                dataKey="value"
                stroke="none"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </RechartsPieChart>
          </ResponsiveContainer>
          
          <div className="mt-4 space-y-2">
            {categoryData.map((category, index) => (
              <div key={index} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: category.color }}
                  />
                  <span className="text-gray-700">{category.name}</span>
                </div>
                <span className="font-semibold text-gray-900">{category.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Department Performance */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-bold text-gray-900">Department Performance</h3>
            <p className="text-sm text-gray-600">Efficiency ratings</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {departmentPerformance.map((dept, index) => (
            <div key={index} className="p-4 rounded-xl border border-gray-200 hover:shadow-md transition-all">
              <div className="text-center mb-4">
                <h4 className="font-bold text-gray-900">{dept.name}</h4>
                <div className="text-sm text-gray-600 mt-1">{dept.rating}/5.0</div>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Efficiency</span>
                  <span className="font-semibold text-green-600">{dept.efficiency}%</span>
                </div>
                
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="h-2 bg-green-500 rounded-full transition-all duration-1000"
                    style={{ width: `${dept.efficiency}%` }}
                  />
                </div>
                
                <div className="text-xs text-gray-500 text-center">
                  {dept.resolved}/{dept.issues} resolved
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-bold text-gray-900">Recent Activity</h3>
            <p className="text-sm text-gray-600">Latest updates</p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search activities..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>
            
            <button className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-2">
              <Eye className="w-4 h-4" />
              View All
            </button>
          </div>
        </div>
        
        <div className="space-y-3">
          {recentActivity.map((activity, index) => (
            <div
              key={activity.id}
              className="flex items-center gap-4 p-4 rounded-xl hover:bg-gray-50 transition-all"
            >
              <div className="w-10 h-10 bg-gray-500 rounded-xl flex items-center justify-center text-white font-bold text-sm">
                {activity.avatar}
              </div>
              
              <div className="flex-1">
                <p className="text-gray-800">
                  <span className="font-semibold">{activity.user}</span> {activity.description}
                </p>
                <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {activity.time}
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {activity.location}
                  </div>
                </div>
              </div>
              
              <span className={`px-2 py-1 rounded-lg text-xs font-medium ${getPriorityColor(activity.priority)}`}>
                {activity.priority}
              </span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default OverviewScreen;
