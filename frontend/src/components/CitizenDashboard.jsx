import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, FileText, Users, User, Bell, Search, 
  MapPin, Camera, TrendingUp, Award, Plus,
  Eye, Clock, CheckCircle, AlertTriangle, ChevronRight,
  Sparkles, Globe, Activity, Star, ArrowUp, Settings,
  LogOut, HelpCircle, ToggleLeft, ToggleRight, ChevronDown,
  Volume2, VolumeX, Play, Pause
} from 'lucide-react';
import logo from "../assets/logo.png";
import civicVideo from "../assets/civicSahyog.mp4";

function CitizenDashboard({ onNavigate, onLogout }) {
  const [activeTab, setActiveTab] = useState('home');
  const [showSettingsDropdown, setShowSettingsDropdown] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [isMuted, setIsMuted] = useState(false); // Start unmuted
  const [isPlaying, setIsPlaying] = useState(false); // Start stopped
  const dropdownRef = useRef(null);
  const videoRef = useRef(null);

  // Animation variants
  const fadeInUp = {
    hidden: { 
      opacity: 0, 
      y: 40 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.15
      }
    }
  };

  const slideIn = {
    hidden: { 
      opacity: 0, 
      x: -30 
    },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowSettingsDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle video ended event
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      const handleEnded = () => {
        setIsPlaying(false);
      };
      
      video.addEventListener('ended', handleEnded);
      return () => video.removeEventListener('ended', handleEnded);
    }
  }, []);

  // Toggle video sound
  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  // Toggle video play/pause
  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  // Start video for the first time
  const startVideo = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.muted = isMuted;
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const quickActions = [
    { 
      title: "Report Issue", 
      description: "Report a civic problem in your area",
      icon: Camera, 
      color: "from-green-500 to-green-600",
      action: () => onNavigate('report'),
      badge: "New"
    },
    { 
      title: "Track Status", 
      description: "Check progress of your reports",
      icon: Eye, 
      color: "from-blue-500 to-blue-600",
      action: () => onNavigate('trackStatus'),
      badge: "3 Updates"
    },
    { 
      title: "Community Help", 
      description: "Join community initiatives",
      icon: TrendingUp, 
      color: "from-purple-500 to-purple-600",
      action: () => onNavigate('community'),
      badge: "5 Active"
    }
  ];

  const recentIssues = [
    { 
      id: 1, 
      title: "Pothole on Main Street", 
      status: "In Progress", 
      priority: "High", 
      time: "2 hours ago",
      location: "Ranchi",
      progress: 65,
      reporter: "Hari Singh",
      department: "Road Dept"
    },
    { 
      id: 2, 
      title: "Broken Streetlight", 
      status: "Resolved", 
      priority: "Medium", 
      time: "1 day ago",
      location: "Chatra",
      progress: 100,
      reporter: "Kunal kumar",
      department: "Electric Dept"
    },
    { 
      id: 3, 
      title: "Garbage Collection Delay", 
      status: "Open", 
      priority: "Low", 
      time: "3 days ago",
      location: "Residential Area B",
      progress: 20,
      reporter: "Chirag Kaushik",
      department: "Waste Mgmt"
    },
    { 
      id: 4, 
      title: "Water Leakage Issue", 
      status: "In Progress", 
      priority: "Medium", 
      time: "5 hours ago",
      location: "Central Park Area",
      progress: 40,
      reporter: "Anil Rana",
      department: "Water Dept"
    }
  ];

  const settingsOptions = [
    {
      id: 'theme-toggle',
      label: 'Dark Mode',
      icon: darkMode ? ToggleRight : ToggleLeft,
      action: () => setDarkMode(!darkMode),
      showToggle: true
    },
    {
      id: 'help',
      label: 'Help & Support',
      icon: HelpCircle,
      action: () => {
        setShowSettingsDropdown(false);
        console.log('Navigate to help');
      }
    },
    {
      id: 'logout',
      label: 'Log Out',
      icon: LogOut,
      action: () => {
        setShowSettingsDropdown(false);
        if (onLogout) onLogout();
        window.location.href = '/welcome';
      },
      danger: true
    }
  ];

  const dropdownVariants = {
    hidden: {
      opacity: 0,
      scale: 0.96,
      y: -8,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.15,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      scale: 0.96,
      y: -8,
      transition: {
        duration: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -8 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-green-50/30 relative overflow-hidden">
      {/* Subtle Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-32 right-32 w-64 h-64 bg-green-100/40 rounded-full blur-3xl"></div>
        <div className="absolute bottom-32 left-32 w-80 h-80 bg-blue-100/30 rounded-full blur-3xl"></div>
      </div>

      {/* Navigation Header */}
      <motion.header 
        className="bg-white/90 backdrop-blur-lg border-b border-gray-200/50 sticky top-0 z-50 shadow-sm"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <motion.div 
              className="flex items-center gap-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <div className="relative">
                <motion.div 
                  className="w-12 h-12 flex items-center justify-center" 
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <img 
                    src={logo} 
                    alt="JanSetu" 
                    className="w-12 h-12 object-contain"
                  />
                </motion.div>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">
                  JanSetu
                </h1>
                <p className="text-xs text-gray-500 font-medium">Empowering Citizens</p>
              </div>
            </motion.div>

            <nav className="hidden md:flex items-center gap-2">
              {[
                { id: 'home', label: 'Home', icon: Home },
                { id: 'report', label: 'Report', icon: FileText, action: () => onNavigate('report') },
                { id: 'community', label: 'Community', icon: Users, action: () => onNavigate('community') },
                { id: 'profile', label: 'Profile', icon: User, action: () => onNavigate('profile') }
              ].map((item, index) => (
                <motion.button
                  key={item.id}
                  onClick={() => item.action ? item.action() : setActiveTab(item.id)}
                  className={`flex items-center gap-2 px-5 py-3 rounded-xl transition-all duration-200 relative ${
                    activeTab === item.id 
                      ? 'bg-green-500 text-white shadow-md' 
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800'
                  }`}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <item.icon className="w-4 h-4" />
                  <span className="font-medium">{item.label}</span>
                </motion.button>
              ))}
            </nav>

        <div className="flex items-center gap-4">
        <div className="relative" ref={dropdownRef}>

                <motion.button 
                  onClick={() => setShowSettingsDropdown(!showSettingsDropdown)}
                  className="w-10 h-10 bg-green-500 rounded-xl shadow-md cursor-pointer relative overflow-hidden flex items-center justify-center text-white"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Settings className="w-5 h-5" />
                </motion.button>

                <AnimatePresence>
                  {showSettingsDropdown && (
                    <motion.div
                      className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden z-50"
                      variants={dropdownVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                    >
                      <div className="py-2">
                        {settingsOptions.map((option, index) => (
                          <motion.button
                            key={option.id}
                            onClick={option.action}
                            className={`w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors flex items-center justify-between group ${
                              option.danger ? 'hover:bg-red-50' : ''
                            }`}
                            variants={itemVariants}
                            initial="hidden"
                            animate="visible"
                            transition={{ delay: index * 0.05 }}
                          >
                            <div className="flex items-center gap-3">
                              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                                option.danger 
                                  ? 'bg-red-100 text-red-600' 
                                  : 'bg-gray-100 text-gray-600'
                              }`}>
                                <option.icon className="w-4 h-4" />
                              </div>
                              <span className={`font-medium ${
                                option.danger ? 'text-red-700' : 'text-gray-700'
                              }`}>
                                {option.label}
                              </span>
                            </div>
                            
                            {option.showToggle && (
                              <div
                                className={`text-sm px-2 py-1 rounded-full ${
                                  darkMode 
                                    ? 'bg-green-500 text-white' 
                                    : 'bg-gray-200 text-gray-600'
                                }`}
                              >
                                {darkMode ? 'On' : 'Off'}
                              </div>
                            )}
                          </motion.button>
                        ))}
                      </div>
                      
                      <div className="border-t border-gray-100 px-4 py-3 bg-gray-50">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center text-white text-sm font-bold">
                            U
                          </div>
                          <div>
                            <div className="font-semibold text-gray-800 text-sm">Citizen User</div>
                            <div className="text-xs text-gray-500">Active Member</div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </motion.header>

      <div className="max-w-7xl mx-auto px-6 py-8 relative z-10">
        {/* Hero Section */}
        <motion.section 
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[70vh]">
            {/* Left Content */}
            <motion.div
              className="flex flex-col justify-center lg:pl-8"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <motion.h2 
                className="text-6xl font-bold text-gray-800 mb-8 leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                Spot. Report. 
                <br />
                <span className="text-green-600">
                  Resolve.
                </span>
              </motion.h2>
              
              <motion.p 
                className="text-xl text-gray-600 mb-10 leading-relaxed max-w-lg"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                Help keep your community clean and safe by reporting environmental issues.
              </motion.p>

              <motion.button
                onClick={() => onNavigate('report')}
                className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-lg font-semibold text-lg shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-3 w-fit"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1 }}
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Camera className="w-5 h-5" />
                Report Issue
              </motion.button>
            </motion.div>

            {/* Right Content - Video with Manual Start */}
            <motion.div
              className="flex justify-center items-center lg:pl-8"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <div className="relative group">
                <motion.video 
                  ref={videoRef}
                  src={civicVideo} 
                  className="w-[400px] h-[400px] object-cover rounded-2xl shadow-lg"
                  muted={isMuted}
                  playsInline
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                  onError={() => console.log("Video failed to load")}
                />
                
                {/* Video Controls Overlay - Shows on hover when playing */}
                {isPlaying && (
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <div className="flex items-center gap-4">
                      {/* Play/Pause Button */}
                      <motion.button
                        onClick={togglePlayPause}
                        className="w-12 h-12 bg-white bg-opacity-90 rounded-full flex items-center justify-center text-gray-800 hover:bg-opacity-100 transition-all"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
                      </motion.button>

                      {/* Mute/Unmute Button */}
                      <motion.button
                        onClick={toggleMute}
                        className="w-12 h-12 bg-white bg-opacity-90 rounded-full flex items-center justify-center text-gray-800 hover:bg-opacity-100 transition-all"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        {isMuted ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
                      </motion.button>
                    </div>
                  </div>
                )}

                {/* Sound Indicator - Only shows when playing */}
                {isPlaying && (
                  <div className="absolute top-4 right-4">
                    <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                      isMuted ? 'bg-red-500 text-white' : 'bg-green-500 text-white'
                    }`}>
                      {isMuted ? 'Muted' : 'Sound On'}
                    </div>
                  </div>
                )}

                {/* Start/Play Again Button - Shows when video is not playing */}
                {!isPlaying && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 rounded-2xl flex flex-col items-center justify-center">
                    <motion.button
                      onClick={startVideo}
                      className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center text-white hover:bg-green-600 transition-all shadow-xl mb-4"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Play className="w-10 h-10 ml-2" />
                    </motion.button>
                    
                    <div className="text-white text-center">
                      <p className="text-lg font-semibold mb-1">Watch Demo</p>
                      <p className="text-sm opacity-80">See how JanSetu works</p>
                    </div>

                    {/* Sound Toggle Button - Available before starting */}
                    <motion.button
                      onClick={toggleMute}
                      className="absolute top-4 right-4 w-10 h-10 bg-white bg-opacity-90 rounded-full flex items-center justify-center text-gray-800 hover:bg-opacity-100 transition-all"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                    </motion.button>
                  </div>
                )}
              </div>
            </motion.div>
          </div>

          {/* Scroll Indicator */}
          <motion.div 
            className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            <p className="text-sm text-gray-500 mb-2">Scroll to explore</p>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="text-gray-400"
            >
              <ChevronDown className="w-5 h-5" />
            </motion.div>
          </motion.div>
        </motion.section>

        {/* Quick Actions */}
        <motion.section 
          className="mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp} className="text-center mb-10">
            <h3 className="text-3xl font-bold text-gray-800 mb-4">Quick Actions</h3>
            <p className="text-gray-600">Choose how you want to contribute to your community</p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={staggerContainer}
          >
            {quickActions.map((action, index) => (
              <motion.button
                key={index}
                onClick={action.action}
                className={`group relative p-8 bg-gradient-to-br ${action.color} rounded-xl text-white text-left overflow-hidden hover:shadow-lg transition-all duration-300`}
                variants={fadeInUp}
                whileHover={{ y: -4, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-6">
                    <action.icon className="w-8 h-8" />
                    {action.badge && (
                      <motion.span
                        className="bg-white/20 px-3 py-1 rounded-full text-xs font-semibold"
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 + 0.5 }}
                      >
                        {action.badge}
                      </motion.span>
                    )}
                  </div>
                  
                  <h4 className="text-xl font-bold mb-3">{action.title}</h4>
                  <p className="text-white/90 text-sm leading-relaxed mb-4">{action.description}</p>
                  
                  <div className="flex items-center gap-2 text-sm font-semibold">
                    <span>Get Started</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </motion.button>
            ))}
          </motion.div>
        </motion.section>

        {/* Recent Community Reports */}
        <motion.section
          className="mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={slideIn}
        >
          <motion.div 
            className="flex items-center justify-between mb-8"
            variants={fadeInUp}
          >
            <div>
              <h3 className="text-3xl font-bold text-gray-800 mb-2">Recent Community Reports</h3>
              <p className="text-gray-600">Stay updated with the latest civic issues and their resolution progress</p>
            </div>
            <motion.button 
              onClick={() => onNavigate('trackStatus')}
              className="text-green-600 hover:text-green-700 font-semibold flex items-center gap-2 bg-green-50 px-6 py-3 rounded-lg hover:bg-green-100 transition-colors border border-green-200"
              whileHover={{ scale: 1.02 }}
            >
              View All Reports
              <ChevronRight className="w-4 h-4" />
            </motion.button>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 lg:grid-cols-2 gap-6"
            variants={staggerContainer}
          >
            {recentIssues.map((issue, index) => (
              <motion.div
                key={issue.id}
                className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer group"
                variants={fadeInUp}
                whileHover={{ y: -2, scale: 1.01 }}
                onClick={() => onNavigate('trackStatus')}
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          issue.status === 'Resolved' ? 'bg-green-100 text-green-700' :
                          issue.status === 'In Progress' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-gray-100 text-gray-700'
                        }`}>
                          {issue.status}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          issue.priority === 'High' ? 'bg-red-100 text-red-700' :
                          issue.priority === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-blue-100 text-blue-700'
                        }`}>
                          {issue.priority}
                        </span>
                      </div>
                      
                      <h4 className="font-bold text-lg text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                        {issue.title}
                      </h4>
                      
                      <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                        <MapPin className="w-4 h-4" />
                        <span>{issue.location}</span>
                      </div>

                      <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                        <span>Reported by {issue.reporter}</span>
                        <span>{issue.time}</span>
                      </div>

                      {/* Progress Bar */}
                      <div className="mb-4">
                        <div className="flex justify-between text-sm text-gray-600 mb-2">
                          <span className="font-medium">Progress</span>
                          <span className="text-sm text-gray-700">{issue.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <motion.div
                            className={`h-3 rounded-full ${
                              issue.status === 'Resolved' ? 'bg-green-500' :
                              issue.status === 'In Progress' ? 'bg-yellow-500' :
                              'bg-gray-400'
                            }`}
                            initial={{ width: 0 }}
                            whileInView={{ width: `${issue.progress}%` }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 + 0.3, duration: 1.2 }}
                          />
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500 bg-gray-50 px-3 py-1 rounded-full">
                          {issue.department}
                        </span>
                        <button className="text-green-600 hover:text-green-700 font-medium text-sm flex items-center gap-1 hover:gap-2 transition-all">
                          View Details
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    
                    <div className="ml-4">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        issue.status === 'Resolved' ? 'bg-green-100' :
                        issue.status === 'In Progress' ? 'bg-yellow-100' :
                        'bg-gray-100'
                      }`}>
                        {issue.status === 'Resolved' ? (
                          <CheckCircle className="w-6 h-6 text-green-600" />
                        ) : issue.status === 'In Progress' ? (
                          <Clock className="w-6 h-6 text-yellow-600" />
                        ) : (
                          <AlertTriangle className="w-6 h-6 text-gray-600" />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>
      </div>
    </div>
  );
}

export default CitizenDashboard;
