import { Request, Response, Router } from 'express';
import passport from "passport";

const WebsiteRoute = Router();
WebsiteRoute.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
}));

export default WebsiteRoute;