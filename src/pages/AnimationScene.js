import React, { useEffect, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/addons/loaders/DRACOLoader.js";
import { getDownloadURL, listAll, ref } from "firebase/storage";

import ControlPanel from "../components/ControlPanel/ControlPanel";
import { storage } from "../resources/firebase";
import { useParams } from "react-router-dom";
import { SkinOptions } from "./AnimationOptions.js"

const AnimationScene = () => {
  const [firebaseURL, setFirebaseURL] = useState("");
  let fileReferences = [];
  const storageRef = ref(storage);
  const animationRef = ref(storageRef, "animations");
  const { filename } = useParams();
  let camera, sceneBB, controls, bones, centreBone, bonePos, targetGeometry;
  let renderer, scene, model, glasses, pants, mannequin, loader, mixer, clock;
  let selectingCenter = false;
  let singleStepMode = false;
  let stepSize = 0;

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
  function findChild(parent, childName) {
    for (var child of parent.children) {
      if (child.name == childName)
        return child;
    }
    return null;
  }
  function loadModel() {
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath("js/libs/draco/gltf/");
    const loader = new GLTFLoader();
    loader.setDRACOLoader(dracoLoader);
    loader.load(
      firebaseURL,
      function (gltf) {
        model = gltf.scene;
  //      model.visible = false;
        var skeleton = findChild(model, "GLB_GRP");
        if(!skeleton)
          skeleton = findChild(model, "mannequin_skeleton");
        glasses = findChild(skeleton, "Glasses_Square2");
        if(!glasses)
          glasses = findChild(skeleton, "Glasses_Square");
        pants = findChild(skeleton, "TrackFBXASC032pants2");
        if(!pants)
          pants = findChild(skeleton, "Track_pants");
        mannequin = findChild(skeleton, "mannequin2");
        if(!mannequin)
          mannequin = findChild(skeleton, "mannequin");
        bones = findChild(skeleton, "Hips");
        if(!bones)
        {
          var armature = findChild(skeleton, "Armature");
          bones = findChild(armature, "Hips_1");
        }
        centreBone = bones;
        scene.add(model);

        model.traverse(function (object) {
          if (object.isMesh) {
            object.castShadow = true;
            // increase bounding box to make raycasting work
            object.geometry.boundingBox = sceneBB.clone();
            object.geometry.boundingBox.expandByScalar(2);
            const center = new THREE.Vector3();
            sceneBB.getCenter(center);
            const radius = sceneBB.getSize(new THREE.Vector3()).length() / 2;
            object.geometry.boundingSphere = new THREE.Sphere(center, radius);
            object.geometry.boundingSphere.expandByPoint(new THREE.Vector3(7, 7, 7));
          }
        });

        mixer = new THREE.AnimationMixer(model);

        //Starts the animation
        var animationSequence = gltf.animations.slice(-1)[0];
        mixer.clipAction(animationSequence).play();

        //Adding event listeners for the buttons
        var toggleButton = document.querySelector("#toggle-button");
        toggleButton.addEventListener("change", function () {
          if (singleStepMode) {
            mixer.clipAction(animationSequence).paused = false;
            singleStepMode = false;
          }
          else
            mixer.clipAction(animationSequence).paused = !mixer.clipAction(animationSequence).paused;
          selectingCenter = !selectingCenter;

        });
        document
          .querySelector(".reset-button")
          .addEventListener("click", () => {
            mixer.clipAction(animationSequence).reset();
            selectingCenter = false;
            singleStepMode = false;
            toggleButton.checked = false;
          });
        document.querySelector(".next-button")
          .addEventListener("click", () => {
            mixer.clipAction(animationSequence).paused = false;
            toggleButton.checked = true;
            singleStepMode = true;
            stepSize = 0.05;
          });
        document.querySelector(".prev-button")
          .addEventListener("click", () => {
            mixer.clipAction(animationSequence).paused = false;
            toggleButton.checked = true;
            singleStepMode = true;
            stepSize = -0.05;
          });

        // remove loading screen and enable options
        const overlayDiv = document.querySelector('.loadingDiv');
        overlayDiv.style.display = 'none';
        const canvasDiv = document.querySelector(".optionDiv")
        const audioDiv = document.querySelector("audio");
        new SkinOptions(THREE, mannequin, pants, glasses, mixer, canvasDiv, audioDiv);
        animate();
      },
      undefined,
      function (e) {
        console.error(e);
      }
    );

  }

  function loadScene(scene) {
    loader = new GLTFLoader();
    loader.load("/Stage.glb", (gltf) => {
      gltf.scene.traverse(function (node) {
        if (node.isMesh) {
          node.receiveShadow = true;
        }
      });

      sceneBB = new THREE.Box3().setFromObject(gltf.scene);
      sceneBB.expandByScalar(3.0);
      scene.add(gltf.scene);

      loadModel();
    });
  }

  function createScene() {
    bonePos = new THREE.Vector3();

    clock = new THREE.Clock();
    const container = document.querySelector(".canvas");
    window.addEventListener('resize', resize, false);

    renderer = new THREE.WebGLRenderer({
      canvas: container,
      antialias: true,
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.shadowMap.enabled = true;
    renderer.useLegacyLights = true;

    scene = new THREE.Scene();
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

    // lights
    const dirLight = new THREE.DirectionalLight('white',0.5);
    dirLight.position.set(0, 1, -0.4);
    dirLight.castShadow = false;
    scene.add(dirLight);

    const lightFromBack = new THREE.DirectionalLight('white',0.5);
    lightFromBack.position.set(0, 1, 0.8);
    lightFromBack.castShadow = true;
    scene.add(lightFromBack);

    const ambLight = new THREE.AmbientLight('white',2);
    scene.add(ambLight);

    // Geometry
    const sphere = new THREE.SphereGeometry(0.1);
    const targetMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    targetGeometry = new THREE.Mesh(sphere, targetMaterial);
    targetGeometry.visible = false;
    scene.add(targetGeometry);

    var timeoutId;
    var pickDelay = 250;
    var isClick = true;
    container.onmousedown = function (event) {
      timeoutId = setTimeout(function () {
        isClick = false;
      }, pickDelay);
    };
    container.onmouseup = function (event) {
      clearTimeout(timeoutId);
      if (/*selectingCenter &&*/ isClick) {
        const rect = renderer.domElement.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        var mouse = new THREE.Vector2();
        var canvas = document.querySelector(".canvas");
        mouse.x = (x / canvas.clientWidth) * 2 - 1;
        mouse.y = (y / canvas.clientHeight) * - 2 + 1
        selectPickedBone(mouse);
      }
      isClick = true;
    }
    
    loadScene(scene);
  }

  function resize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  function selectPickedBone(mousePos) {
    camera.updateMatrixWorld();
    var raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mousePos, camera);

    var intersects = raycaster.intersectObjects(model.children, true);

    if (intersects.length > 0) {
      // Find nearest bone
      const pickedPoint = intersects[0].point;
      var minDist = Number.POSITIVE_INFINITY;
      findNearestBone(bones, pickedPoint, minDist);

      // visualize selection sphere
      targetGeometry.visible = true;
      centreBone.getWorldPosition(bonePos);
      targetGeometry.position.copy(bonePos);
      var selectDelay = 500;
      setTimeout(function () { targetGeometry.visible = false; }, selectDelay);
    }
  }

  function findNearestBone(bone, point, minDist) {
    var bonePosition = new THREE.Vector3();
    bone.getWorldPosition(bonePosition);
    var distance = point.distanceTo(bonePosition);
    if (distance < minDist) {
      minDist = distance;
      centreBone = bone;
    }

    for (var childBone of bone.children) {
      minDist = findNearestBone(childBone, point, minDist);
    }

    return minDist;
  }

  //Recursive animate-function
  function animate() {
    requestAnimationFrame(animate);

    let delta = clock.getDelta();
    if (singleStepMode) {
      delta = stepSize;
      stepSize = 0;
    }
    if(mixer)
      mixer.update(delta);

    if (sceneBB) {
      if (camera.position.x > sceneBB.max.x)
        camera.position.x = sceneBB.max.x;
      if (camera.position.x < sceneBB.min.x)
        camera.position.x = sceneBB.min.x;
      if (camera.position.y > sceneBB.max.y + 5)
        camera.position.y = sceneBB.max.y + 5;
      if (camera.position.y < sceneBB.min.y + 3)
        camera.position.y = sceneBB.min.y + 3;
      if (camera.position.z > sceneBB.max.z)
        camera.position.z = sceneBB.max.z;
      if (camera.position.z < sceneBB.min.z)
        camera.position.z = sceneBB.min.z;
    }

    if (centreBone) {
      centreBone.getWorldPosition(bonePos);
      controls.target.copy(bonePos);
    }

    renderer.render(scene, camera);
  }

  return (
    <>
      <ControlPanel />

      <div className="canvasParent">
        <canvas className="canvas"></canvas>
        <div className="optionDiv"></div>
        <div className="loadingDiv">
          <h1>Laster...</h1>
          <img
            height="300px"
            width="300px"
            src="/img/mesh_models.png"
            alt="dancingImage"
          />
        </div>
      </div>
      <audio loop>
        <source src="/mp3/Art-Of-Silence.mp3" type="audio/mpeg" />
      </audio>
    </>
  );
};

export default AnimationScene;
