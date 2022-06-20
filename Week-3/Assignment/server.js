const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = 3000;

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  return res.sendFile('index.html', path.join(__dirname, 'public'))
})

app.get('/data', (req, res) => {
  let number = req.query.number;
  if (!number) {
    return res.status(400).json({
      error: 'Lack of Parameter'
    });
  }

  number = Number(number);

  if (isNaN(number)) {
    return res.status(400).json({
      error: 'Wrong Parameter'
    });
  }

  function count(number) {
    if (number < 1) return 0;
    return number + count(number-1);
  }

  let answer = count(number);

  return res.status(200).json({
    answer
  });
});

app.get('/myName', (req, res) => {
  let name = req.cookies.name;
  if (name) {
    return res.status(200).send(`
      <h1>Name:</h1>  
      <h1>${name}</h1>
      `
    )
  } else {
    res.redirect('/trackname.html')
  }
})

app.get('/trackName', (req, res) => {
  const name = req.query.name;
  if (!name) {
    return res.status(400).json({
      error: 'Name is required.'
    })
  }
  res.cookie('name', name, { maxAge: 1000 * 60 * 60, httpOnly: true });
  return res.status(200).json({
    ok: true
  })
})

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}...`)
});