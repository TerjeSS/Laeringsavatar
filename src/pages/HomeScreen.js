import React from "react";
import { storageRef } from "../resources/firebase";
import { listAll, ref } from "firebase/storage";
import { storage } from "../resources/firebase";

const HomeScreen = () => {
  //
  const storageRef = ref(storage);

  const animationRef = ref(storageRef, "animations");

  const fileReferences = [];
  listAll(animationRef)
    .then((res) => {
      console.log(res.items);
      res.items.forEach((itemRef) => {
        // All the items under listRef.
        fileReferences.push(res.items);
      });
    })
    .catch((error) => {
      // Uh-oh, an error occurred!
    });

  return (
    <div>
      <div>Velkommen til 3D Visualisering</div>
      {fileReferences.map((element) => {
        return <div>{element}</div>;
      })}
    </div>
  );
};

export default HomeScreen;
