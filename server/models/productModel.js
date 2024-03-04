import mongoose from 'mongoose';

const productSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        stock: {
            type: Number,
            required: true,
        },
        oem: {
            type: String,
            required: true,
        },
        price: {
            type: String,
            required: true,
        },
        model: {
            type: String,
            required: true,
        },
        part: {
            type: String,
            required: true,
        },
        isActive: {
            type: Boolean,
            required: true,
        },
        categories: {
            type: Array,
            required: true,
        },
        images: {
            type: Array,
            required: true,
        }
    },
    {
        timestamps: true,
    }
);

export const Product = mongoose.model('Product', productSchema);