import React, { useEffect } from "react";
import * as THREE from "three";

import Stats from "three/addons/libs/stats.module.js";

import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";

import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/addons/loaders/DRACOLoader.js";

const CopyPaste = () => {
  useEffect(() => {
    let mixer;

    const clock = new THREE.Clock();
    const container = document.querySelector(".right-container");

    const stats = new Stats();
    container.appendChild(stats.dom);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.outputEncoding = THREE.sRGBEncoding;
    container.appendChild(renderer.domElement);

    const pmremGenerator = new THREE.PMREMGenerator(renderer);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xbfe3dd);
    scene.environment = pmremGenerator.fromScene(
      new RoomEnvironment(),
      0.04
    ).texture;

    const camera = new THREE.PerspectiveCamera(
      40,
      window.innerWidth / window.innerHeight,
      1,
      100
    );
    camera.position.set(5, 2, 8);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(0, 0.5, 0);
    controls.update();
    controls.enablePan = false;
    controls.enableDamping = true;
    console.log("test1");
    // const dracoLoader = new DRACOLoader();
    // dracoLoader.setDecoderPath("js/libs/draco/gltf/");

    const loader = new GLTFLoader();
    // loader.setDRACOLoader(dracoLoader);
    console.log("test2");
    loader.load(
      "./testFile.glb",
      function (gltf) {
        const model = gltf.scene;
        model.position.set(1, 1, 0);
        model.scale.set(1, 1, 1);
        scene.add(model);

        mixer = new THREE.AnimationMixer(model);
        mixer.clipAction(gltf.animations[0]).play();

        animate();
      },
      undefined,
      function (e) {
        console.error(e);
      }
    );
    console.log("test3");

    window.onresize = function () {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();

      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    console.log("test4");
    function animate() {
      requestAnimationFrame(animate);

      const delta = clock.getDelta();

      mixer.update(delta);

      controls.update();

      stats.update();

      renderer.render(scene, camera);
    }
  }, []);
  return <></>;
};

export default CopyPaste;
