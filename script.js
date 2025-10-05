// ===== Utilities =====
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
document.getElementById('year').textContent = new Date().getFullYear();

// ===== Mobile nav toggle =====
const nav = $('.main-nav');
const hamb = $('.hamb');
if (hamb) {
  hamb.addEventListener('click', () => {
    const expanded = nav.getAttribute('aria-expanded') === 'true';
    nav.setAttribute('aria-expanded', String(!expanded));
    hamb.setAttribute('aria-expanded', String(!expanded));
  });
  // Close when clicking a link
  $$('.main-nav a').forEach(a => a.addEventListener('click', () => {
    nav.setAttribute('aria-expanded', 'false');
    hamb.setAttribute('aria-expanded', 'false');
  }));
}

// ===== Smooth anchor scroll =====
$$('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href').slice(1);
    const el = document.getElementById(id);
    if (el) {
      e.preventDefault();
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ===== Three.js scene (premium 3D hero) =====
(function start3D(){
  const canvas = document.getElementById('bg');
  if (!canvas || !window.THREE) return;

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  const DPR = Math.min(window.devicePixelRatio || 1, 2);
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, 2, 0.1, 100);
  camera.position.set(0, 0.4, 4);

  // Lights
  const hemi = new THREE.HemisphereLight(0xbff5d1, 0x0b1220, 0.7);
  const key = new THREE.DirectionalLight(0x22c55e, 1.2);
  key.position.set(3, 2, 2);
  const rim = new THREE.DirectionalLight(0x9be9b5, 0.8);
  rim.position.set(-2, 1.5, -2);
  scene.add(hemi, key, rim);

  // Geometry: beveled icosahedron for a jewel feel
  const geo = new THREE.IcosahedronGeometry(1.0, 2);
  // Subtle wireframe overlay
  const mat = new THREE.MeshStandardMaterial({
    color: 0x1b283f,
    metalness: 0.85,
    roughness: 0.2,
    envMapIntensity: 0.9
  });
  const mesh = new THREE.Mesh(geo, mat);
  scene.add(mesh);

  // Points cloud around
  const pGeo = new THREE.BufferGeometry();
  const COUNT = 800;
  const positions = new Float32Array(COUNT * 3);
  for (let i = 0; i < COUNT; i++) {
    const r = 3.2 + Math.random() * 2.2;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos((Math.random() * 2) - 1);
    positions[i*3] = r * Math.sin(phi) * Math.cos(theta);
    positions[i*3+1] = r * Math.cos(phi) * 0.65; // slightly squashed for composition
    positions[i*3+2] = r * Math.sin(phi) * Math.sin(theta);
  }
  pGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const pMat = new THREE.PointsMaterial({ size: 0.015, color: 0xa7f3d0, transparent:true, opacity:0.55 });
  const points = new THREE.Points(pGeo, pMat);
  scene.add(points);

  // Responsive
  function resize() {
    const { innerWidth:w, innerHeight:h } = window;
    renderer.setPixelRatio(DPR);
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  resize();
  window.addEventListener('resize', resize);

  // Animation
  let t = 0;
  function animate() {
    requestAnimationFrame(animate);
    t += 0.005;
    mesh.rotation.x = Math.sin(t * 0.7) * 0.2 + 0.2;
    mesh.rotation.y += 0.005;
    points.rotation.y -= 0.0009;
    renderer.render(scene, camera);
  }
  animate();
})();
