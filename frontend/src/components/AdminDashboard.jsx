// import React, { useState, useEffect, useRef } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { 
//   BarChart3, Users, AlertTriangle, CheckCircle, Clock,
//   Filter, Search, Download, Eye, Edit, Trash2, Plus,
//   TrendingUp, MapPin, Calendar, Settings, Bell, 
//   Sparkles, ArrowUp, ArrowDown, MoreHorizontal,
//   ChevronDown, RefreshCcw, ExternalLink, Activity,
//   FileText, Layout, Zap, LogOut, HelpCircle, 
//   ToggleLeft, ToggleRight, Target, Gauge, PieChart,
//   BarChart, LineChart, DollarSign, Calendar as CalendarIcon,
//   Globe, Shield, Percent, Database
// } from 'lucide-react';
// import { 
//   BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, 
//   ResponsiveContainer, PieChart as RechartsPieChart, Pie, Cell, LineChart as RechartsLineChart, 
//   Line, AreaChart, Area, RadialBarChart, RadialBar, Legend
// } from 'recharts';
// import logo from "../assets/logo.png";

// function AdminDashboard({ onLogout }) {
//   const [activeTab, setActiveTab] = useState('overview');
//   const [filterStatus, setFilterStatus] = useState('all');
//   const [searchTerm, setSearchTerm] = useState('');
//   const [showFilters, setShowFilters] = useState(false);
//   const [showSettingsDropdown, setShowSettingsDropdown] = useState(false);
//   const [animatedKPIs, setAnimatedKPIs] = useState([0, 0, 0, 0]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [timeRange, setTimeRange] = useState('7d');
//   const [darkMode, setDarkMode] = useState(false);
//   const filtersRef = useRef(null);
//   const dropdownRef = useRef(null);

//   const kpiData = [
//     { 
//       label: "Total Issues", 
//       value: 2847, 
//       change: "+12%", 
//       trend: "up",
//       icon: AlertTriangle, 
//       color: "text-blue-600", 
//       bg: "bg-blue-50",
//       gradientFrom: "from-blue-500",
//       gradientTo: "to-blue-600"
//     },
//     { 
//       label: "Pending", 
//       value: 340, 
//       change: "-8%", 
//       trend: "down",
//       icon: Clock, 
//       color: "text-accent-amber", 
//       bg: "bg-amber-50",
//       gradientFrom: "from-amber-500",
//       gradientTo: "to-orange-500"
//     },
//     { 
//       label: "Resolved", 
//       value: 2507, 
//       change: "+15%", 
//       trend: "up",
//       icon: CheckCircle, 
//       color: "text-primary-500", 
//       bg: "bg-green-50",
//       gradientFrom: "from-primary-500",
//       gradientTo: "to-accent-teal"
//     },
//     { 
//       label: "Active Users", 
//       value: 15420, 
//       change: "+23%", 
//       trend: "up",
//       icon: Users, 
//       color: "text-accent-teal", 
//       bg: "bg-teal-50",
//       gradientFrom: "from-accent-teal",
//       gradientTo: "to-cyan-500"
//     }
//   ];

//   // Analytics Data
//   const analyticsKPIs = [
//     {
//       label: "Resolution Rate",
//       value: 87.5,
//       change: "+5.2%",
//       trend: "up",
//       icon: Target,
//       color: "text-green-600",
//       bg: "bg-green-50",
//       suffix: "%"
//     },
//     {
//       label: "Avg Response Time",
//       value: 4.2,
//       change: "-15%",
//       trend: "up",
//       icon: Clock,
//       color: "text-blue-600",
//       bg: "bg-blue-50",
//       suffix: "hrs"
//     },
//     {
//       label: "Citizen Satisfaction",
//       value: 92.3,
//       change: "+8.1%",
//       trend: "up",
//       icon: Gauge,
//       color: "text-purple-600",
//       bg: "bg-purple-50",
//       suffix: "%"
//     },
//     {
//       label: "Cost Per Resolution",
//       value: 284,
//       change: "-12%",
//       trend: "up",
//       icon: DollarSign,
//       color: "text-orange-600",
//       bg: "bg-orange-50",
//       prefix: "$"
//     }
//   ];

//   const monthlyTrends = [
//     { month: 'Jan', issues: 240, resolved: 220, satisfaction: 85, cost: 300 },
//     { month: 'Feb', issues: 280, resolved: 250, satisfaction: 88, cost: 295 },
//     { month: 'Mar', issues: 320, resolved: 300, satisfaction: 90, cost: 290 },
//     { month: 'Apr', issues: 290, resolved: 280, satisfaction: 89, cost: 285 },
//     { month: 'May', issues: 350, resolved: 330, satisfaction: 92, cost: 280 },
//     { month: 'Jun', issues: 380, resolved: 360, satisfaction: 93, cost: 275 }
//   ];

//   const departmentPerformance = [
//     { department: 'Roads', efficiency: 85, issues: 50, resolved: 43 },
//     { department: 'Waste', efficiency: 92, issues: 35, resolved: 32 },
//     { department: 'Water', efficiency: 78, issues: 28, resolved: 22 },
//     { department: 'Electricity', efficiency: 88, issues: 22, resolved: 19 },
//     { department: 'Parks', efficiency: 95, issues: 15, resolved: 14 }
//   ];

//   const issueCategories = [
//     { name: 'Roads', value: 35, fill: '#2E7D32' },
//     { name: 'Waste', value: 25, fill: '#26A69A' },
//     { name: 'Water', value: 20, fill: '#FFA726' },
//     { name: 'Electricity', value: 15, fill: '#D81B60' },
//     { name: 'Others', value: 5, fill: '#9E9E9E' }
//   ];

//   const priorityDistribution = [
//     { name: 'High', value: 25, fill: '#f87171' },
//     { name: 'Medium', value: 45, fill: '#fbbf24' },
//     { name: 'Low', value: 30, fill: '#34d399' }
//   ];

//   const issuesData = [
//     { 
//       id: 1, 
//       title: "Pothole on MG Road", 
//       category: "Roads", 
//       status: "In Progress", 
//       priority: "High", 
//       location: "MG Road, Sector 14", 
//       assignee: "Roads Dept", 
//       assigneeAvatar: "RD",
//       date: "2024-01-15",
//       progress: 65,
//       urgency: "critical"
//     },
//     { 
//       id: 2, 
//       title: "Broken Street Light", 
//       category: "Electricity", 
//       status: "Open", 
//       priority: "Medium", 
//       location: "Park Street", 
//       assignee: "Unassigned", 
//       assigneeAvatar: "UN",
//       date: "2024-01-14",
//       progress: 0,
//       urgency: "medium"
//     },
//     { 
//       id: 3, 
//       title: "Garbage Collection Delay", 
//       category: "Waste", 
//       status: "Resolved", 
//       priority: "Low", 
//       location: "Residential Area", 
//       assignee: "Waste Mgmt", 
//       assigneeAvatar: "WM",
//       date: "2024-01-13",
//       progress: 100,
//       urgency: "low"
//     },
//     { 
//       id: 4, 
//       title: "Water Leakage", 
//       category: "Water", 
//       status: "In Progress", 
//       priority: "High", 
//       location: "Main Market", 
//       assignee: "Water Dept", 
//       assigneeAvatar: "WD",
//       date: "2024-01-12",
//       progress: 40,
//       urgency: "high"
//     },
//     { 
//       id: 5, 
//       title: "Park Maintenance", 
//       category: "Parks", 
//       status: "Open", 
//       priority: "Low", 
//       location: "Central Park", 
//       assignee: "Parks Dept", 
//       assigneeAvatar: "PD",
//       date: "2024-01-11",
//       progress: 15,
//       urgency: "low"
//     }
//   ];

