import React from 'react';
import { Bug, AlertTriangle, ShieldCheck, Radar, Radio } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

export default function PestRadar() {
  const { t, lang } = useLanguage();

  return (
    <motion.div 
      className="glass-panel"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.35 }}
      style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <Radar size={22} color="#e74c3c" className="pulse-slow" />
            <h2 style={{ fontSize: '1.35rem', fontWeight: '800', margin: 0, color: '#fff' }}>
              {t.pest.title}
            </h2>
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '0.25rem' }}>
            {t.pest.subtitle}
          </p>
        </div>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          background: 'rgba(231,76,60,0.15)',
          border: '1px solid rgba(231,76,60,0.3)',
          color: '#e74c3c',
          padding: '6px 12px',
          borderRadius: '20px',
          fontSize: '0.8rem',
          fontWeight: '700',
        }}>
          <Radio size={14} />
          {t.pest.threatLevel}
        </div>
      </div>

      {/* Pest Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
        {t.pest.pests.map((pest, idx) => (
          <motion.div
            key={idx}
            whileHover={{ y: -4, borderColor: 'rgba(231,76,60,0.4)' }}
            style={{
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid var(--glass-border)',
              borderRadius: '14px',
              padding: '1.2rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.6rem',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.8rem', color: '#a8e6cf', fontWeight: '600' }}>
                🌾 {pest.crop}
              </span>
              <span style={{
                background: idx === 0 ? 'rgba(231,76,60,0.2)' : 'rgba(241,196,15,0.2)',
                color: idx === 0 ? '#e74c3c' : '#f1c40f',
                padding: '2px 8px',
                borderRadius: '6px',
                fontSize: '0.72rem',
                fontWeight: '700',
              }}>
                {pest.risk}
              </span>
            </div>

            <h3 style={{ fontSize: '1.05rem', fontWeight: '700', color: '#fff', margin: 0 }}>
              {pest.name}
            </h3>

            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.4, margin: 0 }}>
              <strong style={{ color: 'var(--accent-green)' }}>{lang === 'hi' ? "रोकथाम:" : "Advisory:"} </strong>
              {pest.solution}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
