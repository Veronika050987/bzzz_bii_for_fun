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
         {/* <CarSVG
                // --- Атрибуты для масштабирования и позиционирования ---
                width="50" // Устанавливаем желаемую ширину машинки
                height="100" // Устанавливаем желаемую высоту машинки
                // viewBox="0 0 50 100" // Можно убрать, если SVG имеет свои width/height
                style={{
                    transform: `rotate(${rotation}deg)`,
                    transformOrigin: '50% 50%',
                    // Если SVG имеет свои width/height, можно убрать width/height здесь
                    // и управлять размером через viewBox или через родительский div
                }}
            /> */}
        </div>
    );
};

export default Car;
