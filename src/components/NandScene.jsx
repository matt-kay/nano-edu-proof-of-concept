import React, { useMemo, useState, useEffect, useCallback } from "react";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  RoundedBox,
  Text,
  QuadraticBezierLine,
  //   Html,
  Bounds, // ⟵ NEW: auto-fit camera to content
  AdaptiveDpr, // ⟵ NEW: performance + crispness on mobile
  Preload,
} from "@react-three/drei";

const bitColor = (b) => (b ? "#32cd32" : "#dc143c"); // limegreen/crimson

const NAND = (a, b) => Number(!(a && b));

function InputBall({ position, label, value, onToggle, color }) {
  return (
    <group position={position}>
      <mesh
        castShadow
        receiveShadow
        onClick={onToggle}
        onPointerOver={(e) => e.object.scale.setScalar(1.15)}
        onPointerOut={(e) => e.object.scale.setScalar(1)}
      >
        <sphereGeometry args={[0.25, 32, 32]} />
        <meshStandardMaterial
          color={color}
          emissive={value ? color : "black"}
          emissiveIntensity={0.6}
        />
      </mesh>
      <Text
        position={[0, -0.55, 0]}
        fontSize={0.22}
        anchorX="center"
        anchorY="middle"
      >
        {label}:{value}
      </Text>
    </group>
  );
}

function OutputBall({ position, value }) {
  const color = bitColor(value);
  return (
    <group position={position}>
      <mesh castShadow receiveShadow>
        <sphereGeometry args={[0.28, 32, 32]} />
        <meshStandardMaterial
          color={color}
          emissive={value ? color : "black"}
          emissiveIntensity={1}
        />
      </mesh>
      <Text
        position={[0, -0.6, 0]}
        fontSize={0.22}
        anchorX="center"
        anchorY="middle"
      >
        OUT:{value}
      </Text>
    </group>
  );
}

export default function NandScene() {
  const [a, setA] = useState(0);
  const [b, setB] = useState(0);
  const out = useMemo(() => NAND(a, b), [a, b]);

  // keyboard shortcuts
  useEffect(() => {
    const onKey = (e) => {
      if (e.key.toLowerCase() === "a") setA((v) => 1 - v);
      if (e.key.toLowerCase() === "b") setB((v) => 1 - v);
      if (e.key.toLowerCase() === "r") {
        setA(0);
        setB(0);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="panel">
      <div className="panel-header">
        <h2>Interactive NAND Gate</h2>
        <div className="row">
          <button onClick={() => setA(0) || setB(0)}>Reset</button>
        </div>
      </div>
      <div className="hint">
        Click A/B balls or press <b>A</b>/<b>B</b>. NAND = NOT(A AND B).
      </div>
      <div className="readout">
        <span>
          A = <b className={a ? "hi" : "lo"}>{a}</b>
        </span>
        <span>
          B = <b className={b ? "hi" : "lo"}>{b}</b>
        </span>
        <span>
          OUT = <b className={out ? "hi" : "lo"}>{out}</b>
        </span>
      </div>
      {/* ⟵ responsive wrapper */}
      <div className="sceneWrap">
        <Canvas
          shadows
          dpr={[1, 2]} // ⟵ scales between 1x and 2x depending on screen
          camera={{ position: [2.5, 2, 6], fov: 50 }}
        >
          <ambientLight intensity={0.5} />
          <spotLight
            position={[8, 12, 8]}
            angle={0.3}
            penumbra={0.5}
            castShadow
          />
          {/* Auto-fit the camera to whatever is inside Bounds (on mount + on resize) */}
          <Bounds fit clip observe margin={1.1}>
            <group /* scale={1.1}  <- optional extra size */>
              {/* inputs */}
              <InputBall
                position={[-3, 1, 0]}
                label="A"
                value={a}
                onToggle={() => setA(1 - a)}
                color={bitColor(a)}
              />
              <InputBall
                position={[-3, -1, 0]}
                label="B"
                value={b}
                onToggle={() => setB(1 - b)}
                color={bitColor(b)}
              />

              {/* gate body */}
              <group position={[0, 0, 0]}>
                <RoundedBox
                  args={[2, 2.5, 1]}
                  radius={0.2}
                  smoothness={8}
                  castShadow
                  receiveShadow
                >
                  <meshStandardMaterial
                    color="#8aa1b1"
                    metalness={0.1}
                    roughness={0.7}
                  />
                </RoundedBox>
                <Text
                  position={[0, 0, 0.55]}
                  fontSize={0.35}
                  anchorX="center"
                  anchorY="middle"
                >
                  NAND
                </Text>
              </group>

              {/* output */}
              <OutputBall position={[3.2, 0, 0]} value={out} />

              {/* wires */}
              <QuadraticBezierLine
                start={[-2.75, 1, 0.01]}
                end={[-1.1, 0.6, 0.01]}
                mid={[-1.9, 1.1, 0.01]}
                color={bitColor(a)}
                lineWidth={3}
              />
              <QuadraticBezierLine
                start={[-2.75, -1, 0.01]}
                end={[-1.1, -0.6, 0.01]}
                mid={[-1.9, -1.1, 0.01]}
                color={bitColor(b)}
                lineWidth={3}
              />
              <QuadraticBezierLine
                start={[1.1, 0, 0.01]}
                end={[3, 0, 0.01]}
                mid={[2.2, 0.4, 0.01]}
                color={bitColor(out)}
                lineWidth={4}
              />

              {/* NOT bubble */}
              <mesh position={[1.2, 0, 0.5]}>
                <sphereGeometry args={[0.1, 16, 16]} />
                <meshStandardMaterial
                  color="#ffffff"
                  emissive={out ? "#ffffff" : "#222"}
                  emissiveIntensity={0.8}
                />
              </mesh>
            </group>
          </Bounds>
          {/* <Html position={[0, -2, 0]} center>
            <div className="hint">
              Click A/B balls or press <b>A</b>/<b>B</b>. NAND = NOT(A AND B).
            </div>
          </Html> */}
          <OrbitControls enablePan={false} makeDefault />
          <AdaptiveDpr pixelated />{" "}
          {/* lowers DPR on slow frames, raises when idle */}
          <Preload all />
        </Canvas>
      </div>
    </div>
  );
}
