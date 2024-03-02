import express from 'express';
import 'dotenv/config'
import mongoose from 'mongoose';
import productsRoute from './routes/productsRoute.js';
import uploadsRoute from './routes/uploadsRoute.js'
import cors from 'cors';

const app = express();

app.use(express.json());

app.use(cors());

app.use('/products', productsRoute);
app.use('/uploads', uploadsRoute);

app.get('/', (request, response) => {
    console.log(request);
    return response.status(234).send('Welcome To MERN Stack Tutorial');
});

mongoose
    .connect(process.env.ATLAS_URI)
    .then(() => {
        console.log('App connected to database');
        app.listen(process.env.PORT, () => {
            console.log(`App is listening to port: ${process.env.PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
    });