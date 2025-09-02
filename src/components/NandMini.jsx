import React, { useMemo, useState, useCallback } from "react";
import { Canvas } from "@react-three/fiber";
import {
  RoundedBox,
  Text,
  QuadraticBezierLine,
  AdaptiveDpr,
  Preload,
} from "@react-three/drei";

const color = (b) => (b ? "#32cd32" : "#dc143c");
const NAND = (a, b) => Number(!(a && b));

export default function NandMini({ onMatch, target, disabled = false }) {
  const [a, setA] = useState(0);
  const [b, setB] = useState(0);
  const out = useMemo(() => NAND(a, b), [a, b]);

  const toggleA = useCallback(() => {
    if (disabled) return;
    setA((prev) => {
      const next = 1 - prev;
      if (next === target.A && b === target.B) onMatch?.();
      return next;
    });
  }, [disabled, target.A, target.B, b, onMatch]);

  const toggleB = useCallback(() => {
    if (disabled) return;
    setB((prev) => {
      const next = 1 - prev;
      if (a === target.A && next === target.B) onMatch?.();
      return next;
    });
  }, [disabled, target.A, target.B, a, onMatch]);

  return (
    <div className="mini">
      <div className="miniCanvasWrap">
        <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 6] }}>
          <ambientLight intensity={0.6} />
          <group>
            {/* inputs */}
            <mesh position={[-2.5, 1, 0]} onClick={toggleA}>
              <sphereGeometry args={[0.2, 16, 16]} />
              <meshStandardMaterial
                color={color(a)}
                emissive={a ? color(a) : "black"}
                emissiveIntensity={0.7}
              />
            </mesh>
            <mesh position={[-2.5, -1, 0]} onClick={toggleB}>
              <sphereGeometry args={[0.2, 16, 16]} />
              <meshStandardMaterial
                color={color(b)}
                emissive={b ? color(b) : "black"}
                emissiveIntensity={0.7}
              />
            </mesh>

            <RoundedBox
              args={[1.6, 1.8, 0.8]}
              radius={0.15}
              position={[0, 0, 0]}
            >
              <meshStandardMaterial color="#8aa1b1" />
            </RoundedBox>
            <Text
              position={[0, 0, 0.5]}
              fontSize={0.25}
              anchorX="center"
              anchorY="middle"
            >
              NAND
            </Text>

            <mesh position={[2.5, 0, 0]}>
              <sphereGeometry args={[0.22, 16, 16]} />
              <meshStandardMaterial
                color={color(out)}
                emissive={out ? color(out) : "black"}
                emissiveIntensity={0.9}
              />
            </mesh>

            <QuadraticBezierLine
              start={[-2.3, 1, 0.01]}
              end={[-0.8, 0.5, 0.01]}
              mid={[-1.6, 1.2, 0.01]}
              color={color(a)}
              lineWidth={2}
            />
            <QuadraticBezierLine
              start={[-2.3, -1, 0.01]}
              end={[-0.8, -0.5, 0.01]}
              mid={[-1.6, -1.2, 0.01]}
              color={color(b)}
              lineWidth={2}
            />
            <QuadraticBezierLine
              start={[0.8, 0, 0.01]}
              end={[2.3, 0, 0.01]}
              mid={[1.7, 0.4, 0.01]}
              color={color(out)}
              lineWidth={3}
            />
          </group>

          <AdaptiveDpr pixelated />
          <Preload all />
        </Canvas>
      </div>

      <div className="mini-readout">
        <span>A:{a}</span> <span>B:{b}</span> <span>OUT:{out}</span>
      </div>
    </div>
  );
}
