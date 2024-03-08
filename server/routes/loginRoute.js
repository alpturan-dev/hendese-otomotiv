import express from 'express';
import { User } from '../models/userModel.js';

const router = express.Router();

router.post('/', async (request, response) => {
    try {
        if (
            !request.body.username ||
            !request.body.password
        ) {
            return response.status(400).send({
                message: 'Send all required fields!',
            });
        }

        const username = request.body.username;
        const password = request.body.password;

        const user = await User.findOne({ username: username, password: password });

        console.log("user", user)
        if (!user) {
            return response.status(401).send(user);
        }

        return response.status(200).send(user);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

export default router