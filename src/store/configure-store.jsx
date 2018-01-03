import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import {routerMiddleware} from 'react-router-redux';
import rootReducer from '../reducers/index';
import {
  BrowserRouter as browserHistory
} from 'react-router-dom';

const middlewares = [];
const router = routerMiddleware(browserHistory);

if (process.env.NODE_ENV === 'development') {
  const logger = createLogger({
    logger: console
  });
  middlewares.push(thunk, router, logger);
}

if (process.env.NODE_ENV === 'production') {
  middlewares.push(thunk, router);
}

const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);

export default function configureStore(initialState) {
  return createStoreWithMiddleware(rootReducer, initialState);
}
