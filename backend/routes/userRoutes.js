import express from 'express'
import {getAllUsers,getUserById,addUser,deleteUser} from '../controllers/userController.js'

const userRouter=express.Router()
userRouter.get('/users',getAllUsers);
userRouter.get('/users/:id',getUserById);
userRouter.post('/users',addUser);
userRouter.delete('/users/:id',deleteUser);
userRouter.put('/users/:id', updateUser);

export default userRouter;
