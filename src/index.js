import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import createHistory from 'history/createBrowserHistory'
import { ConnectedRouter, routerReducer, routerMiddleware } from 'react-router-redux'
import { categories } from "./reducers/index";


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

// Create a history of your choosing (we're using a browser history in this case)
const history = createHistory()

// Build the middleware for intercepting and dispatching navigation actions
const middleware = routerMiddleware(history)

const store = createStore(
  combineReducers({
    categories,
    routing: routerReducer
  }),
  composeEnhancers(
    applyMiddleware(middleware)
  )
)

ReactDOM.render(<Provider store={store}>
  <ConnectedRouter history={history}>
    <App />
  </ConnectedRouter>
</Provider>, document.getElementById('root'));
registerServiceWorker();
