import { Orders } from '../models/interface/order.interface';
import { User } from '../models/interface/user.interface';
import { userModel } from '../models/user.model';

// interaction with DB based on userModel:

// o1. created a user (post)
const userCreated = async (user: User) => {
  if (await userModel.isUserExit(user.userId)) {
    throw new Error('user already exists');
  }
  const result = await userModel.create(user);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password, orders, ...refineUser } = result.toObject();
  return refineUser;
};

//02. retrieve all users (get)
const getUsers = async () => {
  const result = await userModel.find();
  return result;
};

// 03. Retrieve a specific user by ID
const getSpecificUser = async (userId: number) => {
  const result = await userModel.findOne({ userId: userId });

  return result;
};

// 04. Implement update user information.
const updateUser = async (userId: number, updatedUserData: User) => {
  const result = await userModel.findOneAndUpdate({ userId }, updatedUserData, {
    new: true,
  });

  return result;
};

// 05.Delete a user
const deleteUser = async (userId: number) => {
  const result = await userModel.findOneAndDelete({ userId });
  return result;
};

// 06. Add New Product in Order
const addNewProduct = async (userId: number, product: Orders) => {
  const user = await userModel.findOne({ userId });

  if (!user) {
    return null;
  }

  if (!user.orders) {
    user.orders = [];
  }

  user.orders.push(product);

  // Save the updated user
  const result = await user.save();

  return result;
};

// 07. Retrieve all orders for a specific user
const getAllOrders = async (userId: number) => {
  const userOrder = await userModel
    .findOne({ userId: userId })
    .select('+orders');
  if (!userOrder) {
    return null;
  } else if (userOrder.orders?.length === 0) {
    throw new Error('You have no orders');
  }

  return userOrder.orders;
};

// 08. calculate total price a user
const calculateTotalPrice = async (userId: number) => {
  const user = await userModel.findOne({ userId });
  if (!user) {
    return null;
  }
  if (!user.orders) {
    return null;
  }
  const totalPrice = user.orders.reduce(
    (total, order) => total + order.price * order.quantity,
    0
  );
  return { totalPrice };
};

export const userService = {
  userCreated,
  getUsers,
  getSpecificUser,
  updateUser,
  deleteUser,
  addNewProduct,
  getAllOrders,
  calculateTotalPrice,
};
