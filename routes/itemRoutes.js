import express from 'express';
const router =express.Router();
import {authenticateToken} from '../middleware/authMiddleWare.js';
import { getAllItems,getItemById,createItem,updateItem,deleteItem } from '../controllers/itemController.js';

//Get all items
router.get('/', getAllItems);//public route
//Create new item
router.post('/', authenticateToken,createItem);//protetected route
//Get item by id
router.get('/:id',getItemById);//public route
//Update item
router.put('/:id',authenticateToken, updateItem);//protetected route
//Delete item
router.delete('/:id',authenticateToken, deleteItem);//protetected route
export default router;