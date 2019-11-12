import React, { Component } from "react";
import "../../node_modules/font-awesome/css/font-awesome.min.css";
export class TimerLengthControl extends Component {
  render() {
    return (
      <div>
        <div>{this.props.title}</div>
        <button>
          <i className="fa fa-arrow-down fa-2x" />
        </button>
        <div>{this.props.length}</div>
        <button>
          <i className="fa fa-arrow-down fa-2x" />
        </button>
      </div>
    );
  }
}

export default TimerLengthControl;
