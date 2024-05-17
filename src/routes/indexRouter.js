import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  const initState = { hello: 'world' };
  res.render('IndexPage', initState);
});

router.get('/info/:id', (req, res) => {
  // const { id } = req.params.id;
  // res.render('ResultPage', initState);
  res.render('InfoPage');
});

export default router;
