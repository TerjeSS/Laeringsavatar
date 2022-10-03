import React, { useEffect } from "react";
import * as THREE from "three";

const TestScene = () => {
  useEffect(() => {
    const sceneContainer = document.querySelector(".right-container");
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xa0a0a0);
    scene.fog = new THREE.Fog(0xa0a0a0, 10, 50);
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444);
    hemiLight.position.set(0, 20, 0);
    const hemihelper = new THREE.HemisphereLightHelper(hemiLight);
    scene.add(hemiLight);
    scene.add(hemihelper);

    const camera = new THREE.PerspectiveCamera(
      75,
      sceneContainer.innerWidth / sceneContainer.innerHeight,
      0.5,
      1000
    );

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(sceneContainer.innerWidth, sceneContainer.innerHeight);
    //   sceneContainer.appendChild(renderer.domElement);
    //   document.body.appendChild(renderer.domElement);

    sceneContainer.append(renderer.domElement);
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial();
    const cube = new THREE.Mesh(geometry, material);

    scene.add(cube);

    //Ground
    const mesh = new THREE.Mesh(
      new THREE.PlaneGeometry(100, 100),
      new THREE.MeshPhongMaterial({ color: 0x999999, depthWrite: false })
    );
    mesh.rotation.x = -Math.PI / 2;
    mesh.receiveShadow = true;
    scene.add(mesh);
    camera.position.z = 5;

    window.onresize = function () {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

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
