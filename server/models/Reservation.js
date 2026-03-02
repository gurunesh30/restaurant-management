import mongoose from 'mongoose';

const reservationSchema = new mongoose.Schema(
    {
        customer_name: {
            type: String,
            required: [true, 'Customer name is required'],
            trim: true,
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            trim: true,
            lowercase: true,
        },
        phone: {
            type: String,
            required: [true, 'Phone number is required'],
            trim: true,
        },
        date: {
            type: String,
            required: [true, 'Reservation date is required'],
        },
        time: {
            type: String,
            required: [true, 'Reservation time is required'],
        },
        guests: {
            type: Number,
            required: true,
            min: 1,
            max: 20,
        },
        table_id: {
            type: String,
            required: true,
        },
        floor: {
            type: String,
            required: true,
        },
        special_requests: {
            type: String,
            default: '',
        },
        status: {
            type: String,
            enum: ['Pending', 'Confirmed', 'Cancelled'],
            default: 'Pending',
        },
    },
    { timestamps: true }
);

export default mongoose.model('Reservation', reservationSchema);
