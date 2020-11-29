import React from 'react';

let componentRendersNumber = 0;
let pureComponentRendersNumber = 0;

const HelloElement = React.createElement('h1', null, 'Hello World!');

class ImpureComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      counter: 0,
    };

    setInterval(() => {
      this.setState({
        counter: 0,
      });
    }, 1000);
  }

  render() {
    componentRendersNumber++;
    return (
      <div style={{ border: '2px solid red', marginBottom: 5 }}>
        <h3>React.Component component</h3>
        <div>Counter Value: {this.state.counter} </div>
        <span>Component rendered {componentRendersNumber} times</span>
      </div>
    );
  }
}

class MyPureComponent extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      counter: 0,
    };

    setInterval(() => {
      this.setState({
        counter: 0,
      });
    }, 1000);
  }

  render() {
    pureComponentRendersNumber++;
    return (
      <div style={{ border: '2px solid green' }}>
        <h3>React.Pure component</h3>
        <div>Counter Value: {this.state.counter} </div>
        <span>Component rendered {pureComponentRendersNumber} times</span>
      </div>
    );
  }
}

const App = () => {
  return (
    <div className="App">
      {HelloElement}
      <ImpureComponent />
      <MyPureComponent />
    </div>
  );
};

export { App };
