/**
 * MadMonkeyLiveNetwork.tsx
 * ----------------------------------------------------------------------------
 * Interactive 3D Live Network visualisation for the Mad Monkey investor page.
 * Built with React Three Fiber + drei + postprocessing.
 *
 * ASSETS TO REPLACE / SWAP IN:
 *   1. Monkey head sprite — currently `src/assets/mad-monkey-head.png`
 *      (the silhouette uploaded by the client). Swap with the official
 *      brand monkey-head PNG (square, transparent background).
 *   2. Hostel detail photos — the click-to-zoom card has a placeholder
 *      image slot; wire `hostel.photo` into the `HOSTELS` array below
 *      with a CDN URL or imported asset per hostel.
 *   3. Hostel taglines — replace the placeholder one-liners on each
 *      hostel object with the real brand tagline.
 *   4. Country borders — uses simplified inline polygons for SE Asia +
 *      Australia. For higher fidelity, replace `COUNTRY_SHAPES` with
 *      a GeoJSON loader (Natural Earth 50m admin-0 simplified).
 * ----------------------------------------------------------------------------
 */

import {
  Suspense,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import { Canvas, useFrame, useThree, type ThreeEvent } from "@react-three/fiber";
import { Html, Instance, Instances, OrthographicCamera, useTexture } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette, ChromaticAberration } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import * as THREE from "three";

import monkeyHeadAsset from "../assets/mad-monkey-head.png";

// ---------------------------------------------------------------------------
// Brand palette
// ---------------------------------------------------------------------------
const C = {
  oceanDeep: "#2A1B5C",
  landMid: "#4A3A8C",
  landTop: "#5A4A9C",
  brandBlue: "#6FB3E8",
  cyan: "#7DF9FF",
  green: "#4ADE80",
  white: "#FFFFFF",
};

// ---------------------------------------------------------------------------
// Geo projection helpers (equirectangular centred over SE Asia)
// ---------------------------------------------------------------------------
const LON_CENTER = 115;
const LAT_CENTER = 5;
const SCALE = 0.42; // world units per degree

function project(lat: number, lng: number): [number, number] {
  // Returns [x, z] in scene coordinates. y is up.
  const x = (lng - LON_CENTER) * SCALE;
  const z = -(lat - LAT_CENTER) * SCALE;
  return [x, z];
}

// ---------------------------------------------------------------------------
// Hostels
// ---------------------------------------------------------------------------
type Hostel = {
  id: string;
  name: string;
  country: string;
  lat: number;
  lng: number;
  tagline: string;
  anchor?: boolean; // country anchor for backbone mesh
};

const HOSTELS: Hostel[] = [
  { id: "bkk", name: "Mad Monkey Bangkok", country: "Thailand", lat: 13.7563, lng: 100.5018, tagline: "the heartbeat of khao san road", anchor: true },
  { id: "cnx", name: "Mad Monkey Chiang Mai", country: "Thailand", lat: 18.7883, lng: 98.9853, tagline: "northern jungle base camp" },
  { id: "pai", name: "Mad Monkey Pai", country: "Thailand", lat: 19.3583, lng: 98.4419, tagline: "mountain town magic" },
  { id: "hkt", name: "Mad Monkey Phuket", country: "Thailand", lat: 7.8804, lng: 98.3923, tagline: "andaman sunsets, every night" },

  { id: "lpq", name: "Mad Monkey Luang Prabang", country: "Laos", lat: 19.8845, lng: 102.1348, tagline: "temples and mekong mornings" },
  { id: "vte", name: "Mad Monkey Vang Vieng", country: "Laos", lat: 18.9226, lng: 102.4496, tagline: "river tubing legends", anchor: true },

  { id: "han", name: "Mad Monkey Hanoi", country: "Vietnam", lat: 21.0285, lng: 105.8542, tagline: "old quarter, late nights", anchor: true },
  { id: "had", name: "Mad Monkey Hoi An", country: "Vietnam", lat: 15.8801, lng: 108.3380, tagline: "lantern light and tailored linen" },
  { id: "hag", name: "Mad Monkey Ha Giang", country: "Vietnam", lat: 22.8233, lng: 104.9836, tagline: "loop riders welcome" },

  { id: "pnh", name: "Mad Monkey Phnom Penh", country: "Cambodia", lat: 11.5564, lng: 104.9282, tagline: "the original mad monkey", anchor: true },
  { id: "rep", name: "Mad Monkey Siem Reap", country: "Cambodia", lat: 13.3671, lng: 103.8448, tagline: "angkor sunrise crew" },
  { id: "kro", name: "Mad Monkey Koh Rong", country: "Cambodia", lat: 10.7167, lng: 103.2333, tagline: "barefoot island dorms" },
  { id: "ksd", name: "Mad Monkey Koh Sdach", country: "Cambodia", lat: 11.2333, lng: 102.9333, tagline: "private island living" },
  { id: "kmt", name: "Mad Monkey Kampot", country: "Cambodia", lat: 10.6104, lng: 104.1810, tagline: "river breeze and pepper farms" },

  { id: "npb", name: "Mad Monkey Nacpan Beach", country: "Philippines", lat: 11.2333, lng: 119.4167, tagline: "four kilometres of palawan sand" },
  { id: "iao", name: "Mad Monkey Siargao", country: "Philippines", lat: 9.8482, lng: 126.0458, tagline: "cloud nine surf base" },
  { id: "tag", name: "Mad Monkey Panglao", country: "Philippines", lat: 9.5786, lng: 123.7569, tagline: "bohol's beach corner" },
  { id: "dgt", name: "Mad Monkey Dumaguete", country: "Philippines", lat: 9.3068, lng: 123.3054, tagline: "dolphins at dawn" },
  { id: "siq", name: "Mad Monkey Siquijor", country: "Philippines", lat: 9.1989, lng: 123.5950, tagline: "the mystic island" },
  { id: "mnl", name: "Mad Monkey Manila", country: "Philippines", lat: 14.5995, lng: 120.9842, tagline: "gateway to the archipelago", anchor: true },

  { id: "gil", name: "Mad Monkey Gili Trawangan", country: "Indonesia", lat: -8.3500, lng: 116.0400, tagline: "no cars, all reef", anchor: true },
  { id: "klb", name: "Mad Monkey Kuta Lombok", country: "Indonesia", lat: -8.8950, lng: 116.2750, tagline: "left point lineups" },
  { id: "nle", name: "Mad Monkey Nusa Lembongan", country: "Indonesia", lat: -8.6814, lng: 115.4500, tagline: "manta point mornings" },
  { id: "ulw", name: "Mad Monkey Uluwatu", country: "Indonesia", lat: -8.8290, lng: 115.0848, tagline: "cliffside barrels" },

  { id: "syd", name: "Mad Monkey Coogee Beach", country: "Australia", lat: -33.9205, lng: 151.2577, tagline: "sydney's eastern beaches base", anchor: true },
];

