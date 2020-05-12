// React
import React from 'react';
// Redux
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

// Reducers
import PlacesReducer from './store/reducers/places';
// Navigation
import PlacesNavigator from './navigation/PlacesNavigator';
// HELPERS
import { init } from './helpers/db';

// DB
init()
.then(() => {
  console.log('Initialized database');
})
.catch(err => {
  console.log('Initializing db failed.');
  console.log(err);
});

// Redux Config
const rootReducer = combineReducers({
  places: PlacesReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default function App() {
  return (
    <Provider store={store}>
      <PlacesNavigator />
    </Provider>
  );
}
