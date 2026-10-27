import React, { useState } from 'react';

/**
 * Reusable Glassmorphism Button that turns vivid RED when clicked on
 */
export default function RedButton({
  children,
  onClick,
  className = '',
  variant = 'primary',
  type = 'button',
  disabled = false,
  ...props
}) {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = (e) => {
    // Trigger red clicked state
    setIsClicked(true);
    setTimeout(() => {
      setIsClicked(false);
    }, 450);

    if (onClick) {
      onClick(e);
    }
  };

  const baseClasses = variant === 'secondary' ? 'glass-btn-secondary' : 'glass-btn';
  const clickedClasses = isClicked ? 'btn-clicked !bg-red-600 !border-red-300 shadow-red-glow' : '';

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={handleClick}
      className={`${baseClasses} ${clickedClasses} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
