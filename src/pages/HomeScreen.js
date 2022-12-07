import React, { useEffect, useState } from "react";
import { auth, storageRef, usersRef, firestore } from "../resources/firebase";
import { getDownloadURL, getMetadata, listAll, ref } from "firebase/storage";
import { storage } from "../resources/firebase";
import { Link } from "react-router-dom";
import Dashboard from "./Dashboard";
import { collection, getDocs, query, where } from "firebase/firestore";

const HomeScreen = () => {
  const storageRef = ref(storage);
  const animationRef = ref(storageRef, "animations");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [fileReferences, setFileReferences] = useState([]);
  const [userInfo, setUserInfo] = useState();
  let files = [];

  const fetchUserInfo = async (user) => {
    try {
      let info = {};
      const userQuery = query(
        collection(firestore, "users"),
        where("uid", "==", user.uid)
      );
      const result = await getDocs(userQuery);
      result.forEach((res) => {
        info = res.data();
      });
      setUserInfo(info);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        fetchUserInfo(user);
      } else {
        console.log("not logged in");
        setIsLoggedIn(false);
      }
    });
  }, []);
  if (userInfo) {
    fetchVisualisations();
  }
  async function fetchVisualisations() {
    console.log("Fetching visualisations");
    if (userInfo.role === "admin" && fileReferences.length === 0) {
      listAll(animationRef)
        .then((res) => {
          setFileReferences([...res.items]);
          setIsLoggedIn(true);
        })
        .catch((error) => {
          console.error(error);
        });
    } else if (userInfo.role === "student" && fileReferences.length === 0) {
      console.log("student");
      let temp = [];
      let result = await listAll(animationRef);

      if (result) {
        temp = [...result.items];
        console.log(temp);
        temp.forEach(async (file) => {
          let metadata = await getMetadata(file);
          if (metadata.customMetadata.uploadedBy === userInfo.email) {
            setFileReferences((prevState) => {
              return [...prevState, file];
            });
          }
        });
      }
    }
    console.log(fileReferences);
  }
  // fileReferences.forEach((file) => {
  //   getMetadata(file).then((metadata) => {
  //     console.log(metadata.customMetadata.uploadedBy);
  //   });
  // });

  return (
    <>
      {userInfo && <Dashboard fileReferences={fileReferences} />}
      {!userInfo && (
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
