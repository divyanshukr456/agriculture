import React from 'react';
import { HashRouter, Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom';
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
import { PhoneCall } from 'lucide-react';

/* --- Individual Route Page Views --- */

function DashboardView() {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '1.25rem 1.5rem 0' }}>
        <HeroStatsBar onNavigate={(path) => navigate(path)} />
      </div>

      <div className="dashboard-grid">
        {/* Left Column: Weather Telemetry & Precision Advisory */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <WeatherWidget />
          <Recommendations />
        </div>

        {/* Center Column: Primary AI Crop Doctor & Soil Chemistry */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <AIAnalysis />
          <Soil3DCard />
        </div>

        {/* Right Column: Voice AI Assistant & Pest Radar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <VoiceInput onCommandNavigate={(path) => {
            if (path === 'cropDoctor') navigate('/doctor');
            else if (path === 'weather') navigate('/weather');
            else if (path === 'mandiPrices') navigate('/mandi');
            else if (path === 'pestRadar') navigate('/pest');
            else if (path === 'schemes') navigate('/schemes');
            else navigate(path);
          }} />
          <PestRadar />
        </div>
      </div>
    </motion.div>
  );
}

function CropDoctorView() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.25 }}
      style={{ maxWidth: '1000px', margin: '0 auto', padding: '1.5rem' }}
    >
      <AIAnalysis />
    </motion.div>
  );
}

function WeatherSoilView() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.25 }}
      style={{
        maxWidth: '1100px',
        margin: '0 auto',
        padding: '1.5rem',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '1.5rem',
      }}
    >
      <WeatherWidget />
      <Soil3DCard />
    </motion.div>
  );
}

function MandiPricesView() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.25 }}
      style={{ maxWidth: '1100px', margin: '0 auto', padding: '1.5rem' }}
    >
      <MandiPrices />
    </motion.div>
  );
}

function PestRadarView() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.25 }}
      style={{ maxWidth: '1100px', margin: '0 auto', padding: '1.5rem' }}
    >
      <PestRadar />
    </motion.div>
  );
}

function GovtSchemesView() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.25 }}
      style={{ maxWidth: '1100px', margin: '0 auto', padding: '1.5rem' }}
    >
      <GovtSchemes />
    </motion.div>
  );
}

/* --- Main Layout Frame with Router & Animated Routes --- */

function MainLayout() {
  const { t } = useLanguage();
  const location = useLocation();

  return (
    <div style={{ position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <ThreeBackground />
      <Navbar />

      <main style={{ flex: 1, paddingBottom: '2.5rem' }}>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            {/* Dashboard Routes */}
            <Route path="/" element={<DashboardView />} />
            <Route path="/dashboard" element={<DashboardView />} />

            {/* AI Crop Doctor */}
            <Route path="/doctor" element={<CropDoctorView />} />
            <Route path="/crop-doctor" element={<CropDoctorView />} />

            {/* Weather & Soil */}
            <Route path="/weather" element={<WeatherSoilView />} />
            <Route path="/weather-soil" element={<WeatherSoilView />} />

            {/* Mandi & Profit Calc */}
            <Route path="/mandi" element={<MandiPricesView />} />
            <Route path="/mandi-prices" element={<MandiPricesView />} />

            {/* Pest Radar */}
            <Route path="/pest" element={<PestRadarView />} />
            <Route path="/pest-radar" element={<PestRadarView />} />

            {/* Govt Schemes */}
            <Route path="/schemes" element={<GovtSchemesView />} />
            <Route path="/govt-schemes" element={<GovtSchemesView />} />

            {/* Catch-all fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
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
      <MobileBottomNav />
    </div>
  );
}

export default function App() {
  return (
    <HashRouter>
      <LanguageProvider>
        <MainLayout />
      </LanguageProvider>
    </HashRouter>
  );
}
