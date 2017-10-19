import React, { Component } from "react";
import "./App.css";

class App extends Component {
    constructor() {
        super();
        this.buttonPressed.bind(this);
        this.buttonTypes = {
            Command: "Command",
            Input: "Input",
            Operator: "Operator"
        };

        this.buttons = [
            {
                display: "AC",
                type: this.buttonTypes.Command,
                order: 1
            },
            {
                display: "C",
                type: this.buttonTypes.Command,
                order: 30
            },
            {
                display: " ÷ ",
                type: this.buttonTypes.Operator,
                order: 70
            },
            {
                display: " × ",
                type: this.buttonTypes.Operator,
                order: 85
            },
            {
                display: " - ",
                type: this.buttonTypes.Operator,
                order: 90
            },
            {
                display: " + ",
                type: this.buttonTypes.Operator,
                order: 95
            },
            {
                display: "=",
                type: this.buttonTypes.Operator,
                order: 100
            },
            {
                display: " MOD ",
                type: this.buttonTypes.Operator,
                order: 10
            },
            {
                display: ".",
                type: this.buttonTypes.Input,
                order: 75
            },
            {
                display: "9",
                type: this.buttonTypes.Input,
                order: 71
            },
            {
                display: "8",
                type: this.buttonTypes.Input,
                order: 32
            },
            {
                display: "7",
                type: this.buttonTypes.Input,
                order: 5
            },
            {
                display: "6",
                type: this.buttonTypes.Input,
                order: 72
            },
            {
                display: "5",
                type: this.buttonTypes.Input,
                order: 33
            },
            {
                display: "4",
                type: this.buttonTypes.Input,
                order: 6
            },
            {
                display: "3",
                type: this.buttonTypes.Input,
                order: 73
            },
            {
                display: "2",
                type: this.buttonTypes.Input,
                order: 34
            },
            {
                display: "1",
                type: this.buttonTypes.Input,
                order: 7
            },
            {
                display: "0",
                type: this.buttonTypes.Input,
                order: 35
            }
            //    'AC' , '7', '4', '1' , '%',
            // 'C' , '8', '5', '2' , '0',
            // '÷' , '9', '6', '3' , '.',
            // '×' , '-', '+', '='
        ];
        this.buttons = this.buttons.sort(
            (btna, btnb) => btna.order > btnb.order
        );
        this.state = {
            calc_result: "",
            calc_operation: ""
        };
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
                <div className="calculator__output">
                    <div className="calc__result">{this.state.calc_result}</div>
                    <div className="calc__expression">
                        {this.state.calc_operation}
                    </div>
                </div>
                <div className="calculator__input">
                    {this.buttons.map(btn => (
                        <button
                            className="calc__button"
                            key={btn.order}
                            onClick={e => this.buttonPressed(e, btn)}
                        >
                            {btn.display}
                        </button>
                    ))}
                </div>
            </div>
        );
    }

    buttonPressed(e, btn) {
        // console.log(btn);
        e.preventDefault();
        if (btn.type === this.buttonTypes.Command) {
            if (btn.display === "AC") {
                this.setState({
                    calc_operation: "",
                    calc_result: ""
                });
            } else if (btn.display === "C") {
                this.setState(state => {
                    return {
                        calc_operation: state.calc_operation.slice(
                            0,
                            state.calc_operation.length - 1
                        )
                    };
                });
            }
            return;
        }
        if (btn.type === this.buttonTypes.Input) {
            this.setState(state => {
                return {
                    calc_operation: state.calc_operation + btn.display
                };
            });
            return;
        }

        if (btn.type === this.buttonTypes.Operator && btn.display === "=") {
            this.setState(state => {
                return {
                    calc_result: this.calculate()
                };
            });
            return;
        } else {
            this.setState(state => {
                return {
                    calc_operation: state.calc_operation + btn.display
                };
            });
            return;
        }
    }

    calculate() {
        let res = 0;
        let ops = this.state.calc_operation;
        try {
            // debugger;
            ops = ops.replace(/÷/g, "/");
            ops = ops.replace(/×/g, "*");
            ops = ops.replace(/MOD/g, "%");
            res = eval(ops);
        } catch (error) {
            res = "Error!";
        }
        return res;
    }
}

export default App;
