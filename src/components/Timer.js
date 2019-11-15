import React, { Component } from "react";
import TimerLengthControl from "./TimerLengthControl";
import ReactFCCtest from "react-fcctest";
import "./Timer.scss";

export class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      brkLength: 5,
      sesLength: 25,
      timerState: "stopped", // stopped or running
      timerType: "Session",
      timer: 1500,
      intervalID: "",
      alarmColor: { color: "black" }
    };
    this.lengthControl = this.lengthControl.bind(this);
    this.setBrkLength = this.setBrkLength.bind(this);
    this.setSesLength = this.setSesLength.bind(this);
    this.timerControl = this.timerControl.bind(this);
    this.beginCountDown = this.beginCountDown.bind(this);
    this.countDown = this.countDown.bind(this);
    this.phaseControl = this.phaseControl.bind(this);
    this.warning = this.warning.bind(this);
    this.buzzer = this.buzzer.bind(this);
    this.switchTimer = this.switchTimer.bind(this);
    this.seperateMinutesAndSeconds = this.seperateMinutesAndSeconds.bind(this);
    this.reset = this.reset.bind(this);
  }

  //lengthControl for Break Length and Session Length
  lengthControl(stateToChange, sign, currentLength, timerType) {
    if (this.state.timerState === "running") return;
    if (this.state.timerType === timerType) {
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
          timer: currentLength * 60 + 60
        });
      }
    }
  }
  setBrkLength(e) {
    this.lengthControl(
      "brkLength",
      e.currentTarget.value,
      this.state.brkLength,
      "Session"
    );
  }
  setSesLength(e) {
    this.lengthControl(
      "sesLength",
      e.currentTarget.value,
      this.state.sesLength,
      "Break"
    );
  }

  timerControl() {
    if (this.state.timerState === "stopped") {
      this.beginCountDown();
      this.setState({ timerState: "running" });
    } else {
      this.setState({ timerState: "stopped" });
      clearInterval(this.intervalID);
    }
  }
  //count douwn function
  countDown() {
    this.setState({ timer: this.state.timer - 1 });
  }

  beginCountDown() {
    this.intervalID = setInterval(() => {
      this.countDown();
      this.phaseControl();
      console.log(this.seperateMinutesAndSeconds());
    }, 1000);
  }

  // warning when it remains 60s
  warning(_timer) {
    if (_timer < 61) {
      this.setState({ alarmColor: { color: "red" } });
    } else {
      this.setState({ alarmColor: { color: "black" } });
    }
  }

  //Beep
  buzzer(_timer) {
    if (_timer === 0) this.audioBeep.play();
  }

  phaseControl() {
    let timer = this.state.timer;
    this.warning(timer);
    this.buzzer(timer);
    if (timer < 0) {
      if (this.state.timerType === "Session") {
        clearInterval(this.intervalID);
        this.beginCountDown();
        this.switchTimer(this.state.brkLength * 60, "Break");
      } else {
        clearInterval(this.intervalID);
        this.beginCountDown();
        this.switchTimer(this.state.sesLength * 60, "Session");
      }
    }
  }

  switchTimer(num, str) {
    this.setState({
      timer: num,
      timerType: str,
      alarmColor: { color: "black" }
    });
  }

  seperateMinutesAndSeconds() {
    let minutes = Math.floor(this.state.timer / 60);
    let seconds = this.state.timer - minutes * 60;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    return minutes + ":" + seconds;
  }

  reset() {
    this.setState({
      brkLength: 5,
      sesLength: 25,
      timerState: "stopped",
      timerType: "Session",
      timer: 1500,
      intervalID: "",
      alarmColor: { color: "black" }
    });
    clearInterval(this.intervalID);
    this.audioBeep.pause();
    this.audioBeep.currentTime = 0;
  }
  render() {
    return (
      <div>
        <div id="container">
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
          <div className="timer" style={this.state.alarmColor}>
            <div className="timer-wrapper">
              <div id="timer-label">{this.state.timerType}</div>
              <div id="time-left">{this.seperateMinutesAndSeconds()}</div>
            </div>
          </div>
          <div className="timer-control">
            <button id="start_stop" onClick={this.timerControl}>
              <i className="fa fa-play fa-2x" />
              <i className="fa fa-pause fa-2x" />
            </button>
            <button id="reset" onClick={this.reset}>
              <i className="fa fa-refresh fa-2x" />
            </button>
          </div>
          <audio
            id="beep"
            preload="auto"
            src="https://goo.gl/65cBl1"
            ref={audio => {
              this.audioBeep = audio;
            }}
          />
          <ReactFCCtest />
        </div>
      </div>
    );
  }
}

export default Timer;
