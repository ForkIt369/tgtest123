const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const BOT_TOKEN = '6855290593:AAFHEcsjzfcNrOOD27Nth0M1QDp5nKKRJO8';

app.get('/auth/telegram', (req, res) => {
  const { hash, ...queryParams } = req.query;

  // Verify the authentication request
  const dataCheckString = Object.keys(queryParams)
    .map(key => `${key}=${queryParams[key]}`)
    .sort()
    .join('\n');

  const secretKey = crypto
    .createHash('sha256')
    .update(BOT_TOKEN)
    .digest();

  const checkHash = crypto
    .createHmac('sha256', secretKey)
    .update(dataCheckString)
    .digest('hex');

  if (checkHash !== hash) {
    return res.status(403).send('Forbidden');
  }

  // Save user data or proceed with login
  const user = queryParams;
  // Here, you can save the user data to your database or session
  // For now, we'll just redirect to the game page with user data

  res.redirect(`https://forkit369.github.io/tgtest123/?id=${user.id}&first_name=${user.first_name}`);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
