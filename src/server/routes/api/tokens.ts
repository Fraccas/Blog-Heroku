import * as express from 'express';
import db from '../../db';

const router = express.Router();

router.get('/:id/:token', async (req, res) => {
    try {
        res.json(await db.AccessTokens.getToken(req.params.id, req.params.token)); 
    } catch (e) {
        res.sendStatus(500);
        console.log(e);
    }
});

router.post('/add/:authorid', async (req, res) => {
    try {
        res.json(await db.AccessTokens.addToken(req.params.authorid)); 
    } catch (e) {
        res.sendStatus(500);
        console.log(e);
    }
});

router.put('/update/:token/:id', async (req, res) => {
    try {
        res.json(await db.AccessTokens.updateToken(req.params.token, req.params.id)); 
    } catch (e) {
        res.sendStatus(500);
        console.log(e);
    }
});

export default router;