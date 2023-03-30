import React from 'react'
import { storage, auth } from '../../firebase-config'
import { useEffect, useState } from "react";
import { ref, getDownloadURL, listAll, deleteObject } from "firebase/storage";
import Cards from './../Cards';
import { MySwal } from './../Alert';
import CardsVideo from '../CardsVideo'

function GetAllFiles(props) {
  const { files: filesProp } = props;
  const [files, setFiles] = useState(filesProp);

    useEffect(() => {
        const storageRef = ref(storage, 'files/');
        listAll(storageRef)
        .then(res => {
            const promises = res.items.map(itemRef => {
                return getDownloadURL(itemRef)
                .then(url => ({
                    url,
                    path: itemRef.fullPath,
                }));
            });
            Promise.all(promises).then(fileData => {
                setFiles(fileData);
                props.onFileInfo(fileData); // Call the onImgUrlChange function with the imgUrl value
                //console.log(fileData)
                //console.log("Component: GetAllFiles")

            });
        })
        .catch(error => {
            console.log(error);
        });
    }, []);
  
      
    const removeImg = async (path) => {
      const storageRef = ref(storage, path);
      // Delete the file
        deleteObject(storageRef).then(() => {
          // File deleted successfully
          MySwal.fire('Raderad!','','success');
          setFiles((prevFiles) =>
          prevFiles.filter((file) => file.path !== path)
        );
  
        }).catch((error) => {
          // Uh-oh, an error occurred!
          //alert("Något blev fel. Försök igen senare");
          MySwal.fire({
            icon: 'error',
            title: 'Oops...',
          });
        })
    }
  
    return (
      <div>
        <div className='imgs'>
          {    
            files.map((item, index) => {
              if(item.path.includes("mp4") || item.path.includes("WebM") || item.path.includes("mov") || item.path.includes("ogg") || item.path.includes(".MOV")){
              return <CardsVideo key={index} url={item.url} removeImg={() => removeImg(item.path)}/>
              }
              else{
                return <Cards key={index} url={item.url} removeImg={() => removeImg(item.path)}/>

              }
            })
          }
          </div>
      </div>
  
    );
}

export default GetAllFiles