import "./App.css";
import { Canvas } from "@react-three/fiber";
import Main from "./components/Main";
import { OrbitControls } from "@react-three/drei";

function App() {
  return (
    <div id="canvas-container">
      <Canvas camera={{ position: [1, 1, 2] }}>
        {/* <ambientLight color="#ffffff" intensity={0.5} /> */}
        {/* <pointLight color="#ffffff" intensity={0.5} position={[2, 3, 4]} /> */}
        <Main />
        <OrbitControls />
      </Canvas>
    </div>
  );
}

export default App;
