import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, Stethoscope, CloudSun, Store, Landmark } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

export default function MobileBottomNav({ activeTab, setActiveTab }) {
  const { lang } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  const navItems = [
    { id: 'dashboard', path: '/', labelEn: 'Home', labelHi: 'होम', icon: <LayoutDashboard size={20} /> },
    { id: 'cropDoctor', path: '/doctor', labelEn: 'Doctor', labelHi: 'डॉक्टर', icon: <Stethoscope size={20} />, highlight: true },
    { id: 'weather', path: '/weather', labelEn: 'Weather', labelHi: 'मौसम', icon: <CloudSun size={20} /> },
    { id: 'mandiPrices', path: '/mandi', labelEn: 'Mandi', labelHi: 'मंडी', icon: <Store size={20} /> },
    { id: 'schemes', path: '/schemes', labelEn: 'Schemes', labelHi: 'योजनाएं', icon: <Landmark size={20} /> },
  ];

  return (
    <div className="mobile-bottom-nav">
      <div className="mobile-nav-inner">
        {navItems.map((item) => {
          const isActive = (item.path === '/' && (currentPath === '/' || currentPath === '/dashboard')) ||
                           (item.path !== '/' && currentPath.startsWith(item.path));
          return (
            <motion.button
              key={item.id}
              onClick={() => {
                if (setActiveTab) setActiveTab(item.id);
                navigate(item.path);
              }}
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
