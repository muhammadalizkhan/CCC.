import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const ConnectingDotsAnimation = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    // Scene
    const scene = new THREE.Scene();
    
    // Camera
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 30;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, canvas: canvasRef.current });
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Dots
    const dots = [];
    const numDots = 50;
    const distance = 15;
    const colors = [0xff0000, 0x00ff00, 0x0000ff];

    for (let i = 0; i < numDots; i++) {
      const geometry = new THREE.SphereGeometry(0.2, 16, 16);
      const material = new THREE.MeshBasicMaterial({ color: colors[Math.floor(Math.random() * colors.length)] });
      const dot = new THREE.Mesh(geometry, material);

      const angle = (i / numDots) * Math.PI * 2;
      dot.position.x = Math.cos(angle) * distance;
      dot.position.y = Math.sin(angle) * distance;

      dots.push(dot);
      scene.add(dot);
    }

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      dots.forEach(dot => {
        dot.rotation.x += 0.02;
        dot.rotation.y += 0.02;
      });

      renderer.render(scene, camera);
    };

    animate();

    // Resize handling
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas ref={canvasRef} />
  );
};

export default ConnectingDotsAnimation;
