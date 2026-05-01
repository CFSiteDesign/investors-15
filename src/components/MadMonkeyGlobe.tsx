import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

// ---------- Brand palette ----------
const COLOR_BG = "#000000";
const COLOR_OCEAN = "#2A1B5C";
const COLOR_LAND = "#4A3A8C";
const COLOR_ATMOS = "#6FB3E8";
const COLOR_PIN = "#6FB3E8";
const COLOR_PULSE = "#7DF9FF";

// ---------- Locations ----------
type Location = { name: string; country: string; lat: number; lng: number };

const LOCATIONS: Location[] = [
  { name: "Bangkok", country: "Thailand", lat: 13.7563, lng: 100.5018 },
  { name: "Chiang Mai", country: "Thailand", lat: 18.7883, lng: 98.9853 },
  { name: "Pai", country: "Thailand", lat: 19.3583, lng: 98.4419 },
  { name: "Phuket", country: "Thailand", lat: 7.8804, lng: 98.3923 },
  { name: "Luang Prabang", country: "Laos", lat: 19.8845, lng: 102.1348 },
  { name: "Vang Vieng", country: "Laos", lat: 18.9226, lng: 102.4496 },
  { name: "Hoi An", country: "Vietnam", lat: 15.8801, lng: 108.338 },
  { name: "Hanoi", country: "Vietnam", lat: 21.0285, lng: 105.8542 },
  { name: "Ha Giang", country: "Vietnam", lat: 22.8233, lng: 104.9836 },
  { name: "Phnom Penh", country: "Cambodia", lat: 11.5564, lng: 104.9282 },
  { name: "Siem Reap", country: "Cambodia", lat: 13.3671, lng: 103.8448 },
  { name: "Koh Rong", country: "Cambodia", lat: 10.7167, lng: 103.2333 },
  { name: "Koh Sdach", country: "Cambodia", lat: 11.2333, lng: 102.9333 },
  { name: "Kampot", country: "Cambodia", lat: 10.6104, lng: 104.181 },
  { name: "Nacpan Beach", country: "Philippines", lat: 11.2333, lng: 119.4167 },
  { name: "Siargao", country: "Philippines", lat: 9.8482, lng: 126.0458 },
  { name: "Panglao", country: "Philippines", lat: 9.5786, lng: 123.7569 },
  { name: "Dumaguete", country: "Philippines", lat: 9.3068, lng: 123.3054 },
  { name: "Siquijor", country: "Philippines", lat: 9.1989, lng: 123.595 },
  { name: "Manila", country: "Philippines", lat: 14.5995, lng: 120.9842 },
  { name: "Gili Trawangan", country: "Indonesia", lat: -8.35, lng: 116.04 },
  { name: "Kuta Lombok", country: "Indonesia", lat: -8.895, lng: 116.275 },
  { name: "Nusa Lembongan", country: "Indonesia", lat: -8.6814, lng: 115.45 },
  { name: "Uluwatu", country: "Indonesia", lat: -8.829, lng: 115.0848 },
  { name: "Coogee Beach", country: "Australia", lat: -33.9205, lng: 151.2577 },
];

const COUNTRY_COUNT = new Set(LOCATIONS.map((l) => l.country)).size;
const GLOBE_RADIUS = 1;

// ---------- Helpers ----------
function latLngToVec3(lat: number, lng: number, radius = GLOBE_RADIUS): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);
  return new THREE.Vector3(x, y, z);
}

