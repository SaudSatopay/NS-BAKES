"use client";

import { Suspense, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import {
  ContactShadows,
  Environment,
  Float,
  Lightformer,
  OrbitControls,
  useGLTF,
} from "@react-three/drei";
import { Box3, Vector3 } from "three";

const MODEL_URL = "/models/cake-slice.glb";

/** Loads the GLB, then auto-centers it at the origin and scales it to a
 *  consistent size so it always frames correctly regardless of the model. */
function CakeModel({ targetSize = 2.7 }: { targetSize?: number }) {
  const { scene } = useGLTF(MODEL_URL);

  const model = useMemo(() => {
    const obj = scene.clone(true);
    const box = new Box3().setFromObject(obj);
    const size = new Vector3();
    const center = new Vector3();
    box.getSize(size);
    box.getCenter(center);
    const scale = targetSize / (Math.max(size.x, size.y, size.z) || 1);
    obj.scale.setScalar(scale);
    obj.position.set(-center.x * scale, -center.y * scale, -center.z * scale);
    return obj;
  }, [scene, targetSize]);

  return <primitive object={model} />;
}

useGLTF.preload(MODEL_URL);

export function HeroCake3D() {
  return (
    <Canvas
      dpr={[1, 1.6]}
      camera={{ position: [0, 0.6, 4.8], fov: 38 }}
      gl={{ alpha: true, antialias: true }}
    >
      <ambientLight intensity={0.65} />
      <directionalLight position={[3, 5, 4]} intensity={1.3} color="#fff3df" />
      <directionalLight position={[-4, 2, -2]} intensity={0.45} color="#ffd9a0" />

      {/* Self-contained studio reflections (no external HDR fetch) */}
      <Environment resolution={256}>
        <Lightformer
          intensity={1.5}
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

      <Suspense fallback={null}>
        <Float speed={1.4} rotationIntensity={0.15} floatIntensity={0.5}>
          <CakeModel />
        </Float>
      </Suspense>

      <ContactShadows
        position={[0, -1.35, 0]}
        opacity={0.4}
        scale={6}
        blur={2.6}
        far={3}
        resolution={512}
        color="#2a160d"
      />

      <OrbitControls
        target={[0, 0, 0]}
        enablePan={false}
        enableZoom={false}
        autoRotate
        autoRotateSpeed={1.0}
        minPolarAngle={Math.PI / 3.2}
        maxPolarAngle={Math.PI / 2.05}
        makeDefault
      />
    </Canvas>
  );
}
