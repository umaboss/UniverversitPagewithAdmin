import React, { createContext, useContext, useState } from 'react';

const SonnerContext = createContext();

export const useSonner = () => {
  const context = useContext(SonnerContext);
  if (!context) {
    throw new Error('useSonner must be used within a SonnerProvider');
  }
  return context;
};

export const Toaster = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const toast = (message, options = {}) => {
    const id = Date.now();
    const newToast = { 
      id, 
      message, 
      type: options.type || 'default',
      duration: options.duration || 4000
    };
    setToasts(prev => [...prev, newToast]);
    
    // Auto remove after duration
    setTimeout(() => {
      setToasts(prev => prev.filter(toast => toast.id !== id));
    }, newToast.duration);
  };

  const dismiss = (id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  return (
    <SonnerContext.Provider value={{ toast, dismiss }}>
      {children}
      <div className="fixed bottom-4 right-4 z-50 space-y-2">
        {toasts.map(toast => (
          <div
            key={toast.id}
            className={`px-4 py-3 rounded-lg shadow-xl text-white min-w-[300px] transform transition-all duration-300 ${
              toast.type === 'success' ? 'bg-emerald-600' :
              toast.type === 'error' ? 'bg-red-600' :
              toast.type === 'warning' ? 'bg-amber-600' :
              'bg-slate-800'
            }`}
          >
            <div className="flex items-center justify-between">
              <span>{toast.message}</span>
              <button
                onClick={() => dismiss(toast.id)}
                className="ml-4 text-white/70 hover:text-white"
              >
                ×
              </button>
            </div>
          </div>
        ))}
      </div>
    </SonnerContext.Provider>
  );
}; 