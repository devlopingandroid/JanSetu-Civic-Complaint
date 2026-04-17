import React, { useState } from 'react';
import { 
  User, MapPin, Calendar, Edit, Camera,
  ChevronLeft, LogOut, Phone, Mail,
  Settings, Shield
} from 'lucide-react';

function ProfileScreen({ onBack, onLogout }) {
  const [isEditing, setIsEditing] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "Priya Sharma",
    email: "priya.sharma@email.com",
    phone: "+91 98765 43210",
    location: "Ranchi, Jharkhand",
    joinDate: "January 2024"
  });

  const userStats = [
    { label: "Reports Submitted", value: "23" },
    { label: "Issues Resolved", value: "18" },
    { label: "Community Points", value: "850" },
    { label: "Member Since", value: "Jan 2024" }
  ];

  const badges = [
    { name: "Green Guardian", description: "Reported 10+ environmental issues", earned: true },
    { name: "Community Helper", description: "Helped resolve 5+ issues", earned: true },
    { name: "Early Adopter", description: "Joined in the first month", earned: true },
    { name: "Eco Warrior", description: "Completed environmental challenges", earned: false },
    { name: "City Champion", description: "Top 10 contributor this month", earned: false },
    { name: "Problem Solver", description: "Resolved 25+ issues", earned: false }
  ];

  const handleSave = () => {
    setIsEditing(false);
  };

  const handleLogout = () => {
    setShowLogoutConfirm(false);
    if (onLogout) {
      onLogout();
    } else {
      // Default logout action
      window.location.href = '/welcome';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-green-50/30 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-32 right-32 w-64 h-64 bg-green-100/40 rounded-full blur-3xl"></div>
        <div className="absolute bottom-32 left-32 w-80 h-80 bg-blue-100/30 rounded-full blur-3xl"></div>
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-sm mx-4 shadow-xl">
            <h3 className="text-lg font-bold text-gray-900 mb-3">Confirm Logout</h3>
            <p className="text-gray-600 mb-6">Are you sure you want to logout from JanSetu?</p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="bg-white/90 backdrop-blur-lg border-b border-gray-200/50 sticky top-0 z-50 shadow-sm">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors px-3 py-2 rounded-lg hover:bg-gray-100"
            >
              <ChevronLeft className="w-5 h-5" />
              <span className="font-medium">Back</span>
            </button>
            
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-800">My Profile</h1>
              <p className="text-sm text-gray-600">Manage your account information</p>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsEditing(!isEditing)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                  isEditing 
                    ? 'bg-green-500 text-white hover:bg-green-600' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Edit className="w-4 h-4" />
                <span>{isEditing ? 'Save' : 'Edit'}</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-8 space-y-8 relative z-10">
        {/* Profile Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="relative">
              <div className="w-32 h-32 bg-green-500 rounded-full flex items-center justify-center text-white text-3xl font-bold">
                {profileData.name.split(' ').map(n => n[0]).join('')}
              </div>
              {isEditing && (
                <button className="absolute bottom-2 right-2 w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-blue-600 transition-colors">
                  <Camera className="w-5 h-5" />
                </button>
              )}
            </div>
            
            <div className="flex-1 w-full">
              {isEditing ? (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                    <input
                      type="text"
                      value={profileData.name}
                      onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full text-xl font-bold bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                      <input
                        type="email"
                        value={profileData.email}
                        onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                        className="w-full bg-gray-50 rounded-lg border border-gray-300 px-4 py-3 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                      <input
                        type="tel"
                        value={profileData.phone}
                        onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
                        className="w-full bg-gray-50 rounded-lg border border-gray-300 px-4 py-3 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                    <input
                      type="text"
                      value={profileData.location}
                      onChange={(e) => setProfileData(prev => ({ ...prev, location: e.target.value }))}
                      className="w-full bg-gray-50 rounded-lg border border-gray-300 px-4 py-3 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
                    />
                  </div>
                  
                  <button
                    onClick={handleSave}
                    className="w-full md:w-auto px-8 py-3 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 transition-colors"
                  >
                    Save Changes
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  <h2 className="text-3xl font-bold text-gray-900">{profileData.name}</h2>
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-gray-700">
                      <Mail className="w-5 h-5 text-gray-500" />
                      <span>{profileData.email}</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-700">
                      <Phone className="w-5 h-5 text-gray-500" />
                      <span>{profileData.phone}</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-700">
                      <MapPin className="w-5 h-5 text-gray-500" />
                      <span>{profileData.location}</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-700">
                      <Calendar className="w-5 h-5 text-gray-500" />
                      <span>Member since {profileData.joinDate}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {userStats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
              <div className="text-3xl font-bold text-gray-900 mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Achievements */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900">Achievements</h3>
            <span className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium">
              {badges.filter(b => b.earned).length} of {badges.length} earned
            </span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {badges.map((badge, index) => (
              <div
                key={index}
                className={`p-6 rounded-lg border transition-all ${
                  badge.earned 
                    ? 'border-green-200 bg-green-50' 
                    : 'border-gray-200 bg-gray-50'
                }`}
              >
                <div className="text-center space-y-3">
                  <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center font-bold text-lg ${
                    badge.earned ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-600'
                  }`}>
                    {badge.earned ? '✓' : '?'}
                  </div>
                  <h4 className="font-bold text-gray-900">{badge.name}</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">{badge.description}</p>
                  <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                    badge.earned 
                      ? 'bg-green-500 text-white' 
                      : 'bg-gray-200 text-gray-600'
                  }`}>
                    {badge.earned ? 'Earned' : 'Not Earned'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Account Settings */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Account Settings</h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3">
                <Settings className="w-5 h-5 text-gray-500" />
                <div>
                  <h4 className="font-medium text-gray-900">Notification Preferences</h4>
                  <p className="text-sm text-gray-600">Manage your notification settings</p>
                </div>
              </div>
              <button className="text-green-600 hover:text-green-700 font-medium">
                Manage
              </button>
            </div>

            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-gray-500" />
                <div>
                  <h4 className="font-medium text-gray-900">Privacy Settings</h4>
                  <p className="text-sm text-gray-600">Control your privacy preferences</p>
                </div>
              </div>
              <button className="text-green-600 hover:text-green-700 font-medium">
                Manage
              </button>
            </div>

            <div className="flex items-center justify-between p-4 border border-red-200 rounded-lg hover:bg-red-50 transition-colors">
              <div className="flex items-center gap-3">
                <LogOut className="w-5 h-5 text-red-500" />
                <div>
                  <h4 className="font-medium text-gray-900">Logout</h4>
                  <p className="text-sm text-gray-600">Sign out of your account</p>
                </div>
              </div>
              <button 
                onClick={() => setShowLogoutConfirm(true)}
                className="text-red-600 hover:text-red-700 font-medium"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileScreen;
