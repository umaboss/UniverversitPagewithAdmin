import React, { createContext, useContext, useState } from 'react';

const TooltipContext = createContext();

export const useTooltip = () => {
  const context = useContext(TooltipContext);
  if (!context) {
    throw new Error('useTooltip must be used within a TooltipProvider');
  }
  return context;
};

export const TooltipProvider = ({ children }) => {
  const [tooltip, setTooltip] = useState({
    content: '',
    visible: false,
    x: 0,
    y: 0
  });

  const showTooltip = (content, x, y) => {
    setTooltip({ content, visible: true, x, y });
  };

  const hideTooltip = () => {
    setTooltip(prev => ({ ...prev, visible: false }));
  };

  return (
    <TooltipContext.Provider value={{ showTooltip, hideTooltip }}>
      {children}
      {tooltip.visible && (
        <div
          className="fixed z-50 px-2 py-1 text-sm text-white bg-gray-900 rounded shadow-lg pointer-events-none"
          style={{
            left: tooltip.x + 10,
            top: tooltip.y - 10
          }}
        >
          {tooltip.content}
        </div>
      )}
    </TooltipContext.Provider>
  );
}; 