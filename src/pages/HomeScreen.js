import React, { useEffect, useState } from "react";
import { auth, storageRef, usersRef, firestore } from "../resources/firebase";
import { Link } from "react-router-dom";
import Dashboard from "./Dashboard";
import { collection, getDocs, query, where } from "firebase/firestore";
import "./Home.css";

const HomeScreen = () => {
  const [userInfo, setUserInfo] = useState();
  const [isLoading, setIsLoading] = useState(true);

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
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        fetchUserInfo(user);
      } else {
        console.log("not logged in");
        setIsLoading(false);
      }
    });
  }, []);

  return (
    <>
      {isLoading && (
        <div>
          <h1>Laster...</h1>
          <img
            height="300px"
            width="300px"
            src="/img/mesh_models.png"
            alt="dancingImage"
          />
        </div>
      )}
      {userInfo && <Dashboard userInfo={userInfo} />}
      {!userInfo && !isLoading && (
        <>
          <div>Velkommen til VisBev3D. Vær vennlig å logge inn.</div>
          <div>
            <button>
              <Link to={"/login"}>Logg in</Link>
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default HomeScreen;
