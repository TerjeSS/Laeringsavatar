import { ref, uploadBytes } from 'firebase/storage';
import React,{useState} from 'react'
import DashboardLink from '../components/DashboardLink/DashboardLink';
import { storage } from '../resources/firebase';

const Dashboard = (props) => {
    
    const {fileReferences} = props

    const handleUpload = () => {
        const fileInput = document.getElementById("fileUpload").files
        // const fileRef = ref(storageRef, fileInput[0])
        const animations = ref(storage, "animations")
        const storageRef = ref(animations, fileInput[0].name)
        uploadBytes(storageRef, fileInput[0]).then((snapshot) => {
            console.log("uploaded file");
        })
    }
  return (
    <>
    <div className='dashboard-container'>
        <div className='links-container'>
          {fileReferences.map((element) => {
            return (

                <DashboardLink key={element.fullPath} link={element}/>
             
            );
          })}

        </div>
        <div className="upload-container">
            <label htmlFor="fileUpload">Last opp ny visualisering</label>
            <input type="file" name="fileUpload" id="fileUpload" onChange={(e) =>{
            }
                
                }/>
            <button onClick={handleUpload}>Last opp fil</button>
        </div>

    </div>
        </>
  )
}

export default Dashboard

