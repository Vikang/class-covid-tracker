import * as express from 'express';
import DB from './db';

const router = express.Router();

router.get('/api/hello', (req, res, next) => {
    res.json('World');
});

router.get('/api/blogs', async (req,res) => {
    try {
        let uva_student = await DB.uva_student.all();
        res.json(uva_student);
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
})

export default router;