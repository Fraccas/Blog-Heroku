import * as passport from 'passport';
import * as BearStrategy from 'passport-http-bearer';

import { ValidToken } from '../utils/security/tokens';
import DB from '../db';

passport.use(new BearStrategy.Strategy(async (token, done) => {
    try {
        let payload = await ValidToken(token);
        let [user]: any = await DB.Authors.getAuthorById(payload.userid);
        if (user) {
            done(null, user); // has a valid token
        } else {
            done(null, false); // invalid token
        }
    } catch (e) {
        done(e);
    }
}));