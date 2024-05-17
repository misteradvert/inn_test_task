const express = require('express');
// const fetch = require('node-fetch');
const router = express.Router();

router.post('/fetchData/:id', (req, res) => {
  const API_KEY = 'ef62579e42f1a3b994cb3315448e63e30738dee7';
  const url = 'http://suggestions.dadata.ru/suggestions/api/4_1/rs/findById/party';
  const inn = req.params.id; // Убедитесь, что параметр корректно извлекается из req.params.id
  console.log('---', req.params.id);

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Token ${API_KEY}`,
    },
    body: JSON.stringify({ query: inn }), // Включите параметр inn в тело запроса
  };

  fetch(url, options)
    .then((response) => response.json())
    .then((result) => {
      // Обработка ответа API и извлечение необходимых данных по ИНН
      res.json(result);
      console.log('RESULT---', result);
    })
    .catch((error) => {
      console.error('Ошибка:', error);
      res.status(500).json({ error: 'Произошла ошибка при получении данных' });
    });
});

module.exports = router;
