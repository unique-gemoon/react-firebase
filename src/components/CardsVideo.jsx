import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import {storage, auth} from '../firebase-config'
import {ref, getDownloadURL, uploadBytesResumable, listAll, list, deleteObject } from "firebase/storage";

function CardsVideo({url, path, removeImg}) {
  return (
    <div>
    <Card style={{ width: '18rem' }}>
            <video className="d-block mx-auto" style={{ width: "18rem" }} autoPlay controls>
              <source src={url} />
            </video>
        <Card.Body>
        <Button variant="primary" onClick={() => removeImg(path)}>Ta bort bild/video</Button>
        </Card.Body>
    </Card>
    </div>
  )
}

export default CardsVideo