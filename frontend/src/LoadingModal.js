import React from 'react';

const LoadingModal = () => {
  return (
    <>
      <style>{`
        .loading-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(255, 255, 255, 0.7);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 9999;
        }
        .spinner {
          width: 60px;
          height: 60px;
          border: 6px solid #ddd;
          border-top-color: #3498db;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
      <div className="loading-modal-overlay">
        <div className="spinner" />
      </div>
    </>
  );
};

export default LoadingModal;
