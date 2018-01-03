import React, {Component} from 'react';

// components
import StoryRow from './row';

export class StoryTable extends Component {
  render(){
    const {
      stories
    }= this.props;

    if (stories && stories.length) {
      let rows = stories.map((story, i) => (
        <StoryRow
          ref={`form-${i}`}
          key={i}
          story={story} />
      ))
      return (
        <div>
          <div className="story-table table">
            <div className="table-header">
              <div id="table-header-row">
                <div className="table-cell">
                  Name
                </div>
                <div className="table-cell">
                  Status
                </div>
                <div className="table-cell">
                  Deadline
                </div>
                <div className="table-cell">
                  Type
                </div>
                <div className="table-cell-points">
                  Point(s)
                </div>
              </div>
            </div>
            <div className="tbody">
              {rows}
            </div>
          </div>
        </div>
      )
    }
    return (
      <h1> No Stories</h1>
    )
  }
}

export default StoryTable;