//   const chartData = [
//     { name: 'Jan', issues: 240, resolved: 220, pending: 20 },
//     { name: 'Feb', issues: 280, resolved: 250, pending: 30 },
//     { name: 'Mar', issues: 320, resolved: 300, pending: 20 },
//     { name: 'Apr', issues: 290, resolved: 280, pending: 10 },
//     { name: 'May', issues: 350, resolved: 330, pending: 20 },
//     { name: 'Jun', issues: 380, resolved: 360, pending: 20 }
//   ];

//   const trendData = [
//     { name: 'Jan', efficiency: 92 },
//     { name: 'Feb', efficiency: 89 },
//     { name: 'Mar', efficiency: 94 },
//     { name: 'Apr', efficiency: 97 },
//     { name: 'May', efficiency: 94 },
//     { name: 'Jun', efficiency: 95 }
//   ];

//   const categoryData = [
//     { name: 'Roads', value: 35, color: '#2E7D32' },
//     { name: 'Waste', value: 25, color: '#26A69A' },
//     { name: 'Water', value: 20, color: '#FFA726' },
//     { name: 'Electricity', value: 15, color: '#D81B60' },
//     { name: 'Others', value: 5, color: '#9E9E9E' }
//   ];

//   const departments = [
//     { 
//       name: "Roads Department", 
//       issues: 50, 
//       avgTime: "3 Days", 
//       performance: 85, 
//       staff: 12,
//       satisfaction: 4.2,
//       trend: "up",
//       activeProjects: 8
//     },
//     { 
//       name: "Waste Management", 
//       issues: 35, 
//       avgTime: "1 Day", 
//       performance: 92, 
//       staff: 8,
//       satisfaction: 4.6,
//       trend: "up",
//       activeProjects: 5
//     },
//     { 
//       name: "Water Department", 
//       issues: 28, 
//       avgTime: "2 Days", 
//       performance: 78, 
//       staff: 10,
//       satisfaction: 3.9,
//       trend: "down",
//       activeProjects: 6
//     },
//     { 
//       name: "Electricity Board", 
//       issues: 22, 
//       avgTime: "4 Days", 
//       performance: 88, 
//       staff: 15,
//       satisfaction: 4.1,
//       trend: "up",
//       activeProjects: 4
//     }
//   ];

//   const recentActivity = [
//     { id: 1, type: "issue_created", user: "John Doe", description: "reported a new issue", time: "2 mins ago", avatar: "JD" },
//     { id: 2, type: "issue_resolved", user: "Admin", description: "resolved Water Leakage issue", time: "5 mins ago", avatar: "AD" },
//     { id: 3, type: "department_update", user: "Roads Dept", description: "updated pothole repair status", time: "10 mins ago", avatar: "RD" },
//     { id: 4, type: "user_joined", user: "Sarah Smith", description: "joined the platform", time: "15 mins ago", avatar: "SS" }
//   ];

//   const settingsOptions = [
//     {
//       id: 'theme-toggle',
//       label: 'Dark Mode',
//       icon: darkMode ? ToggleRight : ToggleLeft,
//       action: () => setDarkMode(!darkMode),
//       showToggle: true
//     },
//     {
//       id: 'help',
//       label: 'Help & Support',
//       icon: HelpCircle,
//       action: () => {
//         setShowSettingsDropdown(false);
//         console.log('Navigate to help');
//       }
//     },
//     {
//       id: 'logout',
//       label: 'Log Out',
//       icon: LogOut,
//       action: () => {
//         setShowSettingsDropdown(false);
//         if (onLogout) onLogout();
//         window.location.href = '/welcome';
//       },
//       danger: true
//     }
//   ];

//   // Animate KPIs on load
//   useEffect(() => {
//     kpiData.forEach((kpi, index) => {
//       let start = 0;
//       const end = kpi.value;
//       const duration = 2000;
//       const increment = end / (duration / 50);
      
//       const timer = setInterval(() => {
//         start += increment;
//         if (start >= end) {
//           start = end;
//           clearInterval(timer);
//         }
//         setAnimatedKPIs(prev => {
//           const newKPIs = [...prev];
//           newKPIs[index] = Math.floor(start);
//           return newKPIs;
//         });
//       }, 50);
//     });
//   }, []);