// ---------- Procedural earth texture (no external asset) ----------
function useEarthTexture() {
  return useMemo(() => {
    if (typeof document === "undefined") return null;
    const w = 2048;
    const h = 1024;
    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d")!;

    // ocean base
    ctx.fillStyle = COLOR_OCEAN;
    ctx.fillRect(0, 0, w, h);

    // Continent silhouettes (lat/lng polygon approximation, then converted to equirect xy)
    const project = (lng: number, lat: number): [number, number] => [
      ((lng + 180) / 360) * w,
      ((90 - lat) / 180) * h,
    ];

    const drawShape = (pts: [number, number][]) => {
      ctx.beginPath();
      pts.forEach(([lng, lat], i) => {
        const [x, y] = project(lng, lat);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.closePath();
      ctx.fill();
    };

    ctx.fillStyle = COLOR_LAND;

    // Africa
    drawShape([
      [-17, 35], [-5, 36], [10, 37], [25, 32], [33, 31], [40, 18], [51, 12],
      [42, -1], [40, -12], [35, -22], [28, -34], [18, -34], [12, -16],
      [8, -2], [0, 5], [-8, 5], [-15, 12], [-17, 25], [-17, 35],
    ]);

    // Europe
    drawShape([
      [-10, 36], [-5, 43], [3, 44], [10, 45], [12, 38], [22, 39], [28, 41],
      [38, 42], [55, 50], [60, 60], [50, 68], [25, 68], [10, 60], [0, 55],
      [-8, 50], [-10, 36],
    ]);

    // Asia
    drawShape([
      [40, 42], [55, 45], [70, 38], [78, 30], [88, 28], [95, 28], [105, 25],
      [115, 23], [122, 30], [135, 35], [142, 45], [145, 55], [165, 65],
      [180, 68], [180, 75], [60, 78], [50, 70], [40, 60], [40, 42],
    ]);

    // SE Asia & islands (chunky)
    drawShape([[95, 22], [105, 22], [110, 11], [104, 1], [98, 6], [95, 22]]); // Indochina
    drawShape([[95, 6], [104, 5], [110, -2], [115, -8], [105, -7], [98, 0], [95, 6]]); // Sumatra
    drawShape([[110, -6], [120, -7], [124, -9], [115, -10], [108, -9], [110, -6]]); // Java
    drawShape([[108, 1], [118, 2], [120, -2], [114, -4], [109, -1], [108, 1]]); // Borneo
    drawShape([[118, 8], [126, 9], [128, 5], [122, -1], [118, 5], [118, 8]]); // Philippines/Sulawesi
    drawShape([[120, 18], [124, 18], [125, 8], [121, 7], [120, 18]]); // PH main

    // Australia
    drawShape([
      [113, -22], [122, -18], [130, -12], [137, -12], [142, -10], [148, -19],
      [153, -28], [149, -37], [142, -38], [130, -32], [120, -34], [115, -32],
      [113, -22],
    ]);
    drawShape([[166, -41], [174, -36], [178, -39], [174, -47], [167, -46], [166, -41]]); // NZ

    // North America
    drawShape([
      [-168, 65], [-150, 70], [-130, 70], [-100, 72], [-75, 75], [-60, 70],
      [-55, 55], [-65, 45], [-78, 35], [-82, 28], [-97, 25], [-107, 22],
      [-117, 32], [-125, 40], [-130, 55], [-150, 60], [-168, 65],
    ]);

    // Central America
    drawShape([[-95, 18], [-87, 21], [-80, 9], [-78, 8], [-83, 14], [-95, 18]]);

    // South America
    drawShape([
      [-82, 12], [-72, 12], [-60, 8], [-50, 0], [-38, -8], [-35, -22],
      [-42, -32], [-58, -38], [-72, -52], [-72, -32], [-78, -18], [-80, -5],
      [-82, 2], [-82, 12],
    ]);

    // Greenland
    drawShape([[-50, 60], [-35, 62], [-22, 70], [-30, 82], [-50, 80], [-55, 70], [-50, 60]]);

    // Add noise / texture variance
    const imageData = ctx.getImageData(0, 0, w, h);
    const data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
      const n = (Math.random() - 0.5) * 14;
      data[i] = Math.max(0, Math.min(255, data[i] + n));
      data[i + 1] = Math.max(0, Math.min(255, data[i + 1] + n));
      data[i + 2] = Math.max(0, Math.min(255, data[i + 2] + n));
    }
    ctx.putImageData(imageData, 0, 0);

    // Subtle latitude grid
    ctx.strokeStyle = "rgba(255,255,255,0.04)";
    ctx.lineWidth = 1;
    for (let lat = -80; lat <= 80; lat += 20) {
      const y = ((90 - lat) / 180) * h;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }
    for (let lng = -180; lng <= 180; lng += 20) {
      const x = ((lng + 180) / 360) * w;
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
    }

    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = 4;
    return tex;
  }, []);
}

// ---------- Globe mesh (with auto + manual rotation) ----------
function GlobeScene() {
  const groupRef = useRef<THREE.Group>(null);
  const earthTex = useEarthTexture();
  const { gl, camera } = useThree();

  // rotation state
  const rotation = useRef({ y: -Math.PI * 0.6, x: 0.15 }); // center on SE Asia (~lng 110)
  const velocity = useRef({ y: 0, x: 0 });
  const lastInteract = useRef<number>(-Infinity);
  const dragging = useRef(false);
  const lastPointer = useRef<{ x: number; y: number } | null>(null);

  // mount-in scale
  const mountTime = useRef(performance.now());

  useEffect(() => {
    const dom = gl.domElement;
    dom.style.cursor = "grab";

    const onDown = (e: PointerEvent) => {
      dragging.current = true;
      lastInteract.current = performance.now();
      lastPointer.current = { x: e.clientX, y: e.clientY };
      dom.style.cursor = "grabbing";
      dom.setPointerCapture?.(e.pointerId);
    };
    const onMove = (e: PointerEvent) => {
      if (!dragging.current || !lastPointer.current) return;
      const dx = e.clientX - lastPointer.current.x;
      const dy = e.clientY - lastPointer.current.y;
      lastPointer.current = { x: e.clientX, y: e.clientY };
      const sens = 0.005;
      rotation.current.y += dx * sens;
      rotation.current.x = Math.max(-1.2, Math.min(1.2, rotation.current.x + dy * sens));
      velocity.current.y = dx * sens;
      velocity.current.x = dy * sens;
      lastInteract.current = performance.now();
    };
    const onUp = (e: PointerEvent) => {
      dragging.current = false;
      lastPointer.current = null;
      dom.style.cursor = "grab";
      dom.releasePointerCapture?.(e.pointerId);
      lastInteract.current = performance.now();
    };

    dom.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    return () => {
      dom.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, [gl]);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    const now = performance.now();
    const sinceInteract = now - lastInteract.current;
    const autoMode = sinceInteract > 3000;

    // inertia decay
    velocity.current.y *= 0.94;
    velocity.current.x *= 0.9;

    if (!dragging.current) {
      rotation.current.y += velocity.current.y;
      rotation.current.x += velocity.current.x;
      if (autoMode) {
        // ease back to baseline x slowly
        rotation.current.x += (0.15 - rotation.current.x) * 0.01;
        // gentle ease-in of auto rotation
        const easeIn = Math.min(1, (sinceInteract - 3000) / 1200);
        rotation.current.y += 0.0015 * easeIn;
      }
    }

    groupRef.current.rotation.y = rotation.current.y;
    groupRef.current.rotation.x = rotation.current.x;

    // mount scale animation
    const t = Math.min(1, (now - mountTime.current) / 1200);
    const eased = 1 - Math.pow(1 - t, 3);
    const s = 0.8 + 0.2 * eased;
    groupRef.current.scale.setScalar(s);
  });

  // Pin positions on the surface
  const pinPositions = useMemo(
    () => LOCATIONS.map((l) => latLngToVec3(l.lat, l.lng, GLOBE_RADIUS * 1.005)),
    [],
  );

  // Connection arcs: each pin → 3 nearest + 2 random distant
  const arcs = useMemo(() => {
    const list: { curve: THREE.QuadraticBezierCurve3; key: string; delay: number }[] = [];
    const positions = pinPositions;
    const seen = new Set<string>();
    for (let i = 0; i < positions.length; i++) {
      const dists = positions
        .map((p, j) => ({ j, d: i === j ? Infinity : positions[i].distanceTo(p) }))
        .sort((a, b) => a.d - b.d);
      const nearest = dists.slice(0, 3).map((x) => x.j);
      const distant = dists.slice(-6).slice(0, 4);
      // pick 2 random distant
      const distantPicks = distant.sort(() => Math.random() - 0.5).slice(0, 2).map((x) => x.j);
      const targets = [...nearest, ...distantPicks];
      for (const j of targets) {
        const key = i < j ? `${i}-${j}` : `${j}-${i}`;
        if (seen.has(key)) continue;
        seen.add(key);
        const a = positions[i];
        const b = positions[j];
        const mid = a.clone().add(b).multiplyScalar(0.5);
        const distAB = a.distanceTo(b);
        // arc height grows with distance
        const lift = 1 + Math.min(0.55, distAB * 0.32);
        mid.normalize().multiplyScalar(GLOBE_RADIUS * lift);
        const curve = new THREE.QuadraticBezierCurve3(a.clone(), mid, b.clone());
        list.push({ curve, key, delay: Math.random() });
      }
    }
    return list;
  }, [pinPositions]);

  // Pre-built arc geometries
  const arcGeometries = useMemo(() => {
    return arcs.map(({ curve }) => {
      const pts = curve.getPoints(48);
      const geom = new THREE.BufferGeometry().setFromPoints(pts);
      return geom;
    });
  }, [arcs]);

  // Travelling pulse refs
  const pulseRefs = useRef<(THREE.Mesh | null)[]>([]);
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    arcs.forEach((arc, i) => {
      const mesh = pulseRefs.current[i];
      if (!mesh) return;
      const speed = 0.35;
      const u = ((t * speed + arc.delay) % 1);
      const p = arc.curve.getPoint(u);
      mesh.position.copy(p);
      const tangentDist = Math.abs(0.5 - u) * 2; // brightest at midpoint
      const intensity = 1 - tangentDist;
      const mat = mesh.material as THREE.MeshBasicMaterial;
      mat.opacity = 0.4 + 0.6 * intensity;
    });
  });

  // Pulsing halo refs
  const haloRefs = useRef<(THREE.Mesh | null)[]>([]);
  const haloDelays = useMemo(() => pinPositions.map(() => Math.random() * 2), [pinPositions]);
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    haloRefs.current.forEach((m, i) => {
      if (!m) return;
      const cycle = ((t + haloDelays[i]) % 2.4) / 2.4; // 0-1
      const scale = 1 + cycle * 1.6; // 1 → 2.6 ring
      m.scale.setScalar(scale);
      const mat = m.material as THREE.MeshBasicMaterial;
      mat.opacity = (1 - cycle) * 0.55;
    });
  });

  // Camera framing
  useEffect(() => {
    camera.position.set(0, 0, 3.1);
    camera.lookAt(0, 0, 0);
  }, [camera]);

  return (
    <group ref={groupRef}>
      {/* Earth */}
      <mesh>
        <sphereGeometry args={[GLOBE_RADIUS, 96, 96]} />
        {earthTex ? (
          <meshPhongMaterial map={earthTex} shininess={6} specular={new THREE.Color("#1a0e3d")} />
        ) : (
          <meshPhongMaterial color={COLOR_OCEAN} />
        )}
      </mesh>

      {/* Atmosphere outer glow */}
      <mesh>
        <sphereGeometry args={[GLOBE_RADIUS * 1.06, 64, 64]} />
        <shaderMaterial
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          side={THREE.BackSide}
          uniforms={{ uColor: { value: new THREE.Color(COLOR_ATMOS) } }}
          vertexShader={`
            varying vec3 vNormal;
            void main() {
              vNormal = normalize(normalMatrix * normal);
              gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
          `}
          fragmentShader={`
            varying vec3 vNormal;
            uniform vec3 uColor;
            void main() {
              float intensity = pow(0.72 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.4);
              gl_FragColor = vec4(uColor, 1.0) * intensity;
            }
          `}
        />
      </mesh>

      {/* Pins (front + ghost through-globe) */}
      {pinPositions.map((pos, i) => (
        <group key={`pin-${i}`} position={pos}>
          <mesh>
            <sphereGeometry args={[0.012, 12, 12]} />
            <meshBasicMaterial color={COLOR_PIN} transparent opacity={0.95} />
          </mesh>
          {/* Halo ring */}
          <mesh
            ref={(el) => { haloRefs.current[i] = el; }}
            lookAt={[0, 0, 0] as unknown as THREE.Vector3}
          >
            <ringGeometry args={[0.018, 0.024, 24]} />
            <meshBasicMaterial
              color={COLOR_PIN}
              transparent
              opacity={0.5}
              side={THREE.DoubleSide}
              depthWrite={false}
              blending={THREE.AdditiveBlending}
            />
          </mesh>
        </group>
      ))}

      {/* Through-globe ghost pins */}
      {pinPositions.map((pos, i) => (
        <mesh key={`ghost-${i}`} position={pos.clone().multiplyScalar(0.998)}>
          <sphereGeometry args={[0.009, 8, 8]} />
          <meshBasicMaterial
            color={COLOR_PIN}
            transparent
            opacity={0.3}
            depthWrite={false}
            depthTest={false}
          />
        </mesh>
      ))}

      {/* Arc connections */}
      {arcs.map((arc, i) => {
        const lineObj = new THREE.Line(
          arcGeometries[i],
          new THREE.LineBasicMaterial({
            color: new THREE.Color(COLOR_ATMOS),
            transparent: true,
            opacity: 0.32,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
          }),
        );
        return <primitive key={arc.key} object={lineObj} />;
      })}

      {/* Travelling pulses */}
      {arcs.map((arc, i) => (
        <mesh key={`pulse-${arc.key}`} ref={(el) => { pulseRefs.current[i] = el; }}>
          <sphereGeometry args={[0.014, 10, 10]} />
          <meshBasicMaterial
            color={COLOR_PULSE}
            transparent
            opacity={0.9}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  );
}

// ---------- Starfield ----------
function Starfield() {
  const ref = useRef<THREE.Points>(null);
  const geometry = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const N = 800;
    const positions = new Float32Array(N * 3);
    const sizes = new Float32Array(N);
    for (let i = 0; i < N; i++) {
      // distribute on a far sphere
      const u = Math.random();
      const v = Math.random();
      const theta = 2 * Math.PI * u;
      const phi = Math.acos(2 * v - 1);
      const r = 14 + Math.random() * 10;
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
      sizes[i] = 0.01 + Math.random() * 0.025;
    }
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    g.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));
    return g;
  }, []);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const m = ref.current.material as THREE.PointsMaterial;
    m.opacity = 0.65 + Math.sin(clock.getElapsedTime() * 0.7) * 0.1;
  });

  return (
    <points ref={ref} geometry={geometry}>
      <pointsMaterial
        color="#ffffff"
        size={0.04}
        sizeAttenuation
        transparent
        opacity={0.7}
        depthWrite={false}
      />
    </points>
  );
}

