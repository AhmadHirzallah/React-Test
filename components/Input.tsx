
import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: React.ReactNode;
  error?: string;
}

const Input: React.FC<InputProps> = ({ label, icon, error, className, ...props }) => {
  return (
    <div className="space-y-1.5 w-full">
      <label className="text-sm font-medium text-slate-400 block ml-1">
        {label}
      </label>
      <div className="relative group">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-400 transition-colors">
            {icon}
          </div>
        )}
        <input
          {...props}
          className={`
            w-full bg-slate-900/50 border border-slate-700/50 rounded-xl py-3 
            ${icon ? 'pl-10' : 'pl-4'} pr-4
            text-slate-100 placeholder:text-slate-600
            focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50
            transition-all duration-200
            ${error ? 'border-red-500/50 focus:border-red-500/50 focus:ring-red-500/10' : ''}
            ${className}
          `}
        />
      </div>
      {error && <p className="text-xs text-red-400 ml-1">{error}</p>}
    </div>
  );
};

export default Input;