//   // Handle click outside for filters and settings dropdown
//   useEffect(() => {
//     function handleClickOutside(event) {
//       if (filtersRef.current && !filtersRef.current.contains(event.target)) {
//         setShowFilters(false);
//       }
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setShowSettingsDropdown(false);
//       }
//     }
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   const getStatusColor = (status) => {
//     switch (status) {
//       case 'Open': return 'bg-gray-100 text-gray-700 border-gray-300';
//       case 'In Progress': return 'bg-accent-amber/20 text-accent-amber border-accent-amber/30';
//       case 'Resolved': return 'bg-primary-100 text-primary-700 border-primary-300';
//       default: return 'bg-gray-100 text-gray-700 border-gray-300';
//     }
//   };

//   const getPriorityColor = (priority) => {
//     switch (priority) {
//       case 'Low': return 'bg-gray-100 text-gray-700 border-gray-300';
//       case 'Medium': return 'bg-accent-amber/20 text-accent-amber border-accent-amber/30';
//       case 'High': return 'bg-accent-rose/20 text-accent-rose border-accent-rose/30';
//       default: return 'bg-gray-100 text-gray-700 border-gray-300';
//     }
//   };

//   const CustomTooltip = ({ active, payload, label }) => {
//     if (active && payload && payload.length) {
//       return (
//         <div className="bg-white p-4 rounded-xl shadow-2xl border border-gray-100">
//           <p className="font-semibold text-gray-800 mb-2">{`${label}`}</p>
//           {payload.map((entry, index) => (
//             <p key={index} className="text-sm" style={{ color: entry.color }}>
//               {`${entry.dataKey}: ${entry.value}`}
//             </p>
//           ))}
//         </div>
//       );
//     }
//     return null;
//   };

//   const filteredIssues = issuesData.filter(issue => {
//     const matchesSearch = issue.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          issue.location.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesFilter = filterStatus === 'all' || 
//                          issue.status.toLowerCase().replace(' ', '') === filterStatus;
//     return matchesSearch && matchesFilter;
//   });

//   const handleRefresh = async () => {
//     setIsLoading(true);
//     await new Promise(resolve => setTimeout(resolve, 1000));
//     setIsLoading(false);
//   };

//   const dropdownVariants = {
//     hidden: { opacity: 0, scale: 0.95, y: -10 },
//     visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.2, ease: "easeOut" } },
//     exit: { opacity: 0, scale: 0.95, y: -10, transition: { duration: 0.15 } }
//   };

//   const itemVariants = {
//     hidden: { opacity: 0, x: -10 },
//     visible: { opacity: 1, x: 0 }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-secondary-50 via-white to-primary-50/30 relative overflow-hidden">
//       {/* Background Decorations */}
//       <div className="absolute inset-0 overflow-hidden pointer-events-none">
//         <div className="absolute top-20 right-20 w-72 h-72 bg-gradient-to-br from-primary-200/20 to-accent-teal/20 rounded-full blur-3xl"></div>
//         <div className="absolute bottom-20 left-20 w-96 h-96 bg-gradient-to-tr from-accent-rose/10 to-accent-amber/10 rounded-full blur-3xl"></div>
//       </div>

//       {/* Header */}
//       <motion.header 
//         className="bg-glass-white/80 backdrop-blur-xl border-b border-white/30 sticky top-0 z-50 shadow-lg shadow-primary-500/5"
//         initial={{ y: -100 }}
//         animate={{ y: 0 }}
//         transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
//       >
//         <div className="max-w-7xl mx-auto px-6 py-4">
//           <div className="flex items-center justify-between">
//             <motion.div 
//               className="flex items-center gap-4"
//               initial={{ opacity: 0, x: -20 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ delay: 0.2 }}
//             >
//               <div className="relative">
//                 <motion.div 
//                   className="w-12 h-12 flex items-center justify-center" 
//                   whileHover={{ scale: 1.1, rotate: 5 }}
//                   transition={{ type: "spring", stiffness: 400, damping: 10 }}
//                 >
//                   <img 
//                     src={logo} 
//                     alt="CivicSahyog" 
//                     className="w-12 h-12 object-contain"
//                   />
//                 </motion.div>
//                 <motion.div 
//                   className="absolute -top-1 -right-1 w-4 h-4 bg-accent-rose rounded-full flex items-center justify-center"
//                   animate={{ scale: [1, 1.2, 1] }}
//                   transition={{ repeat: Infinity, duration: 2 }}
//                 >
//                   <Sparkles className="w-2 h-2 text-white" />
//                 </motion.div>
//               </div>
//               <div>
//                 <h1 className="text-2xl font-bold bg-gradient-to-r from-primary-700 to-accent-teal bg-clip-text text-transparent">
//                   CivicSahyog Admin
//                 </h1>
//                 <p className="text-sm text-gray-600 font-medium">Government Dashboard</p>
//               </div>
//             </motion.div>

//             <nav className="hidden md:flex items-center gap-2">
//               {[
//                 { id: 'overview', label: 'Dashboard', icon: Layout },
//                 { id: 'issues', label: 'Issues', icon: AlertTriangle },
//                 { id: 'analytics', label: 'Analytics', icon: BarChart3 },
//                 { id: 'departments', label: 'Departments', icon: Users }
//               ].map((item, index) => (
//                 <motion.button
//                   key={item.id}
//                   onClick={() => setActiveTab(item.id)}
//                   className={`flex items-center gap-2 px-6 py-3 rounded-2xl transition-all duration-300 relative overflow-hidden ${
//                     activeTab === item.id 
//                       ? 'bg-gradient-to-r from-primary-500 to-accent-teal text-white shadow-lg shadow-primary-500/25' 
//                       : 'text-gray-600 hover:bg-primary-50 hover:text-primary-600'
//                   }`}
//                   initial={{ opacity: 0, y: -20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: index * 0.1 + 0.3 }}
//                   whileHover={{ scale: 1.05, y: -2 }}
//                   whileTap={{ scale: 0.95 }}
//                 >
//                   <item.icon className="w-4 h-4" />
//                   <span className="font-semibold">{item.label}</span>
//                   {activeTab === item.id && (
//                     <motion.div
//                       className="absolute inset-0 bg-white/10 rounded-2xl"
//                       initial={{ scale: 0 }}
//                       animate={{ scale: 1 }}
//                       transition={{ duration: 0.3 }}
//                     />
//                   )}
//                 </motion.button>
//               ))}
//             </nav>

//             <div className="flex items-center gap-4">
//               <motion.button 
//                 onClick={handleRefresh}
//                 disabled={isLoading}
//                 className="p-3 text-gray-600 hover:text-primary-600 transition-colors bg-primary-50/50 rounded-xl hover:bg-primary-100/50 disabled:opacity-50"
//                 whileHover={{ scale: 1.1 }}
//                 whileTap={{ scale: 0.9 }}
//               >
//                 <motion.div
//                   animate={isLoading ? { rotate: 360 } : { rotate: 0 }}
//                   transition={isLoading ? { duration: 1, repeat: Infinity, ease: "linear" } : {}}
//                 >
//                   <RefreshCcw className="w-5 h-5" />
//                 </motion.div>
//               </motion.button>

//               <motion.div className="relative">
//                 <motion.button 
//                   className="relative p-3 text-gray-600 hover:text-primary-600 transition-colors bg-primary-50/50 rounded-xl hover:bg-primary-100/50"
//                   whileHover={{ scale: 1.1, rotate: 15 }}
//                   whileTap={{ scale: 0.9 }}
//                 >
//                   <Bell className="w-5 h-5" />
//                   <motion.span 
//                     className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-accent-rose to-accent-rose/80 rounded-full flex items-center justify-center text-[10px] text-white font-bold"
//                     animate={{ scale: [1, 1.2, 1] }}
//                     transition={{ repeat: Infinity, duration: 2 }}
//                   >
//                     5
//                   </motion.span>
//                 </motion.button>
//               </motion.div>

//               {/* Settings Dropdown */}
//               <div className="relative" ref={dropdownRef}>
//                 <motion.button 
//                   onClick={() => setShowSettingsDropdown(!showSettingsDropdown)}
//                   className="w-10 h-10 bg-gradient-to-br from-primary-500 to-accent-teal rounded-2xl shadow-lg shadow-primary-500/25 cursor-pointer relative overflow-hidden flex items-center justify-center text-white"
//                   whileHover={{ scale: 1.1 }}
//                   whileTap={{ scale: 0.95 }}
//                 >
//                   <div className="absolute inset-0 bg-white/20 rounded-2xl"></div>
//                   <motion.div
//                     animate={{ rotate: showSettingsDropdown ? 90 : 0 }}
//                     transition={{ duration: 0.2 }}
//                   >
//                     <Settings className="w-5 h-5" />
//                   </motion.div>
//                 </motion.button>

//                 <AnimatePresence>
//                   {showSettingsDropdown && (
//                     <motion.div
//                       className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl shadow-black/10 border border-gray-100/50 overflow-hidden z-50 backdrop-blur-xl"
//                       variants={dropdownVariants}
//                       initial="hidden"
//                       animate="visible"
//                       exit="exit"
//                     >
//                       <div className="py-2">
//                         {settingsOptions.map((option, index) => (
//                           <motion.button
//                             key={option.id}
//                             onClick={option.action}
//                             className={`w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors flex items-center justify-between group ${
//                               option.danger ? 'hover:bg-red-50' : ''
//                             }`}
//                             variants={itemVariants}
//                             initial="hidden"
//                             animate="visible"
//                             transition={{ delay: index * 0.05 }}
//                             whileHover={{ x: 2 }}
//                           >
//                             <div className="flex items-center gap-3">
//                               <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
//                                 option.danger 
//                                   ? 'bg-red-100 text-red-600 group-hover:bg-red-200' 
//                                   : 'bg-primary-100 text-primary-600 group-hover:bg-primary-200'
//                               }`}>
//                                 <option.icon className="w-4 h-4" />
//                               </div>
//                               <span className={`font-medium ${
//                                 option.danger ? 'text-red-700' : 'text-gray-700'
//                               }`}>
//                                 {option.label}
//                               </span>
//                             </div>
                            
//                             {option.showToggle && (
//                               <motion.div
//                                 className={`text-sm px-2 py-1 rounded-full ${
//                                   darkMode 
//                                     ? 'bg-accent-teal text-white' 
//                                     : 'bg-gray-200 text-gray-600'
//                                 }`}
//                                 animate={{ scale: darkMode ? 1.05 : 1 }}
//                                 transition={{ duration: 0.2 }}
//                               >
//                                 {darkMode ? 'On' : 'Off'}
//                               </motion.div>
//                             )}
//                           </motion.button>
//                         ))}
//                       </div>
                      
//                       <div className="border-t border-gray-100 px-4 py-3 bg-gray-50/50">
//                         <div className="flex items-center gap-3">
//                           <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-accent-teal rounded-lg flex items-center justify-center text-white text-sm font-bold">
//                             A
//                           </div>
//                           <div>
//                             <div className="font-semibold text-gray-800 text-sm">Admin User</div>
//                             <div className="text-xs text-gray-500">Government Official</div>
//                           </div>
//                         </div>
//                       </div>
//                     </motion.div>
//                   )}
//                 </AnimatePresence>
//               </div>
//             </div>
//           </div>
//         </div>
//       </motion.header>

//       <div className="max-w-7xl mx-auto px-6 py-8 relative z-10">
//         {activeTab === 'overview' && (
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="space-y-8"
//           >
//             {/* Time Range Selector */}
//             <div className="flex items-center justify-between">
//               <div>
//                 <h2 className="text-3xl font-bold text-primary-700">Dashboard Overview</h2>
//                 <p className="text-gray-600 mt-1">Monitor your civic management metrics</p>
//               </div>
//               <div className="flex items-center gap-2">
//                 {['24h', '7d', '30d', '90d'].map((range) => (
//                   <motion.button
//                     key={range}
//                     onClick={() => setTimeRange(range)}
//                     className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
//                       timeRange === range
//                         ? 'bg-primary-500 text-white shadow-lg'
//                         : 'bg-white text-gray-600 hover:bg-primary-50'
//                     }`}
//                     whileHover={{ scale: 1.05 }}
//                     whileTap={{ scale: 0.95 }}
//                   >
//                     {range}
//                   </motion.button>
//                 ))}
//               </div>
//             </div>

//             {/* Enhanced KPI Cards */}
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//               {kpiData.map((kpi, index) => (
//                 <motion.div
//                   key={index}
//                   className="group bg-glass-white/80 backdrop-blur-xl rounded-3xl p-6 border border-white/40 hover:shadow-2xl hover:shadow-primary-500/10 transition-all duration-500 relative overflow-hidden cursor-pointer"
//                   initial={{ opacity: 0, y: 50, scale: 0.8 }}
//                   animate={{ opacity: 1, y: 0, scale: 1 }}
//                   transition={{ delay: index * 0.1 + 0.2, duration: 0.6, type: "spring", bounce: 0.4 }}
//                   whileHover={{ y: -8, scale: 1.02 }}
//                 >
//                   {/* Background gradient */}
//                   <div className={`absolute inset-0 bg-gradient-to-br ${kpi.gradientFrom} ${kpi.gradientTo} opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-3xl`}></div>
                  
//                   <div className="relative z-10">
//                     <div className="flex items-center justify-between mb-4">
//                       <motion.div 
//                         className={`p-3 rounded-2xl ${kpi.bg} shadow-lg`}
//                         whileHover={{ scale: 1.1, rotate: 10 }}
//                         transition={{ type: "spring", stiffness: 400, damping: 10 }}
//                       >
//                         <kpi.icon className={`w-6 h-6 ${kpi.color}`} />
//                       </motion.div>
//                       <div className="flex items-center gap-1">
//                         {kpi.trend === 'up' ? (
//                           <ArrowUp className="w-4 h-4 text-green-600" />
//                         ) : (
//                           <ArrowDown className="w-4 h-4 text-red-600" />
//                         )}
//                         <span className={`text-sm font-medium ${
//                           kpi.trend === 'up' ? 'text-green-600' : 'text-red-600'
//                         }`}>
//                           {kpi.change}
//                         </span>
//                       </div>
//                     </div>
                    
//                     <motion.div 
//                       className={`text-3xl font-bold ${kpi.color} mb-2`}
//                       key={animatedKPIs[index]}
//                       initial={{ scale: 1.2 }}
//                       animate={{ scale: 1 }}
//                       transition={{ type: "spring", stiffness: 300, damping: 15 }}
//                     >
//                       {animatedKPIs[index] ? animatedKPIs[index].toLocaleString() : '0'}
//                     </motion.div>
                    
//                     <div className="text-sm text-gray-600 font-medium">
//                       {kpi.label}
//                     </div>
                    
//                     <div className="mt-3 w-full bg-gray-200 rounded-full h-1">
//                       <motion.div
//                         className={`h-1 rounded-full bg-gradient-to-r ${kpi.gradientFrom} ${kpi.gradientTo}`}
//                         initial={{ width: 0 }}
//                         animate={{ width: `${Math.min(100, (animatedKPIs[index] / kpi.value) * 100)}%` }}
//                         transition={{ delay: index * 0.1 + 0.5, duration: 1 }}
//                       />
//                     </div>
//                   </div>
//                 </motion.div>
//               ))}
//             </div>

//             {/* Charts Grid */}
//             <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//               {/* Issues vs Resolutions - Enhanced */}
//               <motion.div
//                 className="lg:col-span-2 bg-glass-white/80 backdrop-blur-xl rounded-3xl border border-white/40 p-6 shadow-lg"
//                 initial={{ opacity: 0, x: -20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ delay: 0.3 }}
//               >
//                 <div className="flex items-center justify-between mb-6">
//                   <div>
//                     <h3 className="text-xl font-bold text-gray-900">Issues vs Resolutions</h3>
//                     <p className="text-sm text-gray-600">Monthly performance tracking</p>
//                   </div>
//                   <motion.button
//                     className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
//                     whileHover={{ scale: 1.1 }}
//                   >
//                     <MoreHorizontal className="w-5 h-5" />
//                   </motion.button>
//                 </div>
//                 <ResponsiveContainer width="100%" height={350}>
//                   <RechartsBarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
//                     <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
//                     <XAxis 
//                       dataKey="name" 
//                       tick={{ fontSize: 12, fill: '#666' }}
//                       tickLine={false}
//                     />
//                     <YAxis 
//                       tick={{ fontSize: 12, fill: '#666' }}
//                       tickLine={false}
//                       axisLine={false}
//                     />
//                     <Tooltip content={<CustomTooltip />} />
//                     <Bar 
//                       dataKey="issues" 
//                       fill="url(#issuesGradient)" 
//                       radius={[4, 4, 0, 0]}
//                       name="Issues"
//                     />
//                     <Bar 
//                       dataKey="resolved" 
//                       fill="url(#resolvedGradient)" 
//                       radius={[4, 4, 0, 0]}
//                       name="Resolved"
//                     />
//                     <defs>
//                       <linearGradient id="issuesGradient" x1="0" y1="0" x2="0" y2="1">
//                         <stop offset="5%" stopColor="#FFA726" stopOpacity={0.8}/>
//                         <stop offset="95%" stopColor="#FFA726" stopOpacity={0.3}/>
//                       </linearGradient>
//                       <linearGradient id="resolvedGradient" x1="0" y1="0" x2="0" y2="1">
//                         <stop offset="5%" stopColor="#2E7D32" stopOpacity={0.8}/>
//                         <stop offset="95%" stopColor="#2E7D32" stopOpacity={0.3}/>
//                       </linearGradient>
//                     </defs>
//                   </RechartsBarChart>
//                 </ResponsiveContainer>
//               </motion.div>

//               {/* Issues by Category - Enhanced */}
//               <motion.div
//                 className="bg-glass-white/80 backdrop-blur-xl rounded-3xl border border-white/40 p-6 shadow-lg"
//                 initial={{ opacity: 0, x: 20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ delay: 0.4 }}
//               >
//                 <div className="flex items-center justify-between mb-6">
//                   <div>
//                     <h3 className="text-xl font-bold text-gray-900">Issues by Category</h3>
//                     <p className="text-sm text-gray-600">Distribution overview</p>
//                   </div>
//                   <motion.button
//                     className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
//                     whileHover={{ scale: 1.1 }}
//                   >
//                     <BarChart3 className="w-5 h-5" />
//                   </motion.button>
//                 </div>
//                 <ResponsiveContainer width="100%" height={300}>
//                   <RechartsPieChart>
//                     <Pie
//                       data={categoryData}
//                       cx="50%"
//                       cy="50%"
//                       outerRadius={100}
//                       innerRadius={40}
//                       dataKey="value"
//                       stroke="none"
//                     >
//                       {categoryData.map((entry, index) => (
//                         <Cell key={`cell-${index}`} fill={entry.color} />
//                       ))}
//                     </Pie>
//                     <Tooltip content={<CustomTooltip />} />
//                   </RechartsPieChart>
//                 </ResponsiveContainer>
//                 <div className="mt-4 space-y-2">
//                   {categoryData.map((category, index) => (
//                     <div key={index} className="flex items-center justify-between text-sm">
//                       <div className="flex items-center gap-2">
//                         <div 
//                           className="w-3 h-3 rounded-full" 
//                           style={{ backgroundColor: category.color }}
//                         ></div>
//                         <span className="text-gray-700">{category.name}</span>
//                       </div>
//                       <span className="font-semibold text-gray-900">{category.value}%</span>
//                     </div>
//                   ))}
//                 </div>
//               </motion.div>
//             </div>

//             {/* Efficiency Trend */}
//             <motion.div
//               className="bg-glass-white/80 backdrop-blur-xl rounded-3xl border border-white/40 p-6 shadow-lg"
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.5 }}
//             >
//               <div className="flex items-center justify-between mb-6">
//                 <div>
//                   <h3 className="text-xl font-bold text-gray-900">Resolution Efficiency</h3>
//                   <p className="text-sm text-gray-600">Performance trend over time</p>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <TrendingUp className="w-5 h-5 text-green-600" />
//                   <span className="text-lg font-bold text-green-600">+2.3%</span>
//                 </div>
//               </div>
//               <ResponsiveContainer width="100%" height={200}>
//                 <AreaChart data={trendData}>
//                   <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
//                   <XAxis 
//                     dataKey="name" 
//                     tick={{ fontSize: 12, fill: '#666' }}
//                     tickLine={false}
//                     axisLine={false}
//                   />
//                   <YAxis 
//                     tick={{ fontSize: 12, fill: '#666' }}
//                     tickLine={false}
//                     axisLine={false}
//                   />
//                   <Tooltip content={<CustomTooltip />} />
//                   <Area
//                     type="monotone"
//                     dataKey="efficiency"
//                     stroke="#26A69A"
//                     strokeWidth={3}
//                     fill="url(#efficiencyGradient)"
//                   />
//                   <defs>
//                     <linearGradient id="efficiencyGradient" x1="0" y1="0" x2="0" y2="1">
//                       <stop offset="5%" stopColor="#26A69A" stopOpacity={0.3}/>
//                       <stop offset="95%" stopColor="#26A69A" stopOpacity={0.05}/>
//                     </linearGradient>
//                   </defs>
//                 </AreaChart>
//               </ResponsiveContainer>
//             </motion.div>

