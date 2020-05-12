// React
import React from 'react';
// Redux
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';

// Reducers
import PlacesReducer from './store/reducers/places';
// Navigation
import PlacesNavigator from './navigation/PlacesNavigator';
// HELPERS
import { init } from './helpers/db';

// DB
init()
  .then(() => {
    console.log('DB Initialize');
  })
  .catch(err => {
    console.log('Err initializing db', err);
  });

// Redux Config
const rootReducer = combineReducers({
  places: PlacesReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App() {
  return (
    <Provider store={store}>
      <PlacesNavigator />
    </Provider>
  );
}
