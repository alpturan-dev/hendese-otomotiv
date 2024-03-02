// server/firebaseService.js
import { v4 as uuidv4 } from 'uuid';
import { ref, uploadBytes } from "firebase/storage";
import { storage } from '../config/firebaseConfig.js';

// Function to upload image to Firestore Storage
export const uploadImage = async (file) => {
    try {
        // Create a reference to the storage bucket location
        const storageRef = ref(storage, `images/${uuidv4()}`);

        // Upload the file to the storage bucket
        const snapshot = await uploadBytes(storageRef, file);

        // Return the download URL of the uploaded file
        return snapshot.ref.getDownloadURL();
    } catch (error) {
        console.error("Error uploading image:", error);
        throw error; // Rethrow the error to be handled by the caller
    }
};
