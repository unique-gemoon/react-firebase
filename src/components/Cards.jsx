import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import {storage, auth} from '../firebase-config'
import {ref, getDownloadURL, uploadBytesResumable, listAll, list, deleteObject } from "firebase/storage";


function Cards({url, path, removeImg}) {
  return (
    <div>
        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={url} />
            <Card.Body>
            <Button variant="primary" onClick={() => removeImg(path)}>Ta bort bild/video</Button>
            </Card.Body>
        </Card>
    </div>
  )
}

export default Cards