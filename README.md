# workouts
See [Configuration Reference](https://cli.vuejs.org/config/).

Create a Single Page Application in Vue.js (2x) implementing a simple Workout List with exercises. The application should follow the Flux architecture principles in terms of app state management and uni directional data flow.  
Please, use routing inside the SPA, state management Vuex, API calls Axios (if needed) 
Your application should be able to maintain a list of activities:  
1. adding a workout (item to the list) 
2. mark workout is completed, if all nested exercises are completed 
3. deleting a workout 
4. listing all the workouts when the page is first loaded or reloaded 
5. adding an exercise (to a workout) 
6. updating the exercise (toggle status between completed/not completed) 
7. deleting an exercise 
Instead of a server API you can use a browser API 
The Element-UI should be used as a UI. 
Component library: https://element.eleme.io/.  
Also, you need to write one unit and snapshot test using Jest https://jestjs.io/.

## Project setup
```
npm install
```

### Compiles and minifies
```
npm run build
```

### Start server
```
npm run server
```

### Start tests
```
npm run test
```