import { useHelper } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import {
  DirectionalLightHelper,
  HemisphereLightHelper,
  MeshStandardMaterial,
  PointLightHelper,
  SpotLightHelper,
  Vector3,
} from "three";
import { RectAreaLightHelper } from "three/examples/jsm/helpers/RectAreaLightHelper";

const Lights = () => {
  const { clock } = useThree();
  const sphere = useRef();
  const cube = useRef();
  const torus = useRef();
  const directionalLight = useRef();
  const hemisphereLight = useRef();
  const pointLight = useRef();
  const rectAreaLight = useRef();
  const spotLight = useRef();
  const spotLightTarget = useRef();

  useEffect(() => {
    if (rectAreaLight) {
      rectAreaLight.current.lookAt(new Vector3());
    }
  }, [rectAreaLight]);

  useFrame(() => {
    sphere.current.rotation.y = 0.1 * clock.elapsedTime;
    cube.current.rotation.y = 0.1 * clock.elapsedTime;
    torus.current.rotation.y = 0.1 * clock.elapsedTime;

    sphere.current.rotation.x = 0.15 * clock.elapsedTime;
    cube.current.rotation.x = 0.15 * clock.elapsedTime;
    torus.current.rotation.x = 0.15 * clock.elapsedTime;
  });

  const material = new MeshStandardMaterial();
  material.roughness = 0.4;

  useHelper(hemisphereLight, HemisphereLightHelper, 0.2);
  useHelper(directionalLight, DirectionalLightHelper, 0.2);
  useHelper(pointLight, PointLightHelper, 0.2);
  useHelper(spotLight, SpotLightHelper);
  useHelper(rectAreaLight, RectAreaLightHelper);

  return (
    <>
      <ambientLight color="#ffffff" intensity={0.5} />
      <directionalLight
        color="#00fffc"
        intensity={0.3}
        position={[1, 0.25, 0]}
        ref={directionalLight}
      />
      <hemisphereLight
        color="#ff0000"
        groundColor="#0000ff"
        intensity={0.3}
        ref={hemisphereLight}
      />
      <pointLight
        color="#ff9000"
        intensity={0.5}
        position={[1, -0.5, 1]}
        distance={10}
        decay={2}
        ref={pointLight}
      />
      <rectAreaLight
        color="#4e00ff"
        intensity={2}
        width={1}
        height={1}
        position={[-1.5, 0, 1.5]}
        ref={rectAreaLight}
      />
      <spotLight
        color="#78ff00"
        intensity={0.5}
        distance={10}
        angle={Math.PI * 0.1}
        penumbra={0.25}
        decay={1}
        position={[0, 2, 3]}
        ref={spotLight}
        target={spotLightTarget.current}
      />
      <object3D ref={spotLightTarget} position-x={-0.75} />

      <mesh material={material} ref={sphere} position-x={-1.5}>
        <sphereGeometry args={[0.5, 32, 32]} />
      </mesh>
      <mesh material={material} ref={cube}>
        <boxGeometry args={[0.75, 0.75, 0.75]} />
      </mesh>
      <mesh material={material} ref={torus} position-x={1.5}>
        <torusGeometry args={[0.3, 0.2, 32, 64]} />
      </mesh>
      <mesh material={material} rotation-x={-Math.PI * 0.5} position-y={-0.65}>
        <planeGeometry args={[5, 5]} />
      </mesh>
    </>
  );
};

export default Lights;
