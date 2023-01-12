const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
require('dotenv').config();

app.use(cors());
app.use(express.json());

app.get('/', async (req, res) => {
    res.send(`
    <h1>সব ঠিক ঠাক</h1>
    `)
})

app.listen(port, () => {
    console.log('Alhamdulillah, All Good at ==>', port);
})
