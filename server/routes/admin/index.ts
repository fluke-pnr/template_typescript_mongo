import { Router } from 'express';
/** Routes */
import AdminCrudRoute from './controller';

const AdminRoute = Router();
AdminRoute.use('/', AdminCrudRoute);
export default AdminRoute;
