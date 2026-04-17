import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  TrendingUp, ArrowDown, Users, Clock, X, Edit, Trash2, UserPlus, Eye
} from 'lucide-react';

function DepartmentsScreen() {
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showStaffModal, setShowStaffModal] = useState(false);
  const [activeStaffTab, setActiveStaffTab] = useState('overview');

  const departments = [
    { 
      name: "Roads Department", 
      issues: 50, 
      avgTime: "3 Days", 
      performance: 85, 
      staff: 12,
      satisfaction: 4.2,
      trend: "up",
      activeProjects: 8,
      completed: 43,
      description: "Manages road infrastructure and street maintenance",
      recentActivities: [
        { id: 1, activity: "Pothole repair completed on MG Road", date: "2 hours ago", status: "completed" },
        { id: 2, activity: "Street lighting installation in progress", date: "5 hours ago", status: "inprogress" },
        { id: 3, activity: "Traffic signal maintenance scheduled", date: "1 day ago", status: "pending" }
      ],
      staffMembers: [
        { id: 1, name: "Rajesh Kumar", role: "Senior Engineer", experience: "8 years", status: "active", avatar: "RK" },
        { id: 2, name: "Priya Singh", role: "Project Manager", experience: "5 years", status: "active", avatar: "PS" },
        { id: 3, name: "Amit Sharma", role: "Field Supervisor", experience: "3 years", status: "leave", avatar: "AS" },
        { id: 4, name: "Sunita Devi", role: "Quality Inspector", experience: "6 years", status: "active", avatar: "SD" }
      ]
    },
    { 
      name: "Waste Management", 
      issues: 35, 
      avgTime: "1 Day", 
      performance: 92, 
      staff: 8,
      satisfaction: 4.6,
      trend: "up",
      activeProjects: 5,
      completed: 32,
      description: "Handles garbage collection and waste disposal",
      recentActivities: [
        { id: 1, activity: "New recycling center inaugurated", date: "1 hour ago", status: "completed" },
        { id: 2, activity: "Waste collection route optimization", date: "3 hours ago", status: "inprogress" },
        { id: 3, activity: "Community awareness program planned", date: "6 hours ago", status: "pending" }
      ],
      staffMembers: [
        { id: 1, name: "Mohan Lal", role: "Collection Supervisor", experience: "7 years", status: "active", avatar: "ML" },
        { id: 2, name: "Kavita Sharma", role: "Waste Analyst", experience: "4 years", status: "active", avatar: "KS" },
        { id: 3, name: "Deepak Singh", role: "Driver", experience: "5 years", status: "active", avatar: "DS" }
      ]
    },
    { 
      name: "Water Department", 
      issues: 28, 
      avgTime: "2 Days", 
      performance: 78, 
      staff: 10,
      satisfaction: 3.9,
      trend: "down",
      activeProjects: 6,
      completed: 22,
      description: "Oversees water supply and quality control",
      recentActivities: [
        { id: 1, activity: "Water quality testing completed", date: "4 hours ago", status: "completed" },
        { id: 2, activity: "Pipeline repair ongoing", date: "8 hours ago", status: "inprogress" },
        { id: 3, activity: "New connection requests pending", date: "1 day ago", status: "pending" }
      ],
      staffMembers: [
        { id: 1, name: "Vinod Kumar", role: "Water Engineer", experience: "10 years", status: "active", avatar: "VK" },
        { id: 2, name: "Asha Devi", role: "Quality Tester", experience: "6 years", status: "active", avatar: "AD" },
        { id: 3, name: "Ravi Gupta", role: "Maintenance Head", experience: "8 years", status: "active", avatar: "RG" }
      ]
    },
    { 
      name: "Electricity Board", 
      issues: 22, 
      avgTime: "4 Days", 
      performance: 88, 
      staff: 15,
      satisfaction: 4.1,
      trend: "up",
      activeProjects: 4,
      completed: 19,
      description: "Manages power supply and electrical issues",
      recentActivities: [
        { id: 1, activity: "Power outage resolved in Sector 12", date: "30 minutes ago", status: "completed" },
        { id: 2, activity: "Street light installation in progress", date: "2 hours ago", status: "inprogress" },
        { id: 3, activity: "Transformer maintenance scheduled", date: "5 hours ago", status: "pending" }
      ],
      staffMembers: [
        { id: 1, name: "Suresh Yadav", role: "Electrical Engineer", experience: "12 years", status: "active", avatar: "SY" },
        { id: 2, name: "Meera Singh", role: "Line Supervisor", experience: "7 years", status: "active", avatar: "MS" },
        { id: 3, name: "Ajay Kumar", role: "Technician", experience: "4 years", status: "leave", avatar: "AK" }
      ]
    },
    { 
      name: "Parks & Recreation", 
      issues: 15, 
      avgTime: "1.5 Days", 
      performance: 95, 
      staff: 6,
      satisfaction: 4.8,
      trend: "up",
      activeProjects: 3,
      completed: 14,
      description: "Maintains parks and recreational facilities",
      recentActivities: [
        { id: 1, activity: "Children playground upgraded", date: "1 hour ago", status: "completed" },
        { id: 2, activity: "Tree plantation drive ongoing", date: "3 hours ago", status: "inprogress" },
        { id: 3, activity: "Garden maintenance scheduled", date: "6 hours ago", status: "pending" }
      ],
      staffMembers: [
        { id: 1, name: "Ramesh Gupta", role: "Park Supervisor", experience: "9 years", status: "active", avatar: "RG" },
        { id: 2, name: "Pooja Sharma", role: "Horticulturist", experience: "5 years", status: "active", avatar: "PS" },
        { id: 3, name: "Manoj Singh", role: "Gardener", experience: "3 years", status: "active", avatar: "MS" }
      ]
    },
    { 
      name: "Public Health", 
      issues: 18, 
      avgTime: "2.5 Days", 
      performance: 82, 
      staff: 9,
      satisfaction: 4.3,
      trend: "up",
      activeProjects: 7,
      completed: 15,
      description: "Handles health inspections and sanitation",
      recentActivities: [
        { id: 1, activity: "Food safety inspection completed", date: "2 hours ago", status: "completed" },
        { id: 2, activity: "Vaccination drive in progress", date: "4 hours ago", status: "inprogress" },
        { id: 3, activity: "Water quality testing scheduled", date: "8 hours ago", status: "pending" }
      ],
      staffMembers: [
        { id: 1, name: "Dr. Anjali Verma", role: "Health Officer", experience: "15 years", status: "active", avatar: "AV" },
        { id: 2, name: "Sandeep Kumar", role: "Inspector", experience: "6 years", status: "active", avatar: "SK" },
        { id: 3, name: "Rekha Devi", role: "Nurse", experience: "8 years", status: "active", avatar: "RD" }
      ]
    }
  ];

  const getPerformanceColor = (performance) => {
    if (performance >= 90) return { bg: 'bg-green-100', text: 'text-green-700', border: 'border-green-300' };
    if (performance >= 80) return { bg: 'bg-yellow-100', text: 'text-yellow-700', border: 'border-yellow-300' };
    return { bg: 'bg-red-100', text: 'text-red-700', border: 'border-red-300' };
  };

  const getGradientColor = (performance) => {
    if (performance >= 90) return 'from-green-500 to-green-600';
    if (performance >= 80) return 'from-yellow-500 to-yellow-600';
    return 'from-red-500 to-red-600';
  };

  const handleViewDetails = (department) => {
    setSelectedDepartment(department);
    setShowDetailsModal(true);
  };

  const handleManageStaff = (department) => {
    setSelectedDepartment(department);
    setShowStaffModal(true);
    setActiveStaffTab('overview');
  };

  const getActivityStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-700';
      case 'inprogress': return 'bg-blue-100 text-blue-700';
      case 'pending': return 'bg-orange-100 text-orange-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStaffStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700';
      case 'leave': return 'bg-orange-100 text-orange-700';
      case 'inactive': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  // Details Modal Component
  const DetailsModal = () => (
    <AnimatePresence>
      {showDetailsModal && selectedDepartment && (
        <motion.div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">{selectedDepartment.name}</h2>
              <button
                onClick={() => setShowDetailsModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Department Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-blue-50 rounded-xl p-4">
                <div className="text-sm text-gray-600">Performance</div>
                <div className="text-2xl font-bold text-blue-600">{selectedDepartment.performance}%</div>
              </div>
              <div className="bg-green-50 rounded-xl p-4">
                <div className="text-sm text-gray-600">Satisfaction</div>
                <div className="text-2xl font-bold text-green-600">{selectedDepartment.satisfaction}/5</div>
              </div>
            </div>

            {/* Recent Activities */}
            <div className="mb-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Activities</h3>
              <div className="space-y-3">
                {selectedDepartment.recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl">
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${getActivityStatusColor(activity.status)}`}>
                      {activity.status}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{activity.activity}</p>
                      <p className="text-sm text-gray-600">{activity.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-3 bg-gray-50 rounded-xl">
                <div className="text-2xl font-bold text-gray-900">{selectedDepartment.issues}</div>
                <div className="text-sm text-gray-600">Active Issues</div>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-xl">
                <div className="text-2xl font-bold text-gray-900">{selectedDepartment.completed}</div>
                <div className="text-sm text-gray-600">Completed</div>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-xl">
                <div className="text-2xl font-bold text-gray-900">{selectedDepartment.activeProjects}</div>
                <div className="text-sm text-gray-600">Projects</div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  // Staff Management Modal Component
  const StaffModal = () => (
    <AnimatePresence>
      {showStaffModal && selectedDepartment && (
        <motion.div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-2xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">{selectedDepartment.name} - Staff</h2>
              <button
                onClick={() => setShowStaffModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Staff Tabs */}
            <div className="flex gap-2 mb-6">
              {['overview', 'members', 'add'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveStaffTab(tab)}
                  className={`px-4 py-2 rounded-xl font-medium transition-colors ${
                    activeStaffTab === tab
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {tab === 'overview' ? 'Overview' : tab === 'members' ? 'Members' : 'Add Member'}
                </button>
              ))}
            </div>

            {/* Staff Content */}
            {activeStaffTab === 'overview' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-blue-50 rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-blue-600">{selectedDepartment.staff}</div>
                    <div className="text-sm text-gray-600">Total Staff</div>
                  </div>
                  <div className="bg-green-50 rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-green-600">
                      {selectedDepartment.staffMembers?.filter(s => s.status === 'active').length || 0}
                    </div>
                    <div className="text-sm text-gray-600">Active</div>
                  </div>
                  <div className="bg-orange-50 rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-orange-600">
                      {selectedDepartment.staffMembers?.filter(s => s.status === 'leave').length || 0}
                    </div>
                    <div className="text-sm text-gray-600">On Leave</div>
                  </div>
                </div>
              </div>
            )}

            {activeStaffTab === 'members' && (
              <div className="space-y-4">
                {selectedDepartment.staffMembers?.map((member) => (
                  <div key={member.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                    <div className="w-12 h-12 bg-gray-300 rounded-xl flex items-center justify-center text-white font-bold">
                      {member.avatar}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">{member.name}</h4>
                      <p className="text-sm text-gray-600">{member.role}</p>
                      <p className="text-xs text-gray-500">{member.experience} experience</p>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-sm font-medium ${getStaffStatusColor(member.status)}`}>
                      {member.status}
                    </div>
                    <div className="flex gap-2">
                      <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeStaffTab === 'add' && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Full Name"
                    className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <input
                    type="text"
                    placeholder="Role/Position"
                    className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <input
                    type="text"
                    placeholder="Experience"
                    className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <select className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option value="active">Active</option>
                    <option value="leave">On Leave</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
                <button className="w-full bg-blue-500 text-white py-3 rounded-xl hover:bg-blue-600 transition-colors font-medium flex items-center justify-center gap-2">
                  <UserPlus className="w-5 h-5" />
                  Add Staff Member
                </button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">Department Performance</h2>
          <p className="text-gray-600 mt-1">Monitor departmental efficiency and metrics</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-200">
            <div className="text-2xl font-bold text-gray-800">{departments.length}</div>
            <div className="text-sm text-gray-600">Total Departments</div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-200">
            <div className="text-2xl font-bold text-blue-600">{departments.reduce((acc, dept) => acc + dept.staff, 0)}</div>
            <div className="text-sm text-gray-600">Total Staff</div>
          </div>
        </div>
      </div>

      {/* Department Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {departments.map((dept, index) => {
          const perfColor = getPerformanceColor(dept.performance);
          const gradientColor = getGradientColor(dept.performance);
          
          return (
            <motion.div
              key={index}
              className="bg-white rounded-2xl border border-gray-200 p-6 shadow-lg hover:shadow-xl transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900">
                    {dept.name}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {dept.description}
                  </p>
                </div>
                <div className="flex items-center gap-2 ml-4">
                  {dept.trend === 'up' ? (
                    <TrendingUp className="w-5 h-5 text-green-600" />
                  ) : (
                    <ArrowDown className="w-5 h-5 text-red-600" />
                  )}
                  <div className={`px-3 py-1 rounded-full text-sm font-bold border ${perfColor.bg} ${perfColor.text} ${perfColor.border}`}>
                    {dept.performance}%
                  </div>
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <span className="text-lg font-bold text-gray-800">{dept.satisfaction}/5</span>
                <span className="text-sm text-gray-600">satisfaction rating</span>
              </div>
              
              {/* Key Metrics Grid */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-blue-50 rounded-xl p-3 text-center">
                  <div className="text-xl font-bold text-blue-600">{dept.issues}</div>
                  <div className="text-sm text-gray-600">Active Issues</div>
                </div>
                <div className="bg-green-50 rounded-xl p-3 text-center">
                  <div className="text-xl font-bold text-green-600">{dept.completed}</div>
                  <div className="text-sm text-gray-600">Completed</div>
                </div>
              </div>

              {/* Secondary Metrics */}
              <div className="grid grid-cols-3 gap-2 mb-4">
                <div className="text-center">
                  <div className="text-lg font-bold text-amber-600">{dept.avgTime}</div>
                  <div className="text-xs text-gray-600">Avg Time</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-purple-600">{dept.staff}</div>
                  <div className="text-xs text-gray-600">Staff</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-indigo-600">{dept.activeProjects}</div>
                  <div className="text-xs text-gray-600">Projects</div>
                </div>
              </div>

              {/* Efficiency Display */}
              <div className="bg-gray-50 rounded-xl p-4 mb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-gray-600">Resolution Rate</div>
                    <div className={`text-xl font-bold ${perfColor.text}`}>
                      {((dept.completed / dept.issues) * 100).toFixed(0)}%
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-600">Performance</div>
                    <div className={`text-xl font-bold ${perfColor.text}`}>
                      {dept.performance}%
                    </div>
                  </div>
                </div>
              </div>

              {/* Performance Bar */}
              <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
                <motion.div
                  className={`h-3 rounded-full bg-gradient-to-r ${gradientColor}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${dept.performance}%` }}
                  transition={{ delay: index * 0.1 + 0.5, duration: 1.5 }}
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <motion.button
                  onClick={() => handleViewDetails(dept)}
                  className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-xl text-sm font-medium transition-colors flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Eye className="w-4 h-4" />
                  View Details
                </motion.button>
                <motion.button
                  onClick={() => handleManageStaff(dept)}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-xl text-sm font-medium transition-colors flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Users className="w-4 h-4" />
                  Staff
                </motion.button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-green-500 rounded-2xl p-6 text-white">
          <h3 className="text-lg font-bold mb-2">Best Performer</h3>
          <p className="text-green-100 mb-4">Parks & Recreation</p>
          <div className="text-3xl font-bold">95%</div>
          <div className="text-sm text-green-100">Efficiency Rate</div>
        </div>

        <div className="bg-blue-500 rounded-2xl p-6 text-white">
          <h3 className="text-lg font-bold mb-2">Average Response</h3>
          <p className="text-blue-100 mb-4">All Departments</p>
          <div className="text-3xl font-bold">2.3 Days</div>
          <div className="text-sm text-blue-100">Resolution Time</div>
        </div>

        <div className="bg-purple-500 rounded-2xl p-6 text-white">
          <h3 className="text-lg font-bold mb-2">Overall Rating</h3>
          <p className="text-purple-100 mb-4">Citizen Satisfaction</p>
          <div className="text-3xl font-bold">4.3/5</div>
          <div className="text-sm text-purple-100">Average Rating</div>
        </div>
      </div>

      {/* Modals */}
      <DetailsModal />
      <StaffModal />
    </motion.div>
  );
}

export default DepartmentsScreen;