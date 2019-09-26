import * as express from 'express';
import router from './routes';
import * as path from 'path';

import * as passport from 'passport';
import './middleware/localstrategy';
import './middleware/bearerstrategy';

const app = express();

app.use(express.json());
app.use(express.static('public'));
app.use(passport.initialize());

app.use(router);

// allows me to refresh outside of / 
app.use('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Fullstack Blog: Server listening on port: ${port}`));
