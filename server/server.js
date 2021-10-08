const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const { workoutsRouter, exercisesRouter } = require('./routes');

const app = express();

app.use(bodyParser.json());

app.set('port', 3000);

app.listen(app.get('port'), '0.0.0.0', () => {
   console.log(`[OK] Server is running on localhost:${app.get('port')}`);
});

app.use('/', express.static(path.join(__dirname, '../dist')));

app.use('/api/workouts', workoutsRouter);
app.use('/api/exercises', exercisesRouter);