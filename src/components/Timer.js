import React, { Component } from "react";
import TimerLengthControl from "./TimerLengthControl";
export class Timer extends Component {
  render() {
    return (
      <div>
        <div className="main-title">Pomodoro Clock</div>
        <TimerLengthControl title="Break Length" length="000" />
        <TimerLengthControl title="Session Length" length="111" />
      </div>
    );
  }
}

export default Timer;
