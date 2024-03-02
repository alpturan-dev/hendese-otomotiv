// server/routes/uploads.js

import express from "express";
import { uploadImages } from "../utils/firebaseService.js";

const router = express.Router();

// Route for handling multiple image uploads
router.post("/uploadProductImages", async (req, res) => {
    try {
        // Assuming 'files' is an array of files sent in the request body
        const { files } = req.body;

        // Call the uploadImages function to upload the files
        const downloadURLs = await uploadImages(files);

        // Send the array of download URLs back to the client
        res.json({ downloadURLs });
    } catch (error) {
        console.error("Error uploading images:", error);
        res.status(500).json({ error: "Failed to upload images" });
    }
});

export default router;