// ---------- Main exported component ----------
export default function MadMonkeyGlobe() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.05 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative h-[420px] w-full overflow-hidden bg-black sm:h-[520px] lg:h-[640px]"
      style={{ touchAction: "none" }}
    >
      {/* Brand UI overlay */}
      <div className="pointer-events-none absolute left-5 top-5 z-10 select-none text-white sm:left-7 sm:top-7">
        <p
          className="text-[12px] font-extrabold leading-[1.05] tracking-tight opacity-90 sm:text-[14px]"
          style={{ fontFamily: "Fredoka, Nunito, system-ui, sans-serif" }}
        >
          mad monkey
          <br />
          hostels
        </p>
        <p
          className="mt-3 text-[18px] font-extrabold uppercase leading-[0.95] tracking-tight sm:text-[22px]"
          style={{ fontFamily: "Fredoka, Nunito, system-ui, sans-serif" }}
        >
          around the world
        </p>
      </div>

      {/* Counter */}
      <div className="pointer-events-none absolute bottom-5 right-5 z-10 flex items-center gap-2 text-white sm:bottom-7 sm:right-7">
        <span className="relative flex size-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-300 opacity-75" />
          <span className="relative inline-flex size-2 rounded-full bg-cyan-300" />
        </span>
        <p
          className="text-[11px] font-extrabold uppercase tracking-[0.18em] sm:text-[12px]"
          style={{ fontFamily: "Fredoka, Nunito, system-ui, sans-serif" }}
        >
          {LOCATIONS.length}+ locations / {COUNTRY_COUNT} countries
        </p>
      </div>

      {mounted ? (
        <Canvas
          dpr={[1, 2]}
          camera={{ position: [0, 0, 3.1], fov: 45 }}
          gl={{ antialias: true, alpha: false }}
          frameloop={visible ? "always" : "never"}
          onCreated={({ scene }) => {
            scene.background = new THREE.Color(COLOR_BG);
          }}
        >
          <ambientLight intensity={0.55} />
          <directionalLight position={[5, 3, 5]} intensity={0.9} color="#cdb8ff" />
          <directionalLight position={[-4, -2, -3]} intensity={0.25} color={COLOR_ATMOS} />
          <Starfield />
          <GlobeScene />
        </Canvas>
      ) : null}
    </div>
  );
}
