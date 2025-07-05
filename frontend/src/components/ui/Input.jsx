import React from 'react';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import Tooltip from './Tooltip';

const Input = ({ 
  label,
  error,
  success,
  tooltip,
  icon: Icon,
  className = '',
  ...props 
}) => {
  const baseClasses = 'w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 transition-all duration-300 bg-surface-800 text-white placeholder-gray-400';
  
  const stateClasses = error 
    ? 'border-error-500 focus:ring-error-400' 
    : success 
    ? 'border-success-500 focus:ring-success-400' 
    : 'border-surface-600 focus:ring-primary-400 focus:border-primary-500';
  
  const classes = `${baseClasses} ${stateClasses} ${className}`;
  
  return (
    <div className="relative">
      {label && (
        <label className="block text-sm font-medium mb-2 flex items-center gap-1 text-white">
          {label}
          {tooltip && (
            <Tooltip text={tooltip}>
              <AiOutlineInfoCircle className="w-4 h-4 text-primary-200 cursor-pointer" />
            </Tooltip>
          )}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon className="h-5 w-5 text-gray-400" />
          </div>
        )}
        <input
          className={`${classes} ${Icon ? 'pl-10' : ''}`}
          {...props}
        />
      </div>
      {error && (
        <div className="text-error-400 text-xs mt-1 flex items-center gap-1">
          <span>⚠</span>
          {error}
        </div>
      )}
      {success && (
        <div className="text-success-400 text-xs mt-1 flex items-center gap-1">
          <span>✓</span>
          {success}
        </div>
      )}
    </div>
  );
};

export default Input; 