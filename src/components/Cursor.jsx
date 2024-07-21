// Cursor.js
import React, { useEffect, useRef } from 'react';
import anime from 'animejs';
import '../ComponentsStyling/Cursor.css'

const Cursor = () => {
  const cursorRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;

    // Animation for cursor
    anime({
      targets: cursor,
      translateX: [
        { value: 0, duration: 0 },
        { value: 10, duration: 500, easing: 'easeOutExpo' },
        { value: 0, duration: 500, easing: 'easeInExpo' },
      ],
      translateY: [
        { value: 0, duration: 0 },
        { value: 10, duration: 500, easing: 'easeOutExpo' },
        { value: 0, duration: 500, easing: 'easeInExpo' },
      ],
      loop: true,
      delay: anime.stagger(100),
    });

    // Update cursor position
    const handleMouseMove = (e) => {
      cursor.style.top = `${e.clientY}px`;
      cursor.style.left = `${e.clientX}px`;
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return <div ref={cursorRef} className="custom-cursor"></div>;
};

export default Cursor;
