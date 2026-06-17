'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

type MotionButtonProps = React.ComponentProps<typeof motion.button>;

interface ButtonProps extends Omit<MotionButtonProps, 'href'> {
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
  href?: string;
  className?: string;
  icon?: boolean;
}

const MotionLink = motion.create(Link);

export function Button({ 
  variant = 'primary', 
  children, 
  href, 
  className = '',
  icon = false,
  ...props 
}: ButtonProps) {
  const baseStyles = "inline-flex items-center justify-center px-6 py-3 font-medium transition-all duration-300 rounded-[999px] text-sm";
  
  const variants = {
    primary: "bg-accent text-white hover:bg-blue-600 hover:shadow-[0_0_20px_rgba(59,130,246,0.4)]",
    secondary: "bg-transparent text-white border border-white hover:bg-white hover:text-primary"
  };

  const combinedClassName = `${baseStyles} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <MotionLink 
        href={href}
        className={combinedClassName}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
      >
        {children}
        {icon && <ArrowRight className="w-4 h-4 ml-2" />}
      </MotionLink>
    );
  }

  return (
    <motion.button 
      className={combinedClassName} 
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
      {...props}
    >
      {children}
      {icon && <ArrowRight className="w-4 h-4 ml-2" />}
    </motion.button>
  );
}
