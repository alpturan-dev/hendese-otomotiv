// server/routes/uploads.js

import express from "express";
import { uploadImage } from "../firebaseService";

const router = express.Router();

// Route for handling image uploads
router.post("/uploadProductImage", async (req, res) => {
    try {
        // Assuming 'file' is sent in the request body
        const { file } = req.body;

        // Call the uploadImage function to upload the file
        const downloadURL = await uploadImage(file);

        // Send the download URL back to the client
        res.json({ downloadURL });
    } catch (error) {
        console.error("Error uploading image:", error);
        res.status(500).json({ error: "Failed to upload image" });
    }
});

export default router;