//             {/* Recent Activity */}
//             <motion.div
//               className="bg-glass-white/80 backdrop-blur-xl rounded-3xl border border-white/40 p-6 shadow-lg"
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.6 }}
//             >
//               <div className="flex items-center justify-between mb-6">
//                 <div>
//                   <h3 className="text-xl font-bold text-gray-900">Recent Activity</h3>
//                   <p className="text-sm text-gray-600">Latest system updates</p>
//                 </div>
//                 <motion.button
//                   className="text-primary-600 hover:text-primary-700 font-medium flex items-center gap-2"
//                   whileHover={{ scale: 1.05 }}
//                 >
//                   View All
//                   <ExternalLink className="w-4 h-4" />
//                 </motion.button>
//               </div>
//               <div className="space-y-4">
//                 {recentActivity.map((activity, index) => (
//                   <motion.div
//                     key={activity.id}
//                     className="flex items-center gap-4 p-4 rounded-2xl hover:bg-primary-50/50 transition-colors"
//                     initial={{ opacity: 0, x: -20 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     transition={{ delay: index * 0.1 + 0.7 }}
//                   >
//                     <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-accent-teal rounded-xl flex items-center justify-center text-white font-bold text-sm">
//                       {activity.avatar}
//                     </div>
//                     <div className="flex-1">
//                       <p className="text-gray-800">
//                         <span className="font-semibold">{activity.user}</span> {activity.description}
//                       </p>
//                       <p className="text-sm text-gray-500">{activity.time}</p>
//                     </div>
//                     <Activity className={`w-5 h-5 ${
//                       activity.type === 'issue_resolved' ? 'text-green-600' :
//                       activity.type === 'issue_created' ? 'text-blue-600' :
//                       activity.type === 'department_update' ? 'text-amber-600' :
//                       'text-gray-400'
//                     }`} />
//                   </motion.div>
//                 ))}
//               </div>
//             </motion.div>
//           </motion.div>
//         )}

