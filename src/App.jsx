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
import MobileBottomNav from './components/MobileBottomNav';
import HeroStatsBar from './components/HeroStatsBar';
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
        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '1.25rem 1.5rem 0' }}>
          {/* Interactive Live Telemetry Hero Stats & Action Hub */}
          {activeTab === 'dashboard' && (
            <HeroStatsBar onNavigate={(tab) => setActiveTab(tab)} />
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

      {/* Floating Bottom Navigation Bar for Mobile */}
      <MobileBottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
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
