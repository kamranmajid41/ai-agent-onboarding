import React from 'react';

const Card = ({ 
  children, 
  title,
  subtitle,
  className = '',
  padding = 'p-6',
  shadow = 'shadow-xl',
  ...props 
}) => {
  const baseClasses = 'card card-hover';
  const classes = `${baseClasses} ${shadow} ${padding} ${className}`;
  
  return (
    <div className={classes} {...props}>
      {(title || subtitle) && (
        <div className="mb-4">
          {title && <h3 className="font-semibold text-lg text-surface-900">{title}</h3>}
          {subtitle && <p className="text-sm text-gray-600 mt-1">{subtitle}</p>}
        </div>
      )}
      {children}
    </div>
  );
};

export default Card; 