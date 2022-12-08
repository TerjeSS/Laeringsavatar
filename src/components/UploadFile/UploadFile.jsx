import { ref, uploadBytes } from 'firebase/storage'
import React, { useState } from 'react'
import { animationsFolder } from '../../resources/firebase'

const UploadFile = ({userInfo}) => {
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
                {"uploadedBy" : userInfo.email}
        }
        
        const newFileReference = ref(animationsFolder, fileList[0].name)

        uploadBytes(newFileReference, fileList[0], metaData).then((snapshot) => {
            setUploadStatusMessage("Filen ble lastet opp")
            document.getElementById("fileUpload").value = null
        }).catch((error) => {
            setUploadStatusMessage(error)
        })
    }

  return (
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
  )
}

export default UploadFile