import React from 'react';
import { Bug, Lightbulb, Sprout, Sparkles, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

export default function Recommendations() {
  const { t, lang } = useLanguage();

  const recommendations = [
    {
      icon: <Sprout size={24} color="var(--accent-green)" />,
      titleEn: 'Optimal Sowing Window',
      titleHi: 'बुवाई का अनुकूल समय',
      descEn: 'Soil temperature (21.4°C) is ideal for sowing Summer Moong and Maize next week.',
      descHi: 'मिट्टी का तापमान (21.4°C) अगले सप्ताह मूंग और मक्का की बुवाई के लिए अत्यंत अनुकूल है।'
    },
    {
      icon: <Bug size={24} color="#e74c3c" />,
      titleEn: 'Regional Pest Threat: Yellow Rust',
      titleHi: 'कीट चेतावनी: पीला रतुआ (येलो रस्ट)',
      descEn: 'Early symptoms spotted in neighboring districts. Inspect wheat foliage regularly.',
      descHi: 'आसपास के इलाकों में रतुआ के शुरुआती लक्षण दिखे हैं। गेहूं की पत्तियों की नियमित जांच करें।'
    },
    {
      icon: <Lightbulb size={24} color="#f1c40f" />,
      titleEn: 'Smart Electricity & Water Saver',
      descEn: 'Rain expected in 24h. Postpone tubewell pumping to save power and prevent water accumulation.',
      descHi: 'अगले 24 घंटे में बारिश का अनुमान है। बिजली और पानी की बचत के लिए ट्यूबवेल सिंचाई स्थगित रखें।'
    }
  ];

  return (
    <motion.div 
      className="glass-panel"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Sparkles size={18} color="var(--accent-green)" />
        <h3 style={{ fontSize: '1.2rem', fontWeight: '800', margin: 0, color: '#fff' }}>
          {lang === 'hi' ? "कृषि विशेषज्ञ दैनिक सलाह" : "Precision Agronomy Insights"}
        </h3>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
        {recommendations.map((rec, i) => (
          <motion.div 
            key={i}
            whileHover={{ y: -4, background: 'rgba(255,255,255,0.06)' }}
            style={{
              background: 'rgba(255,255,255,0.02)',
              padding: '1.15rem',
              borderRadius: '14px',
              border: '1px solid var(--glass-border)',
              display: 'flex',
              gap: '1rem',
            }}
          >
            <div style={{
              background: 'rgba(0,0,0,0.3)',
              width: '46px', height: '46px',
              borderRadius: '12px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0
            }}>
              {rec.icon}
            </div>
            <div>
              <h4 style={{ fontSize: '0.95rem', fontWeight: '700', margin: '0 0 0.25rem 0', color: '#fff' }}>
                {lang === 'hi' ? rec.titleHi : rec.titleEn}
              </h4>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', margin: 0, lineHeight: 1.45 }}>
                {lang === 'hi' ? rec.descHi : rec.descEn}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
