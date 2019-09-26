import * as express from 'express';

import blogsRouter from './blogs';
import authorsRouter from './authors';
import tokensRouter from './tokens';
import donateRouter from './donate';
import passport = require('passport');

const router = express.Router();

router.use((req, res, next) => {
    passport.authenticate('bearer', { session: false }, (err, user, info) => {
        if (user) req.user = user;
        return next();
    }) (req, res, next);
});

router.use('/blogs', blogsRouter);
router.use('/authors', authorsRouter);
router.use('/tokens', tokensRouter);
router.use('/donate', donateRouter);

export default router;