//         {/* Analytics Tab */}
//         {activeTab === 'analytics' && (
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="space-y-8"
//           >
//             <div className="flex items-center justify-between">
//               <div>
//                 <h2 className="text-3xl font-bold text-primary-700">Analytics & Insights</h2>
//                 <p className="text-gray-600 mt-1">Deep dive into performance metrics and trends</p>
//               </div>
//               <div className="flex items-center gap-2">
//                 <motion.button
//                   className="flex items-center gap-2 px-4 py-2 bg-primary-500 text-white rounded-xl hover:bg-primary-600 transition-colors"
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                 >
//                   <Download className="w-4 h-4" />
//                   Export Report
//                 </motion.button>
//               </div>
//             </div>

//             {/* Analytics KPIs */}
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//               {analyticsKPIs.map((kpi, index) => (
//                 <motion.div
//                   key={index}
//                   className="bg-glass-white/80 backdrop-blur-xl rounded-3xl p-6 border border-white/40 shadow-lg"
//                   initial={{ opacity: 0, y: 50 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: index * 0.1 }}
//                   whileHover={{ y: -5, scale: 1.02 }}
//                 >
//                   <div className="flex items-center justify-between mb-4">
//                     <div className={`p-3 rounded-2xl ${kpi.bg}`}>
//                       <kpi.icon className={`w-6 h-6 ${kpi.color}`} />
//                     </div>
//                     <div className="flex items-center gap-1">
//                       {kpi.trend === 'up' ? (
//                         <ArrowUp className="w-4 h-4 text-green-600" />
//                       ) : (
//                         <ArrowDown className="w-4 h-4 text-red-600" />
//                       )}
//                       <span className={`text-sm font-medium ${
//                         kpi.trend === 'up' ? 'text-green-600' : 'text-red-600'
//                       }`}>
//                         {kpi.change}
//                       </span>
//                     </div>
//                   </div>
                  
