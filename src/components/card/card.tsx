import React from 'react';
import './Card.css';

interface CardViewProps {
    children: React.ReactNode;
  }

export const Card: React.FC<CardViewProps> = ({ children }) => {
    return (
        <div className="card">
            {children}
        </div>
    );
};