// Classic backpacker trails (bidirectional implied)
const TRAILS: Array<[string, string, number]> = [
  ["bkk", "cnx", 3],
  ["cnx", "pai", 3],
  ["bkk", "rep", 3],
  ["rep", "pnh", 3],
  ["pnh", "had", 2],
  ["han", "had", 3],
  ["had", "han", 3],
  ["vte", "lpq", 3],
  ["mnl", "iao", 3],
  ["iao", "tag", 2],
  ["gil", "klb", 3],
  ["nle", "ulw", 2],
  ["bkk", "hkt", 1],
  ["pnh", "kmt", 1],
  ["kmt", "kro", 1],
  ["mnl", "npb", 1],
  ["syd", "gil", 1],
];

// ---------------------------------------------------------------------------
// Simplified country shapes (lat/lng polygons). Approximate outlines —
// good enough for stylised "mission control" feel. Replace with real
// GeoJSON for higher fidelity.
// ---------------------------------------------------------------------------
const COUNTRY_SHAPES: Record<string, Array<[number, number][]>> = {
  Thailand: [[
    [20.4, 99.1], [20.0, 100.6], [18.0, 102.1], [16.4, 102.5], [14.4, 103.0], [14.5, 105.4],
    [12.6, 102.7], [11.6, 102.9], [9.5, 99.5], [7.5, 100.1], [6.5, 100.8], [6.7, 101.3],
    [8.0, 99.0], [9.5, 98.5], [11.0, 98.5], [13.0, 99.0], [15.0, 98.5], [17.0, 97.6],
    [19.0, 98.0], [20.4, 99.1],
  ]],
  Laos: [[
    [22.5, 100.1], [22.0, 102.1], [21.7, 103.5], [20.0, 104.1], [18.5, 105.4],
    [17.5, 105.0], [15.7, 107.3], [14.6, 107.6], [14.3, 105.6], [15.5, 104.4],
    [17.5, 104.7], [18.0, 102.1], [19.5, 100.5], [20.5, 100.1], [22.5, 100.1],
  ]],
  Vietnam: [[
    [23.3, 105.3], [23.0, 106.6], [22.0, 108.1], [20.5, 106.7], [19.0, 105.7], [17.8, 106.5],
    [16.5, 107.6], [14.5, 109.2], [12.5, 109.4], [10.5, 107.5], [9.0, 105.3], [10.5, 104.5],
    [14.0, 107.6], [15.5, 107.3], [17.5, 105.0], [18.5, 105.4], [20.0, 104.1], [21.7, 103.5],
    [22.0, 102.1], [22.5, 102.6], [23.3, 105.3],
  ]],
  Cambodia: [[
    [14.5, 105.4], [14.6, 107.6], [11.7, 107.5], [10.4, 104.6], [10.7, 103.0],
    [11.6, 102.9], [12.6, 102.7], [14.4, 103.0], [14.5, 105.4],
  ]],
  Myanmar: [[
    [28.3, 97.4], [27.5, 98.6], [25.5, 98.9], [23.7, 98.8], [21.0, 100.7], [20.0, 100.1],
    [19.5, 97.9], [17.0, 97.6], [15.0, 98.5], [13.0, 99.0], [11.0, 98.5], [10.0, 98.5],
    [12.0, 97.5], [14.0, 96.5], [16.0, 94.5], [16.5, 94.0], [19.5, 93.5], [21.0, 92.0],
    [23.0, 93.5], [25.5, 95.0], [27.5, 96.0], [28.3, 97.4],
  ]],
  Malaysia: [[
    [6.7, 100.1], [6.5, 100.8], [6.0, 102.5], [4.5, 103.5], [2.5, 103.7], [1.3, 103.5],
    [1.5, 102.0], [3.5, 100.3], [5.5, 100.2], [6.7, 100.1],
  ], [
    [7.0, 115.5], [6.5, 117.5], [4.5, 118.5], [2.0, 117.0], [1.5, 110.5], [3.0, 109.5],
    [5.0, 115.0], [7.0, 115.5],
  ]],
  Indonesia: [[
    [5.5, 95.3], [4.5, 98.0], [2.0, 100.5], [-1.0, 102.5], [-3.5, 105.5], [-5.5, 105.5],
    [-7.0, 107.5], [-8.5, 113.0], [-8.7, 116.5], [-8.8, 119.0], [-7.5, 121.0], [-6.5, 119.5],
    [-4.5, 122.0], [-3.5, 119.0], [-1.5, 118.5], [0.5, 117.0], [2.0, 113.5], [1.5, 110.0],
    [3.0, 108.0], [5.0, 96.5], [5.5, 95.3],
  ], [
    [-1.5, 130.5], [-3.5, 134.0], [-5.5, 137.5], [-9.0, 140.5], [-8.0, 138.0], [-6.0, 134.0],
    [-3.5, 132.5], [-1.5, 130.5],
  ]],
  Philippines: [[
    [18.5, 121.8], [18.0, 122.5], [16.0, 122.2], [14.5, 122.5], [13.8, 124.5], [12.5, 125.5],
    [10.0, 126.5], [7.0, 126.5], [5.5, 125.5], [6.0, 122.0], [8.5, 123.0], [10.0, 122.5],
    [12.0, 121.0], [13.5, 121.0], [15.5, 120.0], [17.5, 120.5], [18.5, 121.8],
  ]],
  Australia: [[
    [-10.7, 142.5], [-12.5, 136.5], [-14.5, 135.0], [-15.5, 130.5], [-14.5, 128.5], [-15.5, 124.5],
    [-18.0, 122.0], [-22.0, 113.5], [-26.0, 113.5], [-32.0, 115.5], [-35.0, 117.5], [-35.5, 123.5],
    [-32.0, 133.5], [-35.5, 138.5], [-38.5, 141.5], [-39.0, 146.5], [-37.5, 149.5], [-34.0, 151.0],
    [-28.5, 153.5], [-22.5, 150.5], [-19.0, 148.0], [-16.5, 145.5], [-12.5, 143.5], [-10.7, 142.5],
  ]],
};

