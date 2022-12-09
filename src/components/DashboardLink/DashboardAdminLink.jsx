import { deleteObject, getMetadata } from "firebase/storage";
import React, { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const DashboardAdminLink = ({ link, setFileReferences }) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [uploadedBy, setUploadedBy] = useState();
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
      setUploadedBy(metaData.customMetadata.uploadedBy);
    } else {
      setUploadedBy("Ukjent");
    }
  };

  fetchMetaData();

  return (
    <div>
      <Link to={"/visualisering/" + link.name} key={link.fullPath}>
        {link.name}
      </Link>
      <p>Lastet opp av: {uploadedBy}</p>
      <p>
        Beskrivelse. Lorem ipsum dolor sit, amet consectetur adipisicing elit.
        Suscipit fuga odit aperiam, rem molestias nesciunt commodi iusto error
        ratione, vero neque tempora provident non esse. Ipsam aut impedit
        delectus! At expedita placeat consectetur ut asperiores sint laboriosam
        provident vel necessitatibus.
        <button onClick={handleFileDelete}>Slett visualisering</button>
      </p>
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
};

export default DashboardAdminLink;
