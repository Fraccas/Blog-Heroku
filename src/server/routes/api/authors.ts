import * as express from 'express';
import db from '../../db';

const router = express.Router();

// get author name by id
router.get('/name/:id', async (req, res) => {
    try {
        res.json(await db.Authors.getAuthorById(req.params.id));
    } catch (e) {
        res.sendStatus(500);
        console.log(e);
    }
});

// get author id by name
router.get('/:name', async (req, res) => {
    try {
        res.json(await db.Authors.getAuthorByName(req.params.name));
    } catch (e) {
        res.sendStatus(500);
        console.log(e);
    }
});

// get author by email
router.get('/email/:email', async (req, res) => {
    try {
        res.json(await db.Authors.getAuthorByEmail(req.params.email));
    } catch (e) {
        res.sendStatus(500);
        console.log(e);
    }
});

router.post('/new/:name/:email/:password', async (req, res) => {
    try {
        res.json(await db.Authors.createAuthor(req.params.name, req.params.email, req.params.password));
    } catch (e) {
        res.sendStatus(500);
        console.log(e);
    }
});

export default router;