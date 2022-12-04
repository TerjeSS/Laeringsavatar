import React, { useEffect, useState } from "react";
import { storageRef } from "../resources/firebase";
import { getDownloadURL, listAll, ref } from "firebase/storage";
import { storage } from "../resources/firebase";
import { Link } from "react-router-dom";

const HomeScreen = () => {
  const storageRef = ref(storage);
  const animationRef = ref(storageRef, "animations");
  const [fileReferences, setFileReferences] = useState([]);

  useEffect(() => {
    listAll(animationRef)
      .then((res) => {
        setFileReferences([...res.items]);
        fileReferences.forEach((element) => {
          getDownloadURL(element).then((url) => {
            console.log(url);
          });
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      <div>Velkommen til 3D Visualisering</div>
      {fileReferences.map((element) => {
        return (
          <Link to={"/visualisering/" + element.name} key={element.fullPath}>
            {element.name}
          </Link>
        );
      })}
    </div>
  );
};

export default HomeScreen;
