// server/firebaseService.js
import { v4 as uuidv4 } from 'uuid';
import { ref, uploadBytes } from "firebase/storage";
import { storage } from '../config/firebaseConfig.js';

// Function to upload multiple images to Firestore Storage
export const uploadImages = async (files) => {
    try {
        const uploadTasks = [];

        // Iterate over each file and upload them individually
        files.forEach((file) => {
            const fileName = file.name; // Use the original file name as the Firestore Storage file name
            const storageRef = ref(storage, fileName);
            const uploadTask = uploadBytes(storageRef, file);
            uploadTasks.push(uploadTask);
        });

        // Wait for all upload tasks to complete
        await Promise.all(uploadTasks);

        // Return an array of download URLs for the uploaded images
        const downloadURLs = await Promise.all(uploadTasks.map((uploadTask) => uploadTask.snapshot.ref.getDownloadURL()));
        return downloadURLs;
    } catch (error) {
        console.error("Error uploading images:", error);
        throw error;
    }
};
