import React, { Component } from "react";
import TimerLengthControl from "./TimerLengthControl";
export class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      brkLength: 5,
      sesLength: 15,
      timerState: "stopped", // stopped or running
      timerType: "Session",
      timer: 900,
      intervalID: "",
      alarmColor: { color: "white" }
    };
    this.lengthControl = this.lengthControl.bind(this);
    this.setBrkLength = this.setBrkLength.bind(this);
    this.setSesLength = this.setSesLength.bind(this);
  }

  //lengthControl for Break Length and Session Length
  lengthControl(stateToChange, sign, currentLength, timerType) {
    if (this.state.timerType !== timerType) {
      if (sign === "-" && currentLength !== 1) {
        this.setState({ [stateToChange]: currentLength - 1 });
      } else if (sign === "+" && currentLength !== 60) {
        this.setState({ [stateToChange]: currentLength + 1 });
      }
    } else {
      if (sign === "-" && currentLength !== 1) {
        this.setState({
          [stateToChange]: currentLength - 1,
          timer: currentLength * 60 - 60 // count down when it remains 60s
        });
      } else if (sign === "+" && currentLength !== 60) {
        this.setState({
          [stateToChange]: currentLength + 1,
          timer: currentLength * 60 - 60
        });
      }
    }
  }
  setBrkLength(e) {
    this.lengthControl(
      "brkLength",
      e.currentTarget.value,
      this.state.brkLength,
      "Break"
    );
    console.log(this.state.timer);
  }
  setSesLength(e) {
    this.lengthControl(
      "sesLength",
      e.currentTarget.value,
      this.state.sesLength,
      "Session"
    );
    console.log(this.state.timer);
  }
  render() {
    return (
      <div>
        <div className="main-title">Pomodoro Clock</div>
        <TimerLengthControl
          title="Break Length"
          titleID="break-label"
          minID="break-decrement"
          addID="break-increment"
          lengthID="break-length"
          length={this.state.brkLength}
          onClick={this.setBrkLength}
        />
        <TimerLengthControl
          title="Session Length"
          titleID="session-label"
          minID="session-decrement"
          addID="session-increment"
          lengthID="session-length"
          length={this.state.sesLength}
          onClick={this.setSesLength}
        />
      </div>
    );
  }
}

export default Timer;
