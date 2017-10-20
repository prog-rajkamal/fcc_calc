import React, { Component } from "react";
import "./App.css";

class App extends Component {
    constructor() {
        super();
        this.buttonPressed.bind(this);
        this.calculate.bind(this);
        this.buttonTypes = {
            Command: "Command",
            Input: "Input",
            Operator: "Operator",
        };
        this.calculatorStatus = {
            BLANK: "BLANK",
            ERROR: "ERROR",
            NUMERIC: "NUMERIC",
            OPERATOR: "OPERATOR",
        };

        this.CALCULATOR_OPERATORS = {
            PLUS: " + ",
            MINUS: " - ",
            MULTIPLY: " × ",
            DIVIDE: " ÷ ",
            MODULUS: " MOD ",
            EQUALS: " = ",
        };

        this.buttons = [
            {
                display: "AC",
                type: this.buttonTypes.Command,
                order: 1,
            },
            {
                display: "C",
                type: this.buttonTypes.Command,
                order: 30,
            },
            {
                display: this.CALCULATOR_OPERATORS.DIVIDE,
                type: this.buttonTypes.Operator,
                order: 70,
            },
            {
                display: this.CALCULATOR_OPERATORS.MULTIPLY,
                type: this.buttonTypes.Operator,
                order: 85,
            },
            {
                display: this.CALCULATOR_OPERATORS.MINUS,
                type: this.buttonTypes.Operator,
                order: 90,
            },
            {
                display: this.CALCULATOR_OPERATORS.PLUS,
                type: this.buttonTypes.Operator,
                order: 95,
            },
            {
                display: this.CALCULATOR_OPERATORS.EQUALS,
                type: this.buttonTypes.Operator,
                order: 100,
            },
            {
                display: " MOD ",
                type: this.buttonTypes.Operator,
                order: 10,
            },
            {
                display: ".",
                type: this.buttonTypes.Input,
                order: 75,
            },
            {
                display: "9",
                type: this.buttonTypes.Input,
                order: 71,
            },
            {
                display: "8",
                type: this.buttonTypes.Input,
                order: 32,
            },
            {
                display: "7",
                type: this.buttonTypes.Input,
                order: 5,
            },
            {
                display: "6",
                type: this.buttonTypes.Input,
                order: 72,
            },
            {
                display: "5",
                type: this.buttonTypes.Input,
                order: 33,
            },
            {
                display: "4",
                type: this.buttonTypes.Input,
                order: 6,
            },
            {
                display: "3",
                type: this.buttonTypes.Input,
                order: 73,
            },
            {
                display: "2",
                type: this.buttonTypes.Input,
                order: 34,
            },
            {
                display: "1",
                type: this.buttonTypes.Input,
                order: 7,
            },
            {
                display: "0",
                type: this.buttonTypes.Input,
                order: 35,
            },
            //    'AC' , '7', '4', '1' , '%',
            // 'C' , '8', '5', '2' , '0',
            // '÷' , '9', '6', '3' , '.',
            // '×' , '-', '+', '='
        ];
        this.buttons = this.buttons.sort(
            (btna, btnb) => btna.order > btnb.order
        );

        // Calculator
        // state = invalid -> show error, accept numeric inputs
        // state = blank, -> show blank, accept numeric input (first arg)
        // state = numeric -> accept all inputs.
        // state = operator -> accept ops(replace with current), take numeric inp as second arg.

        this.BLANK_STATE = {
            status: this.calculatorStatus.BLANK,
            input: "",
            buffer: "",
            calc_operation: "",
            calc_output: "",
            display_primary: "",
            display_secondary: "",
        };
        this.ERROR_STATE = {
            status: this.calculatorStatus.ERROR,
            input: "ERROR!",
            buffer: "",
        };
        this.state = this.BLANK_STATE;
        this.prevState = this.BLANK_STATE;
    }
    render() {
        return (
            <div className="App section">
                <div className="container">
                    <h1 className="title is-1 App__heading">
                        Free code camp - Calculator
                    </h1>
                    {this.renderCalculator()}
                </div>
            </div>
        );
    }

