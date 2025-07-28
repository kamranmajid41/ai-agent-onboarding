import React from 'react';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  disabled = false, 
  loading = false,
  onClick,
  type = 'button',
  className = '',
  ...props 
}) => {
  const baseClasses = 'font-semibold rounded-lg shadow transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-surface-100';
  
  const variants = {
    primary: 'bg-gradient-primary text-white hover:shadow-xl hover:scale-105 focus:ring-primary-400',
    secondary: 'bg-surface-200 text-surface-900 border border-surface-300 hover:bg-surface-300 focus:ring-surface-400',
    outline: 'border border-primary-400 text-primary-600 hover:bg-primary-100 focus:ring-primary-400',
    danger: 'bg-error-600 text-white hover:bg-error-700 focus:ring-error-400',
    success: 'bg-success-600 text-white hover:bg-success-700 focus:ring-success-400'
  };
  
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-2',
    lg: 'px-8 py-3 text-lg'
  };
  
  const disabledClasses = disabled || loading ? 'opacity-50 cursor-not-allowed' : '';
  
  const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${disabledClasses} ${className}`;
  
  return (
    <button
      type={type}
      className={classes}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {loading ? (
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-600 mr-2"></div>
          Loading...
        </div>
      ) : (
        children
      )}
    </button>
  );
};

export default Button; 