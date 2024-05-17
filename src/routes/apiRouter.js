const express = require('express');

const router = express.Router();

router.post('/fetchData/:id', (req, res) => {
  const API_KEY = 'ef62579e42f1a3b994cb3315448e63e30738dee7';
  const url = 'http://suggestions.dadata.ru/suggestions/api/4_1/rs/findById/party';
  const inn = req.params.id;

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Token ${API_KEY}`,
    },
    body: JSON.stringify({ query: inn }),
  };

  fetch(url, options)
    .then((response) => response.json())
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      console.error('Ошибка:', error);
      res.status(500).json({ error: 'Произошла ошибка при получении данных' });
    });
});

module.exports = router;
