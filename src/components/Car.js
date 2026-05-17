import React from 'react';
import './Car.css';

const Car = ({position, rotation}) => {
    return(
        <div
        className="car"
        style={{
            left:`${position.x}px`,
            top:`${position.y}px`,
            transform:`rotate(${rotation}deg)`,
            // Центрируем поворот относительно центра машинки
            //transformOrigin:'50% 50%',
        }}        
        >
              {/* Колеса */}
      <div className="wheel front-left-wheel"></div>
      <div className="wheel front-right-wheel"></div>
      <div className="wheel rear-left-wheel"></div>
      <div className="wheel rear-right-wheel"></div>

      {/* Двери */}
      <div className="door-left"></div>
      <div className="door-right"></div>

      {/* Фары (если нужны) */}
      {/* <div className="headlight-left"></div> */}
      {/* <div className="headlight-right"></div> */}

      {/* Задние фонари */}
      <div className="taillight-left"></div>
      <div className="taillight-right"></div>

      {/* Глаза */}
      <div className="eye-left">
        <div className="pupil"></div>
      </div>
      <div className="eye-right">
        <div className="pupil"></div>
      </div>

      {/* Рот */}
      <div className="mouth"></div>
    </div>
  );
};

export default Car;
