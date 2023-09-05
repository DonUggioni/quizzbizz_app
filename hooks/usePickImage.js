import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { storage, auth } from '../firebase/config';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { updateProfile } from 'firebase/auth';
import { useAppContext } from '../context/context';

const date = new Date().getTime();

function usePickImage() {
  const [uploadProgress, setUploadProgress] = useState(0);
  const storageRef = ref(storage, `images/${date}`);
  const { dispatch } = useAppContext();

  async function uploadImageToFirebase(uri) {
    const response = await fetch(uri);
    const blob = await response.blob();

    if (blob.size > 1000000) {
      return console.log('File too big');
    }

    const uploadTask = uploadBytesResumable(storageRef, blob);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        dispatch({ type: 'SHOW_MODAL' });
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress.toFixed());
        if (progress === 100) {
          setTimeout(() => {
            dispatch({ type: 'HIDE_MODAL' });
          }, 600);
        }
      },
      (error) => {
        console.log(error);
        dispatch({ type: 'HIDE_MODAL' });
      },
      async () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          try {
            updateProfile(auth.currentUser, {
              photoURL: downloadURL,
            });
          } catch (error) {
            console.log('Could not update image', error.message);
          }
        });
        dispatch({
          type: 'SHOW_SNACKBAR',
          payload: 'Avatar updated successfully.',
        });
      }
    );
  }

  async function pickImage() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 0.2,
    });

    if (!result.canceled) {
      if (result.assets[0].fileSize > 2000) {
        console.log('Image too big');
      }
      uploadImageToFirebase(result.assets[0].uri);
    }
  }

  return { pickImage, uploadProgress };
}

export default usePickImage;
