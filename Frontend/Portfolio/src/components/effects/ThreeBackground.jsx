import { useEffect, useRef } from 'react';

export default function ThreeBackground() {
  const containerRef = useRef(null);

  useEffect(() => {
    const THREE = window.THREE;
    if (!THREE) {
      console.warn('Three.js is not loaded yet.');
      return;
    }

    const container = containerRef.current;
    if (!container) return;

    let scene, camera, renderer;
    let particleSystem, particlePositions, originalPositions, particleVelocities;
    let floatingMeshes = [];
    const particleCount = 1000;
    
    // Interaction states
    let raycaster = new THREE.Raycaster();
    let threeMouse = new THREE.Vector2(-9999, -9999);
    let planeZ = 0;

    // Drag States
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    let dragRotation = { x: 0, y: 0 };
    let dragRotationTarget = { x: 0, y: 0 };
    let meshesGroup = new THREE.Group();

    // Initialize 3D Scene
    const init = () => {
      scene = new THREE.Scene();
      scene.add(meshesGroup);

      // Camera setup
      camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
      camera.position.z = 32;

      // Renderer setup
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      container.appendChild(renderer.domElement);

      // 3D Particles setup (BufferGeometry)
      const geometry = new THREE.BufferGeometry();
      particlePositions = new Float32Array(particleCount * 3);
      originalPositions = new Float32Array(particleCount * 3);
      particleVelocities = new Float32Array(particleCount * 3);

      const spread = 55;

      for (let i = 0; i < particleCount * 3; i += 3) {
        const radius = Math.random() * spread;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos((Math.random() * 2) - 1);

        const x = radius * Math.sin(phi) * Math.cos(theta);
        const y = radius * Math.sin(phi) * Math.sin(theta);
        const z = (Math.random() - 0.5) * 15; // thin depth for overlay

        particlePositions[i] = x;
        particlePositions[i + 1] = y;
        particlePositions[i + 2] = z;

        originalPositions[i] = x;
        originalPositions[i + 1] = y;
        originalPositions[i + 2] = z;

        particleVelocities[i] = 0;
        particleVelocities[i + 1] = 0;
        particleVelocities[i + 2] = 0;
      }

      geometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

      // Glowing circle texture for soft stars
      const canvasParticle = document.createElement('canvas');
      canvasParticle.width = 16;
      canvasParticle.height = 16;
      const ctx = canvasParticle.getContext('2d');
      const gradient = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
      gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
      gradient.addColorStop(0.35, 'rgba(0, 240, 255, 0.7)');
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 16, 16);

      const texture = new THREE.CanvasTexture(canvasParticle);
      const material = new THREE.PointsMaterial({
        size: 0.3,
        transparent: true,
        opacity: 0.85,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        map: texture
      });

      particleSystem = new THREE.Points(geometry, material);
      scene.add(particleSystem);

      // Create floating geometric wireframe meshes (Google Inspired palette)
      const geomList = [
        new THREE.IcosahedronGeometry(1.8, 1),
        new THREE.TorusGeometry(1.2, 0.35, 8, 24),
        new THREE.OctahedronGeometry(1.6, 0),
        new THREE.TetrahedronGeometry(1.4, 0),
        new THREE.SphereGeometry(1.2, 16, 16)
      ];

      const meshColors = [
        0x4285F4, // Google Blue
        0xEA4335, // Google Red
        0xFBBC05, // Google Yellow
        0x34A853, // Google Green
        0x00f0ff, // Accent Cyan
        0x8f00ff  // Accent Purple
      ];

      for (let i = 0; i < 10; i++) {
        const geom = geomList[i % geomList.length];
        const mat = new THREE.MeshPhysicalMaterial({
          color: meshColors[i % meshColors.length],
          wireframe: true,
          transparent: true,
          opacity: 0.22,
          roughness: 0.1,
          metalness: 0.8,
          clearcoat: 1.0
        });

        const mesh = new THREE.Mesh(geom, mat);
        
        // Distribute positions
        mesh.position.x = (Math.random() - 0.5) * 44;
        mesh.position.y = (Math.random() - 0.5) * 22;
        mesh.position.z = (Math.random() - 0.5) * 12;

        mesh.rotation.x = Math.random() * Math.PI;
        mesh.rotation.y = Math.random() * Math.PI;
        mesh.scale.setScalar(Math.random() * 0.5 + 0.85);

        // Drift speed data
        mesh.userData = {
          speedX: (Math.random() - 0.5) * 0.006,
          speedY: (Math.random() - 0.5) * 0.006,
          rotSpeedX: (Math.random() - 0.5) * 0.006,
          rotSpeedY: (Math.random() - 0.5) * 0.006,
          originalX: mesh.position.x,
          originalY: mesh.position.y,
          originalZ: mesh.position.z
        };

        meshesGroup.add(mesh);
        floatingMeshes.push(mesh);
      }

      // Lighting setup
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.45);
      scene.add(ambientLight);

      const dirLight1 = new THREE.DirectionalLight(0x00f0ff, 0.85);
      dirLight1.position.set(12, 12, 12);
      scene.add(dirLight1);

      const dirLight2 = new THREE.DirectionalLight(0x8f00ff, 0.7);
      dirLight2.position.set(-12, -12, 12);
      scene.add(dirLight2);

      // Listeners
      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mousedown', onMouseDown);
      window.addEventListener('mouseup', onMouseUp);
      window.addEventListener('resize', onWindowResize);

      // Touch events for mobile
      window.addEventListener('touchmove', onTouchMove, { passive: true });
      window.addEventListener('touchstart', onTouchStart, { passive: true });
      window.addEventListener('touchend', onTouchEnd);

      animate();
    };

    // Events
    const onMouseMove = (e) => {
      // Norm mouse coordinates for raycaster
      threeMouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      threeMouse.y = -(e.clientY / window.innerHeight) * 2 + 1;

      if (isDragging) {
        const deltaX = e.clientX - previousMousePosition.x;
        const deltaY = e.clientY - previousMousePosition.y;

        // Modify targets based on dragging
        dragRotationTarget.y += deltaX * 0.008;
        dragRotationTarget.x += deltaY * 0.008;

        previousMousePosition = { x: e.clientX, y: e.clientY };
      }
    };

    const onMouseDown = (e) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    const onTouchStart = (e) => {
      if (e.touches.length === 1) {
        isDragging = true;
        previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    const onTouchMove = (e) => {
      if (e.touches.length === 1) {
        const t = e.touches[0];
        threeMouse.x = (t.clientX / window.innerWidth) * 2 - 1;
        threeMouse.y = -(t.clientY / window.innerHeight) * 2 + 1;

        if (isDragging) {
          const deltaX = t.clientX - previousMousePosition.x;
          const deltaY = t.clientY - previousMousePosition.y;

          dragRotationTarget.y += deltaX * 0.01;
          dragRotationTarget.x += deltaY * 0.01;

          previousMousePosition = { x: t.clientX, y: t.clientY };
        }
      }
    };

    const onTouchEnd = () => {
      isDragging = false;
    };

    const onWindowResize = () => {
      if (!camera || !renderer) return;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    // Animation Loop
    let animFrameId;
    const animate = () => {
      animFrameId = requestAnimationFrame(animate);

      // Project mouse location onto plane Z = 0
      raycaster.setFromCamera(threeMouse, camera);
      const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
      const raycastResult = new THREE.Vector3();
      raycaster.ray.intersectPlane(plane, raycastResult);

      // 1. Particle Physics (Repulsion + Elasticity)
      const positions = particleSystem.geometry.attributes.position.array;
      const repelRadius = 6.5;
      const repelStrength = 0.5;
      const springStrength = 0.07;
      const damping = 0.88;

      for (let i = 0; i < particleCount * 3; i += 3) {
        const px = positions[i];
        const py = positions[i + 1];
        const pz = positions[i + 2];

        const ox = originalPositions[i];
        const oy = originalPositions[i + 1];
        const oz = originalPositions[i + 2];

        let vx = particleVelocities[i];
        let vy = particleVelocities[i + 1];
        let vz = particleVelocities[i + 2];

        const dx = px - raycastResult.x;
        const dy = py - raycastResult.y;
        const dz = pz - raycastResult.z;
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

        let fx = 0, fy = 0, fz = 0;

        // Repel force
        if (dist < repelRadius && dist > 0.02) {
          const force = (1.0 - dist / repelRadius) * repelStrength;
          fx = (dx / dist) * force;
          fy = (dy / dist) * force;
          fz = (dz / dist) * force;
        }

        // Return force
        const sx = (ox - px) * springStrength;
        const sy = (oy - py) * springStrength;
        const sz = (oz - pz) * springStrength;

        vx = (vx + fx + sx) * damping;
        vy = (vy + fy + sy) * damping;
        vz = (vz + fz + sz) * damping;

        particleVelocities[i] = vx;
        particleVelocities[i + 1] = vy;
        particleVelocities[i + 2] = vz;

        positions[i] = px + vx;
        positions[i + 1] = py + vy;
        positions[i + 2] = pz + vz;
      }
      particleSystem.geometry.attributes.position.needsUpdate = true;

      // 2. Scene / Meshes Group Drag Rotation Lerp
      dragRotation.x += (dragRotationTarget.x - dragRotation.x) * 0.08;
      dragRotation.y += (dragRotationTarget.y - dragRotation.y) * 0.08;
      
      meshesGroup.rotation.x = dragRotation.x;
      meshesGroup.rotation.y = dragRotation.y;

      // Slow drift rotation of the group as well
      dragRotationTarget.y += 0.0008;

      // 3. Float and animate floating wireframe meshes
      floatingMeshes.forEach(mesh => {
        // Drift movement
        mesh.position.x += mesh.userData.speedX;
        mesh.position.y += mesh.userData.speedY;
        mesh.rotation.x += mesh.userData.rotSpeedX;
        mesh.rotation.y += mesh.userData.rotSpeedY;

        // Boundary wrap/rebound
        const limitX = 26, limitY = 14;
        if (Math.abs(mesh.position.x) > limitX) mesh.userData.speedX *= -1;
        if (Math.abs(mesh.position.y) > limitY) mesh.userData.speedY *= -1;

        // Local interaction nudge (mouse push)
        const localPos = mesh.position.clone().applyMatrix4(meshesGroup.matrixWorld);
        const dx = localPos.x - raycastResult.x;
        const dy = localPos.y - raycastResult.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 8.0) {
          const nudge = 0.085 * (1.0 - dist / 8.0);
          // Apply nudge in group local coordinates
          const nudgeVec = new THREE.Vector3(dx, dy, 0).normalize().multiplyScalar(nudge);
          nudgeVec.applyQuaternion(meshesGroup.quaternion.clone().invert());
          mesh.position.x += nudgeVec.x;
          mesh.position.y += nudgeVec.y;
        }
      });

      renderer.render(scene, camera);
    };

    init();

    // Cleanup
    return () => {
      cancelAnimationFrame(animFrameId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('resize', onWindowResize);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchend', onTouchEnd);
      
      if (renderer && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      id="canvas-container"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 1,
        pointerEvents: 'auto', // Allow drag interactions
        cursor: 'grab'
      }}
      className="select-none active:cursor-grabbing"
    />
  );
}
