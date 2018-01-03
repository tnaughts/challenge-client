import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {reset} from 'redux-form';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import Loading from '../common/loading';

import {
  actions,
  clearCollection
  } from '../../actions/resources';
// components


class Projects extends Component {

  componentWillUnmount() {
    clearCollection('projects');
  }

  componentWillMount() {
    this.props.fetchProjects();
  }


  render(){
    const{projects} = this.props
    if (projects){
      return (
        <div className="projects-list">
          <h1>Projects!</h1>
          {
            projects.projects.map((proj, i)=> (
              <div key={i}>
                <Link to={`/projects/${proj.ppid}`}>{proj.name}</Link>
              </div>
            ))
          }
        </div>
      );
    }
    return (
      <Loading/>
    )
  }
}

Projects.propTypes = {
  fetchprojects: PropTypes.func,
  projects: PropTypes.object
};

export default connect(
  state => {
    const {project} = state.resources.collection;

    return {
      projects: project
    };
  },
  dispatch => ({
    fetchProjects: bindActionCreators(actions.fetchProjects, dispatch),
    resetForm: bindActionCreators(reset, dispatch)
  })
)(Projects);
