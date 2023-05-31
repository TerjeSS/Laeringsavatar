import React, { useEffect, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";

import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/addons/loaders/DRACOLoader.js";
import { getDownloadURL, listAll, ref } from "firebase/storage";

import { AnimationAction, AnimationMixer, GridHelper } from "three";
import ControlPanel from "../components/ControlPanel/ControlPanel";
import { storage } from "../resources/firebase";
import { useParams } from "react-router-dom";

const AnimationScene = () => {
  const [firebaseURL, setFirebaseURL] = useState("");
  let fileReferences = [];
  const storageRef = ref(storage);
  const animationRef = ref(storageRef, "animations");
  const { filename } = useParams();
  let camera, sceneBB;

  const fetchRefereces = async () => {
    listAll(animationRef)
      .then((res) => {
        fileReferences = [...res.items];
        const referenceName = fileReferences.filter((element) => {
          return element.name === filename;
        });
        getDownloadURL(ref(storage, referenceName)).then((res) => {
          setFirebaseURL(res);
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchRefereces();
  }, []);

  setTimeout(() => {
    createScene();
  }, 1);

  //THREE.JS SECTION ***************
  function loadScene(scene) {
    const loader = new GLTFLoader();
    loader.load("/Stage.glb", (gltf) => {
      gltf.scene.traverse(function (node) {
        if (node.isMesh) {
          node.receiveShadow = true;
        }
      });

      sceneBB = new THREE.Box3().setFromObject(gltf.scene);
      scene.add(gltf.scene);
    });
  }

  function createScene() {
    let mixer;

    const clock = new THREE.Clock();
    const container = document.querySelector(".canvas");

    const renderer = new THREE.WebGLRenderer({
      canvas: container,
      antialias: true,
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.shadowMap.enabled = true;

    // container.appendChild(renderer.domElement);
    const pmremGenerator = new THREE.PMREMGenerator(renderer);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);

    //Camera
    camera = new THREE.PerspectiveCamera(
      50,
      window.innerWidth / window.innerHeight,
      0.01,
      60
    );
    camera.position.set(0, 2, -8);
    camera.lookAt(0, 3, 5);

    loadScene(scene);

    // light
    const dirLight = new THREE.DirectionalLight(0xeeeeee);
    dirLight.position.set(0, 1, -0.4);
    dirLight.castShadow = false;
    scene.add(dirLight);

    const lightFromBack = new THREE.DirectionalLight(0x444444);
    lightFromBack.position.set(0, 1, 0.8);
    lightFromBack.castShadow = true;
    scene.add(lightFromBack);

    const ambLight = new THREE.AmbientLight(0xeeeeee);
    scene.add(ambLight);

    //Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(0, 1, 0);
    controls.update();
    controls.enablePan = true;
    controls.enableDamping = true;

    //Loaders
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath("js/libs/draco/gltf/");
    const loader = new GLTFLoader();
    loader.setDRACOLoader(dracoLoader);
    console.log("LOADER" + firebaseURL);
    loader.load(
      firebaseURL,
      function (gltf) {
        const model = gltf.scene;
        scene.add(model);
        model.traverse(function (object) {
          if (object.isMesh) object.castShadow = true;
        });

        mixer = new THREE.AnimationMixer(model);

        //Starts the animation
        mixer.clipAction(gltf.animations[1]).play();
        const animationDuration = mixer.clipAction(gltf.animations[0])._clip
          .duration;
        animate();

        //Adding event listeners for the buttons
        document
          .querySelector(".pause-button")
          .addEventListener("click", () => {
            mixer.clipAction(gltf.animations[1]).paused = true;
          });
        document
          .querySelector(".resume-button")
          .addEventListener("click", () => {
            mixer.clipAction(gltf.animations[1]).paused = false;
          });
        document
          .querySelector(".reset-button")
          .addEventListener("click", () => {
            mixer.clipAction(gltf.animations[1]).reset();
          });
        document.getElementById("speed").addEventListener("change", (e) => {
          mixer
            .clipAction(gltf.animations[1])
            .setDuration(animationDuration / e.target.value);
        });
      },
      undefined,
      function (e) {
        console.error(e);
      }
    );

    // Window resize function
    container.onresize = function () {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();

      renderer.setSize(window.innerWidth / window.innerHeight);
    };

    //Recursive animate-function
    function animate() {
      requestAnimationFrame(animate);

      const delta = clock.getDelta();
      mixer.update(delta);

      controls.update();

      if(sceneBB)
      {
        if(camera.position.x > sceneBB.max.x)
          camera.position.x = sceneBB.max.x;
        if(camera.position.x < sceneBB.min.x)
          camera.position.x = sceneBB.min.x;
        if(camera.position.y > sceneBB.max.y)
          camera.position.y = sceneBB.max.y;
        if(camera.position.y < sceneBB.min.y)
          camera.position.y = sceneBB.min.y;
        if(camera.position.z > sceneBB.max.z)
          camera.position.z = sceneBB.max.z;
        if(camera.position.z < sceneBB.min.z)
          camera.position.z = sceneBB.min.z;
      }
      
      renderer.render(scene, camera);
    }

    return mixer;
  }

  return (
    <>
      <ControlPanel />
      <canvas className="canvas"></canvas>
    </>
  );
};

export default AnimationScene;
