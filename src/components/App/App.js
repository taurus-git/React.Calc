import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Buttons from '../Buttons'
import Display from '../Display'

class App extends Component {

    maxId = 100;

    constructor() {
        super();
        this.state = {
            buttonsData: [
                this.createButtonItem('AC', 'grey'),
                this.createButtonItem('+-', 'grey'),
                this.createButtonItem('%', 'grey'),
                this.createButtonItem('/', 'orange'),
                this.createButtonItem('mc'),
                this.createButtonItem('mr'),
                this.createButtonItem('m-'),
                this.createButtonItem('m+', 'orange'),
                this.createButtonItem(7),
                this.createButtonItem(8),
                this.createButtonItem(9),
                this.createButtonItem('x', 'orange'),
                this.createButtonItem(4),
                this.createButtonItem(5),
                this.createButtonItem(6),
                this.createButtonItem('-', 'orange'),
                this.createButtonItem(1),
                this.createButtonItem(2),
                this.createButtonItem(3),
                this.createButtonItem('+', 'orange'),
                this.createButtonItem(0, 'wide'),
                this.createButtonItem('.'),
                this.createButtonItem('=', 'orange'),
            ],
            displayValue: 0,
            operator: null,
            firstValue: '',
            secondValue: '',
            nextValue: false,
            memory: 0,
        }
    }

    createButtonItem(value, buttonClass) {

        return {
            id: this.maxId++,
            value,
            buttonClass: buttonClass,
        }
    }

    updateDisplayValue = (value) => {
        const {displayValue, operator, firstValue, secondValue, nextValue, memory} = this.state;

        switch (value) {
            case 0:
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
            case 6:
            case 7:
            case 8:
            case 9:
                this.setState({
                    displayValue: (displayValue === 0) ? value : displayValue.toString() + value
                })
                if (!nextValue) {
                    this.setState({
                        firstValue: firstValue + value
                    })
                } else {
                    this.setState({
                        secondValue: secondValue + value
                    })
                }
                break;
            case '/':
            case 'x':
            case '-':
            case '+':
                let lastCharacter = displayValue.toString().slice(-1);
                if (lastCharacter === '.') {
                    this.setState({
                        nextValue: false,
                        operator: value,
                        displayValue: (operator !== null ? displayValue.substr(0, displayValue.length) : displayValue) + value,
                    })
                } else {
                    this.setState({
                        nextValue: true,
                        operator: value,
                        displayValue: (operator !== null ? displayValue.substr(0, displayValue.length - 1) : displayValue) + value,
                    })
                }
                break;
            case '%':
                if (firstValue !== 0 && secondValue !== 0) {
                    let result;
                    if (operator === '+') {
                        result = (+firstValue) + ((firstValue * secondValue) / 100);
                    } else if (operator === '-') {
                        result = (+firstValue) - ((firstValue * secondValue) / 100);
                    } else if (operator === '/') {
                        result = (+firstValue) / ((secondValue) / 100);
                    } else if (operator === 'x') {
                        result = (+firstValue) * ((secondValue) / 100);
                    }

                    result = result.toString()
                    this.setState({
                        displayValue: result,
                        firstValue: result,
                        secondValue: 0,
                    })
                }
                break;
            case '+-':
                if (displayValue !== 0) {

                    if (!nextValue) {
                        let result = displayValue
                        result *= -1;
                        result = result.toString()
                        this.setState({
                            firstValue: result,
                            displayValue: result,
                        })
                    } else {
                        let result = secondValue;
                        result *= -1;
                        result = result.toString();

                        this.setState({
                            secondValue: result,
                            displayValue: result,
                        })
                    }
                }
                break;
            case '.':
                let dot = displayValue.toString().slice(-1);

                this.setState({
                    displayValue: dot !== '.' ? displayValue + value : displayValue
                })
                if (!nextValue) {
                    this.setState({
                        firstValue: firstValue + value
                    })
                } else {
                    this.setState({
                        secondValue: secondValue + value
                    })
                }
                break;
            case 'm+':
                let result = 0;

                if (operator === 'x') {
                    result = ((+firstValue) * (+secondValue));
                } else if (operator === '/') {
                    result = (+firstValue) / (+secondValue);
                } else if (operator === '+') {
                    result = (+firstValue) + (+secondValue);
                } else if (operator === '-') {
                    result = (+firstValue) - (+secondValue);
                }

                let memoryPlusValue = 0;

                if (memory) {
                    memoryPlusValue = memory + result;
                } else if (!operator) {
                    memoryPlusValue = displayValue;
                } else {
                    memoryPlusValue = result;
                }

                this.setState({
                    displayValue: result,
                    firstValue: 0,
                    secondValue: 0,
                    memory: memoryPlusValue,
                })

                break;
            case 'm-':
                let memoryMinusValue = 0;
                if (operator === 'x') {
                    memoryMinusValue = ((+firstValue) * (+secondValue));
                } else if (operator === '/') {
                    memoryMinusValue = (+firstValue) / (+secondValue);
                } else if (operator === '+') {
                    memoryMinusValue = (+firstValue) + (+secondValue);
                } else if (operator === '-') {
                    memoryMinusValue = (+firstValue) - (+secondValue);
                }

                let memoryValue = 0;

                if (memory) {
                    memoryValue = memory - memoryMinusValue;
                } else {
                    memoryValue = memoryMinusValue;
                }

                this.setState({
                    displayValue: memoryMinusValue,
                    firstValue: 0,
                    secondValue: 0,
                    memory: memoryValue,
                })

                break;
            case 'mc':
                this.setState({
                    displayValue: 0,
                    memory: 0,
                })
                break;
            case 'mr':
                this.setState({
                    displayValue: memory,
                })
                break;
            case '=':
                let mathOperation = (operator) => {
                    let result = 0;

                    if (operator === 'x') {
                        result = ((+firstValue) * (+secondValue));
                    } else if (operator === '/') {
                        result = (+firstValue) / (+secondValue);
                    } else if (operator === '+') {
                        result = (+firstValue) + (+secondValue);
                    } else if (operator === '-') {
                        result = (+firstValue) - (+secondValue);
                    }

                    result = result % 1 === 0 ? result : result.toFixed(2)
                    return result;
                }

                this.setState({
                    displayValue: mathOperation(operator),
                    firstValue: mathOperation(operator),
                    secondValue: 0,
                    operator: null,
                    nextValue: false,
                })
                break;
            case 'AC':
                this.setState({
                    displayValue: 0,
                    firstValue: '',
                    secondValue: '',
                    operator: null,
                    nextValue: false,
                })
                break;
        }
    }

    render() {
        const buttonsData = this.state.buttonsData;
        const displayValue = this.state.displayValue;

        return (
            <div className="App">
                <Display displayValue={displayValue}/>
                <Buttons
                    buttonsData={buttonsData}
                    updateDisplayValue={this.updateDisplayValue}
                />
            </div>
        );
    }
}

export default App;

