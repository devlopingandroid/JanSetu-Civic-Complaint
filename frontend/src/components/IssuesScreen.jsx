import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Filter, Search, Download, Eye, Edit, Trash2, Plus,
  ChevronDown, MapPin, Clock, AlertTriangle
} from 'lucide-react';

function IssuesScreen() {
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const filtersRef = useRef(null);

  const issuesData = [
    { 
      id: 1, 
      title: "Pothole on MG Road", 
      category: "Roads", 
      status: "In Progress", 
      priority: "High", 
      location: "Ranchi", 
      assignee: "Roads Dept", 
      assigneeAvatar: "RD",
      date: "2024-01-15",
      progress: 65
    },
    { 
      id: 2, 
      title: "Broken Street Light", 
      category: "Electricity", 
      status: "Open", 
      priority: "Medium", 
      location: "Chatra", 
      assignee: "Unassigned", 
      assigneeAvatar: "UN",
      date: "2024-01-14",
      progress: 0
    },
    { 
      id: 3, 
      title: "Garbage Collection Delay", 
      category: "Waste", 
      status: "Resolved", 
      priority: "Low", 
      location: "Residential Area", 
      assignee: "Waste Mgmt", 
      assigneeAvatar: "WM",
      date: "2024-01-13",
      progress: 100
    },
    { 
      id: 4, 
      title: "Water Leakage", 
      category: "Water", 
      status: "In Progress", 
      priority: "High", 
      location: "Main Market", 
      assignee: "Water Dept", 
      assigneeAvatar: "WD",
      date: "2024-01-12",
      progress: 40
    },
    { 
      id: 5, 
      title: "Park Maintenance", 
      category: "Parks", 
      status: "Open", 
      priority: "Low", 
      location: "Central Park", 
      assignee: "Parks Dept", 
      assigneeAvatar: "PD",
      date: "2024-01-11",
      progress: 15
    }
  ];

  useEffect(() => {
    function handleClickOutside(event) {
      if (filtersRef.current && !filtersRef.current.contains(event.target)) {
        setShowFilters(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Open': return 'bg-gray-100 text-gray-700';
      case 'In Progress': return 'bg-orange-100 text-orange-700';
      case 'Resolved': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'Low': return 'bg-gray-100 text-gray-700';
      case 'Medium': return 'bg-yellow-100 text-yellow-700';
      case 'High': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const filteredIssues = issuesData.filter(issue => {
    const matchesSearch = issue.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         issue.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || 
                         issue.status.toLowerCase().replace(' ', '') === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">Issues Management</h2>
          <p className="text-gray-600 mt-1">Track and manage reported issues</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors">
          <Plus className="w-5 h-5" />
          Add New Issue
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search issues, locations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-80 border border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
              />
            </div>
            
            <div className="relative" ref={filtersRef}>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-xl hover:border-blue-500 transition-colors"
              >
                <Filter className="w-4 h-4" />
                Status: {filterStatus === 'all' ? 'All' : filterStatus}
                <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
              </button>
              
              <AnimatePresence>
                {showFilters && (
                  <motion.div
                    className="absolute top-full left-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 z-50"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    <div className="p-2">
                      {[
                        { value: 'all', label: 'All Issues' },
                        { value: 'open', label: 'Open' },
                        { value: 'inprogress', label: 'In Progress' },
                        { value: 'resolved', label: 'Resolved' }
                      ].map((option) => (
                        <button
                          key={option.value}
                          onClick={() => {
                            setFilterStatus(option.value);
                            setShowFilters(false);
                          }}
                          className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors text-sm"
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
          
          <button className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors">
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      {/* Issues Table */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
        <div className="p-4 bg-gray-50 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-gray-800">
              {filteredIssues.length} Issues Found
            </h3>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Clock className="w-4 h-4" />
              Last updated: {new Date().toLocaleTimeString()}
            </div>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Issue Details</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Priority</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Assignee</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Progress</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredIssues.map((issue, index) => (
                <motion.tr
                  key={issue.id}
                  className="hover:bg-gray-50 transition-colors"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-start gap-3">
                      <div className={`w-3 h-3 rounded-full mt-2 ${
                        issue.priority === 'High' ? 'bg-red-500' :
                        issue.priority === 'Medium' ? 'bg-yellow-500' :
                        'bg-gray-400'
                      }`}></div>
                      <div>
                        <div className="font-semibold text-gray-900">
                          {issue.title}
                        </div>
                        <div className="text-sm text-gray-600 mt-1">{issue.category}</div>
                        <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                          <MapPin className="w-3 h-3" />
                          {issue.location}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">{issue.date}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(issue.status)}`}>
                      {issue.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor(issue.priority)}`}>
                      {issue.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-gray-500 rounded-lg flex items-center justify-center text-white text-xs font-bold">
                        {issue.assigneeAvatar}
                      </div>
                      <span className="text-sm text-gray-700">{issue.assignee}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${
                            issue.progress === 100 ? 'bg-green-500' :
                            issue.progress > 50 ? 'bg-blue-500' :
                            'bg-orange-500'
                          }`}
                          style={{ width: `${issue.progress}%` }}
                        />
                      </div>
                      <span className="text-xs text-gray-600 w-12">{issue.progress}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1">
                      <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredIssues.length === 0 && (
          <div className="p-8 text-center text-gray-500">
            <AlertTriangle className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p>No issues found matching your criteria</p>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default IssuesScreen;
