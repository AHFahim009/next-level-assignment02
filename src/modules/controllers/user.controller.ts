import { Request, Response } from 'express';
import { userService } from '../services/user.service';
import userSchemaZod from '../validation/user.validation';
import userUpdateSchemaZod from '../validation/userUpdate.validation';
import { User } from '../models/interface/user.interface';

//01. create a  user controller
const createUser = async (req: Request, res: Response) => {
  try {
    const user = req.body;

    // will validate by zod

    const userValidatedByZod = userSchemaZod.parse(user);

    // connect with service
    const result = await userService.userCreated(userValidatedByZod);

    return res.status(201).json({
      success: true,
      message: 'User created successfully!',
      data: result,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      warning: (err as Error)?.message,
      message: 'User created failed! try again bro!',
      error: err,
    });
  }
};

//02. retrieve all the user
const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await userService.getUsers();
    return res.status(200).json({
      success: true,
      message: 'Users fetched successfully!',
      data: result,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: 'User fetched failed! try again bro!',
      error: err,
    });
  }
};

// 03. Retrieve a specific user by ID

const getSpecificUser = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId);
    const result = await userService.getSpecificUser(userId);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }
    return res.status(200).json({
      success: true,
      message: 'Users fetched successfully!',
      data: result,
    });
  } catch (err) {
    return res.status(500).json({
      error: err,
    });
  }
};

// 04. process update client data and connect to service
const updateUser = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId);

    if (isNaN(userId)) {
      return res.status(404).json({
        message: 'Invalid user ID',
      });
    }

    const updatedUserData = req.body;
    const validateByZod = userUpdateSchemaZod.parse(updatedUserData) as User;

    const result = await userService.updateUser(userId, validateByZod);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }

    return res.status(200).json({
      success: true,
      message: 'User updated successfully!',
      data: result,
    });
  } catch (err) {
    return res.status(500).json({
      cautions: (err as Error)?.message,
      error: err,
    });
  }
};

// 05. process delete client data and connect to service
const deleteUser = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId);

    if (isNaN(userId)) {
      return res.status(404).json({
        message: 'Invalid user ID',
      });
    }

    const result = await userService.deleteUser(userId);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }

    return res.status(200).json({
      success: true,
      message: 'User deleted successfully!',
      data: null,
    });
  } catch (err) {
    return res.status(500).json({
      error: err,
    });
  }
};

// 06. add a new product in orders
const addNewProduct = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId);
    const { productName, price, quantity } = req.body;

    const orderData = {
      productName,
      price,
      quantity,
    };

    const result = await userService.addNewProduct(userId, orderData);
    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Order created successfully!',
      data: null,
    });
  } catch (err) {
    return res.status(500).json({
      error: err,
    });
  }
};

//07. get all orders of a user
const getAllOrders = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId);
    const result = await userService.getAllOrders(userId);
    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Order fetched successfully!',
      data: result,
    });
  } catch (err) {
    return res.status(500).json({
      message: (err as Error)?.message,
    });
  }
};

const calculateTotalPrice = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId);
    const result = await userService.calculateTotalPrice(userId);
    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Total price calculated successfully!',
      data: result,
    });
  } catch (err) {
    return res.status(500).json({
      error: err,
    });
  }
};

export const userController = {
  createUser,
  getAllUsers,
  getSpecificUser,
  updateUser,
  deleteUser,
  addNewProduct,
  getAllOrders,
  calculateTotalPrice,
};
