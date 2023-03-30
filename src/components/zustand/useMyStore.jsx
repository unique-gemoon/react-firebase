import { create } from 'zustand'
import { auth, storage } from '../../firebase-config';
import { ref, deleteObject } from "firebase/storage";
import { MySwal } from './../Alert';

const useMyStore = create((set) => ({
    user: auth.currentUser,
    removeImg: async (path) => {
        const storageRef = ref(storage, path);
        // Delete the file
        deleteObject(storageRef)
          .then(() => {
            // File deleted successfully
            MySwal.fire('Raderad!','','success');
          })
          .catch((error) => {
            console.log(error);
            // Uh-oh, an error occurred!
            //alert("Något blev fel. Försök igen senare");
            MySwal.fire({
              icon: 'error',
              title: 'Oops...',
            });
          });
      },


}))

export default useMyStore;