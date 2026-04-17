import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Camera, MapPin, ChevronRight, ChevronLeft,
  AlertCircle, CheckCircle, Loader, X, Plus, FileText,
  Clock, User, Phone
} from 'lucide-react';

function ReportIssueScreen({ onBack }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    category: '',
    priority: '',
    title: '',
    description: '',
    location: '',
    photos: [],
    contactInfo: {
      name: '',
      phone: ''
    }
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const steps = [
    { id: 1, title: "Issue Type" },
    { id: 2, title: "Details" },
    { id: 3, title: "Photos" },
    { id: 4, title: "Location" },
    { id: 5, title: "Review" }
  ];

  const categories = [
    { 
      id: 'roads', 
      name: 'Roads & Infrastructure', 
      examples: 'Potholes, broken roads, traffic issues'
    },
    { 
      id: 'waste', 
      name: 'Waste Management', 
      examples: 'Garbage collection, littering, cleanliness'
    },
    { 
      id: 'water', 
      name: 'Water & Drainage', 
      examples: 'Water supply, drainage, sewage issues'
    },
    { 
      id: 'electricity', 
      name: 'Electricity & Lighting', 
      examples: 'Street lights, power outages'
    },
    { 
      id: 'parks', 
      name: 'Parks & Environment', 
      examples: 'Green spaces, pollution, noise'
    },
    { 
      id: 'other', 
      name: 'Other Issues', 
      examples: 'Public facilities, safety concerns'
    }
  ];

  const priorities = [
    { 
      id: 'low', 
      name: 'Low Priority', 
      description: 'Non-urgent issue'
    },
    { 
      id: 'medium', 
      name: 'Medium Priority', 
      description: 'Moderately urgent'
    },
    { 
      id: 'high', 
      name: 'High Priority', 
      description: 'Needs immediate attention'
    }
  ];

  const handlePhotoUpload = (event) => {
    const files = Array.from(event.target.files);
    setFormData(prev => ({
      ...prev,
      photos: [...prev.photos, ...files.slice(0, 3 - prev.photos.length)]
    }));
  };

  const removePhoto = (index) => {
    setFormData(prev => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 2500));
    setIsSubmitting(false);
    setShowSuccess(true);
    
    setTimeout(() => {
      setShowSuccess(false);
      onBack();
    }, 2000);
  };

  const nextStep = () => {
    if (currentStep < 5) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1: return formData.category && formData.priority;
      case 2: return formData.title && formData.description;
      case 3: return true;
      case 4: return formData.location;
      case 5: return true;
      default: return false;
    }
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-green-50/30 flex items-center justify-center">
        <motion.div
          className="text-center bg-white p-10 rounded-xl shadow-lg border border-gray-200 max-w-md"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-3">Report Submitted!</h2>
          <p className="text-gray-600 mb-2">Your report ID: <strong>SR-2025-001</strong></p>
          <p className="text-sm text-gray-500">We'll update you on the progress</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-green-50/30 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-32 right-32 w-64 h-64 bg-green-100/40 rounded-full blur-3xl"></div>
        <div className="absolute bottom-32 left-32 w-80 h-80 bg-blue-100/30 rounded-full blur-3xl"></div>
      </div>

      {/* Header */}
      <motion.header 
        className="bg-white/90 backdrop-blur-lg border-b border-gray-200/50 sticky top-0 z-50 shadow-sm"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <motion.button
              onClick={onBack}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors px-3 py-2 rounded-lg hover:bg-gray-100"
              whileHover={{ x: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <ChevronLeft className="w-5 h-5" />
              <span className="font-medium">Back</span>
            </motion.button>
            
            <div className="text-center">
              <h1 className="text-xl font-bold text-gray-800">Report Issue</h1>
              <p className="text-sm text-gray-600">Step {currentStep} of {steps.length}</p>
            </div>
            
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Clock className="w-4 h-4" />
              <span>5 min</span>
            </div>
          </div>
        </div>
      </motion.header>

      <div className="max-w-4xl mx-auto px-6 py-8 relative z-10">
        {/* Progress Bar */}
        <div className="mb-10">
          <div className="flex justify-between mb-4">
            {steps.map((step, index) => (
              <div key={step.id} className="flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-medium transition-all ${
                  currentStep >= step.id
                    ? 'bg-green-500 border-green-500 text-white'
                    : 'bg-white border-gray-300 text-gray-400'
                }`}>
                  {step.id}
                </div>
                <span className={`text-xs mt-2 ${
                  currentStep >= step.id ? 'text-gray-900 font-medium' : 'text-gray-500'
                }`}>
                  {step.title}
                </span>
              </div>
            ))}
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <motion.div
              className="h-2 bg-green-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* Form Content */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8 mb-8">
          <AnimatePresence mode="wait">
            {/* Step 1: Category & Priority */}
            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">What type of issue are you reporting?</h3>
                  <p className="text-gray-600 mb-6">Select the category that best describes your problem</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => setFormData(prev => ({ ...prev, category: category.id }))}
                        className={`p-4 rounded-lg border-2 transition-all text-left ${
                          formData.category === category.id
                            ? 'border-green-500 bg-green-50'
                            : 'border-gray-200 bg-white hover:border-gray-300'
                        }`}
                      >
                        <div className="font-semibold text-gray-900 mb-1">{category.name}</div>
                        <div className="text-sm text-gray-600">{category.examples}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">How urgent is this issue?</h3>
                  <p className="text-gray-600 mb-6">Select the appropriate priority level</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {priorities.map((priority) => (
                      <button
                        key={priority.id}
                        onClick={() => setFormData(prev => ({ ...prev, priority: priority.id }))}
                        className={`p-4 rounded-lg border-2 transition-all text-center ${
                          formData.priority === priority.id
                            ? 'border-green-500 bg-green-50'
                            : 'border-gray-200 bg-white hover:border-gray-300'
                        }`}
                      >
                        <div className="font-semibold text-gray-900 mb-1">{priority.name}</div>
                        <div className="text-sm text-gray-600">{priority.description}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 2: Details */}
            {currentStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Describe the issue</h3>
                  <p className="text-gray-600 mb-6">Provide clear details about the problem</p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Issue Title *
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Brief description of the issue"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Detailed Description *
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Provide more details about the issue, when you noticed it, how it affects the community..."
                    rows={5}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all resize-none"
                  />
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-900 mb-2">Tips for a good report:</h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Be specific about the problem and location</li>
                    <li>• Mention if it's a safety hazard</li>
                    <li>• Include when you first noticed the issue</li>
                  </ul>
                </div>
              </motion.div>
            )}

            {/* Step 3: Photos */}
            {currentStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Add Photos (Optional)</h3>
                  <p className="text-gray-600 mb-6">Photos help us understand the issue better</p>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  {formData.photos.map((photo, index) => (
                    <div
                      key={index}
                      className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden border border-gray-200"
                    >
                      <img
                        src={URL.createObjectURL(photo)}
                        alt={`Upload ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                      <button
                        onClick={() => removePhoto(index)}
                        className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                  
                  {formData.photos.length < 3 && (
                    <label className="aspect-square border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-green-500 hover:bg-green-50 transition-all">
                      <Plus className="w-6 h-6 text-gray-400 mb-2" />
                      <span className="text-sm text-gray-600">Add Photo</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoUpload}
                        className="hidden"
                        multiple
                      />
                    </label>
                  )}
                </div>
              </motion.div>
            )}

            {/* Step 4: Location */}
            {currentStep === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Location & Contact</h3>
                  <p className="text-gray-600 mb-6">Where is this issue located?</p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Location *
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                      placeholder="Street address or nearby landmark"
                      className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all"
                    />
                  </div>
                  
                  <button className="mt-2 text-green-600 hover:text-green-700 font-medium text-sm">
                    Use My Current Location
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Your Name (Optional)
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        value={formData.contactInfo.name}
                        onChange={(e) => setFormData(prev => ({ 
                          ...prev, 
                          contactInfo: { ...prev.contactInfo, name: e.target.value }
                        }))}
                        placeholder="Your full name"
                        className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Phone Number (Optional)
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                      <input
                        type="tel"
                        value={formData.contactInfo.phone}
                        onChange={(e) => setFormData(prev => ({ 
                          ...prev, 
                          contactInfo: { ...prev.contactInfo, phone: e.target.value }
                        }))}
                        placeholder="Your phone number"
                        className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 5: Review */}
            {currentStep === 5 && (
              <motion.div
                key="step5"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Review Your Report</h3>
                  <p className="text-gray-600 mb-6">Please verify all information before submitting</p>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Issue Category & Priority</h4>
                    <div className="text-gray-700">
                      <strong>{categories.find(c => c.id === formData.category)?.name}</strong> - {formData.priority} priority
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Issue Details</h4>
                    <div className="space-y-2">
                      <div><strong>Title:</strong> {formData.title}</div>
                      <div><strong>Description:</strong> {formData.description}</div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Location</h4>
                    <div className="text-gray-700">{formData.location}</div>
                  </div>
                  
                  {formData.photos.length > 0 && (
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-2">Photos ({formData.photos.length})</h4>
                      <div className="flex gap-2">
                        {formData.photos.map((photo, index) => (
                          <div key={index} className="w-16 h-16 bg-gray-200 rounded overflow-hidden">
                            <img
                              src={URL.createObjectURL(photo)}
                              alt={`Photo ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center">
          <button
            onClick={prevStep}
            disabled={currentStep === 1}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
              currentStep === 1
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-gray-600 hover:text-gray-800 bg-white border border-gray-300 hover:bg-gray-50'
            }`}
          >
            <ChevronLeft className="w-5 h-5" />
            Previous
          </button>

          {currentStep < 5 ? (
            <button
              onClick={nextStep}
              disabled={!isStepValid()}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
                isStepValid()
                  ? 'bg-green-500 text-white hover:bg-green-600'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Next
              <ChevronRight className="w-5 h-5" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="flex items-center gap-2 px-8 py-3 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 transition-all disabled:opacity-70"
            >
              {isSubmitting ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  Submit Report
                  <CheckCircle className="w-5 h-5" />
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ReportIssueScreen;
