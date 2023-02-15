import { deleteObject, getMetadata } from "firebase/storage";
import React, { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import "./DashboardLink.css";

const DashboardAdminLink = ({ link, setFileReferences }) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [uploadedBy, setUploadedBy] = useState();
  const [uploaded, setUploaded] = useState();
  const [description, setDescription] = useState("");
  const handleFileDelete = async () => {
    try {
      const res = await deleteObject(link);
    } catch (error) {
      setErrorMessage(error);
    }

    setFileReferences((prevState) => {
      return [
        ...prevState.filter((ref) => {
          return ref.fullPath !== link.fullPath;
        }),
      ];
    });
  };

  const fetchMetaData = async () => {
    const metaData = await getMetadata(link);
    if (metaData) {
      setUploaded(new Date(metaData.timeCreated).toLocaleString());
      setUploadedBy(metaData.customMetadata.uploadedBy);
      setDescription(metaData.customMetadata.description);
    } else {
      setUploadedBy("Ukjent");
    }
  };
  useEffect(() => {
    fetchMetaData();
  }, []);

  return (
    <div className="link-container">
      <Link to={"/visualisering/" + link.name} key={link.fullPath}>
        {link.name}
      </Link>
      <button onClick={handleFileDelete}>Slett visualisering</button>
      <p>
        <b>Lastet opp av:</b> {uploadedBy} - {uploaded}
      </p>
      <p>{description}</p>

      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
};

export default DashboardAdminLink;
