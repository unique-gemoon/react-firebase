import React, {useState, useEffect} from 'react'
import AddFile from './AddFile'
import GetAllFiles from './GetAllFiles';
import { DelAllFiles } from './DelAllFiles';
import { ref, listAll, deleteObject } from "firebase/storage";
import {storage} from '../../firebase-config'
import { MySwal } from './../Alert';

function Files() {
  const [getImg, SetGetImg] = useState([]);
  const [files, setFiles] = useState([]);

  const handleImgUrlChange = (imgUrl, path) => {
    // Update parent's state with the imgUrl value
    SetGetImg(prevState => [...prevState, {url: imgUrl, path: path}]);
  };

  const handleChildFunction = (fileData) => {
    // function logic here
    setFiles(fileData);
  };
    
  const handleDeleteAllFiles = () => {
    const folder = ref(storage, 'files/');

    listAll(folder)
      .then(result => {
        const deletePromises = result.items.map(fileRef => deleteObject(fileRef));

        Promise.all(deletePromises)
          .then(() => {
            setFiles([]); // update the files state after all files have been deleted
            MySwal.fire('Klart!', 'Filerna är nu uppladdade!', 'success');
            console.log("Component: Files")
            setTimeout(window.location.reload(), 3000);
          })
          .catch(error => {
            console.error(`Error deleting files: ${error.message}`);
          });
      })
      .catch(error => {
        console.error(`Error listing files: ${error.message}`);
      });

  };
    
     
  return (
    <div>
        <p className='text-center'>
            Här kan du lägga till, ta bort och hämta alla filer
        </p>
        <div className='Add'>
            <h2>Lägga till fil</h2>
            <AddFile onImgUrlChange={handleImgUrlChange} getImg={getImg}/>
            <DelAllFiles onDeleteAllFiles={handleDeleteAllFiles}/>
            <div>
                <GetAllFiles files={files} onFileInfo={handleChildFunction}/>
            </div>
        </div>
        <div>
        </div>
    </div>
  )
}

export default Files;
