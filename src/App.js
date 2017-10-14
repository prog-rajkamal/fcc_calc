import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App section">
         <h1 className="title is-1"> Free code camp - Calculator </h1>
          <div className="container">
              {this.renderCalculator()}
          </div>
      </div>
    );
  }

  renderCalculator(){

    var buttons = [
      'AC' , '7', '4', '1' , '%',
      'C' , '8', '5', '2' , '0',
      '÷' , '9', '6', '3' , '.',
      '×' , '-', '+', '='
    ];
    return (
      <div className="calculator">

        <div class="calculator__output">
          <p class="calc__result">134.5</p>
          <p class="calc__expression">8 &times; 5 / 7</p>
        </div>
        <div className="calculator__input">

        {buttons.map(
            btn => <button class="calc__button" onClick={}>{btn}</button>
        )}
        </div>

      </div>
    );
  }
}

export default App;
