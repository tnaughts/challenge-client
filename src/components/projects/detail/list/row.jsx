import React, {Component} from 'react';
import moment from 'moment';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
//actions
import {actions} from '../../../../actions/resources';
import {success} from '../../../../actions/notifications';
import Collapsible from 'react-collapsible';

import {StoryDetail} from '../../../stories/detail';

export class StoryRow extends Component {
  constructor(props) {
    super(props);
    this.handleStatusChange = this.handleStatusChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleStatusChange(event) {
    this.setState({
      status: event.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const {
      story,
      notifySuccess,
      patchStory,
    } = this.props;
    const {
      status
    } = this.state;

    if (status !== story.status) {
      patchStory(story.psid,{
        story: {
          status: status
        }
      }).then((response) => {
        notifySuccess(
          `Sucessfully update quantity for ${story.name}`
        )
      })
    }
  }

    render() {
      const {
        story
      } = this.props;

      if (story) {
        return (
          <div>
          <div className="table-row story-full">
            <div className="table-cell">
              {story.name}
            </div>
            <div className="table-cell">
              <form>
                <span className="td amount-ordered">
                  <span>
                    <label className="integer-form">
                      <input
                        className="form-control"
                        type="integer"
                        defaultValue={story.status} onChange={this.handleStatusChange}/>
                    </label>
                    <button
                      className="btn change-max"
                      onClick={this.handleSubmit}
                      type="submit">
                      <i className="fa fa-check" />
                    </button>
                  </span>
                </span>
              </form>
            </div>
            <div className="table-cell">
              {
                story.deadline ?
                  moment(story.deadline).format('MM-DD-YY')
                  :
                  'unscheduled'
                }
            </div>
            <div className="table-cell">
              {story.story_type}
            </div>
            <div className="table-cell-points">
              {story.points}
            </div>
          </div>
          <div className="table-row story-info">
              <Collapsible trigger="more info">
                <StoryDetail story={story}/>
              </Collapsible>
          </div>
        </div>
        )
      }
      return (
        null
      )
    }
  }

export default connect(
  null,
  dispatch => ({
    patchStory: bindActionCreators(actions.patchStory, dispatch),
    notifySuccess: bindActionCreators(success.bind(null, 'api_success'), dispatch)
  })
)(StoryRow);
