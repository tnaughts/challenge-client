import React, { Component } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import {Provider} from 'react-redux';

import Projects from './components/projects';
import ProjectDetail from './components/projects/detail';
import configureStore from './store/configure-store';
import Banner from './components/common/Banner.jsx';

const store = configureStore();

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div>
            <Banner/>
            <Route exact path="/" component={Projects} />
            <Route exact path="/projects" component={Projects} />
            <Route path="/projects/:ppid" component={ProjectDetail} />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
