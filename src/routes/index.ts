import { Router } from 'express';
import authRoutes from '../modules/users/routes';

const route = Router();

route.use('/auth', authRoutes)

export default route;
