import React, { useEffect } from "react";
import * as THREE from "three";

const TestScene = () => {
  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.5,
      1000
    );

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    const sceneContainer = document.querySelector(".right-container");
    //   sceneContainer.appendChild(renderer.domElement);
    //   document.body.appendChild(renderer.domElement);

    sceneContainer.append(renderer.domElement);
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial();
    const cube = new THREE.Mesh(geometry, material);

    scene.add(cube);

    camera.position.z = 2;

    function animate() {
      requestAnimationFrame(animate);
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;

      renderer.render(scene, camera);
    }
    animate();
    console.log("animated ");
  }, []);

  return <div id="scene"></div>;
};

export default TestScene;
