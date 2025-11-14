import { AccumulativeShadows, RandomizedLight } from "@react-three/drei";
import React, { useRef } from "react";

const BackDrop = () => {
  const shawdows = useRef();
  return (
    <AccumulativeShadows
      ref={shawdows}
      position={[0, 0, -0.14]}
      temporal
      frames={60}
      alphaTest={0.85}
      scale={10}
      rotation={[Math.PI / 2, 0, 0]}
    >
      <RandomizedLight
        amount={4}
        radius={9}
        intensity={2.9}
        ambient={0.25}
        position={[5, 5, -10]}
      />

      <RandomizedLight
        amount={4}
        radius={5}
        intensity={2.5}
        ambient={0.55}
        position={[5, -9, -9]}
      />
    </AccumulativeShadows>
  );
};

export default BackDrop;