//                   <div className={`text-3xl font-bold ${kpi.color} mb-2`}>
//                     {kpi.prefix}{kpi.value}{kpi.suffix}
//                   </div>
                  
//                   <div className="text-sm text-gray-600 font-medium">
//                     {kpi.label}
//                   </div>
//                 </motion.div>
//               ))}
//             </div>

//             {/* Analytics Charts */}
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//               {/* Monthly Performance Trends */}
//               <motion.div
//                 className="bg-glass-white/80 backdrop-blur-xl rounded-3xl border border-white/40 p-6 shadow-lg"
//                 initial={{ opacity: 0, x: -20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ delay: 0.3 }}
//               >
//                 <div className="flex items-center justify-between mb-6">
//                   <div>
//                     <h3 className="text-xl font-bold text-gray-900">Monthly Performance Trends</h3>
//                     <p className="text-sm text-gray-600">Issues, resolution rate, and satisfaction</p>
//                   </div>
//                 </div>
//                 <ResponsiveContainer width="100%" height={350}>
//                   <RechartsLineChart data={monthlyTrends}>
//                     <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
//                     <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#666' }} tickLine={false} />
//                     <YAxis tick={{ fontSize: 12, fill: '#666' }} tickLine={false} axisLine={false} />
//                     <Tooltip content={<CustomTooltip />} />
//                     <Line 
//                       type="monotone" 
//                       dataKey="issues" 
//                       stroke="#FFA726" 
//                       strokeWidth={3}
//                       dot={{ fill: '#FFA726', strokeWidth: 2, r: 6 }}
//                       name="Issues"
//                     />
//                     <Line 
//                       type="monotone" 
//                       dataKey="resolved" 
//                       stroke="#2E7D32" 
//                       strokeWidth={3}
//                       dot={{ fill: '#2E7D32', strokeWidth: 2, r: 6 }}
//                       name="Resolved"
//                     />
//                     <Line 
//                       type="monotone" 
//                       dataKey="satisfaction" 
//                       stroke="#9C27B0" 
//                       strokeWidth={3}
//                       dot={{ fill: '#9C27B0', strokeWidth: 2, r: 6 }}
//                       name="Satisfaction %"
//                     />
//                   </RechartsLineChart>
//                 </ResponsiveContainer>
//               </motion.div>

//               {/* Department Efficiency */}
//               <motion.div
//                 className="bg-glass-white/80 backdrop-blur-xl rounded-3xl border border-white/40 p-6 shadow-lg"
//                 initial={{ opacity: 0, x: 20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ delay: 0.4 }}
//               >
//                 <div className="flex items-center justify-between mb-6">
//                   <div>
//                     <h3 className="text-xl font-bold text-gray-900">Department Efficiency</h3>
//                     <p className="text-sm text-gray-600">Performance comparison</p>
//                   </div>
//                 </div>
//                 <ResponsiveContainer width="100%" height={350}>
//                   <RechartsBarChart data={departmentPerformance} layout="horizontal">
//                     <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
//                     <XAxis type="number" tick={{ fontSize: 12, fill: '#666' }} tickLine={false} />
//                     <YAxis type="category" dataKey="department" tick={{ fontSize: 12, fill: '#666' }} tickLine={false} />
//                     <Tooltip content={<CustomTooltip />} />
//                     <Bar dataKey="efficiency" fill="#26A69A" radius={[0, 4, 4, 0]} />
//                   </RechartsBarChart>
//                 </ResponsiveContainer>
//               </motion.div>
//             </div>

//             {/* Priority Distribution and Issue Categories */}
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//               {/* Priority Distribution */}
//               <motion.div
//                 className="bg-glass-white/80 backdrop-blur-xl rounded-3xl border border-white/40 p-6 shadow-lg"
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.5 }}
//               >
//                 <div className="flex items-center justify-between mb-6">
//                   <div>
//                     <h3 className="text-xl font-bold text-gray-900">Priority Distribution</h3>
//                     <p className="text-sm text-gray-600">Issues by priority level</p>
//                   </div>
//                 </div>
//                 <ResponsiveContainer width="100%" height={300}>
//                   <RechartsPieChart>
//                     <Pie
//                       data={priorityDistribution}
//                       cx="50%"
//                       cy="50%"
//                       labelLine={false}
//                       label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
//                       outerRadius={100}
//                       fill="#8884d8"
//                       dataKey="value"
//                     >
//                       {priorityDistribution.map((entry, index) => (
//                         <Cell key={`cell-${index}`} fill={entry.fill} />
//                       ))}
//                     </Pie>
//                     <Tooltip />
//                   </RechartsPieChart>
//                 </ResponsiveContainer>
//               </motion.div>

//               {/* Issue Categories */}
//               <motion.div
//                 className="bg-glass-white/80 backdrop-blur-xl rounded-3xl border border-white/40 p-6 shadow-lg"
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.6 }}
//               >
//                 <div className="flex items-center justify-between mb-6">
//                   <div>
//                     <h3 className="text-xl font-bold text-gray-900">Issue Categories</h3>
//                     <p className="text-sm text-gray-600">Distribution by type</p>
//                   </div>
//                 </div>
//                 <ResponsiveContainer width="100%" height={300}>
//                   <RadialBarChart cx="50%" cy="50%" innerRadius="20%" outerRadius="90%" data={issueCategories}>
//                     <RadialBar
//                       minAngle={15}
//                       label={{ position: 'insideStart', fill: '#fff' }}
//                       background
//                       clockWise
//                       dataKey="value"
//                     />
//                     <Legend iconSize={10} layout="horizontal" verticalAlign="bottom" />
//                     <Tooltip />
//                   </RadialBarChart>
//                 </ResponsiveContainer>
//               </motion.div>
//             </div>

