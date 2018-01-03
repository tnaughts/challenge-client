import React, {Component} from 'react';
import {
  Col,
  Row
} from 'react-bootstrap';

export class Loading extends Component{
  render(){
    return(
      <div>
          <Row>
            <Col md={12}>
              <center>
                <div className="loading-icon">
                  <i className="fa fa-circle-o-notch fa-spin" />
                </div>
              </center>
            </Col>
          </Row>
        </div>
    )
  }

}
export default Loading;
