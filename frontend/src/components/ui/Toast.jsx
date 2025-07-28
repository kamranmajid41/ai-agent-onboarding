import React, { useEffect } from 'react';
import { AiOutlineCheckCircle, AiOutlineInfoCircle, AiOutlineWarning, AiOutlineClose } from 'react-icons/ai';

const Toast = ({ 
  message, 
  type = 'info',
  duration = 5000,
  onClose,
  className = '',
  ...props 
}) => {
  useEffect(() => {
    if (duration && onClose) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const baseClasses = 'fixed top-4 left-1/2 transform -translate-x-1/2 z-50 flex items-center gap-3 px-6 py-3 rounded-lg shadow-lg max-w-sm';
  
  const types = {
    success: 'bg-success-100 text-success-900',
    error: 'bg-error-100 text-error-900',
    warning: 'bg-warning-100 text-warning-900',
    info: 'bg-primary-100 text-primary-900'
  };
  
  const icons = {
    success: AiOutlineCheckCircle,
    error: AiOutlineWarning,
    warning: AiOutlineWarning,
    info: AiOutlineInfoCircle
  };
  
  const Icon = icons[type];
  const classes = `${baseClasses} ${types[type]} ${className}`;
  
  return (
    <div className={classes} {...props}>
      <Icon className="h-5 w-5 flex-shrink-0" />
      <span className="flex-1">{message}</span>
      {onClose && (
        <button
          onClick={onClose}
          className="flex-shrink-0 hover:opacity-80 transition-opacity"
        >
          <AiOutlineClose className="h-4 w-4" />
        </button>
      )}
    </div>
  );
};

export default Toast; 