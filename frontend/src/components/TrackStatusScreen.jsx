import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, MapPin, Clock, AlertTriangle, CheckCircle, 
  Filter, Search, Calendar, User, MessageSquare, Camera,
  ChevronRight, Download, Phone, Mail
} from 'lucide-react';
import potholes from "../assets/potholes.png";
import brokenstreetlight from "../assets/brokenstreetlight.png";
import garbage from "../assets/garbage.png";

function TrackStatusScreen({ onNavigate, onBack }) {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const statusReports = [
    {
      id: 1,
      title: "Pothole on Main Street",
      description: "Large pothole causing traffic disruption and vehicle damage",
      location: "Ranchi",
      status: "In Progress",
      priority: "High",
      progress: 65,
      reportedDate: "2024-01-15",
      estimatedCompletion: "2024-01-25",
      assignedDept: "Roads & Infrastructure",
      contactPerson: "Hari singh",
      phone: "+1-234-567-8901",
      email: "roads@city.gov",
      updates: [
        { date: "2024-01-18", message: "Work crew assigned, materials ordered", status: "progress" },
        { date: "2024-01-16", message: "Report verified and approved for repair", status: "approved" },
        { date: "2024-01-15", message: "Issue reported by citizen", status: "reported" }
      ],
      image: potholes,
      category: "Road Infrastructure"
    },
    {
      id: 2,
      title: "Broken Streetlight",
      description: "Street light not functioning, creating safety concerns",
      location: "Jamshedpur",
      status: "Resolved",
      priority: "Medium",
      progress: 100,
      reportedDate: "2024-01-10",
      estimatedCompletion: "2024-01-20",
      assignedDept: "Electrical Services",
      contactPerson: "Suresh Kumar",
      phone: "+1-234-567-8902",
      email: "electrical@city.gov",
      updates: [
        { date: "2024-01-19", message: "Repair completed and light tested", status: "completed" },
        { date: "2024-01-17", message: "Electrician dispatched to site", status: "progress" },
        { date: "2024-01-12", message: "Work order created", status: "approved" },
        { date: "2024-01-10", message: "Issue reported by citizen", status: "reported" }
      ],
      image: brokenstreetlight,
      category: "Electricity"
    },
    {
      id: 3,
      title: "Garbage Collection Delay",
      description: "Missed garbage collection for 3 consecutive days",
      location: "Residential Area",
      status: "Open",
      priority: "Low",
      progress: 20,
      reportedDate: "2024-01-12",
      estimatedCompletion: "2024-01-30",
      assignedDept: "Waste Management",
      contactPerson: "Kunal sharma",
      phone: "+1-234-567-8903",
      email: "waste@city.gov",
      updates: [
        { date: "2024-01-14", message: "Investigating collection route issues", status: "progress" },
        { date: "2024-01-12", message: "Report received and logged", status: "reported" }
      ],
      image: garbage,
      category: "Waste Management"
    }
  ];

  const filters = [
    { id: 'all', label: 'All Reports', count: 3 },
    { id: 'open', label: 'Open', count: 1 },
    { id: 'progress', label: 'In Progress', count: 1 },
    { id: 'resolved', label: 'Resolved', count: 1 }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Resolved':
        return 'bg-green-100 text-green-800';
      case 'In Progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'Open':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High':
        return 'bg-red-100 text-red-800';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'Low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Download Report Function
  const downloadReport = (report) => {
    // Create HTML content for the report
    const reportContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>JanSetu Report - ${report.title}</title>
        <style>
          body { 
            font-family: Arial, sans-serif; 
            margin: 20px; 
            color: #333;
          }
          .header { 
            text-align: center; 
            border-bottom: 2px solid #22c55e;
            padding-bottom: 20px;
            margin-bottom: 30px;
          }
          .logo { 
            font-size: 24px; 
            font-weight: bold; 
            color: #22c55e;
            margin-bottom: 5px;
          }
          .subtitle { 
            color: #666; 
            font-size: 14px; 
          }
          .report-info { 
            background: #f8f9fa; 
            padding: 20px; 
            border-radius: 8px; 
            margin-bottom: 20px; 
          }
          .status { 
            display: inline-block; 
            padding: 5px 10px; 
            border-radius: 15px; 
            font-size: 12px; 
            font-weight: bold; 
          }
          .status.resolved { 
            background: #dcfce7; 
            color: #166534; 
          }
          .status.progress { 
            background: #fef3c7; 
            color: #92400e; 
          }
          .status.open { 
            background: #f3f4f6; 
            color: #374151; 
          }
          .priority.high { 
            background: #fee2e2; 
            color: #991b1b; 
          }
          .priority.medium { 
            background: #fef3c7; 
            color: #92400e; 
          }
          .priority.low { 
            background: #dcfce7; 
            color: #166534; 
          }
          .section { 
            margin-bottom: 25px; 
          }
          .section-title { 
            font-size: 18px; 
            font-weight: bold; 
            color: #374151; 
            border-bottom: 1px solid #e5e7eb; 
            padding-bottom: 5px; 
            margin-bottom: 15px; 
          }
          .progress-bar { 
            width: 100%; 
            height: 20px; 
            background: #e5e7eb; 
            border-radius: 10px; 
            overflow: hidden; 
            margin: 10px 0; 
          }
          .progress-fill { 
            height: 100%; 
            background: ${report.status === 'Resolved' ? '#22c55e' : 
                          report.status === 'In Progress' ? '#f59e0b' : '#6b7280'}; 
          }
          .updates { 
            list-style: none; 
            padding: 0; 
          }
          .update-item { 
            background: #fff; 
            border: 1px solid #e5e7eb; 
            padding: 15px; 
            margin-bottom: 10px; 
            border-radius: 5px; 
            border-left: 4px solid #22c55e; 
          }
          .update-date { 
            font-weight: bold; 
            color: #22c55e; 
            font-size: 14px; 
          }
          .contact-info { 
            background: #f0f9ff; 
            padding: 15px; 
            border-radius: 5px; 
            margin-top: 10px; 
          }
          .footer { 
            text-align: center; 
            margin-top: 40px; 
            padding-top: 20px; 
            border-top: 1px solid #e5e7eb; 
            color: #6b7280; 
            font-size: 12px; 
          }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="logo">🏛️ JanSetu</div>
          <div class="subtitle">Empowering Citizens - Issue Report</div>
        </div>

        <div class="report-info">
          <h2 style="margin-top: 0; color: #374151;">${report.title}</h2>
          <p style="margin: 10px 0;"><strong>Report ID:</strong> #${report.id.toString().padStart(4, '0')}</p>
          <p style="margin: 10px 0;"><strong>Location:</strong> 📍 ${report.location}</p>
          <p style="margin: 10px 0;"><strong>Category:</strong> ${report.category}</p>
          <div style="margin: 15px 0;">
            <span class="status ${report.status.toLowerCase().replace(' ', '')}">${report.status}</span>
            <span class="status priority ${report.priority.toLowerCase()}" style="margin-left: 10px;">${report.priority} Priority</span>
          </div>
        </div>

        <div class="section">
          <div class="section-title">📋 Description</div>
          <p>${report.description}</p>
        </div>

        <div class="section">
          <div class="section-title">📊 Progress Status</div>
          <div class="progress-bar">
            <div class="progress-fill" style="width: ${report.progress}%;"></div>
          </div>
          <p><strong>${report.progress}% Complete</strong></p>
        </div>

        <div class="section">
          <div class="section-title">📅 Timeline</div>
          <p><strong>Reported Date:</strong> ${new Date(report.reportedDate).toLocaleDateString()}</p>
          <p><strong>Estimated Completion:</strong> ${new Date(report.estimatedCompletion).toLocaleDateString()}</p>
        </div>

        <div class="section">
          <div class="section-title">🏢 Department Information</div>
          <p><strong>Assigned Department:</strong> ${report.assignedDept}</p>
          <p><strong>Contact Person:</strong> ${report.contactPerson}</p>
          <div class="contact-info">
            <p style="margin: 5px 0;"><strong>📞 Phone:</strong> ${report.phone}</p>
            <p style="margin: 5px 0;"><strong>📧 Email:</strong> ${report.email}</p>
          </div>
        </div>

        <div class="section">
          <div class="section-title">🔄 Recent Updates</div>
          <ul class="updates">
            ${report.updates.map(update => `
              <li class="update-item">
                <div class="update-date">${new Date(update.date).toLocaleDateString()}</div>
                <div>${update.message}</div>
              </li>
            `).join('')}
          </ul>
        </div>

        <div class="footer">
          <p>Generated on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}</p>
          <p>JanSetu - Smart Civic Issue Management System</p>
          <p>For support: support@JanSetu.com | www.JanSetusahyog.com</p>
        </div>
      </body>
      </html>
    `;

    // Create and trigger download
    const blob = new Blob([reportContent], { type: 'text/html' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `JanSetu_Report_${report.title.replace(/[^a-zA-Z0-9]/g, '_')}_${report.id}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);

    // Show success message (optional)
    alert(`Report "${report.title}" downloaded successfully!`);
  };

  const filteredReports = statusReports.filter(report => {
    const matchesFilter = selectedFilter === 'all' || 
      report.status.toLowerCase().replace(' ', '') === selectedFilter;
    const matchesSearch = report.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-64 h-64 bg-blue-100/40 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-green-100/30 rounded-full blur-3xl"></div>
      </div>

      {/* Header */}
      <motion.header 
        className="bg-white/90 backdrop-blur-lg border-b border-gray-200/50 sticky top-0 z-50 shadow-sm"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <motion.button
                onClick={onBack}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ArrowLeft className="w-6 h-6 text-gray-600" />
              </motion.button>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Track Status</h1>
                <p className="text-sm text-gray-600">Monitor your reported issues</p>
              </div>
            </div>
          </div>
        </div>
      </motion.header>

      <div className="max-w-7xl mx-auto px-6 py-8 relative z-10">
        {/* Filters and Search */}
        <motion.section 
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-6">
            <div className="flex flex-wrap gap-2">
              {filters.map((filter) => (
                <motion.button
                  key={filter.id}
                  onClick={() => setSelectedFilter(filter.id)}
                  className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                    selectedFilter === filter.id
                      ? 'bg-blue-500 text-white shadow-md'
                      : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {filter.label} ({filter.count})
                </motion.button>
              ))}
            </div>
            
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search reports..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
              />
            </div>
          </div>
        </motion.section>

        {/* Reports Grid */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            <AnimatePresence>
              {filteredReports.map((report, index) => (
                <motion.div
                  key={report.id}
                  className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.95 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -4 }}
                >
                  {/* Image Header */}
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={report.image} 
                      alt={report.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-blue-600/90 text-white px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm">
                        {report.category}
                      </span>
                    </div>
                    <div className="absolute top-4 right-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm ${getStatusColor(report.status)}`}>
                        {report.status}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="font-bold text-lg text-gray-900 leading-tight">{report.title}</h3>
                    </div>
                    
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{report.description}</p>
                    
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                      <MapPin className="w-4 h-4" />
                      <span>{report.location}</span>
                    </div>

                    <div className="flex items-center gap-3 mb-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor(report.priority)}`}>
                        {report.priority} Priority
                      </span>
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <Clock className="w-3 h-3" />
                        <span>{new Date(report.reportedDate).toLocaleDateString()}</span>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-4">
                      <div className="flex justify-between text-xs text-gray-600 mb-1">
                        <span>Progress</span>
                        <span>{report.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <motion.div
                          className={`h-2 rounded-full ${
                            report.status === 'Resolved' ? 'bg-green-500' :
                            report.status === 'In Progress' ? 'bg-yellow-500' :
                            'bg-gray-400'
                          }`}
                          initial={{ width: 0 }}
                          animate={{ width: `${report.progress}%` }}
                          transition={{ duration: 1, delay: index * 0.1 + 0.5 }}
                        />
                      </div>
                    </div>

                    {/* Department Info */}
                    <div className="bg-gray-50 rounded-lg p-3 mb-4">
                      <div className="text-xs text-gray-500 mb-1">Assigned Department</div>
                      <div className="font-medium text-sm text-gray-800">{report.assignedDept}</div>
                      <div className="text-xs text-gray-600">{report.contactPerson}</div>
                    </div>

                    {/* Latest Update */}
                    {report.updates && report.updates.length > 0 && (
                      <div className="border-t pt-4 mb-4">
                        <div className="text-xs text-gray-500 mb-2">Latest Update</div>
                        <div className="text-sm text-gray-700">{report.updates[0].message}</div>
                        <div className="text-xs text-gray-500 mt-1">{new Date(report.updates[0].date).toLocaleDateString()}</div>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <motion.button
                        onClick={() => downloadReport(report)}
                        className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Download className="w-4 h-4" />
                        Download Report
                      </motion.button>
                      <motion.button
                        className="px-4 py-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <MessageSquare className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {filteredReports.length === 0 && (
            <motion.div
              className="text-center py-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <AlertTriangle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No reports found</h3>
              <p className="text-gray-600">Try adjusting your filters or search query</p>
            </motion.div>
          )}
        </motion.section>
      </div>
    </div>
  );
}

export default TrackStatusScreen;
