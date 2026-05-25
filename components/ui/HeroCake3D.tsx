"use client";

import { Canvas } from "@react-three/fiber";
import {
  ContactShadows,
  Environment,
  Float,
  Lightformer,
  OrbitControls,
} from "@react-three/drei";

const SPONGE = "#7a4a2c";
const CREAM = "#f4e7d2";
const CHOCO = "#3b2418";
const PLATE = "#efe6d6";
const GOLD = "#d6b060";
const CHERRY = "#b3242b";

function Cake() {
  const drips = Array.from({ length: 16 });
  const sprinkles = Array.from({ length: 12 });

  return (
    <group position={[0, 0.04, 0]}>
      {/* plate */}
      <mesh position={[0, -0.66, 0]}>
        <cylinderGeometry args={[1.75, 1.88, 0.12, 64]} />
        <meshStandardMaterial color={PLATE} roughness={0.75} metalness={0.05} />
      </mesh>

      {/* bottom sponge */}
      <mesh position={[0, -0.32, 0]}>
        <cylinderGeometry args={[1.26, 1.28, 0.52, 64]} />
        <meshStandardMaterial color={SPONGE} roughness={0.7} />
      </mesh>
      {/* cream filling */}
      <mesh position={[0, 0.0, 0]}>
        <cylinderGeometry args={[1.3, 1.3, 0.18, 64]} />
        <meshStandardMaterial color={CREAM} roughness={0.55} />
      </mesh>
      {/* top sponge */}
      <mesh position={[0, 0.3, 0]}>
        <cylinderGeometry args={[1.24, 1.27, 0.5, 64]} />
        <meshStandardMaterial color={SPONGE} roughness={0.7} />
      </mesh>
      {/* ganache top (slight overhang) */}
      <mesh position={[0, 0.58, 0]}>
        <cylinderGeometry args={[1.27, 1.24, 0.12, 64]} />
        <meshStandardMaterial color={CHOCO} roughness={0.25} metalness={0.15} />
      </mesh>

      {/* chocolate drips */}
      {drips.map((_, i) => {
        const a = (i / drips.length) * Math.PI * 2;
        const len = 0.18 + ((i * 7) % 5) * 0.07;
        const r = 1.25;
        return (
          <mesh
            key={i}
            position={[Math.cos(a) * r, 0.52 - len / 2, Math.sin(a) * r]}
          >
            <capsuleGeometry args={[0.075, len, 4, 10]} />
            <meshStandardMaterial
              color={CHOCO}
              roughness={0.25}
              metalness={0.15}
            />
          </mesh>
        );
      })}

      {/* gold band around the cream layer */}
      <mesh position={[0, 0.0, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.31, 0.02, 16, 96]} />
        <meshStandardMaterial color={GOLD} metalness={0.95} roughness={0.2} />
      </mesh>

      {/* gold sprinkles on top */}
      {sprinkles.map((_, i) => {
        const a = (i / sprinkles.length) * Math.PI * 2;
        const r = 0.35 + ((i * 5) % 3) * 0.22;
        return (
          <mesh
            key={`s${i}`}
            position={[Math.cos(a) * r, 0.65, Math.sin(a) * r]}
            rotation={[Math.PI / 2, 0, a * 2]}
          >
            <cylinderGeometry args={[0.018, 0.018, 0.11, 8]} />
            <meshStandardMaterial color={GOLD} metalness={0.85} roughness={0.3} />
          </mesh>
        );
      })}

      {/* cherry */}
      <mesh position={[0, 0.78, 0]}>
        <sphereGeometry args={[0.17, 32, 32]} />
        <meshStandardMaterial color={CHERRY} roughness={0.12} metalness={0.1} />
      </mesh>
      <mesh position={[0.05, 0.92, 0]} rotation={[0, 0, -0.45]}>
        <cylinderGeometry args={[0.013, 0.013, 0.2, 8]} />
        <meshStandardMaterial color="#5a3a1a" roughness={0.6} />
      </mesh>
    </group>
  );
}

export function HeroCake3D() {
  return (
    <Canvas
      dpr={[1, 1.6]}
      camera={{ position: [0, 1.0, 4.4], fov: 38 }}
      gl={{ alpha: true, antialias: true }}
    >
      <ambientLight intensity={0.55} />
      <directionalLight position={[3, 5, 4]} intensity={1.5} color="#fff3df" />
      <directionalLight position={[-4, 2, -2]} intensity={0.5} color="#ffd9a0" />

      {/* Self-contained studio reflections (no external HDR fetch) */}
      <Environment resolution={256}>
        <Lightformer
          intensity={1.6}
          color="#fff3df"
          position={[0, 4, 2]}
          scale={[9, 9, 1]}
        />
        <Lightformer
          intensity={1.0}
          color="#ffd9a0"
          position={[-5, 1, -3]}
          scale={[6, 6, 1]}
        />
        <Lightformer
          intensity={0.8}
          color="#ffffff"
          position={[5, 2, 3]}
          scale={[4, 4, 1]}
        />
      </Environment>

      <Float speed={1.5} rotationIntensity={0.18} floatIntensity={0.5}>
        <Cake />
      </Float>

      <ContactShadows
        position={[0, -0.78, 0]}
        opacity={0.4}
        scale={6}
        blur={2.6}
        far={3}
        resolution={512}
        color="#2a160d"
      />

      <OrbitControls
        target={[0, 0.05, 0]}
        enablePan={false}
        enableZoom={false}
        autoRotate
        autoRotateSpeed={1.1}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI / 2.05}
        makeDefault
      />
    </Canvas>
  );
}
