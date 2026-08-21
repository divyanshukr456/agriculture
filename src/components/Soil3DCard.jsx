import React from 'react';
import { Layers, Activity, Droplets, Thermometer, CheckCircle, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

export default function Soil3DCard() {
  const { t, lang } = useLanguage();

  const metrics = [
    { label: t.soil.nitrogen, value: '280 kg/ha', pct: 65, status: t.soil.statusDeficient, color: '#f39c12' },
    { label: t.soil.phosphorus, value: '24 kg/ha', pct: 82, status: t.soil.statusOptimal, color: '#2ecc71' },
    { label: t.soil.potassium, value: '310 kg/ha', pct: 88, status: t.soil.statusOptimal, color: '#2ecc71' },
    { label: t.soil.phLevel, value: '6.7 pH', pct: 75, status: t.soil.statusOptimal, color: '#3498db' },
  ];

  return (
    <motion.div 
      className="glass-panel"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h3 style={{ fontSize: '1.15rem', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '0.5rem', margin: 0 }}>
            <Layers size={20} color="var(--accent-green)" />
            {t.soil.title}
          </h3>
          <span style={{ fontSize: '0.78rem', color: '#a8e6cf', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '0.2rem' }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#2ecc71' }} />
            {t.soil.sensorHealth}
          </span>
        </div>

        <div style={{
          background: 'rgba(46,204,113,0.1)',
          border: '1px solid rgba(46,204,113,0.3)',
          padding: '6px 12px',
          borderRadius: '12px',
          fontSize: '0.8rem',
          fontWeight: '700',
          color: '#2ecc71',
        }}>
          Loamy Soil (दोमट मिट्टी)
        </div>
      </div>

      {/* NPK Meter Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '0.75rem' }}>
        {metrics.map((item, i) => (
          <div 
            key={i}
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid var(--glass-border)',
              borderRadius: '12px',
              padding: '0.85rem',
            }}
          >
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>{item.label}</span>
            <span style={{ fontSize: '1.1rem', fontWeight: '800', color: '#fff', margin: '0.2rem 0', display: 'block' }}>{item.value}</span>
            
            {/* Meter Bar */}
            <div style={{ height: '5px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', overflow: 'hidden', margin: '0.4rem 0' }}>
              <div style={{ width: `${item.pct}%`, height: '100%', background: item.color, borderRadius: '3px' }} />
            </div>

            <span style={{ fontSize: '0.7rem', color: item.color, fontWeight: '700' }}>
              {item.status}
            </span>
          </div>
        ))}
      </div>

      {/* Moisture & Temperature Row */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '0.75rem',
        background: 'rgba(0,0,0,0.3)',
        padding: '0.85rem',
        borderRadius: '12px',
        border: '1px solid var(--glass-border)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <div style={{ width: 34, height: 34, borderRadius: '8px', background: 'rgba(52,152,219,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Droplets size={18} color="#3498db" />
          </div>
          <div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{t.weather.soilMoisture}</span>
            <p style={{ fontSize: '0.95rem', fontWeight: '700', margin: 0, color: '#fff' }}>42% (Good)</p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <div style={{ width: 34, height: 34, borderRadius: '8px', background: 'rgba(243,156,18,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Thermometer size={18} color="#f39c12" />
          </div>
          <div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{t.weather.soilTemp}</span>
            <p style={{ fontSize: '0.95rem', fontWeight: '700', margin: 0, color: '#fff' }}>21.4°C</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
