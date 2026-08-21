import React, { useState } from 'react';
import ThreeBackground from './components/ThreeBackground';
import Navbar from './components/Navbar';
import WeatherWidget from './components/WeatherWidget';
import AIAnalysis from './components/AIAnalysis';
import VoiceInput from './components/VoiceInput';
import Recommendations from './components/Recommendations';
import Soil3DCard from './components/Soil3DCard';
import MandiPrices from './components/MandiPrices';
import PestRadar from './components/PestRadar';
import GovtSchemes from './components/GovtSchemes';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import { PhoneCall, ShieldCheck, Heart, Sparkles, Sprout } from 'lucide-react';

function DashboardContent() {
  const { t, lang } = useLanguage();
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div style={{ position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <ThreeBackground />
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main style={{ flex: 1, paddingBottom: '2.5rem' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '1rem 1.5rem 0' }}>
          {/* Quick Action Welcome Hero on Dashboard */}
          {activeTab === 'dashboard' && (
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '1rem',
                marginBottom: '1.25rem',
                background: 'linear-gradient(135deg, rgba(16,185,129,0.12), rgba(5,150,105,0.05))',
                border: '1px solid rgba(52,211,153,0.25)',
                borderRadius: '16px',
                padding: '1rem 1.5rem',
              }}
            >
              <div>
                <h2 style={{ fontSize: '1.4rem', fontWeight: '800', margin: 0, color: '#fff' }}>
                  {lang === 'hi' ? "नमस्ते किसान भाई! 🙏" : "Welcome Back, Precision Farmer! 🌾"}
                </h2>
                <p style={{ color: '#a8e6cf', fontSize: '0.85rem', margin: '0.2rem 0 0' }}>
                  {lang === 'hi' 
                    ? "आज आपकी फसल और मिट्टी की स्थिति सामान्य है। किसी भी पत्ते की जांच के लिए तुरंत फोटो लें या नमूना पत्ता चुनें।" 
                    : "Your crop telemetry is stable. Use the live camera scanner below to detect leaf infections."}
                </p>
              </div>

              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <button
                  onClick={() => setActiveTab('cropDoctor')}
                  style={{
                    background: 'linear-gradient(135deg, #10b981, #059669)',
                    color: '#000',
                    border: 'none',
                    padding: '8px 16px',
                    borderRadius: '24px',
                    fontSize: '0.85rem',
                    fontWeight: '800',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  📷 {lang === 'hi' ? "फसल रोग स्कैन करें" : "Scan Crop Leaf"}
                </button>

                <button
                  onClick={() => setActiveTab('schemes')}
                  style={{
                    background: 'rgba(255,255,255,0.08)',
                    color: '#fff',
                    border: '1px solid var(--glass-border)',
                    padding: '8px 16px',
                    borderRadius: '24px',
                    fontSize: '0.85rem',
                    fontWeight: '700',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  🏛️ {lang === 'hi' ? "सरकारी योजनाएं" : "Govt Schemes"}
                </button>
              </div>
            </motion.div>
          )}
        </div>

        {/* Tabbed Views */}
        <AnimatePresence mode="wait">
          {activeTab === 'dashboard' && (
            <motion.div 
              key="dashboard"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="dashboard-grid"
            >
              {/* Left Column */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <WeatherWidget />
                <Recommendations />
              </div>

              {/* Center Column: Primary AI Crop Doctor */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <AIAnalysis />
                <Soil3DCard />
              </div>

              {/* Right Column: Voice AI & Radar */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <VoiceInput onCommandNavigate={(tab) => setActiveTab(tab)} />
                <PestRadar />
              </div>
            </motion.div>
          )}

          {activeTab === 'cropDoctor' && (
            <motion.div
              key="cropDoctor"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              style={{ maxWidth: '1000px', margin: '0 auto', padding: '1.5rem' }}
            >
              <AIAnalysis />
            </motion.div>
          )}

          {activeTab === 'weather' && (
            <motion.div
              key="weather"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              style={{ maxWidth: '1100px', margin: '0 auto', padding: '1.5rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}
            >
              <WeatherWidget />
              <Soil3DCard />
            </motion.div>
          )}

          {activeTab === 'mandiPrices' && (
            <motion.div
              key="mandiPrices"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              style={{ maxWidth: '1100px', margin: '0 auto', padding: '1.5rem' }}
            >
              <MandiPrices />
            </motion.div>
          )}

          {activeTab === 'pestRadar' && (
            <motion.div
              key="pestRadar"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              style={{ maxWidth: '1100px', margin: '0 auto', padding: '1.5rem' }}
            >
              <PestRadar />
            </motion.div>
          )}

          {activeTab === 'schemes' && (
            <motion.div
              key="schemes"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              style={{ maxWidth: '1100px', margin: '0 auto', padding: '1.5rem' }}
            >
              <GovtSchemes />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Senior Dev Polished Footer */}
      <footer style={{
        background: 'rgba(5, 12, 6, 0.95)',
        borderTop: '1px solid var(--glass-border)',
        padding: '1.5rem',
        textAlign: 'center',
        position: 'relative',
        zIndex: 10,
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ textAlign: 'left' }}>
            <p style={{ fontWeight: '700', color: '#fff', margin: 0, fontSize: '0.9rem' }}>
              {t.appName} - {t.appTagline}
            </p>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.78rem', margin: '0.2rem 0 0' }}>
              {t.footer.tagline}
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              background: 'rgba(46,204,113,0.1)',
              padding: '6px 14px',
              borderRadius: '20px',
              border: '1px solid rgba(46,204,113,0.25)',
              fontSize: '0.82rem',
              color: '#2ecc71',
              fontWeight: '700',
            }}>
              <PhoneCall size={14} />
              <span>{t.footer.helpline}</span>
            </div>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              {t.footer.rights}
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <DashboardContent />
    </LanguageProvider>
  );
}
