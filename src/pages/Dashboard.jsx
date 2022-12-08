import { listAll, ref, uploadBytes, getMetadata } from 'firebase/storage';
import React,{useState, useEffect} from 'react'
import DashboardAdminLink from '../components/DashboardLink/DashboardAdminLink';
import DashboardLink from '../components/DashboardLink/DashboardLink';
import {animationsFolder, auth, storage } from '../resources/firebase';


const Dashboard = (props) => {
    
    const { userInfo} = props
    const [fileReferences, setFileReferences] = useState([]);
    const storageRef = ref(storage);
    const animationRef = ref(storageRef, "animations");
    const user = auth.currentUser;
    console.log("current user");
    const [uploadStatusMessage, setUploadStatusMessage] = useState("")

    const handleUpload = () => {
        setUploadStatusMessage("")
        const fileList = document.getElementById("fileUpload").files
        if(fileList.length === 0){
           setUploadStatusMessage("Vennligst velg en fil")
           return
        }
        
        const metaData = {
            customMetadata:       
                {"uploadedBy" : user.email}
        }
        
        const newFileReference = ref(animationsFolder, fileList[0].name)

        uploadBytes(newFileReference, fileList[0], metaData).then((snapshot) => {
            setUploadStatusMessage("Filen ble lastet opp")
            document.getElementById("fileUpload").value = null
        }).catch((error) => {
            setUploadStatusMessage(error)
        })

        
    }


    // if (userInfo) {
    //       fetchVisualisations();
    //     }

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
    
    useEffect( () => {
fetchVisualisations()
    }, [])
  return (
    <>
    <div className='dashboard-container'>
        <div className='links-container'>
            <h2>Liste over visualiseringer</h2>
            {fileReferences.length === 0 && (
                <p>Ingen visualiseringer lastet opp</p>
            )}
          {fileReferences.map((element) => {
              if(userInfo.role === "admin"){
                  return (
                    <DashboardAdminLink key={element.fullPath} link={element} />
                  )
              }
              return (
                    <DashboardLink key={element.fullPath} link={element}/>
              )
            ;
          })}

        </div>
        <div className="upload-container">
            <h2>Last opp ny visualisering</h2>
            <label htmlFor="fileUpload">Last opp ny visualisering</label>
            <input type="file" name="fileUpload" id="fileUpload" onChange={ () => {
                setUploadStatusMessage("")
            }}
                />
               
            <button onClick={handleUpload}>Last opp fil</button>
            {uploadStatusMessage && <p>{uploadStatusMessage}</p>}
        </div>

    </div>
        </>
  )
}

export default Dashboard

