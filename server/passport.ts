import passport from "passport";
import LocalStrategy from "passport-local";
import Admin from "./models/Admin";

passport.use(new LocalStrategy.Strategy(
  function (username, password, done) {
    Admin.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (user.password === password) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));
const Passport = passport;
export default Passport;
