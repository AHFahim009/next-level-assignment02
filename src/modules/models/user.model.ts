import mongoose, { Schema } from 'mongoose';
import { User, UserStaticModel } from './interface/user.interface';
import { orderSchema } from './order.model';

const userSchema = new Schema<User, UserStaticModel>(
  {
    userId: {
      type: Number,
      required: [true, 'User ID is required'],
      unique: true,
    },
    username: {
      type: String,
      required: [true, 'Username is required'],
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      select: false,
    },
    fullName: {
      firstName: {
        type: String,
        required: [true, 'First name is required'],
        trim: true,
      },
      lastName: {
        type: String,
        required: [true, 'Last name is required'],
        trim: true,
      },
    },
    age: {
      type: Number,
      required: [true, 'Age is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      trim: true,
      lowercase: true,
    },
    isActive: { type: Boolean, default: true },
    hobbies: { type: [String], default: [], trim: true },
    address: {
      street: {
        type: String,
        required: [true, 'Street is required'],
        trim: true,
      },
      city: { type: String, required: [true, 'City is required'], trim: true },
      country: {
        type: String,
        required: [true, 'Country is required'],
        trim: true,
      },
    },
    orders: { type: [orderSchema] },
  },
  {
    timestamps: true,
  }
);

// static schema for userStaticModel:

userSchema.statics.isUserExit = async function (userId: number) {
  const exitingUser = await userModel.findOne({ userId: userId });
  return exitingUser;
};

export const userModel = mongoose.model<User, UserStaticModel>(
  'user',
  userSchema
);
