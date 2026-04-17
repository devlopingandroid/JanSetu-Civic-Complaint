import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, User, Lock, ArrowLeft, LogIn, Sparkles } from 'lucide-react';
import WelcomeScreen from './components/WelcomeScreen';
import CitizenDashboard from './components/CitizenDashboard';
import ReportIssueScreen from './components/ReportIssueScreen';
import CommunityScreen from './components/CommunityScreen';
import ProfileScreen from './components/ProfileScreen';
import TrackStatusScreen from './components/TrackStatusScreen';
import Footer from './components/Footer';

// NEW ADMIN COMPONENTS
import OverviewScreen from './components/OverviewScreen';
import IssuesScreen from './components/IssuesScreen';
import AnalyticsScreen from './components/AnalyticsScreen';
import DepartmentsScreen from './components/DepartmentsScreen';

// Import Logo
import logo from './assets/logo.png';

function App() {
  const [currentView, setCurrentView] = useState('welcome');
  const [userType, setUserType] = useState(null);
  const [selectedRole, setSelectedRole] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  
  // Admin dashboard specific state
  const [adminActiveTab, setAdminActiveTab] = useState('overview');
  
  const [loginData, setLoginData] = useState({
    username: '',
    password: ''
  });

  const handleGetStarted = () => setCurrentView('userSelection');

  const handleRoleSelection = (role) => {
    setSelectedRole(role);
    setLoginData({ username: '', password: '' });
  };

  const handleBackToRoleSelection = () => {
    setSelectedRole(null);
    setLoginData({ username: '', password: '' });
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setUserType(selectedRole);
    if (selectedRole === 'citizen') {
      setCurrentView('citizenDashboard');
    } else if (selectedRole === 'admin') {
      setCurrentView('adminDashboard');
      setAdminActiveTab('overview');
    }
  };

  const handleInputChange = (field, value) => {
    setLoginData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNavigation = (view) => setCurrentView(view);

  // Admin Logout Handler
  const handleAdminLogout = () => {
    setUserType(null);
    setSelectedRole(null);
    setCurrentView('welcome');
    setAdminActiveTab('overview');
    setLoginData({ username: '', password: '' });
  };

  // NEW ADMIN DASHBOARD COMPONENT
  const NewAdminDashboard = () => {
    return (
      <div className="min-h-screen bg-gradient-to-br from-secondary-50 via-white to-primary-50/30 relative overflow-hidden">
        {/* Background Decorations - Same as your theme */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-20 w-72 h-72 bg-gradient-to-br from-primary-200/20 to-accent-teal/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-gradient-to-tr from-accent-rose/10 to-accent-amber/10 rounded-full blur-3xl"></div>
        </div>

        {/* Header - Using your color theme */}
        <motion.header 
          className="bg-glass-white/80 backdrop-blur-xl border-b border-white/30 sticky top-0 z-50 shadow-lg shadow-primary-500/5"
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
        >
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              {/* Logo Section */}
              <motion.div 
                className="flex items-center gap-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="relative">
                  <motion.div 
                    className="w-12 h-12 flex items-center justify-center" 
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <img 
                      src={logo} 
                      alt="CivicSahyog" 
                      className="w-12 h-12 object-contain"
                    />
                  </motion.div>
                  <motion.div 
                    className="absolute -top-1 -right-1 w-4 h-4 bg-accent-rose rounded-full flex items-center justify-center"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                  >
                    <Sparkles className="w-2 h-2 text-white" />
                  </motion.div>
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-primary-700 to-accent-teal bg-clip-text text-transparent">
                    JanSetu Admin
                  </h1>
                  <p className="text-sm text-gray-600 font-medium">Government Dashboard</p>
                </div>
              </motion.div>

              {/* Navigation Tabs - Using your color theme */}
              <nav className="hidden md:flex items-center gap-2">
                {[
                  { id: 'overview', label: 'Dashboard' },
                  { id: 'issues', label: 'Issues' },
                  { id: 'analytics', label: 'Analytics' },
                  { id: 'departments', label: 'Departments' }
                ].map((item, index) => (
                  <motion.button
                    key={item.id}
                    onClick={() => setAdminActiveTab(item.id)}
                    className={`flex items-center gap-2 px-6 py-3 rounded-2xl transition-all duration-300 relative overflow-hidden ${
                      adminActiveTab === item.id 
                        ? 'bg-gradient-to-r from-primary-500 to-accent-teal text-white shadow-lg shadow-primary-500/25' 
                        : 'text-gray-600 hover:bg-primary-50 hover:text-primary-600'
                    }`}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 + 0.3 }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="font-semibold">{item.label}</span>
                    {adminActiveTab === item.id && (
                      <motion.div
                        className="absolute inset-0 bg-white/10 rounded-2xl"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </motion.button>
                ))}
              </nav>

              {/* Logout Button - Using your color theme */}
              <motion.button
                onClick={handleAdminLogout}
                className="px-4 py-2 bg-gradient-to-r from-accent-rose to-accent-amber text-white rounded-xl hover:shadow-lg hover:shadow-accent-rose/25 transition-all font-medium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Logout
              </motion.button>
            </div>
          </div>
        </motion.header>

        {/* Content Area */}
        <div className="max-w-7xl mx-auto px-6 py-8 relative z-10">
          <AnimatePresence mode="wait">
            {adminActiveTab === 'overview' && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <OverviewScreen />
              </motion.div>
            )}
            
            {adminActiveTab === 'issues' && (
              <motion.div
                key="issues"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <IssuesScreen />
              </motion.div>
            )}
            
            {adminActiveTab === 'analytics' && (
              <motion.div
                key="analytics"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <AnalyticsScreen />
              </motion.div>
            )}
            
            {adminActiveTab === 'departments' && (
              <motion.div
                key="departments"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <DepartmentsScreen />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    );
  };

  const UserSelectionScreen = () => {
    if (selectedRole) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-teal-50 to-emerald-100 flex items-center justify-center px-4">
          <motion.div
            className="max-w-md w-full"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Back Button */}
            <motion.button
              onClick={handleBackToRoleSelection}
              className="flex items-center gap-2 text-primary-600 hover:text-primary-700 mb-6 transition-colors"
              whileHover={{ x: -5 }}
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to role selection</span>
            </motion.button>

            {/* Login Card */}
            <div className="bg-white/80 backdrop-blur-md rounded-3xl border border-white/20 shadow-2xl p-8">
              {/* Role Header */}
              <div className="text-center mb-8">
                <div className="w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                  {selectedRole === 'citizen' ? (
                    <User className="w-14 h-14 text-slate-800" />
                  ) : (
                    <img 
                      src={logo} 
                      alt="Government" 
                      className="w-16 h-16 object-contain"
                    />
                  )}
                </div>
                <h2 className="text-2xl font-bold text-primary-700 mb-2">
                  {selectedRole === 'citizen' ? 'Citizen Login' : 'Government Login'}
                </h2>
                <p className="text-gray-600 text-sm">
                  {selectedRole === 'citizen' 
                    ? 'Access your citizen dashboard' 
                    : 'Access administrative panel'
                  }
                </p>
              </div>

              {/* Login Form */}
              <form onSubmit={handleLoginSubmit} className="space-y-6">
                {/* Username Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Username or Email
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      value={loginData.username}
                      onChange={(e) => handleInputChange('username', e.target.value)}
                      className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                      placeholder="Enter your username"
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={loginData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      className="w-full pl-12 pr-12 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* Login Button */}
                <motion.button
                  type="submit"
                  className={`w-full py-3 px-4 rounded-xl text-white font-semibold flex items-center justify-center gap-2 transition-all duration-300 ${
                    selectedRole === 'citizen'
                      ? 'bg-gradient-to-r from-primary-600 to-accent-teal hover:shadow-lg'
                      : 'bg-gradient-to-r from-accent-amber to-accent-rose hover:shadow-lg'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <LogIn className="w-5 h-5" />
                  Sign In
                </motion.button>
              </form>

              {/* Quick Access Note */}
              <div className="mt-6 p-4 bg-primary-50 rounded-xl">
                <p className="text-sm text-primary-800 text-center">
                  <span className="font-medium">Quick Access:</span> Click Sign In to enter directly!
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      );
    }

    // Role selection screen
    return (
      <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-teal-50 to-emerald-100 flex items-center justify-center px-4">
        <motion.div
          className="max-w-4xl w-full text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Back to Welcome Button */}
          <motion.button
            onClick={() => setCurrentView('welcome')}
            className="flex items-center gap-2 text-primary-600 hover:text-primary-700 mb-8 transition-colors mx-auto"
            whileHover={{ x: -5 }}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Welcome</span>
          </motion.button>

          <div className="mb-12">
            <h2 className="text-5xl font-bold text-primary-700 mb-4">Choose Your Role</h2>
            <p className="text-lg text-gray-600">Select how you want to access JanSetu</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
            <motion.button
              onClick={() => handleRoleSelection('citizen')}
              className="group p-8 bg-white backdrop-blur-md rounded-3xl border-2 border-gray-200/50 hover:shadow-2xl hover:shadow-primary-300/20 transition-all duration-300 hover:border-primary-300"
              whileHover={{ scale: 1.05, y: -10 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="w-20 h-20 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <User className="w-12 h-12 text-slate-800" />
              </div>
              <h3 className="text-2xl font-semibold text-blue-800 mb-3">Citizen</h3>
              <p className="text-slate-600 mb-4">Report issues, track progress, and engage with your community</p>
              <div className="flex items-center justify-center gap-2 text-blue-700 font-medium">
                <span>Get Started</span>
                <LogIn className="w-4 h-4" />
              </div>
            </motion.button>

            <motion.button
              onClick={() => handleRoleSelection('admin')}
              className="group p-8 bg-white backdrop-blur-md rounded-3xl border-2 border-gray-200/50 hover:shadow-2xl hover:shadow-accent-amber/20 transition-all duration-300 hover:border-accent-amber"
              whileHover={{ scale: 1.05, y: -10 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="w-20 h-20 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <img 
                  src={logo} 
                  alt="Government" 
                  className="w-16 h-16 object-contain"
                />
              </div>
              <h3 className="text-2xl font-semibold text-amber-800 mb-3">Government</h3>
              <p className="text-slate-600 mb-4">Manage issues, analyze data, and coordinate departments</p>
              <div className="flex items-center justify-center gap-2 text-amber-700 font-medium">
                <span>Get Started</span>
                <LogIn className="w-4 h-4" />
              </div>
            </motion.button>
          </div>
        </motion.div>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1">
        <AnimatePresence mode="wait">
          {currentView === 'welcome' && (
            <motion.div
              key="welcome"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <WelcomeScreen onGetStarted={handleGetStarted} />
            </motion.div>
          )}

          {currentView === 'userSelection' && (
            <motion.div
              key="userSelection"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <UserSelectionScreen />
            </motion.div>
          )}

          {currentView === 'citizenDashboard' && (
            <motion.div
              key="citizenDashboard"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <CitizenDashboard onNavigate={handleNavigation} />
            </motion.div>
          )}

          {currentView === 'report' && (
            <motion.div
              key="report"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <ReportIssueScreen onBack={() => setCurrentView('citizenDashboard')} />
            </motion.div>
          )}

          {currentView === 'community' && (
            <motion.div
              key="community"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <CommunityScreen onBack={() => setCurrentView('citizenDashboard')} />
            </motion.div>
          )}

          {currentView === 'profile' && (
            <motion.div
              key="profile"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <ProfileScreen onBack={() => setCurrentView('citizenDashboard')} />
            </motion.div>
          )}

          {currentView === 'trackStatus' && (
            <motion.div
              key="trackStatus"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <TrackStatusScreen onBack={() => setCurrentView('citizenDashboard')} />
            </motion.div>
          )}

          {/* NEW ADMIN DASHBOARD - With your color theme */}
          {currentView === 'adminDashboard' && (
            <motion.div
              key="adminDashboard"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <NewAdminDashboard />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Footer - Hide on Admin Dashboard */}
      {currentView !== 'adminDashboard' && <Footer />}
    </div>
  );
}

export default App;
