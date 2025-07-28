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
    default: 'bg-surface-200 text-surface-700',
    primary: 'bg-primary-100 text-primary-600 border border-primary-200',
    success: 'bg-success-100 text-success-600 border border-success-200',
    warning: 'bg-warning-100 text-warning-600 border border-warning-200',
    danger: 'bg-error-100 text-error-600 border border-error-200',
    info: 'bg-primary-100 text-primary-600 border border-primary-200'
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