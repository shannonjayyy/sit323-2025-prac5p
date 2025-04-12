const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to the Unit Converter App!');
});

app.post('/convert', (req, res) => {
  const { type, from, to, value } = req.body;
  let result;

  const converters = {
    length: {
      'cm': { 'inch': value => value / 2.54 },
      'inch': { 'cm': value => value * 2.54 }
    },
    weight: {
      'kg': { 'lb': value => value * 2.20462 },
      'lb': { 'kg': value => value / 2.20462 }
    },
    temperature: {
      'c': { 'f': value => (value * 9/5) + 32 },
      'f': { 'c': value => (value - 32) * 5/9 }
    }
  };

  try {
    result = converters[type][from][to](value);
    res.json({ result });
  } catch (error) {
    res.status(400).json({ error: 'Invalid conversion parameters.' });
  }
});

app.listen(port, () => {
  console.log(`Unit Converter App listening at http://localhost:${port}`);
});