    renderCalculator() {
        return (
            <div className="calculator">
                <div className="calculator__output">
                    <div className="calc__result">{this.state.input}</div>
                    <div className="calc__expression">{this.state.buffer}</div>
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
        e.preventDefault();

        // If ALL Clear is pressed, state is set to blank.
        if (btn.display === "AC") {
            this.setState(this.BLANK_STATE);
            return;
        }

        let self = this;
        // If CLEAR is pressed, remove last character from calc inp.
        if (btn.display === "C") {
            this.setState(state => {
                if (state.status === self.calculatorStatus.BLANK)
                    return self.BLANK_STATE;

                if (state.status === self.calculatorStatus.ERROR) {
                    return self.BLANK_STATE;
                }

                if (state.status === self.calculatorStatus.NUMERIC) {
                    //TODO: handle prev state nicely
                    if (state.input.length > 1)
                        return {
                            input: state.input.slice(
                                0,
                                state.calc_operation.length - 1
                            ),
                        };
                }

                if (state.status === self.calculatorStatus.OPERATOR) {
                    return this.prevState;
                }
            });
            return;
        }

        if (btn.type === this.buttonTypes.Input) {
            this.setState(state => {
                if (
                    state.status === self.calculatorStatus.BLANK ||
                    state.status === self.calculatorStatus.ERROR
                ) {
                    self.prevState = self.BLANK_STATE;
                    return {
                        input: btn.display,
                        status: self.calculatorStatus.NUMERIC,
                    };
                }

                if (state.status === self.calculatorStatus.NUMERIC) {
                    self.prevState = state;
                    return {
                        input: state.input + btn.display,
                    };
                }

                if (state.status === self.calculatorStatus.OPERATOR) {
                    self.prevState = state;
                    return {
                        input: btn.display,
                        buffer: state.buffer + state.input,
                        status: self.calculatorStatus.NUMERIC,
                    };
                }
            });
            return;
        }

        if (btn.type === this.buttonTypes.Operator) {
            this.setState(state => {
                if (btn.display === self.CALCULATOR_OPERATORS.EQUALS) {
                    if (
                        state.status === self.calculatorStatus.ERROR ||
                        state.status === self.calculatorStatus.ERROR
                    ) {
                        return self.calculatorStatus.BLANK;
                    }

                    if (
                        state.status === self.calculatorStatus.NUMERIC &&
                        state.buffer !== ""
                    ) {
                        // Time for action
                        this.prevState = state;
                        try {
                            var res = self.calculate(
                                state.buffer + state.input
                            );
                        } catch (error) {
                            return self.ERROR_STATE;
                        }
                        return {
                            input: res,
                            buffer: state.buffer + state.input,
                            status: self.calculatorStatus.NUMERIC,
                        };
                    }
                    return self.BLANK_STATE;
                }
                if (
                    state.status === self.calculatorStatus.BLANK ||
                    state.status === self.calculatorStatus.ERROR
                ) {
                    if (btn.display === "+" || btn.display === "-")
                        return {
                            input: btn.display,
                            status: self.calculatorStatus.NUMERIC,
                        };
                }

                if (state.status === self.calculatorStatus.NUMERIC) {
                    return {
                        input: btn.display,
                        buffer: state.buffer + state.input,
                        status: self.calculatorStatus.OPERATOR,
                    };
                }

                if (state.status === self.calculatorStatus.OPERATOR) {
                    if (
                        btn.display === self.CALCULATOR_OPERATORS.PLUS ||
                        btn.display === self.CALCULATOR_OPERATORS.MINUS
                    )
                        return {
                            input: btn.display,
                            buffer: state.buffer + state.input,
                            status: state.NUMERIC,
                        };
                    if (btn.display !== self.CALCULATOR_OPERATORS.EQUALS) {
                        return {
                            input: btn.display,
                        };
                    } else {
                        return state;
                    }
                }
            });
            return;
        }
    }

    calculate(ops) {
        let res = 0;
        try {
            // debugger;
            ops = ops.replace(/÷/g, "/");
            ops = ops.replace(/×/g, "*");
            ops = ops.replace(/MOD/g, "%");
            // eslint-disable-next-line
            res = eval(ops);
        } catch (error) {
            res = "Error!";
        }
        return res;
    }
}

export default App;
