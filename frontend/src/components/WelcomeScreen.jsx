import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Languages, MapPin, Sparkles, UserCheck } from "lucide-react";

import Logo from "../assets/logo.png";
import IssueImage from "../assets/background.png";


// Content for both languages
const APP_CONTENT = {
  en: {
    title: "Join JanSetu",
    subtitle: "Make Your City Better!",
    description:
      "Report civic issues, track progress, and build a cleaner, greener community together.",
    button: "Start Reporting",
    stats: [
      {
        value: "1,200+",
        label: "Issues Resolved",
        icon: <UserCheck className="text-accent-teal" />,
      },
      {
        value: "50+",
        label: "Active Communities",
        icon: <MapPin className="text-primary-600" />,
      },
      {
        value: "Clean & Green",
        label: "Initiative",
        icon: <Sparkles className="text-yellow-500" />,
      },
    ],
  },
  hi: {
    title: "JanSetu में शामिल हों",
    subtitle: "अपने शहर को बेहतर बनाएं!",
    description:
      "नागरिक समस्याओं की रिपोर्ट करें, प्रगति को ट्रैक करें, और मिलकर एक स्वच्छ, हरित समुदाय बनाएं।",
    button: "रिपोर्ट करना शुरू करें",
    stats: [
      {
        value: "1,200+",
        label: "समस्याएं हल",
        icon: <UserCheck className="text-accent-teal" />,
      },
      {
        value: "50+",
        label: "सक्रिय समुदाय",
        icon: <MapPin className="text-primary-600" />,
      },
      {
        value: "स्वच्छ और हरित",
        label: "पहल",
        icon: <Sparkles className="text-yellow-500" />,
      },
    ],
  },
};

const WELCOME_VARIANTS = {
  logo: {
    initial: { scale: 0, rotate: -180 },
    animate: { scale: 1, rotate: 0 },
    transition: { duration: 1, type: "spring", bounce: 0.5 },
  },
  content: {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { delay: 0.5, duration: 0.8 },
  },
  stats: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { delay: 1, duration: 0.8 },
  },
};

function WelcomeScreen({ onGetStarted }) {
  const [currentLanguage, setCurrentLanguage] = useState("en");

  const toggleLanguage = () => {
    setCurrentLanguage((prevLang) => (prevLang === "en" ? "hi" : "en"));
  };

  const { title, subtitle, description, button, stats } =
    APP_CONTENT[currentLanguage];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-primary-50 to-secondary-50 relative overflow-hidden font-sans">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={IssueImage}
          alt="Background"
          className="w-full h-full object-cover opacity-30"
        />
      </div>

      {/* Animated Gradient Background */}
      <div className="absolute inset-0 z-0 opacity-40 animate-pulse bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary-200 via-white to-secondary-200"></div>

      {/* Language Toggle */}
      <motion.button
        onClick={toggleLanguage}
        className="absolute top-6 right-6 z-20 flex items-center gap-2 px-4 py-2 bg-white/70 backdrop-blur-md rounded-full border border-gray-200 text-primary-600 hover:bg-white transition-all duration-300 shadow-md"
        whileHover={{ scale: 1.05, boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
        whileTap={{ scale: 0.95 }}
      >
        <Languages className="w-4 h-4" />
        <span className="text-sm font-medium">
          {currentLanguage === "en" ? "हिं" : "EN"}
        </span>
      </motion.button>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center">
        {/* Logo */}
        <motion.div
          className="mb-4"
          variants={WELCOME_VARIANTS.logo}
          initial="initial"
          animate="animate"
        >
          <img
  src={Logo}
  alt="CivicSahyog Logo"
  className="w-32 h-32 object-contain mx-auto"
/>
        </motion.div>

        {/* Main Content */}
        <motion.div
          variants={WELCOME_VARIANTS.content}
          initial="initial"
          animate="animate"
          className="max-w-3xl -mt-4"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-primary-800 mb-3 tracking-tight leading-tight">
            {title}
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold text-accent-teal mb-4 leading-snug">
            {subtitle}
          </h2>
          <p className="text-base text-gray-700 mb-6 leading-relaxed max-w-xl mx-auto">
            {description}
          </p>

          {/* CTA Button */}
          <motion.button
            onClick={onGetStarted}
            className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-primary-600 to-accent-teal text-white font-bold rounded-full shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1 hover:scale-105"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="text-base">{button}</span>
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </motion.button>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          variants={WELCOME_VARIANTS.stats}
          initial="initial"
          animate="animate"
          className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl w-full"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="bg-white/90 backdrop-blur-md rounded-xl p-6 border border-gray-200 text-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mb-3 flex justify-center">{stat.icon}</div>
              <div className="text-3xl font-extrabold text-primary-700 mb-1">
                {stat.value}
              </div>
              <div className="text-base font-medium text-gray-700">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* 🚀 New Image Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-10"
        >
          {/* <img src="/background.png" 
            className="w-72 h-auto mx-auto rounded-xl shadow-lg hover:scale-105 transition-transform duration-300"
          /> */}
        </motion.div>

        <div className="h-8"></div>
      </div>
    </div>
  );
}

export default WelcomeScreen;
