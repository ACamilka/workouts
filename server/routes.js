const express = require('express');
const data = require('./data.json');

const workoutsRouter = express.Router();
const exercisesRouter = express.Router();

const delay = cb => {
   setTimeout(cb, 1500);
};

workoutsRouter.get('/', async (req, res) => {
   const exsMap = data.exercises.reduce((dest, src) => {
      if (!dest[src.workoutId]) {
         dest[src.workoutId] = [];
      }
      dest[src.workoutId].push(src);
      return dest;
   }, {});
   data.workouts.map(workout => {
      workout.completed = false;
      if (exsMap[workout.id]) {
         workout.completed = exsMap[workout.id].filter(exercise => {
            return !exercise.completed;
         }).length === 0;
      }
   });

   res.status(200).json({ workouts: data.workouts });
});

workoutsRouter.post('/', async (req, res) => {
   const body = req.body;
   const workout = { id: body.id, name: body.name };
   data.workouts.push(workout);
   if (body.exercises && body.exercises.length) {
      body.exercises.forEach(({ name, id }) => {
         data.exercises.push({
            name,
            id: id,
            workoutId: workout.id
         });
      });
   }
   delay(() => res.status(201).json(workout));
});

workoutsRouter.get('/:id', async (req, res) => {
   const workout = data.workouts
     .find((workout) => workout.id.toString() === req.params.id);
   if (workout) {
      res.status(200).json(workout);
   } else {
      res.status(404).send();
   }
});

workoutsRouter.delete('/:id', async (req, res) => {
   const index = data.workouts
     .findIndex((workout) => workout.id === req.params.id);
   let status = 200;
   if (index > -1) {
      data.workouts.splice(index, 1);
      data.exercises = data.exercises
        .filter((exercise) => exercise.workoutId !== req.params.id);
   } else {
      status = 204;
   }
   res.status(status).send();
});

exercisesRouter.get('/', async (req, res) => {
   const workoutId = req.query.workoutId;
   let exercises = data.exercises;
   if (workoutId) {
      exercises = data.exercises
        .filter(exercise => exercise.workoutId === workoutId);
   }
   res.status(200).json({ exercises: exercises });
});

exercisesRouter.post('/', async (req, res) => {
   let exercise = req.body;
   exercise.completed = false;
   data.exercises.push(exercise);
   delay(() => res.status(201).json(exercise));
});

exercisesRouter.get('/:id', async (req, res) => {
   const exercise = data.exercises
     .find((workout) => workout.id === req.params.id);
   if (exercise) {
      res.status(200).json(exercise);
   } else {
      res.status(404).send();
   }
});

exercisesRouter.patch('/:id', async (req, res) => {
   let exercise = data.exercises
     .find((workout) => workout.id === req.params.id);
   exercise.completed = req.body.completed;
   res.status(200).json(exercise);
});

exercisesRouter.delete('/:id', async (req, res) => {
   const index = data.exercises
     .findIndex((workout) => workout.id === req.params.id);
   let status = 200;
   if (index > -1) {
      data.exercises.splice(index, 1);
   } else {
      status = 204;
   }
   res.status(status).send();
});

module.exports = {
  workoutsRouter,
  exercisesRouter
};