import mongoose from 'mongoose';

const menuItemSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Dish name is required'],
            trim: true,
        },
        description: {
            type: String,
            required: [true, 'Description is required'],
            trim: true,
        },
        price: {
            type: Number,
            required: [true, 'Price is required'],
            min: 0,
        },
        category: {
            type: String,
            required: true,
            enum: ['Appetizers', 'Mains', 'Desserts', 'Beverages'],
            default: 'Mains',
        },
        image_url: {
            type: String,
            default: '',
        },
        is_available: {
            type: Boolean,
            default: true,
        },
    },
    { timestamps: true }
);

export default mongoose.model('MenuItem', menuItemSchema);
