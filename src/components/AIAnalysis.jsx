import React, { useState } from 'react';
import { 
  Camera, 
  Upload, 
  ScanLine, 
  AlertTriangle, 
  CheckCircle2, 
  Volume2, 
  VolumeX, 
  RotateCcw, 
  Printer, 
  ShieldAlert, 
  Sparkles,
  History,
  Leaf,
  Zap
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import CameraCapture from './CameraCapture';
import PrescriptionModal from './PrescriptionModal';
import { useLanguage } from '../context/LanguageContext';
import { sampleDiseases, samplePresetLeaves } from '../i18n/translations';

export default function AIAnalysis() {
  const { t, lang, speakText, stopSpeech, isSpeaking } = useLanguage();
  const [activeTab, setActiveTab] = useState('camera'); // 'camera' | 'upload' | 'presets'
  const [showCameraModal, setShowCameraModal] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [diagnosisResult, setDiagnosisResult] = useState(null);
  const [showPrescriptionModal, setShowPrescriptionModal] = useState(false);
  const [scanHistory, setScanHistory] = useState([
    {
      date: "Today, 11:30 AM",
      crop: lang === 'hi' ? "गेहूं (Wheat)" : "Wheat (Kundan)",
      disease: sampleDiseases[0],
      thumb: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=150&auto=format&fit=crop&q=60"
    }
  ]);

  const runAnalysisPipeline = (imgUrl, specificDisease = null) => {
    setImagePreview(imgUrl);
    setShowCameraModal(false);
    setIsAnalyzing(true);
    setDiagnosisResult(null);
    setCurrentStepIndex(0);

    const stepInterval = setInterval(() => {
      setCurrentStepIndex(prev => {
        if (prev < t.aiDoctor.steps.length - 1) {
          return prev + 1;
        } else {
          clearInterval(stepInterval);
          return prev;
        }
      });
    }, 700);

    setTimeout(() => {
      clearInterval(stepInterval);
      setIsAnalyzing(false);

      const selected = specificDisease || sampleDiseases[Math.floor(Math.random() * sampleDiseases.length)];
      setDiagnosisResult(selected);

      setScanHistory(prev => [
        {
          date: lang === 'hi' ? "अभी-अभी" : "Just now",
          crop: lang === 'hi' ? "ताज़ा स्कैन" : "Fresh Scan",
          disease: selected,
          thumb: imgUrl
        },
        ...prev.slice(0, 4)
      ]);

      const speechSummary = lang === 'hi'
        ? `रोग की पहचान: ${selected.nameHi}। गंभीरता: ${selected.severityHi}। जैविक उपाय: ${selected.organicHi}।`
        : `Detected Pathogen: ${selected.nameEn}. Severity is ${selected.severityEn}. Organic solution: ${selected.organicEn}.`;
      speakText(speechSummary);
    }, 3200);
  };

  const handleFileUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const objectUrl = URL.createObjectURL(file);
      runAnalysisPipeline(objectUrl);
    }
  };

  const resetScanner = () => {
    stopSpeech();
    setImagePreview(null);
    setDiagnosisResult(null);
    setIsAnalyzing(false);
  };

  const handleToggleVoice = () => {
    if (isSpeaking) {
      stopSpeech();
    } else if (diagnosisResult) {
      const text = lang === 'hi'
        ? `${diagnosisResult.nameHi}। जैविक उपाय: ${diagnosisResult.organicHi}। रासायनिक दवा: ${diagnosisResult.chemicalHi}`
        : `${diagnosisResult.nameEn}. Organic cure: ${diagnosisResult.organicEn}. Chemical spray: ${diagnosisResult.chemicalEn}`;
      speakText(text);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {showPrescriptionModal && (
        <PrescriptionModal
          diagnosis={diagnosisResult}
          onClose={() => setShowPrescriptionModal(false)}
        />
      )}

      <motion.div 
        className="glass-panel"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        style={{
          border: '1px solid rgba(46, 204, 113, 0.25)',
          background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.08) 0%, rgba(5, 10, 5, 0.7) 100%)',
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.25rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <span className="badge-glow" style={{ background: 'rgba(46,204,113,0.2)', color: '#2ecc71', padding: '4px 10px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: '700' }}>
                <Sparkles size={12} style={{ display: 'inline', marginRight: 4 }} />
                VISION NEURAL 4.0
              </span>
            </div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '800', marginTop: '0.4rem', color: '#fff' }}>
              {t.aiDoctor.title}
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.2rem' }}>
              {t.aiDoctor.subtitle}
            </p>
          </div>

          {/* Mode Switcher Tabs */}
          {!imagePreview && !showCameraModal && (
            <div style={{
              display: 'flex',
              background: 'rgba(0,0,0,0.5)',
              padding: '4px',
              borderRadius: '12px',
              border: '1px solid var(--glass-border)',
              gap: '4px',
              flexWrap: 'wrap',
            }}>
              <button
                onClick={() => setActiveTab('camera')}
                style={{
                  padding: '8px 14px',
                  borderRadius: '8px',
                  border: 'none',
                  background: activeTab === 'camera' ? 'var(--accent-green)' : 'transparent',
                  color: activeTab === 'camera' ? '#000' : 'var(--text-muted)',
                  fontWeight: '700',
                  fontSize: '0.85rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                <Camera size={16} />
                {t.aiDoctor.tabCamera}
              </button>
              <button
                onClick={() => setActiveTab('upload')}
                style={{
                  padding: '8px 14px',
                  borderRadius: '8px',
                  border: 'none',
                  background: activeTab === 'upload' ? 'var(--accent-green)' : 'transparent',
                  color: activeTab === 'upload' ? '#000' : 'var(--text-muted)',
                  fontWeight: '700',
                  fontSize: '0.85rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                <Upload size={16} />
                {t.aiDoctor.tabUpload}
              </button>
              <button
                onClick={() => setActiveTab('presets')}
                style={{
                  padding: '8px 14px',
                  borderRadius: '8px',
                  border: 'none',
                  background: activeTab === 'presets' ? '#f59e0b' : 'transparent',
                  color: activeTab === 'presets' ? '#000' : 'var(--text-muted)',
                  fontWeight: '700',
                  fontSize: '0.85rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                <Zap size={16} />
                {t.aiDoctor.tabPreset}
              </button>
            </div>
          )}
        </div>

        {/* Camera Modal / Stream View */}
        {showCameraModal && (
          <CameraCapture 
            onCapture={(img) => runAnalysisPipeline(img)}
            onClose={() => setShowCameraModal(false)}
          />
        )}

        {/* Initial Input Zone */}
        {!imagePreview && !showCameraModal && (
          <div>
            {activeTab === 'camera' && (
              <motion.div
                whileHover={{ scale: 1.01 }}
                onClick={() => setShowCameraModal(true)}
                style={{
                  border: '2px dashed rgba(46,204,113,0.5)',
                  borderRadius: '16px',
                  padding: '3rem 1.5rem',
                  textAlign: 'center',
                  cursor: 'pointer',
                  background: 'rgba(46,204,113,0.03)',
                  transition: 'all 0.3s ease',
                }}
              >
                <div style={{
                  width: 70,
                  height: 70,
                  borderRadius: '50%',
                  background: 'rgba(46,204,113,0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1rem',
                  border: '1px solid rgba(46,204,113,0.4)',
                  boxShadow: '0 0 20px rgba(46,204,113,0.25)',
                }}>
                  <Camera size={32} color="#2ecc71" />
                </div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: '700', color: '#fff', marginBottom: '0.4rem' }}>
                  {t.aiDoctor.takePhoto}
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', maxWidth: '400px', margin: '0 auto' }}>
                  {t.aiDoctor.cameraInstruction}
                </p>
                <button
                  style={{
                    marginTop: '1.25rem',
                    background: 'linear-gradient(135deg, #2ecc71, #27ae60)',
                    color: '#000',
                    border: 'none',
                    padding: '0.65rem 1.5rem',
                    borderRadius: '30px',
                    fontWeight: '700',
                    fontSize: '0.9rem',
                    cursor: 'pointer',
                  }}
                >
                  🚀 {lang === 'hi' ? "कैमरा चालू करें" : "Launch Live Camera"}
                </button>
              </motion.div>
            )}

            {activeTab === 'upload' && (
              <motion.div
                whileHover={{ scale: 1.01 }}
                onClick={() => document.getElementById('crop-file-input').click()}
                style={{
                  border: '2px dashed var(--glass-border)',
                  borderRadius: '16px',
                  padding: '3rem 1.5rem',
                  textAlign: 'center',
                  cursor: 'pointer',
                  background: 'rgba(255,255,255,0.02)',
                  transition: 'all 0.3s ease',
                }}
              >
                <Upload size={40} color="#a8e6cf" style={{ margin: '0 auto 1rem', opacity: 0.8 }} />
                <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#fff', marginBottom: '0.4rem' }}>
                  {t.aiDoctor.dragDrop}
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                  {t.aiDoctor.supportedFormats}
                </p>
                <input
                  type="file"
                  id="crop-file-input"
                  hidden
                  accept="image/*"
                  onChange={handleFileUpload}
                />
              </motion.div>
            )}

            {activeTab === 'presets' && (
              <div style={{ padding: '0.5rem 0' }}>
                <p style={{ fontSize: '0.88rem', color: '#a8e6cf', marginBottom: '1rem' }}>
                  {t.aiDoctor.selectSamplePrompt}
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
                  {samplePresetLeaves.map((sample) => (
                    <motion.div
                      key={sample.id}
                      whileHover={{ scale: 1.03, borderColor: '#10b981' }}
                      onClick={() => runAnalysisPipeline(sample.imgUrl, sampleDiseases[sample.diseaseIndex])}
                      style={{
                        background: 'rgba(255,255,255,0.03)',
                        border: '1px solid var(--glass-border)',
                        borderRadius: '14px',
                        overflow: 'hidden',
                        cursor: 'pointer',
                      }}
                    >
                      <img 
                        src={sample.imgUrl} 
                        alt={sample.labelEn} 
                        style={{ width: '100%', height: '130px', objectFit: 'cover' }} 
                      />
                      <div style={{ padding: '0.75rem', background: 'rgba(0,0,0,0.5)' }}>
                        <p style={{ fontWeight: '700', fontSize: '0.88rem', color: '#fff', margin: 0 }}>
                          {lang === 'hi' ? sample.labelHi : sample.labelEn}
                        </p>
                        <span style={{ fontSize: '0.72rem', color: '#2ecc71', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}>
                          ⚡ Click to Analyze Now
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Live Image Scanning View */}
        {imagePreview && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{
              position: 'relative',
              borderRadius: '16px',
              overflow: 'hidden',
              maxHeight: '380px',
              background: '#000',
              border: '1px solid rgba(46,204,113,0.3)',
              boxShadow: '0 15px 40px rgba(0,0,0,0.5)',
            }}>
              <img
                src={imagePreview}
                alt="Captured Crop"
                style={{ width: '100%', height: '350px', objectFit: 'cover' }}
              />

              {/* Laser Scanning Animation */}
              {isAnalyzing && (
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'rgba(0,0,0,0.55)',
                  backdropFilter: 'blur(3px)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '1rem',
                  padding: '1rem',
                }}>
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '4px',
                    background: 'linear-gradient(90deg, transparent, #2ecc71, #fff, #2ecc71, transparent)',
                    boxShadow: '0 0 25px #2ecc71',
                    animation: 'laserScan 2s ease-in-out infinite',
                  }} />

                  <div style={{
                    background: 'rgba(0,0,0,0.8)',
                    border: '1px solid rgba(46,204,113,0.5)',
                    padding: '1.25rem 2rem',
                    borderRadius: '16px',
                    textAlign: 'center',
                    maxWidth: '420px',
                    boxShadow: '0 0 30px rgba(46,204,113,0.2)',
                  }}>
                    <ScanLine size={36} color="#2ecc71" className="spin-icon" style={{ margin: '0 auto 0.5rem' }} />
                    <p style={{ color: '#2ecc71', fontWeight: '800', fontSize: '0.95rem', letterSpacing: '1px' }}>
                      {t.aiDoctor.analyzingTitle}
                    </p>
                    <p style={{ color: '#fff', fontSize: '0.9rem', marginTop: '0.5rem', fontWeight: '600' }}>
                      {t.aiDoctor.steps[currentStepIndex]}
                    </p>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '6px', marginTop: '0.75rem' }}>
                      {t.aiDoctor.steps.map((_, i) => (
                        <span
                          key={i}
                          style={{
                            width: 10,
                            height: 6,
                            borderRadius: '4px',
                            background: i <= currentStepIndex ? '#2ecc71' : 'rgba(255,255,255,0.2)',
                            transition: 'all 0.3s ease',
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Diagnostic Report Card */}
            <AnimatePresence>
              {diagnosisResult && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  style={{
                    background: 'rgba(10, 25, 15, 0.9)',
                    border: '1px solid rgba(46,204,113,0.4)',
                    borderRadius: '16px',
                    padding: '1.75rem',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.6)',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', paddingBottom: '1.25rem', borderBottom: '1px solid var(--glass-border)' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        {diagnosisResult.severityLevel === 'danger' ? (
                          <ShieldAlert size={24} color="#e74c3c" />
                        ) : diagnosisResult.severityLevel === 'warning' ? (
                          <AlertTriangle size={24} color="#f1c40f" />
                        ) : (
                          <CheckCircle2 size={24} color="#2ecc71" />
                        )}
                        <h3 style={{ fontSize: '1.4rem', fontWeight: '800', color: '#fff', margin: 0 }}>
                          {lang === 'hi' ? diagnosisResult.nameHi : diagnosisResult.nameEn}
                        </h3>
                      </div>
                      <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '0.25rem' }}>
                        {lang === 'hi' ? diagnosisResult.nameEn : diagnosisResult.nameHi}
                      </p>
                    </div>

                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
                      <button
                        onClick={handleToggleVoice}
                        style={{
                          background: isSpeaking ? '#e74c3c' : 'rgba(46,204,113,0.2)',
                          color: isSpeaking ? '#fff' : '#2ecc71',
                          border: '1px solid rgba(46,204,113,0.4)',
                          padding: '8px 14px',
                          borderRadius: '20px',
                          fontSize: '0.85rem',
                          fontWeight: '700',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          cursor: 'pointer',
                        }}
                      >
                        {isSpeaking ? <VolumeX size={16} /> : <Volume2 size={16} />}
                        {isSpeaking ? t.aiDoctor.stopVoice : t.aiDoctor.listenVoice}
                      </button>

                      <button
                        onClick={() => setShowPrescriptionModal(true)}
                        style={{
                          background: 'linear-gradient(135deg, #10b981, #059669)',
                          color: '#000',
                          border: 'none',
                          padding: '8px 14px',
                          borderRadius: '20px',
                          fontSize: '0.85rem',
                          fontWeight: '800',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          cursor: 'pointer',
                        }}
                      >
                        <Printer size={16} />
                        {t.aiDoctor.downloadReport}
                      </button>

                      <button
                        onClick={resetScanner}
                        style={{
                          background: 'rgba(255,255,255,0.08)',
                          color: '#fff',
                          border: '1px solid rgba(255,255,255,0.15)',
                          padding: '8px 14px',
                          borderRadius: '20px',
                          fontSize: '0.85rem',
                          fontWeight: '600',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          cursor: 'pointer',
                        }}
                      >
                        <RotateCcw size={16} />
                        {t.aiDoctor.scanAnother}
                      </button>
                    </div>
                  </div>

                  {/* Metrics Row */}
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                    gap: '1rem',
                    margin: '1.25rem 0',
                  }}>
                    <div style={{ background: 'rgba(255,255,255,0.03)', padding: '0.9rem', borderRadius: '12px', border: '1px solid var(--glass-border)' }}>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{t.aiDoctor.confidence}</span>
                      <p style={{ fontSize: '1.3rem', fontWeight: '800', color: '#2ecc71', margin: '0.2rem 0 0' }}>{diagnosisResult.confidence}</p>
                    </div>

                    <div style={{ background: 'rgba(255,255,255,0.03)', padding: '0.9rem', borderRadius: '12px', border: '1px solid var(--glass-border)' }}>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{t.aiDoctor.severity}</span>
                      <p style={{ 
                        fontSize: '1.1rem', 
                        fontWeight: '700', 
                        color: diagnosisResult.severityLevel === 'danger' ? '#e74c3c' : diagnosisResult.severityLevel === 'warning' ? '#f1c40f' : '#2ecc71',
                        margin: '0.2rem 0 0' 
                      }}>
                        {lang === 'hi' ? diagnosisResult.severityHi : diagnosisResult.severityEn}
                      </p>
                    </div>

                    <div style={{ background: 'rgba(255,255,255,0.03)', padding: '0.9rem', borderRadius: '12px', border: '1px solid var(--glass-border)' }}>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{t.aiDoctor.affectedArea}</span>
                      <p style={{ fontSize: '1.3rem', fontWeight: '800', color: '#a8e6cf', margin: '0.2rem 0 0' }}>{diagnosisResult.affectedArea}</p>
                    </div>
                  </div>

                  {/* Solutions */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div style={{
                      background: 'rgba(46, 204, 113, 0.08)',
                      border: '1px solid rgba(46, 204, 113, 0.25)',
                      borderRadius: '12px',
                      padding: '1.1rem',
                    }}>
                      <h4 style={{ color: '#2ecc71', fontSize: '0.95rem', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
                        <Leaf size={18} />
                        {t.aiDoctor.organicTreatment}
                      </h4>
                      <p style={{ color: '#e0e0e0', fontSize: '0.9rem', lineHeight: 1.5, margin: 0 }}>
                        {lang === 'hi' ? diagnosisResult.organicHi : diagnosisResult.organicEn}
                      </p>
                    </div>

                    <div style={{
                      background: 'rgba(52, 152, 219, 0.08)',
                      border: '1px solid rgba(52, 152, 219, 0.25)',
                      borderRadius: '12px',
                      padding: '1.1rem',
                    }}>
                      <h4 style={{ color: '#3498db', fontSize: '0.95rem', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
                        🧪 {t.aiDoctor.chemicalTreatment}
                      </h4>
                      <p style={{ color: '#e0e0e0', fontSize: '0.9rem', lineHeight: 1.5, margin: 0 }}>
                        {lang === 'hi' ? diagnosisResult.chemicalHi : diagnosisResult.chemicalEn}
                      </p>
                    </div>

                    <div style={{
                      background: 'rgba(241, 196, 15, 0.08)',
                      border: '1px solid rgba(241, 196, 15, 0.25)',
                      borderRadius: '12px',
                      padding: '1.1rem',
                    }}>
                      <h4 style={{ color: '#f1c40f', fontSize: '0.95rem', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
                        {t.aiDoctor.preventiveTips}
                      </h4>
                      <p style={{ color: '#e0e0e0', fontSize: '0.9rem', lineHeight: 1.5, margin: 0 }}>
                        {lang === 'hi' ? diagnosisResult.preventiveHi : diagnosisResult.preventiveEn}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </motion.div>

      {/* Recent Scan History Bar */}
      {scanHistory.length > 0 && (
        <div className="glass-panel" style={{ padding: '1.25rem' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
            <History size={16} color="var(--accent-green)" />
            {t.aiDoctor.historyTitle}
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '0.75rem' }}>
            {scanHistory.map((item, idx) => (
              <div 
                key={idx}
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid var(--glass-border)',
                  borderRadius: '10px',
                  padding: '0.6rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                }}
              >
                <img 
                  src={item.thumb} 
                  alt="Thumb" 
                  style={{ width: 42, height: 42, borderRadius: '8px', objectFit: 'cover' }} 
                />
                <div style={{ overflow: 'hidden' }}>
                  <p style={{ fontSize: '0.85rem', fontWeight: '700', margin: 0, whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                    {lang === 'hi' ? item.disease.nameHi : item.disease.nameEn}
                  </p>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: 0 }}>
                    {item.date}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
