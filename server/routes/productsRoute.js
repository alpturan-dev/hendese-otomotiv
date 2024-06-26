import express from 'express';
import { Product } from '../models/productModel.js';

const router = express.Router();

// Route for Save a new Book
router.post('/', async (request, response) => {
    try {
        if (
            !request.body.name ||
            !request.body.description ||
            !request.body.stock ||
            !request.body.oem ||
            !request.body.price ||
            !request.body.models ||
            !request.body.part ||
            !request.body.isActive ||
            !request.body.categories ||
            !request.body.images
        ) {
            return response.status(400).send({
                message: 'Send all required fields!',
            });
        }
        const newProduct = {
            ...request.body
        };

        const product = await Product.create(newProduct);

        return response.status(201).send(product);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Route for Get All Books from database
router.get('/', async (request, response) => {
    try {
        const products = await Product.find({});

        return response.status(200).json({
            count: products.length,
            data: products,
        });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Route for Get One Book from database by id
router.get('/:id', async (request, response) => {
    try {
        const { id } = request.params;

        const book = await Product.findById(id);

        return response.status(200).json(book);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Route for Get One Book from database by id
router.get('/part/:part', async (request, response) => {
    try {
        const { part } = request.params;

        const products = await Product.find({ part: part });

        return response.status(200).json(products);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Route for Update a Book
router.put('/:id', async (request, response) => {
    try {
        if (
            !request.body.name ||
            !request.body.description ||
            !request.body.stock ||
            !request.body.oem ||
            !request.body.price ||
            !request.body.models ||
            !request.body.part ||
            !request.body.isActive ||
            !request.body.categories ||
            !request.body.images
        ) {
            return response.status(400).send({
                message: 'Send all required fields!',
            });
        }

        const { id } = request.params;

        const result = await Product.findByIdAndUpdate(id, request.body);

        if (!result) {
            return response.status(404).json({ message: 'Product not found' });
        }

        return response.status(200).send(result);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

router.delete('/:id', async (request, response) => {
    try {
        const { id } = request.params;

        const result = await Product.findByIdAndDelete(id);

        if (!result) {
            return response.status(404).json({ message: 'Product not found' });
        }

        return response.status(200).send({ message: 'Product deleted successfully' });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

export default router;