import React, { Component } from "react";
import "./App.css";

class App extends Component {
    constructor() {
        super();
        this.buttonPressed.bind(this);
        const buttonTypes = {
            Command: "Command",
            Input: "Input",
            Operator: "Operator"
        };

        this.buttons = [
            {
                display: "AC",
                type: buttonTypes.Command,
                order: 1
            },
            {
                display: "C",
                type: buttonTypes.Command,
                order: 30
            },
            {
                display: "÷",
                type: buttonTypes.Operator,
                order: 70
            },
            {
                display: "×",
                type: buttonTypes.Operator,
                order: 85
            },
            {
                display: "-",
                type: buttonTypes.Operator,
                order: 90
            },
            {
                display: "+",
                type: buttonTypes.Operator,
                order: 95
            },
            {
                display: "=",
                type: buttonTypes.Operator,
                order: 100
            },
            {
                display: "%",
                type: buttonTypes.Operator,
                order: 10
            },
            {
                display: ".",
                type: buttonTypes.Input,
                order: 75
            },
            {
                display: "9",
                type: buttonTypes.Input,
                order: 71
            },
            {
                display: "8",
                type: buttonTypes.Input,
                order: 32
            },
            {
                display: "7",
                type: buttonTypes.Input,
                order: 5
            },
            {
                display: "6",
                type: buttonTypes.Input,
                order: 72
            },
            {
                display: "5",
                type: buttonTypes.Input,
                order: 33
            },
            {
                display: "4",
                type: buttonTypes.Input,
                order: 6
            },
            {
                display: "3",
                type: buttonTypes.Input,
                order: 73
            },
            {
                display: "2",
                type: buttonTypes.Input,
                order: 34
            },
            {
                display: "1",
                type: buttonTypes.Input,
                order: 7
            },
            {
                display: "0",
                type: buttonTypes.Input,
                order: 35
            }
            //    'AC' , '7', '4', '1' , '%',
            // 'C' , '8', '5', '2' , '0',
            // '÷' , '9', '6', '3' , '.',
            // '×' , '-', '+', '='
        ];
        console.log(this.buttons);
        this.buttons = this.buttons.sort((btna, btnb) => btna.order > btnb.order);
    }
    render() {
        return (
            <div className="App section">
                <h1 className="title is-1"> Free code camp - Calculator </h1>
                <div className="container">{this.renderCalculator()}</div>
            </div>
        );
    }

    renderCalculator() {

        return (
            <div className="calculator">
                <div class="calculator__output">
                    <p class="calc__result">134.5</p>
                    <p class="calc__expression">8 &times; 5 / 7</p>
                </div>
                <div className="calculator__input">
                    {this.buttons.map(btn => (
                        <button class="calc__button">{btn.display}</button>
                    ))}
                </div>
            </div>
        );
    }

    buttonPressed(btn) {}
}

export default App;
