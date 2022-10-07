import React, { useEffect } from "react";
import * as THREE from "three";

import Stats from "three/addons/libs/stats.module.js";

import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";

import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/addons/loaders/DRACOLoader.js";
import { GridHelper } from "three";

const CopyPaste = () => {
  useEffect(() => {
    let mixer;

    const clock = new THREE.Clock();
    const container = document.querySelector(".right-container");

    const stats = new Stats();
    container.appendChild(stats.dom);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(container.clientWidth, container.clientWidth);
    renderer.outputEncoding = THREE.sRGBEncoding;
    container.appendChild(renderer.domElement);

    const pmremGenerator = new THREE.PMREMGenerator(renderer);

    const scene = new THREE.Scene();
    const gridHelper = new THREE.GridHelper(25, 25);
    scene.add(gridHelper);

    //Ground
    const mesh = new THREE.Mesh(
      new THREE.PlaneGeometry(100, 100),
      new THREE.MeshPhongMaterial({ color: 0x999999, depthWrite: false })
    );
    mesh.rotation.x = -Math.PI / 2;
    mesh.receiveShadow = false;
    scene.add(mesh);

    //Background and environment
    scene.background = new THREE.Color(0xa0a0a0);
    scene.environment = pmremGenerator.fromScene(
      new RoomEnvironment(),
      0.1
    ).texture;

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );
    camera.position.set(0.8, 3.8, 8);
    // camera.position.setZ(11);

    //Light
    // const hemiLight = new THREE.HemisphereLight(0x0a0a0a, 0xffffff);
    // hemiLight.position.set(2, 10, 2);
    // const hemihelper = new THREE.HemisphereLightHelper(hemiLight);
    // scene.add(hemiLight);
    // scene.add(hemihelper);

    const dirLight = new THREE.DirectionalLight(0xffffff);
    const dirLightHelper = new THREE.DirectionalLightHelper(dirLight);

    scene.add(dirLightHelper);
    dirLight.position.set(3, 10, 10);
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
      "./testFile.glb",
      function (gltf) {
        const model = gltf.scene;
        model.position.set(0, 0, 0);
        model.scale.set(2.5, 2.5, 2.5);
        scene.add(model);
        model.mesh = true;
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

    //Window resize function
    window.onresize = function () {
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();

      renderer.setSize(container.clientWidth / container.clientHeight);
    };

    //Recursive animate-function
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
