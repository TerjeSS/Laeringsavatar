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
  let camera, sceneBB, controls, bones, centreBone, bonePos, targetGeometry, model;
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
    targetGeometry.visible = false;
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
            // increase bounding box to make raycasting work
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
        centreBone = bones[0];
        
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

    container.onresize = function () {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();

      renderer.setSize(window.innerWidth / window.innerHeight);
    };

    var timeoutId;
    var pickDelay = 250;
    var selectDelay = 500;
    var isClick = true;
    container.onmousedown = function(event) {
      timeoutId = setTimeout(function() {
        isClick = false;
      }, pickDelay);
    };
    container.onmouseup = function(event) {
      clearTimeout(timeoutId);
      if(selectingCenter && isClick)
      {
        const rect = renderer.domElement.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
    
        var mouse = new THREE.Vector2();
        var canvas = document.querySelector(".canvas");
        mouse.x = ( x / canvas.clientWidth ) *  2 - 1;
        mouse.y = ( y / canvas.clientHeight) * - 2 + 1
        selectPickedBone(mouse);
      }
      isClick = true;
    }

    function selectPickedBone(mousePos)
    {
      camera.updateMatrixWorld();
      var raycaster = new THREE.Raycaster();
      raycaster.setFromCamera( mousePos, camera );    

      var intersects = raycaster.intersectObjects(model.children, true);

      if(intersects.length > 0){
        // Find nearest bone
        const pickedPoint = intersects[0].point;
        var minDist = Number.POSITIVE_INFINITY;
        findNearestBone(bones[0], pickedPoint, minDist);

        // visualize selection sphere
        targetGeometry.visible = true;
        centreBone.getWorldPosition(bonePos);
        targetGeometry.position.copy(bonePos);
        setTimeout(function() {targetGeometry.visible = false;}, selectDelay);
      }
    }

    function findNearestBone(bone, point, minDist)
    {
      var bonePosition = new THREE.Vector3();
      bone.getWorldPosition(bonePosition);
      var distance = point.distanceTo(bonePosition);
      if(distance < minDist)
      {
        minDist = distance;
        centreBone = bone;
      }

      for(var childBone of bone.children)
      {
        minDist = findNearestBone(childBone, point, minDist);
      }

      return minDist;
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

      centreBone.getWorldPosition(bonePos);
      controls.target.copy(bonePos);
      
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
