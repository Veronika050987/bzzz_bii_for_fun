import React from 'react';
import './Car.css';
import CarSVG from './Car.svg';

const Car = ({position, rotation}) => {
    return(
        <div
        className="car"
        style={{
            left:`${position.x}px`,
            top:`${position.y}px`,
            transform:`rotate(${rotation}deg)`,
            // Центрируем поворот относительно центра машинки
            transformOrigin:'50% 50%',
        }}        
        >
               {/* Простая визуализация машинки */}
                {/* Можно заменить на SVG или img */}   
        </div>
    );
};

export default Car;
