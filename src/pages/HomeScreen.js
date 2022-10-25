import React from "react";
import { storageRef } from "../resources/firebase";
import { listAll, ref } from "firebase/storage";
import { storage } from "../resources/firebase";

const HomeScreen = () => {
  //
  const storageRef = ref(storage);

  const animationRef = ref(storageRef, "animations");

  listAll(animationRef)
    .then((res) => {
      res.prefixes.forEach((folderRef) => {
        // All the prefixes under listRef.
        // You may call listAll() recursively on them.
      });
      res.items.forEach((itemRef) => {
        // All the items under listRef.
        console.log(itemRef);
      });
    })
    .catch((error) => {
      // Uh-oh, an error occurred!
    });

  return <div>Velkommen til 3D Visualisering</div>;
};

export default HomeScreen;
