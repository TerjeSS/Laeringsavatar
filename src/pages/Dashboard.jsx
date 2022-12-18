import { listAll, ref, uploadBytes, getMetadata } from "firebase/storage";
import React, { useState, useEffect } from "react";
import DashboardAdminLink from "../components/DashboardLink/DashboardAdminLink";
import DashboardLink from "../components/DashboardLink/DashboardLink";
import UploadFile from "../components/UploadFile/UploadFile";
import { animationsFolder, auth, storage } from "../resources/firebase";

const Dashboard = (props) => {
  const { userInfo } = props;
  const [fileReferences, setFileReferences] = useState([]);
  const storageRef = ref(storage);
  const animationRef = ref(storageRef, "animations");

  async function fetchVisualisations() {
    console.log("Fetching visualisations");
    if (userInfo.role === "admin" && fileReferences.length === 0) {
      listAll(animationRef)
        .then((res) => {
          setFileReferences([...res.items]);
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
  }

  useEffect(() => {
    fetchVisualisations();
  }, []);

  return (
    <>
      <div className="dashboard-container">
        <UploadFile userInfo={userInfo} />
        <div className="links-container">
          <h2>Liste over visualiseringer</h2>
          {fileReferences.length === 0 && (
            <p>Ingen visualiseringer lastet opp</p>
          )}
          {fileReferences.map((element) => {
            if (userInfo.role === "admin") {
              return (
                <DashboardAdminLink
                  key={element.fullPath}
                  link={element}
                  setFileReferences={setFileReferences}
                />
              );
            }
            return (
              <DashboardAdminLink
                key={element.fullPath}
                link={element}
                setFileReferences={setFileReferences}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
