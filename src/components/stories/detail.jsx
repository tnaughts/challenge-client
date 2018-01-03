import React, {Component} from 'react';

import {actions} from '../../actions/resources';
// components

export class StoryDetail extends Component {
  render(){
    const {
      story,
    } = this.props;

    if (story) {
      return (
        <div className='info-story'>
          <ul>
            <li>Points: {story.points}</li>
            <li>Requested By: {story.requested_by_id}</li>
            <li><a href={`${story.url}`}>Pivotal URL</a></li>
          </ul>
        </div>
      )
    }

    return(
      <div></div>
    )
  }

}
export default StoryDetail;
