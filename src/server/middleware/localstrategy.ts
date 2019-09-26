import * as passport from 'passport';
import * as LocalStrategy from 'passport-local';

import { ComparePass } from '../utils/security/password';
import DB from '../db';

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

passport.use(new LocalStrategy.Strategy({
    usernameField: 'email',
    session: false
}, async (email, password, done) => {
    try {
        let [user]: any = await DB.Authors.getAuthorByEmail(email);
        if (user && ComparePass(password, user.password)) {
            done(null, user); // login success 
        } else {
            done(null, false); // login failed
        }
    } catch (e) {
        done(e);
    }
}));