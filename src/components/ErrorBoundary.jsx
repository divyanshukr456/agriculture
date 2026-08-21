import React from 'react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }
      return (
        <div style={{
          padding: '2rem',
          textAlign: 'center',
          background: 'rgba(231,76,60,0.1)',
          border: '1px solid #e74c3c',
          borderRadius: '16px',
          margin: '1rem auto',
          maxWidth: '600px',
          color: '#fff',
        }}>
          <h3 style={{ color: '#e74c3c', margin: '0 0 0.5rem' }}>Something went wrong</h3>
          <p style={{ color: '#ccc', fontSize: '0.85rem' }}>{this.state.error?.message || 'Component failed to render.'}</p>
          <button
            onClick={() => this.setState({ hasError: false })}
            style={{
              marginTop: '1rem',
              background: '#10b981',
              color: '#000',
              border: 'none',
              padding: '6px 14px',
              borderRadius: '8px',
              fontWeight: '700',
              cursor: 'pointer',
            }}
          >
            Retry Component
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
