import React, { useEffect, useState } from "react";
import { auth, storageRef, usersRef, firestore } from "../resources/firebase";
import { Link } from "react-router-dom";
import Dashboard from "./Dashboard";
import { collection, getDocs, query, where } from "firebase/firestore";

const HomeScreen = () => {
  const [userInfo, setUserInfo] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const fetchUserInfo = async (user) => {
    setIsLoading(true);
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
      }
    });
  }, []);

  return (
    <>
      {isLoading && <h1>Loading....</h1>}
      {userInfo && <Dashboard userInfo={userInfo} />}
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
