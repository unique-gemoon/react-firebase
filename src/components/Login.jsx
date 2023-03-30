import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase-config';
import Button from 'react-bootstrap/Button';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

function Login({onLogin}) {
    const [getUserName, setUserName] = useState('');
    const [getPassword, setPassword] = useState('');

    function errMessage() {
        Swal.fire({
          icon: 'error',
          text: 'Du har angivit fel inloggningsuppgifter. Vänligen försök igen',
        });
      }

    const handleLogin = async (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, getUserName, getPassword)
        .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        onLogin();
        //console.log(user);
        // ...
        })
        .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
        console.log('Error!');
        errMessage();
        // ..
        });
    };

  return (
    <div className="container-fluid">
      <h1 className="text-center">Logga in</h1>
      <div className="m-2">
        <input
          type="email"
          className="form-control mt-1"
          placeholder="Ange mailadress"
          onChange={(e) => setUserName(e.target.value)}
        />
      </div>
      <div className="m-2">
        <input
          type="password"
          className="form-control mt-1"
          placeholder="Ange Lösenord"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="m-2">
        <Button variant="primary" onClick={handleLogin}>
          Logga in
        </Button>{' '}
      </div>
    </div>
  )
}

export default Login