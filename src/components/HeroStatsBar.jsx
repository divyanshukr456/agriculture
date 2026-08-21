import React from 'react';
import { 
  Sprout, 
  Activity, 
  Droplets, 
  Thermometer, 
  ShieldCheck, 
  Camera, 
  Store, 
  Landmark, 
  Mic, 
  TrendingUp,
  Sparkles,
  Radio
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

export default function HeroStatsBar({ onNavigate }) {
  const { lang, t } = useLanguage();

  const metrics = [
    {
      icon: <Sprout size={18} color="#10b981" />,
      labelEn: "Crop NDVI Index",
      labelHi: "फसल स्वास्थ्य सूचकांक (NDVI)",
      value: "0.86",
      statusEn: "Vibrant Green",
      statusHi: "उत्कृष्ट स्वास्थ्य",
      color: "#10b981",
      bg: "rgba(16,185,129,0.12)"
    },
    {
      icon: <Droplets size={18} color="#3b82f6" />,
      labelEn: "Root Zone Moisture",
      labelHi: "जड़ क्षेत्र में नमी",
      value: "42%",
      statusEn: "Adequate Level",
      statusHi: "पर्याप्त नमी",
      color: "#3b82f6",
      bg: "rgba(59,130,246,0.12)"
    },
    {
      icon: <Thermometer size={18} color="#f59e0b" />,
      labelEn: "Microclimate Temp",
      labelHi: "खेत का तापमान",
      value: "27°C",
      statusEn: "Optimal Sowing",
      statusHi: "बुवाई योग्य",
      color: "#f59e0b",
      bg: "rgba(245,158,11,0.12)"
    },
    {
      icon: <ShieldCheck size={18} color="#8b5cf6" />,
      labelEn: "Satellite Pest Alert",
      labelHi: "उपग्रह कीट सुरक्षा",
      value: "Safe",
      statusEn: "0 Threat Detected",
      statusHi: "खेत पूरी तरह सुरक्षित",
      color: "#8b5cf6",
      bg: "rgba(139,92,246,0.12)"
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        marginBottom: '1.25rem',
      }}
    >
      {/* Top Banner Row */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(16,185,129,0.14) 0%, rgba(5,150,105,0.06) 50%, rgba(5,12,6,0.8) 100%)',
        border: '1px solid rgba(52,211,153,0.3)',
        borderRadius: '18px',
        padding: '1.25rem 1.5rem',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        boxShadow: '0 12px 35px rgba(0,0,0,0.5)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1.25rem',
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.35rem' }}>
            <span style={{
              background: 'rgba(16,185,129,0.2)',
              color: '#34d399',
              border: '1px solid rgba(16,185,129,0.4)',
              padding: '3px 10px',
              borderRadius: '20px',
              fontSize: '0.72rem',
              fontWeight: '800',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '5px',
            }}>
              <Radio size={12} className="pulse-slow" />
              {lang === 'hi' ? "लाइव सैटेलाइट व आईओटी ग्रिड सक्रिय" : "LIVE SATELLITE & IOT SENSORS"}
            </span>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              {lang === 'hi' ? "उत्तरी खेत (प्लॉट #4)" : "North Field (Plot #4)"}
            </span>
          </div>

          <h2 style={{ fontSize: '1.45rem', fontWeight: '900', margin: 0, color: '#ffffff', letterSpacing: '-0.3px' }}>
            {lang === 'hi' ? "नमस्ते किसान भाई! 🙏" : "Welcome Back, Precision Farmer! 🌾"}
          </h2>
          <p style={{ color: '#a8e6cf', fontSize: '0.85rem', margin: '0.25rem 0 0' }}>
            {lang === 'hi'
              ? "आज फसल की स्थिति उत्तम है। पत्ते की जांच के लिए तुरंत फोटो लें या मंडी भाव और मौसम देखें।"
              : "All telemetry is optimal today. Take a quick photo to diagnose crop health or check live mandi prices."}
          </p>
        </div>

        {/* Quick Action Pills */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => onNavigate('cropDoctor')}
            style={{
              background: 'linear-gradient(135deg, #10b981, #059669)',
              color: '#000000',
              border: 'none',
              padding: '9px 18px',
              borderRadius: '24px',
              fontSize: '0.85rem',
              fontWeight: '800',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: '0 0 20px rgba(16,185,129,0.4)',
            }}
          >
            <Camera size={16} />
            {lang === 'hi' ? "फसल रोग स्कैन करें" : "Scan Crop Leaf"}
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => onNavigate('mandiPrices')}
            style={{
              background: 'rgba(255,255,255,0.06)',
              color: '#ffffff',
              border: '1px solid var(--glass-border)',
              padding: '9px 16px',
              borderRadius: '24px',
              fontSize: '0.85rem',
              fontWeight: '700',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <Store size={16} color="#f59e0b" />
            {lang === 'hi' ? "मंडी भाव" : "Mandi Rates"}
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => onNavigate('schemes')}
            style={{
              background: 'rgba(255,255,255,0.06)',
              color: '#ffffff',
              border: '1px solid var(--glass-border)',
              padding: '9px 16px',
              borderRadius: '24px',
              fontSize: '0.85rem',
              fontWeight: '700',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <Landmark size={16} color="#3b82f6" />
            {lang === 'hi' ? "सरकारी योजनाएं" : "Govt Schemes"}
          </motion.button>
        </div>
      </div>

      {/* 4 Live Telemetry Floating Metric Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '0.85rem',
      }}>
        {metrics.map((m, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -3, borderColor: m.color }}
            style={{
              background: 'rgba(10, 22, 14, 0.75)',
              backdropFilter: 'blur(12px)',
              border: '1px solid var(--glass-border)',
              borderRadius: '14px',
              padding: '0.9rem 1.1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.85rem',
              boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
              transition: 'border-color 0.2s ease',
            }}
          >
            <div style={{
              width: 42,
              height: 42,
              borderRadius: '10px',
              background: m.bg,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}>
              {m.icon}
            </div>
            <div>
              <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)', display: 'block' }}>
                {lang === 'hi' ? m.labelHi : m.labelEn}
              </span>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
                <span style={{ fontSize: '1.25rem', fontWeight: '900', color: '#fff', lineHeight: 1.2 }}>
                  {m.value}
                </span>
                <span style={{ fontSize: '0.72rem', fontWeight: '700', color: m.color }}>
                  {lang === 'hi' ? m.statusHi : m.statusEn}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
