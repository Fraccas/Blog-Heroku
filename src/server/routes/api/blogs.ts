import * as express from 'express';
import db from '../../db';
import { RequestHandler } from 'express-serve-static-core';

const router = express.Router();

const isLogged: RequestHandler = (req:any, res, next) => {
    if (!req.user) {
        return res.sendStatus(401);
    } else {
        return next();
    }
}

router.get('/', async (req, res) => {
    try {
        res.json(await db.Blogs.getBlogs());
    } catch (e) {
        res.sendStatus(500);
        console.log(e);
    }
});

router.get('/alltags', async (req, res) => { 
    try {
        res.json(await db.Blogs.getAllTags()); 
    } catch (e) {
        res.sendStatus(500);
        console.log(e);
    }
});

router.get('/:id', async (req, res) => {
    try {
        res.json(await db.Blogs.getBlogByID(req.params.id));
    } catch (e) {
        res.sendStatus(500);
        console.log(e);
    }
});

router.post('/post/:title/:content/:authorid/:tagid', async (req, res) => {
    try {
        // grab insertID and insert tag with this insertID into DB
        let insertID = await db.Blogs.postBlog(req.params.title, req.params.content, req.params.authorid);
        res.json('something');

        // Insert Tag info into DB
        try {
            res.json(await db.Blogs.postBlogTag(insertID.toString(), req.params.tagid));
        } catch (e) {
            res.sendStatus(500);
            console.log(e);
        }
    } catch (e) {
        res.sendStatus(500);
        console.log(e);
    }
});

router.put('/update/:title/:content/:blogid', isLogged, async (req, res) => {
    try {
        res.json(await db.Blogs.updateBlog(req.params.title, req.params.content, req.params.blogid));
        res.json('success');
    } catch (e) {
        res.sendStatus(500);
        console.log(e);
    }
});

router.delete('/delete/:blogid', async (req, res) => {
    try {
        res.json(await db.Blogs.deleteBlog(req.params.blogid));
    } catch (e) {
        res.sendStatus(500);
        console.log(e);
    }
});

router.get('/tags/:id', async (req, res) => {
    try {
        res.json(await db.Blogs.getBlogTags(req.params.id)); 
    } catch (e) {
        res.sendStatus(500);
        console.log(e);
    }
});

export default router;