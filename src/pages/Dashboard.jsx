import { ref, uploadBytes } from 'firebase/storage';
import React,{useState} from 'react'
import DashboardLink from '../components/DashboardLink/DashboardLink';
import {animationsFolder, auth } from '../resources/firebase';

const Dashboard = (props) => {
    
    const {fileReferences} = props
    const user = auth.currentUser;
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
        }).catch((error) => {
            setUploadStatusMessage(error)
        })

        document.getElementById("fileUpload").value = null
    }

    
  return (
    <>
    <div className='dashboard-container'>
        <div className='links-container'>
            <h2>Liste over visualiseringer</h2>
            {fileReferences.length === 0 && (
                <p>Ingen visualiseringer lastet opp</p>
            )}
          {fileReferences.map((element) => {
            return (

                <DashboardLink key={element.fullPath} link={element}/>
             
            );
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

