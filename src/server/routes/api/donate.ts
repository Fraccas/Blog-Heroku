import * as express from 'express';
import * as stripeLoader from 'stripe';

const router = express.Router();

const stripe = new stripeLoader('*********');

const charge = (token: string, amt: number) => {
    return stripe.charges.create({
        amount: amt * 100,
        currency: 'usd',
        source: token,
        description: 'Statement from stripe...'
    });
}

router.post('/', async (req, res, next) => {
    try {
        let data = await charge(req.body.token.id, req.body.amount);
        res.send("Charged!");
    } catch (e) {
        console.log(e);
        res.status(500);
    }
})

export default router;