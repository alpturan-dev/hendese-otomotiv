import express from 'express';
import 'dotenv/config'
import mongoose from 'mongoose';
import productsRoute from './routes/productsRoute.js';
import loginRoute from './routes/loginRoute.js'
import cors from 'cors';

const app = express();

app.use(express.json());

app.use(cors());

app.use('/api/products', productsRoute);
app.use('/api/login', loginRoute);

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