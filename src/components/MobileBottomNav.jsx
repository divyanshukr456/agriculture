import React from 'react';
import { LayoutDashboard, Stethoscope, CloudSun, Store, Landmark, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

export default function MobileBottomNav({ activeTab, setActiveTab }) {
  const { lang, t } = useLanguage();

  const navItems = [
    { id: 'dashboard', labelEn: 'Home', labelHi: 'होम', icon: <LayoutDashboard size={20} /> },
    { id: 'cropDoctor', labelEn: 'Doctor', labelHi: 'डॉक्टर', icon: <Stethoscope size={20} />, highlight: true },
    { id: 'weather', labelEn: 'Weather', labelHi: 'मौसम', icon: <CloudSun size={20} /> },
    { id: 'mandiPrices', labelEn: 'Mandi', labelHi: 'मंडी', icon: <Store size={20} /> },
    { id: 'schemes', labelEn: 'Schemes', labelHi: 'योजनाएं', icon: <Landmark size={20} /> },
  ];

  return (
    <div className="mobile-bottom-nav">
      <div className="mobile-nav-inner">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <motion.button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              whileTap={{ scale: 0.9 }}
              className={`mobile-nav-btn ${isActive ? 'active' : ''} ${item.highlight ? 'highlight-btn' : ''}`}
            >
              {item.highlight && !isActive ? (
                <div className="highlight-pill">
                  {item.icon}
                </div>
              ) : (
                item.icon
              )}
              <span className="mobile-nav-label">
                {lang === 'hi' ? item.labelHi : item.labelEn}
              </span>
              {isActive && (
                <motion.div
                  layoutId="mobileActiveIndicator"
                  className="mobile-active-dot"
                />
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
