import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { 
  Sprout, 
  Globe2, 
  MapPin, 
  PhoneCall, 
  Bell, 
  Check, 
  ChevronDown, 
  AlertTriangle, 
  CloudRain, 
  TrendingUp, 
  Compass,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { mandiRatesData } from '../i18n/translations';

export default function Navbar({ activeTab, setActiveTab }) {
  const { lang, toggleLanguage, t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedFarm, setSelectedFarm] = useState(0);
  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadCount, setUnreadCount] = useState(3);
  const [currentLocationText, setCurrentLocationText] = useState(t.location.detected);
  const [isDetectingGPS, setIsDetectingGPS] = useState(false);

  const currentPath = location.pathname;

  const tabs = [
    { id: 'dashboard', path: '/', label: t.nav.dashboard },
    { id: 'cropDoctor', path: '/doctor', label: t.nav.cropDoctor },
    { id: 'weather', path: '/weather', label: t.nav.weather },
    { id: 'mandiPrices', path: '/mandi', label: t.nav.mandiPrices },
    { id: 'pestRadar', path: '/pest', label: t.nav.pestRadar },
    { id: 'schemes', path: '/schemes', label: t.nav.schemes },
  ];

  const farms = [
    { nameEn: "🚜 North Sector (Plot #4) - 4.5 Ac", nameHi: "🚜 उत्तरी खेत (प्लॉट #4) - 4.5 एकड़" },
    { nameEn: "🌾 Riverbank Farm (Plot #7) - 3.2 Ac", nameHi: "🌾 नदीतटीय खेत (प्लॉट #7) - 3.2 एकड़" },
  ];

  const notifications = [
    { id: 1, textEn: "🌧️ 35% rain forecasted tomorrow. Delay drip irrigation.", textHi: "🌧️ कल 35% बारिश का अनुमान। ड्रिप सिंचाई टालें।", time: "10m ago", icon: <CloudRain size={16} color="#3b82f6" /> },
    { id: 2, textEn: "💰 Wheat price rose by +₹45/Qtl in Khanna Mandi.", textHi: "💰 खन्ना मंडी में गेहूं का भाव +₹45 बढ़ा।", time: "1h ago", icon: <TrendingUp size={16} color="#10b981" /> },
    { id: 3, textEn: "⚠️ Regional Yellow Rust advisory active in your district.", textHi: "⚠️ जिले में पीले रतुआ की क्षेत्रीय चेतावनी जारी।", time: "3h ago", icon: <AlertTriangle size={16} color="#f59e0b" /> },
  ];

  const handleDetectGPS = () => {
    if (!navigator.geolocation) {
      alert(t.location.gpsError);
      return;
    }
    setIsDetectingGPS(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude.toFixed(4);
        const lon = pos.coords.longitude.toFixed(4);
        setCurrentLocationText(`${lat}° N, ${lon}° E (${lang === 'hi' ? "सत्यापित जीपीएस" : "Verified GPS"})`);
        setIsDetectingGPS(false);
      },
      (err) => {
        console.error("GPS Error:", err);
        setIsDetectingGPS(false);
        alert(t.location.gpsError);
      }
    );
  };

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      background: 'rgba(5, 12, 6, 0.88)',
      backdropFilter: 'blur(18px)',
      WebkitBackdropFilter: 'blur(18px)',
      borderBottom: '1px solid var(--glass-border)',
    }}>
      {/* Ticker Row */}
      <div style={{
        background: 'rgba(16, 185, 129, 0.08)',
        borderBottom: '1px solid rgba(46, 204, 113, 0.15)',
        padding: '4px 1rem',
        fontSize: '0.78rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        overflow: 'hidden',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
          <span style={{
            background: 'var(--accent-green)',
            color: '#000',
            fontWeight: '800',
            padding: '2px 6px',
            borderRadius: '4px',
            fontSize: '0.68rem',
          }}>
            LIVE APMC
          </span>
          <span style={{ color: 'var(--text-muted)' }}>
            {lang === 'hi' ? "ताज़ा मंडी भाव:" : "Mandi Ticker:"}
          </span>
        </div>

        {/* Scrolling Ticker Items */}
        <div style={{
          display: 'flex',
          gap: '1.5rem',
          overflowX: 'auto',
          scrollbarWidth: 'none',
          whiteSpace: 'nowrap',
          padding: '0 1rem',
        }}>
          {mandiRatesData.map((item, idx) => (
            <div key={idx} style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
              <span style={{ color: '#fff', fontWeight: '600' }}>
                {lang === 'hi' ? item.cropHi : item.cropEn}:
              </span>
              <span style={{ color: '#a8e6cf', fontWeight: '700' }}>₹{item.price}/Q</span>
              <span style={{ color: item.positive ? '#2ecc71' : '#e74c3c', fontSize: '0.72rem', fontWeight: '700' }}>
                {item.change}
              </span>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
          <PhoneCall size={12} color="#2ecc71" />
          <a href="tel:18001801551" style={{ color: '#2ecc71', textDecoration: 'none', fontWeight: '700' }}>
            1800-180-1551
          </a>
        </div>
      </div>

      {/* Main Navbar */}
      <div style={{
        maxWidth: '1440px',
        margin: '0 auto',
        padding: '0.75rem 1.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1rem',
        flexWrap: 'wrap',
      }}>
        {/* Brand Logo & Tag */}
        <div 
          onClick={() => navigate('/')} 
          style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', cursor: 'pointer' }}
        >
          <motion.div 
            whileHover={{ rotate: 15, scale: 1.1 }}
            style={{
              width: 44,
              height: 44,
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #10b981, #059669)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 20px rgba(16,185,129,0.5)',
              border: '1px solid rgba(255,255,255,0.2)',
            }}
          >
            <Sprout size={26} color="#ffffff" />
          </motion.div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h1 style={{
                fontSize: '1.35rem',
                fontWeight: '900',
                background: 'linear-gradient(to right, #ffffff, #34d399)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                margin: 0,
                letterSpacing: '-0.5px',
              }}>
                {t.appName}
              </h1>
              <span style={{
                background: 'rgba(16,185,129,0.15)',
                color: '#34d399',
                border: '1px solid rgba(16,185,129,0.3)',
                padding: '2px 8px',
                borderRadius: '12px',
                fontSize: '0.68rem',
                fontWeight: '700',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
              }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#10b981', display: 'inline-block', animation: 'pulse 1.5s infinite' }} />
                {t.badgeActive}
              </span>
            </div>
            <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              {t.appTagline}
            </p>
          </div>
        </div>

        {/* Center Navigation Tabs (Desktop) */}
        <nav className="desktop-nav-tabs" style={{
          display: 'flex',
          gap: '6px',
          background: 'rgba(0,0,0,0.4)',
          padding: '4px',
          borderRadius: '14px',
          border: '1px solid var(--glass-border)',
          overflowX: 'auto',
          maxWidth: '100%',
        }}>
          {tabs.map((tab) => {
            const isActive = (tab.path === '/' && (currentPath === '/' || currentPath === '/dashboard')) ||
                             (tab.path !== '/' && currentPath.startsWith(tab.path));
            return (
              <button
                key={tab.id}
                onClick={() => {
                  if (setActiveTab) setActiveTab(tab.id);
                  navigate(tab.path);
                }}
                style={{
                  padding: '8px 14px',
                  borderRadius: '10px',
                  border: 'none',
                  background: isActive ? 'var(--accent-green)' : 'transparent',
                  color: isActive ? '#000000' : 'var(--text-muted)',
                  fontWeight: isActive ? '800' : '500',
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  whiteSpace: 'nowrap',
                }}
              >
                {tab.label}
              </button>
            );
          })}
        </nav>

        {/* Right Actions: Farm Switcher, GPS, Notifications & Language Switch */}
        <div 
          className="navbar-actions-scroll"
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.5rem',
            overflowX: 'auto',
            maxWidth: '100%',
            whiteSpace: 'nowrap',
            scrollbarWidth: 'none',
            WebkitOverflowScrolling: 'touch',
            padding: '2px 0',
          }}
        >
          {/* Farm Switcher */}
          <select
            value={selectedFarm}
            onChange={(e) => setSelectedFarm(Number(e.target.value))}
            style={{
              background: 'rgba(0,0,0,0.6)',
              border: '1px solid var(--glass-border)',
              borderRadius: '10px',
              padding: '6px 10px',
              color: '#fff',
              fontSize: '0.78rem',
              outline: 'none',
              maxWidth: '155px',
              textOverflow: 'ellipsis',
              flexShrink: 0,
              cursor: 'pointer',
            }}
          >
            {farms.map((f, i) => (
              <option key={i} value={i} style={{ background: '#111' }}>
                {lang === 'hi' ? f.nameHi : f.nameEn}
              </option>
            ))}
          </select>

          {/* GPS Auto-Detect Button */}
          <button
            onClick={handleDetectGPS}
            title={t.location.detectGPS}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              background: 'rgba(255,255,255,0.06)',
              padding: '6px 10px',
              borderRadius: '10px',
              border: '1px solid var(--glass-border)',
              fontSize: '0.78rem',
              color: '#e0e0e0',
              cursor: 'pointer',
              flexShrink: 0,
            }}
          >
            <Compass size={14} color="#34d399" className={isDetectingGPS ? "spin-icon" : ""} />
            <span style={{ fontWeight: '600' }}>
              {isDetectingGPS ? "GPS..." : currentLocationText.split(',')[0]}
            </span>
          </button>

          {/* Notification Bell Dropdown */}
          <div style={{ position: 'relative', flexShrink: 0 }}>
            <button
              onClick={() => {
                setShowNotifications(!showNotifications);
                setUnreadCount(0);
              }}
              style={{
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid var(--glass-border)',
                width: 36,
                height: 36,
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                cursor: 'pointer',
                position: 'relative',
              }}
            >
              <Bell size={16} />
              {unreadCount > 0 && (
                <span style={{
                  position: 'absolute',
                  top: -3,
                  right: -3,
                  background: '#ef4444',
                  color: '#fff',
                  width: 16,
                  height: 16,
                  borderRadius: '50%',
                  fontSize: '0.65rem',
                  fontWeight: '800',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notifications Popover */}
            <AnimatePresence>
              {showNotifications && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  style={{
                    position: 'absolute',
                    top: 45,
                    right: 0,
                    width: '300px',
                    maxWidth: '90vw',
                    background: 'rgba(10, 22, 14, 0.97)',
                    backdropFilter: 'blur(16px)',
                    border: '1px solid var(--glass-border)',
                    borderRadius: '14px',
                    padding: '1rem',
                    boxShadow: '0 15px 40px rgba(0,0,0,0.8)',
                    zIndex: 999,
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', borderBottom: '1px solid var(--glass-border)', paddingBottom: '0.5rem' }}>
                    <span style={{ fontWeight: '800', fontSize: '0.85rem' }}>
                      {lang === 'hi' ? "किसान सूचनाएं" : "Farm Alerts"}
                    </span>
                    <button onClick={() => setShowNotifications(false)} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
                      <X size={14} />
                    </button>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {notifications.map((n) => (
                      <div key={n.id} style={{ background: 'rgba(255,255,255,0.03)', padding: '8px', borderRadius: '8px', display: 'flex', gap: '8px', fontSize: '0.78rem' }}>
                        <div style={{ flexShrink: 0, marginTop: '2px' }}>{n.icon}</div>
                        <div>
                          <p style={{ margin: 0, color: '#fff', lineHeight: 1.4 }}>
                            {lang === 'hi' ? n.textHi : n.textEn}
                          </p>
                          <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>{n.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Bilingual Switch Button (EN / हिंदी) */}
          <motion.button
            onClick={toggleLanguage}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.35), rgba(5, 150, 105, 0.5))',
              border: '1px solid rgba(52, 211, 153, 0.6)',
              color: '#ffffff',
              padding: '6px 14px',
              borderRadius: '24px',
              fontSize: '0.82rem',
              fontWeight: '800',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              cursor: 'pointer',
              boxShadow: '0 0 15px rgba(16, 185, 129, 0.3)',
              flexShrink: 0,
            }}
          >
            <Globe2 size={15} color="#34d399" />
            <span>{lang === 'en' ? '🇮🇳 हिंदी' : '🌐 English'}</span>
          </motion.button>
        </div>
      </div>
    </header>
  );
}
