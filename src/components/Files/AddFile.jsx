import React, {useState, useEffect} from 'react'
import {storage} from '../../firebase-config'
import {ref, getDownloadURL, uploadBytesResumable, listAll, deleteObject } from "firebase/storage";
import { MySwal } from './../Alert';
import Button from 'react-bootstrap/Button';
import { DelAllFiles } from './DelAllFiles';
import axios from 'axios';
import socketIOClient from 'socket.io-client';
import io from 'socket.io-client';



function AddFile(props) {
    const [imgUrl, setImgUrl] = useState(null);
    const [progresspercent, setProgresspercent] = useState(0);
    const [movFile, setMovFile] = useState();
    const [isConverted, setIsConverted] = useState(false);
    const [convertedFilePath, setConvertedFilePath] = useState(null);
    const [message, setMessage] = useState('');
    const [socket, setSocket] = useState('');



    useEffect(() => {
      const newSocket = io('http://localhost:5000');
      setSocket(newSocket);
    
      newSocket.on('connect', () => {
        console.log('Connected to server with socket');
      });
    
      return () => {
        newSocket.disconnect();
      };
    }, []);

    const waitForConversion = (socket) => {
        const handleConversionComplete = (data) => {
          console.log('Received conversionComplete event:', data);
          console.log('Conversion complete:', data);
          setConvertedFilePath(data.path);
        };
    
        // Lyssna på 'conversionComplete'-händelsen endast en gång
        socket.once('conversionComplete', handleConversionComplete);
    };
    
    

    const convertFile = async (e, file) => {
      e.preventDefault();
      const formData = new FormData();
      formData.append('file', file);
      try {
        await axios.post('http://localhost:5000/convert', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });

        return true;
      } catch (err) {
        console.log(err);
        return false;
      }
    };
    
    const uploadFile = async (e, storage, file) => {
      e.preventDefault();
      const storageRef = ref(storage, `files/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);
  
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgresspercent(progress);
          if (progress === 100) {
              MySwal.fire('Klart!', 'Filerna är nu uppladdade!', 'success');
              
          }
        },
        (error) => {
          alert(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            //console.log(downloadURL);
            setImgUrl(downloadURL);
            props.onImgUrlChange(downloadURL, uploadTask.snapshot.ref.fullPath); // Call the onImgUrlChange function with the imgUrl value
            setTimeout(window.location.reload(), 3000);

          });
        }
      ); 
    }
    
    const handleSubmit = async (e) => {
      e.preventDefault();
      const file = e.target[0]?.files[0];
      console.log(file.type);
      if (!file) return;
      else if (file.type === "video/quicktime") {
        const res = await convertFile(e, file);
        console.log(res);
        if (res === true) {
          // Anropa waitForConversion och invänta sökvägen till den konverterade filen
          const newPath = await waitForConversion(socket);
          console.log(newPath);
    
          // Skapa en ny File-objekt från newPath och använd den för att ladda upp filen
          const convertedFile = new File([await fetch(newPath).then((res) => res.blob())], file.name, { type: file.type });
          //await uploadFile(e, storage, convertedFile);
        } else {
          console.log("Error");
        }
        console.log(res);
      } else {
        await uploadFile(e, storage, file);
      }
    };
    
    

  return (
    <div className="App">
    <div className='border d-flex flex-row align-items-center'>
    <form onSubmit={handleSubmit} className='form m-2 p-2'>
      <input type='file' className='m-2' accept="image/*, video/*"/>
      <Button variant="primary" type='submit' className='m-2'>Ladda upp</Button>{' '}
    </form>
    <div>
    </div>
    </div>
    {
      !imgUrl &&
      <div className='outerbar'>
        <div className='innerbar' style={{ width: `${progresspercent}%` }}>{progresspercent}%</div>
      </div>
    }
    <div>{message}</div>
  </div>
  )
}

export default AddFile