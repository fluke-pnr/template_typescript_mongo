import { Router } from 'express';
/** Route */
import AdminRoute from './admin';
import BlogRoute from './blog';
import WebsiteRoute from './website';

/** Setup route */
const MainRouter = Router();
MainRouter.use('/', WebsiteRoute);
MainRouter.use('/admin', AdminRoute);
MainRouter.use('/blog', BlogRoute);

export default MainRouter;