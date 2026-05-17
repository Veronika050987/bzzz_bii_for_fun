import React, {useState, useEffect, useRef} from 'react';
import Car from './Car';
import './GameBoard.css';

const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;
const CAR_SIZE = { width: 30, height: 40 };
const MOVE_SPEED = 5;// Пикселей за шаг
const TURN_SPEED = 3;// Градусов за шаг

const GameBoard = () => {
    const [carState, setCarState] = useState({
        position: 
        {
            x: GAME_WIDTH / 2 - CAR_SIZE.width / 2, 
            y: GAME_HEIGHT - CAR_SIZE.height - 20
        },
        rotation:0, // 0 градусов - смотрит вверх
    });
     
    // Используем useRef для хранения состояния, которое не должно вызывать перерисовку при изменении
    const carStateRef = useRef(carState);
    carStateRef.current = carState;// Синхронизируем useRef с текущим состоянием

    const[keysPressed, setKeysPressed] = useState({});
    const [isGameRunning, setIsGameRunning] = useState(true); // Состояние для управления запуском игры

    // Для хранения ID запроса анимации, чтобы его можно было отменить
    const animationFrameId = useRef(null);

    useEffect(()=>{
        // Обработчик нажатия клавиш
        const handleKeyDown = (event) => {
            setKeysPressed(prev => ({...prev,[event.key]:true}));
        };

        // Обработчик отпускания клавиш
        const handleKeyUp = (event) => {
            setKeysPressed(prev => {
                const newState = {...prev};
                delete newState[event.key];// Удаляем клавишу из объекта
                return newState;
            });
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        // Очистка addEventListener при размонтировании компонента
        return() => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, []);// Пустой массив зависимостей означает, что эффект выполнится один раз при монтировании

    // Игровой цикл
   useEffect(() => {

    const gameLoop = () => {
      if (!isGameRunning) { // Останавливаем цикл, если игра не запущена
        return;
      }

      let newPosition = { ...carStateRef.current.position };
      let newRotation = carStateRef.current.rotation;
      let moved = false; // Флаг, показывающий, было ли движение

      // Обработка ввода
      if (keysPressed['ArrowUp']) { // Вверх
        // Расчет новой позиции в зависимости от угла поворота
        const radians = (newRotation - 90) * Math.PI / 180; // -90, потому что 0 градусов - это вправо, а мы хотим вверх
        newPosition.x += Math.cos(radians) * MOVE_SPEED;
        newPosition.y += Math.sin(radians) * MOVE_SPEED;
        moved = true;
      }
      if (keysPressed['ArrowDown']) { // Вниз
        const radians = (newRotation + 90) * Math.PI / 180; // +90, потому что 0 градусов - это вправо, а мы хотим вниз
        newPosition.x += Math.cos(radians) * MOVE_SPEED;
        newPosition.y += Math.sin(radians) * MOVE_SPEED;
        moved = true;
      }
      if (keysPressed['ArrowLeft']) { // Поворот влево
        newRotation -= TURN_SPEED;
        moved = true;
      }
      if (keysPressed['ArrowRight']) { // Поворот вправо
        newRotation += TURN_SPEED;
        moved = true;
      }

      // Ограничения по краям игрового поля
      const halfCarWidth = CAR_SIZE.width / 2;// Это для центрирования
      const halfCarHeight = CAR_SIZE.height / 2;

      if (newPosition.x < 0) newPosition.x = 0;
      if (newPosition.x > GAME_WIDTH - CAR_SIZE.width) newPosition.x = GAME_WIDTH - CAR_SIZE.width;
      if (newPosition.y < 0) newPosition.y = 0;
      if (newPosition.y > GAME_HEIGHT - CAR_SIZE.height) newPosition.y = GAME_HEIGHT - CAR_SIZE.height;

      // Обновление состояния, только если было движение
      if (moved) {
        setCarState({
          position: newPosition,
          rotation: newRotation,
        });
      }

      // Запрос следующего кадра анимации
      animationFrameId.current = requestAnimationFrame(gameLoop);
    };

   animationFrameId.current = requestAnimationFrame(gameLoop); // Запускаем игровой цикл

    // Очистка при размонтировании (хотя requestAnimationFrame сам остановится)
    return () => {
      cancelAnimationFrame(animationFrameId.current);
    };

  }, [keysPressed, isGameRunning]); // Перезапускаем эффект, если меняются нажатые клавиши


  const handleStopGame = () => {
    setIsGameRunning(false);
    // Можно добавить дополнительную логику, если нужно
  };

  const handleStartGame = () => {
    setIsGameRunning(true);
    // Перезапускаем игровой цикл, если он был остановлен
    // Это необходимо, чтобы игра продолжила работать после нажатия "Start"
    // Можно использовать useRef для сохранения анимационного ID и затем отменить его
  };

  return (
    <div className="game-board">
      <div className="instructions">
        Используйте стрелки для управления.
      </div>
      <div className="game-area">
        <Car position={carState.position} rotation={carState.rotation} />
        {/* Здесь могут быть другие объекты: дороги, препятствия и т.д. */}
      </div>
      <div className="controls">
        {!isGameRunning ? (
          <button onClick={handleStartGame}>Start</button>
        ) : (
          <button onClick={handleStopGame}>Stop</button>
        )}
      </div>
    </div>
  );
};

export default GameBoard;
