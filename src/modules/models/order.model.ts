import { Schema } from 'mongoose';
import { Orders } from './interface/order.interface';

export const orderSchema = new Schema<Orders>({
  productName: {
    type: String,
    required: [true, 'Product Name is required'],
    trim: true,
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
  },
  quantity: {
    type: Number,
    required: [true, 'Quantity is required'],
  },
});
