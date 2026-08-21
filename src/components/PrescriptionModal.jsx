import React from 'react';
import { X, Printer, CheckCircle2, ShieldAlert, AlertTriangle, FileCheck, PhoneCall, Sprout } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

export default function PrescriptionModal({ diagnosis, onClose }) {
  const { lang, t } = useLanguage();

  if (!diagnosis) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 1000,
      background: 'rgba(0, 0, 0, 0.85)',
      backdropFilter: 'blur(10px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem',
    }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        style={{
          background: '#ffffff',
          color: '#111827',
          width: '100%',
          maxWidth: '680px',
          maxHeight: '90vh',
          borderRadius: '16px',
          overflowY: 'auto',
          boxShadow: '0 25px 60px rgba(0,0,0,0.8)',
          position: 'relative',
          padding: '2rem',
          fontFamily: 'Outfit, Noto Sans Devanagari, sans-serif',
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: 16,
            right: 16,
            background: '#f3f4f6',
            border: 'none',
            borderRadius: '50%',
            width: 36,
            height: 36,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: '#374151',
          }}
        >
          <X size={20} />
        </button>

        {/* Prescription Header */}
        <div style={{ borderBottom: '2px solid #10b981', paddingBottom: '1rem', marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: 34, height: 34, borderRadius: '8px', background: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                <Sprout size={20} />
              </div>
              <h2 style={{ fontSize: '1.4rem', fontWeight: '900', color: '#065f46', margin: 0 }}>
                AgriOS Precision Agronomy Clinic
              </h2>
            </div>
            <p style={{ fontSize: '0.82rem', color: '#6b7280', margin: '0.25rem 0 0 42px' }}>
              {lang === 'hi' ? "राष्ट्रीय कृषि डिजिटल रोग निदान एवं उपचार पर्ची" : "National AI Crop Pathology & Precision Prescription"}
            </p>
          </div>
          <div style={{ textAlign: 'right', fontSize: '0.8rem', color: '#6b7280' }}>
            <p style={{ margin: 0, fontWeight: '700', color: '#111827' }}>Rx #{Math.floor(100000 + Math.random() * 900000)}</p>
            <p style={{ margin: '2px 0 0' }}>{new Date().toLocaleDateString()}</p>
          </div>
        </div>

        {/* Patient / Farm Telemetry Data */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem', background: '#f9fafb', padding: '0.9rem', borderRadius: '10px', border: '1px solid #e5e7eb', marginBottom: '1.5rem', fontSize: '0.85rem' }}>
          <div>
            <span style={{ color: '#6b7280', fontSize: '0.75rem' }}>{lang === 'hi' ? "किसान का स्थान" : "Location"}:</span>
            <p style={{ margin: 0, fontWeight: '700' }}>Ludhiana, Punjab</p>
          </div>
          <div>
            <span style={{ color: '#6b7280', fontSize: '0.75rem' }}>{lang === 'hi' ? "निदान सटीकता" : "AI Confidence"}:</span>
            <p style={{ margin: 0, fontWeight: '700', color: '#059669' }}>{diagnosis.confidence}</p>
          </div>
          <div>
            <span style={{ color: '#6b7280', fontSize: '0.75rem' }}>{lang === 'hi' ? "रोग की स्थिति" : "Severity"}:</span>
            <p style={{ margin: 0, fontWeight: '700', color: diagnosis.severityLevel === 'danger' ? '#dc2626' : '#d97706' }}>
              {lang === 'hi' ? diagnosis.severityHi : diagnosis.severityEn}
            </p>
          </div>
        </div>

        {/* Diagnosis Identification */}
        <div style={{ marginBottom: '1.5rem' }}>
          <span style={{ fontSize: '0.8rem', fontWeight: '800', color: '#059669', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            {lang === 'hi' ? "पहचाना गया रोग / बीमारी" : "Identified Crop Pathogen"}
          </span>
          <h3 style={{ fontSize: '1.5rem', fontWeight: '900', color: '#111827', margin: '0.2rem 0 0' }}>
            {lang === 'hi' ? diagnosis.nameHi : diagnosis.nameEn}
          </h3>
          <p style={{ fontSize: '0.88rem', color: '#4b5563', margin: '0.2rem 0 0' }}>
            Scientific Classification: <em>{diagnosis.nameEn}</em> (Estimated Tissue Damage: {diagnosis.affectedArea})
          </p>
        </div>

        {/* Prescribed Treatments Table */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
          {/* Organic Prescriptions */}
          <div style={{ background: '#ecfdf5', border: '1px solid #a7f3d0', borderRadius: '12px', padding: '1rem' }}>
            <h4 style={{ color: '#065f46', fontSize: '0.95rem', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '6px', margin: '0 0 0.35rem' }}>
              🌿 {lang === 'hi' ? "प्राकृतिक व जैविक उपचार (Organic Solution)" : "Biological / Organic Remedy"}
            </h4>
            <p style={{ fontSize: '0.9rem', color: '#047857', lineHeight: 1.5, margin: 0 }}>
              {lang === 'hi' ? diagnosis.organicHi : diagnosis.organicEn}
            </p>
          </div>

          {/* Chemical Prescriptions */}
          <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '12px', padding: '1rem' }}>
            <h4 style={{ color: '#1e40af', fontSize: '0.95rem', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '6px', margin: '0 0 0.35rem' }}>
              🧪 {lang === 'hi' ? "रासायनिक दवा और छिड़काव मात्रा (Chemical Prescription)" : "Chemical Fungicide & Dosage"}
            </h4>
            <p style={{ fontSize: '0.9rem', color: '#1d4ed8', lineHeight: 1.5, margin: 0 }}>
              {lang === 'hi' ? diagnosis.chemicalHi : diagnosis.chemicalEn}
            </p>
          </div>

          {/* Prevention Advisory */}
          <div style={{ background: '#fffbeb', border: '1px solid #fde68a', borderRadius: '12px', padding: '1rem' }}>
            <h4 style={{ color: '#92400e', fontSize: '0.95rem', fontWeight: '800', margin: '0 0 0.35rem' }}>
              🛡️ {lang === 'hi' ? "भविष्य की सुरक्षा एवं रोकथाम" : "Preventive Farm Management"}
            </h4>
            <p style={{ fontSize: '0.9rem', color: '#78350f', lineHeight: 1.5, margin: 0 }}>
              {lang === 'hi' ? diagnosis.preventiveHi : diagnosis.preventiveEn}
            </p>
          </div>
        </div>

        {/* Footer & Doctor Signature */}
        <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ fontSize: '0.78rem', color: '#6b7280' }}>
            <p style={{ margin: 0 }}>📞 Kisan Toll-Free: <strong>1800-180-1551</strong></p>
            <p style={{ margin: '2px 0 0' }}>AgriOS AI Verified Pathology System</p>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={handlePrint}
              style={{
                background: '#10b981',
                color: '#ffffff',
                border: 'none',
                padding: '8px 18px',
                borderRadius: '8px',
                fontWeight: '700',
                fontSize: '0.9rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <Printer size={16} />
              {lang === 'hi' ? "प्रिंट करें / PDF सेव करें" : "Print / Save PDF"}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
