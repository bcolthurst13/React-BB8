import React, { Component } from 'react';

export default class App extends Component {
    constructor(props){
        super(props);

        this.state = {
            droidX: 0,
            mouseX: 0,
            toTheRight: true,
            speed: 3.5,
            accelMod: 1
            //reRender: 1
        }
    }

    handleMouseMove(event) {
        this.setState({
            mouseX: event.pageX
            //reRender: this.state.reRender+1
        })
    }

    handleSpeedChange(e) {
        if(parseFloat(e.target.value)) {
            this.setState({
                speed: e.target.value
                //reRender: this.state.reRender+1
            })
        }
    }

    handleAccelChange(e) {
        if(parseFloat(e.target.value)) {
            this.setState({
                accelMod: e.target.value
                //reRender: this.state.reRender+1
            })
        }
    }

    movement() {
        let {droidX, mouseX, speed, accelMod} = this.state;

        if(Math.abs(Math.round(droidX)-mouseX) !== 1){
            let distance = mouseX - droidX;
            let acceleration = Math.abs(distance * accelMod) / 100;

            if (droidX < mouseX) {
                this.setState({
                    droidX: this.state.droidX+(speed*acceleration),
                    toTheRight: true
                    //reRender: this.state.reRender+1
                });
            }
            else {
                this.setState({
                    droidX: this.state.droidX-(speed*acceleration),
                    toTheRight: false
                    //reRender: this.state.reRender+1
                });
            }
        }
    }

    componentWillMount() {
        this.setState({
            mouseX: 300
        });
    }

    componentDidMount() {
        document.addEventListener('mousemove', (e) => this.handleMouseMove(e));
        setInterval(this.movement.bind(this), 10);
    }

  render() {

    return (
      <div>
          <div className="logo"><img src="http://i65.tinypic.com/syo593.png" /></div>
          <div className="config">
              <p>Speed: {this.state.speed}</p>
              <input
                  type="range"
                  min="0"
                  max="11"
                  step="0.1"
                  value={this.state.speed}
                  onChange={this.handleSpeedChange.bind(this)} />
              <p>Acceleration: {this.state.accelMod}</p>
              <input
                  type="range"
                  min="0"
                  max="3"
                  step="0.1"
                  value={this.state.accelMod}
                  onChange={this.handleAccelChange.bind(this)} />
          </div>
        <div className="bb8" style={{WebkitTransform: 'translateX(' + this.state.droidX +'px)'}}>
          <div className={'antennas ' + (this.state.toTheRight ? 'right' : '')}
               style={{WebkitTransform: 'translateX(' + (this.state.mouseX - this.state.droidX) / 25 + 'px) rotateZ(' + (this.state.mouseX - this.state.droidX) / 80 + 'deg)'}}>
            <div className="antenna short"></div>
            <div className="antenna long"></div>
          </div>
          <div className="head"
               style={{WebkitTransform: 'translateX(' + (this.state.mouseX - this.state.droidX) / 15 + 'px) rotateZ(' + (this.state.mouseX - this.state.droidX) / 25 + 'deg)'}}>
            <div className="stripe one"></div>
            <div className="stripe two"></div>
            <div className={'eyes ' + (this.state.toTheRight ? 'right' : '')}>
              <div className="eye one"></div>
              <div className="eye two"></div>
            </div>
              <div className={'stripe detail ' + (this.state.toTheRight ? 'right' : '')}>
                  <div className="detail zero"></div>
                  <div className="detail zero"></div>
                  <div className="detail one"></div>
                  <div className="detail two"></div>
                  <div className="detail three"></div>
                  <div className="detail four"></div>
                  <div className="detail five"></div>
                  <div className="detail five"></div>
              </div>
            <div className="stripe three"></div>
          </div>
          <div className="ball" style={{WebkitTransform: 'rotateZ(' + this.state.droidX / 2 + 'deg)'}}>
            <div className="lines one"></div>
            <div className="lines two"></div>
            <div className="ring one"></div>
            <div className="ring two"></div>
            <div className="ring three"></div>
          </div>
          <div className="shadow"></div>
        </div>

          <div className="instructions"><p>move your mouse.</p></div>
      </div>
    );
  }
}