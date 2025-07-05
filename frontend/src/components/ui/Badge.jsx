import React from 'react';

const Badge = ({ 
  children, 
  variant = 'default',
  size = 'md',
  className = '',
  ...props 
}) => {
  const baseClasses = 'inline-flex items-center font-medium rounded-full';
  
  const variants = {
    default: 'bg-surface-700 text-gray-200',
    primary: 'bg-primary-900/50 text-primary-300 border border-primary-700/50',
    success: 'bg-success-900/50 text-success-300 border border-success-700/50',
    warning: 'bg-warning-900/50 text-warning-300 border border-warning-700/50',
    danger: 'bg-error-900/50 text-error-300 border border-error-700/50',
    info: 'bg-primary-900/50 text-primary-300 border border-primary-700/50'
  };
  
  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-0.5 text-sm',
    lg: 'px-3 py-1 text-sm'
  };
  
  const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`;
  
  return (
    <span className={classes} {...props}>
      {children}
    </span>
  );
};

export default Badge; 