import React, { useEffect } from "react";
import * as THREE from "three";

import Stats from "three/addons/libs/stats.module.js";

import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";

import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/addons/loaders/DRACOLoader.js";
import { GridHelper } from "three";
import ControlPanel from "./components/ControlPanel/ControlPanel";

const CopyPaste = () => {
  let animationPaused = false;
  const pauseAnimation = () => {
    animationPaused = !animationPaused;
  };
  const resumeAnimation = () => {
    animationPaused = false;
    // animate();
  };
  let mixer;

  const clock = new THREE.Clock();
  const container = document.querySelector(".canvas");
  console.log("container er - " + container);
  if (container === undefined || container === null) {
    window.location.href = "./home";
  }

  // const stats = new Stats();
  // container.appendChild(stats.dom);

  const renderer = new THREE.WebGLRenderer({
    canvas: container,
    antialias: true,
  });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerHeight, window.innerHeight);
  renderer.outputEncoding = THREE.sRGBEncoding;

  console.log("how many");
  // container.appendChild(renderer.domElement);
  const pmremGenerator = new THREE.PMREMGenerator(renderer);

  const scene = new THREE.Scene();
  const gridHelper = new THREE.GridHelper(25, 25);
  scene.add(gridHelper);

  //Walls

  const geometry = new THREE.PlaneGeometry(35, 25);
  const material = new THREE.MeshBasicMaterial({
    color: 0xb8bff1,
    side: THREE.DoubleSide,
  });
  const plane = new THREE.Mesh(geometry, material);
  scene.add(plane);
  plane.position.set(1, 1, 10);

  //Wwall nr 2
  const geometry2 = new THREE.PlaneGeometry(30, 25);
  const material2 = new THREE.MeshBasicMaterial({
    color: 0xb8b4ab,
    side: THREE.DoubleSide,
  });
  const plane2 = new THREE.Mesh(geometry2, material2);
  scene.add(plane2);
  plane2.position.set(15, 1, 1);
  plane2.rotateY(1.5707);

  //Wall nr 3
  const geometry3 = new THREE.PlaneGeometry(30, 25);
  const plane3 = new THREE.Mesh(geometry3, material2);
  scene.add(plane3);
  plane3.position.set(-15, 1, 1);
  plane3.rotateY(1.5707);

  //Ground
  const mesh = new THREE.Mesh(
    new THREE.PlaneGeometry(30, 30),
    new THREE.MeshPhongMaterial({ color: 0x7d7b7a, depthWrite: false })
  );
  mesh.rotation.x = -Math.PI / 2;
  mesh.receiveShadow = true;
  scene.add(mesh);

  // Background and environment
  scene.background = new THREE.Color(0x87ceeb);
  scene.environment = pmremGenerator.fromScene(
    new RoomEnvironment(),
    0.1
  ).texture;

  //Camera
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    1,
    1000
  );
  camera.position.set(1, 1, -9);
  // camera.position.setZ(11);

  //Light

  const hemiLight = new THREE.HemisphereLight(0x0a0a0a, 0xffffff);
  hemiLight.position.set(2, 10, 2);
  const hemihelper = new THREE.HemisphereLightHelper(hemiLight);
  scene.add(hemiLight);
  scene.add(hemihelper);

  const dirLight = new THREE.DirectionalLight(0xffffff);
  const dirLightHelper = new THREE.DirectionalLightHelper(dirLight);
  scene.add(dirLightHelper);

  dirLight.position.set(3, 4, -1);
  dirLight.castShadow = true;
  dirLight.shadow.camera.top = 2;
  dirLight.shadow.camera.bottom = -2;
  dirLight.shadow.camera.left = -2;
  dirLight.shadow.camera.right = 2;
  dirLight.shadow.camera.near = 0.1;
  dirLight.shadow.camera.far = 40;
  scene.add(dirLight);

  //Controls
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.target.set(0, 0.5, 0);
  controls.update();
  controls.enablePan = false;
  controls.enableDamping = true;

  //Loaders
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("js/libs/draco/gltf/");
  const loader = new GLTFLoader();
  loader.setDRACOLoader(dracoLoader);
  loader.load(
    "./P1_Roll_Down.glb",
    function (gltf) {
      const model = gltf.scene;
      model.position.set(0, 0, 0);
      model.scale.set(2.5, 2.5, 2.5);
      scene.add(model);
      model.mesh = true;
      mesh.shadow = true;
      model.traverse(function (object) {
        if (object.isMesh) object.castShadow = true;
      });

      mixer = new THREE.AnimationMixer(model);

      //Starts the animation
      mixer.clipAction(gltf.animations[0]).play();

      animate();
    },
    undefined,
    function (e) {
      console.error(e);
    }
  );

  // Window resize function
  window.onresize = function () {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(container.clientWidth / container.clientHeight);
  };

  //Recursive animate-function
  function animate() {
    if (animationPaused) {
      return;
    }
    requestAnimationFrame(animate);

    const delta = clock.getDelta();

    mixer.update(delta);

    controls.update();

    // stats.update();
    // console.log(camera.position);

    renderer.render(scene, camera);
  }

  return (
    <>
      {/* <ControlPanel
        pauseAnimation={pauseAnimation}
        resumeAnimation={resumeAnimation}
      /> */}
    </>
  );
};

export default CopyPaste;
