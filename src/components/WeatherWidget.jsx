import React from 'react';
import { 
  CloudSun, 
  Droplets, 
  Wind, 
  CloudRain, 
  Sun, 
  MapPin, 
  Compass, 
  AlertCircle,
  Calendar
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

export default function WeatherWidget() {
  const { t, lang } = useLanguage();

  const forecast = [
    { day: t.weather.forecastDays[0], temp: '27°', icon: <CloudSun size={20} color="#f1c40f" />, rain: '35%' },
    { day: t.weather.forecastDays[1], temp: '29°', icon: <Sun size={20} color="#f39c12" />, rain: '10%' },
    { day: t.weather.forecastDays[2], temp: '25°', icon: <CloudRain size={20} color="#3498db" />, rain: '75%' },
    { day: t.weather.forecastDays[3], temp: '26°', icon: <CloudSun size={20} color="#f1c40f" />, rain: '20%' },
    { day: t.weather.forecastDays[4], temp: '28°', icon: <Sun size={20} color="#f39c12" />, rain: '5%' },
    { day: t.weather.forecastDays[5], temp: '30°', icon: <Sun size={20} color="#f39c12" />, rain: '0%' },
    { day: t.weather.forecastDays[6], temp: '28°', icon: <CloudSun size={20} color="#f1c40f" />, rain: '15%' },
  ];

  return (
    <motion.div 
      className="glass-panel"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.25 }}
      style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}
    >
      {/* Header with Location & Main Temp */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#a8e6cf', fontSize: '0.85rem' }}>
            <MapPin size={16} color="var(--accent-green)" />
            <span style={{ fontWeight: '700' }}>{t.location.detected}</span>
          </div>
          <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginLeft: '1.4rem' }}>
            {t.location.coords}
          </span>
        </div>

        <div style={{
          background: 'rgba(241,196,15,0.15)',
          color: '#f1c40f',
          border: '1px solid rgba(241,196,15,0.3)',
          padding: '4px 10px',
          borderRadius: '20px',
          fontSize: '0.75rem',
          fontWeight: '700',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
        }}>
          <Sun size={14} />
          {t.weather.condition}
        </div>
      </div>

      {/* Main Temperature Display */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
        <h1 style={{ fontSize: '3.8rem', fontWeight: '900', margin: 0, lineHeight: 1, color: '#fff', letterSpacing: '-2px' }}>
          {t.weather.temp}
        </h1>
        <div>
          <span style={{ fontSize: '1.1rem', fontWeight: '700', color: '#a8e6cf', display: 'block' }}>
            {t.weather.condition}
          </span>
          <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            {t.weather.highLow}
          </span>
        </div>
      </div>

      {/* 4 Telemetry Metrics Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '0.75rem' }}>
        <div style={{ background: 'rgba(255,255,255,0.03)', padding: '0.75rem', borderRadius: '12px', border: '1px solid var(--glass-border)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#3498db', fontSize: '0.78rem' }}>
            <Droplets size={16} />
            <span>{t.weather.humidity}</span>
          </div>
          <p style={{ fontSize: '1.1rem', fontWeight: '800', margin: '0.3rem 0 0', color: '#fff' }}>62%</p>
        </div>

        <div style={{ background: 'rgba(255,255,255,0.03)', padding: '0.75rem', borderRadius: '12px', border: '1px solid var(--glass-border)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#2ecc71', fontSize: '0.78rem' }}>
            <Wind size={16} />
            <span>{t.weather.windSpeed}</span>
          </div>
          <p style={{ fontSize: '1.1rem', fontWeight: '800', margin: '0.3rem 0 0', color: '#fff' }}>14 km/h NW</p>
        </div>

        <div style={{ background: 'rgba(255,255,255,0.03)', padding: '0.75rem', borderRadius: '12px', border: '1px solid var(--glass-border)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#9b59b6', fontSize: '0.78rem' }}>
            <CloudRain size={16} />
            <span>{t.weather.rainChance}</span>
          </div>
          <p style={{ fontSize: '1.1rem', fontWeight: '800', margin: '0.3rem 0 0', color: '#fff' }}>35%</p>
        </div>

        <div style={{ background: 'rgba(255,255,255,0.03)', padding: '0.75rem', borderRadius: '12px', border: '1px solid var(--glass-border)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#f39c12', fontSize: '0.78rem' }}>
            <Sun size={16} />
            <span>{t.weather.uvIndex}</span>
          </div>
          <p style={{ fontSize: '1.1rem', fontWeight: '800', margin: '0.3rem 0 0', color: '#fff' }}>4.8 (Mod)</p>
        </div>
      </div>

      {/* Smart Irrigation Advisory Alert */}
      <div style={{
        background: 'rgba(52, 152, 219, 0.1)',
        border: '1px solid rgba(52, 152, 219, 0.3)',
        borderRadius: '12px',
        padding: '0.85rem',
        display: 'flex',
        alignItems: 'flex-start',
        gap: '0.75rem',
      }}>
        <AlertCircle size={18} color="#3498db" style={{ flexShrink: 0, marginTop: '2px' }} />
        <div>
          <strong style={{ color: '#3498db', fontSize: '0.85rem', display: 'block' }}>
            {t.weather.advisoryTitle}
          </strong>
          <p style={{ fontSize: '0.8rem', color: '#e0e0e0', margin: '0.2rem 0 0', lineHeight: 1.4 }}>
            {t.weather.advisoryText}
          </p>
        </div>
      </div>

      {/* 7-Day Mini Forecast Strip */}
      <div>
        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '0.5rem' }}>
          <Calendar size={14} />
          {lang === 'hi' ? "7-दिवसीय मौसम पूर्वानुमान" : "7-Day Weather Trend"}
        </span>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px' }}>
          {forecast.map((item, idx) => (
            <div 
              key={idx}
              style={{
                background: idx === 0 ? 'rgba(46,204,113,0.15)' : 'rgba(255,255,255,0.02)',
                border: `1px solid ${idx === 0 ? 'rgba(46,204,113,0.4)' : 'var(--glass-border)'}`,
                borderRadius: '8px',
                padding: '0.5rem 0.2rem',
                textAlign: 'center',
              }}
            >
              <span style={{ fontSize: '0.7rem', color: idx === 0 ? '#2ecc71' : 'var(--text-muted)', display: 'block', fontWeight: '700' }}>
                {item.day}
              </span>
              <div style={{ margin: '0.3rem 0' }}>{item.icon}</div>
              <span style={{ fontSize: '0.85rem', fontWeight: '800', color: '#fff', display: 'block' }}>
                {item.temp}
              </span>
              <span style={{ fontSize: '0.65rem', color: '#3498db' }}>{item.rain}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
