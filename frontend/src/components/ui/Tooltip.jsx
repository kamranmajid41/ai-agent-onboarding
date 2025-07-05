import React, { useState, useRef, useLayoutEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';

const Tooltip = ({ text, children, className = '', ...props }) => {
  const [visible, setVisible] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0, width: 0 });
  const triggerRef = useRef(null);

  const updatePosition = useCallback(() => {
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setCoords({
        top: rect.bottom + window.scrollY + 8, // 8px gap
        left: rect.left + window.scrollX + rect.width / 2,
        width: rect.width
      });
    }
  }, []);

  useLayoutEffect(() => {
    if (visible) {
      updatePosition();
      window.addEventListener('scroll', updatePosition, true);
      window.addEventListener('resize', updatePosition);
      return () => {
        window.removeEventListener('scroll', updatePosition, true);
        window.removeEventListener('resize', updatePosition);
      };
    }
  }, [visible, updatePosition]);

  return (
    <span
      ref={triggerRef}
      className={`relative inline-flex items-center ${className}`}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onFocus={() => setVisible(true)}
      onBlur={() => setVisible(false)}
      tabIndex={0}
      {...props}
    >
      {children}
      {visible && typeof window !== 'undefined' && createPortal(
        <span
          className="z-[9999] fixed px-3 py-2 rounded bg-gray-900 text-gray-100 text-xs shadow-lg whitespace-pre-line min-w-max max-w-xs"
          style={{
            top: coords.top,
            left: coords.left,
            transform: 'translateX(-50%)',
            pointerEvents: 'none',
          }}
        >
          {text}
          <span className="absolute left-1/2 -translate-x-1/2 -top-2 w-3 h-3 bg-gray-900 rotate-45"></span>
        </span>,
        document.body
      )}
    </span>
  );
};

export default Tooltip; 