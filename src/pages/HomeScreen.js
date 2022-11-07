import React, { useEffect, useState } from "react";
import { storageRef } from "../resources/firebase";
import { listAll, ref } from "firebase/storage";
import { storage } from "../resources/firebase";

const HomeScreen = () => {
  //
  const storageRef = ref(storage);

  const animationRef = ref(storageRef, "animations");

  const [fileReferences, setFileReferences] = useState([]);

  return (
    <div>
      <div>Velkommen til 3D Visualisering</div>
      {fileReferences.map((element) => {
        return <div>ello</div>;
      })}
      <div>after</div>
    </div>
  );
};

export default HomeScreen;