//             {/* Cost Analysis */}
//             <motion.div
//               className="bg-glass-white/80 backdrop-blur-xl rounded-3xl border border-white/40 p-6 shadow-lg"
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.7 }}
//             >
//               <div className="flex items-center justify-between mb-6">
//                 <div>
//                   <h3 className="text-xl font-bold text-gray-900">Cost Analysis</h3>
//                   <p className="text-sm text-gray-600">Monthly cost trends and efficiency</p>
//                 </div>
//               </div>
//               <ResponsiveContainer width="100%" height={300}>
//                 <AreaChart data={monthlyTrends}>
//                   <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
//                   <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#666' }} tickLine={false} />
//                   <YAxis tick={{ fontSize: 12, fill: '#666' }} tickLine={false} axisLine={false} />
//                   <Tooltip content={<CustomTooltip />} />
//                   <Area
//                     type="monotone"
//                     dataKey="cost"
//                     stackId="1"
//                     stroke="#FF7043"
//                     fill="url(#costGradient)"
//                   />
//                   <defs>
//                     <linearGradient id="costGradient" x1="0" y1="0" x2="0" y2="1">
//                       <stop offset="5%" stopColor="#FF7043" stopOpacity={0.8}/>
//                       <stop offset="95%" stopColor="#FF7043" stopOpacity={0.1}/>
//                     </linearGradient>
//                   </defs>
//                 </AreaChart>
//               </ResponsiveContainer>
//             </motion.div>
//           </motion.div>
//         )}

//         {activeTab === 'issues' && (
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="space-y-6"
//           >
//             {/* Enhanced Header */}
//             <div className="flex items-center justify-between">
//               <div>
//                 <h2 className="text-3xl font-bold text-primary-700">Issues Management</h2>
//                 <p className="text-gray-600 mt-1">Track and manage all reported issues</p>
//               </div>
//               <motion.button
//                 className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-500 to-accent-teal text-white rounded-2xl hover:shadow-lg hover:shadow-primary-500/25 transition-all"
//                 whileHover={{ scale: 1.05, y: -2 }}
//                 whileTap={{ scale: 0.95 }}
//               >
//                 <Plus className="w-5 h-5" />
//                 Add New Issue
//               </motion.button>
//             </div>

//             {/* Enhanced Filters */}
//             <div className="bg-glass-white/80 backdrop-blur-xl rounded-2xl border border-white/40 p-6 shadow-lg">
//               <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
//                 <div className="flex flex-wrap items-center gap-4">
//                   <div className="relative">
//                     <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
//                     <input
//                       type="text"
//                       placeholder="Search issues, locations..."
//                       value={searchTerm}
//                       onChange={(e) => setSearchTerm(e.target.value)}
//                       className="pl-10 pr-4 py-2.5 w-80 border border-gray-200 rounded-xl focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all bg-white shadow-sm"
//                     />
//                   </div>
                  
//                   <div className="relative" ref={filtersRef}>
//                     <button
//                       onClick={() => setShowFilters(!showFilters)}
//                       className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 rounded-xl hover:border-primary-500 transition-colors bg-white shadow-sm"
//                     >
//                       <Filter className="w-4 h-4" />
//                       Status: {filterStatus === 'all' ? 'All' : filterStatus}
//                       <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
//                     </button>
                    
//                     <AnimatePresence>
//                       {showFilters && (
//                         <motion.div
//                           className="absolute top-full left-0 mt-2 w-48 bg-white rounded-xl shadow-2xl border border-gray-100 z-50"
//                           initial={{ opacity: 0, y: -10 }}
//                           animate={{ opacity: 1, y: 0 }}
//                           exit={{ opacity: 0, y: -10 }}
//                         >
//                           <div className="p-2">
//                             {[
//                               { value: 'all', label: 'All Issues' },
//                               { value: 'open', label: 'Open' },
//                               { value: 'inprogress', label: 'In Progress' },
//                               { value: 'resolved', label: 'Resolved' }
//                             ].map((option) => (
//                               <button
//                                 key={option.value}
//                                 onClick={() => {
//                                   setFilterStatus(option.value);
//                                   setShowFilters(false);
//                                 }}
//                                 className="w-full text-left px-3 py-2 rounded-lg hover:bg-primary-50 transition-colors text-sm"
//                               >
//                                 {option.label}
//                               </button>
//                             ))}
//                           </div>
//                         </motion.div>
//                       )}
//                     </AnimatePresence>
//                   </div>
//                 </div>
                
//                 <div className="flex items-center gap-2">
//                   <motion.button
//                     className="flex items-center gap-2 px-4 py-2.5 bg-primary-500 text-white rounded-xl hover:bg-primary-600 transition-colors shadow-lg"
//                     whileHover={{ scale: 1.05 }}
//                     whileTap={{ scale: 0.95 }}
//                   >
//                     <Download className="w-4 h-4" />
//                     Export
//                   </motion.button>
//                 </div>
//               </div>
//             </div>

//             {/* Enhanced Issues Table */}
//             <div className="bg-glass-white/80 backdrop-blur-xl rounded-2xl border border-white/40 overflow-hidden shadow-lg">
//               <div className="p-4 bg-gray-50/50 border-b border-gray-100">
//                 <div className="flex items-center justify-between">
//                   <h3 className="font-semibold text-gray-800">
//                     {filteredIssues.length} Issues Found
//                   </h3>
//                   <div className="flex items-center gap-2 text-sm text-gray-600">
//                     <Clock className="w-4 h-4" />
//                     Last updated: {new Date().toLocaleTimeString()}
//                   </div>
//                 </div>
//               </div>
              
