import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Activity, Sparkles, Volume2, CornerDownRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

export default function VoiceInput({ onCommandNavigate }) {
  const { t, lang, speakText, isSpeaking, stopSpeech } = useLanguage();
  const [isListening, setIsListening] = useState(false);
  const [userSpeech, setUserSpeech] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const recognitionRef = useRef(null);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = lang === 'hi' ? 'hi-IN' : 'en-IN';

      recognition.onstart = () => {
        setIsListening(true);
        setUserSpeech('');
        setAiResponse('');
      };

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setUserSpeech(transcript);
        handleProcessVoiceCommand(transcript);
      };

      recognition.onerror = (event) => {
        console.error("Speech Recognition Error:", event.error);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }
  }, [lang]);

  const handleProcessVoiceCommand = (query) => {
    const q = query.toLowerCase();
    let reply = "";

    if (q.includes("mandi") || q.includes("भाव") || q.includes("rate") || q.includes("wheat") || q.includes("गेहूं")) {
      reply = lang === 'hi' 
        ? "आज खन्ना मंडी में शरबती गेहूं का मॉडल भाव ₹2,540 प्रति क्विंटल है, जिसमें ₹45 की तेजी है।" 
        : "Today's Wheat model price in Khanna Mandi is ₹2,540 per Quintal with +₹45 upward trend.";
      if (onCommandNavigate) onCommandNavigate('mandiPrices');
    } else if (q.includes("weather") || q.includes("मौसम") || q.includes("बारिश") || q.includes("rain")) {
      reply = lang === 'hi'
        ? "लुधियाना में आज तापमान 27 डिग्री है, और 35 प्रतिशत हल्की बारिश की संभावना है। ड्रिप सिंचाई टालने की सलाह है।"
        : "Current temperature is 27°C with 35% chance of light rain. Delay heavy irrigation.";
      if (onCommandNavigate) onCommandNavigate('weather');
    } else if (q.includes("disease") || q.includes("रोग") || q.includes("पत्ता") || q.includes("doctor") || q.includes("जांच")) {
      reply = lang === 'hi'
        ? "फसल डॉक्टर स्कैनर तैयार है। कृपया रोगग्रस्त पत्ते की फोटो खींचें या अपलोड करें।"
        : "AI Crop Doctor is ready. Please capture or upload the infected leaf image.";
      if (onCommandNavigate) onCommandNavigate('cropDoctor');
    } else if (q.includes("rust") || q.includes("रतुआ") || q.includes("पीला")) {
      reply = lang === 'hi'
        ? "पीले रतुआ के लिए प्रोपिकोनाज़ोल 25% EC (200 मिली प्रति एकड़) या खट्टी छाछ और गोमूत्र का छिड़काव करें।"
        : "For Yellow Rust, spray Propiconazole 25% EC @ 200ml per acre in 200L water.";
      if (onCommandNavigate) onCommandNavigate('pestRadar');
    } else {
      reply = lang === 'hi'
        ? `मैंने सुना: "${query}"। आप फसल रोग, मंडी भाव या मौसम की जानकारी पूछ सकते हैं।`
        : `I heard: "${query}". You can ask about crop diseases, mandi rates, or weather alerts.`;
    }

    setAiResponse(reply);
    speakText(reply);
  };

  const toggleListening = () => {
    if (isListening) {
      if (recognitionRef.current) recognitionRef.current.stop();
      setIsListening(false);
    } else {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.lang = lang === 'hi' ? 'hi-IN' : 'en-IN';
          recognitionRef.current.start();
        } catch (e) {
          console.error(e);
        }
      } else {
        // Fallback simulation if speech recognition is not supported in current browser
        setIsListening(true);
        setUserSpeech(lang === 'hi' ? "आज गेहूं का भाव क्या है?" : "What is today's wheat mandi rate?");
        setTimeout(() => {
          setIsListening(false);
          handleProcessVoiceCommand(lang === 'hi' ? "गेहूं का भाव" : "wheat rate");
        }, 2000);
      }
    }
  };

  const handleSuggestionClick = (text) => {
    setUserSpeech(text);
    handleProcessVoiceCommand(text);
  };

  return (
    <motion.div 
      className="glass-panel"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.35 }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        padding: '1.75rem 1.25rem',
        background: 'linear-gradient(135deg, rgba(46,204,113,0.06), rgba(5,10,5,0.7))',
        border: '1px solid rgba(46,204,113,0.25)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '0.25rem' }}>
        <Sparkles size={16} color="var(--accent-green)" />
        <h3 style={{ fontSize: '1.15rem', fontWeight: '800', margin: 0, color: '#fff' }}>
          {t.voice.title}
        </h3>
      </div>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: '1.25rem' }}>
        {t.voice.subtitle}
      </p>

      {/* Pulsating Voice Mic Button */}
      <div style={{ position: 'relative', margin: '0.5rem 0 1.25rem' }}>
        <AnimatePresence>
          {isListening && (
            <>
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 2.2, opacity: 0 }}
                transition={{ repeat: Infinity, duration: 1.4, ease: 'easeOut' }}
                style={{ position: 'absolute', inset: 0, background: '#2ecc71', borderRadius: '50%', zIndex: 0 }}
              />
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 2.8, opacity: 0 }}
                transition={{ repeat: Infinity, duration: 1.4, delay: 0.35, ease: 'easeOut' }}
                style={{ position: 'absolute', inset: 0, background: '#2ecc71', borderRadius: '50%', zIndex: 0 }}
              />
            </>
          )}
        </AnimatePresence>

        <motion.button
          onClick={toggleListening}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          style={{
            width: 76,
            height: 76,
            borderRadius: '50%',
            background: isListening 
              ? 'linear-gradient(135deg, #e74c3c, #c0392b)' 
              : 'linear-gradient(135deg, #2ecc71, #27ae60)',
            border: '3px solid rgba(255,255,255,0.4)',
            color: '#000',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            position: 'relative',
            zIndex: 2,
            boxShadow: isListening 
              ? '0 0 30px rgba(231,76,60,0.6)' 
              : '0 0 25px rgba(46,204,113,0.5)',
          }}
        >
          {isListening ? <Activity size={32} color="#fff" /> : <Mic size={32} color="#000" />}
        </motion.button>
      </div>

      {/* Status Message */}
      <span style={{
        fontSize: '0.85rem',
        fontWeight: '700',
        color: isListening ? '#e74c3c' : 'var(--accent-light)',
        marginBottom: '0.75rem',
      }}>
        {isListening ? t.voice.listening : t.voice.tapToSpeak}
      </span>

      {/* Transcript & AI Response Display */}
      {(userSpeech || aiResponse) && (
        <div style={{
          width: '100%',
          background: 'rgba(0,0,0,0.4)',
          border: '1px solid var(--glass-border)',
          borderRadius: '12px',
          padding: '0.85rem',
          textAlign: 'left',
          marginBottom: '1rem',
        }}>
          {userSpeech && (
            <p style={{ fontSize: '0.82rem', color: '#a8e6cf', margin: '0 0 0.4rem 0' }}>
              <strong>🗣️ {lang === 'hi' ? "आपने पूछा:" : "You said:"} </strong> "{userSpeech}"
            </p>
          )}
          {aiResponse && (
            <p style={{ fontSize: '0.85rem', color: '#ffffff', margin: 0, lineHeight: 1.4 }}>
              <strong>🤖 {lang === 'hi' ? "उत्तर:" : "AgriOS:"} </strong> {aiResponse}
            </p>
          )}
        </div>
      )}

      {/* Suggestion Prompts */}
      <div style={{ width: '100%', textAlign: 'left' }}>
        <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.4rem' }}>
          💡 {lang === 'hi' ? "सुझाए गए प्रश्न (क्लिक करें):" : "Try Asking (Click to test):"}
        </span>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
          {t.voice.suggestions.map((suggestion, i) => (
            <button
              key={i}
              onClick={() => handleSuggestionClick(suggestion)}
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid var(--glass-border)',
                borderRadius: '8px',
                padding: '6px 10px',
                color: '#e0e0e0',
                fontSize: '0.75rem',
                textAlign: 'left',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'background 0.2s ease',
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(46,204,113,0.1)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.03)'}
            >
              <CornerDownRight size={12} color="var(--accent-green)" />
              {suggestion}
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
