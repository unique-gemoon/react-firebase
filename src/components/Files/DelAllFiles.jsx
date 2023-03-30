import React from 'react';
import { storage } from '../../firebase-config';
import { ref, listAll, deleteObject } from 'firebase/storage';
import Button from 'react-bootstrap/Button';

export function DelAllFiles({ onDeleteAllFiles }) { // add the onDeleteAllFiles prop
  const handleDeleteAllFiles = () => {
    const folder = ref(storage, 'files/');

    listAll(folder)
      .then(result => {
        const deletePromises = result.items.map(fileRef => deleteObject(fileRef));

        Promise.all(deletePromises)
          .then(() => {
            onDeleteAllFiles(); // call the onDeleteAllFiles function passed as prop
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
    <Button variant="danger" onClick={handleDeleteAllFiles}>Ta bort alla filer</Button>{' '}    </div>
  );
}
