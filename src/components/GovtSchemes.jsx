import React from 'react';
import { Landmark, ShieldCheck, SunMedium, FileSpreadsheet, ExternalLink, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

export default function GovtSchemes() {
  const { t, lang } = useLanguage();

  const schemeIcons = [
    <Landmark size={24} color="#10b981" />,
    <ShieldCheck size={24} color="#3b82f6" />,
    <SunMedium size={24} color="#f59e0b" />,
    <FileSpreadsheet size={24} color="#8b5cf6" />
  ];

  return (
    <motion.div 
      className="glass-panel"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
    >
      <div>
        <h2 style={{ fontSize: '1.4rem', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#fff', margin: 0 }}>
          <Landmark size={24} color="var(--accent-green)" />
          {t.schemes.title}
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '0.25rem' }}>
          {t.schemes.subtitle}
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
        {t.schemes.list.map((scheme, idx) => (
          <motion.div
            key={idx}
            whileHover={{ y: -4, borderColor: 'rgba(52,211,153,0.4)' }}
            style={{
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid var(--glass-border)',
              borderRadius: '16px',
              padding: '1.25rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '1rem',
            }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                <div style={{
                  width: 44,
                  height: 44,
                  borderRadius: '12px',
                  background: 'rgba(0,0,0,0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid var(--glass-border)',
                }}>
                  {schemeIcons[idx]}
                </div>
                <span style={{
                  background: 'rgba(16,185,129,0.15)',
                  color: '#34d399',
                  border: '1px solid rgba(16,185,129,0.3)',
                  padding: '3px 10px',
                  borderRadius: '12px',
                  fontSize: '0.72rem',
                  fontWeight: '700',
                }}>
                  {scheme.tag}
                </span>
              </div>

              <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#fff', margin: '0 0 0.4rem' }}>
                {scheme.title}
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.45, margin: 0 }}>
                {scheme.benefit}
              </p>
            </div>

            <button
              onClick={() => alert(lang === 'hi' ? `${scheme.title} के आधिकारिक पोर्टल पर रीडायरेक्ट किया जा रहा है...` : `Redirecting to official ${scheme.title} portal...`)}
              style={{
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid var(--glass-border)',
                color: '#a8e6cf',
                padding: '8px 14px',
                borderRadius: '10px',
                fontSize: '0.82rem',
                fontWeight: '700',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                cursor: 'pointer',
              }}
            >
              <span>{scheme.linkText}</span>
              <ExternalLink size={14} />
            </button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
