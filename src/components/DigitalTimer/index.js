import {Component} from 'react'

import './index.css'

const playIcon = [
  'https://assets.ccbp.in/frontend/react-js/play-icon-img.png ',
  'play icon',
]
const pauseIcon = [
  'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png',
  'pause icon',
]

const initialState = {timeInMin: 25, isTimerStart: false, timeElapsed: 0}

class DigitalTimer extends Component {
  state = initialState

  getTimeIntoTimer = () => {
    const {timeInMin, timeElapsed} = this.state
    const time = timeInMin * 60 - timeElapsed
    const minutes = Math.floor(time / 60)
    const seconds = time % 60
    const stringifiedMin = minutes > 9 ? minutes : `0${minutes}`
    const stringifiedSec = seconds > 9 ? seconds : `0${seconds}`
    return `${stringifiedMin}:${stringifiedSec}`
  }

  clearTimeInterval = () => clearInterval(this.timer)

  onIncrementTime = () => {
    const {timeElapsed, isTimerStart, timeInMin} = this.state
    const timerInterval = timeElapsed === timeInMin * 60
    if (timerInterval) {
      this.clearTimeInterval()
      this.setState({isTimerStart: !isTimerStart})
    } else {
      this.setState({timeElapsed: timeElapsed + 1})
    }
  }

  startPause = () => {
    const {timeElapsed, isTimerStart, timeInMin} = this.state
    const timerInterval = timeElapsed === timeInMin * 60

    if (timerInterval) {
      this.setState({timeElapsed: 0})
    }

    if (isTimerStart) {
      this.clearTimeInterval()
    } else {
      this.timer = setInterval(this.onIncrementTime, 1000)
    }
    this.setState({isTimerStart: !isTimerStart})
  }

  onReset = () => {
    this.setState(initialState)
    this.clearTimeInterval()
  }

  onMinus = () => {
    const {timeInMin, isTimerStart, timeElapsed} = this.state
    if (isTimerStart === false && timeInMin > 0 && timeElapsed === 0) {
      this.setState({timeInMin: timeInMin - 1})
    }
  }

  onAdd = () => {
    const {timeInMin, isTimerStart, timeElapsed} = this.state
    if (isTimerStart === false && timeElapsed === 0) {
      this.setState({timeInMin: timeInMin + 1})
    }
  }

  render() {
    const {timeInMin, isTimerStart} = this.state
    const icons = isTimerStart ? pauseIcon : playIcon
    const startPauseText = isTimerStart ? 'Pause' : 'Start'
    console.log(this.state)

    return (
      <div className="bg-container">
        <h1 className="main-head">Digital Timer</h1>
        <div className="body-timer-container">
          <div className="timer-container">
            <div className="timer-card">
              <h1 className="timer-count">{this.getTimeIntoTimer()}</h1>
              <p className="timer-text">
                {isTimerStart ? 'Running' : 'Paused'}
              </p>
            </div>
          </div>
          <div className="body-control-container">
            <div className="start-control-container">
              <div className="start-container">
                <button
                  type="button"
                  className="start-btn"
                  onClick={this.startPause}
                >
                  <img src={icons[0]} alt={icons[1]} className="start-icon" />
                  <p className="start-text">{startPauseText}</p>
                </button>
              </div>
              <div className="start-container">
                <button
                  type="button"
                  className="start-btn"
                  onClick={this.onReset}
                >
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png "
                    alt="reset icon"
                    className="start-icon"
                  />
                  <p className="start-text">Reset</p>
                </button>
              </div>
            </div>

            <p>Set Timer Limit</p>
            <div className="time-change-container">
              <button type="button" className="minus" onClick={this.onMinus}>
                -
              </button>
              <p className="set-timer-text">{timeInMin}</p>
              <button type="button" className="minus" onClick={this.onAdd}>
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
