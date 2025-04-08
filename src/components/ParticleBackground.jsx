import { useEffect, useRef } from "react";
import * as THREE from "three";

export const ParticleBackground = () => {
  // Refs for DOM mounting and data persistence
  const mountRef = useRef(null); // Reference to the container div
  const mousePos = useRef({ x: 0, y: 0 }); // Tracks mouse position
  const particlesData = useRef([]); // Stores particle physics data

  useEffect(() => {
    // ========== SCENE SETUP ========== //
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x141414); // Dark background color

    // Camera configuration (75° FOV, aspect ratio, clip planes)
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      2000
    );

    // WebGL renderer with antialiasing
    const renderer = new THREE.WebGLRenderer({
      alpha: true, // Allow transparency
      antialias: true, // Smooth edges
    });

    // Set renderer size and CSS positioning
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.domElement.style.position = "fixed";
    renderer.domElement.style.top = "0";
    renderer.domElement.style.left = "0";
    renderer.domElement.style.zIndex = "-1"; // Behind other content
    renderer.domElement.style.pointerEvents = "none"; // Click-through

    // Mount renderer to DOM
    mountRef.current.appendChild(renderer.domElement);

    // ========== PARTICLE SYSTEM ========== //
    const particleCount = 5000;
    const particles = new THREE.BufferGeometry();

    // Data buffers
    const positions = new Float32Array(particleCount * 3); // XYZ positions
    const colors = new Float32Array(particleCount * 3); // RGB colors
    const sizes = new Float32Array(particleCount); // Individual sizes
    // Initialize particle physics data
    particlesData.current = Array(particleCount)
      .fill()
      .map(() => ({
        velocity: new THREE.Vector3( // Random initial velocity
          (Math.random() - 0.5) * 0.5,
          (Math.random() - 0.5) * 0.5,
          (Math.random() - 0.5) * 0.5
        ),
        amplitude: Math.random() * 20 + 10, // Bounce height
        frequency: Math.random() * 0.001 + 0.001, // Bounce speed
        originalPos: new THREE.Vector3( // Base position
          (Math.random() - 0.5) * 2000,
          (Math.random() - 0.5) * 2000,
          (Math.random() - 0.5) * 2000
        ),
      }));

    // Fill buffers with initial data
    for (let i = 0; i < particleCount; i++) {
      const data = particlesData.current[i];

      // Set positions from physics data
      positions[i * 3] = data.originalPos.x;
      positions[i * 3 + 1] = data.originalPos.y;
      positions[i * 3 + 2] = data.originalPos.z;

      // Purple-ish color (RGB values)
      colors[i * 3] = 1.0; // R
      colors[i * 3 + 1] = 1.0; // G
      colors[i * 3 + 2] = 1.0; // B

      sizes[i] = 1.2; // Base size
    }

    // Assign attributes to geometry
    particles.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    particles.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    particles.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

    // ========== CIRCULAR PARTICLE TEXTURE ========== //
    const canvas = document.createElement("canvas");
    canvas.width = 32; // Texture resolution
    canvas.height = 32;
    const ctx = canvas.getContext("2d");

    // Draw white circle for alpha map
    ctx.beginPath();
    ctx.arc(16, 16, 16, 0, Math.PI * 2); // Centered circle
    ctx.fillStyle = "white";
    ctx.fill();

    // Create Three.js texture
    const texture = new THREE.CanvasTexture(canvas);

    // ========== MATERIAL CONFIG ========== //
    const particleMaterial = new THREE.PointsMaterial({
      size: 2.8, // Visual size
      vertexColors: true, // Use per-particle colors
      transparent: true, // Enable transparency
      opacity: 0.9, // Base opacity
      blending: THREE.AdditiveBlending, // Glow effect
      // sizeAttenuation: true, // Perspective scaling
      alphaMap: texture, // Circular shape
    });

    // Create particle system
    const particleSystem = new THREE.Points(particles, particleMaterial);
    scene.add(particleSystem);

    // Position camera
    camera.position.z = 800; // Back away from scene

    // ========== MOUSE INTERACTION ========== //
    const handleMouseMove = (event) => {
      // Normalize mouse coordinates to [-1, 1] range
      mousePos.current = {
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1,
      };
    };

    window.addEventListener("mousemove", handleMouseMove);

    // ========== ANIMATION LOOP ========== //
    const clock = new THREE.Clock();
    const animate = () => {
      requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();
      const positions = particleSystem.geometry.attributes.position.array;

      // Update each particle
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        const data = particlesData.current[i];

        // Vertical bounce effect
        const bounceY =
          Math.sin(elapsedTime * data.frequency * 5) * data.amplitude;

        // Calculate mouse influence
        const mouseInfluence = 0.2;
        const targetX =
          data.originalPos.x + mousePos.current.x * 400 * mouseInfluence;
        const targetY =
          data.originalPos.y + mousePos.current.y * 400 * mouseInfluence;

        // Physics-based movement
        data.velocity.x += (targetX - positions[i3]) * 0.001;
        data.velocity.y += (targetY - positions[i3 + 1] + bounceY) * 0.001;
        data.velocity.z += (data.originalPos.z - positions[i3 + 2]) * 0.001;

        // Velocity damping (simulates friction)
        data.velocity.multiplyScalar(0.95);

        // Update positions
        positions[i3] += data.velocity.x;
        positions[i3 + 1] += data.velocity.y;
        positions[i3 + 2] += data.velocity.z;
      }

      // Flag for GPU buffer update
      particleSystem.geometry.attributes.position.needsUpdate = true;

      // Render frame
      renderer.render(scene, camera);
    };

    // ========== WINDOW RESIZE HANDLER ========== //
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);
    animate(); // Start animation loop

    // ========== CLEANUP ========== //
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []); // Empty dependency array = runs once on mount

  // Render container (invisible/interaction-less)
  return (
    <div
      ref={mountRef}
      className="absolute inset-0 -z-10 pointer-events-none"
    />
  );
};
