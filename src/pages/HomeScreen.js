import React, { useEffect, useState } from "react";
import { storageRef } from "../resources/firebase";
import { getDownloadURL, listAll, ref } from "firebase/storage";
import { storage } from "../resources/firebase";

const HomeScreen = () => {
  //
  const storageRef = ref(storage);

  const animationRef = ref(storageRef, "animations");

  const [fileReferences, setFileReferences] = useState([]);
  // const fileReferences = [];

  useEffect(() => {
    listAll(animationRef)
      .then((res) => {
        console.log(res.items);
        // res.items.forEach((itemRef) => {
        //   // All the items under listRef.
        //   console.log({ itemRef });
        //   fileReferences.push(itemRef);
        // });
        setFileReferences([...res.items]);
        fileReferences.forEach((element) => {
          getDownloadURL(element).then((url) => {
            console.log(url);
          });
        });
      })
      .catch((error) => {
        // Uh-oh, an error occurred!
      });
  }, []);

  const handleReferenceClick = async (e) => {
    console.log(e.target.innerText);
    const referenceName = fileReferences.filter((element) => {
      return element.fullPath === e.target.innerText;
    });
    // var test = ref(storage, referenceName);
    // console.log(test);
    var url = await getDownloadURL(ref(animationRef, e.target.innerText));
    console.log(url);
  };
  return (
    <div>
      <div>Velkommen til 3D Visualisering</div>
      {fileReferences.map((element) => {
        console.log("in render");
        return (
          <div key={element.fullPath} onClick={(e) => handleReferenceClick(e)}>
            {element.name}
          </div>
        );
      })}
    </div>
  );
};

export default HomeScreen;