// ---------------------------------------------------------------------------
// HUD Overlay
// ---------------------------------------------------------------------------
function HUD() {
  const [guests, setGuests] = useState(1_204_318);
  useEffect(() => {
    const id = setInterval(() => {
      setGuests((g) => g + 1 + Math.floor(Math.random() * 4));
    }, 3000);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      {/* Top left wordmark */}
      <div
        className="pointer-events-none absolute left-4 top-4 z-10 sm:left-6 sm:top-6"
        style={{ fontFamily: "'Fredoka', 'Nunito', system-ui, sans-serif" }}
      >
        <div className="text-white" style={{ fontWeight: 800, letterSpacing: "-0.02em", lineHeight: 0.95 }}>
          <div className="text-[20px] sm:text-[26px] lg:text-[30px]">mad monkey</div>
          <div className="text-[20px] sm:text-[26px] lg:text-[30px] opacity-90">live network</div>
        </div>
        <div className="mt-2 max-w-[260px] text-[10px] uppercase tracking-[0.18em] text-white/55 sm:text-[11px]">
          real-time view of our south east asia operation
        </div>
      </div>

      {/* Top right glassmorphic stats */}
      <div
        className="pointer-events-none absolute right-4 top-4 z-10 rounded-lg border p-3 backdrop-blur-md sm:right-6 sm:top-6 sm:p-4"
        style={{
          background: "rgba(20, 10, 50, 0.6)",
          borderColor: "rgba(111, 179, 232, 0.3)",
          fontFamily: "'JetBrains Mono', 'Space Mono', ui-monospace, monospace",
          color: C.white,
          minWidth: 220,
        }}
      >
        <div className="text-[10px] font-bold uppercase tracking-[0.18em] sm:text-[11px]">
          Mad Monkey Network · Live
        </div>
        <div className="my-2 h-px w-full" style={{ background: "rgba(111,179,232,0.25)" }} />
        <div className="space-y-1 text-[11px] leading-relaxed sm:text-[12px]">
          <div>23 hostels · 7 countries</div>
          <div>{guests.toLocaleString("en-US")} guests since 2010</div>
          <div className="flex items-center gap-2">
            <span>Network status:</span>
            <span
              className="inline-block h-2 w-2 rounded-full"
              style={{
                background: C.green,
                boxShadow: `0 0 8px ${C.green}`,
                animation: "mmnPulseDot 1.8s ease-in-out infinite",
              }}
            />
            <span style={{ color: C.green }}>active</span>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes mmnPulseDot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.55; transform: scale(0.85); }
        }
      `}</style>
    </>
  );
}

// ---------------------------------------------------------------------------
// Country mesh — extruded simplified polygons
// ---------------------------------------------------------------------------
function Countries() {
  const { topGeometries, sideGeometries } = useMemo(() => {
    const tops: THREE.BufferGeometry[] = [];
    const sides: THREE.BufferGeometry[] = [];
    const HEIGHT = 0.3;

    for (const polygons of Object.values(COUNTRY_SHAPES)) {
      for (const poly of polygons) {
        const shape = new THREE.Shape();
        poly.forEach(([lat, lng], i) => {
          const [x, z] = project(lat, lng);
          if (i === 0) shape.moveTo(x, -z); // shape is in XY then rotated
          else shape.lineTo(x, -z);
        });
        const geo = new THREE.ExtrudeGeometry(shape, {
          depth: HEIGHT,
          bevelEnabled: true,
          bevelThickness: 0.04,
          bevelSize: 0.04,
          bevelSegments: 1,
          curveSegments: 1,
        });
        geo.rotateX(-Math.PI / 2);
        geo.translate(0, 0, 0);
        tops.push(geo);
        sides.push(geo);
      }
    }
    return { topGeometries: tops, sideGeometries: sides };
  }, []);

  return (
    <group>
      {topGeometries.map((g, i) => (
        <mesh key={i} geometry={g} castShadow receiveShadow>
          <meshStandardMaterial
            color={C.landMid}
            roughness={0.85}
            metalness={0.05}
            emissive={C.landMid}
            emissiveIntensity={0.08}
          />
        </mesh>
      ))}
      {/* Top-face highlight: a slightly inset overlay using same geometry */}
      {sideGeometries.map((g, i) => (
        <mesh key={`top-${i}`} geometry={g} position={[0, 0.001, 0]}>
          <meshStandardMaterial
            color={C.landTop}
            roughness={0.7}
            metalness={0.1}
            transparent
            opacity={0.55}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  );
}

// ---------------------------------------------------------------------------
// Ocean plane with animated lat/long grid
// ---------------------------------------------------------------------------
function Ocean() {
  const matRef = useRef<THREE.ShaderMaterial>(null);
  useFrame((state) => {
    if (matRef.current) {
      matRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uOcean: { value: new THREE.Color(C.oceanDeep) },
      uGrid: { value: new THREE.Color(C.brandBlue) },
    }),
    [],
  );

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
      <planeGeometry args={[120, 90, 1, 1]} />
      <shaderMaterial
        ref={matRef}
        uniforms={uniforms}
        vertexShader={`
          varying vec2 vUv;
          varying vec3 vWorldPos;
          void main() {
            vUv = uv;
            vec4 wp = modelMatrix * vec4(position, 1.0);
            vWorldPos = wp.xyz;
            gl_Position = projectionMatrix * viewMatrix * wp;
          }
        `}
        fragmentShader={`
          uniform float uTime;
          uniform vec3 uOcean;
          uniform vec3 uGrid;
          varying vec3 vWorldPos;

          float gridLine(float coord, float spacing, float thickness) {
            float g = abs(fract(coord / spacing - 0.5) - 0.5) / fwidth(coord / spacing);
            return 1.0 - min(g / thickness, 1.0);
          }

          void main() {
            // Grid in world XZ
            float gx = gridLine(vWorldPos.x, 2.0, 1.2);
            float gz = gridLine(vWorldPos.z, 2.0, 1.2);
            float grid = max(gx, gz);

            // Pulse every ~6s
            float pulse = 0.7 + 0.3 * sin(uTime * (6.2831 / 6.0));

            vec3 col = uOcean;
            col = mix(col, uGrid, grid * 0.08 * pulse);

            // Vignette toward edges
            float r = length(vWorldPos.xz) / 45.0;
            float vig = smoothstep(1.0, 0.3, r);
            col *= mix(0.35, 1.0, vig);

            gl_FragColor = vec4(col, 1.0);
          }
        `}
      />
    </mesh>
  );
}

// ---------------------------------------------------------------------------
// Hostel node (ring + beam + monkey sprite)
// ---------------------------------------------------------------------------
type NodeProps = {
  hostel: Hostel;
  monkeyTex: THREE.Texture;
  hovered: boolean;
  selected: boolean;
  onHover: (h: Hostel | null, e?: ThreeEvent<PointerEvent>) => void;
  onSelect: (h: Hostel) => void;
  pulseOffset: number;
  triggerCheckin: number; // increments to fire pulse
};

function HostelNode({
  hostel,
  monkeyTex,
  hovered,
  selected,
  onHover,
  onSelect,
  pulseOffset,
  triggerCheckin,
}: NodeProps) {
  const [x, z] = project(hostel.lat, hostel.lng);
  const groupRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const beamRef = useRef<THREE.Mesh>(null);
  const checkinRingRef = useRef<THREE.Mesh>(null);
  const checkinMatRef = useRef<THREE.MeshBasicMaterial>(null);
  const [checkinT, setCheckinT] = useState(-1); // -1 = inactive
  const [floatLabel, setFloatLabel] = useState<{ value: string; t: number } | null>(null);

  useEffect(() => {
    if (triggerCheckin <= 0) return;
    setCheckinT(0);
    const v = [1, 1, 1, 3, 5][Math.floor(Math.random() * 5)];
    setFloatLabel({ value: `+${v}`, t: 0 });
  }, [triggerCheckin]);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    if (ringRef.current) {
      const s = 1.0 + 0.075 * Math.sin(t * (Math.PI) + pulseOffset) + 0.075;
      const base = 1.0 + 0.075 * (Math.sin(t * Math.PI + pulseOffset) * 0.5 + 0.5);
      ringRef.current.scale.setScalar(base);
      void s;
    }
    // Hover lift
    if (groupRef.current) {
      const targetY = hovered || selected ? 0.2 : 0;
      groupRef.current.position.y += (targetY - groupRef.current.position.y) * Math.min(1, delta * 8);
    }
    // Beam intensity boost
    if (beamRef.current) {
      const m = beamRef.current.material as THREE.ShaderMaterial;
      const target = hovered || selected ? 1.0 : 0.7;
      m.uniforms.uIntensity.value += (target - m.uniforms.uIntensity.value) * Math.min(1, delta * 6);
    }
    // Check-in expanding ring
    if (checkinT >= 0) {
      const next = checkinT + delta;
      if (next >= 1.5) {
        setCheckinT(-1);
      } else {
        setCheckinT(next);
        const k = next / 1.5;
        const scale = 1 + k * 2; // 1 -> 3
        if (checkinRingRef.current) checkinRingRef.current.scale.setScalar(scale);
        if (checkinMatRef.current) checkinMatRef.current.opacity = 0.9 * (1 - k);
      }
    }
    // Floating label
    if (floatLabel) {
      const next = floatLabel.t + delta;
      if (next >= 1.5) setFloatLabel(null);
      else setFloatLabel({ value: floatLabel.value, t: next });
    }
  });

  // Beam shader
  const beamUniforms = useMemo(
    () => ({
      uColor: { value: new THREE.Color(C.brandBlue) },
      uIntensity: { value: 0.7 },
    }),
    [],
  );

  return (
    <group ref={groupRef} position={[x, 0.32, z]}>
      {/* Base ring (interactive hit target enlarged) */}
      <mesh
        ref={ringRef}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0.005, 0]}
        onPointerOver={(e) => {
          e.stopPropagation();
          document.body.style.cursor = "pointer";
          onHover(hostel, e);
        }}
        onPointerOut={(e) => {
          e.stopPropagation();
          document.body.style.cursor = "";
          onHover(null);
        }}
        onClick={(e) => {
          e.stopPropagation();
          onSelect(hostel);
        }}
      >
        <ringGeometry args={[0.16, 0.22, 48]} />
        <meshBasicMaterial
          color={C.brandBlue}
          transparent
          opacity={0.9}
          side={THREE.DoubleSide}
          toneMapped={false}
        />
      </mesh>

      {/* Inner glow disc */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.004, 0]}>
        <circleGeometry args={[0.18, 32]} />
        <meshBasicMaterial color={C.brandBlue} transparent opacity={0.18} toneMapped={false} />
      </mesh>

      {/* Check-in expanding ring */}
      <mesh ref={checkinRingRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.006, 0]} visible={checkinT >= 0}>
        <ringGeometry args={[0.18, 0.22, 48]} />
        <meshBasicMaterial
          ref={checkinMatRef}
          color={C.cyan}
          transparent
          opacity={0}
          side={THREE.DoubleSide}
          toneMapped={false}
        />
      </mesh>

      {/* Vertical beam */}
      <mesh ref={beamRef} position={[0, 1.0, 0]}>
        <cylinderGeometry args={[0.025, 0.025, 2, 12, 1, true]} />
        <shaderMaterial
          uniforms={beamUniforms}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          side={THREE.DoubleSide}
          vertexShader={`
            varying float vY;
            void main() {
              vY = uv.y;
              gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
          `}
          fragmentShader={`
            uniform vec3 uColor;
            uniform float uIntensity;
            varying float vY;
            void main() {
              float a = pow(1.0 - vY, 1.6) * uIntensity;
              gl_FragColor = vec4(uColor, a);
            }
          `}
        />
      </mesh>

      {/* Monkey sprite floating above */}
      <sprite position={[0, 0.55, 0]} scale={[0.42, 0.42, 0.42]}>
        <spriteMaterial map={monkeyTex} transparent depthWrite={false} toneMapped={false} />
      </sprite>

      {/* Floating +N label */}
      {floatLabel && (
        <Html position={[0, 0.85 + floatLabel.t * 0.5, 0]} center distanceFactor={10} transform={false}>
          <div
            style={{
              opacity: 1 - floatLabel.t / 1.5,
              color: C.cyan,
              fontFamily: "'JetBrains Mono', monospace",
              fontWeight: 700,
              fontSize: 14,
              textShadow: `0 0 8px ${C.cyan}`,
              pointerEvents: "none",
              whiteSpace: "nowrap",
            }}
          >
            {floatLabel.value}
          </div>
        </Html>
      )}
    </group>
  );
}

// ---------------------------------------------------------------------------
// Static infrastructure mesh (4 nearest neighbours + backbone)
// ---------------------------------------------------------------------------
function NetworkMesh({ highlightFromId }: { highlightFromId: string | null }) {
  const segments = useMemo(() => {
    const segs: Array<{ a: Hostel; b: Hostel; key: string }> = [];
    const seen = new Set<string>();
    const pos = HOSTELS.map((h) => ({ h, p: project(h.lat, h.lng) }));
    for (const { h, p } of pos) {
      const dists = pos
        .filter((q) => q.h.id !== h.id)
        .map((q) => ({ h: q.h, d: Math.hypot(q.p[0] - p[0], q.p[1] - p[1]) }))
        .sort((a, b) => a.d - b.d)
        .slice(0, 4);
      for (const n of dists) {
        const key = [h.id, n.h.id].sort().join("-");
        if (seen.has(key)) continue;
        seen.add(key);
        segs.push({ a: h, b: n.h, key });
      }
    }
    // Backbone between anchors
    const anchors = HOSTELS.filter((h) => h.anchor);
    for (let i = 0; i < anchors.length; i++) {
      for (let j = i + 1; j < anchors.length; j++) {
        const key = [anchors[i].id, anchors[j].id].sort().join("-");
        if (seen.has(key)) continue;
        seen.add(key);
        segs.push({ a: anchors[i], b: anchors[j], key });
      }
    }
    return segs;
  }, []);

  return (
    <group>
      {segments.map(({ a, b, key }) => {
        const [ax, az] = project(a.lat, a.lng);
        const [bx, bz] = project(b.lat, b.lng);
        const points = new Float32Array([ax, 0.34, az, bx, 0.34, bz]);
        const isHot = highlightFromId === a.id || highlightFromId === b.id;
        return (
          <line key={key}>
            <bufferGeometry>
              <bufferAttribute attach="attributes-position" args={[points, 3]} />
            </bufferGeometry>
            <lineBasicMaterial
              color={isHot ? C.cyan : C.brandBlue}
              transparent
              opacity={isHot ? 0.85 : 0.15}
              blending={THREE.AdditiveBlending}
              depthWrite={false}
              toneMapped={false}
            />
          </line>
        );
      })}
    </group>
  );
}

// ---------------------------------------------------------------------------
// Live travellers — animated dots along bezier arcs
// ---------------------------------------------------------------------------
type Traveller = {
  id: number;
  ax: number; ay: number; az: number;
  bx: number; by: number; bz: number;
  cx: number; cy: number; cz: number;
  t: number;
  dur: number;
};

function Travellers({ spawnRate }: { spawnRate: number }) {
  const MAX = 40;
  const ref = useRef<THREE.InstancedMesh>(null);
  const trailRef = useRef<THREE.Group>(null);
  const travellers = useRef<Traveller[]>([]);
  const idCounter = useRef(0);
  const spawnTimer = useRef(0);
  const tmp = useMemo(() => new THREE.Object3D(), []);

  // Pre-compute curves between hostel pairs by id
  const hostelById = useMemo(() => {
    const m = new Map<string, Hostel>();
    HOSTELS.forEach((h) => m.set(h.id, h));
    return m;
  }, []);

  const spawnOne = () => {
    let from: Hostel, to: Hostel;
    if (Math.random() < 0.55) {
      // Trail-weighted pick
      const totalWeight = TRAILS.reduce((s, t) => s + t[2], 0);
      let r = Math.random() * totalWeight;
      let pick = TRAILS[0];
      for (const t of TRAILS) {
        r -= t[2];
        if (r <= 0) { pick = t; break; }
      }
      from = hostelById.get(pick[0])!;
      to = hostelById.get(pick[1])!;
      if (Math.random() < 0.5) [from, to] = [to, from];
    } else {
      from = HOSTELS[Math.floor(Math.random() * HOSTELS.length)];
      to = HOSTELS[Math.floor(Math.random() * HOSTELS.length)];
      if (from.id === to.id) return;
    }
    const [ax, az] = project(from.lat, from.lng);
    const [bx, bz] = project(to.lat, to.lng);
    const dist = Math.hypot(bx - ax, bz - az);
    const peak = Math.min(1.4, 0.4 + dist * 0.06);
    const cx = (ax + bx) / 2;
    const cz = (az + bz) / 2;
    const cy = 0.4 + peak;
    const dur = 2.2 + dist * 0.05 + Math.random() * 1.0;
    travellers.current.push({
      id: idCounter.current++,
      ax, ay: 0.4, az,
      bx, by: 0.4, bz,
      cx, cy, cz,
      t: 0, dur,
    });
    if (travellers.current.length > MAX) travellers.current.shift();
  };

  useFrame((_, delta) => {
    spawnTimer.current += delta;
    const spawnInterval = 1 / spawnRate;
    while (spawnTimer.current >= spawnInterval) {
      spawnTimer.current -= spawnInterval;
      spawnOne();
    }

    // Update positions
    const list = travellers.current;
    for (let i = list.length - 1; i >= 0; i--) {
      const tr = list[i];
      tr.t += delta;
      if (tr.t >= tr.dur) {
        list.splice(i, 1);
      }
    }

    if (!ref.current) return;
    const mesh = ref.current;
    for (let i = 0; i < MAX; i++) {
      const tr = list[i];
      if (!tr) {
        tmp.position.set(0, -100, 0);
        tmp.scale.setScalar(0);
      } else {
        const u = tr.t / tr.dur;
        // Quadratic bezier
        const inv = 1 - u;
        const x = inv * inv * tr.ax + 2 * inv * u * tr.cx + u * u * tr.bx;
        const y = inv * inv * tr.ay + 2 * inv * u * tr.cy + u * u * tr.by;
        const z = inv * inv * tr.az + 2 * inv * u * tr.cz + u * u * tr.bz;
        tmp.position.set(x, y, z);
        tmp.scale.setScalar(1);
      }
      tmp.updateMatrix();
      mesh.setMatrixAt(i, tmp.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;

    // Trails: rebuild lightweight line geometry per traveller
    if (trailRef.current) {
      const group = trailRef.current;
      while (group.children.length < list.length) {
        const geom = new THREE.BufferGeometry();
        geom.setAttribute("position", new THREE.BufferAttribute(new Float32Array(6 * 3), 3));
        const colors = new Float32Array(6 * 3);
        geom.setAttribute("color", new THREE.BufferAttribute(colors, 3));
        const mat = new THREE.LineBasicMaterial({
          vertexColors: true,
          transparent: true,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
          toneMapped: false,
        });
        const line = new THREE.Line(geom, mat);
        group.add(line);
      }
      while (group.children.length > list.length) {
        const child = group.children.pop();
        if (child) {
          (child as THREE.Line).geometry.dispose();
          ((child as THREE.Line).material as THREE.Material).dispose();
        }
      }
      const cyanCol = new THREE.Color(C.cyan);
      for (let i = 0; i < list.length; i++) {
        const tr = list[i];
        const line = group.children[i] as THREE.Line;
        const posAttr = line.geometry.getAttribute("position") as THREE.BufferAttribute;
        const colAttr = line.geometry.getAttribute("color") as THREE.BufferAttribute;
        const SEGS = 6;
        const tailSpan = 0.18;
        for (let s = 0; s < SEGS; s++) {
          const su = Math.max(0, tr.t / tr.dur - (s / (SEGS - 1)) * tailSpan);
          const inv = 1 - su;
          const x = inv * inv * tr.ax + 2 * inv * su * tr.cx + su * su * tr.bx;
          const y = inv * inv * tr.ay + 2 * inv * su * tr.cy + su * su * tr.by;
          const z = inv * inv * tr.az + 2 * inv * su * tr.cz + su * su * tr.bz;
          posAttr.setXYZ(s, x, y, z);
          const fade = 1 - s / (SEGS - 1);
          colAttr.setXYZ(s, cyanCol.r * fade, cyanCol.g * fade, cyanCol.b * fade);
        }
        posAttr.needsUpdate = true;
        colAttr.needsUpdate = true;
        line.geometry.computeBoundingSphere();
      }
    }
  });

  return (
    <group>
      <instancedMesh ref={ref} args={[undefined, undefined, MAX]}>
        <sphereGeometry args={[0.08, 12, 12]} />
        <meshBasicMaterial color={C.cyan} toneMapped={false} />
      </instancedMesh>
      <group ref={trailRef} />
    </group>
  );
}

// ---------------------------------------------------------------------------
// Ambient floating ocean particles + stars
// ---------------------------------------------------------------------------
function AmbientParticles() {
  const COUNT = 200;
  const ref = useRef<THREE.Points>(null);
  const { positions, opacities } = useMemo(() => {
    const pos = new Float32Array(COUNT * 3);
    const op = new Float32Array(COUNT);
    for (let i = 0; i < COUNT; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 80;
      pos[i * 3 + 1] = 0.05 + Math.random() * 0.15;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 60;
      op[i] = 0.1 + Math.random() * 0.3;
    }
    return { positions: pos, opacities: op };
  }, []);

  useFrame((_, delta) => {
    if (!ref.current) return;
    const attr = ref.current.geometry.getAttribute("position") as THREE.BufferAttribute;
    for (let i = 0; i < COUNT; i++) {
      let x = attr.getX(i) + delta * 0.4;
      if (x > 40) x = -40;
      attr.setX(i, x);
    }
    attr.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-aOpacity" args={[opacities, 1]} />
      </bufferGeometry>
      <pointsMaterial color={C.white} size={0.06} sizeAttenuation transparent opacity={0.35} depthWrite={false} />
    </points>
  );
}

function Stars() {
  const COUNT = 120;
  const positions = useMemo(() => {
    const p = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      p[i * 3] = (Math.random() - 0.5) * 90;
      p[i * 3 + 1] = 8 + Math.random() * 10;
      p[i * 3 + 2] = (Math.random() - 0.5) * 70;
    }
    return p;
  }, []);
  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color={C.white} size={0.05} sizeAttenuation transparent opacity={0.5} depthWrite={false} />
    </points>
  );
}

// ---------------------------------------------------------------------------
// Camera ken-burns drift
// ---------------------------------------------------------------------------
// Default camera centre — sits over the SE Asia network with Australia visible bottom-right
const DEFAULT_LOOK = { lat: 5, lng: 115 };


function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function CameraRig({
  pauseUntil,
  focusTarget,
  onArrive,
}: {
  pauseUntil: number;
  focusTarget: { lat: number; lng: number; zoom: number } | null;
  onArrive: () => void;
}) {
  const { camera } = useThree();
  const fromLook = useRef(new THREE.Vector3(...projectLook(DEFAULT_LOOK.lat, DEFAULT_LOOK.lng)));
  const toLook = useRef(new THREE.Vector3(...projectLook(DEFAULT_LOOK.lat, DEFAULT_LOOK.lng)));
  const currentLook = useRef(new THREE.Vector3(...projectLook(DEFAULT_LOOK.lat, DEFAULT_LOOK.lng)));
  const focusFromLook = useRef<THREE.Vector3 | null>(null);
  const focusFromZoom = useRef<number>(1);
  const focusT = useRef(0);
  const FOCUS_DUR = 1.2;
  const baseZoom = useRef(1);
  const targetZoom = useRef(1);

  function projectLook(lat: number, lng: number): [number, number, number] {
    const [x, z] = project(lat, lng);
    return [x, 0, z];
  }

  // Apply camera offset (top-down ~55deg off vertical)
  const applyCamera = (look: THREE.Vector3, zoom: number) => {
    const dist = 26 / zoom;
    const pitch = (90 - 55) * (Math.PI / 180); // 55 off vertical
    const yaw = -Math.PI / 2; // viewing roughly from south
    void yaw;
    // place camera offset from look point
    const offY = Math.sin((55 * Math.PI) / 180) * 0; // not used
    void offY;
    // camera position: look + (0, dist*cos(pitchFromHoriz), dist*sin(pitchFromHoriz))
    // pitch off vertical = 55deg => from horizontal = 35deg
    const fromHoriz = (90 - 55) * (Math.PI / 180);
    const horiz = Math.cos(fromHoriz) * dist;
    const vert = Math.sin(fromHoriz) * dist;
    void horiz;
    void vert;
    // Use a simpler stable rig
    const camDist = 22 / zoom;
    const camY = 18 / zoom;
    camera.position.set(look.x, camY, look.z + camDist);
    camera.lookAt(look.x, 0, look.z);
  };

  useEffect(() => {
    applyCamera(currentLook.current, baseZoom.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useFrame((state, delta) => {
    // Focus override
    if (focusTarget) {
      if (!focusFromLook.current) {
        focusFromLook.current = currentLook.current.clone();
        focusFromZoom.current = baseZoom.current;
        focusT.current = 0;
        targetZoom.current = focusTarget.zoom;
      }
      focusT.current = Math.min(FOCUS_DUR, focusT.current + delta);
      const k = easeInOutCubic(focusT.current / FOCUS_DUR);
      const [tx, , tz] = projectLook(focusTarget.lat, focusTarget.lng);
      currentLook.current.set(
        focusFromLook.current.x + (tx - focusFromLook.current.x) * k,
        0,
        focusFromLook.current.z + (tz - focusFromLook.current.z) * k,
      );
      const zoom = focusFromZoom.current + (targetZoom.current - focusFromZoom.current) * k;
      baseZoom.current = zoom;
      applyCamera(currentLook.current, zoom);
      if (focusT.current >= FOCUS_DUR) onArrive();
      return;
    } else {
      focusFromLook.current = null;
    }

    const now = state.clock.elapsedTime;
    if (now < pauseUntil) {
      // hold position, allow zoom return
      const z = baseZoom.current + (1 - baseZoom.current) * Math.min(1, delta * 2);
      baseZoom.current = z;
      applyCamera(currentLook.current, z);
      return;
    }

    phaseT.current += delta;
    if (phase.current === "hold") {
      if (phaseT.current >= HOLD) {
        phase.current = "pan";
        phaseT.current = 0;
        idx.current = (idx.current + 1) % REGIONS.length;
        fromLook.current.copy(currentLook.current);
        const [tx, , tz] = projectLook(REGIONS[idx.current].lat, REGIONS[idx.current].lng);
        toLook.current.set(tx, 0, tz);
      }
    } else {
      const k = easeInOutCubic(Math.min(1, phaseT.current / PAN));
      currentLook.current.lerpVectors(fromLook.current, toLook.current, k);
      if (phaseT.current >= PAN) {
        phase.current = "hold";
        phaseT.current = 0;
      }
    }
    // Smooth return to base zoom
    baseZoom.current += (1 - baseZoom.current) * Math.min(1, delta * 1.5);
    applyCamera(currentLook.current, baseZoom.current);
  });

  return null;
}

// ---------------------------------------------------------------------------
// Main scene
// ---------------------------------------------------------------------------
function Scene({
  isMobile,
  onPauseDrift,
  pauseUntil,
  focusTarget,
  onArrive,
  hoveredId,
  setHovered,
  selected,
  setSelected,
}: {
  isMobile: boolean;
  onPauseDrift: () => void;
  pauseUntil: number;
  focusTarget: { lat: number; lng: number; zoom: number } | null;
  onArrive: () => void;
  hoveredId: string | null;
  setHovered: (h: Hostel | null, e?: ThreeEvent<PointerEvent>) => void;
  selected: Hostel | null;
  setSelected: (h: Hostel | null) => void;
}) {
  const monkeyTex = useTexture(monkeyHeadAsset);
  monkeyTex.colorSpace = THREE.SRGBColorSpace;

  const pulseOffsets = useMemo(() => HOSTELS.map(() => Math.random() * Math.PI * 2), []);
  const [checkinTriggers, setCheckinTriggers] = useState<number[]>(() => HOSTELS.map(() => 0));

  // Random check-in pulses disabled per design feedback

  // Fade-in
  const groupRef = useRef<THREE.Group>(null);
  const t0 = useRef<number | null>(null);
  useFrame((state) => {
    if (t0.current === null) t0.current = state.clock.elapsedTime;
    const elapsed = state.clock.elapsedTime - t0.current;
    const k = Math.min(1, elapsed / 1.5);
    if (groupRef.current) {
      // ease out cubic
      const eased = 1 - Math.pow(1 - k, 3);
      groupRef.current.scale.setScalar(0.92 + 0.08 * eased);
      // fade via traversing materials would be heavy; use a fog pull-back instead
    }
  });

  return (
    <>
      <CameraRig pauseUntil={pauseUntil} focusTarget={focusTarget} onArrive={onArrive} />

      <ambientLight intensity={0.55} color={C.white} />
      <directionalLight
        position={[-12, 18, 8]}
        intensity={0.9}
        color={C.white}
      />
      <hemisphereLight args={[C.brandBlue, C.oceanDeep, 0.35]} />

      <group ref={groupRef}>
        <Ocean />
        <Countries />
        <Stars />
        <AmbientParticles />

        <NetworkMesh highlightFromId={hoveredId} />

        <Travellers spawnRate={isMobile ? 1.25 : 2.5} />

        {HOSTELS.map((h, i) => (
          <HostelNode
            key={h.id}
            hostel={h}
            monkeyTex={monkeyTex}
            hovered={hoveredId === h.id}
            selected={selected?.id === h.id}
            onHover={(hh, e) => {
              setHovered(hh, e);
              if (hh) onPauseDrift();
            }}
            onSelect={(hh) => {
              setSelected(hh);
              onPauseDrift();
            }}
            pulseOffset={pulseOffsets[i]}
            triggerCheckin={checkinTriggers[i]}
          />
        ))}

        {/* Click-empty handler: invisible giant plane behind everything */}
        <mesh
          position={[0, -0.02, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
          onClick={(e) => {
            e.stopPropagation();
            setSelected(null);
          }}
        >
          <planeGeometry args={[200, 200]} />
          <meshBasicMaterial transparent opacity={0} depthWrite={false} />
        </mesh>
      </group>

      <EffectComposer multisampling={0}>
        <Bloom intensity={0.8} luminanceThreshold={0.6} luminanceSmoothing={0.2} mipmapBlur />
        <ChromaticAberration
          offset={new THREE.Vector2(0.0006, 0.0006)}
          radialModulation={false}
          modulationOffset={0}
          blendFunction={BlendFunction.NORMAL}
        />
        <Vignette eskil={false} offset={0.25} darkness={0.85} />
      </EffectComposer>
    </>
  );
}

// ---------------------------------------------------------------------------
// Top-level component
// ---------------------------------------------------------------------------
export default function MadMonkeyLiveNetwork() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [hovered, setHoveredState] = useState<{ h: Hostel | null; x: number; y: number }>({ h: null, x: 0, y: 0 });
  const [selected, setSelected] = useState<Hostel | null>(null);
  const [pauseUntil, setPauseUntil] = useState(0);
  const [focusTarget, setFocusTarget] = useState<{ lat: number; lng: number; zoom: number } | null>(null);
  const [mounted, setMounted] = useState(false);
  const lastTimeRef = useRef(0);

  useEffect(() => {
    setMounted(true);
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // Off-screen pause via IntersectionObserver
  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { threshold: 0.05 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const pauseDrift = () => {
    setPauseUntil(lastTimeRef.current + 6);
  };

  const handleSelect = (h: Hostel | null) => {
    setSelected(h);
    if (h) {
      setFocusTarget({ lat: h.lat, lng: h.lng, zoom: 1.7 });
    } else {
      setFocusTarget(null);
    }
  };

  // Track approximate clock for pause math
  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const loop = () => {
      lastTimeRef.current = (performance.now() - start) / 1000;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  const cardStyle: CSSProperties = {
    position: "absolute",
    left: hovered.x + 14,
    top: hovered.y + 14,
    pointerEvents: "none",
    background: "rgba(20, 10, 50, 0.78)",
    border: `1px solid ${C.brandBlue}55`,
    backdropFilter: "blur(6px)",
    color: C.white,
    padding: "10px 12px",
    borderRadius: 8,
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: 12,
    minWidth: 220,
    zIndex: 20,
    boxShadow: `0 8px 30px rgba(0,0,0,0.5)`,
  };

  return (
    <div
      ref={wrapperRef}
      className="relative w-full overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #0A0426 0%, #1A0F44 100%)",
        height: "clamp(440px, 70vh, 760px)",
        opacity: mounted ? 1 : 0,
        transition: "opacity 1.5s cubic-bezier(0.16,1,0.3,1)",
      }}
      onPointerMove={(e) => {
        if (!hovered.h) return;
        const rect = wrapperRef.current?.getBoundingClientRect();
        if (!rect) return;
        setHoveredState((s) => ({ ...s, x: e.clientX - rect.left, y: e.clientY - rect.top }));
      }}
    >
      <Canvas
        dpr={[1, 2]}
        frameloop={active ? "always" : "demand"}
        gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
        onCreated={({ gl }) => {
          gl.setClearColor(new THREE.Color("#0A0426"));
        }}
      >
        <OrthographicCamera makeDefault position={[0, 18, 22]} zoom={28} near={0.1} far={200} />
        <Suspense fallback={null}>
          <Scene
            isMobile={isMobile}
            onPauseDrift={pauseDrift}
            pauseUntil={pauseUntil}
            focusTarget={focusTarget}
            onArrive={() => { /* keep focus until user clicks outside */ }}
            hoveredId={hovered.h?.id ?? null}
            setHovered={(h, e) => {
              const rect = wrapperRef.current?.getBoundingClientRect();
              const x = e && rect ? (e.nativeEvent as PointerEvent).clientX - rect.left : hovered.x;
              const y = e && rect ? (e.nativeEvent as PointerEvent).clientY - rect.top : hovered.y;
              setHoveredState({ h, x, y });
            }}
            selected={selected}
            setSelected={handleSelect}
          />
        </Suspense>
      </Canvas>

      <HUD />

      {/* Hover card */}
      {hovered.h && !selected && (
        <div style={cardStyle}>
          <div style={{ color: C.cyan, fontWeight: 700, letterSpacing: "0.04em" }}>
            {hovered.h.name}
          </div>
          <div style={{ opacity: 0.7, marginTop: 2, fontSize: 11 }}>{hovered.h.country}</div>
          <div style={{ marginTop: 6, color: C.white, opacity: 0.85, lineHeight: 1.4 }}>
            {hovered.h.tagline}
          </div>
        </div>
      )}

      {/* Selected detail panel */}
      {selected && (
        <div
          className="absolute left-1/2 z-20 w-[min(92vw,420px)] -translate-x-1/2 rounded-xl border p-5 backdrop-blur-md"
          style={{
            bottom: "max(16px, env(safe-area-inset-bottom))",
            background: "rgba(20, 10, 50, 0.78)",
            borderColor: `${C.brandBlue}55`,
            color: C.white,
            fontFamily: "'JetBrains Mono', monospace",
          }}
        >
          {/* Placeholder image slot — REPLACE with real hostel photos */}
          <div
            className="mb-3 h-32 w-full overflow-hidden rounded-md"
            style={{
              background: `linear-gradient(135deg, ${C.landMid}, ${C.landTop})`,
              display: "flex", alignItems: "center", justifyContent: "center",
              color: `${C.white}66`, fontSize: 11, letterSpacing: "0.18em",
            }}
          >
            HOSTEL IMAGE
          </div>
          <div style={{ color: C.cyan, fontWeight: 700, fontSize: 16 }}>{selected.name}</div>
          <div style={{ opacity: 0.7, fontSize: 12, marginTop: 2 }}>
            {selected.country} · {selected.lat.toFixed(2)}°, {selected.lng.toFixed(2)}°
          </div>
          <div style={{ marginTop: 8, fontSize: 13, opacity: 0.9, lineHeight: 1.5 }}>
            {selected.tagline}
          </div>
          <div className="mt-4 flex items-center justify-between gap-3">
            <button
              onClick={() => handleSelect(null)}
              className="text-[11px] uppercase tracking-[0.18em] opacity-70 transition hover:opacity-100"
              style={{ color: C.white }}
            >
              close
            </button>
            <button
              className="rounded-md px-4 py-2 text-[11px] font-bold uppercase tracking-[0.18em] transition"
              style={{
                background: C.brandBlue,
                color: "#0A0426",
                boxShadow: `0 0 18px ${C.brandBlue}66`,
              }}
            >
              View Hostel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
