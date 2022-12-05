import React, { useEffect, useState } from "react";
import { auth, storageRef } from "../resources/firebase";
import { getDownloadURL, listAll, ref } from "firebase/storage";
import { storage } from "../resources/firebase";
import { Link } from "react-router-dom";
import Dashboard from "./Dashboard";

const HomeScreen = () => {
  const storageRef = ref(storage);
  const animationRef = ref(storageRef, "animations");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [fileReferences, setFileReferences] = useState([]);
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        listAll(animationRef)
          .then((res) => {
            setFileReferences([...res.items]);
            setIsLoggedIn(true);
          })
          .catch((error) => {
            console.error(error);
          });
      } else {
        console.log("not logged in");
        setIsLoggedIn(false);
      }
    });
  }, []);

  return (
    <>
      {isLoggedIn && <Dashboard fileReferences={fileReferences} />}
      {!isLoggedIn && (
        <>
          <div>Nothing to see here, you need to log in</div>
          <div>
            <button>
              <Link to={"/login"}>Log in</Link>
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default HomeScreen;
