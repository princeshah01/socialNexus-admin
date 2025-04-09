import { useEffect, useRef } from "react";
import * as THREE from "three";

export const ParticleBackground = () => {
  const mountRef = useRef(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const particlesData = useRef([]);

  useEffect(() => {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x141414);

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      2000
    );

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.domElement.style.position = "fixed";
    renderer.domElement.style.top = "0";
    renderer.domElement.style.left = "0";
    renderer.domElement.style.zIndex = "-1";
    renderer.domElement.style.pointerEvents = "none";
    mountRef.current.appendChild(renderer.domElement);

    const particleCount = 5000;
    const particles = new THREE.BufferGeometry();

    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);
    particlesData.current = Array(particleCount)
      .fill()
      .map(() => ({
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.5,
          (Math.random() - 0.5) * 0.5,
          (Math.random() - 0.5) * 0.5
        ),
        amplitude: Math.random() * 20 + 10,
        frequency: Math.random() * 0.001 + 0.001,
        originalPos: new THREE.Vector3(
          (Math.random() - 0.5) * 2000,
          (Math.random() - 0.5) * 2000,
          (Math.random() - 0.5) * 2000
        ),
      }));

    for (let i = 0; i < particleCount; i++) {
      const data = particlesData.current[i];

      positions[i * 3] = data.originalPos.x;
      positions[i * 3 + 1] = data.originalPos.y;
      positions[i * 3 + 2] = data.originalPos.z;

      colors[i * 3] = 1.0;
      colors[i * 3 + 1] = 1.0;
      colors[i * 3 + 2] = 1.0;

      sizes[i] = 1.2;
    }

    particles.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    particles.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    particles.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

    const canvas = document.createElement("canvas");
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext("2d");

    ctx.beginPath();
    ctx.arc(16, 16, 16, 0, Math.PI * 2);
    ctx.fillStyle = "white";
    ctx.fill();

    const texture = new THREE.CanvasTexture(canvas);

    const particleMaterial = new THREE.PointsMaterial({
      size: 2.8,
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
      alphaMap: texture,
    });

    const particleSystem = new THREE.Points(particles, particleMaterial);
    scene.add(particleSystem);

    camera.position.z = 800;

    const handleMouseMove = (event) => {
      mousePos.current = {
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1,
      };
    };

    window.addEventListener("mousemove", handleMouseMove);

    const clock = new THREE.Clock();
    const animate = () => {
      requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();
      const positions = particleSystem.geometry.attributes.position.array;

      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        const data = particlesData.current[i];

        const bounceY =
          Math.sin(elapsedTime * data.frequency * 5) * data.amplitude;

        const mouseInfluence = 0.2;
        const targetX =
          data.originalPos.x + mousePos.current.x * 400 * mouseInfluence;
        const targetY =
          data.originalPos.y + mousePos.current.y * 400 * mouseInfluence;

        data.velocity.x += (targetX - positions[i3]) * 0.001;
        data.velocity.y += (targetY - positions[i3 + 1] + bounceY) * 0.001;
        data.velocity.z += (data.originalPos.z - positions[i3 + 2]) * 0.001;

        data.velocity.multiplyScalar(0.95);

        positions[i3] += data.velocity.x;
        positions[i3 + 1] += data.velocity.y;
        positions[i3 + 2] += data.velocity.z;
      }

      particleSystem.geometry.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);
    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  // render container
  return (
    <div
      ref={mountRef}
      className="absolute inset-0 -z-10 pointer-events-none"
    />
  );
};
