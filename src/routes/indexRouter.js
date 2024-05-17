import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  const initState = { hello: 'world' };
  res.render('IndexPage', initState);
});

router.get('/info/:id', (req, res) => {
  res.render('InfoPage');
});

export default router;
