import { Request, Response, Router } from 'express';

const WebsiteRoute = Router();
WebsiteRoute.get('/test', (req: Request, res: Response) => {
  return res.render('pages/index');
});

export default WebsiteRoute;