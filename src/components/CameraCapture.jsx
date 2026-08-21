import React, { useRef, useState, useEffect } from 'react';
import { Camera, RefreshCw, Zap, X, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

export default function CameraCapture({ onCapture, onClose }) {
  const { t, lang } = useLanguage();
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [facingMode, setFacingMode] = useState('environment'); // Default to rear camera on phones
  const [flashActive, setFlashActive] = useState(false);
  const [error, setError] = useState(null);
  const [isInitializing, setIsInitializing] = useState(true);

  const startCamera = async (mode) => {
    setIsInitializing(true);
    setError(null);

    // Stop existing stream if any
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }

    try {
      const constraints = {
        video: {
          facingMode: mode,
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
        audio: false,
      };

      const mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
      setIsInitializing(false);
    } catch (err) {
      console.error("Camera access error:", err);
      setError(
        lang === 'hi'
          ? "कैमरा खोलने में असमर्थ। कृपया ब्राउज़र में कैमरा अनुमति (Permission) दें या फ़ोटो अपलोड विकल्प का उपयोग करें।"
          : "Unable to access camera. Please allow camera permissions in your browser or use the file upload option."
      );
      setIsInitializing(false);
    }
  };

  useEffect(() => {
    startCamera(facingMode);
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [facingMode]);

  const toggleCamera = () => {
    setFacingMode(prev => (prev === 'environment' ? 'user' : 'environment'));
  };

  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;

    // Trigger flash animation
    setFlashActive(true);
    setTimeout(() => setFlashActive(false), 200);

    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;

    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const imageDataUrl = canvas.toDataURL('image/jpeg', 0.92);

    // Stop stream and send photo to parent
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }
    onCapture(imageDataUrl);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="camera-modal-container"
      style={{
        position: 'relative',
        borderRadius: '16px',
        overflow: 'hidden',
        background: '#000',
        border: '1px solid var(--glass-border)',
        boxShadow: '0 20px 50px rgba(0,0,0,0.6)',
      }}
    >
      {/* Top action bar */}
      <div style={{
        position: 'absolute',
        top: 12,
        left: 12,
        right: 12,
        zIndex: 20,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <div style={{
          background: 'rgba(0,0,0,0.6)',
          backdropFilter: 'blur(8px)',
          padding: '6px 12px',
          borderRadius: '20px',
          fontSize: '0.8rem',
          color: '#a8e6cf',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          border: '1px solid rgba(46,204,113,0.3)',
        }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#2ecc71', display: 'inline-block', animation: 'pulse 1.5s infinite' }} />
          {t.aiDoctor.cameraInstruction}
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={toggleCamera}
            title={t.aiDoctor.cameraFlip}
            style={{
              background: 'rgba(0,0,0,0.6)',
              border: '1px solid rgba(255,255,255,0.2)',
              color: '#fff',
              width: 36,
              height: 36,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
          >
            <RefreshCw size={16} />
          </button>
          {onClose && (
            <button
              onClick={onClose}
              style={{
                background: 'rgba(231,76,60,0.7)',
                border: 'none',
                color: '#fff',
                width: 36,
                height: 36,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              <X size={18} />
            </button>
          )}
        </div>
      </div>

      {/* Flash Overlay */}
      {flashActive && (
        <div style={{
          position: 'absolute',
          inset: 0,
          background: '#fff',
          zIndex: 30,
          opacity: 0.9,
          transition: 'opacity 0.2s ease',
        }} />
      )}

      {/* Video Element */}
      <div style={{ position: 'relative', width: '100%', minHeight: '340px', maxHeight: '450px', background: '#050a05', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {error ? (
          <div style={{ padding: '2rem', textAlign: 'center', color: '#ff7675' }}>
            <AlertCircle size={40} style={{ margin: '0 auto 1rem', opacity: 0.8 }} />
            <p style={{ fontSize: '0.9rem', lineHeight: 1.5 }}>{error}</p>
          </div>
        ) : (
          <>
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                maxHeight: '450px',
                display: isInitializing ? 'none' : 'block',
              }}
            />

            {/* Target Reticle / Scanner Grid */}
            {!isInitializing && (
              <div style={{
                position: 'absolute',
                inset: '15%',
                border: '2px dashed rgba(46,204,113,0.7)',
                borderRadius: '16px',
                pointerEvents: 'none',
                boxShadow: '0 0 0 9999px rgba(0,0,0,0.35)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '2px',
                  background: 'linear-gradient(90deg, transparent, #2ecc71, transparent)',
                  boxShadow: '0 0 15px #2ecc71',
                  animation: 'laserScan 2.5s ease-in-out infinite',
                }} />
              </div>
            )}

            {isInitializing && (
              <div style={{ color: 'var(--accent-green)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}>
                <RefreshCw size={28} className="spin-icon" />
                <span style={{ fontSize: '0.85rem' }}>Starting Camera Stream...</span>
              </div>
            )}
          </>
        )}
      </div>

      {/* Hidden Canvas for capture */}
      <canvas ref={canvasRef} style={{ display: 'none' }} />

      {/* Bottom Shutter Controls */}
      {!error && (
        <div style={{
          padding: '1.25rem',
          background: 'linear-gradient(to top, rgba(0,0,0,0.9), rgba(0,0,0,0.5))',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '1.5rem',
        }}>
          <motion.button
            onClick={capturePhoto}
            disabled={isInitializing}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.92 }}
            style={{
              background: 'linear-gradient(135deg, #2ecc71, #27ae60)',
              border: '4px solid rgba(255,255,255,0.3)',
              color: '#000',
              padding: '0.85rem 2rem',
              borderRadius: '40px',
              fontSize: '1rem',
              fontWeight: '700',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              cursor: isInitializing ? 'not-allowed' : 'pointer',
              boxShadow: '0 0 25px rgba(46,204,113,0.5)',
            }}
          >
            <Camera size={22} />
            {t.aiDoctor.takePhoto}
          </motion.button>
        </div>
      )}
    </motion.div>
  );
}
