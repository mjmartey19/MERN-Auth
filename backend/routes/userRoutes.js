import express from 'express';
import { authUser } from '../controllers/userControllers.js';

const router = express.Router(); //initilize router

router.post('/auth', authUser)

export default router;
