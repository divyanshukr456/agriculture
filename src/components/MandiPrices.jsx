import React, { useState } from 'react';
import { Search, TrendingUp, TrendingDown, Store, Calculator, Coins, DollarSign, Sprout, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { mandiRatesData } from '../i18n/translations';

export default function MandiPrices() {
  const { t, lang } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  
  // Calculator state
  const [selectedCropIndex, setSelectedCropIndex] = useState(0);
  const [acres, setAcres] = useState(4);
  const [yieldPerAcre, setYieldPerAcre] = useState(mandiRatesData[0].defaultYield);
  const [costPerAcre, setCostPerAcre] = useState(mandiRatesData[0].defaultCost);

  const selectedCrop = mandiRatesData[selectedCropIndex];
  const totalProduction = acres * yieldPerAcre;
  const grossRevenue = totalProduction * selectedCrop.price;
  const totalCost = acres * costPerAcre;
  const netProfit = grossRevenue - totalCost;

  const handleSelectCrop = (index) => {
    setSelectedCropIndex(index);
    setYieldPerAcre(mandiRatesData[index].defaultYield);
    setCostPerAcre(mandiRatesData[index].defaultCost);
  };

  const filteredRates = mandiRatesData.filter(item => {
    const cropName = lang === 'hi' ? item.cropHi : item.cropEn;
    const marketName = lang === 'hi' ? item.marketHi : item.marketEn;
    return cropName.toLowerCase().includes(searchTerm.toLowerCase()) ||
           marketName.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Live Mandi Rates Table */}
      <motion.div 
        className="glass-panel"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#fff', margin: 0 }}>
              <Store size={24} color="var(--accent-green)" />
              {t.mandi.title}
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '0.2rem' }}>
              {t.mandi.subtitle}
            </p>
          </div>

          {/* Search Bar */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(0,0,0,0.4)',
            border: '1px solid var(--glass-border)',
            borderRadius: '12px',
            padding: '6px 12px',
            minWidth: '260px',
          }}>
            <Search size={16} color="var(--text-muted)" />
            <input
              type="text"
              placeholder={t.mandi.searchPlaceholder}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#fff',
                outline: 'none',
                fontSize: '0.85rem',
                width: '100%',
              }}
            />
          </div>
        </div>

        {/* Rates Table */}
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--glass-border)', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                <th style={{ padding: '0.75rem 1rem' }}>{t.mandi.headers.crop}</th>
                <th style={{ padding: '0.75rem 1rem' }}>{t.mandi.headers.market}</th>
                <th style={{ padding: '0.75rem 1rem' }}>{t.mandi.headers.price}</th>
                <th style={{ padding: '0.75rem 1rem' }}>{t.mandi.headers.change}</th>
                <th style={{ padding: '0.75rem 1rem' }}>{t.mandi.headers.arrival}</th>
              </tr>
            </thead>
            <tbody>
              {filteredRates.map((row, idx) => (
                <tr 
                  key={idx}
                  style={{
                    borderBottom: '1px solid rgba(255,255,255,0.03)',
                    transition: 'background 0.2s ease',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.03)'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                >
                  <td style={{ padding: '0.9rem 1rem', fontWeight: '700', color: '#fff' }}>
                    {lang === 'hi' ? row.cropHi : row.cropEn}
                  </td>
                  <td style={{ padding: '0.9rem 1rem', color: 'var(--text-muted)' }}>
                    {lang === 'hi' ? row.marketHi : row.marketEn}
                  </td>
                  <td style={{ padding: '0.9rem 1rem', fontWeight: '800', color: '#a8e6cf', fontSize: '1rem' }}>
                    ₹{row.price}
                  </td>
                  <td style={{ padding: '0.9rem 1rem' }}>
                    <span style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      padding: '3px 8px',
                      borderRadius: '8px',
                      fontSize: '0.78rem',
                      fontWeight: '700',
                      background: row.positive ? 'rgba(46,204,113,0.15)' : 'rgba(231,76,60,0.15)',
                      color: row.positive ? '#2ecc71' : '#e74c3c',
                    }}>
                      {row.positive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                      {row.change}
                    </span>
                  </td>
                  <td style={{ padding: '0.9rem 1rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                    {row.arrival}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Interactive Crop Yield & Profit Calculator */}
      <motion.div 
        className="glass-panel"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        style={{
          border: '1px solid rgba(245, 158, 11, 0.3)',
          background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.06), rgba(5, 10, 5, 0.8))',
        }}
      >
        <div style={{ marginBottom: '1.25rem' }}>
          <h3 style={{ fontSize: '1.3rem', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#f59e0b', margin: 0 }}>
            <Calculator size={22} />
            {t.mandi.calcTitle}
          </h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '0.25rem' }}>
            {t.mandi.calcSubtitle}
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
          {/* Inputs Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={{ fontSize: '0.82rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.4rem' }}>
                {lang === 'hi' ? "फसल चुनें:" : "Select Crop:"}
              </label>
              <select
                value={selectedCropIndex}
                onChange={(e) => handleSelectCrop(Number(e.target.value))}
                style={{
                  width: '100%',
                  background: 'rgba(0,0,0,0.5)',
                  border: '1px solid var(--glass-border)',
                  borderRadius: '10px',
                  padding: '8px 12px',
                  color: '#fff',
                  fontSize: '0.9rem',
                  outline: 'none',
                }}
              >
                {mandiRatesData.map((c, i) => (
                  <option key={i} value={i} style={{ background: '#111' }}>
                    {lang === 'hi' ? c.cropHi : c.cropEn} (₹{c.price}/Qtl)
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label style={{ fontSize: '0.82rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.4rem' }}>
                {t.mandi.acreLabel} ({acres} {lang === 'hi' ? "एकड़" : "Acres"})
              </label>
              <input
                type="range"
                min="1"
                max="50"
                value={acres}
                onChange={(e) => setAcres(Number(e.target.value))}
                style={{ width: '100%', accentColor: 'var(--accent-green)' }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              <div>
                <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.3rem' }}>
                  {t.mandi.yieldLabel}
                </label>
                <input
                  type="number"
                  value={yieldPerAcre}
                  onChange={(e) => setYieldPerAcre(Number(e.target.value))}
                  style={{
                    width: '100%',
                    background: 'rgba(0,0,0,0.5)',
                    border: '1px solid var(--glass-border)',
                    borderRadius: '8px',
                    padding: '6px 10px',
                    color: '#fff',
                    outline: 'none',
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.3rem' }}>
                  {t.mandi.costLabel}
                </label>
                <input
                  type="number"
                  value={costPerAcre}
                  onChange={(e) => setCostPerAcre(Number(e.target.value))}
                  style={{
                    width: '100%',
                    background: 'rgba(0,0,0,0.5)',
                    border: '1px solid var(--glass-border)',
                    borderRadius: '8px',
                    padding: '6px 10px',
                    color: '#fff',
                    outline: 'none',
                  }}
                />
              </div>
            </div>
          </div>

          {/* Results Column */}
          <div style={{
            background: 'rgba(0,0,0,0.4)',
            borderRadius: '14px',
            border: '1px solid var(--glass-border)',
            padding: '1.25rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: '1rem',
          }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{t.mandi.totalProduction}</span>
                <p style={{ fontSize: '1.2rem', fontWeight: '800', color: '#fff', margin: '0.2rem 0 0' }}>
                  {totalProduction} Qtl
                </p>
              </div>

              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{t.mandi.grossRevenue}</span>
                <p style={{ fontSize: '1.2rem', fontWeight: '800', color: '#a8e6cf', margin: '0.2rem 0 0' }}>
                  ₹{grossRevenue.toLocaleString('en-IN')}
                </p>
              </div>
            </div>

            <div style={{
              background: 'linear-gradient(135deg, rgba(16,185,129,0.2), rgba(5,150,105,0.3))',
              border: '1px solid rgba(16,185,129,0.5)',
              borderRadius: '12px',
              padding: '1rem',
              textAlign: 'center',
            }}>
              <span style={{ fontSize: '0.8rem', color: '#a7f3d0', fontWeight: '700' }}>
                {t.mandi.netProfit}
              </span>
              <h3 style={{ fontSize: '2rem', fontWeight: '900', color: '#2ecc71', margin: '0.2rem 0 0' }}>
                ₹{netProfit.toLocaleString('en-IN')}
              </h3>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
