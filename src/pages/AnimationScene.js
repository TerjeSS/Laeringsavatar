import React, { useEffect, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/addons/loaders/DRACOLoader.js";
import { getDownloadURL, listAll, ref } from "firebase/storage";

import ControlPanel from "../components/ControlPanel/ControlPanel";
import { storage } from "../resources/firebase";
import { useParams } from "react-router-dom";


const AnimationScene = () => {
  const [firebaseURL, setFirebaseURL] = useState("");
  let fileReferences = [];
  const storageRef = ref(storage);
  const animationRef = ref(storageRef, "animations");
  const { filename } = useParams();
  let camera, sceneBB, controls, bones, bonePos, targetGeometry, model;
  let selectingCenter = false;

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
    bonePos = new THREE.Vector3();

    const clock = new THREE.Clock();
    const container = document.querySelector(".canvas");

    const renderer = new THREE.WebGLRenderer({
      canvas: container,
      antialias: true,
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.shadowMap.enabled = true;
    renderer.physicallyCorrectLights = true;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);

    //Camera
    camera = new THREE.PerspectiveCamera(
      50,
      window.innerWidth / window.innerHeight,
      0.1,
      20
    );
    camera.position.set(0, 2, 3);
    camera.lookAt(0, 2, -5);

    //Controls
    controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(0, 1, 0);
    controls.update();

    loadScene(scene);

    // lights
    const dirLight = new THREE.DirectionalLight('white');
    dirLight.position.set(0, 1, -0.4);
    dirLight.castShadow = false;
    scene.add(dirLight);

    const lightFromBack = new THREE.DirectionalLight('white');
    lightFromBack.position.set(0, 1, 0.8);
    lightFromBack.castShadow = true;
    scene.add(lightFromBack);

    const ambLight = new THREE.AmbientLight('white',5);
    scene.add(ambLight);

    // Geometry
    const sphere = new THREE.SphereGeometry(0.1);
    const targetMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    targetGeometry = new THREE.Mesh(sphere, targetMaterial);
    scene.add(targetGeometry);

    //Loaders
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath("js/libs/draco/gltf/");
    const loader = new GLTFLoader();
    loader.setDRACOLoader(dracoLoader);
    console.log("LOADER" + firebaseURL);
    loader.load(
      firebaseURL,
      function (gltf) {
        model = gltf.scene;
        scene.add(model);

        model.traverse(function (object) {
          if (object.isMesh) 
          {
            object.castShadow = true;
            object.geometry.boundingBox = sceneBB.clone();
            object.geometry.boundingBox.expandByScalar(2);
            const center = new THREE.Vector3();
            sceneBB.getCenter(center);
            const radius = sceneBB.getSize(new THREE.Vector3()).length() / 2;
            object.geometry.boundingSphere = new THREE.Sphere(center, radius);
            object.geometry.boundingSphere.expandByPoint(new THREE.Vector3(7,7,7));
          }
        });
        bones = model.children[1].children;
        bonePos.set(0,0,0);
        bonePos.applyMatrix4(bones[0].matrix);
        controls.target.copy(bonePos);
        
        mixer = new THREE.AnimationMixer(model);

        //Starts the animation
        mixer.clipAction(gltf.animations[1]).play();
        const animationDuration = mixer.clipAction(gltf.animations[1])._clip
          .duration;
        animate();

        //Adding event listeners for the buttons
        document
          .querySelector(".pause-button")
          .addEventListener("click", () => {
            mixer.clipAction(gltf.animations[1]).paused = true;
            selectingCenter = true;
          });
        document
          .querySelector(".resume-button")
          .addEventListener("click", () => {
            mixer.clipAction(gltf.animations[1]).paused = false;
            selectingCenter = false;
          });
        document
          .querySelector(".reset-button")
          .addEventListener("click", () => {
            mixer.clipAction(gltf.animations[1]).reset();
            selectingCenter = false;
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
    container.onclick = function ( event ) {
      if(selectingCenter)
      {
        const pointer = new THREE.Vector2();
        pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
        pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

        const raycaster = new THREE.Raycaster();
        raycaster.setFromCamera( pointer, camera );
        const intersects = raycaster.intersectObjects(model.children);

        if(intersects.length > 0){
            controls.target.copy(intersects[0].point);
            targetGeometry.position.copy(intersects[0].point);
        }

      }
    }

    //Recursive animate-function
    function animate() {
      requestAnimationFrame(animate);

      const delta = clock.getDelta();
      mixer.update(delta);

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
