import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {
  actions,
  clearDetail
} from '../../../actions/resources';
import _ from 'underscore';
import {
  Row,
  Col
} from 'react-bootstrap';

import Loading from '../../common/loading';
// compenents
import StoryTable from './list/table'

class ProjectDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }

  componentWillMount() {
    const {fetchProject} = this.props;
    this.setState({
      loading: true
    });

    clearDetail('project');

    fetchProject(this.props.match.params.ppid)
    this.setState({
      loading: false
    });
  }

  componentWillUnmount() {
    clearDetail('project');
  }

  render(){
    const{
      project
    } = this.props;

    if (project && project.stories) {
      let groupedStories = _.chain(project.stories)
                            .groupBy('status')
                            .pairs()
                            .value();
      let tables = groupedStories.map((story, i)=>
        <div key={i}>
            <Col md={4} xsOffset={0}>
              <h4 className={`${story[0]}`}>{story[0]}</h4>
                <StoryTable stories={story[1]}/>
            </Col>
        </div>
      )
      return (
        <div className='story-list'>
          <h1>{project.project.name || 'Projects'}</h1>
          <Row>
            {tables}
          </Row>
        </div>

      );
    }

    return (
      <Loading/>
    )

  }
}

ProjectDetail.propTypes = {
  project: PropTypes.object,
  fetchProject: PropTypes.func,
  params: PropTypes.object
};

export default connect(
  state => {
    const {project} = state.resources.detail;

    return {
      project: project
    };
  },
  dispatch => ({
    fetchProject: bindActionCreators(actions.fetchProject, dispatch)
  })
)(ProjectDetail);
