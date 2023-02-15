import { ref, uploadBytes } from "firebase/storage";
import React, { useState } from "react";
import { animationsFolder } from "../../resources/firebase";

const UploadFile = ({ userInfo, fetchVisualisations, setFileReferences }) => {
  const [uploadStatusMessage, setUploadStatusMessage] = useState("");
  const [description, setDescription] = useState("");
  const handleUpload = () => {
    setUploadStatusMessage("");
    const fileList = document.getElementById("fileUpload").files;
    if (fileList.length === 0) {
      setUploadStatusMessage("Vennligst velg en fil");
      return;
    }
    const extension = getFileExtension(fileList[0]);
    console.log();

    // if (extension !== "glb" || extension !== "gltf") {
    //   setUploadStatusMessage("Feil filformat. Må være .glb eller .glft");
    //   return;
    // }

    const metaData = {
      customMetadata: { uploadedBy: userInfo.email, description: description },
    };

    const newFileReference = ref(animationsFolder, fileList[0].name);

    uploadBytes(newFileReference, fileList[0], metaData)
      .then(() => {
        setUploadStatusMessage("Filen ble lastet opp");
        document.getElementById("fileUpload").value = null;
        setDescription("");
      })
      .then(() => {
        fetchVisualisations();
      })
      .catch((error) => {
        setUploadStatusMessage(error);
      });
  };

  const getFileExtension = (file) => {
    const name = file.name;
    const lastDot = name.lastIndexOf(".");

    const ext = name.substring(lastDot + 1);
    console.log(ext);
    return ext;
  };

  return (
    <div className="upload-container">
      <h1>
        Hei {`${userInfo.first_name} ${userInfo.last_name}(${userInfo.email})`}
      </h1>
      <h2>Last opp ny visualisering</h2>
      <label htmlFor="fileUpload">
        Velg en .glb eller .gltf-fil som skal lastes opp:{" "}
      </label>
      <br></br>
      <input
        type="file"
        name="fileUpload"
        id="fileUpload"
        onChange={() => {
          setUploadStatusMessage("");
          setDescription("");
        }}
      />
      <br></br>
      <br />
      <label htmlFor="description">Beskrivelse: </label>
      <br />
      <textarea
        value={description}
        rows="7"
        cols="50"
        className="description-textarea"
        onChange={(e) => {
          setDescription(e.target.value);
          console.log(e.target.value);
        }}
      />
      <br></br>
      <br />
      <button onClick={handleUpload}>Last opp fil</button>
      {uploadStatusMessage && (
        <p className="upload-status-message">{uploadStatusMessage}</p>
      )}
    </div>
  );
};

export default UploadFile;