//               <div className="overflow-x-auto">
//                 <table className="w-full">
//                   <thead className="bg-gray-50 border-b border-gray-200">
//                     <tr>
//                       <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Issue Details</th>
//                       <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
//                       <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Priority</th>
//                       <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Assignee</th>
//                       <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Progress</th>
//                       <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Actions</th>
//                     </tr>
//                   </thead>
//                   <tbody className="divide-y divide-gray-200">
//                     {filteredIssues.map((issue, index) => (
//                       <motion.tr
//                         key={issue.id}
//                         className="hover:bg-primary-50/30 transition-colors group"
//                         initial={{ opacity: 0, y: 20 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         transition={{ delay: index * 0.1 }}
//                         whileHover={{ x: 2 }}
//                       >
//                         <td className="px-6 py-4">
//                           <div className="flex items-start gap-3">
//                             <div className={`w-3 h-3 rounded-full mt-2 ${
//                               issue.urgency === 'critical' ? 'bg-red-500' :
//                               issue.urgency === 'high' ? 'bg-orange-500' :
//                               issue.urgency === 'medium' ? 'bg-yellow-500' :
//                               'bg-gray-400'
//                             }`}></div>
//                             <div>
//                               <div className="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
//                                 {issue.title}
//                               </div>
//                               <div className="text-sm text-gray-600 mt-1">{issue.category}</div>
//                               <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
//                                 <MapPin className="w-3 h-3" />
//                                 {issue.location}
//                               </div>
//                               <div className="text-xs text-gray-500 mt-1">{issue.date}</div>
//                             </div>
//                           </div>
//                         </td>
//                         <td className="px-6 py-4">
//                           <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(issue.status)}`}>
//                             {issue.status}
//                           </span>
//                         </td>
//                         <td className="px-6 py-4">
//                           <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getPriorityColor(issue.priority)}`}>
//                             {issue.priority}
//                           </span>
//                         </td>
//                         <td className="px-6 py-4">
//                           <div className="flex items-center gap-2">
//                             <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-accent-teal rounded-lg flex items-center justify-center text-white text-xs font-bold">
//                               {issue.assigneeAvatar}
//                             </div>
//                             <span className="text-sm text-gray-700">{issue.assignee}</span>
//                           </div>
//                         </td>
//                         <td className="px-6 py-4">
//                           <div className="flex items-center gap-2">
//                             <div className="flex-1 bg-gray-200 rounded-full h-2">
//                               <motion.div
//                                 className={`h-2 rounded-full ${
//                                   issue.progress === 100 ? 'bg-green-500' :
//                                   issue.progress > 50 ? 'bg-blue-500' :
//                                   'bg-amber-500'
//                                 }`}
//                                 initial={{ width: 0 }}
//                                 animate={{ width: `${issue.progress}%` }}
//                                 transition={{ delay: index * 0.1 + 0.5, duration: 1 }}
//                               />
//                             </div>
//                             <span className="text-xs text-gray-600 w-12">{issue.progress}%</span>
//                           </div>
//                         </td>
//                         <td className="px-6 py-4">
//                           <div className="flex items-center gap-1">
//                             <motion.button
//                               className="p-2 text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
//                               whileHover={{ scale: 1.1 }}
//                               whileTap={{ scale: 0.9 }}
//                             >
//                               <Eye className="w-4 h-4" />
//                             </motion.button>
//                             <motion.button
//                               className="p-2 text-gray-600 hover:text-accent-teal hover:bg-teal-50 rounded-lg transition-colors"
//                               whileHover={{ scale: 1.1 }}
//                               whileTap={{ scale: 0.9 }}
//                             >
//                               <Edit className="w-4 h-4" />
//                             </motion.button>
//                             <motion.button
//                               className="p-2 text-gray-600 hover:text-accent-rose hover:bg-red-50 rounded-lg transition-colors"
//                               whileHover={{ scale: 1.1 }}
//                               whileTap={{ scale: 0.9 }}
//                             >
//                               <Trash2 className="w-4 h-4" />
//                             </motion.button>
//                           </div>
//                         </td>
//                       </motion.tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
              
//               {filteredIssues.length === 0 && (
//                 <div className="p-8 text-center text-gray-500">
//                   <AlertTriangle className="w-12 h-12 mx-auto mb-4 text-gray-300" />
//                   <p>No issues found matching your criteria</p>
//                 </div>
//               )}
//             </div>
//           </motion.div>
//         )}

//         {activeTab === 'departments' && (
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="space-y-6"
//           >
//             <div className="flex items-center justify-between">
//               <div>
//                 <h2 className="text-3xl font-bold text-primary-700">Department Performance</h2>
//                 <p className="text-gray-600 mt-1">Monitor departmental efficiency and metrics</p>
//               </div>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               {departments.map((dept, index) => (
//                 <motion.div
//                   key={index}
//                   className="bg-glass-white/80 backdrop-blur-xl rounded-3xl border border-white/40 p-6 shadow-lg hover:shadow-xl transition-all duration-300"
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: index * 0.1 }}
//                   whileHover={{ y: -5, scale: 1.02 }}
//                 >
//                   <div className="flex items-center justify-between mb-6">
//                     <div>
//                       <h3 className="text-xl font-bold text-gray-900">{dept.name}</h3>
//                       <div className="flex items-center gap-2 mt-1">
//                         <div className="flex">
//                           {[...Array(5)].map((_, i) => (
//                             <motion.div
//                               key={i}
//                               className={`w-4 h-4 ${i < Math.floor(dept.satisfaction) ? 'text-yellow-400' : 'text-gray-300'}`}
//                               initial={{ scale: 0 }}
//                               animate={{ scale: 1 }}
//                               transition={{ delay: index * 0.1 + i * 0.1 }}
//                             >
//                               ⭐
//                             </motion.div>
//                           ))}
//                         </div>
//                         <span className="text-sm text-gray-600">{dept.satisfaction}/5</span>
//                       </div>
//                     </div>
//                     <div className="flex items-center gap-2">
//                       {dept.trend === 'up' ? (
//                         <TrendingUp className="w-5 h-5 text-green-600" />
//                       ) : (
//                         <ArrowDown className="w-5 h-5 text-red-600" />
//                       )}
//                       <div className={`px-4 py-2 rounded-full text-sm font-bold ${
//                         dept.performance >= 90 ? 'bg-green-100 text-green-700' :
//                         dept.performance >= 80 ? 'bg-yellow-100 text-yellow-700' :
//                         'bg-red-100 text-red-700'
//                       }`}>
//                         {dept.performance}%
//                       </div>
//                     </div>
//                   </div>
                  
//                   <div className="grid grid-cols-2 gap-4 mb-6">
//                     <div className="bg-primary-50 rounded-2xl p-4 text-center">
//                       <div className="text-2xl font-bold text-primary-600">{dept.issues}</div>
//                       <div className="text-sm text-gray-600">Active Issues</div>
//                     </div>
//                     <div className="bg-accent-teal/10 rounded-2xl p-4 text-center">
//                       <div className="text-2xl font-bold text-accent-teal">{dept.avgTime}</div>
//                       <div className="text-sm text-gray-600">Avg Resolution</div>
//                     </div>
//                   </div>

//                   <div className="grid grid-cols-2 gap-4 mb-6">
//                     <div className="text-center">
//                       <div className="text-lg font-bold text-accent-amber">{dept.staff}</div>
//                       <div className="text-sm text-gray-600">Staff Members</div>
//                     </div>
//                     <div className="text-center">
//                       <div className="text-lg font-bold text-purple-600">{dept.activeProjects}</div>
//                       <div className="text-sm text-gray-600">Active Projects</div>
//                     </div>
//                   </div>

//                   <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
//                     <motion.div
//                       className={`h-3 rounded-full ${
//                         dept.performance >= 90 ? 'bg-gradient-to-r from-green-500 to-green-600' :
//                         dept.performance >= 80 ? 'bg-gradient-to-r from-yellow-500 to-yellow-600' :
//                         'bg-gradient-to-r from-red-500 to-red-600'
//                       }`}
//                       initial={{ width: 0 }}
//                       animate={{ width: `${dept.performance}%` }}
//                       transition={{ delay: index * 0.1 + 0.5, duration: 1 }}
//                     />
//                   </div>
//                   <div className="text-xs text-gray-500 text-center">Performance Score</div>
//                 </motion.div>
//               ))}
//             </div>
//           </motion.div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default AdminDashboard;
