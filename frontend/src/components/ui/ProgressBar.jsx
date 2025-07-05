import React from 'react';

const ProgressBar = ({ 
  value, 
  max = 100, 
  color = 'primary',
  showLabel = false,
  className = '',
  ...props 
}) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
  
  const colorClasses = {
    primary: 'bg-primary-600',
    secondary: 'bg-secondary-600',
    success: 'bg-success-600',
    warning: 'bg-warning-600',
    error: 'bg-error-600'
  };
  
  const bgClasses = {
    primary: 'bg-primary-200',
    secondary: 'bg-secondary-200',
    success: 'bg-success-200',
    warning: 'bg-warning-200',
    error: 'bg-error-200'
  };

  return (
    <div className={className} {...props}>
      {showLabel && (
        <div className="flex justify-between text-sm text-gray-300 mb-1">
          <span>Progress</span>
          <span>{Math.round(percentage)}%</span>
        </div>
      )}
      <div className={`w-full bg-surface-700 rounded-full h-2`}>
        <div
          className={`${colorClasses[color]} h-2 rounded-full transition-all duration-300`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar; 