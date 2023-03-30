import React, {useState} from 'react'
import Button from 'react-bootstrap/Button';
import { Link, Switch, Route } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import Files from './Files/Files';
import Slideshow from './Slideshow';
import {auth} from "./../firebase-config";
import { MySwal } from './Alert';


function Input({user}) {
  const [fileUploaded, setFileUploaded] = useState(false);

  const handleFileUploaded = () => {
    setFileUploaded(true);
  };

  if(!user)
  {
    return <Navigate to="/"/>
  }
  const logOut = () => {
    auth.signOut(auth).then(() => {
      localStorage.removeItem('authenticated');
      localStorage.removeItem('currentUser');      
      <Navigate to="/"/>
      setTimeout(window.location.reload(), 3000);
      console.log("Hello World!")
    }).catch((error) => {
      // An error happened.
      MySwal.fire('Error!', 'Error!', 'error');
    });
    
  }

  return(
    <div>
      <div className="App">
      <Button variant="info" onClick={logOut}>Logga ut</Button>{' '}
        <Files/>
      </div>
      <div>
        <Link to="/slideshow" target="_blank"><Button variant="primary">Tryck här för att komma till bilderna och videos</Button>{' '}</Link>
      </div>
    </div>
  )
  }
  



export default Input;