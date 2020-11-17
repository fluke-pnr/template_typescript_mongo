import { Router } from 'express';
/** Routes */
import BlogCrudRoute from './controller';

const BlogRoute = Router();
BlogRoute.use('/', BlogCrudRoute);
export default BlogRoute;
