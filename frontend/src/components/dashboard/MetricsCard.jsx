import React from 'react';
import { AiOutlineArrowUp, AiOutlineArrowDown, AiOutlineInfoCircle } from 'react-icons/ai';
import Tooltip from '../ui/Tooltip';

const MetricsCard = ({ 
  title,
  value,
  change,
  changeType = 'percentage',
  trend = 'up',
  icon,
  color = 'primary',
  tooltip,
  className = '',
  ...props 
}) => {
  const baseClasses = 'card card-hover text-center';
  
  const colors = {
    primary: 'text-primary-600',
    success: 'text-success-600',
    warning: 'text-warning-600',
    danger: 'text-error-600',
    info: 'text-primary-600'
  };
  
  const trendColors = {
    up: 'text-success-700',
    down: 'text-error-700'
  };
  
  const classes = `${baseClasses} ${className}`;
  
  const formatValue = (val) => {
    if (typeof val === 'number') {
      if (val >= 1000000) {
        return (val / 1000000).toFixed(1) + 'M';
      } else if (val >= 1000) {
        return (val / 1000).toFixed(1) + 'K';
      }
      return val.toLocaleString();
    }
    return val;
  };
  
  const formatChange = (val, type) => {
    if (type === 'percentage') {
      return `${val > 0 ? '+' : ''}${val}%`;
    }
    return val;
  };

  // Support both emoji string and React component for icon
  const renderIcon = () => {
    if (!icon) return null;
    if (typeof icon === 'string') {
      return <span className={`text-3xl mr-2 ${colors[color]}`}>{icon}</span>;
    }
    // If it's a React component
    return React.createElement(icon, { className: `w-6 h-6 ${colors[color]} mr-2` });
  };
  
  return (
    <div className={classes} {...props}>
      <div className="p-6">
        <div className="flex items-center justify-center mb-4">
          {renderIcon()}
          <div className={`text-2xl font-bold ${colors[color]}`}>
            {formatValue(value)}
          </div>
        </div>
        <div className="flex items-center justify-center gap-2 mb-3">
          <span className="text-gray-600">{title}</span>
          {tooltip && (
            <Tooltip text={tooltip}>
              <AiOutlineInfoCircle className="w-4 h-4 text-primary-500 cursor-pointer" />
            </Tooltip>
          )}
        </div>
        {change !== undefined && (
          <div className={`text-xs flex items-center justify-center gap-1 ${trendColors[trend]}`}>
            {trend === 'up' ? (
              <AiOutlineArrowUp className="w-3 h-3" />
            ) : (
              <AiOutlineArrowDown className="w-3 h-3" />
            )}
            <span>{formatChange(change, changeType)} vs last month</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default MetricsCard; 