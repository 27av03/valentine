import { useState, useRef, useEffect } from 'react';
import './App.css';

function App() {
  const [showSuccess, setShowSuccess] = useState(false);
  const [yesScale, setYesScale] = useState(1);
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });
  const [isHoveringNo, setIsHoveringNo] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const noButtonRef = useRef<HTMLButtonElement>(null);

  // Handle Yes button click
  const handleYesClick = () => {
    setShowSuccess(true);
  };

  // Move No button to random position
  const moveNoButton = () => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const containerRect = container.getBoundingClientRect();

    // Calculate safe area (keeping button within viewport)
    const buttonWidth = 120;
    const buttonHeight = 50;
    const padding = 20;

    const maxX = containerRect.width - buttonWidth - padding;
    const maxY = containerRect.height - buttonHeight - padding;

    const newX = Math.random() * maxX;
    const newY = Math.random() * maxY;

    setNoPosition({ x: newX, y: newY });
  };

  // Handle No button hover/touch
  const handleNoInteraction = () => {
    moveNoButton();
    setYesScale(prev => {
      const newScale = prev + 0.3;
      // Cap at 8x scale so it doesn't get too crazy
      return Math.min(newScale, 8);
    });
  };

  // Check if Yes button covers No button
  const yesCoversNo = yesScale >= 6;

  // Reset when mouse leaves the no button area
  useEffect(() => {
    if (!isHoveringNo) {
      // Keep the scale, just reset the hovering state
    }
  }, [isHoveringNo]);

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-200 via-rose-200 to-pink-300 flex items-center justify-center p-4">
        <div className="success-container text-center animate-fade-in">
          <div className="gif-container mb-6">
            <img
              src="https://c.tenor.com/8trqa66_h6MAAAAC/dudu-bubu-bear-and-panda.gif"
              alt="Dudu Bubu Love"
              className="rounded-2xl shadow-xl mx-auto"
              style={{ maxWidth: '100%', height: 'auto', maxHeight: '350px' }}
            />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-rose-600 mb-4 animate-bounce">
            WOOOOO! ❤️
          </h1>
          <p className="text-xl md:text-2xl text-rose-700 font-medium">
            I love you sooooo much! 💕
          </p>
          <div className="mt-8 text-6xl animate-pulse">
            🥰💝🌹😘
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-gradient-to-br from-pink-100 via-rose-100 to-pink-200 flex items-center justify-center p-4 relative overflow-hidden"
    >
      {/* Floating hearts background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute text-rose-300 opacity-30 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              fontSize: `${Math.random() * 30 + 10}px`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 3 + 3}s`,
            }}
          >
            ❤️
          </div>
        ))}
      </div>

      <div className="main-container text-center relative z-10 max-w-2xl w-full">
        {/* GIF */}
        <div className="gif-container mb-8 rounded-2xl overflow-hidden shadow-2xl bg-white/50 backdrop-blur-sm p-4">
          <img
            src="https://media.tenor.com/jY44wzlfI3YAAAAM/dudu-bubu.gif"
            alt="Dudu Bubu Valentine"
            className="rounded-xl mx-auto"
            style={{ maxWidth: '100%', height: 'auto', maxHeight: '350px' }}
          />
        </div>

        {/* Question */}
        <h1 className="text-3xl md:text-5xl font-bold text-rose-700 mb-10 drop-shadow-sm">
          Hey Babboo! Will you be my Valentine? 💕
        </h1>

        {/* Buttons Container */}
        <div className="buttons-container relative h-64 flex items-center justify-center">
          {/* Yes Button */}
          <button
            onClick={handleYesClick}
            className="yes-button bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-bold rounded-full shadow-xl transition-all duration-300 ease-out flex items-center justify-center gap-2"
            style={{
              transform: `scale(${yesScale})`,
              padding: `${16 * yesScale}px ${40 * yesScale}px`,
              fontSize: `${18 * yesScale}px`,
              zIndex: 20,
            }}
          >
            <span>Yes</span>
            <span className="heart-emoji">❤️</span>
          </button>

          {/* No Button - Only show if Yes doesn't cover it */}
          {!yesCoversNo && (
            <button
              ref={noButtonRef}
              onMouseEnter={() => {
                setIsHoveringNo(true);
                handleNoInteraction();
              }}
              onMouseLeave={() => setIsHoveringNo(false)}
              onMouseOver={handleNoInteraction}
              onTouchStart={handleNoInteraction}
              className="no-button absolute bg-gradient-to-r from-gray-400 to-gray-500 text-white font-bold rounded-full shadow-lg transition-all duration-200 cursor-not-allowed"
              style={{
                left: `${noPosition.x}px`,
                top: `${noPosition.y}px`,
                padding: '16px 40px',
                fontSize: '18px',
                zIndex: 10,
              }}
              disabled
            >
              No 💔
            </button>
          )}
        </div>

        {/* Hint text */}
        <p className="mt-8 text-rose-500 text-sm md:text-base opacity-70">
          {yesScale > 1
            ? `The Yes button is getting bigger! (${Math.round((yesScale - 1) * 100)}% larger)`
            : 'Try hovering over the No button... if you can! 😏'}
        </p>
      </div>
    </div>
  );
}

export default App;
