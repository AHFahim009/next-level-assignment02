import { Request, Response } from 'express';
import { userService } from '../services/user.service';
import userSchemaZod from '../validation/user.validation';

//01. create a  user controller
const createUser = async (req: Request, res: Response) => {
  try {
    const user = req.body.user;

    // will validate by zod

    const userValidatedByZod = userSchemaZod.parse(user);

    // connect with service
    const result = await userService.userCreated(userValidatedByZod);

    res.status(200).send({
      success: true,
      message: 'User created successfully!',
      data: result,
    });
  } catch (err: unknown) {
    res.status(500).send({
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
    res.status(200).send({
      success: true,
      message: 'Users fetched successfully!',
      data: result,
    });
  } catch (err) {
    res.status(500).send({
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
      res.status(404).send({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }
    res.status(200).send({
      success: true,
      message: 'Users fetched successfully!',
      data: result,
    });
  } catch (err) {
    res.status(500).send({
      error: err,
    });
  }
};

// 04. process update client data and connect to service
const updateUser = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId);

    if (isNaN(userId)) {
      res.status(404).send({
        message: 'Invalid user ID',
      });
    }

    const updatedUserData = req.body.user;

    // const validatedByZod = userSchemaZod.parse(updatedUserData) as User;

    const result = await userService.updateUser(userId, updatedUserData);

    if (!result) {
      res.status(404).send({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }

    res.status(200).send({
      success: true,
      message: 'User updated successfully!',
      updatedData: updatedUserData,
      data: result,
    });
  } catch (err) {
    res.status(500).send({
      error: err,
    });
  }
};

// 05. process delete client data and connect to service
const deleteUser = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId);

    if (isNaN(userId)) {
      res.status(404).send({
        message: 'Invalid user ID',
      });
    }

    const result = await userService.deleteUser(userId);

    if (!result) {
      res.status(404).send({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }

    res.status(200).send({
      success: true,
      message: 'User deleted successfully!',
      data: null,
    });
  } catch (err) {
    res.status(500).send({
      error: err,
    });
  }
};

// 06. add a new product in orders
const addNewProduct = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId);
    const { productName, price, quantity } = req.body.user;

    const orderData = {
      productName,
      price,
      quantity,
    };

    const result = await userService.addNewProduct(userId, orderData);
    if (!result) {
      res.status(404).send({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }

    res.status(200).send({
      success: true,
      message: 'User product add successfully!',
      data: result,
    });
  } catch (err) {
    res.status(500).send({
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
      res.status(404).send({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }

    res.status(200).send({
      success: true,
      message: 'Order fetched successfully!',
      data: result,
    });
  } catch (err) {
    res.status(500).send({
      error: err,
    });
  }
};

const calculateTotalPrice = async (req: Request, res: Response) => {
  try {
    console.log('hiii');

    const userId = Number(req.params.userId);
    const result = await userService.calculateTotalPrice(userId);
    if (!result) {
      res.status(404).send({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }

    res.status(200).send({
      success: true,
      message: 'Total price calculated successfully!',
      data: result,
    });
  } catch (err) {
    res.status(500).send({
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
