import express from 'express';
import { userController } from '../controllers/user.controller';

const router = express.Router();
// Implement the POST /api/users endpoint to create a new user.

router.post('/users', userController.createUser);

// Implement the GET /api/users endpoint to retrieve a list of users.
router.get('/users', userController.getAllUsers);

// Implement the GET /api/users/:userId endpoint to retrieve a specific user by ID.
router.get('/users/:userId', userController.getSpecificUser);

// Implement the PUT /api/users/:userId endpoint to update user information.
router.put('/users/:userId', userController.updateUser);

// Implement the DELETE /api/users/:userId endpoint to delete a user.
router.delete('/users/:userId', userController.deleteUser);

// Implement the PUT /api/users/:userId/orders endpoint to add a new product to the user's orders.

router.put('/users/:userId/orders', userController.addNewProduct);

//Implement the GET /api/users/:userId/orders endpoint to retrieve all orders for a specific user.

router.get('/users/:userId/orders', userController.getAllOrders);

// Implement the GET /api/users/:userId/orders/total-price endpoint to calculate the total price of orders for a specific user.
router.get(
  '/users/:userId/orders/total-price',
  userController.calculateTotalPrice
);

export const userRouter = router;
